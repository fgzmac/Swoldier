import Foundation
import SQLite3

struct ProofSetSnapshot: Sendable {
    let setID: String
    let ordinal, plannedPounds, plannedReps, pounds, reps: Int
    let completed: Bool
    let completionAttempts: Int

    var dictionary: [String: Any] {
        ["setID": setID, "number": ordinal, "plannedPounds": plannedPounds,
         "plannedReps": plannedReps, "pounds": pounds, "reps": reps,
         "completed": completed, "completionAttempts": completionAttempts]
    }
}

struct ProofSnapshot: Sendable {
    let sessionID, restID: String
    let sets: [ProofSetSnapshot]
    let displaySet: ProofSetSnapshot
    let restDeadline, restSkippedAt, restContinuedAt: TimeInterval?
    let restState: String
    let restRemainingSeconds: Int

    var awaitingContinue: Bool { restDeadline != nil && restContinuedAt == nil }
    var setID: String { displaySet.setID }
    var completed: Bool { sets.allSatisfy { $0.completed } }
    var recordCount: Int { sets.filter { $0.completed }.count }
    var dictionary: [String: Any] {
        ["sessionID": sessionID, "setID": setID, "restID": restID,
         "pounds": displaySet.pounds, "reps": displaySet.reps,
         "setNumber": displaySet.ordinal, "completed": completed,
         "plannedSetsRecorded": completed, "recordCount": recordCount,
         "completionAttempts": sets.reduce(0) { $0 + $1.completionAttempts },
         "sets": sets.map { $0.dictionary },
         "restDeadline": restDeadline.map { $0 as Any } ?? NSNull(),
         "restSkippedAt": restSkippedAt.map { $0 as Any } ?? NSNull(),
         "restContinuedAt": restContinuedAt.map { $0 as Any } ?? NSNull(),
         "awaitingContinue": awaitingContinue,
         "restState": restState, "restRemainingSeconds": restRemainingSeconds]
    }
}

enum ProofError: LocalizedError {
    case storage, activitiesDisabled
    var errorDescription: String? {
        switch self {
        case .storage: return "Could not access proof data. Try again."
        case .activitiesDisabled: return "Live Activities are unavailable. Check the iPhone settings."
        }
    }
}

struct ProofMigration: Decodable { let column, statement: String }
struct ProofSQL: Decodable {
    let schema: String
    let migrations: [ProofMigration]
    let schemaV2, importLegacy, migrationsV3, reset: [String]
    let startSession, startSets, readSession, readSets, readRest: String
    let countCompleteRequest, complete, createRest, advanceRest, weight, reps, continueRest: String
}

final class ProofStore {
    private let db: OpaquePointer
    private let sql: ProofSQL

    init() throws {
        guard let url = Bundle.main.url(forResource: "ProofSQL", withExtension: "json") else {
            throw ProofError.storage
        }
        sql = try JSONDecoder().decode(ProofSQL.self, from: Data(contentsOf: url))
        let dir = try FileManager.default.url(for: .applicationSupportDirectory,
            in: .userDomainMask, appropriateFor: nil, create: true)
        var handle: OpaquePointer?
        let result = sqlite3_open_v2(dir.appendingPathComponent("LockScreenProof.sqlite3").path,
            &handle, SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE, nil)
        guard result == SQLITE_OK, let handle else {
            if let handle { sqlite3_close(handle) }
            throw ProofError.storage
        }
        db = handle
        sqlite3_busy_timeout(handle, 2000)
        try execute("PRAGMA synchronous = FULL")
        try execute(sql.schema) // Preserve the installed legacy table and its row.
        try migrate()
    }
    deinit { sqlite3_close(db) }

    func start() throws -> ProofSnapshot? {
        try transaction {
            let params = ["sessionID": UUID().uuidString]
            try run(sql.startSession, params)
            try run(sql.startSets, params)
            return try readInternal()
        }
    }

