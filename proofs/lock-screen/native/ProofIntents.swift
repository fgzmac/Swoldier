import AppIntents
import Foundation

struct ProofIncrementReps: LiveActivityIntent {
    static let title: LocalizedStringResource = "Add one proof rep"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Set") var setID: String

    init() {}
    init(sessionID: String, setID: String) {
        self.sessionID = sessionID
        self.setID = setID
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID, complete: false)
        #endif
        return .result()
    }
}

struct ProofCompleteSet: LiveActivityIntent {
    static let title: LocalizedStringResource = "Complete proof set"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Set") var setID: String

    init() {}
    init(sessionID: String, setID: String) {
        self.sessionID = sessionID
        self.setID = setID
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID, complete: true)
        #endif
        return .result()
    }
}

struct ProofSkipRest: LiveActivityIntent {
    static let title: LocalizedStringResource = "Skip proof rest"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Set") var setID: String

    init() {}
    init(sessionID: String, setID: String) {
        self.sessionID = sessionID
        self.setID = setID
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(
            sessionID: sessionID, setID: setID, complete: false, skipRest: true
        )
        #endif
        return .result()
    }
}

#if PROOF_WIDGET_EXTENSION
private func rejectExtensionExecution() throws {
    // LiveActivityIntent normally runs in the containing app process.
    // If iOS ever executes here, fail without showing a successful save.
    throw NSError(domain: "LockScreenProof", code: 1, userInfo: [
        NSLocalizedDescriptionKey: "The workout action could not run in the app process."
    ])
}
#endif
