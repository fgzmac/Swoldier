# Build log

Record a short entry after each working session. Newest entries go first. Write what actually happened, including checks that could not run.

**Planned:** agreed or proposed work. **Implemented:** code exists. **Verified:** a named check ran and passed.

## 2026-11-10 — Discovery documentation checkpoint

**Phase/task:** Document the first-version direction and prepare the next Lock Screen research task.

**Status:** The user supplied the full discovery summary after the initial status pass. The adopted decisions and planned checks are recorded in the local documentation.

### Decisions and checks

- Recorded routine-specific settings, exact no-unlock actions, rest defaults and undo behavior, automatic draft and completed-set recovery, mid-exercise swaps for today only, and one-routine testing before full-week use. Recorded the planned checks, later features, and open questions separately in [PROJECT.md](PROJECT.md).
- Inspected the local Git root, branch, HEAD, upstream, origin, and working tree. At checkpoint start, local main was clean and tracked origin/main. Follow-up inspection found only the five expected Markdown edits.
- Rechecked GitHub main read-only. The query succeeded and matched local HEAD at 75a4c62aefeb27dfdfbb7c3b5e87ad307115cbd4, the previously published foundation commit.
- iPhone 15 Pro / iOS 26.6.1 is user-reported. No device inspection, app test, persistence test, or Lock Screen test ran. Framework and Lock Screen feasibility remain open.
- Reviewed the diff and decision wording, passed the whitespace check, resolved all 23 local Markdown links, and verified historical log entries were preserved.
- Saved documentation locally; did not commit or push.

### What I learned — user-written

_Leave blank for the user._

### My small edit

Not attempted.

### Next small task

Follow [HANDOFF.md](HANDOFF.md) to research the required Lock Screen actions using official documentation and define a bounded physical-device proof.

---

## 2026-11-09 — Migrate and verify the local foundation

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

### Changes and checks

Updated destination README, AGENTS, HANDOFF, PROJECT, LEARNING_AND_SETUP, and this log. DISCOVERY_SESSION.md and .gitignore remain unchanged. Historical entries remain historical. Edited documents intentionally differ from source hashes.

Inspected source and empty destination; no existing local repository. Reviewed ignore rules for dependencies, credentials, and private_data. Reviewed all eight staged files and their changes; staged whitespace checks and local Markdown link checks passed. Source hashes were rechecked unchanged. Git uses a command-scoped safe.directory exception for this exFAT folder; global settings are unchanged. Initial local foundation commit prepared and reviewed. No packages, application code, or push.

### What I learned — user-written

_Leave blank for the user._

### My small edit

Not attempted. Optional later edit: add one idea and its purpose to PROJECT.md.

### Next small task

Begin app planning/design using DISCOVERY_SESSION.md.

---
## 2026-11-09 — Refresh the setup foundation

**Phase/task:** Organization and setup, before app planning or design.

**Status:** Documentation updated in the preparation workspace. The user's Windows working folder has not been inspected or changed.

### What changed

- Recorded `D:\SwoldierApp` as the user's adopted working folder and 32 GB installed RAM as a user report.
- Retained the earlier 186 GB free on C: report and the old OneDrive folder as context, without treating either as a fresh local observation.
- Recorded the known GitHub repository and distinguished its remote state from an unverified local checkout.
- Updated README, Codex instructions, and the project plan for the current setup phase.
- Designated `docs/HANDOFF.md` as the single current-task and resume record. The project plan now links to it instead of maintaining a second task prompt.
- Added the handoff with a copyable local setup task and refreshed the learning/setup guide for the selected folder.
- Kept Expo / React Native / TypeScript proposed and preserved the future product milestones.

### Verification

- The GitHub connector review confirmed [fgzmac/Swoldier](https://github.com/fgzmac/Swoldier) is public and empty on 2026-11-09.
- Checked all seven foundation files and 20 local document links; confirmed consistent folder and RAM references. These were documentation checks in the preparation workspace.
- The actual Windows computer, D: drive, chosen folder, installed tools, and local Git state have **not been checked**.
- This documentation update did not install dependencies, initialize Git, change the remote repository, migrate local files, or scaffold an app.
- Application, persistence, iPhone, and widget checks have **not run**.

### What I learned — user-written

_Leave blank for the user to fill in. Suggested prompt: How is a verified GitHub repository different from a verified local checkout?_

### My small step — user-owned

_Not recorded as completed. The next local action is the read-only setup check in HANDOFF.md._

### Next task

Use [HANDOFF.md](HANDOFF.md) for the read-only local Codex setup check and its boundaries. Return the resulting report before proceeding to setup changes or app planning.

---

## 2026-11-05 — Documentation starter pack

**Milestone:** Preparation for M0.

**Status:** Documentation prepared. Native application work has not started in this starter pack.

### What changed

- Created the README, Codex instructions, project plan, learning/setup guide, this build log, and a starting ignore file.
- Captured the supplied Push routine and the three-set Incline Bench Press example as sample data.
- Separated confirmed behavior, proposed milestones, and open decisions.
- Recorded the need for an early native-widget proof.

### Verification

- Reviewed these documents for consistent scope and status.
- Checked the six-file starter pack, all 11 local document links, milestone headings, and supplied exercise names in the preparation workspace. These are documentation checks, not app tests.
- No application dependencies were installed and no Git repository or remote was created for this starter pack.
- App build, local persistence, iPhone behavior, and native-widget checks have **not run**.
- The earlier interactive screen remains an illustrative mockup.

### What I learned — user-written

_Write this yourself after reading the starter pack. Suggested prompt: What is the difference between a feature being planned, implemented, and verified?_

### My small edit — user-owned

_Not completed. Suggested first edit: add one idea to the idea inbox in PROJECT.md and explain the problem it would solve._

### Next task

M0: verify the current computer/storage situation and choose the first development path. See the handoff prompt in `PROJECT.md`.

---

## Copy this template for the next session

### YYYY-MM-DD — Short session title

**Milestone/task:**

**Status:** Planned / Implemented / Verified / Blocked — specify which part.

**Goal and acceptance check:** What should work when this task is done?

**Changes:** What changed and why? Include the relevant files.

**Verification:**

- Check or command:
- Environment/device:
- Actual result:
- Not run or still uncertain:

**Decision made:** Record the choice and a short reason, or write “None.”

**What I learned — my own words:**

_Leave blank for the user to fill in. Do not have Codex invent this reflection._

**My small edit:** What I tried and what happened, or “Not attempted.”

**Problem or blocker:** What remains unresolved?

**Next small task:** One concrete action and how to check it.