    func apply(sessionID: String, setID: String, restID: String, action: ProofAction)
        throws -> (snapshot: ProofSnapshot?, notice: String?) {
        try transaction {
            // Sample after obtaining the write lock, never from the archived card.
            let now = Date().timeIntervalSince1970
            var params = ["sessionID": sessionID, "setID": setID, "restID": restID,
                          "now": String(now), "newRestID": setID + ":rest"]
            let before = try readInternal(now: now)
            var changed = false
            switch action {
            case .complete:
                try run(sql.countCompleteRequest, params)
                changed = try run(sql.complete, params) == 1
                if changed {
                    try run(sql.createRest, params)
                    guard try run(sql.advanceRest, params) == 1 else { throw ProofError.storage }
                }
            case .continueRest, .skip:
                // Legacy Skip intents also acknowledge their explicitly bound rest.
                changed = try run(sql.continueRest, params) == 1
            case .weight(let delta):
                params["delta"] = String(delta)
                changed = try run(sql.weight, params) == 1
            case .reps(let delta):
                params["delta"] = String(delta)
                changed = try run(sql.reps, params) == 1
            }
            let snapshot = try readInternal(now: now)
            let notice: String?
            if changed {
                notice = nil
            } else if case .complete = action,
                      before?.sessionID == sessionID, before?.setID == setID,
                      before?.restID == restID, before?.completed == false,
                      before?.awaitingContinue == true {
                notice = "Tap Continue before the next set"
            } else {
                notice = "Old or inactive action ignored"
            }
            return (snapshot, notice)
        }
    }

    func reset() throws {
        try transaction { for statement in sql.reset { try execute(statement) } }
    }

    func read() throws -> ProofSnapshot? {
        // Multiple SELECTs observe one consistent SQLite snapshot.
        try transaction(immediate: false) { try readInternal() }
    }

    private func readInternal(now: TimeInterval = Date().timeIntervalSince1970) throws -> ProofSnapshot? {
        let identity: (String, String)? = try withStatement(sql.readSession) { stmt in
            switch sqlite3_step(stmt) {
            case SQLITE_ROW: return (try text(stmt, 0), try text(stmt, 1))
            case SQLITE_DONE: return nil
            default: throw ProofError.storage
            }
        }
        guard let (sessionID, restID) = identity else { return nil }
        let params = ["sessionID": sessionID, "restID": restID, "now": String(now)]
        let sets: [ProofSetSnapshot] = try withStatement(sql.readSets, params) { stmt in
            var rows: [ProofSetSnapshot] = []
            while true {
                switch sqlite3_step(stmt) {
                case SQLITE_ROW:
                    rows.append(ProofSetSnapshot(setID: try text(stmt, 0),
                        ordinal: Int(sqlite3_column_int64(stmt, 1)),
                        plannedPounds: Int(sqlite3_column_int64(stmt, 2)),
                        plannedReps: Int(sqlite3_column_int64(stmt, 3)),
                        pounds: Int(sqlite3_column_int64(stmt, 4)), reps: Int(sqlite3_column_int64(stmt, 5)),
                        completed: sqlite3_column_int(stmt, 6) == 1,
                        completionAttempts: Int(sqlite3_column_int64(stmt, 7))))
                case SQLITE_DONE: return rows
                default: throw ProofError.storage
                }
            }
        }
        guard sets.count == 3, let display = sets.first(where: { !$0.completed }) ?? sets.last else {
            throw ProofError.storage
        }
        var deadline: TimeInterval?, skipped: TimeInterval?, continued: TimeInterval?
        var state = "not_started", remaining = 0
        try withStatement(sql.readRest, params) { stmt in
            switch sqlite3_step(stmt) {
            case SQLITE_ROW:
                deadline = sqlite3_column_double(stmt, 0)
                skipped = sqlite3_column_type(stmt, 1) == SQLITE_NULL ? nil : sqlite3_column_double(stmt, 1)
                state = try text(stmt, 2)
                remaining = Int(ceil(sqlite3_column_double(stmt, 3)))
                continued = sqlite3_column_type(stmt, 4) == SQLITE_NULL ? nil : sqlite3_column_double(stmt, 4)
            case SQLITE_DONE:
                guard restID == "none" else { throw ProofError.storage }
            default: throw ProofError.storage
            }
        }
        return ProofSnapshot(sessionID: sessionID, restID: restID, sets: sets, displaySet: display,
            restDeadline: deadline, restSkippedAt: skipped, restContinuedAt: continued, restState: state, restRemainingSeconds: remaining)
    }

