# Workout App

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

The three-set Continue checkpoint is published at [92da1c915ff702941fcc8b00003dd3f0caf2933e](https://github.com/fgzmac/Swoldier/commit/92da1c915ff702941fcc8b00003dd3f0caf2933e); local HEAD and remote main rechecked matching on 2026-11-12. New local work adds compact **✓ Set saved** during rest only from committed set confirmation, with visible failure/retry feedback taking precedence. The corrected [saved-confirmation preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/33cfa887-8f9f-46cd-a5d8-95d88dd3e31f) finished: **native compilation/signing Passed**. Bounded upgrade preservation and the fresh Set 1 confirmation-through-zero/Continue/reopen sequence **Passed — user-reported**; screenshot-supported preservation is recorded separately from reported interactions. Failure/retry, duplicate/stale actions, accessibility and broader recovery remain **Not run**. The ten-file patch is reviewed for separately authorized publication; it is still uncommitted. [Current handoff](docs/HANDOFF.md) · [Patch and device checklist](proofs/lock-screen/README.md#saved-set-visual-feedback--prepared-locally-2026-11-12). Historical passes below remain scoped to their earlier builds; automatic-reveal delay and countdown jumps stay open.

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
