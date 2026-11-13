import AppIntents
import Foundation

struct ProofAdjustWeight: LiveActivityIntent {
    static let title: LocalizedStringResource = "Adjust proof weight"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String
    @Parameter(title: "Change") var delta: Int

    init() {}
    init(sessionID: String, setID: String, restID: String, delta: Int) {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.delta = delta
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, action: .weight(delta))
        #endif
        return .result()
    }
}

struct ProofAdjustReps: LiveActivityIntent {
    static let title: LocalizedStringResource = "Adjust proof reps"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String
    @Parameter(title: "Change") var delta: Int

    init() {}
    init(sessionID: String, setID: String, restID: String, delta: Int) {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.delta = delta
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, action: .reps(delta))
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
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String) {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, action: .complete)
        #endif
        return .result()
    }
}

struct ProofUndoSet: LiveActivityIntent {
    static let title: LocalizedStringResource = "Undo proof set"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String) {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, action: .undo)
        #endif
        return .result()
    }
}

struct ProofContinueRest: LiveActivityIntent {
    static let title: LocalizedStringResource = "Continue"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String) {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, action: .continueRest)
        #endif
        return .result()
    }
}

// Retained for already-archived cards; storage still validates all action IDs.
struct ProofSkipRest: LiveActivityIntent {
    static let title: LocalizedStringResource = "Skip proof rest"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String) {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, action: .skip)
        #endif
        return .result()
    }
}

struct ProofIncrementReps: LiveActivityIntent {
    static let title: LocalizedStringResource = "Add one proof rep"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String) {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, action: .reps(1))
        #endif
        return .result()
    }
}

#if PROOF_WIDGET_EXTENSION
private func rejectExtensionExecution() throws {
    throw NSError(domain: "LockScreenProof", code: 1, userInfo: [
        NSLocalizedDescriptionKey: "The workout action could not run in the app process."
    ])
}
#endif
