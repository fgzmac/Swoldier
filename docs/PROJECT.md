# Workout App — project plan

Last updated: **2026-11-09**

## Goal and status

Build an iPhone-first workout tracker that makes it easy to log actual sets, adapt a routine during a workout, and review progress. Start small enough to understand and maintain the code yourself.

| Area | Status |
| --- | --- |
| Current phase | Foundation migration verified; local Git foundation established. App planning/design comes next. |
| Product notes | Prepared in this starter pack. |
| GitHub repository | [fgzmac/Swoldier](https://github.com/fgzmac/Swoldier), remote refs successfully checked and empty on 2026-11-09. Local main branch and origin configured; no push. |
| Application code | Not implemented in this starter pack. |
| Development stack | Proposed options only; not selected. |
| Local persistence | Planned; not implemented or verified. |
| Native iPhone widget | Planned; no native proof or device test has run. |
| Earlier interactive screen | Illustrative mockup only. |

## Verified foundation status — 2026-11-09

- Working folder: D:\SwoldierApp. Source preserved at C:\Users\bbdaw\OneDrive\Desktop\WorkoutApp\workout-app-starter.
- All 8 relative filenames and SHA-256 hashes matched immediately after copying and before editing. README and AGENTS are at the root; no nested starter folder.
- Earlier local inspection verified Windows 11 Home, native PowerShell, and 32 GB installed RAM.
- This task reran versions: Git 2.55.0.windows.4; Node.js v24.19.0; npm 11.17.0; VS Code 1.145.2 x64; Codex CLI 0.167.0-alpha.3.2.
- This task rechecked D: as exFAT, Healthy / OK. The user supplied diagnostic results reporting no problems and exit 0. Separately, the earlier assistant-run /markclean check returned 0 and cleared the dirty flag. The original cause remains unknown. No repair was repeated during migration.
- git ls-remote against https://github.com/fgzmac/Swoldier.git succeeded, exit 0, with no refs. This was an empty result, not a network/authentication error.
- Git is initialized at D:\SwoldierApp on main; origin is https://github.com/fgzmac/Swoldier.git. The eight reviewed foundation files form the initial local commit, Initialize workout app project foundation. Author identity is configured locally from the user's supplied name/email. No push is authorized or performed.
- Framework remains undecided. App planning/design is the next phase; no app, persistence, iPhone, or widget test has run.
- Local files, GitHub, and ChatGPT uploads do not synchronize automatically.

## Confirmed user requirements

### Workout flow

- Build for **iPhone first**, starting simply and adding features later.
- Hold complete workout routines and support the user's weekly Push/Pull/Leg direction. Only the Push exercise list has been supplied so far.
- Show the current exercise and set with easy entry for **weight in pounds, repetitions, and actual RIR**. RIR means repetitions in reserve: the user's estimate of additional reps they could have performed.
- Completing a set saves it and starts a rest timer.
- Allow extra sets and an explicit **Finish exercise** action. Do not automatically finish an exercise just because its planned set count has been reached.
- Move to the next exercise and collapse completed exercises while keeping them available to review.
- Keep completed sets tied to the exercise actually performed. Saving a draft and marking a set complete should be separate actions if draft saving is added.
- Provide a simple phone widget centered on the current exercise/set. Its native interaction details still need to be proven.

### Flexibility and progress

- Allow manual exercise changes and, later, suggested replacements.
- Keep separate histories for different exercises and variations. A substitute uses its own history.
- Preserve the exercises and values actually performed when plans change.
- Use the user's own BodySpec scans as a progress resource.
- Later, connect the weekly workout-log/review workflow to suggestions for future training. Suggestions must never overwrite completed records.
- Provide predetermined routines for beginners as part of the broader product direction; the routines and implementation timing remain open.

### User-supplied Push routine

Use these names and this order:

1. Incline Bench Press
2. Regular Bench Press
3. Machine Chest Fly
4. Seated Machine Dips
5. Overhead Dumbbell Triceps Extensions

Planned set counts, rep targets, and rest durations have not been specified for this template.

**Reference UI scenario — sample data only:**

| Incline Bench Press set | Weight | Reps | Actual RIR |
| --- | --- | --- | --- |
| 1 | 135 lb | 10 | 2 |
| 2 | 135 lb | 10 | 1 |
| 3 | 135 lb | 6 | 2 |

These values illustrate how the logger should capture different results across sets. They are not verified completed workout records or prescribed targets.

## Recommended first version

**Proposed v0.1:** complete the Push workout inside the app, retain it locally, review its history, and manually replace an exercise without losing completed work.

**Recommended detail:** autosave unfinished entries as drafts so that interruptions do not lose typing. This goes beyond saving a completed set and is not yet an explicitly confirmed user requirement.

Start a small native-widget proof early. Its result should help decide whether the widget is part of the first release or the next milestone. That release decision is still open.

The implementation milestones below remain **planned**. Documentation and remote-repository checks do not establish that an app or local development environment works.

### M0 — Verify setup, then prepare development

**Setup progress:** inspection and documentation migration are verified. Initial local foundation commit prepared and reviewed. App planning/design comes next; the development portion of M0 remains incomplete.

After setup is understood and app planning is complete, the future development work is to:

- Adopt a development approach. Expo / React Native / TypeScript with EAS remains a proposal.
- Reconcile local project files and version control with the known `fgzmac/Swoldier` repository while preserving existing work.
- Create the smallest app for the chosen stack and run it on the intended iPhone path.

**Current check complete when:** a local report distinguishes observed facts, user reports, missing tools, existing work, and remaining decisions. The report alone does not complete all of M0.

**Future milestone acceptance:** the setup choices are recorded, the starter app opens through the chosen device/testing path, and the build log names what was actually tested. No widget result is implied by an app opening.

### M1 — Log one exercise

- Display Incline Bench Press with editable weight, reps, and RIR for each set.
- Complete and undo a set. Count only completed sets.
- Add a set and finish the exercise manually.
- Keep sample values visibly labeled. An exercise without history must not inherit a different exercise's weight.

**Acceptance:** a user can enter the three sample sets, change a value, complete/undo a set, add another set, and choose when the exercise is finished. Blank fields stay distinct from zero. Agreed input rules are checked.

### M2 — Persist entries and add rest timing

- Keep completed set records locally and, if the draft-saving recommendation is adopted, autosave unfinished entries too.
- Start the rest timer when a set is completed.
- Restore the workout and correct timer state after leaving and reopening the app.
- Keep a completed set from being saved twice through repeated actions or reopening.

**Acceptance:** close and reopen the app during a workout; completed records and completion states return correctly. Check unfinished entries too if draft saving is adopted. Complete a set once and verify one recorded set and one rest-timer start. Test the selected rest duration and the agreed undo behavior.

### M3 — Complete the Push routine, swap manually, and view history

- Move through all five exercises in the supplied order.
- Collapse finished exercises and allow review.
- Manually replace an exercise before its first completed set. Preserve all previously completed work elsewhere in the workout.
- Use the substitute's own history, or blank weight if none exists.
- Review the finished workout with exercise names, actual set values, and completion information.

**Acceptance:** complete a Push workout, manually replace an exercise before starting it, and reopen the saved history. Completed sets keep their original exercise and values, while new sets belong to the substitute. The template behaves according to the chosen swap scope.

**Possible extension:** allow replacing only the remaining work after some sets of an exercise are complete. This more specific behavior is proposed, not yet a confirmed first-version requirement. It must preserve the already completed original sets.

### M4 — Prove the native widget early

**Start this investigation during the development portion of M0 or during M1, after the completed setup check and app planning. It does not need to wait for M3.**

- Build the smallest native-widget experiment on the intended iPhone testing path.
- Verify the proposed display and completion action, and record which editing interactions are supported.
- Check that app and widget agree about the current exercise/set, a completed set, and rest timing.
- Identify any action that must open the app and make that transition clear.

**Acceptance:** document a real device result for each tested interaction and its limitations. A browser mockup or app-only check does not satisfy this milestone. Revisit the first-release scope based on the result.

### M5 — Later progress, scans, and review

- Add dated progress entries from the user's own BodySpec scans; choose the entry/import method first.
- Show scan checkpoints alongside workout history without claiming that a specific workout caused a scan change.
- Add a review step for weekly suggestions that changes future plans only.
- Consider beginner templates, suggested substitutions, and additional progress views as separate tasks.

**Acceptance:** define criteria for each feature before building it. Keep this milestone out of the first logging task.

## Open decisions

| Decision | Current position |
| --- | --- |
| Stack and tools | Expo / React Native / TypeScript with EAS is a proposal to evaluate. No framework is selected. |
| Local environment | Windows 11 Home, native PowerShell, 32 GB RAM; D:\SwoldierApp contains the verified foundation. D: is Healthy / OK. |
| iPhone test setup | iPhone is confirmed; model, OS version, and usable build/testing path still need verification. |
| First-release widget | Start the native proof early; decide whether it is a v0.1 release requirement from the results and user priorities. |
| Initial targets | Set counts and rep targets for the five Push exercises are not supplied. |
| Rest duration | Not chosen. Also decide what undoing the latest set does to the active timer. |
| Input rules | Decide whether weight and RIR are optional, accepted RIR values, and how to record bodyweight or assisted exercises. Keep blank different from zero. |
| Swap scope | **Recommended:** default to today only, with an explicit option to update the future template. This default is not yet a confirmed user choice. |
| Unfinished entries | **Recommended:** save them as drafts. Completed-set saving and draft saving are distinct behaviors. |
| Scan entry | Manual values, document import, or another method remain open. Do not assume a BodySpec integration or API exists. |
| Code backup and app sync | Remote refs checked successfully and empty. Local foundation history established; no push. App-data sync remains a separate future decision. |

## Decision log

| Date | Choice | Status and reason |
| --- | --- | --- |
| 2026-11-05 | iPhone first; start small and add features | User direction. Keep the first project manageable. |
| 2026-11-05 | Push-only first usable version | Proposed. Prove logging and history with the routine already supplied. |
| 2026-11-05 | Expo / React Native / TypeScript with cloud builds | Proposed. Evaluate against the current Windows setup and native-widget needs. |
| 2026-11-09 | Use `D:\SwoldierApp` as the working folder | Adopted by the user. Prefer the external SSD; verify its local mapping and contents before setup changes. |
| 2026-11-09 | Use `fgzmac/Swoldier` as the project repository | User-specified. GitHub review confirmed it is public and empty; local connection is not yet checked. |
| 2026-11-09 | Complete organization before app planning and coding | User direction. The recommended next task is a read-only local setup check. |
| 2026-11-09 | Copy foundation contents and establish local Git | Authorized; 8 files hash-verified before editing. Source and discovery agenda preserved. Local foundation history established. |

Add adopted decisions and their reasons here as work progresses. Update the open-decision table when an answer is known.

## Feature backlog and idea inbox

Keep the user’s longer-term product direction visible without adding all of it to v0.1. New ideas are proposals until adopted.

| Idea | Problem it could solve | Status |
| --- | --- | --- |
| Complete Push/Pull/Leg routines | Hold the user's weekly training plan. | User product direction; Pull and Leg details are not supplied. |
| Beginner routine templates | Help someone who does not already have a routine get started. | User product direction; template contents and timing are open. |
| Suggested swaps filtered by available equipment | Reduce searching when a station is busy or unavailable. | User product direction; matching rules need a separate design. |
| Scan checkpoints beside workout history | Bring the user's scan results into their progress review. | User product direction; planned later, exact view is open. |
| Weekly suggestions awaiting review | Make the next plan easier to prepare. | User product direction; planned later, completed records stay intact. |
| Your idea here | What problem does it solve? | New proposal; unprioritized. |

## Next task and handoff

Read [HANDOFF.md](HANDOFF.md) for the current phase, single active task, and exact next-session prompt. Keep that file as the current resume record instead of copying its task text into multiple documents.

Before starting each session, name one small task and its acceptance check. At the end, record whether it is planned, implemented, or verified, and refresh the handoff when the task permits file changes.
