import ActivityKit

struct ProofActivity: ActivityAttributes {
    struct ContentState: Codable, Hashable {
        let pounds: Int
        let reps: Int
        let completed: Bool
        var saveFailed: Bool = false
    }

    let sessionID: String
    let setID: String
}
