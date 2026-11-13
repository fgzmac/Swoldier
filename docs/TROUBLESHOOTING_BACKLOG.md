# Swoldier troubleshooting backlog

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
