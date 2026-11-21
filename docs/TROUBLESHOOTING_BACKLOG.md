# Swoldier troubleshooting backlog

## 2026-11-19 — Integration follow-ups and phone verification

Future requests include authorized Apple Health/Watch activity energy, BodySpec account/report import, Google Health, Android Health Connect, food and macronutrients, and validated on-track forecasting. Each import needs permission, source identity, units, measurement date and duplicate prevention. RMR is a resting estimate. Daily active energy may already include a workout. Expenditure and intake targets need their own data and methodology. Keep new REQUEST items queued for future batches. TS-001, TS-002 and the separate display-sleep investigation remain open.

## Usability implementation boundary — 2026-11-16

The ten supplied notes are now implemented locally, including intentional foreground exact-set editing and separate skipped state. The supplied completed-summary screenshots motivate clearer presentation and a proper skip path; they do not establish the intent behind any particular zero-valued record. No existing 0×0 record is rewritten. Personal screenshots/records are not copied into the repository; tests use fictional data.

The later supplied routine-library image is an interim design reference, replacing the need for the missing example URL. It does not authorize the community/progress features pictured. Screen sleep remains a separate existing-build comparison below; no new phone trial or cause is established. **TS-001 automatic-reveal delay and TS-002 countdown jumps remain open/deferred.** Original blank → 0 remains inconclusive/not reproduced, with no fix claimed. Native/device checks for the usability patch remain Not run.

## Screen sleep investigation — 2026-11-16

Investigated separately from usability edits. Current proof source has no idle-timer/keep-awake control or activity alert configuration; native actions commit state then update an existing Live Activity, with foreground repair comparing saved state. This static trace cannot establish why the user's screen slept or exclude OS/display/authentication behavior. The ten new workout notes were not supplied, so no new timing/device observation is invented.

