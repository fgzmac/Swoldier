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

## Current proof status

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
