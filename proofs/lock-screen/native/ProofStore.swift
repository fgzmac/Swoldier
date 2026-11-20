import Foundation
import SQLite3

struct ProofSetSnapshot: Sendable {
    let setID: String
    let ordinal: Int
    let pounds: Double?
    let reps: Int?
    let rir: Int?
    let skippedAt: TimeInterval?
    let skipToken: String?
    let editRevision: Int
    let plannedPounds: Double?
    let plannedReps: Int?
    let exerciseID: String
    let isAdded: Bool
    let completed: Bool
    let completionAttempts: Int

    var dictionary: [String: Any] {
        ["setID": setID, "number": ordinal, "plannedPounds": plannedPounds.map { $0 as Any } ?? NSNull(),
         "plannedReps": plannedReps.map { $0 as Any } ?? NSNull(),
         "exerciseID": exerciseID, "isAdded": isAdded, "pounds": pounds.map { $0 as Any } ?? NSNull(), "reps": reps.map { $0 as Any } ?? NSNull(),
         "rir": rir.map { $0 as Any } ?? NSNull(),
         "skippedAt": skippedAt.map { $0 as Any } ?? NSNull(), "skipToken": skipToken.map { $0 as Any } ?? NSNull(), "editRevision": editRevision,
         "completed": completed, "completionAttempts": completionAttempts]
    }
}

struct ProofExerciseSnapshot: Sendable {
    let exerciseID, name: String
    let ordinal: Int
    let sourceExerciseID: String?
    let trackRest: Bool
    let restSeconds: Int?
    let finishedAt: TimeInterval?
    var dictionary: [String: Any] {
        ["exerciseID": exerciseID, "name": name, "number": ordinal,
         "sourceExerciseID": sourceExerciseID.map { $0 as Any } ?? NSNull(),
         "trackRest": trackRest, "restSeconds": restSeconds.map { $0 as Any } ?? NSNull(),
         "finishedAt": finishedAt.map { $0 as Any } ?? NSNull()]
    }
}

struct ProofSnapshot: Sendable {
    let sessionID, restID, actionToken: String
    let startRequestID: String?
    let startedAt: TimeInterval?
    let routineID, routineName: String?
    let routineRevision: Int?
    let sets: [ProofSetSnapshot]
    let exercises: [ProofExerciseSnapshot]
    let currentExercise: ProofExerciseSnapshot
    let finishedAt: TimeInterval?
    let displaySet: ProofSetSnapshot
    let restDeadline, restSkippedAt, restContinuedAt, restStartedAt: TimeInterval?
    let restSetID: String?
    let restUndoneAt: TimeInterval?
    let restState: String
    let restRemainingSeconds: Int

    var awaitingContinue: Bool { restSetID != nil && restContinuedAt == nil }
    var setID: String { displaySet.setID }
    var currentSets: [ProofSetSnapshot] { sets.filter { $0.exerciseID == currentExercise.exerciseID } }
    var completed: Bool { currentSets.allSatisfy { $0.completed || $0.skippedAt != nil } }
    var workoutFinished: Bool { finishedAt != nil }
    var nextExerciseName: String? { exercises.first(where: { $0.ordinal > currentExercise.ordinal })?.name }
    var hasNextExercise: Bool { nextExerciseName != nil }
    var canChooseNext: Bool { !workoutFinished && currentExercise.finishedAt == nil && completed && !awaitingContinue }
    var undoSkipToken: String? { currentSets.first(where: { $0.skipToken == actionToken && $0.skippedAt != nil })?.skipToken }
    // Confirmation binds to the state shown, including edits, requests and rest acknowledgement.
    var resolutionToken: String {
        ([actionToken, restID, currentExercise.exerciseID, String(restContinuedAt ?? -1), String(finishedAt ?? -1)]
         + sets.map { "\($0.setID):\($0.editRevision):\($0.completionAttempts)" }).joined(separator: "|")
    }
    var recordCount: Int { sets.filter { $0.completed }.count }
    var dictionary: [String: Any] {
        ["startRequestID": startRequestID.map { $0 as Any } ?? NSNull(), "sessionID": sessionID, "setID": setID, "restID": restID, "actionToken": actionToken,
         "startedAt": startedAt.map { $0 as Any } ?? NSNull(), "undoSkipToken": undoSkipToken.map { $0 as Any } ?? NSNull(),
         "routineID": routineID.map { $0 as Any } ?? NSNull(),
         "routineName": routineName.map { $0 as Any } ?? NSNull(),
         "routineRevision": routineRevision.map { $0 as Any } ?? NSNull(),
         "pounds": displaySet.pounds.map { $0 as Any } ?? NSNull(), "reps": displaySet.reps.map { $0 as Any } ?? NSNull(),
         "rir": displaySet.rir.map { $0 as Any } ?? NSNull(),
         "setNumber": displaySet.ordinal, "completed": completed,
         "plannedSetsRecorded": completed, "recordCount": recordCount,
         "completionAttempts": sets.reduce(0) { $0 + $1.completionAttempts },
         "sets": sets.map { $0.dictionary },
         "exercises": exercises.map { $0.dictionary },
         "exerciseID": currentExercise.exerciseID, "exerciseName": currentExercise.name,
         "exerciseNumber": currentExercise.ordinal, "exerciseCount": exercises.count,
         "setCount": currentSets.count, "canChooseNext": canChooseNext,
         "hasNextExercise": hasNextExercise, "workoutFinished": workoutFinished,
         "finishedAt": finishedAt.map { $0 as Any } ?? NSNull(),
         "restStartedAt": restStartedAt.map { $0 as Any } ?? NSNull(),
         "restDeadline": restDeadline.map { $0 as Any } ?? NSNull(),
         "restSkippedAt": restSkippedAt.map { $0 as Any } ?? NSNull(),
         "restContinuedAt": restContinuedAt.map { $0 as Any } ?? NSNull(),
         "restSetID": restSetID.map { $0 as Any } ?? NSNull(),
         "restUndoneAt": restUndoneAt.map { $0 as Any } ?? NSNull(),
         "awaitingContinue": awaitingContinue,
         "restState": restState, "restRemainingSeconds": restRemainingSeconds]
    }
}

