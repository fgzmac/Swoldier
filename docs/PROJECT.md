# Workout App — project plan

Last updated: **2026-11-10**

## Goal and status

Build an iPhone-first workout tracker that makes it easy to log actual sets, adapt a routine during a workout, and review progress. Start small enough to understand and maintain the code yourself.

| Area | Status |
| --- | --- |
| Current phase | The isolated Expo + Swift Lock Screen proof source is implemented. Signed build and iPhone verification are pending. |
| Product notes | Adopted scope and planned checks recorded below. |
| GitHub repository | [fgzmac/Swoldier](https://github.com/fgzmac/Swoldier), foundation published. Remote main independently rechecked on 2026-11-10. |
| Application code | One fictional set in the [Lock Screen proof](../proofs/lock-screen/README.md); production app not started. |
| Development stack | Proposed options only; not selected. |
| Local persistence | Proof uses native SQLite. Production SQL passed file-backed Windows checks through a separate JavaScript transaction wrapper; Swift and iPhone persistence are **Not run**. |
| Lock Screen experience | Essential to the first version. Face ID may authenticate the device while the Lock Screen remains visible. Device proof is **Not run**. |
| Earlier interactive screen | Illustrative mockup only. |

## Verified foundation status — 2026-11-09

- Working folder: D:\SwoldierApp. Source preserved at C:\Users\bbdaw\OneDrive\Desktop\WorkoutApp\workout-app-starter.
- All 8 relative filenames and SHA-256 hashes matched immediately after copying and before editing. README and AGENTS are at the root; no nested starter folder.
- Earlier local inspection verified Windows 11 Home, native PowerShell, and 32 GB installed RAM.
- During foundation setup, the tool versions were: Git 2.55.0.windows.4; Node.js v24.19.0; npm 11.17.0; VS Code 1.145.2 x64; Codex CLI 0.167.0-alpha.3.2.
- During foundation setup, D: was rechecked as exFAT, Healthy / OK. The user supplied diagnostic results reporting no problems and exit 0. Separately, the earlier assistant-run /markclean check returned 0 and cleared the dirty flag. The original cause remains unknown. No repair was repeated during migration.
- Foundation publication was verified previously. On 2026-11-10, a fresh read-only remote check confirmed that remote main matches local HEAD at 75a4c62aefeb27dfdfbb7c3b5e87ad307115cbd4. Local main tracked origin/main and was clean before this checkpoint.
- Framework remains undecided. iPhone 15 Pro / iOS 26.6.1 is user-reported and has not been device-verified. App, persistence, and Lock Screen tests have not run.
- Local files, GitHub, and ChatGPT uploads do not synchronize automatically.

## Confirmed first-version scope

The goal is quick preparation in the app and minimal distraction during training. Build for iPhone first, with essential Lock Screen interactions as a release requirement. Technical feasibility and release timing are still open.

| Area | Adopted decision |
| --- | --- |
| Routine preparation | Create and edit routines in the app. Configure exercises, set counts, rep targets for each set, and rest times. |
| Saved settings | The same exercise can have different settings in different routines. A newly added exercise starts with 3 sets; users can change the count. |
| Initial testing | Test one complete routine first, then support full-week use shortly afterward. The first test routine is not yet selected. |
| Starting | Open the app, select a routine, and start the workout before locking the phone. |
| Lock Screen | While the Lock Screen remains visible, adjust pounds, reps, and optional RIR, complete a set, display or skip rest, add a set, and finish an exercise and advance. Face ID is acceptable. Swiping into or opening the foreground app fails the requirement. Reaching the planned set count does not automatically finish the exercise. |
| Rest | Completing a set starts that exercise’s configurable countdown. Bench press defaults to 3 minutes; cable exercises to 90 seconds. Allow skipping the countdown and stop it at zero. Undoing completion does not cancel or reset rest. |
| Entries | RIR (repetitions in reserve) is optional. Bodyweight sets can use reps alone. Blank and zero remain distinct. |
| Recovery | Automatically save drafts and completed sets separately. On resume, restore the current workout position and correct rest timing. |
| Swaps | Swap in the app, including partway through an exercise. Keep completed sets under the original exercise; remaining sets belong to the replacement and use its own history. Remember swaps, but apply the active swap to today’s workout only. |
| History | Review exercises and actual completed set values. Keep finished exercises available for review when collapsed. Edits to planned routine settings affect intended work; they never rewrite previously completed records. |

**Recommendation:** Consider the documented Push routine for the first test. The first routine remains open; Push/Pull/Leg is the longer-term training direction.

### User-supplied Push routine

Use these names and this order:

1. Incline Bench Press
2. Regular Bench Press
3. Machine Chest Fly
4. Seated Machine Dips
5. Overhead Dumbbell Triceps Extensions

Template-specific settings have not been supplied. New exercises default to 3 sets; see the adopted rest defaults above.

**Reference UI scenario — sample data only:**

| Incline Bench Press set | Weight | Reps | Actual RIR |
| --- | --- | --- | --- |
| 1 | 135 lb | 10 | 2 |
| 2 | 135 lb | 10 | 1 |
| 3 | 135 lb | 6 | 2 |

These values illustrate how the logger should capture different results across sets. They are not verified completed workout records or prescribed targets.

## Core workout flow and planned acceptance checks

Prepare a routine → start in the app → show the Lock Screen → authenticate with Face ID as needed and stay on the Lock Screen → adjust and complete sets → rest → finish the exercise → finish the workout → review history.

| Planned check | Expected result |
| --- | --- |
| Configure Bench Press differently in two routines | Each routine retains its own settings. |
| Log on the visible Lock Screen | After Face ID as needed, adjust pounds, reps, and optional RIR, complete a set, view and skip rest, add a set, and finish an exercise. Each action leaves the Lock Screen visible. The app stays out of the foreground. |
| Complete a set and run rest | Save exactly one record with the edited values and start one rest countdown. Repeated taps preserve that record and its deadline. Rest stops at zero or stays stopped when skipped. |
| Finish an exercise | Advance exactly once and persist the next exercise. Earlier records retain their original exercise and values. |
| Undo completion | Return the set to a draft while rest continues without cancellation or reset. |
| Interrupt and resume | Restore drafts, completed records, current position, and correct timer state. |
| Swap after two Leg Press sets | Keep those sets under Leg Press. Subsequent Hack Squat sets use Hack Squat identity and history. The change applies only to today. |
| Edit the routine afterward | Previously completed workout records remain unchanged. |

These product checks are planned and **Not run**. The separate, smaller M0 proof has Windows SQL checks only.

### M0 — Research and define the Lock Screen proof

Apple documents an unlock gate for buttons and toggles embedded in widgets and Live Activities. The general App Intent authentication policy does not establish an override. A Live Activity can still display session data, and WidgetKit documents dynamic timer display without continuous extension execution. [WidgetKit interactivity](https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities) · [App Intent authentication](https://developer.apple.com/documentation/appintents/appintent/authenticationpolicy) · [Dynamic dates](https://developer.apple.com/documentation/widgetkit/displaying-dynamic-dates)

The adopted scope allows Face ID while the Lock Screen remains visible. The proof checks whether actions work in that state without bringing the app to the foreground and whether their results persist. It retains a closed-padlock trial for comparison. All physical-device cases are **Not run**. [Capability map and proof plan](LOCK_SCREEN_FEASIBILITY.md)

The first proof is implemented in [proofs/lock-screen](../proofs/lock-screen/README.md) using Expo SDK 57, a Swift Live Activity, two background App Intents, and app-local SQLite. It starts at 40 lb × 8 reps. The device trial must verify +1 rep and two Complete requests while the authenticated Lock Screen remains visible, then reopen to see exactly one 40 lb × 9 record. Rest and full workout controls remain outside this proof.

The user reports iPhone 15 Pro, iOS 26.6.1 (23G83), and working Face ID. Apple’s published version/build pairing agrees; the phone was not independently inspected. Both targets use iOS 26.0 as the minimum for explicit background intent mode. On Windows, Expo dependency validation, TypeScript, the iOS JavaScript bundle, three file-backed SQLite tests, and generated native configuration inspection passed. Swift compilation, signing, installation, and device interaction and persistence are **Not run**. The Expo account, active Apple Developer Program membership, and signed internal preview are still needed.

### M1 — Log one exercise, run rest, and recover an interrupted workout

Use the planned set completion, undo, and recovery checks above. Also check that a countdown can be skipped and stops at zero. Verify no duplicate records and distinguish blank from zero. Actual Lock Screen interaction needs the separate physical-device proof.

### M2 — Edit routines and test one complete workout

Verify that routine settings save independently. Select one routine, run the complete flow, and use the planned swap and history checks above. The first routine remains open.

### M3 — Support and test full-week use

After one-routine testing, extend to full-week use. Define the week’s test coverage once the multiple-routine versus calendar decision is made. The required actions on the visible Lock Screen must pass the physical-device checks for release. Face ID is acceptable. Release timing remains open.

## Open questions

- Which saved routine will be the first test?
- Which widget or Live Activity controls reliably handle the required actions on the visible Lock Screen after Face ID? Which surface has room for usable numeric editing and the workout controls?
- Can Expo Build compile and sign both proof targets, and do the actions and saved record pass on the reported iPhone 15 Pro? The production framework remains open.
- How should prepared pounds and reps be populated, and how should unknown RIR appear?
- What input limits, weight increments, and assisted-exercise recording rules should apply?
- How should users finish a workout and correct its history?
- What are the remaining rest defaults and notification preferences?
- Does initial full-week use mean multiple selectable routines or a calendar schedule?
- What release timing is realistic once Lock Screen feasibility has been tested?

## Decision log

| Date | Choice | Status and reason |
| --- | --- | --- |
| 2026-11-05 | iPhone first; start small and add features | User direction. Keep the first project manageable. |
| 2026-11-05 | Push-only first usable version | Earlier proposal. Push is a candidate for the first test; the routine is still unselected. |
| 2026-11-05 | Expo / React Native / TypeScript with cloud builds | Proposed. Evaluate against the current Windows setup and native-widget needs. |
| 2026-11-09 | Use `D:\SwoldierApp` as the working folder | Adopted by the user. Prefer the external SSD; verify its local mapping and contents before setup changes. |
| 2026-11-09 | Use `fgzmac/Swoldier` as the project repository | User-specified. At adoption, the public repository was empty and the local connection had not been checked. |
| 2026-11-09 | Complete organization before app planning and coding | User direction. At the time, the next task was a read-only local setup check. |
| 2026-11-09 | Copy foundation contents and establish local Git | Authorized; 8 files hash-verified before editing. Source and discovery agenda preserved. Local foundation history established. |
| 2026-11-10 | Create and edit routines with settings saved per routine and exercise | Adopted. New exercises start with 3 editable sets. |
| 2026-11-10 | Start in the app; log and advance from the Lock Screen | Adopted release requirement. Exact actions are listed above; native feasibility is unverified. |
| 2026-11-10 | Separate drafts and completed records; restore interrupted workouts | Adopted. Undo returns a set to draft while rest continues. |
| 2026-11-10 | Configure rest per exercise | Adopted. Bench press defaults to 3 minutes and cable exercises to 90 seconds; support skip and stop at zero. |
| 2026-11-10 | Allow optional RIR and reps-only bodyweight sets | Adopted. Blank remains distinct from zero. |
| 2026-11-10 | Remember in-app swaps and apply them to today only | Adopted. Support swapping mid-exercise while preserving completed original sets. |
| 2026-11-10 | Test one routine before full-week use | Adopted test order. First routine and full-week format remain open. |
| 2026-11-10 | Allow Face ID while the Lock Screen remains visible | Supersedes the earlier strict no-unlock criterion. Required actions must work while the user stays on the Lock Screen, with Face ID allowed. Swiping into or opening the foreground app fails the requirement. The genuinely locked trial is a comparison. |
| 2026-11-10 | Use Expo SDK 57 and Swift for the one-set proof | Adopted for proof tooling only. Source and Windows checks are complete; the signed iPhone build and trial remain open. |

Add adopted decisions and their reasons here as work progresses. Update the open questions when an answer is known.

## Later features and idea inbox

| Later feature | Direction |
| --- | --- |
| Remembered swaps from the Lock Screen | In-app swaps and remembering them are first-version requirements; applying remembered swaps from the Lock Screen is later. |
| Broader replacement suggestions | Explore options beyond remembered swaps, including available equipment. |
| Progress charts and goals | Define useful measures and goals after the core workout flow. |
| BodySpec progress | Explore scan checkpoints alongside workout history. Entry or import method is open. |
| Weekly progression suggestions | Review proposed changes before applying them to future plans. Completed records stay intact. |
| Beginner routine templates | Retain as a longer-term idea; template contents and timing are open. |
| Account login and workout-data sync | Separate later product decisions. |
| Your idea here | Add an idea and the problem it solves. |

## Next task and handoff

Read [HANDOFF.md](HANDOFF.md) for the current phase, single active task, and exact next-session prompt. Keep that file as the current resume record instead of copying its task text into multiple documents.

Before starting each session, name one small task and its acceptance check. At the end, record whether it is planned, implemented, or verified, and refresh the handoff when the task permits file changes.
