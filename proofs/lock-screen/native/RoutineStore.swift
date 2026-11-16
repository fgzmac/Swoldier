import Foundation
import SQLite3

struct RoutineExercise: Codable, Sendable {
    let id: String
    let name: String
}
struct RoutineSet: Codable, Sendable {
    let pounds: Double?
    let reps: Int?
}
struct RoutineEntry: Codable, Sendable {
    let exerciseID: String
    let trackRest: Bool
    let restSeconds: Int? // Validated duration when enabled; nil when disabled.
    let restSecondsInput: String // Remember entered text even while disabled.
    let sets: [RoutineSet]

    private enum CodingKeys: String, CodingKey {
        case exerciseID, trackRest, restSeconds, restSecondsInput, sets
    }
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        exerciseID = try values.decode(String.self, forKey: .exerciseID)
        // Additive document fields: old saved routines retain tracking and duration.
        trackRest = try values.decodeIfPresent(Bool.self, forKey: .trackRest) ?? true
        let decodedRestSeconds = try values.decodeIfPresent(Int.self, forKey: .restSeconds)
        restSeconds = decodedRestSeconds
        // The ?? fallback is an autoclosure: capture a local, not partially initialized self.
        restSecondsInput = try values.decodeIfPresent(String.self, forKey: .restSecondsInput)
            ?? decodedRestSeconds.map { String($0) } ?? ""
        sets = try values.decode([RoutineSet].self, forKey: .sets)
    }
}
struct RoutinePlan: Codable, Sendable {
    var id: String?
    var revision: Int
    var name: String
    let exercises: [RoutineEntry]
}
struct RoutineLibrary: Codable, Sendable {
    let exercises: [RoutineExercise]
    let routines: [RoutinePlan]
}
struct RoutineSQL: Decodable {
    let schema: [String]
    let exercises, routines, exerciseByName, exerciseExists: String
    let insertExercise, insertRoutine, updateRoutine: String
}
enum RoutineError: LocalizedError {
    case invalid(String), storage, conflict
    var errorDescription: String? {
        switch self {
        case .invalid(let reason): return reason
        case .storage: return "Could not save/read routines. Try again."
        case .conflict: return "Routine changed elsewhere, or this name is already saved. Reopen the saved routine before retrying."
        }
    }
}

// Foreground-only routine API. Never opens ProofStore or publishes a Live Activity.
actor RoutineService {
    static let shared = RoutineService()
    func library() throws -> String { try RoutineStore().library() }
    func createExercise(_ name: String) throws -> String { try RoutineStore().createExercise(name) }
    func save(_ json: String) throws -> String { try RoutineStore().save(json) }
}

final class RoutineStore {
    private let db: OpaquePointer
    private let sql: RoutineSQL

    init() throws {
        guard let resource = Bundle.main.url(forResource: "RoutineSQL", withExtension: "json") else {
            throw RoutineError.storage
        }
        sql = try JSONDecoder().decode(RoutineSQL.self, from: Data(contentsOf: resource))
        let dir = try FileManager.default.url(for: .applicationSupportDirectory,
            in: .userDomainMask, appropriateFor: nil, create: true)
        var handle: OpaquePointer?
        let result = sqlite3_open_v2(dir.appendingPathComponent("RoutinePlans.sqlite3").path,
            &handle, SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE, nil)
        guard result == SQLITE_OK, let handle else {
            if let handle { sqlite3_close(handle) }
            throw RoutineError.storage
        }
        db = handle
        sqlite3_busy_timeout(handle, 2000)
        try execute("PRAGMA synchronous = FULL")
        // New, separate database: no workout migration, import or automatic reset.
        try transaction { for statement in sql.schema { try execute(statement) } }
    }
    deinit { sqlite3_close(db) }

    func library() throws -> String {
        try transaction(immediate: false) {
            let exercises = try rows(sql.exercises).map { RoutineExercise(id: $0[0], name: $0[1]) }
            let routines = try rows(sql.routines).map {
                try JSONDecoder().decode(RoutinePlan.self, from: Data($0[0].utf8))
            }
            return try encode(RoutineLibrary(exercises: exercises, routines: routines))
        }
    }

