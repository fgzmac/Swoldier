import ActivityKit
import Foundation

enum ProofAction: Codable, Hashable, Sendable {
    case complete, skip, continueRest, undo, addSet, nextExercise, finishWorkout
    case weight(Int), reps(Int)
}

// Retry the failed request, never infer its target from a newer displayed draft/rest.
struct ProofFailedAction: Codable, Hashable, Sendable {
    let sessionID: String
    let setID: String
    let restID: String
    let action: ProofAction
}

struct ProofActivity: ActivityAttributes {
    struct ContentState: Codable, Hashable {
        let pounds: Int
        let reps: Int
        let completed: Bool
        var restDeadline: Date? = nil
        var restSkippedAt: Date? = nil
        // Optional for old content; nil means not acknowledged.
        var restContinuedAt: Date? = nil
        // Set confirmed completed in the stored snapshot for this rest; absent on older cards.
        var savedRestSetID: String? = nil
        // Explicit association replaces inference from the rest ID format. Optional for old cards.
        var restSetID: String? = nil
        var restUndoneAt: Date? = nil
        var saveFailed: Bool = false
        // Optional so older publications still decode without inventing a retry target.
        var failedAction: ProofFailedAction? = nil
        // Optional fields decode the installed one-set activity without inventing IDs.
        var setID: String? = nil
        var restID: String? = nil
        var setNumber: Int? = nil
        var recordCount: Int? = nil
        var notice: String? = nil
        var exerciseID: String? = nil
        var exerciseName: String? = nil
        var exerciseNumber: Int? = nil
        var exerciseCount: Int? = nil
        var setCount: Int? = nil
        var canChooseNext: Bool? = nil
        var hasNextExercise: Bool? = nil
        var workoutFinished: Bool? = nil
        // Temporary D1 metadata; optional so existing activity content still decodes.
        var diagnosticPublicationID: String? = nil
        var diagnosticPublicationTime: Date? = nil

        func withoutPublicationDiagnostics() -> Self {
            var state = self
            state.diagnosticPublicationID = nil
            state.diagnosticPublicationTime = nil
            return state
        }
    }
    let sessionID: String
    // Retained for compatibility with installed ActivityAttributes; actions use state.setID.
    let setID: String
}
