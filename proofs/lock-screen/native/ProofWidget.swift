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
                    if context.state.showOptions == true {
                        options(context, setID: setID, restID: restID)
                    } else if showsUndoneDraft(context) {
                        draft(context, setID: setID, restID: restID, duringUndoneRest: true)
                    } else if showsRest(context) {
                        exerciseHeader(context)
                        if context.state.restSetSkipped == true {
                            Text("Set skipped").font(.caption.weight(.semibold))
                        } else if context.state.restUndoneAt != nil, context.state.restSetID != nil {
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
                                timerPanel(deadline, started: context.state.restStartedAt)
                            }
                            if let completedSetID = context.state.savedRestSetID {
                                Button(intent: ProofUndoSet(sessionID: context.attributes.sessionID,
                                    setID: completedSetID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) {
                                    actionLabel("Undo")
                                }
                                .accessibilityLabel("Undo the set for this rest")
                            }
                            if context.state.undoSkipToken != nil {
                                Button(intent: ProofUndoSkip(sessionID: context.attributes.sessionID, setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) { actionLabel("Undo skip") }
                            }
                            Button(intent: ProofContinueRest(sessionID: context.attributes.sessionID,
                                setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) {
                                actionLabel("End Rest").padding(.horizontal, 5).background(.thinMaterial, in: RoundedRectangle(cornerRadius: 8))
                            }
                        }
                    } else if context.state.completed {
                        if context.state.canChooseNext == true, context.state.exerciseID != nil {
                            // Deliberate order; no automatic advancement after final rest.
                            Button(intent: ProofAddSet(sessionID: context.attributes.sessionID,
                                setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) { actionLabel("Add Set") }
                            if context.state.hasNextExercise == true {
                                Button(intent: ProofNextExercise(sessionID: context.attributes.sessionID,
                                    setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) { actionLabel(context.state.nextExerciseName.map { "Next: \($0)" } ?? "Next Exercise") }
                            } else {
                                Button(intent: ProofFinishWorkout(sessionID: context.attributes.sessionID,
                                    setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) { actionLabel("Finish workout") }
                            }
                            if context.state.undoSkipToken != nil {
                                Button(intent: ProofUndoSkip(sessionID: context.attributes.sessionID, setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) { actionLabel("Undo skip") }
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
            .padding(.horizontal, 6).padding(.vertical, 2)
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
                        Text(context.state.restSetSkipped == true ? "Set skipped · End Rest" : (context.state.restUndoneAt == nil ? "Set saved · End Rest" : "Set returned to draft"))
                    } else {
                        Text(context.state.completed ? "Choose next action"
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
                case .skipSet:
                    failureMessage("Skip failed")
                    Button(intent: ProofSkipSet(sessionID: failed.sessionID, setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy")) { actionLabel("Retry Skip") }
                case .finishEarly:
                    failureMessage("Finish early failed")
                    Button(intent: ProofFinishEarly(sessionID: failed.sessionID, setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy")) { actionLabel("Retry Finish early") }
                case .undoSkip:
                    failureMessage("Undo skip failed")
                    Button(intent: ProofUndoSkip(sessionID: failed.sessionID, setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy")) { actionLabel("Retry Undo skip") }
                case .options:
                    failureMessage("Could not show options")
                    Button(intent: ProofOptions(sessionID: failed.sessionID, setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy")) { actionLabel("Retry Options") }
                case .back:
                    failureMessage("Could not show controls")
                    Button(intent: ProofBack(sessionID: failed.sessionID, setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy")) { actionLabel("Back") }
                case .complete:
                    failureMessage("Complete request failed")
                    Button(intent: ProofCompleteSet(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy")) { actionLabel("Retry Complete") }
                case .addSet:
                    failureMessage("Add Set failed")
                    Button(intent: ProofAddSet(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy")) { actionLabel("Retry Add Set") }
                case .nextExercise:
                    failureMessage("Next Exercise failed")
                    Button(intent: ProofNextExercise(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy")) { actionLabel("Retry Next Exercise") }
                case .finishWorkout:
                    failureMessage("Finish Workout failed")
                    Button(intent: ProofFinishWorkout(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy")) { actionLabel("Retry Finish Workout") }
                case .undo:
                    failureMessage("Undo failed — tap Retry Undo")
                    Button(intent: ProofUndoSet(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy")) { actionLabel("Retry Undo") }
                case .continueRest:
                    failureMessage("End Rest failed — tap End Rest to retry")
                    Button(intent: ProofContinueRest(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy")) { actionLabel("End Rest").padding(.horizontal, 5).background(.thinMaterial, in: RoundedRectangle(cornerRadius: 8)) }
                case .skip:
                    failureMessage("End Rest failed — tap End Rest to retry")
                    Button(intent: ProofSkipRest(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy")) { actionLabel("End Rest").padding(.horizontal, 5).background(.thinMaterial, in: RoundedRectangle(cornerRadius: 8)) }
                case .weight(let delta):
                    failureMessage("Weight change failed")
                    Button(intent: ProofAdjustWeight(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy", delta: delta)) { actionLabel("Retry change") }
                case .rir(let delta):
                    failureMessage("RIR change failed")
                    Button(intent: ProofAdjustRIR(sessionID: failed.sessionID, setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy", delta: delta)) { actionLabel("Retry RIR") }
                case .clearRIR:
                    failureMessage("Clear RIR failed")
                    Button(intent: ProofClearRIR(sessionID: failed.sessionID, setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy")) { actionLabel("Retry Clear RIR") }
                case .reps(let delta):
                    failureMessage("Rep change failed")
                    Button(intent: ProofAdjustReps(sessionID: failed.sessionID,
                        setID: failed.setID, restID: failed.restID, actionToken: failed.actionToken ?? "legacy", delta: delta)) { actionLabel("Retry change") }
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
        VStack(spacing: 2) {
            HStack {
                exerciseHeader(context)
                if duringUndoneRest, let deadline = context.state.restDeadline {
                    timerPanel(deadline, started: context.state.restStartedAt)
                }
            }
            if let notice = context.state.notice {
                Text(notice).font(.caption.weight(.semibold))
            }
            HStack(spacing: 8) {
                Button(intent: ProofClearRIR(sessionID: context.attributes.sessionID, setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) { actionLabel("Clear RIR") }
                    .accessibilityLabel("Clear reps in reserve to unrecorded")
                Spacer(minLength: 16)
                Button(intent: ProofAdjustRIR(sessionID: context.attributes.sessionID, setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy", delta: -1)) { adjustment("−", "Decrease reps in reserve; blank remains blank") }
                Text("RIR \(context.state.rir.map { String($0) } ?? "—")").font(.subheadline).monospacedDigit()
                Button(intent: ProofAdjustRIR(sessionID: context.attributes.sessionID, setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy", delta: 1)) { adjustment("+", "Increase reps in reserve; first entry zero") }
            }
            HStack(spacing: 6) {
                Button(intent: ProofAdjustWeight(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy", delta: -5)) { adjustment("−", "Decrease weight by 5 pounds") }
                Link("\(context.state.poundsText) lb", destination: editURL(context, setID: setID)).accessibilityLabel(context.state.pounds == nil ? "Edit set: pounds blank" : "Edit set: \(context.state.poundsText) pounds").accessibilityHint("Opens this exact set in the app").frame(minHeight: 44).font(.headline).monospacedDigit()
                Button(intent: ProofAdjustWeight(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy", delta: 5)) { adjustment("+", "Increase weight by 5 pounds") }
                Spacer(minLength: 4)
                Button(intent: ProofAdjustReps(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy", delta: -1)) { adjustment("−", "Decrease reps by one") }
                Text(context.state.notice == "Enter reps before Complete" && context.state.reps == nil ? "Enter reps" : "\(context.state.repsText) reps").accessibilityLabel(context.state.reps == nil ? "Reps blank" : "\(context.state.repsText) reps").font(.headline).monospacedDigit()
                Button(intent: ProofAdjustReps(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy", delta: 1)) { adjustment("+", "Increase reps by one") }
            }
            HStack(spacing: 8) {
                Button(intent: ProofCompleteSet(sessionID: context.attributes.sessionID,
                    setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) {
                    actionLabel(duringUndoneRest ? "Complete Set" : "Complete")
                }
                .accessibilityLabel(duringUndoneRest ? "Complete Set" : "Complete")
                Button(intent: ProofOptions(sessionID: context.attributes.sessionID, setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) { actionLabel("Options") }
                if duringUndoneRest {
                    Button(intent: ProofContinueRest(sessionID: context.attributes.sessionID,
                        setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) { actionLabel("End Rest").padding(.horizontal, 5).background(.thinMaterial, in: RoundedRectangle(cornerRadius: 8)) }
                        .accessibilityLabel("End Rest")
                        .accessibilityHint("Dismisses rest without saving the draft; preserves your edits")
                }
            }
        }.minimumScaleFactor(1)
    }

    private func editURL(_ context: ActivityViewContext<ProofActivity>, setID: String) -> URL {
        var url = URLComponents(); url.scheme = "swoldier-proof"; url.host = "set"
        url.queryItems = [URLQueryItem(name: "session", value: context.attributes.sessionID), URLQueryItem(name: "set", value: setID)]
        return url.url!
    }
    private func options(_ context: ActivityViewContext<ProofActivity>, setID: String, restID: String) -> some View {
        VStack(spacing: 4) {
            HStack {
                Link(destination: editURL(context, setID: setID)) { actionLabel("Edit set in app") }
                Button(intent: ProofBack(sessionID: context.attributes.sessionID, setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) { actionLabel("Back") }
            }
            HStack {
                Button(intent: ProofSkipSet(sessionID: context.attributes.sessionID, setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) { actionLabel("Skip set") }
                if context.state.undoSkipToken != nil {
                    Button(intent: ProofUndoSkip(sessionID: context.attributes.sessionID, setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) { actionLabel("Undo skip") }
                }
            }
            Button(intent: ProofFinishEarly(sessionID: context.attributes.sessionID, setID: setID, restID: restID, actionToken: context.state.actionToken ?? "legacy")) { actionLabel("Finish exercise early") }
        }
    }

    private func exerciseHeader(_ context: ActivityViewContext<ProofActivity>) -> some View {
        HStack(alignment: .firstTextBaseline, spacing: 6) {
            Text(context.state.exerciseName ?? "Exercise").font(.headline.bold()).lineLimit(2)
            Spacer(minLength: 0)
            Text("Set \(context.state.setNumber ?? 1) of \(context.state.setCount ?? 1)")
                .font(.subheadline.bold()).monospacedDigit().fixedSize(horizontal: true, vertical: false)
        }
    }

    private func timerPanel(_ deadline: Date, started: Date?) -> some View {
        HStack(spacing: 4) {
            Text("Rest").font(.caption.bold())
            countdown(deadline, started: started).font(.title3.bold())
        }
        .foregroundStyle(.white)
        .padding(.horizontal, 8).padding(.vertical, 2)
        .background(Color(red: 0.06, green: 0.13, blue: 0.10), in: RoundedRectangle(cornerRadius: 10))
        .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.mint.opacity(0.95), lineWidth: 1.5))
        .shadow(color: .mint.opacity(0.3), radius: 2)
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
            .frame(width: 44, height: 44)
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