    func createExercise(_ input: String) throws -> String {
        let name = try validName(input)
        return try transaction {
            try run(sql.insertExercise, ["id": UUID().uuidString, "name": name])
            guard let row = try rows(sql.exerciseByName, ["name": name]).first else { throw RoutineError.storage }
            return try encode(RoutineExercise(id: row[0], name: row[1]))
        }
    }

    // One read transaction captures the saved revision and stable exercise names.
    // Caller never supplies plan values; dirty editor state is not a workout source.
    func workoutSnapshot(id: String, revision: Int) throws -> String {
        try transaction(immediate: false) {
            guard let row = try rows("SELECT document FROM routine_plans WHERE id=:id AND revision=CAST(:revision AS INTEGER)",
                                     ["id": id, "revision": String(revision)]).first else { throw RoutineError.conflict }
            let plan = try JSONDecoder().decode(RoutinePlan.self, from: Data(row[0].utf8))
            guard plan.id == id, plan.revision == revision, !plan.exercises.isEmpty else {
                throw RoutineError.invalid("Add at least one exercise before starting this routine.")
            }
            var document = try JSONSerialization.jsonObject(with: Data(encode(plan).utf8)) as! [String: Any]
            var entries = document["exercises"] as! [[String: Any]]
            for index in entries.indices {
                let entry = plan.exercises[index]
                guard !entry.sets.isEmpty,
                      let name = try rows("SELECT name FROM routine_exercises WHERE id=:id", ["id": entry.exerciseID]).first?.first else {
                    throw RoutineError.invalid("This routine needs valid exercises and planned sets before starting.")
                }
                entries[index]["name"] = name
            }
            document["exercises"] = entries
            return String(decoding: try JSONSerialization.data(withJSONObject: document), as: UTF8.self)
        }
    }

    func save(_ json: String) throws -> String {
        guard json.utf8.count <= 131072 else { throw RoutineError.invalid("Routine is too large for this proof.") }
        var plan: RoutinePlan
        do { plan = try JSONDecoder().decode(RoutinePlan.self, from: Data(json.utf8)) }
        catch { throw RoutineError.invalid("Check the routine fields, including rest seconds and whole-number reps.") }
        plan.name = try validName(plan.name)
        guard plan.revision >= 0 && plan.revision < Int.max,
              plan.exercises.count <= 30 else { throw RoutineError.invalid("Use at most 30 exercises.") }
        if let id = plan.id {
            guard UUID(uuidString: id) != nil, plan.revision > 0 else { throw RoutineError.invalid("Invalid routine identity.") }
        } else {
            guard plan.revision == 0 else { throw RoutineError.invalid("Invalid new routine revision.") }
        }
        var seen = Set<String>()
        for entry in plan.exercises {
            guard seen.insert(entry.exerciseID).inserted else { throw RoutineError.invalid("Use each exercise once per routine in this proof.") }
            guard (1...20).contains(entry.sets.count) else {
                throw RoutineError.invalid("Use 1 to 20 planned sets.")
            }
            if entry.trackRest {
                let text = trimmedInput(entry.restSecondsInput)
                guard !text.isEmpty, text.utf8.allSatisfy({ (48...57).contains($0) }),
                      let seconds = Int(text), (0...3600).contains(seconds),
                      entry.restSeconds == seconds else {
                    throw RoutineError.invalid("When Track rest is on, enter whole-number rest seconds from 0 to 3600.")
                }
            } else if entry.restSeconds != nil {
                throw RoutineError.invalid("Disabled rest must not have an active duration.")
            }
            for set in entry.sets {
                if let pounds = set.pounds {
                    guard pounds.isFinite, (0...2000).contains(pounds), abs(pounds * 100 - (pounds * 100).rounded()) < 0.000001 else {
                        throw RoutineError.invalid("Pounds must be blank or 0–2000 with at most two decimal places.")
                    }
                }
                if let reps = set.reps, !(0...1000).contains(reps) {
                    throw RoutineError.invalid("Reps must be blank or a whole number from 0 to 1000.")
                }
            }
        }
        return try transaction {
            for entry in plan.exercises {
                guard try !rows(sql.exerciseExists, ["id": entry.exerciseID]).isEmpty else {
                    throw RoutineError.invalid("An exercise no longer exists. Reopen the routine.")
                }
            }
            let previous = plan.revision
            let isNew = plan.id == nil
            if isNew { plan.id = UUID().uuidString }
            plan.revision += 1
            let encoded = try encode(plan)
            let params = ["id": plan.id!, "revision": String(previous), "name": plan.name, "document": encoded]
            guard try run(isNew ? sql.insertRoutine : sql.updateRoutine, params) == 1 else { throw RoutineError.conflict }
            return encoded // transaction returns only after COMMIT succeeds.
        }
    }

