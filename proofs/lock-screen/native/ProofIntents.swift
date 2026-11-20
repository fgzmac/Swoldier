import AppIntents
import Foundation

struct ProofAdjustWeight: LiveActivityIntent {
    static let title: LocalizedStringResource = "Adjust proof weight"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String
    @Parameter(title: "Change") var delta: Int

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy", delta: Int) {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
        self.delta = delta
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .weight(delta))
        #endif
        return .result()
    }
}

struct ProofAdjustReps: LiveActivityIntent {
    static let title: LocalizedStringResource = "Adjust proof reps"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String
    @Parameter(title: "Change") var delta: Int

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy", delta: Int) {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
        self.delta = delta
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .reps(delta))
        #endif
        return .result()
    }
}

struct ProofAdjustRIR: LiveActivityIntent {
    static let title: LocalizedStringResource = "Adjust reps in reserve"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String
    @Parameter(title: "Change") var delta: Int

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy", delta: Int) {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
        self.delta = delta
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .rir(delta))
        #endif
        return .result()
    }
}

struct ProofClearRIR: LiveActivityIntent {
    static let title: LocalizedStringResource = "Clear reps in reserve"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .clearRIR)
        #endif
        return .result()
    }
}

struct ProofCompleteSet: LiveActivityIntent {
    static let title: LocalizedStringResource = "Complete proof set"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .complete)
        #endif
        return .result()
    }
}

struct ProofUndoSet: LiveActivityIntent {
    static let title: LocalizedStringResource = "Undo proof set"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .undo)
        #endif
        return .result()
    }
}

struct ProofContinueRest: LiveActivityIntent {
    static let title: LocalizedStringResource = "Continue"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .continueRest)
        #endif
        return .result()
    }
}

struct ProofAddSet: LiveActivityIntent {
    static let title: LocalizedStringResource = "Add Set"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .addSet)
        #endif
        return .result()
    }
}

struct ProofNextExercise: LiveActivityIntent {
    static let title: LocalizedStringResource = "Next Exercise"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .nextExercise)
        #endif
        return .result()
    }
}

struct ProofFinishWorkout: LiveActivityIntent {
    static let title: LocalizedStringResource = "Finish Workout"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .finishWorkout)
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
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .skip)
        #endif
        return .result()
    }
}

struct ProofIncrementReps: LiveActivityIntent {
    static let title: LocalizedStringResource = "Add one proof rep"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .reps(1))
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

struct ProofSkipSet: LiveActivityIntent {
    static let title: LocalizedStringResource = "Skip this set"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .skipSet)
        #endif
        return .result()
    }
}


struct ProofFinishEarly: LiveActivityIntent {
    static let title: LocalizedStringResource = "Finish exercise early"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .finishEarly)
        #endif
        return .result()
    }
}


struct ProofUndoSkip: LiveActivityIntent {
    static let title: LocalizedStringResource = "Undo skipped sets"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .undoSkip(actionToken))
        #endif
        return .result()
    }
}


struct ProofOptions: LiveActivityIntent {
    static let title: LocalizedStringResource = "Set options"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .options)
        #endif
        return .result()
    }
}


struct ProofBack: LiveActivityIntent {
    static let title: LocalizedStringResource = "Back to set"
    static var supportedModes: IntentModes { .background }
    static var authenticationPolicy: IntentAuthenticationPolicy { .requiresLocalDeviceAuthentication }

    @Parameter(title: "Session") var sessionID: String
    @Parameter(title: "Action version", default: "legacy") var actionToken: String
    @Parameter(title: "Set") var setID: String
    @Parameter(title: "Rest", default: "none") var restID: String

    init() {}
    init(sessionID: String, setID: String, restID: String, actionToken: String = "legacy") {
        self.sessionID = sessionID
        self.setID = setID
        self.restID = restID
        self.actionToken = actionToken
    }

    func perform() async throws -> some IntentResult {
        #if PROOF_WIDGET_EXTENSION
        try rejectExtensionExecution()
        #else
        await ProofCoordinator.shared.apply(sessionID: sessionID, setID: setID,
                                            restID: restID, actionToken: actionToken, action: .back)
        #endif
        return .result()
    }
}
