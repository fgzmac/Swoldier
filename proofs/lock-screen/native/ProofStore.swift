import Foundation
import SQLite3

struct ProofSnapshot: Sendable {
    let sessionID: String
    let setID: String
    let pounds: Int
    let reps: Int
    let completed: Bool
    let completionAttempts: Int

    var dictionary: [String: Any] {
        [
            "pounds": pounds,
            "reps": reps,
            "completed": completed,
            "completionAttempts": completionAttempts,
            "recordCount": completed ? 1 : 0
        ]
    }
}

enum ProofError: LocalizedError {
    case storage
    case activitiesDisabled

    var errorDescription: String? {
        switch self {
        case .storage: return "Could not access proof data. Try again."
        case .activitiesDisabled: return "Live Activities are unavailable. Check the iPhone settings."
        }
    }
}

struct ProofSQL: Decodable {
    let schema, start, read, increment, complete, reset: String
}

final class ProofStore {
    private let db: OpaquePointer
    private let sql: ProofSQL

    init() throws {
        guard let url = Bundle.main.url(forResource: "ProofSQL", withExtension: "json") else {
            throw ProofError.storage
        }
        sql = try JSONDecoder().decode(ProofSQL.self, from: Data(contentsOf: url))
        let dir = try FileManager.default.url(
            for: .applicationSupportDirectory, in: .userDomainMask,
            appropriateFor: nil, create: true
        )
        var handle: OpaquePointer?
        let path = dir.appendingPathComponent("LockScreenProof.sqlite3").path
        let result = sqlite3_open_v2(path, &handle, SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE, nil)
        guard result == SQLITE_OK, let handle else {
            if let handle { sqlite3_close(handle) }
            throw ProofError.storage
        }
        db = handle
        // Stored in the containing app's sandbox. The widget never opens this file.
        sqlite3_busy_timeout(handle, 2000)
        try execute("PRAGMA synchronous = FULL")
        try execute(sql.schema)
    }

    deinit { sqlite3_close(db) }

    func start() throws -> ProofSnapshot? {
        try write(sql.start, [UUID().uuidString, UUID().uuidString])
    }

    func mutate(sessionID: String, setID: String, complete: Bool) throws -> ProofSnapshot? {
        try write(complete ? sql.complete : sql.increment, [sessionID, setID])
    }

    func reset() throws { _ = try write(sql.reset) }

    func read() throws -> ProofSnapshot? {
        try withStatement(sql.read) { stmt in
            switch sqlite3_step(stmt) {
            case SQLITE_ROW:
                guard let session = sqlite3_column_text(stmt, 0),
                      let set = sqlite3_column_text(stmt, 1) else { throw ProofError.storage }
                return ProofSnapshot(
                    sessionID: String(cString: session), setID: String(cString: set),
                    pounds: Int(sqlite3_column_int64(stmt, 2)), reps: Int(sqlite3_column_int64(stmt, 3)),
                    completed: sqlite3_column_int(stmt, 4) == 1,
                    completionAttempts: Int(sqlite3_column_int64(stmt, 5))
                )
            case SQLITE_DONE: return nil
            default: throw ProofError.storage
            }
        }
    }

    private func write(_ statement: String, _ arguments: [String] = []) throws -> ProofSnapshot? {
        try execute("BEGIN IMMEDIATE")
        do {
            try withStatement(statement) { stmt in
                let transient = unsafeBitCast(-1, to: sqlite3_destructor_type.self)
                for (index, value) in arguments.enumerated() {
                    let status = value.withCString { sqlite3_bind_text(stmt, Int32(index + 1), $0, -1, transient) }
                    guard status == SQLITE_OK else { throw ProofError.storage }
                }
                guard sqlite3_step(stmt) == SQLITE_DONE else { throw ProofError.storage }
            }
            let snapshot = try read()
            try execute("COMMIT")
            return snapshot
        } catch {
            try? execute("ROLLBACK")
            throw error
        }
    }

    private func execute(_ statement: String) throws {
        guard sqlite3_exec(db, statement, nil, nil, nil) == SQLITE_OK else { throw ProofError.storage }
    }

    private func withStatement<T>(_ sql: String, _ body: (OpaquePointer) throws -> T) throws -> T {
        var stmt: OpaquePointer?
        guard sqlite3_prepare_v2(db, sql, -1, &stmt, nil) == SQLITE_OK, let stmt else {
            throw ProofError.storage
        }
        defer { sqlite3_finalize(stmt) }
        return try body(stmt)
    }
}
