import ActivityKit
import AppIntents
import SwiftUI
import WidgetKit

@main
struct ProofWidget: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: ProofActivity.self) { context in
            VStack(alignment: .leading, spacing: 8) {
                Text("Workout proof").font(.headline)
                Text("\(context.state.pounds) lb × \(context.state.reps) reps")
                if context.state.saveFailed {
                    Text("Could not save. Try again.").font(.caption)
                } else if context.state.completed {
                    Text("Set saved").font(.caption)
                }
                HStack {
                    Button(intent: ProofIncrementReps(
                        sessionID: context.attributes.sessionID, setID: context.attributes.setID
                    )) { Text("+1 rep") }
                    .disabled(context.state.completed)
                    Button(intent: ProofCompleteSet(
                        sessionID: context.attributes.sessionID, setID: context.attributes.setID
                    )) { Text("Complete set") }
                }
                .buttonStyle(.bordered)
            }
            .padding()
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
}
