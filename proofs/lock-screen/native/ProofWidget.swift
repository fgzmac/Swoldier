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
                if let setID = context.state.setID, let restID = context.state.restID {
                    if showsRest(context), let deadline = context.state.restDeadline {
                        // Only the bounded timer and Continue are shown during rest.
                        HStack(spacing: 16) {
                            countdown(deadline).font(.largeTitle.weight(.semibold))
                                .accessibilityHint(context.state.saveFailed ? "Save failed. Tap Continue to retry." : "")
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
                    if showsRest(context), let deadline = context.state.restDeadline {
                        countdown(deadline)
                    } else {
                        Text(context.state.completed ? "Planned sets recorded"
                             : "Set \(context.state.setNumber ?? 1) · \(context.state.pounds) lb × \(context.state.reps)")
                    }
                }
            } compactLeading: {
                Text(showsRest(context) ? "Rest" : "Set")
            } compactTrailing: {
                if showsRest(context), let deadline = context.state.restDeadline {
                    countdown(deadline)
                } else { Text("\(context.state.setNumber ?? 1)/3") }
            } minimal: {
                if showsRest(context), let deadline = context.state.restDeadline {
                    countdown(deadline).font(.caption2)
                } else { Text("\(context.state.setNumber ?? 1)/3") }
            }
        }
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
                if context.state.saveFailed {
                    Text("Save failed — retry").font(.caption)
                } else if let notice = context.state.notice {
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
