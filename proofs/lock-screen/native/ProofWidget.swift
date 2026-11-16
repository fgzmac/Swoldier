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
                } else if context.state.workoutFinished == true {
                    Text("Workout finished").font(.headline)
                } else if let setID = context.state.setID, let restID = context.state.restID {
                    if showsUndoneDraft(context) {
                        draft(context, setID: setID, restID: restID, duringUndoneRest: true)
                    } else if showsRest(context) {
                        if context.state.restUndoneAt != nil, context.state.restSetID != nil {
                            Text("Set returned to draft")
                                .font(.caption.weight(.semibold))
                        } else if let savedSetID = context.state.savedRestSetID,
                                  context.state.restSetID == savedSetID {
                            Text("✓ Set saved")
                                .font(.caption.weight(.semibold))
                                .accessibilityLabel("Set saved")
                        }
                        HStack(spacing: 8) {
                            if let deadline = context.state.restDeadline {
                                countdown(deadline, started: context.state.restStartedAt).font(.title2.weight(.semibold))
                            }
                            if let completedSetID = context.state.restSetID {
                                Button(intent: ProofUndoSet(sessionID: context.attributes.sessionID,
                                    setID: completedSetID, restID: restID)) {
                                    actionLabel("Undo")
                                }
                                .accessibilityLabel("Undo the set for this rest")
                            }
                            Button(intent: ProofContinueRest(sessionID: context.attributes.sessionID,
                                setID: setID, restID: restID)) {
                                actionLabel("Continue")
                            }
                        }
                    } else if context.state.completed {
                        if context.state.canChooseNext == true, context.state.exerciseID != nil {
                            // Deliberate order; no automatic advancement after final rest.
                            Button(intent: ProofAddSet(sessionID: context.attributes.sessionID,
                                setID: setID, restID: restID)) { actionLabel("Add Set") }
                            if context.state.hasNextExercise == true {
                                Button(intent: ProofNextExercise(sessionID: context.attributes.sessionID,
                                    setID: setID, restID: restID)) { actionLabel("Next Exercise") }
                            } else {
                                Button(intent: ProofFinishWorkout(sessionID: context.attributes.sessionID,
                                    setID: setID, restID: restID)) { actionLabel("Finish Workout") }
                            }
                        } else {
                            Text("Planned sets recorded").font(.headline)
                        }
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
            .padding(showsUndoneDraft(context) || (!showsRest(context) && !context.state.completed) ? 8 : 14)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.center) {
                    if context.state.saveFailed {
                        Text(context.state.failedAction == nil
                             ? "Action failed — reopen app"
                             : "Action failed — retry on Lock Screen")
                    } else if context.state.workoutFinished == true {
                        Text("Workout finished")
                    } else if showsRest(context), let deadline = context.state.restDeadline {
                        countdown(deadline, started: context.state.restStartedAt)
                    } else if showsRest(context) {
                        Text(context.state.restUndoneAt == nil ? "Set saved · Continue" : "Set returned to draft")
                    } else {
                        Text(context.state.completed ? "Planned sets recorded"
                             : "Set \(context.state.setNumber ?? 1) · \(context.state.poundsText) lb × \(context.state.repsText)")
                    }
                }
            } compactLeading: {
                Text(context.state.saveFailed ? "Failed" : (context.state.workoutFinished == true ? "Done" : (showsRest(context) ? "Rest" : "Set")))
            } compactTrailing: {
                if context.state.saveFailed {
                    Text("!").accessibilityLabel("Action failed")
                } else if showsRest(context), let deadline = context.state.restDeadline {
                    countdown(deadline, started: context.state.restStartedAt)
                } else { Text(context.state.workoutFinished == true ? "✓" : "\(context.state.setNumber ?? 1)/\(context.state.setCount ?? 3)") }
            } minimal: {
                if context.state.saveFailed {
                    Text("!").accessibilityLabel("Action failed")
                } else if showsRest(context), let deadline = context.state.restDeadline {
                    countdown(deadline, started: context.state.restStartedAt).font(.caption2)
                } else { Text(context.state.workoutFinished == true ? "✓" : "\(context.state.setNumber ?? 1)/\(context.state.setCount ?? 3)") }
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
                case .addSet:
                    failureMessage("Add Set failed")
                    Button(intent: ProofAddSet(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID)) { actionLabel("Retry Add Set") }
                case .nextExercise:
                    failureMessage("Next Exercise failed")
                    Button(intent: ProofNextExercise(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID)) { actionLabel("Retry Next Exercise") }
                case .finishWorkout:
                    failureMessage("Finish Workout failed")
                    Button(intent: ProofFinishWorkout(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID)) { actionLabel("Retry Finish Workout") }
                case .undo:
                    failureMessage("Undo failed — tap Retry Undo")
                    Button(intent: ProofUndoSet(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID)) { actionLabel("Retry Undo") }
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
                case .rir(let delta):
                    failureMessage("RIR change failed")
                    Button(intent: ProofAdjustRIR(sessionID: failed.sessionID, setID: failed.setID, restID: failed.restID, delta: delta)) { actionLabel("Retry RIR") }
                case .clearRIR:
                    failureMessage("Clear RIR failed")
                    Button(intent: ProofClearRIR(sessionID: failed.sessionID, setID: failed.setID, restID: failed.restID)) { actionLabel("Retry Clear RIR") }
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
        // No wall clock or isStale gate. Normal rest awaits Continue; committed
        // Undo exposes the draft immediately while retaining this same countdown.
        // Old skipped content was already dismissed; foreground migration backfills it.
        context.state.awaitingContinue ?? (context.state.restDeadline != nil && context.state.restContinuedAt == nil && context.state.restSkippedAt == nil)
    }

    private func showsUndoneDraft(_ context: ActivityViewContext<ProofActivity>) -> Bool {
        showsRest(context) && !context.state.completed && context.state.restUndoneAt != nil
            && context.state.setID != nil && context.state.restSetID == context.state.setID
    }

    private func draft(_ context: ActivityViewContext<ProofActivity>, setID: String, restID: String, duringUndoneRest: Bool = false) -> some View {
        VStack(spacing: 4) {
            // Three 44-point rows; combine context and RIR instead of adding a fourth row.
            HStack(spacing: 4) {
                VStack(alignment: .leading, spacing: 1) {
                    HStack(spacing: 3) {
                        Text(context.state.exerciseName ?? "Exercise").font(.caption).lineLimit(1)
                        if duringUndoneRest, let deadline = context.state.restDeadline {
                            countdown(deadline, started: context.state.restStartedAt).font(.caption2)
                        }
                    }
                    if let notice = context.state.notice {
                        Text(notice).font(.caption2).lineLimit(2)
                    } else {
                        HStack(spacing: 3) {
                            Text("Set \(context.state.setNumber ?? 1)/\(context.state.setCount ?? 3)\(duringUndoneRest ? " · Undo" : "")").font(.caption2)
                        }
                    }
                }.frame(minWidth: 60, maxWidth: .infinity, alignment: .leading)
                Button(intent: ProofAdjustRIR(sessionID: context.attributes.sessionID, setID: setID, restID: restID, delta: -1)) {
                    adjustment("−", "Decrease reps in reserve by one; blank remains unrecorded")
                }
                Text("RIR \(context.state.rir.map { String($0) } ?? "—")").font(.subheadline).monospacedDigit()
                    .accessibilityLabel(context.state.rir.map { "Reps in reserve, \($0)" } ?? "Reps in reserve, unrecorded")
                Button(intent: ProofAdjustRIR(sessionID: context.attributes.sessionID, setID: setID, restID: restID, delta: 1)) {
                    adjustment("+", "Increase reps in reserve by one; first entry is one")
                }
                Button(intent: ProofClearRIR(sessionID: context.attributes.sessionID, setID: setID, restID: restID)) {
                    Text("Clear").font(.subheadline).frame(minWidth: 44, minHeight: 44)
                        .background(Color.primary.opacity(0.08), in: RoundedRectangle(cornerRadius: 10))
                        .contentShape(Rectangle())
                }.accessibilityLabel("Clear reps in reserve to unrecorded")
            }
            HStack(spacing: 6) {
                Button(intent: ProofAdjustWeight(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID, delta: -5)) { adjustment("−", "Decrease weight by 5 pounds") }
                Text("\(context.state.poundsText) lb").accessibilityLabel(context.state.pounds == nil ? "Pounds blank" : "\(context.state.poundsText) pounds").font(.headline).monospacedDigit()
                Button(intent: ProofAdjustWeight(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID, delta: 5)) { adjustment("+", "Increase weight by 5 pounds") }
                Spacer(minLength: 4)
                Button(intent: ProofAdjustReps(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID, delta: -1)) { adjustment("−", "Decrease reps by one") }
                Text("\(context.state.repsText) reps").accessibilityLabel(context.state.reps == nil ? "Reps blank" : "\(context.state.repsText) reps").font(.headline).monospacedDigit()
                Button(intent: ProofAdjustReps(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID, delta: 1)) { adjustment("+", "Increase reps by one") }
            }
            HStack(spacing: 8) {
                Button(intent: ProofCompleteSet(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID)) {
                    actionLabel(duringUndoneRest ? "Complete Set" : "Complete")
                }
                .accessibilityLabel(duringUndoneRest ? "Complete Set" : "Complete")
                if duringUndoneRest {
                    Button(intent: ProofContinueRest(sessionID: context.attributes.sessionID,
                        setID: setID, restID: restID)) { actionLabel("End Rest") }
                        .accessibilityLabel("End Rest")
                        .accessibilityHint("Dismisses rest without saving the draft; preserves your edits")
                }
            }
        }.minimumScaleFactor(1)
    }

    @ViewBuilder
    private func countdown(_ deadline: Date, started: Date?) -> some View {
        let beginning = started ?? deadline.addingTimeInterval(-20)
        if deadline <= beginning {
            Text("0:00").monospacedDigit()
        } else {
            Text(.currentDate, format: .timer(countingDownIn: beginning..<deadline, showsHours: false))
                .monospacedDigit()
        }
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
