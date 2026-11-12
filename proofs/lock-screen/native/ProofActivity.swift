import ActivityKit
import Foundation

struct ProofActivity: ActivityAttributes {
    struct ContentState: Codable, Hashable {
        let pounds: Int
        let reps: Int
        let completed: Bool
        var restDeadline: Date? = nil
        var restSkippedAt: Date? = nil
        var saveFailed: Bool = false
    }

    let sessionID: String
    let setID: String
}