    private func migrate() throws {
        let version: Int = try withStatement("PRAGMA user_version") { stmt in
            guard sqlite3_step(stmt) == SQLITE_ROW else { throw ProofError.storage }
            return Int(sqlite3_column_int(stmt, 0))
        }
        guard version < 3 else { return }
        try transaction {
            // Recheck under the write lock to prevent a second legacy import.
            let lockedVersion: Int = try withStatement("PRAGMA user_version") { stmt in
                guard sqlite3_step(stmt) == SQLITE_ROW else { throw ProofError.storage }
                return Int(sqlite3_column_int(stmt, 0))
            }
            guard lockedVersion < 3 else { return }
            if lockedVersion < 2 {
                let columns: Set<String> = try withStatement("PRAGMA table_info(proof_set)") { stmt in
                    var result = Set<String>()
                    while true {
                        switch sqlite3_step(stmt) {
                        case SQLITE_ROW: result.insert(try text(stmt, 1))
                        case SQLITE_DONE: return result
                        default: throw ProofError.storage
                        }
                    }
                }
                for migration in sql.migrations where !columns.contains(migration.column) {
                    try execute(migration.statement)
                }
                for statement in sql.schemaV2 + sql.importLegacy { try execute(statement) }
            }
            for statement in sql.migrationsV3 { try execute(statement) }
            try execute("PRAGMA user_version = 3")
        }
    }

    private func transaction<T>(immediate: Bool = true, _ body: () throws -> T) throws -> T {
        try execute(immediate ? "BEGIN IMMEDIATE" : "BEGIN")
        do {
            let result = try body()
            try execute("COMMIT")
            return result // Never expose the new state before durable commit succeeds.
        } catch {
            try? execute("ROLLBACK")
            throw error
        }
    }
    @discardableResult
    private func run(_ statement: String, _ params: [String: String]) throws -> Int {
        try withStatement(statement, params) { stmt in
            guard sqlite3_step(stmt) == SQLITE_DONE else { throw ProofError.storage }
            return Int(sqlite3_changes(db))
        }
    }
    private func text(_ stmt: OpaquePointer, _ index: Int32) throws -> String {
        guard let pointer = sqlite3_column_text(stmt, index) else { throw ProofError.storage }
        return String(cString: pointer)
    }
    private func execute(_ statement: String) throws {
        guard sqlite3_exec(db, statement, nil, nil, nil) == SQLITE_OK else { throw ProofError.storage }
    }
    private func withStatement<T>(_ statement: String, _ params: [String: String] = [:],
                                  _ body: (OpaquePointer) throws -> T) throws -> T {
        var prepared: OpaquePointer?
        guard sqlite3_prepare_v2(db, statement, -1, &prepared, nil) == SQLITE_OK,
              let stmt = prepared else { throw ProofError.storage }
        defer { sqlite3_finalize(stmt) }
        let count = sqlite3_bind_parameter_count(stmt)
        if count > 0 {
            for index in 1...count {
                guard let name = sqlite3_bind_parameter_name(stmt, index),
                      let value = params[String(cString: name).dropFirst().description] else {
                    throw ProofError.storage
                }
                let transient = unsafeBitCast(-1, to: sqlite3_destructor_type.self)
                let result = value.withCString { sqlite3_bind_text(stmt, index, $0, -1, transient) }
                guard result == SQLITE_OK else { throw ProofError.storage }
            }
        }
        return try body(stmt)
    }
}