Apple documents [isIdleTimerDisabled](https://developer.apple.com/documentation/uikit/uiapplication/isidletimerdisabled) as controlling an app's idle timer and advises limiting its use. [Live Activity custom views](https://developer.apple.com/documentation/activitykit/creating-custom-views-for-live-activities) describe system dimming on Always-On displays. These sources do not establish an API guarantee to keep this Lock Screen activity awake; no keep-awake workaround, new timer, alert or polling was added. A layout edit is not a sleep fix.

Proposed comparison, **Not run**: keep phone position/settings constant; compare an untouched authenticated Lock Screen with a trial using one ordinary action. Film externally if available, noting padlock/authentication, time since wake/action, whole-display darkness versus only card changes, and saved state on reopening. Record countdown jumps separately. No low-battery/network/display-setting cause is assumed.

Apple also documents [deep links from a Live Activity](https://developer.apple.com/documentation/widgetkit/linking-to-specific-app-scenes-from-your-widget-or-live-activity) that open a matching app screen. This is a candidate for the requested exact-set editor, not a background/no-app interaction; scope needs confirmation before implementation. TS-001 automatic-reveal delay and TS-002 countdown jumps remain open/deferred. Original blank → 0 remains inconclusive/not reproduced; no fix claimed.

## RIR and Start-feedback phone update — 2026-11-16

On build 2614e927, friendly unfinished-workout Start rejection without raw exception/file-path text and preservation of the active workout **Passed — user-reported**. This updates the expected-refusal wording result only; unrelated errors, injected failure/retries and broad concurrency remain untested. [Scoped RIR/upgrade evidence and remaining checks](../proofs/lock-screen/README.md#rir-phone-results-and-current-checklist--2026-11-16).

**TS-001 delayed automatic reveal and TS-002 countdown jumps remain open/deferred.** These RIR checks do not establish a fix for either. The original blank → 0 observation remains **inconclusive / not reproduced**; no adjustment-source correction was established. Dense RIR/context fit has support only in the shown short-name layouts; long names/larger text/accessibility remain unverified. Preserve all earlier reports below as historical evidence.

## Blank-value repeats and publication review — 2026-11-15

c059edb9's bounded fresh-start pounds-minus, Complete/Undo/minus and direct blank-plus-after-Undo repeats **Passed — user-reported**, with screenshot-supported card/app states. Blank remained blank on minus; direct plus produced 5 lb × 1 while the blank plan and zero-record/one-request state remained. Fresh-start revision 17 had blank pounds/reps, zero records/requests and no rest. Initial blank → 0 remains **inconclusive / not reproduced**, not fixed; no adjustment correction was established. Prior reports below remain intact.

The Start-message correction review found no blocker, but its four changed build inputs remain unbuilt/device-unverified. c059edb9's compile/device evidence is separate. Both deferred troubleshooting issues and untested cases remain open. [Current review, evidence limits and proposed publication list](HANDOFF.md#start-integration-publication-review--2026-11-15).

## Start integration issues — 2026-11-15

- **Minus on blank pounds: open, cause unconfirmed.** On c059edb9, Off reps-only completion → Undo → pounds minus reportedly showed 0, followed by plus → 5. User confirmed only the Lock Screen was inspected before plus; stored mutation is unknown, and direct blank → 5 is not proven. Source and native-style TEXT-bound SQL checks keep NULL through minus/Undo/reopen; no adjustment/storage/display fix prepared. Blank reps has equivalent source handling and local checks but no phone minus result. Next: capture the card, reopen immediately after minus and before plus/Complete, and inspect the app's fresh draft; reopening itself can repair publication. Do not delete/reset to diagnose it.
- **Expected unfinished-Start developer details: correction prepared, unbuilt/device-unverified.** A dedicated native outcome replaces the expected UnexpectedException display with friendly resume wording and a stable diagnostic code. Unfinished-session protection and unrelated error reporting remain unchanged. Requires review and later native/device validation; no paid build authorized.
- c059edb9 has scoped preservation/snapshot/value/rest/Undo/Add Set reports in the [evidence table](../proofs/lock-screen/README.md#start-device-evidence-and-two-issues--2026-11-15). These do not establish broad concurrency, retry/recovery/accessibility or older-session history preservation. **TS-001 delayed automatic reveal and TS-002 countdown jumps remain open/deferred.** Last verified free allowance was 15/15; no allowance query or new build in this task.

## Optional-rest results — 2026-11-14

Build 1a119269 now has supplied screenshot-supported workout preservation and scoped user-reported routine/optional-rest passes, including remembered 60 seconds and blank-versus-zero handling. [Evidence and unrun cases](../proofs/lock-screen/README.md#current-optional-rest-preview--2026-11-14). The earlier missing-set observation remains **inconclusive**; subsequent blank-versus-zero tests passed, with no confirmed bug or fix. These editor results do not resolve **TS-001 delayed automatic reveal** or **TS-002 countdown jumps**; both remain open/deferred. Start remains disconnected and disabled-rest workout behavior unimplemented. Earlier notes below describe their original checkpoints.

## Routine-editor evidence note — 2026-11-14

Repeat blank-versus-zero test: **Passed — user-reported**. The earlier missing-set report is not a confirmed bug or demonstrated fix; no cause inferred. No additional screenshots, exact values/counts or build identifier supplied in this task. Optional Track rest is a new local editor/storage change, unbuilt/device-unverified, and does not resolve TS-001 delayed automatic reveal or TS-002 countdown jumps. Both remain open/deferred.

## Routine-editor scope — 2026-11-13

Separate routine editing/storage is prepared locally without changing Lock Screen behavior. This does not resolve TS-001 automatic-reveal delay or TS-002 countdown jumps; both stay open/deferred. New editor/native/device checks remain scoped in the [handoff](HANDOFF.md). Prior wording remains device-unverified.

## Two-exercise scope update — 2026-11-13

Add Set/Next Exercise/Finish Workout are now prepared locally in the bounded two-exercise proof, with final-rest Continue before the two choices. Review passed without source correction; one preview compiled/signed successfully. The guided a6785cf2 upgrade and Add/Undo/Next/Finish sequence now has limited screenshot-supported/user-reported evidence. It does not test deliberate duplicate/stale/competing actions, retries, accessibility or broader recovery, and does not validate the later unbuilt Complete Set / End Rest wording. No countdown or automatic-reveal fix is established. Historical Add Set-unimplemented statements below describe earlier checkpoints. Countdown rendering and automatic-reveal behavior are unchanged; TS-001 and TS-002 remain open/deferred. [Current handoff](HANDOFF.md).

The earlier checkpoint descriptions below retain their original scope and evidence.

Updated: 2026-11-12 (America/Los_Angeles)

Intended repository location: `docs/TROUBLESHOOTING_BACKLOG.md`.

Track unresolved problems without blocking unrelated progress. Deferred means unresolved, not fixed or accepted as correct. Keep observed facts, hypotheses, adopted decisions, and proposed investigations separate. This file summarizes supplied device screenshots and user/local-Codex reports; it does not claim independent device testing or local source inspection.

## Current decision: Continue

**Adopted by the user on 2026-11-12; implemented locally on 2026-11-12, native compilation/signing Passed; bounded migrated-record and separate fresh-fixture sequences Passed — user-reported, other checks pending.**

- Keep the rest screen focused on the countdown and one button labeled exactly **Continue**. The 2026-11-12 visual-feedback requirement adds compact durable **✓ Set saved** confirmation or readable failure/retry status; values/editing/Complete stay hidden.
- Before zero, Continue ends rest early and reveals the next existing draft.
- At or after zero, Continue reveals that draft without saving a set or restarting rest.
- Preserve draft edits, planned targets, completed records, and duplicate/stale-action protections. Required taps must keep the authenticated Lock Screen visible.
- At the end of the three-set proof, Continue should reveal **Planned sets recorded**, without a fourth set or automatic exercise finish; the migrated-record final sequence now has the limited evidence below.
- Prompt automatic return is deferred as an improvement. The first version must not depend on the delayed stale-state transition to make controls available.

The Continue decision supersedes automatic return as a first-version requirement. It does not establish that automatic return is impossible. Do not silently restore editing/Complete controls during rest. The implementation task prepared Continue locally without a cloud build. One later authorized [Continue preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/41621efa-1d34-4af1-8860-804b7eb01b5d) compiled/signed successfully; the later bounded device evidence is recorded below, separately from compilation.

Local implementation update — 2026-11-12: persisted continued_at separates acknowledgement from elapsed rest; only early Continue marks skipped. Active/expired installed rows await Continue, skipped rows are backfilled to remain dismissed. 29 production-SQL wrapper checks Passed; they do not execute Swift. [Compatibility and pending device checks](../proofs/lock-screen/README.md#continue-implementation--2026-11-12). TS-001/TS-002 remain unresolved; no diagnostic history below is rewritten.

Device update — 2026-11-12: the Continue build's migrated expired-rest sequence Passed — user-reported. User-described screenshots preserve the original actual, two drafts, plans, counts and exact deadline across upgrade; expired Continue preserves Expired and acknowledgement on reopen, early Continue yields Skipped, and final expired Continue yields Planned sets recorded with three actuals/three requests. Lock Screen reveal interactions are user-reported, not independently observed. See the [evidence table](../proofs/lock-screen/README.md#continue-device-results--migrated-record-sequence-2026-11-12). This was not a fresh three-set trial; repeated/stale Continue, other migration cases and lifecycle recovery remain Not run. Neither automatic-reveal delay nor countdown jumps is resolved by these results.

Fresh-fixture update — 2026-11-12: a separate reset/default-value trial on the same Continue build Passed — user-reported. Actuals 40 × 8, 50 × 8, 45 × 10; final screenshot described as three records/three requests, Planned sets recorded, Expired/Dismissed with acknowledgement. Prompt Continue before/after zero stayed on the authenticated visible Lock Screen by report. Duplicate/stale Continue, force-quit, termination and other untested cases remain Not run. [Evidence and limits](../proofs/lock-screen/README.md#continue-fresh-fixture-regression--2026-11-12). This does not fix or close TS-001 or TS-002.

Publication / visual-feedback update — 2026-11-12: Continue checkpoint published at [92da1c915ff702941fcc8b00003dd3f0caf2933e](https://github.com/fgzmac/Swoldier/commit/92da1c915ff702941fcc8b00003dd3f0caf2933e). The saved-confirmation/failure-label patch subsequently compiled/signed as build 33cfa887; bounded upgrade preservation and fresh Set 1 confirmation through zero/Continue/reopen now Passed — user-reported. Screenshot-supported preservation (as described) is separate from reported interactions. Failure/retry, duplicate/stale actions, accessibility and broader recovery remain Not run. It changes neither automatic reveal nor countdown timing and closes neither issue. See the [current handoff](HANDOFF.md).

Undo preparation — 2026-11-12: baseline 3f0874507b2fb5e713b09226c04dddea101d2e11 is published. Local Undo adds a second rest action beside Continue, preserving the original deadline and acknowledgement until Continue. Fresh completion/rest identity guards old Undo; 44 SQL-wrapper tests Passed, native/device checks Not run. This changes neither countdown rendering nor automatic expiry behavior and closes neither issue. The adopted Add Set copy-last-completed rule is not implemented. [Current handoff](HANDOFF.md).

Undo build update — 2026-11-12: review found no blocker; one [Undo preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/b035cb35-659a-4782-a7b7-3e5d0125be89) compiled/signed successfully. Installation, phone migration, Undo actions, exact retries and layout remain Not run. No source correction or countdown/reveal fix was made during review. TS-001/TS-002 remain open and Add Set unimplemented.

## Undo refinement update — 2026-11-13

Immediate editing after committed Undo is prepared locally; normal rest retains Continue. Its Complete action checks the saved deadline rather than waiting for an automatic card redraw. This does not fix delayed automatic reveal or countdown pauses/jumps. Both issues remain open/deferred. Earlier final-set/active-rest Undo and corrected re-completion Passed — user-reported; new immediate-edit device trials Not run. Add Set unimplemented. [Current handoff](HANDOFF.md).

Immediate-edit build review — 2026-11-13: no blocker/source correction. One [immediate-edit Undo preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/74c497a5-308e-4f0d-bee7-53152648eed5) compiled/signed successfully. New phone preservation, layout, editing/Continue/expiry and failure/retry checks remain Not run. This closes neither TS-001 nor TS-002 and does not implement Add Set.

Immediate-edit device update — 2026-11-13: the five guided steps on build 74c497a5 Passed — user-reported, covering displayed preservation, immediate editing with preserved rest, early rejection, edited Continue/re-completion, expiry completion without Continue/app opening, and readable/reachable controls with plans/other records unchanged. No new screenshots, exact values/counts or timestamps supplied. Failure/retry injection, deliberate stale/duplicate execution, accessibility and broader lifecycle remain Not run. This does not resolve countdown jumps or delayed automatic reveal; both issues stay open, and Add Set is unimplemented. [Evidence](../proofs/lock-screen/README.md#immediate-edit-device-results--2026-11-13).

## Issue index

| ID | Issue | Status | Revisit trigger |
| --- | --- | --- | --- |
| TS-001 | Next-set controls appear late after rest reaches zero | Deferred; cause unknown; Continue workaround compiled; bounded migrated-record results Passed — user-reported; remaining checks unrun | After the core routine works, or when a materially different supported approach can be tested |
| TS-002 | Countdown visibly pauses and jumps | Deferred; cause and timing accuracy unknown | Before a realistic workout trial; sooner if saved timing is shown to be wrong |

## TS-001 — Delayed automatic return of controls

### Expected and observed

The earlier requirement was to show only countdown/Skip during rest and automatically reveal the next draft's controls promptly at zero, without a tap or opening the app. Controls instead returned roughly 1–2 minutes late. In one comparison trial, the user timed a delay of **1 minute 40 seconds after zero**. This does not meet that earlier requirement.

### Evidence and attempts

- Timer-only build `f55d4dff-e9ef-475d-ad7e-9f501a7e65db`: controls were absent at the initial zero observation. User reported that Skip during active rest and at zero revealed the expected controls. Those results establish UI reveal only, not all persistence/count checks.
- Comparison build `9510b48e-aea0-4f67-b724-6e46ff4ee9ae`: removed the additional current-date safeguard from view selection. Automatic reveal eventually occurred but was unacceptably late. Subsequent rest hid controls throughout its countdown (user-reported). The 1:40 measurement belongs to this comparison, not D1.
- Diagnostic build `22e675fd-8642-4faf-88d5-aa254129f6c5` (D1): added raw stale flag, selected layout, publication ID, and read-only publication metadata. User reported a roughly 1–2-minute delay and a change to stale T. No video or precise transition timing is available; the earlier flag was described as D, so an exact observed F-to-T sequence is not independently established.
- D1 Lock Screen screenshot shows publication **1E9DB281**, `stale: T`, `CTRL`, Set 2/3, 50 lb × 8 reps, and one saved record.
- The matching diagnostic screenshot shows submission at `2026-11-12T20:36:36.506Z`; published staleDate and saved deadline carried in that publication both display `2026-11-12T20:36:56.494Z` (about 20 seconds later). Save failure displayed: no.
- Matching IDs allow comparison of that publication's metadata. They do not establish that its ID never changed throughout the unseen interval.

### What this establishes — and does not

The matching publication has no minute-scale deadline offset. The visible return was late in reported trials. The mechanism is unsuitable for the desired prompt interaction as currently demonstrated.

The panel reads ActivityKit content, not a fresh database value. The on-screen stale flag also depends on rendering and cannot independently timestamp an internal iOS event. Screenshots show end states, not the exact order or time of transitions. No universal iOS limitation, fixed mandatory delay, or confirmed root cause has been established. Native compilation success and SQL-wrapper tests do not prove timing behavior; the wrappers do not execute Swift.

### Workaround and future investigation

Use the adopted Continue interaction above. The migrated-record early/expired/final sequence is reported above; the separate fresh-fixture default-value regression is also reported above; repeated/stale requests remain to test. Do not mark the workaround verified based solely on earlier Skip observations.

Proposed later investigation: compare a minimal isolated Live Activity using an official Apple sample pattern with the workout implementation on the same device. Verify publication/deadline metadata and distinguish visual countdown changes from whole-card refresh. A reproduction in both strengthens a platform explanation; it does not conclusively prove it. A prompt minimal example would justify investigating implementation differences.

Time-box that investigation. Define the distinguishing observation before coding; do not repeat speculative staleDate variations. New cloud builds require separate authorization. No push server, polling, or dependencies are adopted by this backlog.

Before closing this issue, define an acceptable maximum reveal delay with the user, then test automatic return over repeated consecutive rests and relevant recovery states on identified builds/devices. Preserve the earlier failed/delayed results.

## TS-002 — Countdown pauses and jumps

**Observed:** During a timer-only trial, the user reported that countdown digits sometimes paused, then changed by 2–3 seconds within about one second. No recording or independent elapsed-time comparison is available.

**Unknown:** Whether this is only display cadence or also incorrect elapsed/rest timing. Do not attribute it to battery level, network latency, music, settings, or iOS without evidence. Do not assume TS-001 and TS-002 share a cause.

**Current mitigation:** The proof uses a saved deadline and permits tap-to-reveal through its existing Skip path; Continue is the replacement with native compilation/signing Passed and bounded migrated-record device results reported above. Neither establishes that countdown smoothness or timing accuracy is fixed.

**Proposed later check:** Compare a fresh rest against an independent clock, noting submission, intended deadline, visual zero, and pauses/jumps separately. Inspect persisted timing without confusing it with carried publication metadata. Record build/device conditions without assuming they caused the result. If instrumentation changes presentation, note that limitation.

**Closure:** Establish correct elapsed timing and acceptable countdown presentation with repeatable evidence. If timing is wrong, revisit promptly rather than treating the issue as visual polish.

## Reference builds and documentation

- [Initial timer-only build](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/f55d4dff-e9ef-475d-ad7e-9f501a7e65db)
- [Comparison build](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/9510b48e-aea0-4f67-b724-6e46ff4ee9ae)
- [D1 diagnostic build](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/22e675fd-8642-4faf-88d5-aa254129f6c5)
- [Apple staleDate documentation](https://developer.apple.com/documentation/activitykit/activitycontent/staledate)
- [Apple Live Activity documentation](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities)

## Adding or revisiting an issue

Use a stable TS identifier. Record expected behavior, actual behavior, build/device, evidence strength, impact, workaround, unresolved explanations, next discriminating check, and closure criteria. Date new findings and preserve prior outcomes. Keep future-feature ideas separate from defects. Personal learning reflections remain user-written in the build log.
