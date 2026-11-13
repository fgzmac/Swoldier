import ActivityKit
import AppIntents
import Foundation
import SwiftUI
import WidgetKit

@main
struct ProofWidget: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: ProofActivity.self) { context in
            VStack(spacing: 4) {
                if context.state.saveFailed {
                    failure(context.state.failedAction)
                } else if let setID = context.state.setID, let restID = context.state.restID {
                    if showsRest(context), let deadline = context.state.restDeadline {
                        if let savedSetID = context.state.savedRestSetID,
                           restID == savedSetID + ":rest" {
                            Text("✓ Set saved")
                                .font(.caption.weight(.semibold))
                                .accessibilityLabel("Set saved")
                        }
                        HStack(spacing: 16) {
                            countdown(deadline).font(.largeTitle.weight(.semibold))
                            Button(intent: ProofContinueRest(sessionID: context.attributes.sessionID,
                                setID: setID, restID: restID)) {
                                actionLabel("Continue")
                            }
                        }
                    } else if context.state.completed {
                        Text("Planned sets recorded").font(.headline)
                    } else {
                        draft(context, setID: setID, restID: restID)
                    }
                } else {
                    // A decoded pre-three-set card has no valid action IDs yet.
                    Text("Open proof once to refresh this older card").font(.caption)
                }
            }
            .buttonStyle(.plain)
            .lineLimit(1)
            .minimumScaleFactor(0.8)
            .padding(14)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.center) {
                    if context.state.saveFailed {
                        Text(context.state.failedAction == nil
                             ? "Action failed — reopen app"
                             : "Action failed — retry on Lock Screen")
                    } else if showsRest(context), let deadline = context.state.restDeadline {
                        countdown(deadline)
                    } else {
                        Text(context.state.completed ? "Planned sets recorded"
                             : "Set \(context.state.setNumber ?? 1) · \(context.state.pounds) lb × \(context.state.reps)")
                    }
                }
            } compactLeading: {
                Text(context.state.saveFailed ? "Failed" : (showsRest(context) ? "Rest" : "Set"))
            } compactTrailing: {
                if context.state.saveFailed {
                    Text("!").accessibilityLabel("Action failed")
                } else if showsRest(context), let deadline = context.state.restDeadline {
                    countdown(deadline)
                } else { Text("\(context.state.setNumber ?? 1)/3") }
            } minimal: {
                if context.state.saveFailed {
                    Text("!").accessibilityLabel("Action failed")
                } else if showsRest(context), let deadline = context.state.restDeadline {
                    countdown(deadline).font(.caption2)
                } else { Text("\(context.state.setNumber ?? 1)/3") }
            }
        }
    }

    @ViewBuilder
    private func failure(_ failed: ProofFailedAction?) -> some View {
        // Failure replaces all normal layouts, including rest and the final summary.
        // A failed duplicate request does not establish that the original set is unsaved.
        VStack(spacing: 4) {
            if let failed {
                switch failed.action {
                case .complete:
                    failureMessage("Complete request failed")
                    Button(intent: ProofCompleteSet(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID)) { actionLabel("Retry Complete") }
                case .continueRest:
                    failureMessage("Continue failed — tap Continue to retry")
                    Button(intent: ProofContinueRest(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID)) { actionLabel("Continue") }
                case .skip:
                    failureMessage("Continue failed — tap Continue to retry")
                    Button(intent: ProofSkipRest(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID)) { actionLabel("Continue") }
                case .weight(let delta):
                    failureMessage("Weight change failed")
                    Button(intent: ProofAdjustWeight(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID, delta: delta)) { actionLabel("Retry change") }
                case .reps(let delta):
                    failureMessage("Rep change failed")
                    Button(intent: ProofAdjustReps(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID, delta: delta)) { actionLabel("Retry change") }
                }
            } else {
                failureMessage("Request failed — reopen app to check saved state")
            }
        }
    }

    private func failureMessage(_ message: String) -> some View {
        Text(message).font(.caption.weight(.semibold))
            .lineLimit(2).fixedSize(horizontal: false, vertical: true)
    }

    private func showsRest(_ context: ActivityViewContext<ProofActivity>) -> Bool {
        // No wall clock or isStale gate: zero stays on the rest card until Continue.
        // Old skipped content was already dismissed; foreground migration backfills it.
        context.state.restDeadline != nil && context.state.restContinuedAt == nil && context.state.restSkippedAt == nil
    }

    private func draft(_ context: ActivityViewContext<ProofActivity>, setID: String, restID: String) -> some View {
        VStack(spacing: 4) {
            HStack {
                Text("Set \(context.state.setNumber ?? 1)/3 · \(context.state.recordCount ?? 0) saved")
                    .font(.caption.weight(.semibold))
                Spacer(minLength: 4)
                if let notice = context.state.notice {
                    Text(notice).font(.caption)
                }
            }
            HStack(spacing: 6) {
                Button(intent: ProofAdjustWeight(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID, delta: -5)) { adjustment("−", "Decrease weight by 5 pounds") }
                Text("\(context.state.pounds) lb").font(.headline).monospacedDigit()
                Button(intent: ProofAdjustWeight(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID, delta: 5)) { adjustment("+", "Increase weight by 5 pounds") }
                Spacer(minLength: 4)
                Button(intent: ProofAdjustReps(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID, delta: -1)) { adjustment("−", "Decrease reps by one") }
                Text("\(context.state.reps) reps").font(.headline).monospacedDigit()
                Button(intent: ProofAdjustReps(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID, delta: 1)) { adjustment("+", "Increase reps by one") }
            }
            Button(intent: ProofCompleteSet(sessionID: context.attributes.sessionID,
                setID: setID, restID: restID)) { actionLabel("Complete") }
        }
    }

    private func countdown(_ deadline: Date) -> some View {
        Text(.currentDate, format: .timer(
            countingDownIn: deadline.addingTimeInterval(-20)..<deadline, showsHours: false
        ))
        .monospacedDigit()
    }
    private func adjustment(_ symbol: String, _ description: String) -> some View {
        Text(symbol).font(.headline)
            .frame(width: 40, height: 44)
            .background(Color.primary.opacity(0.08), in: RoundedRectangle(cornerRadius: 10))
            .contentShape(Rectangle()).accessibilityLabel(description)
    }
    private func actionLabel(_ title: String) -> some View {
        Text(title).font(.subheadline.weight(.semibold))
            .frame(maxWidth: .infinity, minHeight: 44)
            .background(Color.primary.opacity(0.08), in: RoundedRectangle(cornerRadius: 10))
            .contentShape(Rectangle())
    }
}
