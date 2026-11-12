import ActivityKit
import Foundation

actor ProofCoordinator {
    static let shared = ProofCoordinator()

    // Keep database commits and ActivityKit publishes ordered even across await.
    private var busy = false
    private var waiting: [CheckedContinuation<Void, Never>] = []

    func start() async throws -> ProofSnapshot {
        await acquire()
        defer { release() }

        guard let snapshot = try ProofStore().start() else { throw ProofError.storage }
        if let existing = activities(snapshot.sessionID, snapshot.setID).first {
            await existing.update(content(snapshot))
        } else if !snapshot.completed {
            guard ActivityAuthorizationInfo().areActivitiesEnabled else { throw ProofError.activitiesDisabled }
            _ = try Activity.request(
                attributes: ProofActivity(sessionID: snapshot.sessionID, setID: snapshot.setID),
                content: content(snapshot), pushType: nil
            )
        }
        return snapshot
    }

    func read() throws -> ProofSnapshot? { try ProofStore().read() }

    func apply(sessionID: String, setID: String, complete: Bool, skipRest: Bool = false) async {
        await acquire()
        defer { release() }

        do {
            let store = try ProofStore()
            let result: ProofSnapshot?
            if skipRest {
                result = try store.skipRest(sessionID: sessionID, setID: setID)
            } else {
                result = try store.mutate(sessionID: sessionID, setID: setID, complete: complete)
            }
            guard let snapshot = result,
                  snapshot.sessionID == sessionID, snapshot.setID == setID else { return }

            for activity in activities(sessionID, setID) {
                await activity.update(content(snapshot))
            }
        } catch {
            for activity in activities(sessionID, setID) {
                var lastDisplayed = activity.content.state
                lastDisplayed.saveFailed = true
                await activity.update(ActivityContent(state: lastDisplayed, staleDate: nil))
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

    private func content(_ snapshot: ProofSnapshot) -> ActivityContent<ProofActivity.ContentState> {
        ActivityContent(
            state: ProofActivity.ContentState(
                pounds: snapshot.pounds, reps: snapshot.reps, completed: snapshot.completed,
                restDeadline: snapshot.restDeadline.map { Date(timeIntervalSince1970: $0) },
                restSkippedAt: snapshot.restSkippedAt.map { Date(timeIntervalSince1970: $0) }
            ), staleDate: nil
        )
    }

    private func activities(_ sessionID: String, _ setID: String) -> [Activity<ProofActivity>] {
        Activity<ProofActivity>.activities.filter {
            $0.attributes.sessionID == sessionID && $0.attributes.setID == setID
        }
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
