# Workout App — project plan

Last updated: **2026-11-12**

## Goal and status

Build an iPhone-first workout tracker that makes it easy to log actual sets, adapt a routine during a workout, and review progress. Start small enough to understand and maintain the code yourself.

| Area | Status |
| --- | --- |
| Current phase | Continue preview 41621efa-1d34-4af1-8860-804b7eb01b5d compiled/signed successfully. Migrated expired-rest upgrade and subsequent early/final expired Continue sequence Passed — user-reported, with screenshot-supported app state as supplied. A separate fresh-fixture regression also Passed — user-reported (40 × 8, 50 × 8, 45 × 10; three records/three requests). Edge cases remain Not run. Published at 92da1c915ff702941fcc8b00003dd3f0caf2933e. Corrected saved-feedback review passed; [saved-confirmation preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/33cfa887-8f9f-46cd-a5d8-95d88dd3e31f) FINISHED, native compilation/signing Passed. Bounded upgrade preservation and fresh Set 1 saved-confirmation/Continue/reopen Passed — user-reported. Failure/retry, duplicate/stale actions, accessibility and broader recovery remain Not run. Next: separately authorized publication of the reviewed ten-file checkpoint. Automatic reveal remains deferred (TS-001); countdown jumps unresolved (TS-002). |
| Product notes | Adopted scope and planned checks recorded below. |
| GitHub repository | [fgzmac/Swoldier](https://github.com/fgzmac/Swoldier), Continue checkpoint published at [92da1c915ff702941fcc8b00003dd3f0caf2933e](https://github.com/fgzmac/Swoldier/commit/92da1c915ff702941fcc8b00003dd3f0caf2933e); local HEAD/remote main independently rechecked on 2026-11-12. |
| Application code | Three fixed fictional sets in the [Lock Screen proof](../proofs/lock-screen/README.md#current-three-set-proof--prepared-locally); production app not started. |
| Development stack | Proposed options only; not selected. |
| Local persistence | Native SQLite proof: prior 29 SQL-wrapper checks Passed (not Swift execution). Current migrated expired-rest sequence preserves supplied data/deadline and reported ordinary-reopen acknowledgement; other migration/lifecycle cases remain Not run. |
| Lock Screen experience | Essential first-version requirement; Face ID allowed while Lock Screen remains visible. Current Continue reveal interactions Passed — user-reported for the migrated-record sequence below. Earlier named one-set/rest/compact passes remain build-scoped. No new broad layout or lifecycle pass; blackout cause unconfirmed. |
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

## 2026-11-12 adopted Continue interaction

**Adopted 2026-11-12 — Continue; native compilation/signing Passed; migrated-record and separate fresh-fixture sequences Passed — user-reported, remaining checks unrun.** Show countdown and one button labeled exactly **Continue** on the rest card, plus compact confirmed-save/failure feedback adopted below. Before zero, Continue ends rest early and reveals the next existing draft. At/after zero, Continue reveals that draft without saving a set or restarting rest. Preserve prior draft edits, planned targets, completed records, and duplicate/stale-action guards; keep the authenticated Lock Screen visible. After the third rest, Continue reveals **Planned sets recorded**, with no fourth set or automatic exercise finish. Keep editing/Complete hidden on the rest card; do not adopt the earlier visible-controls recommendation.

Continue supersedes automatic return as a first-version requirement. Prompt automatic reveal is deferred, not fixed or proven impossible. The implementation must not depend on delayed system staleness to make controls available. See [TROUBLESHOOTING_BACKLOG.md](TROUBLESHOOTING_BACKLOG.md): TS-001 tracks delayed reveal; TS-002 separately tracks countdown pauses/jumps. Future investigations in the supplied backlog are proposals, not work authorized by this documentation task.

Earlier assessment retained: repeated reported delays made staleDate/isStale unsuitable as the sole prompt-reveal gate. The proposed always-visible controls were not adopted; the user instead chose Continue. The root cause remains unknown.

## 2026-11-12 saved-set visual feedback

**Adopted; corrected preview 33cfa887 compiled/signed; bounded upgrade and Set 1 confirmation sequence Passed — user-reported, remaining device checks Not run.** During the resulting rest show **✓ Set saved** only from durable confirmation that its corresponding set completed. Keep it through zero until Continue dismisses rest; hide values, adjustments and Complete. Save-failure/retry feedback must remain readable and take precedence over success. No tap/pending-write success claim. Keep the card compact and accessible, with no timer, animation, haptic or screen-wake change. Storage, acknowledgement, plans/actuals, deadlines, migration and guards stay unchanged.

The optional confirmed-set ID comes from the committed snapshot and matches the current rest's established identity; older content without it shows no guessed success. The widget renders the status without changing storage. [Implementation and planned device checks](../proofs/lock-screen/README.md#saved-set-visual-feedback--prepared-locally-2026-11-12). Local SQL-wrapper/type/configuration checks are not Swift execution or device proof. Repeat-tap observation must distinguish physical taps from received intent requests; two taps alone do not prove two executions. Earlier user-reported passes remain scoped to build 41621efa; TS-001/TS-002 stay open.

**Earlier review correction — 2026-11-12:** a generic rest error could tell the user to retry Continue when Complete or an edit had failed. Build withheld. The corrected optional failure payload carries the original action and identities; an error card supersedes normal rest/draft/final content and retries only that operation. Unknown older retry metadata requests reopening to check saved state. This recovery card is an exception to normal timer-only rest, not an acknowledgement or automatic next-draft reveal. Durable success mapping, transactions and action guards stay unchanged. The subsequent corrected review passed and one [saved-confirmation preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/33cfa887-8f9f-46cd-a5d8-95d88dd3e31f) compiled/signed successfully. Failure/retry, isolated older-payload decoding and untested device checks remain Not run; [handoff](HANDOFF.md) records the publication checkpoint.

**Device evidence recorded 2026-11-12 — build 33cfa887:** user-described before/after screenshots preserve actuals 40 × 8, 50 × 8, 45 × 10, plans, three records/requests, Expired/Dismissed rest and deadline/acknowledgement timestamps. No screenshots independently inspected or exact timestamps supplied here. Separate fresh trial after reset: user completed Set 1 at 40 × 8 and reports prompt unclipped ✓ Set saved through 0:00, then Continue removed it/revealed Set 2 at 50 × 8 on the authenticated Lock Screen; ordinary reopen showed one record/request and Expired/Dismissed. **Passed — user-reported for this bounded sequence**, not a full three-set rerun, duplicate/stale or failure/retry test. VoiceOver, larger text and broader recovery remain Not run. [Evidence types and limits](../proofs/lock-screen/README.md#saved-confirmation-device-results--2026-11-12). Ten-file publication review found no blocker; nothing staged, committed or pushed. Both troubleshooting issues remain open.

## Confirmed first-version scope

Latest existing-proof result: ordinary active-rest background/resume **Passed — user-reported**. Remaining time stayed accurate and saved values/counts were unchanged. This does not pass force-quit, system termination, or upgrade preservation. New three-set implementation/native/device checks are separate.

The goal is quick preparation in the app and minimal distraction during training. Build for iPhone first, with essential Lock Screen interactions as a release requirement. Technical feasibility and release timing are still open.

| Area | Adopted decision |
| --- | --- |
| Routine preparation | Create and edit routines in the app. Configure exercises, set counts, rep targets for each set, and rest times. |
| Saved settings | The same exercise can have different settings in different routines. A newly added exercise starts with 3 sets; users can change the count. |
| Initial testing | Test one complete routine first, then support full-week use shortly afterward. The first test routine is not yet selected. |
| Set preparation and advancement | Each next set uses its own stored plan. Completion saves actuals, starts rest, and prepares the next draft. The rest card shows countdown, Continue and confirmed-save/failure feedback; values and editing/Complete remain hidden. Before zero Continue ends rest early; at/after zero it reveals the existing draft without saving a set or restarting rest. Preserve draft edits and never reload defaults on transition. Prompt automatic return is deferred; controls must not depend on delayed staleness. |
| Starting | Open the app, select a routine, and start the workout before locking the phone. |
| Lock Screen | While the Lock Screen remains visible, adjust pounds, reps, and optional RIR, complete a set, display or skip rest, add a set, and finish an exercise and advance. Face ID is acceptable. Swiping into or opening the foreground app fails the requirement. Reaching the planned set count does not automatically finish the exercise. |
| Rest | Completing a set starts that exercise’s configurable countdown. Bench press defaults to 3 minutes; cable exercises to 90 seconds. Allow skipping the countdown and stop it at zero. Undoing completion does not cancel or reset rest. |
| Entries | RIR (repetitions in reserve) is optional. Bodyweight sets can use reps alone. Blank and zero remain distinct. |
| Recovery | Automatically save drafts and completed sets separately. On resume, restore the current workout position and correct rest timing. |
| Swaps | Swap in the app, including partway through an exercise. Keep completed sets under the original exercise; remaining sets belong to the replacement and use its own history. Remember swaps, but apply the active swap to today’s workout only. |
| History | Review exercises and actual completed set values. Keep finished exercises available for review when collapsed. Edits to planned routine settings affect intended work; they never rewrite previously completed records. |

### Current bounded three-set proof

Current Continue source adds nullable continued_at (schema version 3), independent of running/expired/skipped rest. Both early and expired taps acknowledge without completing/counting/reseeding; only an early tap marks skipped. Existing skipped rows retain dismissal through backfill; unskipped active/expired rows require Continue. Complete retains native deadline/identity checks and now requires acknowledgement. D1 labels are removed from the normal card, and nil staleDate removes expiry selection. [Implementation, compatibility, and device checklist](../proofs/lock-screen/README.md#continue-implementation--2026-11-12). 29 SQL-wrapper checks, TypeScript, JS export, and generated-source inspection Passed; the separately authorized Continue preview also passed native compilation/signing. The expired-rest migrated-record sequence now has the scoped device evidence below. The fresh-fixture flow also has the separate result below; other migration cases, duplicate/stale Continue, lifecycle recovery and dedicated layout checks remain Not run. Prior-build evidence below is historical.

**Continue evidence — 2026-11-12:** for build 41621efa-1d34-4af1-8860-804b7eb01b5d, user-described before/after screenshots preserve Set 1 actual 135 lb × 10, drafts 50 × 8 and 45 × 10, all plans, counts 1/1 and exact expired deadline 1794515816.494715. Continue on that migrated rest promptly revealed Set 2 on the authenticated visible Lock Screen — Passed — user-reported; reopened app showed Expired/dismissed with saved acknowledgement and unchanged data/counts/deadline. After Set 2 at 50 × 8, early Continue revealed Set 3 at 45 × 10; screenshot-supported state is Skipped/dismissed, counts 2/2. After Set 3 at 45 × 10, the user confirmed final expiry/Continue; final screenshot shows Planned sets recorded, three actuals/three requests, Expired/dismissed and saved acknowledgement. This is a migrated-record sequence, not a fresh three-set trial or an independently observed phone session. No other migration, duplicate/stale request, force-quit or termination pass is inferred. See the [evidence and remaining checks](../proofs/lock-screen/README.md#continue-device-results--migrated-record-sequence-2026-11-12).

**Fresh-fixture regression — 2026-11-12: Passed — user-reported**, separately on the same Continue build after resetting the fictional fixture. Actual sets: 40 lb × 8, 50 lb × 8, 45 lb × 10. Described final screenshot: three records/three completion requests, Planned sets recorded, Expired rest, Dismissed rest screen and saved Continue timestamp. Prompt Continue before/after zero and required actions staying on the authenticated visible Lock Screen are user-reported, not independently observed. This does not pass duplicate/stale Continue, duplicate Complete, force-quit, termination or other migrations. No new reopen/layout pass inferred. [Separate evidence and remaining checks](../proofs/lock-screen/README.md#continue-fresh-fixture-regression--2026-11-12). Checkpoint now published at 92da1c915ff702941fcc8b00003dd3f0caf2933e; the saved-feedback patch is now reviewed for separately authorized publication; production framework remains open.

**Historical pre-Continue evidence follows.** Later evidence above does not rewrite earlier build outcomes.

Temporary D1 observation UI compiled/signed in the [D1 preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/22e675fd-8642-4faf-88d5-aa254129f6c5): raw stale/selected layout/publication ID on the Lock Screen and manually read publication/deadline times in the app. Exactly one preview submitted using existing frozen signing; no source correction needed during review. No expiry/timer/storage behavior changed. D1 device evidence is now partial/user-reported: matching publication 1E9DB281, equal published/carried deadline, stale:T with CTRL/Set 2/3/50 × 8/one displayed record, and approximate 1–2-minute automatic reveal. There is no exact-timing recording or fresh database read. Upgrade preservation, fit, and broader functional trials remain unverified; see the [evidence assessment](HANDOFF.md#d1-evidence-and-assessment--2026-11-12). The earlier delayed outcome is unchanged; the newer Continue decision supersedes the no-extra-tap requirement.


**Automatic reveal observed, unacceptable delay — user-reported** for comparison build 9510b48e-aea0-4f67-b724-6e46ff4ee9ae. First untouched expiry revealed controls roughly 1–2 minutes after zero. A subsequent rest hid controls throughout its countdown, then revealed them 1 minute 40 seconds after zero, timed by the user. This later observation does not erase the earlier absence at the initial observation point. Countdown pauses/jumps remain unresolved. No final-set, saved-values/counts, or upgrade-preservation result is inferred. See the [timing assessment, diagnostic, and alternatives](../proofs/lock-screen/README.md#delayed-comparison-results-and-timing-assessment--2026-11-12). No source change or alternative interaction was adopted during that historical investigation; Continue has since compiled/signed and the bounded migrated-record results are recorded above; remaining checks stay Not run.


Adopted 2026-11-11: one fictional exercise, exactly 40 lb × 8, 50 lb × 8, and 45 lb × 10 planned sets; 20-second testing rest. The adopted Continue interaction keeps the final rest card focused on countdown/Continue. Continue reveals **Planned sets recorded** after the third set, including ending its rest early; no fourth set or automatic exercise finish. Native compilation/signing Passed; migrated-record sequence reported above, remaining trials pending. Add Set and Finish Exercise remain later tasks. The proof's ±5 lb / 0–200 lb and ±1 rep / 0–30 limits are fixture settings only; production limits remain open. No routine editor or RIR controls.

Historical pre-Continue source kept immutable plan values, editable drafts/frozen actuals, and explicit session/set/rest IDs. Native completion still checks the actual saved deadline/skip state at execution; old Complete and Skip cannot affect later sets/rest. The new presentation attaches the unskipped saved deadline as ActivityContent.staleDate and selects timer-only versus draft/summary using context.isStale. The local candidate removes the extra wall-clock guard from f55 because it could mask a stale presentation evaluated before the deadline, without a later refresh; this is a hypothesis, not an established cause. Successive-rest presentation still needs testing; native saved-deadline/action-ID guards are unchanged. Skip clears staleness only after commit. Even failed-save publications retain the deadline. No background timer, callback at zero, push infrastructure, or Date.now refresh assumption was added; this is a documented system-rendering mechanism, not a demonstrated exact-time guarantee on this phone. See [official evidence and minimal test](../proofs/lock-screen/README.md#automatic-expiry-assessment--official-evidence-and-limits). Native compilation/signing now Passed in [timer-only preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/f55d4dff-e9ef-475d-ad7e-9f501a7e65db). For build f55d4dff-e9ef-475d-ad7e-9f501a7e65db, automatic reveal at expiry **Failed — user-reported**: the described screenshot shows 0:00 and Skip rest with no next-set controls. Countdown pauses/jumps are reported and remain unexplained. Skip during active rest and Skip at displayed 0:00 each revealed expected controls: **Passed — user-reported, UI reveal only**. These results do not verify saved-record counts, draft preservation, final-set behavior, or exact stored-deadline accuracy. The newer guard-free comparison compiled/signed in [isStale comparison preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/9510b48e-aea0-4f67-b724-6e46ff4ee9ae); later automatic reveal was observed with unacceptable delay — user-reported; final-set behavior, saved values/counts, and upgrade preservation remain unverified. See the [focused diagnostic](../proofs/lock-screen/README.md#timer-only-device-investigation--2026-11-12).

Latest supplied evidence is limited: the user describes before/after screenshots preserving 40 lb × 10, one saved record, two requests, and expired rest through the latest upgrade. The old exact deadline was not visible, so exact deadline preservation is unverified; earlier upgrade attempts remain inconclusive. Next draft 50 lb × 8 appearing during rest and early Complete showing “Rest active—wait or skip” while leaving one saved record are Passed — user-reported on the previous three-set UI. The next-draft-during-rest behavior is now superseded; its earlier pass is retained as history. Do not pass the remaining three-set trials, full three-record completion, new timer-only UI, or final-rest automatic summary without evidence. Production framework remains open.

Older activity publications had nil staleDate. Ordinary foreground read now serializes with mutations and resyncs saved content/transition date only when different, without resetting data or repeatedly publishing identical polls. This upgrade/resume metadata repair does not implement expiry. The former untouched-expiry investigation is deferred under TS-001; Continue now uses acknowledgement, with the current next task in HANDOFF.

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
| Advance with Continue | Show countdown, Continue and compact confirmed-save/failure feedback. Verify before-zero early rest end and at/after-zero reveal of the unchanged draft, with no additional saved record or restarted rest. Repeated/stale taps cannot alter a newer set/rest. After the final rest, Continue shows Planned sets recorded with no fourth set or automatic exercise finish. Keep the authenticated Lock Screen visible. Bounded migrated expired-rest / early Continue / final expired Continue sequence Passed — user-reported; separate fresh-fixture default-value sequence also Passed — user-reported; duplicate/stale checks remain Not run. Previous Skip UI observations alone do not pass Continue. |
| Finish an exercise | Advance exactly once and persist the next exercise. Earlier records retain their original exercise and values. |
| Undo completion | Return the set to a draft while rest continues without cancellation or reset. |
| Interrupt and resume | Restore drafts, completed records, current position, and correct timer state. |
| Swap after two Leg Press sets | Keep those sets under Leg Press. Subsequent Hack Squat sets use Hack Squat identity and history. The change applies only to today. |
| Edit the routine afterward | Previously completed workout records remain unchanged. |

Except for the explicitly scoped proof results above, these broader product checks remain **Not run**. The separate one-set M0 sequence has user-reported pass evidence below; that does not pass the wider product checks.

### M0 — Research and define the Lock Screen proof

Apple documents an unlock gate for buttons and toggles embedded in widgets and Live Activities. The general App Intent authentication policy does not establish an override. A Live Activity can still display session data, and WidgetKit documents dynamic timer display without continuous extension execution. [WidgetKit interactivity](https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities) · [App Intent authentication](https://developer.apple.com/documentation/appintents/appintent/authenticationpolicy) · [Dynamic dates](https://developer.apple.com/documentation/widgetkit/displaying-dynamic-dates)

The adopted scope allows Face ID while the Lock Screen remains visible. The proof checks whether actions work in that state without bringing the app to the foreground and whether their results persist. It retains a closed-padlock trial for comparison. The guided one-set sequence and limited later relaunch/countdown observations are **Passed — user-reported**. The named rest/Skip observations below are also Passed — user-reported for the installed rest build. The display comparison did not reproduce the original immediate blackout; cause unconfirmed. Compact draft, active-rest, zero, and skipped layouts are **Passed — user-reported** for the compact build only; no full functional rerun is inferred. Upgrade preservation is inconclusive because before-values were not recorded. [Capability map and proof plan](LOCK_SCREEN_FEASIBILITY.md)

The first proof is implemented in [proofs/lock-screen](../proofs/lock-screen/README.md) using Expo SDK 57, a Swift Live Activity, background App Intents, and app-local SQLite. It starts at 40 lb × 8 reps. The original trial checks +1 rep and two Complete requests while the authenticated Lock Screen remains visible, then reopens to see exactly one 40 lb × 9 record. The rest extension adds a 20-second countdown and Skip rest. After a missing-Date failure, two Foundation imports were the only corrections in successful preview `aec6ed60-6c49-4883-9f53-9f3513ae4333`: native compilation and signing passed. Its limited rest results are below. The subsequent compact widget layout compiled and signed successfully in preview cacac282-0ac2-43d5-9c66-70ebd3479ae6; its draft/rest/zero/skipped layout fit and reachable controls are Passed — user-reported. Upgrade preservation is inconclusive because before-values were not recorded. Full workout controls remain outside this proof.

The user reports iPhone 15 Pro, iOS 26.6.1 (23G83), and working Face ID. Apple’s published version/build pairing agrees; the phone was not independently inspected. Both targets use iOS 26.0 as the minimum for explicit background intent mode. On Windows, Expo dependency validation, TypeScript, the iOS JavaScript bundle, three file-backed SQLite tests, and generated native configuration inspection passed. The separately authorized one-line import patch compiled and signed successfully in the next preview build. Installation and the guided one-set interaction/reopen sequence are **Passed — user-reported**, not independently observed. That result covers the original one-set build and sequence; the later rest evidence is recorded below. The Expo account and proof project are now linked, and the local upload archive was verified. On 2026-11-11, Apple provisioning access and both ad hoc signing profiles were verified. The first preview failed on the inline module import; patched [preview 2a692799-0280-4f0c-b7f7-1f65b65c1149](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/2a692799-0280-4f0c-b7f7-1f65b65c1149) finished successfully. The user-reported result below covers only that build and sequence.

### First one-set milestone — user-reported evidence

On 2026-11-11, the user reported installation and the guided one-set test passed on EAS build `2a692799-0280-4f0c-b7f7-1f65b65c1149`. Face ID authenticated while the Lock Screen stayed visible; +1 rep and both Complete taps did not open the foreground app. Deliberately reopening showed 40 lb × 9 reps, one saved record, and two received completion requests. This is user-reported evidence, not independent observation. Only this sequence is marked passed.

The rest milestone extends published baseline `73b277dee50af3286380084a49b3f071dd111b97`. For installed build `aec6ed60-6c49-4883-9f53-9f3513ae4333`, record these as Passed — user-reported: rest starts on completion; duplicate Complete does not restart rest; zero holds; Skip stops rest on the authenticated visible Lock Screen; Skipped remains saved after closing/reopening. The earlier relaunch preserved the 40 lb × 9 record and six requests, but later taps may have changed counts. In the display comparison, no-tap went black within five seconds and a later duplicate-Complete comparison stayed visible: the original immediate blackout was not reproduced there. Cause unconfirmed; no fix claimed. Original upgrade preservation remains inconclusive after a possible earlier reset. The only source difference in successful compact preview `cacac282-0ac2-43d5-9c66-70ebd3479ae6` versus that installed rest build is ProofWidget.swift presentation; storage, timer, and intents are unchanged. Nine SQL-wrapper tests do not execute Swift; the new preview separately passed native compilation/signing. The user now reports draft, active-rest, zero, and skipped layouts on the compact build fit without clipping and controls remain reachable: Passed — user-reported, not independently observed. These layout observations do not repeat every earlier functional test. Compact-upgrade preservation is inconclusive because before-values were not recorded; the earlier upgrade remains inconclusive too. Milestone publication is authorized; Git history/session report identify the resulting commit and push status. That ordinary active-rest background/resume check has since Passed — user-reported for accurate remaining time and unchanged values/counts only. Force-quit, system termination, and upgrades remain separate/unverified. Current next task is separately authorized publication of the saved-set visual feedback checkpoint, as [specified in the handoff](HANDOFF.md#next-task--publish-the-reviewed-saved-confirmation-checkpoint); automatic reveal is observed but unacceptably delayed, and its cause remains uncertain. Automatic expiry remains a failed acceptance trial, not a passed capability. Production framework remains open.

### M1 — Log one exercise, run rest, and recover an interrupted workout

Continue compiled/signed and the migrated-record sequence has user-reported early/expired/final results. The separate fresh-fixture default-value sequence also Passed — user-reported. The checkpoint is published; the saved-feedback publication scope is recorded in HANDOFF; duplicate/stale device guards and broader recovery remain unverified. Automatic reveal research is deferred in [TS-001](TROUBLESHOOTING_BACKLOG.md#ts-001--delayed-automatic-return-of-controls); countdown jumps remain TS-002. The comparison-build observations below predate Continue.

The three-set store retains independent defaults, preserved drafts, native completion gating, and bounded count. The prior rest-only presentation used system staleness to reveal the existing draft/final summary; Continue now uses stored acknowledgement instead; no database or default reload occurs at that transition. Earlier native compilation passed for f8955622-dd9c-4e10-8eac-39c120a55890; the subsequent f55 timer-only patch compiled/signed but automatic expiry Failed — user-reported. Skip reveal passed only visually. The newer guard-free comparison has now compiled/signed; later automatic reveal was observed with unacceptable delay — user-reported; final-set behavior, saved values/counts, and upgrade preservation remain unverified. Undo, Add Set, Finish Exercise, wider recovery, and optional/blank production inputs remain later work.

### M2 — Edit routines and test one complete workout

Verify that routine settings save independently. Select one routine, run the complete flow, and use the planned swap and history checks above. The first routine remains open.

### M3 — Support and test full-week use

After one-routine testing, extend to full-week use. Define the week’s test coverage once the multiple-routine versus calendar decision is made. The required actions on the visible Lock Screen must pass the physical-device checks for release. Face ID is acceptable. Release timing remains open.

## Open questions

- Which saved routine will be the first test?
- Which widget or Live Activity controls reliably handle the required actions on the visible Lock Screen after Face ID? Which surface has room for usable numeric editing and the workout controls?
- Which remaining actions and recovery states work reliably beyond the user-reported one-set pass? Expo compilation/signing is verified for the successful build; the production framework remains open.
- How should users populate a routine's initial planned pounds/reps (including any later history suggestions), and how should unknown RIR appear? Each next draft already uses its own plan; this does not decide how that plan is initially authored.
- What input limits, weight increments, and assisted-exercise recording rules should apply?
- How should users finish a workout and correct its history?
- What are the remaining rest defaults and notification preferences?
- Does initial full-week use mean multiple selectable routines or a calendar schedule?
- What release timing is realistic once Lock Screen feasibility has been tested?

## Decision log

| Date | Choice | Status and reason |
| --- | --- | --- |
| 2026-11-12 | Record bounded saved-confirmation result and publication review | Build 33cfa887: screenshot-supported preservation as described; separate fresh Set 1 confirmation through zero, Continue and reopen Passed — user-reported. Failure/retry, duplicate/stale, accessibility and broader recovery remain Not run. Ten-file checkpoint reviewed for separately authorized publication; both troubleshooting issues stay open. |
| 2026-11-12 | Show durable saved-set confirmation during rest | Adopted: compact ✓ Set saved until Continue, only for the completed set associated with that rest. Failure/retry feedback takes precedence; no pending/tap success. Values/edit/Complete stay hidden. Prepared locally; native/device tests Not run. |
| 2026-11-12 | Record separate fresh-fixture Continue regression | Passed — user-reported on build 41621efa: actuals 40 × 8, 50 × 8, 45 × 10; three records/requests; Expired/Dismissed with acknowledgement. Prompt early/late Continue stays on authenticated Lock Screen. No duplicate/stale, lifecycle or other migration pass inferred; TS-001/TS-002 stay open. |
| 2026-11-12 | Record bounded Continue device evidence | Migrated expired-rest preservation and subsequent early/final expired Continue sequence Passed — user-reported, with screenshot-supported app states as supplied. Not a fresh three-set trial; other migrations, duplicate/stale actions and lifecycle cases remain Not run. Continue decision unchanged; TS-001/TS-002 stay open. |
| 2026-11-12 | Countdown and Continue; defer prompt automatic reveal | Adopted by user. Before zero end rest early; at/after zero reveal existing draft without saving/restarting. Final Continue reveals Planned sets recorded. Supersedes earlier automatic-return release requirement; always-visible controls were not adopted. Implementation/device checks pending; TS-001 and TS-002 remain unresolved. |
| 2026-11-12 | Investigate timer-only expiry failure without broadening scope | f55 automatic reveal Failed — user-reported; two Skip reveals are UI-only passes. Prepare a guard-free isStale candidate, not a proven fix. Countdown cadence remains open; required no-tap transition and production framework decision are unchanged. |
| 2026-11-12 | Timer-only rest; automatic draft/final-summary reveal after Skip or natural expiry | Adopted UI change, superseding the 2026-11-11 editing-during-rest presentation. Implemented locally with documented staleDate/isStale rendering, unchanged storage/guards. Timing reliability and new native/device checks Not run; no extra tap or app-opening substitute adopted. |
| 2026-11-11 | Own-plan defaults, immediate next draft during rest, native rest gate, and no automatic exercise finish | Adopted by the user. Implement only three fictional planned sets now; Add Set/Finish Exercise, routine editing, RIR, and production validation settings remain later/open. New native/device checks Not run. |
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
