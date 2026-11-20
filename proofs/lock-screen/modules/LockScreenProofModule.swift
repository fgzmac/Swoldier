public import ExpoModulesCore

public final class LockScreenProofModule: Module {
    public func definition() -> ModuleDefinition {
        Name("LockScreenProof")
        AsyncFunction("organizer") { (section: String) async throws -> String in
            try await RoutineService.shared.organizer(section)
        }
        AsyncFunction("saveOrganizer") { (section: String, revision: Int, document: String) async throws in
            try await RoutineService.shared.saveOrganizer(section, revision: revision, document: document)
        }
        AsyncFunction("calendarDays") { () async throws -> String in
            try await RoutineService.shared.calendar()
        }
        AsyncFunction("saveCalendarDay") { (day: String, revision: Int, document: String) async throws in
            try await RoutineService.shared.saveDay(day, revision: revision, document: document)
        }
        AsyncFunction("routineLibrary") { () async throws -> String in
            try await RoutineService.shared.library()
        }
        AsyncFunction("createRoutineExercise") { (name: String) async throws -> String in
            try await RoutineService.shared.createExercise(name)
        }
        AsyncFunction("saveRoutine") { (json: String) async throws -> String in
            try await RoutineService.shared.save(json)
        }
        AsyncFunction("deleteRoutine") { (id: String, revision: Int) async throws in
            try await RoutineService.shared.delete(id, revision: revision)
        }
        AsyncFunction("routineSchedule") { () async throws -> String in
            try await RoutineService.shared.schedule()
        }
        AsyncFunction("assignRoutineDay") { (day: String, id: String?) async throws in
            try await RoutineService.shared.assign(day, id: id)
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
                let active = try await ProofCoordinator.shared.read()
                return ["startRejection": "workout_unfinished", "activeSession": active?.sessionID ?? "", "resolutionToken": active?.resolutionToken ?? ""]
            }
        }
        AsyncFunction("resolveAndStartRoutine") { (id: String, revision: Int, requestID: String, resolution: String, sessionID: String, token: String) async throws -> [String: Any] in
            try await ProofCoordinator.shared.startRoutine(id: id, revision: revision, requestID: requestID, resolution: resolution, expectedSession: sessionID, expectedToken: token).dictionary
        }
        AsyncFunction("editWorkoutSet") { (json: String) async throws -> [String: Any] in
            try await ProofCoordinator.shared.editSet(json).dictionary
        }
        AsyncFunction("workoutHistory") { () async throws -> [[String: Any]] in
            try await ProofCoordinator.shared.history()
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
