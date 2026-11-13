public import ExpoModulesCore

public final class LockScreenProofModule: Module {
    public func definition() -> ModuleDefinition {
        Name("LockScreenProof")
        AsyncFunction("start") { () async throws -> [String: Any] in
            try await ProofCoordinator.shared.start().dictionary
        }
        AsyncFunction("read") { () async throws -> [String: Any]? in
            try await ProofCoordinator.shared.read()?.dictionary
        }
        AsyncFunction("reset") { () async throws in
            try await ProofCoordinator.shared.reset()
        }
        AsyncFunction("readPublicationDiagnostics") { () async -> [[String: Any]] in
            let diagnostics = await ProofCoordinator.shared.readPublicationDiagnostics()
            return diagnostics.map { $0.dictionary }
        }
    }
}
