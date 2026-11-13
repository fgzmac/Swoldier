import ActivityKit
import Foundation

enum ProofAction: Sendable {
    case complete, skip, continueRest
    case weight(Int), reps(Int)
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
        var saveFailed: Bool = false
        // Optional fields decode the installed one-set activity without inventing IDs.
        var setID: String? = nil
        var restID: String? = nil
        var setNumber: Int? = nil
        var recordCount: Int? = nil
        var notice: String? = nil
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
