import ActivityKit
import Foundation

struct ProofPublicationDiagnostic: Sendable {
    let publicationID: String?
    let publicationTime, publishedStaleDate, savedRestDeadline: Date?
    let setNumber: Int?
    let saveFailed: Bool

    var dictionary: [String: Any] {
        ["publicationID": publicationID.map { $0 as Any } ?? NSNull(),
         "publicationTime": publicationTime.map { $0.timeIntervalSince1970 as Any } ?? NSNull(),
         "publishedStaleDate": publishedStaleDate.map { $0.timeIntervalSince1970 as Any } ?? NSNull(),
         "savedRestDeadline": savedRestDeadline.map { $0.timeIntervalSince1970 as Any } ?? NSNull(),
         "setNumber": setNumber.map { $0 as Any } ?? NSNull(),
         "saveFailed": saveFailed]
    }
}

actor ProofCoordinator {
    static let shared = ProofCoordinator()

    // Keep database commits and ActivityKit publishes ordered even across await.
    private var busy = false
    private var waiting: [CheckedContinuation<Void, Never>] = []

    func start() async throws -> ProofSnapshot {
        await acquire()
        defer { release() }

        guard let snapshot = try ProofStore().start() else { throw ProofError.storage }
        if let existing = activities(snapshot.sessionID).first {
            await existing.update(publication(content(snapshot)))
        } else if !snapshot.workoutFinished {
            guard ActivityAuthorizationInfo().areActivitiesEnabled else { throw ProofError.activitiesDisabled }
            _ = try Activity.request(
                attributes: ProofActivity(sessionID: snapshot.sessionID, setID: snapshot.setID),
                content: publication(content(snapshot)), pushType: nil
            )
        }
        return snapshot
    }

    func read() async throws -> ProofSnapshot? {
        await acquire()
        defer { release() }
        let snapshot = try ProofStore().read()
        if let snapshot {
            let savedContent = content(snapshot)
            for activity in activities(snapshot.sessionID) {
                // Upgrade/resume repair includes persisted Continue acknowledgement.
                // Compare first: foreground polling must not republish unchanged content.
                if activity.content.state.withoutPublicationDiagnostics() != savedContent.state || activity.content.staleDate != savedContent.staleDate {
                    await activity.update(publication(savedContent))
                }
            }
        }
        return snapshot
    }

    func apply(sessionID: String, setID: String, restID: String, action: ProofAction) async {
        await acquire()
        defer { release() }
        do {
            let result = try ProofStore().apply(sessionID: sessionID, setID: setID,
                                               restID: restID, action: action)
            guard let snapshot = result.snapshot, snapshot.sessionID == sessionID else { return }
            for activity in activities(sessionID) {
                await activity.update(publication(content(snapshot, notice: result.notice)))
            }
        } catch {
            for activity in activities(sessionID) {
                var lastDisplayed = activity.content.state
                lastDisplayed.saveFailed = true
                lastDisplayed.failedAction = ProofFailedAction(
                    sessionID: sessionID, setID: setID, restID: restID, action: action)
                // Keep the exact failed request; the view must not present old state as success.
                await activity.update(publication(content(lastDisplayed)))
            }
        }
    }

    func reset() async throws {
        await acquire()
        defer { release() }

        try ProofStore().reset()
        for activity in Activity<ProofActivity>.activities {
            await activity.end(nil, dismissalPolicy: .immediate)
        }
    }

    private func content(_ snapshot: ProofSnapshot, notice: String? = nil) -> ActivityContent<ProofActivity.ContentState> {
        content(ProofActivity.ContentState(
            pounds: snapshot.displaySet.pounds, reps: snapshot.displaySet.reps, completed: snapshot.completed,
            restDeadline: snapshot.restDeadline.map { Date(timeIntervalSince1970: $0) },
            restSkippedAt: snapshot.restSkippedAt.map { Date(timeIntervalSince1970: $0) },
            restContinuedAt: snapshot.restContinuedAt.map { Date(timeIntervalSince1970: $0) },
            // Read the stored rest-to-set association for legacy and new completion IDs.
            // This snapshot is returned only after the store transaction commits.
            savedRestSetID: snapshot.sets.first(where: {
                $0.completed && snapshot.restUndoneAt == nil && snapshot.restSetID == $0.setID
            })?.setID,
            restSetID: snapshot.restSetID,
            restUndoneAt: snapshot.restUndoneAt.map { Date(timeIntervalSince1970: $0) },
            setID: snapshot.setID, restID: snapshot.restID,
            setNumber: snapshot.displaySet.ordinal, recordCount: snapshot.recordCount, notice: notice,
            exerciseID: snapshot.currentExercise.exerciseID, exerciseName: snapshot.currentExercise.name,
            exerciseNumber: snapshot.currentExercise.ordinal, exerciseCount: snapshot.exercises.count,
            setCount: snapshot.currentSets.count, canChooseNext: snapshot.canChooseNext,
            hasNextExercise: snapshot.hasNextExercise, workoutFinished: snapshot.workoutFinished
        ))
    }

    private func content(_ state: ProofActivity.ContentState) -> ActivityContent<ProofActivity.ContentState> {
        // Expiry changes elapsed time only. Continue acknowledgement selects the card.
        ActivityContent(state: state, staleDate: nil)
    }

    private func publication(_ content: ActivityContent<ProofActivity.ContentState>) -> ActivityContent<ProofActivity.ContentState> {
        var state = content.state
        state.diagnosticPublicationID = String(UUID().uuidString.prefix(8))
        // Submission time, not acknowledgement, display time, or a stale-event timestamp.
        state.diagnosticPublicationTime = Date()
        return ActivityContent(state: state, staleDate: content.staleDate,
                               relevanceScore: content.relevanceScore)
    }

    // Manual D1 inspection only: no ProofStore read, foreground repair, or publication.
    func readPublicationDiagnostics() async -> [ProofPublicationDiagnostic] {
        await acquire()
        defer { release() }
        return Activity<ProofActivity>.activities.map { activity in
            let current = activity.content
            return ProofPublicationDiagnostic(
                publicationID: current.state.diagnosticPublicationID,
                publicationTime: current.state.diagnosticPublicationTime,
                publishedStaleDate: current.staleDate,
                savedRestDeadline: current.state.restDeadline,
                setNumber: current.state.setNumber,
                saveFailed: current.state.saveFailed
            )
        }
    }

    private func activities(_ sessionID: String) -> [Activity<ProofActivity>] {
        Activity<ProofActivity>.activities.filter { $0.attributes.sessionID == sessionID }
    }

    private func acquire() async {
        if !busy {
            busy = true
        } else {
            await withCheckedContinuation { waiting.append($0) }
        }
    }

    private func release() {
        if waiting.isEmpty {
            busy = false
        } else {
            waiting.removeFirst().resume()
        }
    }
}
