# Workout App

## Usability review checkpoint — 2026-11-16

The local 27-path usability patch has been reviewed against published **7a6fbad**. Exact-editor navigation and stale Finish/Discard safeguards were corrected; **152 local tests** and supporting checks pass. [Review findings and remaining limits](docs/HANDOFF.md#usability-review-corrected-and-rechecked--2026-11-16). Ready for build preparation; new native compilation and phone checks remain Not run. No upload/build, staging, commit, push or spending.

## Current local usability checkpoint — 2026-11-16

Published baseline [7a6fbad](https://github.com/fgzmac/Swoldier/commit/7a6fbad35645f21f5a9ba8873ca3cc9214b4e229); local main still matches it. The ten-note usability pass is prepared locally: skipped sets/early finish, unfinished-workout choices, routine deletion, simple setup, exact-set editing, clearer RIR controls, named Next and a separated routine/workout/week interface based on the supplied reference. [Current handoff](docs/HANDOFF.md#ten-note-usability-pass-prepared-locally--2026-11-16) and [future phone checklist](proofs/lock-screen/README.md#usability-phone-checklist--not-run).

142 local tests, TypeScript, JavaScript export and generated-native/packaging checks passed. New Swift compilation and device behavior remain **Not run**. No cloud build/upload or publication. Screen sleep and both deferred troubleshooting issues remain unresolved. Earlier dated checkpoints below retain their historical status.

## Usability work in progress — 2026-11-16

RIR milestone published at [7a6fbad](https://github.com/fgzmac/Swoldier/commit/7a6fbad35645f21f5a9ba8873ca3cc9214b4e229). The next local usability pass is incomplete: named next-exercise actions, first RIR plus from blank to 0 and separated Clear are prepared; 123 wrapper/model tests and TypeScript passed, new native/device checks Not run. Remaining workflow changes need the referenced ten notes. [Current handoff](docs/HANDOFF.md#usability-pass-started-missing-workout-notes--2026-11-16). No build/spending/publication; earlier dated checkpoints below remain historical.

## Current checkpoint — 2026-11-16

Published baseline remains [23e8cf2](https://github.com/fgzmac/Swoldier/commit/23e8cf2d3928bd3fc2ade9b8e6586e7e3cc82b25). The accumulated optional RIR patch compiled/signed in build 2614e927 and now has bounded screenshot-supported states and **Passed — user-reported** phone checks, including friendly unfinished-Start feedback. [Evidence and remaining checklist](proofs/lock-screen/README.md#rir-phone-results-and-current-checklist--2026-11-16). All 19 inputs match that build; publication review proposes 16 uncommitted paths. [Current handoff](docs/HANDOFF.md#rir-phone-evidence-and-publication-review--2026-11-16). Broader recovery/history/decoding/layout/accessibility and fully locked checks remain unrun. Initial blank → 0 is inconclusive/not reproduced; both troubleshooting issues stay open. No new build, spending or publication in this documentation review. Earlier dated sections below retain their historical scope.

## Blank-value repeats and publication review — 2026-11-15

c059edb9's bounded fresh-start pounds-minus, Complete/Undo/minus and direct blank-plus-after-Undo repeats **Passed — user-reported**, with screenshot-supported card/app states. Blank remained blank on minus; direct plus produced 5 lb × 1 while the blank plan and zero-record/one-request state remained. Fresh-start revision 17 had blank pounds/reps, zero records/requests and no rest. Initial blank → 0 remains **inconclusive / not reproduced**, not fixed; no adjustment correction was established. Prior reports below remain intact.

The Start-message correction review found no blocker, but its four changed build inputs remain unbuilt/device-unverified. c059edb9's compile/device evidence is separate. Both deferred troubleshooting issues and untested cases remain open. [Current review, evidence limits and proposed publication list](docs/HANDOFF.md#start-integration-publication-review--2026-11-15).

## Start results and two issues — 2026-11-15

Build c059edb9 has scoped screenshot-supported/user-reported Start, snapshot, value/rest-mode and Undo/Add Set results. Minus on blank pounds remains unresolved; local SQL preserves blank, while the phone's persisted value was not checked before plus. The expected unfinished-Start message has a narrow local correction, **unbuilt and device-unverified**. 110 SQL/TypeScript-wrapper tests and Windows checks Passed. [Evidence, limitations and next diagnostic](docs/HANDOFF.md#start-device-results-and-narrow-wording-correction--2026-11-15). No new upload/build/publication; last verified free allowance 15/15. Both deferred troubleshooting issues remain open; prior checkpoint statements below are historical.

## Saved-routine preview ready — 2026-11-15

The single authorized [saved-routine Start preview](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/c059edb9-035e-44fa-adc2-b5291b038cf9) FINISHED; native compilation/signing Passed. Installation, installed migration and new runtime/device checks remain Not run. Reviewed source is unchanged and remains uncommitted on baseline e985675. Free iOS allowance is now 15/15, zero remaining/$0 overage. [Upgrade-first checklist, warnings and build evidence](docs/HANDOFF.md#saved-routine-start-preview-ready--2026-11-15). Both troubleshooting issues and production framework remain open; earlier unbuilt statements below retain their checkpoint scope.

## Saved-routine workout integration — 2026-11-15

Published baseline is [e985675](https://github.com/fgzmac/Swoldier/commit/e9856759843deeb8005c2eb05204b5eef4d3d4ec). The isolated proof now locally starts independent saved-routine snapshots, preserves blank/decimal workout values and completed history, rejects replacement of unfinished work, and supports rest Off/zero/positive modes with saved confirmation/Undo/Continue. **Reviewed with no blocking defect; unbuilt:** 107 SQL-wrapper/model tests, three additional migration SQL diagnostics and Windows checks Passed; new Swift and device checks Not run. [Review, evidence limits and next task](docs/HANDOFF.md#saved-routine-start-review--2026-11-15). Both troubleshooting issues and production framework remain open. Earlier sections below retain their checkpoint-specific status, including former Start-disconnected statements.

## Optional routine rest — 2026-11-14

The local routine editor has a per-exercise **Track rest** switch retaining duration text through off/on and save/reopen. The optional-rest/decoder correction [preview](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/1a119269-ecca-4cce-962d-5bf4d7d10e9a) FINISHED; native compilation/signing Passed. Workout preservation has supplied before/after screenshot support. Routine preservation, Off persistence, remembered 60 seconds, disabled blank/enabled blank validation without lost edits, On/0 persistence and routine independence are **Passed — user-reported**. Other device cases remain unrun; no missing-set bug/fix inferred. Start remains disconnected, and future disabled-rest workout behavior is unimplemented. Publication review found no blocker: 89 TypeScript/SQL-wrapper tests and TypeScript Passed; all 19 inputs match the successful preview archive. [Exact 16-file scope, evidence limits and next task](docs/HANDOFF.md#routine-editor-publication-review--2026-11-14). Work remains uncommitted; no new upload/build/staging/commit/push.

## Current routine-editor proof — 2026-11-13

Published baseline [2245126](https://github.com/fgzmac/Swoldier/commit/2245126dbec1a316c67621c6567db8420d233f6f) verified locally/remotely in the earlier setup check. The bounded routine editor remains local/uncommitted; Start still uses the fictional workout. Focused name-correction review Passed; one [routine-editor preview](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/e7194787-c08c-47bb-89a7-e5ef547b26bd) FINISHED, native compilation/signing Passed. 84 Windows tests, TypeScript and fresh 19-file archive hashes Passed. Installation, native runtime validation/persistence, layout and device checks Not run. Production framework remains open; prior wording device-unverified and both troubleshooting issues open. [Current handoff](docs/HANDOFF.md).

Earlier checkpoint sections retain their historical scope; the former two-exercise publication task is complete.

## Current two-exercise proof — 2026-11-13

Undo milestone published at [593d39d](https://github.com/fgzmac/Swoldier/commit/593d39d834e0ad33dd375822fc2e2313e466c592). Local two-exercise Add Set/Next Exercise/Finish Workout proof is prepared; 71 SQL-wrapper tests, TypeScript, export and generated-source checks Passed. One [two-exercise preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/a6785cf2-13ea-4384-985d-065fc0051ea2) FINISHED; native compilation/signing Passed. The guided upgrade and Add/Undo/Next/Finish sequence now has scoped screenshot-supported and user-reported evidence; deliberate action-safety, retry, accessibility and broader recovery/migration trials remain Not run. The later Complete Set / End Rest wording patch is unbuilt and device-unverified. After final rest Continue, Add Set appears above Next Exercise (or Finish Workout). Installed sessions retain one exercise; new/reset sessions get both fictional fixtures. [Current handoff](docs/HANDOFF.md). Exactly one authorized preview submitted; no retry/staging/commit/push. TS-001/TS-002 remain open.

The earlier checkpoint descriptions below retain their original scope and evidence.

A documentation foundation and isolated Lock Screen proof for an iPhone-first workout tracker. **Workout App** is the ChatGPT project; [Swoldier](https://github.com/fgzmac/Swoldier) is the GitHub repository. The app's public name remains open.

The goal is to make logging a workout quick: follow a routine, enter the sets you actually perform, change exercises when needed, and review progress over time. Your own BodySpec scans can become a later progress resource.

## Verified foundation status — 2026-11-09

- Working folder: D:\SwoldierApp. Source preserved at C:\Users\bbdaw\OneDrive\Desktop\WorkoutApp\workout-app-starter.
- All 8 relative filenames and SHA-256 hashes matched immediately after copying and before editing. README and AGENTS are at the root; no nested starter folder.
- Earlier local inspection verified Windows 11 Home, native PowerShell, and 32 GB installed RAM.
- During foundation setup, the tool versions were: Git 2.55.0.windows.4; Node.js v24.19.0; npm 11.17.0; VS Code 1.145.2 x64; Codex CLI 0.167.0-alpha.3.2.
- During foundation setup, D: was rechecked as exFAT, Healthy / OK. The user supplied diagnostic results reporting no problems and exit 0. Separately, the earlier assistant-run /markclean check returned 0 and cleared the dirty flag. The original cause remains unknown. No repair was repeated during migration.
- The foundation was pushed previously. A read-only check on 2026-11-10 confirmed that GitHub main still points to 75a4c62aefeb27dfdfbb7c3b5e87ad307115cbd4. Local main tracked origin/main and was clean at the start of the checkpoint.
- Production framework remains undecided. This foundation snapshot predates the isolated proof; see its current status below.
- Local files, GitHub, and ChatGPT uploads do not synchronize automatically.

## Current publication and local patch

The saved-confirmation checkpoint is published at [3f0874507b2fb5e713b09226c04dddea101d2e11](https://github.com/fgzmac/Swoldier/commit/3f0874507b2fb5e713b09226c04dddea101d2e11); local/remote main freshly rechecked matching. New local [Undo proof](proofs/lock-screen/README.md#undo-proof--prepared-locally-2026-11-12) restores the current rest's set while preserving its entered values/deadline, and uses a fresh rest identity for each completion to reject old Undo. 44 SQL-wrapper checks and TypeScript Passed; Undo native compilation/signing **Passed** in the single [Undo preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/b035cb35-659a-4782-a7b7-3e5d0125be89); at build time installation, runtime migration/decoding and device checks were **Not run**. Later limited reports and the new refinement are separated below. Add Set's copy-last-completed rule is documented only, not implemented. [Current handoff](docs/HANDOFF.md). Earlier 33cfa887 confirmation passes remain bounded and user-reported; automatic-reveal delay/countdown jumps stay open. Undo preview built once; source remains uncommitted and unpublished to GitHub.

## Immediate-edit Undo refinement — 2026-11-13

Undo now prepares immediate draft editing with the original countdown; native storage permits Complete at expiry without Continue for that matching undone draft only. 51 SQL-wrapper checks and TypeScript Passed; native compilation/signing Passed in one [immediate-edit Undo preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/74c497a5-308e-4f0d-bee7-53152648eed5); focused upgrade/immediate-edit/Continue/expiry/control-layout checks Passed — user-reported. Failure/retry, deliberate stale/duplicate, accessibility and broader lifecycle checks remain Not run. Earlier final-set/active-rest Undo and corrected 45 × 11 re-completion are Passed — user-reported. [Current task and checklist](docs/HANDOFF.md). Add Set unimplemented; both troubleshooting issues stay open. Exactly one authorized preview uploaded/built; no commit or push. Publication review found no blocker for the 15-file Undo checkpoint; next publish only when authorized. No new screenshots, exact values/counts or timestamps supplied for the latest report.

## Earlier proof status and evidence

The [three-set proof](proofs/lock-screen/README.md#current-three-set-proof--prepared-locally) remains local on baseline `ff627edc17102ad9fe50992a421a8ca5303fc42d`. The historical pre-Continue timer-only UI hid values/editing/Complete, then used system staleness or saved Skip to reveal the preserved draft; its native compilation/signing passed in [timer-only preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/f55d4dff-e9ef-475d-ad7e-9f501a7e65db), but automatic expiry subsequently Failed — user-reported. Active-rest and zero-display Skip revealed controls only; countdown pauses/jumps remain open. The guard-free comparison compiled/signed successfully in [isStale comparison preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/9510b48e-aea0-4f67-b724-6e46ff4ee9ae); later automatic reveals were observed with unacceptable delay (user-reported: roughly 1–2 minutes, then 1 minute 40 seconds after zero). A subsequent countdown hid controls as expected; no broader pass is inferred. Temporary D1 staleness/branch/publication diagnostics compiled and signed successfully in the [D1 preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/22e675fd-8642-4faf-88d5-aa254129f6c5). D1 now has matching-publication/card metadata and approximate 1–2-minute automatic reveal — user-reported; exact transition timing is unrecorded. Upgrade preservation and layout fit remain unverified. The current stale-state gate is unsuitable for prompt reveal; the adopted [Continue interaction](docs/TROUBLESHOOTING_BACKLOG.md#current-decision-continue) compiled/signed successfully in the [Continue preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/41621efa-1d34-4af1-8860-804b7eb01b5d). The migrated expired-rest upgrade and subsequent early/final expired Continue sequence Passed — user-reported, with app states supported by supplied screenshot descriptions. A separate fresh-fixture regression also Passed — user-reported at 40 × 8, 50 × 8, 45 × 10, with three records/three requests and final Expired/Dismissed acknowledgement. Prompt before/after-zero Continue stayed on the authenticated Lock Screen by user report. Other migration, duplicate/stale, lifecycle and dedicated layout checks remain Not run. See the [Continue evidence](proofs/lock-screen/README.md#continue-device-results--migrated-record-sequence-2026-11-12). Automatic reveal is deferred and countdown jumps remain unresolved. No behavior fix is claimed. Nineteen unchanged SQL-wrapper checks and TypeScript passed. Earlier f8955622-dd9c-4e10-8eac-39c120a55890 compiled/signed. Supplied upgrade screenshot descriptions preserve visible 40 lb × 10, one record, two requests, and expired rest, but the old exact deadline was not visible. Earlier next-draft/early-gate observations passed — user-reported; remaining three-set tests are not passed. [Automatic expiry evidence and limits](proofs/lock-screen/README.md#automatic-expiry-assessment--official-evidence-and-limits).

### Earlier published one-set/rest evidence

The [one-set proof](proofs/lock-screen/README.md) has Expo and native Swift source. Windows SQL, TypeScript, dependency, and JavaScript export checks passed. The SQL tests use the production statements through a separate JavaScript transaction wrapper; they do not execute the Swift implementation. Native compilation and signing passed for the patched preview. The user reports installation and the guided one-set sequence passed on build `2a692799-0280-4f0c-b7f7-1f65b65c1149`: Face ID left the Lock Screen visible, +1 and both Complete taps stayed out of the foreground app, and reopening showed 40 lb × 9 reps, one record, and two received completion requests. This was not independently observed. That pass covers the original build and sequence; limited later rest observations appear below. Production framework selection remains open. See [the handoff](docs/HANDOFF.md) for the current milestone and next recovery check.

The rest preview compiled and signed successfully on baseline `73b277dee50af3286380084a49b3f071dd111b97` plus local changes. Rest start, no restart on duplicate Complete, zero holding, Skip on the authenticated visible Lock Screen, and saved Skipped after reopening are Passed — user-reported for installed build aec6ed60-6c49-4883-9f53-9f3513ae4333. A no-tap comparison went black within five seconds; a later duplicate-Complete comparison stayed visible. The original immediate blackout was not reproduced there; cause unconfirmed, no fix claimed. Original upgrade preservation remains inconclusive. Compact build cacac282-0ac2-43d5-9c66-70ebd3479ae6 compiled and signed successfully. Draft, active-rest, zero, and skipped layouts fit without clipping with reachable controls — Passed — user-reported. These are layout observations, not a full functional rerun. Compact-upgrade preservation is inconclusive because before-values were not recorded. [Evidence and remaining checks](proofs/lock-screen/README.md#rest-device-checklist--all-not-run).

## Start here

1. Read [the current handoff](docs/HANDOFF.md) for the phase, verified state, and exact next task.
2. Read [the project plan](docs/PROJECT.md) for product direction and decisions, and [learning and setup](docs/LEARNING_AND_SETUP.md) for environment guidance.
3. Review the [proof instructions](proofs/lock-screen/README.md) and [feasibility plan](docs/LOCK_SCREEN_FEASIBILITY.md), then follow the handoff for milestone publication and the next bounded proof.
4. For later coding tasks, check the result yourself, explain the main change in your own words, and update [the build log](docs/BUILD_LOG.md).

Keep these documents beside the isolated proof code. Keep one main copy of the project so that code, decisions, and progress stay together.

## File map

| File | Purpose |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Instructions for Codex: keep tasks small and help you learn. |
| [docs/PROJECT.md](docs/PROJECT.md) | Confirmed requirements, proposed milestones, decisions, and ideas. |
| [docs/HANDOFF.md](docs/HANDOFF.md) | Current phase, active task, evidence, blockers, and the next-session prompt. |
| [docs/BUILD_LOG.md](docs/BUILD_LOG.md) | What changed, what was checked, what you learned, and what comes next. |
| [docs/LEARNING_AND_SETUP.md](docs/LEARNING_AND_SETUP.md) | Learning resources and computer/storage setup guidance. |
| [docs/LOCK_SCREEN_FEASIBILITY.md](docs/LOCK_SCREEN_FEASIBILITY.md) | Apple capability research, the limited user-reported pass, and remaining device test plan. |
| [proofs/lock-screen/README.md](proofs/lock-screen/README.md) | Proof source, Windows checks, and later signing and device steps. |
| [.gitignore](.gitignore) | Files to keep out of future Git commits. |

## A simple rule for progress

**Planned** means written down. **Implemented** means code exists. **Verified** means a named check was actually run and passed. Record those states separately.

Use fictional data in shared examples. Put personal scans and other private data in `private_data/` if you keep them inside the project. The ignore rule helps prevent accidental commits; it does not encrypt files or remove files that Git already tracks.
