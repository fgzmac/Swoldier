public import ExpoModulesCore

public final class LockScreenProofModule: Module {
    public func definition() -> ModuleDefinition {
        Name("LockScreenProof")
        AsyncFunction("routineLibrary") { () async throws -> String in
            try await RoutineService.shared.library()
        }
        AsyncFunction("createRoutineExercise") { (name: String) async throws -> String in
            try await RoutineService.shared.createExercise(name)
        }
        AsyncFunction("saveRoutine") { (json: String) async throws -> String in
            try await RoutineService.shared.save(json)
        }
        AsyncFunction("newRoutineStartRequest") { () async -> String in
            await ProofCoordinator.shared.newStartRequest()
        }
        AsyncFunction("startRoutine") { (id: String, revision: Int, requestID: String) async throws -> [String: Any] in
            do {
                return try await ProofCoordinator.shared.startRoutine(id: id, revision: revision, requestID: requestID).dictionary
            } catch ProofError.unfinishedWorkout {
                // Expected refusal, not an Expo UnexpectedException. Keep a stable diagnostic code.
                // All other errors still reject with their original diagnostics.
                return ["startRejection": "workout_unfinished"]
            }
        }
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