    private func trimmedInput(_ input: String) -> String {
        // Match routineModel.ts String.trim() for both names and rest input.
        let trimCharacters = CharacterSet(charactersIn:
            "\u{0009}\u{000A}\u{000B}\u{000C}\u{000D}\u{0020}\u{00A0}\u{1680}" +
            "\u{2000}\u{2001}\u{2002}\u{2003}\u{2004}\u{2005}\u{2006}\u{2007}" +
            "\u{2008}\u{2009}\u{200A}\u{2028}\u{2029}\u{202F}\u{205F}\u{3000}\u{FEFF}")
        return input.trimmingCharacters(in: trimCharacters)
    }
    private func validName(_ input: String) throws -> String {
        let value = trimmedInput(input)
        guard !value.isEmpty, value.unicodeScalars.count <= 80,
              value.unicodeScalars.allSatisfy({ $0.value > 0x1F && !(0x7F...0x9F).contains($0.value) }) else {
            throw RoutineError.invalid("Enter a name of 1–80 characters without line breaks.")
        }
        return value
    }
    private func encode<T: Encodable>(_ value: T) throws -> String {
        String(decoding: try JSONEncoder().encode(value), as: UTF8.self)
    }
    private func transaction<T>(immediate: Bool = true, _ body: () throws -> T) throws -> T {
        try execute(immediate ? "BEGIN IMMEDIATE" : "BEGIN")
        do { let value = try body(); try execute("COMMIT"); return value }
        catch { try? execute("ROLLBACK"); throw error }
    }
    private func execute(_ text: String) throws {
        guard sqlite3_exec(db, text, nil, nil, nil) == SQLITE_OK else { throw RoutineError.storage }
    }
    @discardableResult private func run(_ text: String, _ params: [String: String]) throws -> Int {
        try statement(text, params) { stmt in
            let code = sqlite3_step(stmt)
            if code == SQLITE_CONSTRAINT { throw RoutineError.conflict }
            guard code == SQLITE_DONE else { throw RoutineError.storage }
            return Int(sqlite3_changes(db))
        }
    }
    private func rows(_ text: String, _ params: [String: String] = [:]) throws -> [[String]] {
        try statement(text, params) { stmt in
            var result: [[String]] = []
            while true {
                switch sqlite3_step(stmt) {
                case SQLITE_ROW:
                    var row: [String] = []
                    for i in 0..<sqlite3_column_count(stmt) {
                        guard let value = sqlite3_column_text(stmt, i) else { throw RoutineError.storage }
                        row.append(String(cString: value))
                    }
                    result.append(row)
                case SQLITE_DONE: return result
                default: throw RoutineError.storage
                }
            }
        }
    }
    private func statement<T>(_ text: String, _ params: [String: String], _ body: (OpaquePointer) throws -> T) throws -> T {
        var prepared: OpaquePointer?
        guard sqlite3_prepare_v2(db, text, -1, &prepared, nil) == SQLITE_OK, let stmt = prepared else { throw RoutineError.storage }
        defer { sqlite3_finalize(stmt) }
        let count = sqlite3_bind_parameter_count(stmt)
        if count > 0 {
            for i in 1...count {
                guard let name = sqlite3_bind_parameter_name(stmt, i),
                      let value = params[String(cString: name).dropFirst().description] else { throw RoutineError.storage }
                let transient = unsafeBitCast(-1, to: sqlite3_destructor_type.self)
                guard value.withCString({ sqlite3_bind_text(stmt, i, $0, -1, transient) }) == SQLITE_OK else { throw RoutineError.storage }
            }
        }
        return try body(stmt)
    }
}
