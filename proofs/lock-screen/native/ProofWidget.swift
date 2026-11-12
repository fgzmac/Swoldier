import ActivityKit
import AppIntents
import SwiftUI
import WidgetKit

@main
struct ProofWidget: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: ProofActivity.self) { context in
            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Text("Workout proof").font(.caption.weight(.semibold))
                    Spacer(minLength: 8)
                    Text(context.state.saveFailed ? "Save failed — retry"
                         : context.state.completed ? "Set saved" : "Draft")
                        .font(.caption)
                }
                HStack(alignment: .firstTextBaseline, spacing: 12) {
                    Text("\(context.state.pounds) lb × \(context.state.reps) reps")
                        .font(.headline)
                    Spacer(minLength: 0)
                    if let deadline = context.state.restDeadline {
                        if context.state.restSkippedAt != nil {
                            Text("Rest skipped").font(.subheadline)
                        } else {
                            HStack(alignment: .firstTextBaseline, spacing: 4) {
                                Text("Rest").font(.caption)
                                Text(.currentDate, format: .timer(
                                    countingDownIn: deadline.addingTimeInterval(-20)..<deadline,
                                    showsHours: false
                                ))
                                .font(.title2.weight(.semibold))
                                .monospacedDigit()
                            }
                        }
                    } else {
                        Text("Rest not started").font(.caption)
                    }
                }
                HStack(spacing: 8) {
                    Button(intent: ProofIncrementReps(
                        sessionID: context.attributes.sessionID, setID: context.attributes.setID
                    )) { actionLabel("+1 rep") }
                    .disabled(context.state.completed)
                    .opacity(context.state.completed ? 0.45 : 1)
                    Button(intent: ProofCompleteSet(
                        sessionID: context.attributes.sessionID, setID: context.attributes.setID
                    )) { actionLabel("Complete set") }
                    // Keep Complete available for duplicate-request testing. Skip may remain
                    // at zero: the store rejects expired requests without an expiry callback.
                    if context.state.restDeadline != nil && context.state.restSkippedAt == nil {
                        Button(intent: ProofSkipRest(
                            sessionID: context.attributes.sessionID, setID: context.attributes.setID
                        )) { actionLabel("Skip rest") }
                    }
                }
                .buttonStyle(.plain)
            }
            .lineLimit(1)
            .minimumScaleFactor(0.8)
            .padding(14)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.center) {
                    Text("Workout proof · \(context.state.reps) reps")
                }
            } compactLeading: {
                Text("Set")
            } compactTrailing: {
                Text("\(context.state.reps)")
            } minimal: {
                Text("\(context.state.reps)")
            }
        }
    }

    private func actionLabel(_ title: String) -> some View {
        Text(title)
            .font(.subheadline.weight(.semibold))
            .frame(maxWidth: .infinity, minHeight: 44)
            .background(Color.primary.opacity(0.08), in: RoundedRectangle(cornerRadius: 10))
            .contentShape(Rectangle())
    }
}