enum ProofError: LocalizedError {
    case storage, activitiesDisabled, unfinishedWorkout
    case input(String)
    var errorDescription: String? {
        switch self {
        case .input(let message): return message
        case .storage: return "Could not access proof data. Try again."
        case .activitiesDisabled: return "Live Activities are unavailable. Check the iPhone settings."
        case .unfinishedWorkout: return "A workout is unfinished. Return to it and resume; it has not been replaced."
        }
    }
}

struct ProofMigration: Decodable { let column, statement: String }
struct ProofSQL: Decodable {
    let schema: String
    let migrations: [ProofMigration]
    let schemaV2, importLegacy, migrationsV3, migrationsV4, migrationsV5, migrationsV6, migrationsV7, migrationsV8, reset, discardWorkout: [String]
    let registerFixture, startRequest, readWorkout, archiveWorkout, clearFinishedPointer, registerRoutine, snapshotExercises, snapshotSets: String
    let startSession, startExercises, startSets, readSession, readExercises, readSets, readRest: String
    let addSet, finishExercise, advanceExercise, finishLastExercise, finishWorkout: String
    let skipSet, skipRemaining, undoSkip, rotateActionToken, resolveSkip, resolveRest, resolveExercises, resolveWorkout, editSet: String
    let countCompleteRequest, complete, createRest, advanceRest, weight, reps, rir, clearRIR, continueRest, undo, markUndone: String
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
            if try run(sql.startSession, params) == 1 {
                try run(sql.startExercises, params)
                try run(sql.startSets, params)
                try run(sql.registerFixture, params)
            } // Installed sessions are never silently extended.
            return try readInternal()
        }
    }

    func startRoutine(id: String, revision: Int, requestID: String, resolution: String? = nil, expectedSession: String? = nil, expectedToken: String? = nil) throws -> ProofSnapshot {
        guard UUID(uuidString: requestID) != nil else { throw ProofError.input("Invalid Start request. Reopen the routine.") }
        return try transaction {
            let existing: String? = try withStatement(sql.startRequest, ["requestID": requestID]) { stmt in
                switch sqlite3_step(stmt) {
                case SQLITE_ROW:
                    guard try text(stmt, 1) == id, Int(sqlite3_column_int64(stmt, 2)) == revision else {
                        throw ProofError.input("This Start request belongs to another saved revision.")
                    }
                    return try text(stmt, 0)
                case SQLITE_DONE: return nil
                default: throw ProofError.storage
                }
            }
            var current = try readInternal()
            if let existing {
                guard let current, current.sessionID == existing else {
                    throw ProofError.input("This request already started an earlier workout. Return to the current workout.")
                }
                return current // Retry after a failed ActivityKit publication, even if routine changed.
            }
            // A resolution is never silently reinterpreted as an ordinary Start.
            // Validate even if the confirmed workout has since finished/disappeared.
            if let resolution {
                guard let active = current, !active.workoutFinished,
                      active.sessionID == expectedSession, active.resolutionToken == expectedToken,
                      resolution == "finish" || resolution == "discard" else {
                    throw ProofError.input("The active workout changed. Review it before choosing again.")
                }
            }
            let seed = try RoutineStore().workoutSnapshot(id: id, revision: revision)
            if let active = current, !active.workoutFinished {
                guard let resolution else { throw ProofError.unfinishedWorkout }
                let params = ["sessionID": active.sessionID, "actionToken": active.actionToken,
                              "newToken": UUID().uuidString, "now": String(Date().timeIntervalSince1970)]
                if resolution == "discard" {
                    for statement in sql.discardWorkout { try run(statement, params) }
                    current = nil
                } else {
                    try run(sql.resolveSkip, params); try run(sql.resolveRest, params)
                    try run(sql.resolveExercises, params)
                    guard try run(sql.resolveWorkout, params) == 1 else { throw ProofError.storage }
                    current = try readInternal()
                }
            }
            if let current {
                let archived = String(decoding: try JSONSerialization.data(withJSONObject: current.dictionary), as: UTF8.self)
                guard try run(sql.archiveWorkout, ["sessionID": current.sessionID, "archived": archived]) == 1 else { throw ProofError.storage }
                guard try run(sql.clearFinishedPointer, [:]) == 1 else { throw ProofError.storage }
            }
            let params = ["sessionID": UUID().uuidString, "requestID": requestID, "snapshot": seed]
            guard try run(sql.startSession, params) == 1 else { throw ProofError.storage }
            try run(sql.registerRoutine, params)
            try run(sql.snapshotExercises, params)
            try run(sql.snapshotSets, params)
            guard let result = try readInternal() else { throw ProofError.storage }
            return result
        }
    }

    func apply(sessionID: String, setID: String, restID: String, actionToken: String = "legacy", action: ProofAction)
        throws -> (snapshot: ProofSnapshot?, notice: String?) {
        try transaction {
            // Sample after obtaining the write lock, never from the archived card.
            let now = Date().timeIntervalSince1970
            var params = ["sessionID": sessionID, "setID": setID, "restID": restID, "actionToken": actionToken,
                          "newToken": UUID().uuidString, "now": String(now), "newRestID": UUID().uuidString, "newSetID": UUID().uuidString]
            // A new rest ID identifies each successful completion, including re-completion.
            // The old rest ID remains the action guard; failed transactions publish neither.
            let before = try readInternal(now: now)
            guard before?.sessionID == sessionID, before?.actionToken == actionToken else {
                return (before, "Old action ignored; use the current card")
            }
            var changed = false
            switch action {
            case .options, .back:
                guard before?.setID == setID, before?.restID == restID else { return (before, "Old action ignored") }
                changed = true
            case .skipSet, .finishEarly:
                guard before?.setID == setID, before?.restID == restID else { return (before, "Old action ignored") }
                if case .skipSet = action { changed = try run(sql.skipSet, params) > 0 }
                else { changed = try run(sql.skipRemaining, params) > 0 }
                if changed { guard try run(sql.rotateActionToken, params) == 1 else { throw ProofError.storage } }
            case .undoSkip(let token):
                params["skipToken"] = token
                guard token == actionToken else { return (before, "Old skip ignored") }
                changed = try run(sql.undoSkip, params) > 0
                if changed { guard try run(sql.rotateActionToken, params) == 1 else { throw ProofError.storage } }
            case .complete:
                try run(sql.countCompleteRequest, params)
                // Only this rest's undone draft may bypass acknowledgement at expiry.
                // SQL still checks the saved deadline and original action IDs under the lock.
                changed = try run(sql.complete, params) == 1
                if changed {
                    guard try run(sql.createRest, params) == 1 else { throw ProofError.storage }
                    guard try run(sql.advanceRest, params) == 1 else { throw ProofError.storage }
                }
            case .addSet:
                changed = try run(sql.addSet, params) == 1
            case .nextExercise:
                changed = try run(sql.finishExercise, params) == 1
                if changed {
                    guard try run(sql.advanceExercise, params) == 1 else { throw ProofError.storage }
                }
            case .finishWorkout:
                changed = try run(sql.finishLastExercise, params) == 1
                if changed {
                    guard try run(sql.finishWorkout, params) == 1 else { throw ProofError.storage }
                }
            case .undo:
                changed = try run(sql.undo, params) == 1
                if changed {
                    guard try run(sql.markUndone, params) == 1 else { throw ProofError.storage }
                }
            case .continueRest, .skip:
                // Legacy Skip intents also acknowledge their explicitly bound rest.
                changed = try run(sql.continueRest, params) == 1
            case .weight(let delta):
                params["delta"] = String(delta)
                changed = try run(sql.weight, params) == 1
            case .rir(let delta):
                params["delta"] = String(delta)
                changed = try run(sql.rir, params) == 1
            case .clearRIR:
                changed = try run(sql.clearRIR, params) == 1
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
                      before?.restID == restID, before?.displaySet.reps == nil {
                notice = "Enter reps before Complete"
            } else if case .complete = action,
                      before?.sessionID == sessionID, before?.setID == setID,
                      before?.restID == restID, before?.completed == false,
                      before?.awaitingContinue == true {
                // Timeless instruction: a later tap checks the saved deadline again.
                // Do not leave a stale "rest active" claim on the card at zero.
                notice = before?.restUndoneAt != nil && before?.restSetID == setID
                    ? "Complete at zero or Continue"
                    : "Tap Continue before the next set"
            } else {
                notice = "Old or inactive action ignored"
            }
            return (snapshot, notice)
        }
    }

    // Deliberate exact-actual correction. Does not complete, skip, acknowledge or restart rest.
    func editSet(_ json: String) throws -> ProofSnapshot {
        struct Edit: Decodable {
            let sessionID, setID, actionToken, requestID: String
            let revision: Int
            let pounds: Double?
            let reps, rir: Int?
        }
        let edit = try JSONDecoder().decode(Edit.self, from: Data(json.utf8))
        guard UUID(uuidString: edit.requestID) != nil, edit.revision >= 0 else { throw ProofError.input("Invalid edit. Reopen the set.") }
        if let value = edit.pounds {
            guard value.isFinite, (0...2000).contains(value), abs(value * 100 - (value * 100).rounded()) < 0.000001 else { throw ProofError.input("Pounds must be blank or 0–2000, with up to two decimals.") }
        }
        if let value = edit.reps, !(0...1000).contains(value) { throw ProofError.input("Reps must be blank or a whole number 0–1000.") }
        if let value = edit.rir, !(0...10).contains(value) { throw ProofError.input("RIR must be blank or a whole number 0–10.") }
        return try transaction {
            guard let snapshot = try readInternal(), snapshot.sessionID == edit.sessionID else { throw ProofError.input("That workout is no longer active. No values changed.") }
            let params = ["sessionID": edit.sessionID, "setID": edit.setID, "actionToken": edit.actionToken,
                          "revision": String(edit.revision), "requestID": edit.requestID, "payload": json]
            let previous: String? = try withStatement("SELECT payload FROM proof_edit_requests WHERE request_id=:requestID", params) { stmt in
                switch sqlite3_step(stmt) { case SQLITE_ROW: return try text(stmt, 0); case SQLITE_DONE: return nil; default: throw ProofError.storage }
            }
            if let previous {
                guard previous == json else { throw ProofError.input("This edit request was already used. Reopen the set.") }
                return snapshot
            }
            guard let set = snapshot.sets.first(where: { $0.setID == edit.setID }), set.skippedAt == nil else { throw ProofError.input("Undo the skip before editing this set.") }
            let fixture = snapshot.exercises.first(where: { $0.exerciseID == set.exerciseID })?.sourceExerciseID == nil
            guard (edit.pounds ?? 0) <= (fixture ? 200 : 2000), (edit.reps ?? 0) <= (fixture ? 30 : 1000) else {
                throw ProofError.input("Value exceeds this workout's provisional entry limit. Your edits remain unsaved.")
            }
            if set.completed && edit.reps == nil { throw ProofError.input("A recorded set requires reps. Your edits have not been saved.") }
            guard try run(sql.editSet, params) == 1 else { throw ProofError.input("This set changed. Reopen it before saving; your edits are still shown.") }
            try run("INSERT INTO proof_edit_requests(request_id,session_id,payload) VALUES(:requestID,:sessionID,:payload)", params)
            guard let result = try readInternal() else { throw ProofError.storage }
            return result
        }
    }

    func history() throws -> [[String: Any]] {
        try transaction(immediate: false) {
            try withStatement("SELECT archived_state FROM proof_workouts_v6 WHERE archived_state IS NOT NULL AND discarded_at IS NULL ORDER BY rowid DESC") { stmt in
                var rows: [[String: Any]] = []
                while true {
                    switch sqlite3_step(stmt) {
                    case SQLITE_ROW:
                        let value = try JSONSerialization.jsonObject(with: Data(text(stmt, 0).utf8))
                        if let snapshot = value as? [String: Any] { rows.append(snapshot) }
                    case SQLITE_DONE: return rows
                    default: throw ProofError.storage
                    }
                }
            }
        }
    }

    func reset() throws {
        try transaction {
            guard try readInternal()?.routineID == nil else {
                throw ProofError.input("Reset only clears the fictional fixture. Saved-routine workouts are preserved.")
            }
            for statement in sql.reset { try execute(statement) }
        }
    }

    func read() throws -> ProofSnapshot? {
        // Multiple SELECTs observe one consistent SQLite snapshot.
        try transaction(immediate: false) { try readInternal() }
    }

    private func readInternal(now: TimeInterval = Date().timeIntervalSince1970) throws -> ProofSnapshot? {
        let identity: (String, String, String, TimeInterval?, String)? = try withStatement(sql.readSession) { stmt in
            switch sqlite3_step(stmt) {
            case SQLITE_ROW: return (try text(stmt, 0), try text(stmt, 1), try text(stmt, 2),
                sqlite3_column_type(stmt, 3) == SQLITE_NULL ? nil : sqlite3_column_double(stmt, 3), try text(stmt, 4))
            case SQLITE_DONE: return nil
            default: throw ProofError.storage
            }
        }
        guard let (sessionID, restID, exerciseID, finishedAt, actionToken) = identity else { return nil }
        let params = ["sessionID": sessionID, "restID": restID, "now": String(now)]
        var startRequestID: String?, routineID: String?, routineName: String?, routineRevision: Int?, startedAt: TimeInterval?
        try withStatement(sql.readWorkout, params) { stmt in
            guard sqlite3_step(stmt) == SQLITE_ROW else { throw ProofError.storage }
            if sqlite3_column_type(stmt, 4) != SQLITE_NULL { startRequestID = try text(stmt, 4) }
            startedAt = sqlite3_column_type(stmt, 3) == SQLITE_NULL ? nil : sqlite3_column_double(stmt, 3)
            if sqlite3_column_type(stmt, 0) != SQLITE_NULL {
                routineID = try text(stmt, 0); routineName = try text(stmt, 1)
                routineRevision = Int(sqlite3_column_int64(stmt, 2))
            }
        }
        let exercises: [ProofExerciseSnapshot] = try withStatement(sql.readExercises, params) { stmt in
            var rows: [ProofExerciseSnapshot] = []
            while true {
                switch sqlite3_step(stmt) {
                case SQLITE_ROW:
                    rows.append(ProofExerciseSnapshot(exerciseID: try text(stmt, 0), name: try text(stmt, 2),
                        ordinal: Int(sqlite3_column_int64(stmt, 1)),
                        sourceExerciseID: sqlite3_column_type(stmt, 4) == SQLITE_NULL ? nil : try text(stmt, 4),
                        trackRest: sqlite3_column_int(stmt, 5) == 1,
                        restSeconds: sqlite3_column_type(stmt, 6) == SQLITE_NULL ? nil : Int(sqlite3_column_int64(stmt, 6)),
                        finishedAt: sqlite3_column_type(stmt, 3) == SQLITE_NULL ? nil : sqlite3_column_double(stmt, 3)))
                case SQLITE_DONE: return rows
                default: throw ProofError.storage
                }
            }
        }
        guard let currentExercise = exercises.first(where: { $0.exerciseID == exerciseID }) else { throw ProofError.storage }
        let sets: [ProofSetSnapshot] = try withStatement(sql.readSets, params) { stmt in
            var rows: [ProofSetSnapshot] = []
            while true {
                switch sqlite3_step(stmt) {
                case SQLITE_ROW:
                    rows.append(ProofSetSnapshot(setID: try text(stmt, 0),
                        ordinal: Int(sqlite3_column_int64(stmt, 1)),
                        pounds: sqlite3_column_type(stmt, 4) == SQLITE_NULL ? nil : sqlite3_column_double(stmt, 4),
                        reps: sqlite3_column_type(stmt, 5) == SQLITE_NULL ? nil : Int(sqlite3_column_int64(stmt, 5)),
                        rir: sqlite3_column_type(stmt, 10) == SQLITE_NULL ? nil : Int(sqlite3_column_int64(stmt, 10)),
                        skippedAt: sqlite3_column_type(stmt, 11) == SQLITE_NULL ? nil : sqlite3_column_double(stmt, 11),
                        skipToken: sqlite3_column_type(stmt, 12) == SQLITE_NULL ? nil : try text(stmt, 12), editRevision: Int(sqlite3_column_int64(stmt, 13)),
                        plannedPounds: sqlite3_column_type(stmt, 2) == SQLITE_NULL ? nil : sqlite3_column_double(stmt, 2),
                        plannedReps: sqlite3_column_type(stmt, 3) == SQLITE_NULL ? nil : Int(sqlite3_column_int64(stmt, 3)),
                        exerciseID: try text(stmt, 8), isAdded: sqlite3_column_int(stmt, 9) == 1,
                        completed: sqlite3_column_int(stmt, 6) == 1,
                        completionAttempts: Int(sqlite3_column_int64(stmt, 7))))
                case SQLITE_DONE: return rows
                default: throw ProofError.storage
                }
            }
        }
        let currentSets = sets.filter { $0.exerciseID == exerciseID }
        guard !currentSets.isEmpty, let display = currentSets.first(where: { !$0.completed && $0.skippedAt == nil }) ?? currentSets.last else {
            throw ProofError.storage
        }
        var started: TimeInterval?, deadline: TimeInterval?, skipped: TimeInterval?, continued: TimeInterval?
        var restSetID: String?, undone: TimeInterval?
        var state = "not_started", remaining = 0
        try withStatement(sql.readRest, params) { stmt in
            switch sqlite3_step(stmt) {
            case SQLITE_ROW:
                deadline = sqlite3_column_type(stmt, 0) == SQLITE_NULL ? nil : sqlite3_column_double(stmt, 0)
                started = sqlite3_column_double(stmt, 7)
                skipped = sqlite3_column_type(stmt, 1) == SQLITE_NULL ? nil : sqlite3_column_double(stmt, 1)
                state = try text(stmt, 2)
                remaining = Int(ceil(sqlite3_column_double(stmt, 3)))
                continued = sqlite3_column_type(stmt, 4) == SQLITE_NULL ? nil : sqlite3_column_double(stmt, 4)
                restSetID = try text(stmt, 5)
                undone = sqlite3_column_type(stmt, 6) == SQLITE_NULL ? nil : sqlite3_column_double(stmt, 6)
            case SQLITE_DONE:
                guard restID == "none" else { throw ProofError.storage }
            default: throw ProofError.storage
            }
        }
        return ProofSnapshot(sessionID: sessionID, restID: restID, actionToken: actionToken, startRequestID: startRequestID, startedAt: startedAt, routineID: routineID, routineName: routineName, routineRevision: routineRevision, sets: sets, exercises: exercises, currentExercise: currentExercise, finishedAt: finishedAt, displaySet: display,
            restDeadline: deadline, restSkippedAt: skipped, restContinuedAt: continued, restStartedAt: started, restSetID: restSetID, restUndoneAt: undone, restState: state, restRemainingSeconds: remaining)
    }

    private func migrate() throws {
        let version: Int = try withStatement("PRAGMA user_version") { stmt in
            guard sqlite3_step(stmt) == SQLITE_ROW else { throw ProofError.storage }
            return Int(sqlite3_column_int(stmt, 0))
        }
        guard version < 8 else { return }
        try transaction {
            // Recheck under the write lock to prevent a second legacy import.
            let lockedVersion: Int = try withStatement("PRAGMA user_version") { stmt in
                guard sqlite3_step(stmt) == SQLITE_ROW else { throw ProofError.storage }
                return Int(sqlite3_column_int(stmt, 0))
            }
            guard lockedVersion < 8 else { return }
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
            if lockedVersion < 3 {
                for statement in sql.migrationsV3 { try execute(statement) }
            }
            if lockedVersion < 4 {
                for statement in sql.migrationsV4 { try execute(statement) }
            }
            if lockedVersion < 5 { for statement in sql.migrationsV5 { try execute(statement) } }
            if lockedVersion < 6 { for statement in sql.migrationsV6 { try execute(statement) } }
            if lockedVersion < 7 { for statement in sql.migrationsV7 { try execute(statement) } }
            for statement in sql.migrationsV8 { try execute(statement) }
            try execute("PRAGMA user_version = 8")
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
