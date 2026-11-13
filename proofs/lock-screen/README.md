# Swoldier Lock Screen proof

**Earlier Continue status:** the [Continue preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/41621efa-1d34-4af1-8860-804b7eb01b5d) FINISHED; native compilation/signing Passed. The migrated expired-rest upgrade and subsequent early/final expired Continue sequence Passed — user-reported, with app state supported by user-described screenshots. A separate fresh-fixture regression also Passed — user-reported at 40 × 8, 50 × 8, 45 × 10; edge cases remain Not run. See both bounded results below.

## Saved-set visual feedback — prepared locally, 2026-11-12

Published baseline: [92da1c915ff702941fcc8b00003dd3f0caf2933e](https://github.com/fgzmac/Swoldier/commit/92da1c915ff702941fcc8b00003dd3f0caf2933e); local HEAD rechecked in this review; remote main matched in the prior preparation task, not queried again here. This new presentation patch is uncommitted. **Corrected native compilation/signing Passed** in the [saved-confirmation preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/33cfa887-8f9f-46cd-a5d8-95d88dd3e31f); bounded upgrade preservation and fresh Set 1 confirmation-through-zero/Continue/reopen **Passed — user-reported**, as recorded below. Failure/retry, duplicate/stale actions, VoiceOver, larger text and broader recovery remain **Not run**. The earlier Continue build/pass below belongs to the published baseline and does not verify this patch.

During an unacknowledged rest, show compact **✓ Set saved** above the existing countdown and Continue only when the saved snapshot confirms the completed set associated with that rest. Keep it through 0:00 until Continue dismisses the rest. Pounds, reps, adjustments and Complete remain hidden. Failure replaces the normal rest/draft/final layout with readable action-specific retry feedback, up to two lines; it suppresses saved confirmation and does not guess current draft state from an old publication. The success text has the spoken label **Set saved**; it does not rely on color. Touch targets, spacing, margins, timer and draft controls are unchanged. The user reports the confirmation was not clipped in the tested presentation. Broader layout/accessibility still needs the checklist.

Implementation: optional ContentState.savedRestSetID is populated by the coordinator only from a completed row in the returned stored snapshot whose ID matches the current rest's established setID + ":rest" identity. Both existing creation and legacy import use that identity. Store writes return only after COMMIT; no tap/pending flag creates confirmation. The widget also matches this saved-set identity to its displayed rest and hides success whenever saveFailed is true. The next draft's completed flag is not used as proof of the previous set's save. Older content without this optional field shows no guessed success; ordinary saved-state republishing fills it. No database column, migration, SQL, storage transaction, intent, deadline, acknowledgement or action-guard change. No timers, animation, haptic or wake changes. The manual D1 panel remains separate.

**Earlier review correction — 2026-11-12; build withheld in that task:** the previous rest failure text always said Continue to retry, even when the failed operation was Complete or an edit. The coordinator now retains the failed action and exact session/set/rest IDs (plus delta for edits) in optional ContentState.failedAction. ProofAction adds Codable/Hashable for that payload only; its cases and store handling are unchanged. Failed Complete shows **Complete request failed / Retry Complete** bound to that request. Failed Continue shows **Continue failed — tap Continue to retry / Continue** bound to that acknowledgement. Failed edits retry the original change; legacy Skip retries its original entry point. No retry substitutes a newer draft/rest. Older failure content without this metadata requests reopening to check saved state. A failed duplicate request does not establish that its earlier completed record is missing. Dynamic Island displays failure too. No automatic replay or storage mutation is added by displaying the error.

Successful store-return publication or successful foreground saved-state reconciliation clears the failure and rebuilds the card. An old retry may safely do nothing under unchanged SQL guards; a successful duplicate Complete request is still counted as a received request, without adding a record or restarting rest. The saved-confirmation mapping remains unchanged. The earlier review withheld its build because of the blocker. The subsequent review found no remaining blocker and made no source changes; its single authorized build result follows.

Windows checks Passed: 29 existing production-SQL wrapper tests, TypeScript, and configuration regeneration with eight exact native-source/resource comparisons. These SQL tests use a separate JS wrapper, do not execute Swift, and do not test the new Swift confirmation mapping or rendering. Static review traced successful commit before publication, failed-save precedence, matching rest identity and optional-field compatibility. The subsequent [saved-confirmation preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/33cfa887-8f9f-46cd-a5d8-95d88dd3e31f) FINISHED: Xcode ARCHIVE SUCCEEDED, zero compiler errors, signed IPA exported. The later bounded upgrade and confirmation trial is recorded below. Failure injection, isolated older-content decoding, accessibility and other untested device trials remain Not run.

**Preview build evidence — 2026-11-12:** build 33cfa887-8f9f-46cd-a5d8-95d88dd3e31f finished at 2026-11-13T05:28:37.744Z. Base 92da1c915ff702941fcc8b00003dd3f0caf2933e plus the reviewed three Swift files; no source edits in this review/build task. Fresh archive contains exactly 15 intended files with matching local SHA-256 hashes, unchanged after upload. Existing project and frozen signing reused, no Apple-server profile revalidation claimed. Free iOS usage 8/15 before, 9/15 after; zero overage. One submission, no retry, commit or push. Both targets still use 1.0.0 (1); use the build link for artifact identity. Native compilation does not execute runtime retry/decoding tests.

### Saved-confirmation device results — 2026-11-12

**Passed — user-reported for the bounded sequence on build 33cfa887-8f9f-46cd-a5d8-95d88dd3e31f.** Upgrade app state is screenshot-supported as described by the user; no screenshots were attached or independently inspected in this recording task. Lock Screen interactions, installation/build identity and the later reopen are user-reported, not independently observed.

| Evidence | Result and scope |
| --- | --- |
| Before/after upgrade screenshots | Unchanged saved actuals **40 lb × 8, 50 lb × 8, 45 lb × 10**; plans; **three records / three completion requests**; **Expired / Dismissed** rest; deadline and acknowledgement timestamps. Preservation Passed for these displayed fields in this completed/dismissed-rest upgrade case. Exact timestamps were not supplied in this report and are not invented. |
| Fresh trial after reset | User completed **Set 1 at 40 lb × 8**. This starts a separate one-set trial; the three preserved records above belong to the pre-reset state. |
| Saved confirmation | User confirmed **✓ Set saved** appeared promptly, remained through **0:00**, and was not clipped. Passed — user-reported for this message and tested presentation only; no measured latency, larger-text or VoiceOver result. |
| Continue after zero | User confirmed confirmation disappeared and **Set 2 at 50 lb × 8** appeared while the authenticated Lock Screen remained visible. Passed — user-reported for this transition. |
| Reopen after Continue | User confirmed **one saved record / one completion request**, rest **Expired / Dismissed**. This supports ordinary reopen for this sequence, not broader recovery or repeated-request behavior. |

No fresh Set 2/Set 3 completion, final-rest confirmation, early-Continue confirmation, failure/retry, duplicate/stale action, VoiceOver, larger-text, force-quit, system termination, repeated republication or other migration pass follows. The upgrade does not isolate decoding of every older ActivityKit payload. One request/one record does not test duplicate prevention. Prior Continue results stay attached to build 41621efa; native compilation/signing of 33cfa887 was independently checked in the earlier build task. TS-001 automatic-reveal delay stays deferred/open; TS-002 countdown pauses/jumps stays unresolved/open.

<a id="saved-confirmation-device-checklist--not-run"></a>

### Saved-confirmation device checklist — partial reported pass

The results above pass only the specifically reported parts of this checklist; all other parts remain Not run. Use the [saved-confirmation preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/33cfa887-8f9f-46cd-a5d8-95d88dd3e31f); the previously installed Continue build 41621efa does not contain this patch. Before upgrading, capture current actuals/drafts/plans, counts, deadline and acknowledgement; install without deleting/resetting and compare after ordinary reopen. Only then deliberately use a fresh fictional trial if needed.

1. Complete a set on the authenticated visible Lock Screen. Check that **✓ Set saved** appears with the resulting rest, above countdown/Continue; pounds, reps, adjustments and Complete stay hidden. Reopen afterward and confirm the corresponding actual record and deadline. A tap or pending write is not evidence of success.
2. In a separate rest, let zero hold: the message, **0:00** and **Continue** should remain until acknowledgement. Test early and expired Continue separately: the message disappears with that rest, the existing draft returns unchanged, and early/expired classification stays correct. After set 3, final Continue still shows Planned sets recorded with exactly three actuals and no fourth set/automatic finish.
3. Check compact fit, text contrast, larger text and VoiceOver: success is announced as **Set saved**, failure text wraps readably, countdown and the existing Continue touch target stay reachable. Record clipping/overlap and countdown jumps separately.
4. For accidental repeated Complete taps, capture before/after received-completion-request count, actual record count and saved deadline. Two physical taps do **not** prove two intents executed. If only one request is received, record two taps/one received request; leave two-request execution unverified. If two requests are received for the same target, check one new actual record and one unchanged rest deadline. Do not call tapping a newly rendered next-set control a duplicate or stale request. Continue must not save a set or increment completion counts; a second tap may land after the control changes, so record its actual target/effect.
5. If a write failure is safely reproducible in a separately authorized test, verify **no success message in the failed publication**, readable retry feedback, unchanged saved data, and success only after a confirmed commit. A failed Continue must offer **Continue** for the exact failed acknowledgement; a failed Complete must offer **Retry Complete** for the original set/rest, even if older displayed content showed rest or the final summary. Verify each retry executes the named action and that stale targets cannot act on a newer draft/rest. Test failed adjustment feedback separately if safely available. Older failure content with no retry metadata must request reopening rather than guess a target. No failure injection or phone test was run here; otherwise leave this check Not run.

No force-quit, termination, other migration, stale-request, or broad accessibility pass is implied. TS-001 delayed automatic reveal remains deferred; TS-002 countdown jumps remains unresolved.

## Continue implementation — 2026-11-12

**Native compilation/signing Passed; migrated-record and separate fresh-fixture Continue sequences Passed — user-reported.** Rest now selects its card using persisted acknowledgement rather than isStale. The published card had only the bounded countdown and **Continue**; the prepared visual patch above adds confirmed-save or failure feedback. Zero stays visible until Continue. D1 flag/branch/publication labels are removed from the card. Historical D1 evidence remains unchanged, and the separate manual app metadata panel remains available. No automatic-reveal research resumed; countdown jumps are not claimed fixed.

Continue runs a background native intent with explicit session/set/rest IDs. After the write lock, one SQL update saves continued_at and, only if the actual deadline is still in the future, skipped_at. At/after expiry skipped_at stays null. It does not touch sets, completion-request counts, plans, or deadlines. Commit succeeds before the coordinator publishes the stored result. Failed writes roll back and leave Continue retryable; the button label stays exactly Continue (the corrected presentation patch uses a dedicated failure card and the exact failed acknowledgement IDs). Duplicate/stale requests cannot acknowledge another rest. Complete additionally requires the current rest acknowledgement, preserving its existing deadline/Skip and identity guards. Existing native draft editing logic is preserved, but controls are hidden while awaiting Continue.

The app shows elapsed rest state separately from Awaiting Continue/acknowledgement time. The final rest follows the same rule: Continue reveals Planned sets recorded, with no fourth set or exercise-finished flag. Start/Show can restore a missing Live Activity for an unacknowledged final rest. Activity content adds an optional acknowledgement field, and new publications use nil staleDate; no timer/clock callback or staleness transition selects the next draft. Existing foreground repair republishes only changed content, including migration/acknowledgement, without reseeding drafts.

### Installed-data compatibility

Version 3 adds one nullable continued_at column to the existing proof_rests_v2 table in the same database. The migration and version update share a transaction and recheck the version under the write lock. Version-0/1 legacy import still runs once before the additive change; version-2 installed data skips that import. No reset/delete is required.

| Existing state | Upgrade behavior |
| --- | --- |
| No rest / legacy record with no deadline | No rest invented; existing drafts/records/counts remain. |
| Active, unskipped rest | Deadline and data unchanged; acknowledgement null, so Continue required even after it expires. |
| Expired, unskipped rest | Keep original deadline and expired classification; acknowledgement null, so show 0:00/Continue. Earlier automatic reveal cannot establish a user acknowledgement. |
| Skipped rest | Backfill continued_at from skipped_at so already-dismissed rest stays dismissed. This is a compatibility marker for the historical Skip, not evidence of a new Continue tap. |
| Already migrated / repeated opens | No reimport or repeat backfill; saved acknowledgements remain unchanged. |

Old serialized activity fields remain optional/decodable. Reopen normally once after upgrade to reconcile the saved state and remove old expiry metadata; old cards without action IDs still request an ordinary app open. The old ProofSkipRest intent remains as a compatibility entry point using the same guarded Continue mutation. Reset retains its deliberate fictional-data scope. The expired-rest installed-data case now has the limited preservation evidence below. Other migration cases and older-content decoding paths remain unverified on the phone.

### Local checks and limits

Passed on Windows: 29 tests executing production SQL through a separate JavaScript transaction/migration wrapper, TypeScript, iOS JavaScript/Hermes export (580 modules), and eight exact regenerated native source/resource copies. Tests cover early/exact-deadline/late Continue, repeated/stale IDs, reopen before/after acknowledgement, unchanged data/counts, final rest, v2 active/expired/skipped migration, migration rollback, and commit-failure retry. The wrappers do not execute Swift, App Intents, ActivityKit, or native rendering. Source preparation performed no cloud upload/build. The separately authorized Continue preview has now compiled/signed; no commit/push, dependency/identifier/signing change, or production framework choice.

### Continue preview — native build Passed

Exactly one [Continue preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/41621efa-1d34-4af1-8860-804b7eb01b5d) FINISHED at 2026-11-13T00:42:03.868Z (November 12 local). Xcode ARCHIVE SUCCEEDED, zero compiler errors, and an IPA was produced. No review blocker or source correction. Fresh archive: 15 intended files and lockfile with matching local hashes; no credentials/signing/device/private/unrelated files. Seven source files differ from D1: App.tsx and native ProofActivity, ProofCoordinator, ProofIntents, ProofSQL, ProofStore, ProofWidget. The other eight upload files match D1. Base ff627edc17102ad9fe50992a421a8ca5303fc42d plus uncommitted work, identified by a separate source hash manifest. Existing frozen signing/project/phone reused. Free usage 7/15 before, 8/15 after, zero overage. No retry, commit, or push. Both targets remain 1.0.0 (1); native compilation does not verify runtime migration/interaction/layout.

### Continue device results — migrated-record sequence, 2026-11-12

**Passed — user-reported for this bounded sequence on build 41621efa-1d34-4af1-8860-804b7eb01b5d.** App-state evidence is screenshot-supported as described by the user; no new image files were supplied or independently inspected in this documentation task. Lock Screen interactions and installed build identity are user-reported, not independently observed or instrumented. This continued an existing migrated Set 1 record; it was **not a fresh three-set trial**.

| Step | Screenshot-supported app state, as supplied | User-reported interaction / bounded result |
| --- | --- | --- |
| Upgrade of an expired, unacknowledged rest | Before/after preserve Set 1 actual **135 lb × 10**, Set 2 draft **50 × 8**, Set 3 draft **45 × 10**, all plans, **one saved record / one completion request**, and expired deadline **1794515816.494715**. | Preservation Passed for these displayed values and this installed expired-rest case only. This does not establish every migration path or a new completion of Set 1 in this build. |
| Continue on that migrated expired rest | Reopened app shows **Expired**, **dismissed**, saved acknowledgement, unchanged drafts/deadline and counts **1/1**. | Continue promptly revealed Set 2 while the authenticated Lock Screen remained visible — Passed — user-reported. Expired rest was not marked skipped; acknowledgement survived the reported reopen. |
| Set 2 completion and early Continue | Set 2 completed at **50 × 8**; described screenshot shows **Skipped**, **dismissed**, counts **2/2**. | Continue before zero revealed the existing Set 3 draft **45 × 10** — Passed — user-reported. Counts are consistent with two actual completions and no extra completion from Continue in this sequence. |
| Set 3 completion and final expired Continue | Set 3 completed at **45 × 10**. Final screenshot shows **Planned sets recorded**, **three actual records / three requests**, **Expired**, **dismissed**, and a saved Continue timestamp. | User confirmed the guided final expiry/Continue sequence worked — Passed — user-reported. The reported end state has no fourth set or automatic exercise finish; no independent internal-state trace is claimed. |

The final actual values are the retained 135 × 10 plus newly completed 50 × 8 and 45 × 10; the original plans remain separate. The exact preserved deadline above belongs to the migrated Set 1 rest, not to the later Set 2/3 intervals. No exact later deadlines or Continue timestamps were supplied, so none are invented. Native compilation/signing was verified in the earlier build task; these are later device reports, not a fresh native test run here.

**Remaining checks after the later fresh-fixture report below — Not run:** duplicate/stale Continue on the device (including against a newer rest); current-build duplicate-Complete regression; active-rest/skipped-rest/other legacy migration cases; force-quit and confirmed system termination; save-failure/retry on the phone; a dedicated layout-fit/accessibility sweep and repeated Show Live Activity/republication recovery. The observed ordinary reopen does not establish those cases. Countdown pauses/jumps remain unresolved (TS-002); delayed automatic reveal stays deferred (TS-001). Neither issue is fixed by this report.

### Continue fresh-fixture regression — 2026-11-12

**Passed — user-reported** on build **41621efa-1d34-4af1-8860-804b7eb01b5d**, after the user reset the fictional fixture. This is a separate trial from the earlier migrated-record sequence; it does not replace that evidence or test migration again.

- Saved actual sets: **40 lb × 8**, **50 lb × 8**, **45 lb × 10**.
- Final screenshot, as described by the user: **three records**, **three completion requests**, **Planned sets recorded**, rest **Expired**, rest screen **Dismissed**, and a saved Continue timestamp. No exact timestamp was supplied.
- The user confirmed prompt Continue behavior both **before and after zero**, with required actions staying on the **authenticated visible Lock Screen**. These interactions are user-reported; the screenshot supports the final app state, not the unseen timing or foreground transitions.

No new screenshot was independently inspected and no phone interaction was independently observed in this task. This was the supplied default-value sequence, **not** the previously proposed Set 1 at 40 × 9 / duplicate-Complete variant. Three requests for three records does not demonstrate duplicate or stale request handling. No additional reopen, force-quit, system-termination, migration, or layout/accessibility pass is inferred. The prior native compilation/signing pass remains separate from this device report.

### Remaining Continue checks — Not run

- Duplicate/stale Continue on the phone, including a request from an earlier rest targeting a newer rest. Ordinary taps on the newly rendered card do not reproduce a stale action.
- Current-build +1 / duplicate-Complete regression, with before/after actuals, request counts and rest deadlines. The fresh default-value trial above did not exercise this variant.
- Other installed-data migration cases (active, previously skipped, other legacy states), save-failure/retry, force-quit and confirmed system termination.
- Dedicated layout/accessibility sweep and repeated Show Live Activity/republication recovery. Prior ordinary-reopen evidence stays attached to the migrated-record sequence, not inferred anew here.

TS-001 delayed automatic reveal and TS-002 countdown pauses/jumps remain open/deferred. Continue is the adopted interaction, not a fix for either issue. Production framework remains open. The checkpoint is now published at 92da1c915ff702941fcc8b00003dd3f0caf2933e. The separate saved-feedback checkpoint has now compiled and has bounded reported device evidence; its reviewed publication scope is in HANDOFF.

## Earlier proof and diagnostic record

The following records and protocols describe prior builds; the current Continue implementation above supersedes their source descriptions.

An isolated Expo SDK 57 / native Swift proof for three planned sets of one fictional exercise. Source remains uncommitted over published baseline `ff627edc17102ad9fe50992a421a8ca5303fc42d`. Earlier three-set preview `f8955622-dd9c-4e10-8eac-39c120a55890` compiled/signed successfully and has limited reported device evidence below. The subsequent timer-only rest UI has compiled/signed in [timer-only preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/f55d4dff-e9ef-475d-ad7e-9f501a7e65db); the user now reports failed automatic expiry and limited successful Skip reveals. The smaller guard-free comparison compiled/signed successfully in [isStale comparison preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/9510b48e-aea0-4f67-b724-6e46ff4ee9ae); later comparison observations are **automatic reveal observed, unacceptable delay — user-reported**. Final-set behavior, saved values/counts, and upgrade preservation remain unverified. Production framework remains open. No routine editor, RIR, Add Set, Finish Exercise, or additional exercises.

<a id="d1-temporary-diagnostic--prepared-locally-not-run-on-device"></a>

## D1 temporary diagnostic — native build Passed, partial reported evidence

This later diagnostic adds observation only to the comparison source. Exactly one [D1 preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/22e675fd-8642-4faf-88d5-aa254129f6c5) **FINISHED** at 2026-11-12T19:49:11.946Z. Native compilation and signing **Passed**: Xcode reports ARCHIVE SUCCEEDED, zero compiler errors, and an IPA is available. D1 now has partial user-reported device evidence in the [current assessment](../../docs/HANDOFF.md#d1-evidence-and-assessment--2026-11-12): card/panel ID 1E9DB281 matches, published/carried deadlines agree, and the described card shows stale:T, CTRL, Set 2/3, 50 lb × 8, one displayed record. Automatic reveal took approximately 1–2 minutes by user estimate. No recording establishes exact transitions; this is not a fresh database read. Upgrade preservation, fit, and broader trials remain unverified. Earlier 9510 automatic reveals remain user-reported and unacceptably delayed; no cause or fix is claimed. Production framework remains undecided.

- **Lock Screen:** a compact header shows `D1 · stale: T/F` from raw context.isStale directly, outside the existing layout conditions, plus an eight-character publication ID. Literal `REST`, `CTRL`, `DONE`, or `OLD` labels appear inside the branch actually rendered. REST still has countdown/Skip; CTRL has existing weight/rep/Complete controls. Header font is caption2, draft spacing is reduced from 6 to 4 points, and existing 44-point control targets/14-point margins remain. Actual fit and accessibility sizes need a device check. The Dynamic Island is unchanged.
- **Publication metadata:** optional ID/time fields preserve decoding of older cards. Each existing request/update gets a new short ID and submission time immediately before the call, without changing its outgoing staleDate or relevanceScore. The time is not an acknowledgement, first-display time, or internal stale-event timestamp. Diagnostic fields are excluded from the foreground comparison, so unchanged polling does not republish merely because diagnostics differ. No new update, expiry callback, or polling path was added. Older content can show unknown until the next ordinary publication.
- **App:** the banner says `D1 — temporary rest-expiry diagnostic`. The manual **Read publication diagnostics** button reads current ActivityKit content through a separate native method. It shows ID, submission time, actual published staleDate, the saved rest deadline carried in that publication, set number, and save-failure flag. Times are UTC ISO strings plus epoch seconds with milliseconds. None/unavailable is explicit. This method takes the existing coordinator gate, but does not access ProofStore, repair metadata, or publish. The returned value crosses the actor boundary as a Sendable struct and is converted to a bridge dictionary afterward.
- **Readout limits:** the panel is a manual snapshot, not a continuously updated monitor or fresh database verification. It stays unchanged until read again, including across reset. The ordinary app read/foreground repair still exists and can change publication ID on reopening; compare only the ID filmed on the Lock Screen with the panel's ID. Old active cards may have no D1 metadata. No local log file, database schema change, widget-side write, background observer, server, push, timer, or dependency was added.

**Review/build evidence:** no blocking source issue or review correction. Raw flag, publication ID, and literal selected-branch labels share one rendered context. Metadata inspection neither reads workout storage nor publishes. Optional fields preserve older activity decoding; foreground equality ignores diagnostic fields. Store/SQL/intents, expiry selection, bounded timer, drafts/deadlines, migration, and action protections are unchanged from the previous comparison. Relative to 9510, only App.tsx, modules/LockScreenProofModule.swift, native/ProofActivity.swift, native/ProofCoordinator.swift, and native/ProofWidget.swift differ. Base is ff627edc17102ad9fe50992a421a8ca5303fc42d plus the existing uncommitted work; EAS No VCS does not record that Git base automatically. Fresh archive: exactly 15 allowlisted source/configuration/lockfile files, all local SHA-256 hashes matched, sensitive/unrelated files excluded. Nineteen SQL-wrapper tests and TypeScript Passed; eight previously regenerated native copies and the inline module match. SQL tests use production statements via a separate JS wrapper, not Swift execution. Both existing active/unexpired ad hoc profiles include the same registered phone; credentials were frozen. EAS Free usage was 6/15 before and 7/15 after, zero overage. No retry, source correction, commit, or push. Both targets remain 1.0.0 (1); confirm D1 rather than relying on version alone.

<a id="d1-filmed-test--all-checks-not-run"></a>

### Original D1 filmed protocol — retained for context

The matching-publication snapshot and approximate delay are now reported above. No recording establishes the original timed sequence below. **This is no longer the recommended next task**; do not repeat D1. The [current handoff](../../docs/HANDOFF.md#next-task--user-decision-no-implementation-yet) records Continue and its publication checkpoint; the earlier visible-controls recommendation was not adopted.

1. Capture current saved values, record/request counts, drafts, and rest state/deadline before upgrading. Install the [D1 preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/22e675fd-8642-4faf-88d5-aa254129f6c5) over the existing app without deleting/resetting; close/reopen and compare. Confirm the app's D1 banner. Use the existing ordinary Start/Show Live Activity path before the trial; do not add a refresh solely at expiry. Preserve data before any deliberate fresh fixture reset.
2. Complete one set and keep the authenticated Lock Screen visibly untouched. Record the `#publication` ID, REST label, and raw stale flag. If possible, film with another device and an external elapsed-time reference.
3. Capture separately: first visible 0:00, first F→T change, and first REST→CTRL (or final DONE) change. Wait through eventual return, recording at least the duration of the earlier reported 1:40 delay when practical. If the screen sleeps, record that event; waking is not evidence of an untouched transition. Record countdown pauses/jumps on their own timeline.
4. Note whether the publication ID changes during the untouched interval. If it changes, a new publication occurred; do not attribute the reveal solely to staleness of the original publication. No tap is required by the adopted behavior.
5. Only after filming, reopen deliberately and tap **Read publication diagnostics**. Capture the times, ID, and original app saved values/counts. Compare deadline versus staleDate for the matching filmed publication. If IDs differ, label the correlation unavailable rather than treating the new tuple as the old one. Reopening can repair metadata and must not be counted as automatic reveal.
6. Interpret cautiously: a timely raw STALE flag with late controls suggests branch/layout investigation; correct matching dates with both flag and layout late suggests delayed system-context presentation upstream of showsRest. The marker itself depends on rendering and cannot independently timestamp the OS's internal state change. Diagnostic layout/metadata may perturb rendering. Final-set behavior, saved counts/values, migration, and upgrade preservation require their own observations; no new result is inferred.

## Current three-set proof — prepared locally

Latest existing-build evidence: ordinary active-rest background/resume **Passed — user-reported**. Remaining time stayed accurate and saved values/counts were unchanged. This does not pass force-quit, system termination, upgrades, or any three-set check.

| Set | Independent planned default |
| --- | --- |
| 1 | 40 lb × 8 reps |
| 2 | 50 lb × 8 reps |
| 3 | 45 lb × 10 reps |

Each completion freezes that set's actual values and starts a saved 20-second rest interval in the same transaction. The next draft is prepared immediately from its own plan, but the Lock Screen hides it during rest. **Historical pre-Continue implementation:** timer-only rest superseded showing/editing the next draft during rest. The newer adopted Continue requirement is stated above; this paragraph describes the superseded pre-Continue source. Only countdown and Skip rest are shown; pounds, reps, adjustment controls, Complete, and final summary are hidden. After Skip or system-driven expiry presentation, show the already-saved current draft and its controls. Do not reload defaults on transition. Existing draft edits, plans, completed values, and deadlines are preserved. In-app diagnostic rows remain available for deliberate inspection.

**Fixture settings only:** weight buttons change by 5 lb, clamped to 0–200 lb; rep buttons change by 1, clamped to 0–30. Native SQL accepts only these deltas. These limits are deliberately small fictional-proof settings, not adopted production increments, validation rules, assisted-exercise rules, or blank/RIR behavior. Those production decisions remain open.

### Identity, rest gate, and saving

All new card actions carry explicit session, target-set, and active-rest IDs (`none` before any rest). The live current set ID belongs to mutable content state; immutable ActivityAttributes retain their older set field only for decoding compatibility. The coordinator finds the session's activity and publishes the new current draft only after SQLite commit. Completed rows retain their exact actual values; planned values are separate columns, not overwritten guesses for the next set.

Complete still checks the first unfinished set, actual active-rest ID, and saved deadline at execution after obtaining the write lock. Native early-completion rejection remains even though the new card hides Complete during rest. Skip marks only the identified interval, never completes or advances a set, and commits before revealing the draft. Old Complete cannot save the next set and old Skip cannot cancel later rest. Diagnostic counters may increase for rejected requests addressed to an existing set; actual records/deadlines stay unchanged. Storage still preserves earlier draft edits; the new Lock Screen no longer offers editing while resting.

After set 3 the Lock Screen remains timer-only until the final rest is skipped or expires, then shows **Planned sets recorded**. There is no fourth set or automatic exercise-finished flag. The app may show the recorded-count summary while rest runs; this change targets the Lock Screen. Save failure retains saved state; a failed Skip displays Retry Skip rest and preserves the expiry presentation date. Add Set and Finish Exercise remain later tasks.

### Automatic expiry assessment — official evidence and limits

Historical assessment of the earlier automatic-return requirement. Continue now supersedes that release requirement; the investigation and original protocols below are deferred context, not the next task. See the adopted decision at the top.

Apple defines [staleDate](https://developer.apple.com/documentation/activitykit/activitycontent/staledate) as the time content becomes stale and [isStale](https://developer.apple.com/documentation/widgetkit/activityviewcontext/isstale) as its view-context flag. Apple's [ActivityKit guide](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities#Configure-the-Live-Activity) describes their transition, and [WWDC23](https://developer.apple.com/videos/play/wwdc2023/10185/?time=940) explicitly describes system rendering of the alternate stale view. This establishes a supported mechanism beyond timer text changing. It is not a measured exact-time guarantee on this phone.

The coordinator attaches the saved, unskipped rest deadline as staleDate on every activity publication, including a failed-save publication; Skip clears it only after successful saving. The candidate widget shows rest while an unskipped deadline exists and context.isStale is false. The former extra wall-clock veto has been removed for the focused comparison described below; isStale selects the saved draft/final summary without assuming view evaluation occurs at presentation time. Every successful publication pairs the current rest identity/state with its own deadline under the coordinator gate. A past deadline stays attached when republishing expired rest. The same phase is used in the Dynamic Island. None of this writes at expiry, reseeds defaults, or changes storage gating.

Upgrade detail: the previous build published cards with no staleDate. The ordinary foreground read now serializes with mutations and resyncs state/staleDate from the saved snapshot only when different, including an already-expired/final card. It does not reset data or republish unchanged content on each foreground poll. Open/reopen normally for upgrade comparison before a new trial. This initial resync is not the natural-expiry mechanism: the untouched expiry test must succeed with no app opening or tap after Complete.

No JavaScript/native background timer, Task.sleep, delayed task, TimelineView schedule, push service, or exact-zero callback was added. The current candidate removes the Date.now comparison from view selection; system staleness remains the expiry mechanism. Timer text reaching zero alone does not prove a different branch renders. The mechanism is documented; automatic-switch latency/reliability, Always-On/sleep behavior, and failed-Skip behavior require the bounded device check below. If the transition is missing or delayed, record it before adding infrastructure. A deliberate Resume tap would be an alternative requiring a separate decision, not a pass of the adopted no-extra-tap requirement.

### Delayed comparison results and timing assessment — 2026-11-12

**Automatic reveal observed, unacceptable delay — user-reported** for comparison build 9510b48e-aea0-4f67-b724-6e46ff4ee9ae. First untouched expiry revealed controls roughly 1–2 minutes after zero. A subsequent rest hid controls throughout its countdown, then revealed them 1 minute 40 seconds after zero, timed by the user. This later observation does not erase the earlier absence at the initial observation point. Countdown pauses/jumps remain unresolved. No final-set, saved-values/counts, or upgrade-preservation result is inferred.

The timings and installed build attribution are user-reported, not independently instrumented. Native compilation/signing remains Passed for this build. Timely automatic reveal is not accepted. Do not infer a general 100-second delay or a two-minute system policy from the reported interval, or retrospectively change the f55 trial's initial result.

**Documentation versus observation:** Apple's [staleDate reference](https://developer.apple.com/documentation/activitykit/activitycontent/staledate) and [ActivityKit guide](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities#Configure-the-Live-Activity) describe the activity becoming stale and isStale becoming true at the configured date. Apple's [stale-view example](https://developer.apple.com/videos/play/wwdc2023/10185/?time=940) supports choosing an alternate presentation. The reviewed documents do not specify a maximum latency from that date to visible replacement of interactive controls or a real-time rendering guarantee. The observed 60–120-second delays do not meet this workout interaction. The mechanism is supported, but it is not established as suitable for prompt rest-to-controls switching. This is not a claim that Apple documents or intentionally imposes the observed delay.

**Source assessment:** all 15 current source/lockfile hashes match the comparison upload manifest. Complete samples epoch seconds after the write lock, saves now + 20 seconds and the new rest ID atomically, and publishes that same deadline as staleDate. Timer Text ends at that deadline; its start is deadline minus 20. Date conversion uses timeIntervalSince1970, with no millisecond conversion or 100-second offset. The widget branch is only deadline-present AND no saved Skip AND NOT isStale; the Date.now condition is absent. No scheduled delay, expiry callback, or app-controlled background timer exists. The existing JavaScript interval only reads while the app is active. No source defect explaining this delay was identified. Removing the old clock condition did not establish acceptable timing, so it cannot be treated as a proven cause/fix. Late system state delivery/rendering is consistent with the report, but not diagnosed. Timer Text updates and stored-deadline accuracy remain separate from whole-card presentation; there is no new evidence of changed database deadlines or a cause in battery, network, or display settings.

**Original diagnostic proposal (now implemented as the D1 variant above):** add a temporary, compact proof-only readout outside showsRest and both layout branches: a direct `context.isStale ? "STALE" : "FRESH"` marker, independent selected-branch label, current set/rest correlation suffix, and the content deadline. At the existing publication point, record only a bounded local diagnostic tuple of fictional rest ID, snapshot deadline, outgoing staleDate, and publication time, without altering the database or issuing another activity update. Do not write from the widget view builder. Film one untouched rest with another device through zero and eventual reveal, then inspect the tuple afterward. Preserve current stored data; no reset is required just to inspect it. The diagnostic temporarily adds proof-only metadata, not an adopted production UI.

| Observation in the proposed diagnostic | What it separates |
| --- | --- |
| Outgoing staleDate differs from the saved/current content deadline or rest | Investigate our snapshot/publication path first. |
| Correct matching deadline; direct STALE marker changes promptly but controls remain hidden | Investigate our branch/layout selection or stale content identity. |
| Correct matching deadline; direct marker and controls both change late | Delay lies upstream of the helper in system-context delivery/presentation; not evidence of a helper wall-clock veto. |
| Marker is stale from the start of a newer rest | Investigate update identity and stale-state reset; native action gates must remain intact. |

A visible marker measures presented context, not the exact internal ActivityState transition time. Apple exposes [activityStateUpdates](https://developer.apple.com/documentation/activitykit/activity/activitystateupdates-swift.property), but an app observer may be suspended; its receipt timestamp alone is not an authoritative system transition timestamp. Do not add a background observer/polling loop to make this test work. If the marker and controls are both late, a later system-log investigation may be needed to separate internal state change from display delivery. Reopening can trigger existing foreground repair, so capture the untouched video first. No diagnostic implementation or device trial occurred in the earlier delay investigation. D1 has now compiled/signed and received the partial user-reported evidence above; no exact transition recording, fresh database verification, upgrade preservation, or fit pass follows.

**Supported alternatives — proposals only:**

| Approach | Benefit and tradeoff |
| --- | --- |
| Keep native intent controls visible alongside the system timer and enforce readiness in SQLite | Uses documented [Live Activity buttons/App Intents](https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities); removes the dependency on a precisely timed reveal. Changes the adopted timer-only presentation and needs an explicit product decision; not adopted here. |
| Explicit Resume/refresh action after rest | An intent can publish the current saved state; no server needed. Requires a tap and therefore fails the adopted automatic-reveal requirement unless the user changes it. Existing Skip is not silently relabeled as this alternative. |
| Remote ActivityKit update | [Apple supports push updates](https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications), but requires server/token infrastructure, network delivery, and update budgets; no hard visible-deadline bound was found. Excluded from this task and not recommended as a speculative fix. |

The documented dynamic Text timer is useful passive output, not a supported schedule for arbitrary interactive view replacement. Ordinary widget timelines, delayed tasks, earlier guessed stale dates, or foreground-app timers have not been established as a compliant solution for this Live Activity. The visible-Lock-Screen requirement remains unchanged. Continue now supersedes the no-extra-tap requirement: prepare the explicit action while keeping the rest card focused on countdown/Continue. The stale-state gate is not suitable for prompt reveal in this proof; investigation is deferred and the diagnostic should not be repeated now.

### Timer-only device investigation — 2026-11-12

For build f55d4dff-e9ef-475d-ad7e-9f501a7e65db, automatic reveal at expiry **Failed — user-reported**: the described screenshot shows 0:00 and Skip rest with no next-set controls. Countdown pauses/jumps are reported and remain unexplained. Skip during active rest and Skip at displayed 0:00 each revealed expected controls: **Passed — user-reported, UI reveal only**. These results do not verify saved-record counts, draft preservation, final-set behavior, or exact stored-deadline accuracy.

The user attributes these trials to the installed f55 build; neither its installed identity nor the screenshot was independently inspected in this task. The prior native compilation/signing pass remains valid. Upgrade preservation for this build and remaining three-set trials are not passed.

**Verified source trace:** all 15 local upload-source hashes matched the recorded f55 archive manifest before this task's patch. Complete commits actuals, rest ID, and deadline together, then the coordinator publishes that same saved deadline as staleDate. Publications and foreground repair share the serial gate; repair only republishes mismatches. The bounded timer Text uses the same absolute deadline and a 20-second range. It does not decrement a database field or require JavaScript to tick.

**Separate mechanisms:** Apple documents live-updating Text values in [TimeDataSource](https://developer.apple.com/documentation/swiftui/timedatasource) and bounded countdown output in [SystemFormatStyle.Timer](https://developer.apple.com/documentation/swiftui/systemformatstyle/timer). These do not promise a regular visible frame every second or reevaluation of surrounding branches. The [dynamic-date guide](https://developer.apple.com/documentation/widgetkit/displaying-dynamic-dates) distinguishes system-updated text from extension execution. Whole-card expiry instead depends on the staleDate/isStale path documented above. The stored deadline and native execution-time gate are a third layer; a paused/jumping display neither proves nor disproves a changed deadline. No evidence identifies low battery, network latency, or display settings as the cause.

**Guard hypothesis, not diagnosis:** f55 renders rest when `!context.isStale || deadline > Date.now`. If the stale branch is evaluated just before the deadline (or prepared earlier), the second condition still selects rest. That comparison requests no later render, so it could mask the stale presentation even as independently updating timer text reaches zero. We have no device trace of isStale/evaluation time and Apple does not specify the exact evaluation schedule here. A missing/delayed system stale transition is also consistent with the observation. Do not claim either explanation is established or that the countdown pauses have the same cause.

**Skip trace:** active Skip can save skipped_at for the matching interval, then publish after commit. If the stored deadline has already passed, SQL Skip changes no row, but the coordinator still republishes current state with its past staleDate and an ignored-action notice. The wall-clock guard can then evaluate after the deadline. This explains why a manual tap could reveal controls without automatic switching or an actual Skip write. Displayed 0:00 alone does not establish whether the deadline had passed at execution. Neither reported Skip result establishes counters, saved drafts, or final-summary behavior.

**Prepared minimal candidate:** remove only the widget's `deadline > Date.now` branch and use the supplied isStale phase for the current content, as in Apple's stale-view pattern. Keep deadline existence and saved-Skip checks. Timer rendering, coordinator publication/repair, SQL, atomic saves, drafts, migrations, and all action IDs/guards are unchanged. No background task/polling, server, push infrastructure, or dependency added. This removes one unsupported wall-clock veto from the documented transition; it is a comparison patch, not a verified fix. It also removes the earlier defensive presentation check: successive rests must be tested for early controls, while native saved-deadline gating remains enforced. Old content actions still cannot mutate a later rest/set. The comparison now compiled/signed in [isStale comparison preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/9510b48e-aea0-4f67-b724-6e46ff4ee9ae); later automatic reveal was observed with unacceptable delay, user-reported; remaining comparison checks stay Not run.

**Historical diagnostic plan — superseded by the completed D1 evidence task:** the earlier next task was to prepare the bounded independent staleness/branch diagnostic above. It has now been implemented/built and produced the matching-publication evidence recorded above. Do not repeat it; the [current next task](../../docs/HANDOFF.md#next-task--user-decision-no-implementation-yet) is preparing Continue. The original comparison protocol below remains a reference, not an unrun claim about the now-observed expiry. Preserve existing data before any upgrade. On a fresh interval, use an external stopwatch/video if available so the phone can remain visibly locked/authenticated and untouched. Note Complete time, pauses/jumps, first 0:00, and first automatic draft reveal; observe at least 10 seconds beyond zero before any deliberate interaction. If the display sleeps, record that separately, not as an untouched-transition pass. Then reopen deliberately to capture saved deadline/rest state, draft values, and record/request counts. Reopening can repair activity metadata, so it cannot retrospectively prove the untouched transition. Use a separate active-Skip trial and a separate zero-Skip trial with before/after saved fields; test a later rest after the prior stale phase and final-rest summary separately. Do not reset merely to diagnose existing data. At that earlier investigation, the proposed follow-up if the guard-free candidate failed was a tiny read-only phase/deadline diagnostic; this historical proposal became D1 and is no longer an instruction to create another variant. No such instrumentation was added in the investigation. The subsequent separately authorized comparison build is recorded below.

### Latest existing-build evidence — limited results

The user describes before/after screenshots through the latest upgrade showing **40 lb × 10**, **one saved record**, **two completion requests**, and **expired rest** preserved. This supports those visible fields only; the old exact deadline was not visible, so exact deadline preservation is **unverified**. Screenshots were not independently inspected in this task. Earlier upgrade attempts remain inconclusive; do not turn this limited comparison into a full migration/recovery pass.

- Next draft 50 lb × 8 appearing during rest: **Passed — user-reported** on the earlier three-set UI. That presentation is now superseded, not required for the timer-only card.
- Early Complete showed “Rest active—wait or skip” and left one saved record: **Passed — user-reported** for that attempt. The new UI hides that control during rest, while retaining the native guard.
- The newer timer-only results are recorded in the investigation above. Remaining three-set trials, final-rest automatic summary, and full three-record completion remain **Not run** unless separately reported. Snapshot counts may change with subsequent taps.

Apple documents [assigned intent parameters and background app-process interaction](https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities). The existing bounded native timer remains; render-time dates are not used to decide whether Complete is permitted. These documentation facts do not verify the new Swift code, compact fit, or phone behavior.

### Installed-record migration and recovery

The database filename is unchanged. A transaction upgrades `PRAGMA user_version` to 2, adds missing legacy rest columns if needed, creates versioned session/set/rest tables, and imports the old set with its original IDs, values, completion status, request count, and any existing deadline/skip. It seeds independent set-2/set-3 drafts. An already-completed old set receives no new rest if it had none. The legacy row remains intact as migration evidence, not a second displayed record. The import/version change is atomic and runs once; failed migration can retry.

New reads restore the first unfinished draft (or the final summary) and the saved active rest. Absolute deadlines preserve elapsed time without continuously running JavaScript. Each completed set retains its own rest identity/deadline. The in-app **Show Live Activity** action republishes the current IDs; an older decoded card is read-only until refreshed rather than guessing a new set. Start/resume in the app before locking for the new trial. No app-opening shortcut replaces the required interactions during a three-set trial.

Reset requires the existing confirmation. It deletes only fictional legacy/versioned rows and dismisses the proof activities. New identities make old actions harmless. Capture installed data before any later upgrade/reset. The latest screenshot comparison supports preservation of visible values/counts/expired state, not exact old deadline or all migration cases. The timer-only patch changes no schema or migration code.

### Three-set checks and limits

19 production-SQL wrapper checks and TypeScript pass again. They retain coverage for stored draft edits, independent defaults, gating, stale actions, three-record bounds, recovery, reset, rollback, and migration. The transaction/migration wrapper is JavaScript, not execution of Swift/ActivityKit. Generated source/configuration inspection passes. The earlier native build below does not compile or test the later timer-only patch. Native compilation/signing of the timer-only patch now Passed in [timer-only preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/f55d4dff-e9ef-475d-ad7e-9f501a7e65db); automatic expiry subsequently Failed — user-reported and the two Skip reveals passed only as UI observations. The newer guard-free comparison compiled/signed and now has user-reported delayed automatic reveals; no independent device verification or broader pass is inferred.

### isStale comparison preview — native build Passed

Exactly one [isStale comparison preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/9510b48e-aea0-4f67-b724-6e46ff4ee9ae) submitted and FINISHED. Xcode reports ARCHIVE SUCCEEDED with zero compiler errors; native compilation and signing Passed, and an IPA is available. No device success or causal diagnosis follows. f55's failed automatic reveal and limited Skip UI passes remain attached to f55; countdown cadence remains open.

Source base ff627edc17102ad9fe50992a421a8ca5303fc42d plus existing uncommitted three-set work. Only ProofWidget.swift differs from the f55 upload: the prepared removal of the wall-clock view condition. No source correction in this build task. Fresh archive: exactly 15 required source/configuration/lockfiles, all SHA-256 hashes matching local source, no credentials, device/signing files, dependencies, generated artifacts, tests/docs, or unrelated files. Free allowance before submission: 5/15 iOS used, zero overage; existing frozen signing reused. No automatic retry, paid overage, commit, or push. Both target versions remain 1.0.0 (1); version alone does not identify this build.

**Focused checklist — partial observations, remaining checks:**

Outcome update: **Automatic reveal observed, unacceptable delay — user-reported** for comparison build 9510b48e-aea0-4f67-b724-6e46ff4ee9ae. First untouched expiry revealed controls roughly 1–2 minutes after zero. A subsequent rest hid controls throughout its countdown, then revealed them 1 minute 40 seconds after zero, timed by the user. This later observation does not erase the earlier absence at the initial observation point. Countdown pauses/jumps remain unresolved. No final-set, saved-values/counts, or upgrade-preservation result is inferred.

1. Capture existing app actual/draft values, record/request counts, and rest state/deadline before upgrading. Install without deleting/resetting, close/reopen, and compare. A running rest may naturally expire; compare its saved deadline rather than identical seconds. Record preservation before a deliberate fresh fixture trial.
2. Fresh trial: complete Set 1 and leave the authenticated Lock Screen visible and untouched through expiry. Record whether next-draft controls return automatically and any delay; timer zero alone is not a pass. If it stays stuck, observe at least 10 seconds beyond zero before a separate deliberate interaction.
3. Complete Set 2. Confirm controls disappear for its entire rest, then return automatically. This checks for premature reveal from an earlier stale phase; native saved-deadline gating remains separate.
4. Complete Set 3. Confirm Planned sets recorded only after final rest, no fourth set, and no automatic exercise finish.
5. Reopen deliberately and inspect each actual saved value and record count (exactly three after a successful fresh full trial), plus plans, request counts, and rest state/deadline. This reopening may repair metadata and cannot establish the preceding untouched transition.
6. Record countdown pauses/jumps separately. If possible, film the phone with another device to capture timing without touching the tested screen. If it sleeps, record that separately. The reported delayed reveals and subsequent-rest hiding are recorded above; final-set behavior, actual values/counts, and upgrade preservation remain unverified. Diagnostic checks are Not run.

### Timer-only preview — native build Passed

Exactly one [timer-only preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/f55d4dff-e9ef-475d-ad7e-9f501a7e65db) FINISHED. Native compilation and signing Passed. Later automatic expiry Failed — user-reported; active-rest and zero-display Skip revealed controls, UI-only passes. Upgrade preservation, counts/draft preservation for these taps, and final summary remain unverified. The guard-free candidate is newer than this build.

Base commit ff627edc17102ad9fe50992a421a8ca5303fc42d plus the existing uncommitted three-set source. Only ProofCoordinator.swift and ProofWidget.swift differ from prior build f8955622-dd9c-4e10-8eac-39c120a55890. Review added only the current-deadline presentation safeguard; storage, drafts, SQL/migration, completed records, action guards, identifiers, dependencies, and signing configuration are unchanged. Fresh upload: exactly 15 required files/lockfile, all SHA-256 hashes matching local source, with no credentials, signing/device files, dependencies, generated artifacts, tests/docs, or unrelated files. Frozen existing credentials reused; Free allowance before submission was 4/15 iOS builds, zero overage. Xcode reports ARCHIVE SUCCEEDED with zero compiler errors. This proves native compilation/signing, not runtime timing or preservation. No retry, commit, or push.

### Three-set preview — native build Passed

Reviewed and recorded 2026-11-12: exactly one [three-set preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/f8955622-dd9c-4e10-8eac-39c120a55890) was submitted and monitored to **FINISHED**. Xcode reports `ARCHIVE SUCCEEDED`, zero compiler errors, and includes ProofStore.swift, ProofIntents.swift, and ProofWidget.swift. EAS produced an IPA. Native compilation and signing Passed; this does not execute the migration on the installed database or verify device behavior.

No blocking defect or source correction was identified in review. The fresh upload archive contained exactly 15 required files, including nested native/module/plugin sources and package-lock.json; all SHA-256 hashes matched local source. Source base is ff627edc17102ad9fe50992a421a8ca5303fc42d plus the prepared App.tsx and six native-source/resource changes. Tests and documentation were excluded. EAS No VCS mode does not attach a source commit; the independently checked base/file hashes identify the submitted source. Reused the existing project, phone, and valid frozen signing credentials. Before submission, EAS reported Free, 3/15 iOS builds used, and zero overage. No automatic retry, source edit, commit, push, or App Store submission. Both target versions remain 1.0.0 (1).

<a id="three-set-device-checklist--all-not-run"></a>

### Three-set checklist — partial timer-only results, remaining checks

1. **Before installation**, capture existing saved pounds/reps, record/request counts, rest state, deadline if shown, and any Skipped state. Use the successful [timer-only preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/f55d4dff-e9ef-475d-ad7e-9f501a7e65db) in Safari and install over the existing proof **without deleting or resetting**. The earlier f8955622-dd9c-4e10-8eac-39c120a55890 build does not contain this patch. Close and reopen, then compare the migrated old record under Set 1 and the total counts/rest. Set 2/3 appearing as independent drafts is expected; if the old set was completed, Set 2 is now the current draft. A running rest may naturally expire during installation: compare its preserved deadline and elapsed time, not identical remaining seconds. Record preservation before starting fresh tests; only then deliberately reset to the fresh fixture.
2. This expiry trial Failed — user-reported on f55; follow the focused investigation before a separately authorized candidate build. For the later comparison, complete one fresh set while the authenticated Lock Screen stays visible. Confirm only countdown and Skip rest remain. Make **no further tap** and do not open the app. Observe past the 20-second deadline: the saved next draft (default 50 × 8 if unedited) and its controls must appear automatically. Record transition latency. A timer displaying zero while the rest-only layout stays stuck does not pass. If the screen goes dark, record that case separately; waking/tapping is not evidence of an untouched visible transition.
3. Only UI reveal has passed — user-reported for active-rest and zero-display Skip; the following persistence checks remain unverified. Use a separate fresh rest interval for Skip: it must durably stop rest and automatically reveal the existing next draft without another tap/app opening. Any draft edits carried into this upgrade must survive hide/reveal; compare with captured in-app draft values. Editing during rest is no longer offered on the Lock Screen. Do not reset merely to check draft preservation.
4. Only after rest ends, edit set 2 to chosen actual values, complete it, and check timer-only rest again. Wait for natural expiry to reveal set 3 at its own stored defaults (45 × 10 unless already edited). Native early/stale gates remain SQL-tested; use delayed/duplicate taps only where reproducible and record the visible action/target. Do not intentionally tap a newly eligible next set and call it an old duplicate.
5. Finish the third planned record. **During its rest**, still show only countdown and Skip, with no next draft/Complete/final summary. After Skip or untouched natural expiry, automatically show **Planned sets recorded**, no fourth set, and no automatic exercise finish. Then reopen to verify exactly three separate actual records with unchanged plans and preserved values/deadlines. These full-trial checks remain Not run.
6. Verify hidden controls cannot be reached during rest (including accessibility), visible controls fit after rest, and required actions never open the foreground app. Test failed Skip only if safely reproducible: it must not claim success, must remain retryable, and must still reveal the draft at natural expiry. Separately compare Always-On/reduced-luminance and sleep/wake cases; none is passed by a normal countdown or the earlier evidence. If system-driven switching fails, stop for a focused diagnosis before any new infrastructure.

## Historical one-set implementation and build evidence

The following earlier implementation descriptions and reports cover the published one-set/rest milestones. They are retained for context; their test counts and native/device passes are not evidence for the current three-set source.

## How the proof saves

- The Expo screen starts the draft and requests the Live Activity through a Swift module. The widget extension renders the card and supplies the session and set IDs to its App Intents.
- Apple documents that a `LiveActivityIntent` runs in the containing app’s process. The proof requests background execution and local device authentication. The intents and the in-app screen use SQLite in the app’s Application Support directory. The widget never opens the database, so no App Group, shared-container entitlement, JavaScript listener, or ActivityKit push credential is needed.
- **+1 rep** edits only an unfinished set. **Complete set** updates the same row in a transaction; a second request only increments the test counter. SQLite commits before the Live Activity shows the result. A failed save displays a retry message instead of a new success state. A late +1 is ignored even if iOS invokes it from an older card.
- The screen reads the stored row on launch and on return to the foreground. **Reset proof data** deletes the fictional row and dismisses the card. A newly started set gets fresh IDs, so delayed actions from the old card cannot change it.

## Local checks on Windows

From this directory:

```powershell
npm.cmd ci
npm.cmd test
npm.cmd run typecheck
npm.cmd exec -- expo install --check
npm.cmd exec -- expo export --platform ios --output-dir dist
```

Use Node 24 for the included SQLite test. The test runs the same SQL that ships with the Swift store against file-backed SQLite, but its open/read/write and transaction wrapper are a separate JavaScript implementation. It does not execute ProofStore.swift, the coordinator's serialization, App Intents, or ActivityKit. Passing these tests validates the SQL behavior, not the native integration. Standard Expo iOS prebuild skips Windows; an inspection fixture made with the installed SDK template and Expo's configuration steps can check project wiring but does not compile the extension.

## Later: sign, build, and install on the iPhone

The reported iPhone 15 Pro is on iOS 26.6.1 (23G83) with working Face ID. Apple’s [iOS 26 releases](https://support.apple.com/en-us/123075) and [published iPhone 15 Pro restore filename](https://updates.cdn-apple.com/2026SummerFCS/fullrestores/140-73047/45AC73E2-4D2D-44B5-8E43-440C19C7DF74/iPhone16,1_26.6.1_23G83_Restore.ipsw) corroborate the version and build pairing. The restore file is a large download and is not needed. The app and extension target iOS 26.0, the minimum for the explicit [background intent mode](https://developer.apple.com/documentation/appintents/intentmodes/background). The preview uses Expo’s [SDK 57 hosted image](https://docs.expo.dev/build-reference/infrastructure/), which lists Xcode 26.6. None of this confirms operation on the physical phone.

Expo login, project linking, and local archive inspection require the Expo account. Apple Developer activation is needed later for provisioning and signing the ad hoc device build, not for these source-preparation steps. Apple provisioning access and preview signing were verified on 2026-11-11; see the [current handoff](../../docs/HANDOFF.md) for the verified Expo link and archive result. The Expo Free route is subject to its [current build allowance](https://expo.dev/pricing).

```powershell
Set-Location D:\SwoldierApp\proofs\lock-screen
$env:EAS_NO_VCS = '1'
$env:EAS_PROJECT_ROOT = (Get-Location).Path
npx.cmd eas-cli@latest login
npx.cmd eas-cli@latest init
```

Link only the proof to your Expo account. If EAS cannot write the dynamic app config, add the public project UUID it prints as `extra.eas.projectId` in `app.config.js`, next to `build`. The default app identifier is `com.fgzmac.swoldier.lockproof`; the extension appends `.LiveActivity`. If these IDs are unavailable to your team, change the default app identifier in `app.config.js` before signing so both IDs stay consistent on Windows and in the cloud.

```powershell
$archive = Join-Path $env:TEMP ('swoldier-proof-archive-' + [guid]::NewGuid())
npx.cmd eas-cli@latest build:inspect --platform ios --profile preview --stage archive --output $archive
```

Inspect the local archive before any upload. Check that the module, native Swift, and plugin folders are present; a successful archive command alone does not establish that all source was included. It should contain this proof’s source and lockfile, without credentials, a device UDID, or other repository files. The proof’s [upload ignore rules](https://docs.expo.dev/build-reference/easignore/) are scoped to this directory by the two environment variables above.

After Apple Developer activation, separately authorize device registration and signing setup. Register the phone with the following command, open the registration link in Safari on that iPhone, and follow its steps:

```powershell
npx.cmd eas-cli@latest device:create
```

When you explicitly approve uploading and building the proof:

```powershell
npx.cmd eas-cli@latest build --platform ios --profile preview
```

Use the enrolled Apple team when prompted. Allow EAS to create or reuse a distribution certificate and create ad hoc provisioning profiles for both the app and its WidgetKit extension; confirm that the iPhone is included. Keep those credentials and device identifiers out of Git. Open the resulting EAS installation URL in Safari on that iPhone and tap **Install**. Enable [Developer Mode](https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device) if prompted, and allow Live Activities for the app. See [Expo internal distribution](https://docs.expo.dev/build/internal-distribution/) and [iOS extension signing](https://docs.expo.dev/build-reference/app-extensions/). This standalone preview does not require a Metro server.

## Device result — Passed, user-reported

On 2026-11-11, the user reported installation and the guided one-set test passed on EAS build `2a692799-0280-4f0c-b7f7-1f65b65c1149`. Face ID authenticated while the Lock Screen stayed visible; +1 rep and both Complete taps did not open the foreground app. Deliberately reopening showed 40 lb × 9 reps, one saved record, and two received completion requests. This is user-reported evidence, not independent observation. Only this sequence is marked passed.

The tested sequence was: start 40 lb × 8 reps → authenticate with Face ID while the Lock Screen stays visible → +1 rep once → Complete twice → deliberately reopen to inspect the record and request count. Production framework selection remains open.

### Other device trials — Not run

- Rapid-tap stress testing beyond the guided two Complete taps.
- Post-completion +1 rejection, interrupted execution, system termination, and user force-quit recovery. The limited relaunch observation below does not pass these lifecycle trials.
- Reset/restart and stale actions after reset.
- Genuinely locked comparisons and accessory-widget trials.
- Other numeric controls, add-set, exercise advancement, and wider workouts. Rest/Skip functional results and the compact build's separate layout observations are recorded below.

<a id="rest-extension--local-source-prepared-device-checks-not-run"></a>

## Rest extension — partial user-reported device results

The published baseline is `73b277dee50af3286380084a49b3f071dd111b97`. Its original one-set result above remains user-reported for build `2a692799-0280-4f0c-b7f7-1f65b65c1149`; it does not establish that this new rest extension works on a phone.

First completion writes the set and a 20-second Unix-time rest deadline in the same SQLite transaction. Later Complete requests increment the existing request counter but preserve the deadline and any skip. Skip rest is a background LiveActivityIntent with local authentication; it saves a skip timestamp only if rest is still running and the session/set IDs match, then updates ActivityKit after commit. Repeated, stale, pre-completion, and expired Skip requests do not change state. Failed writes retain the last displayed saved state with a retry message.

The Lock Screen uses [Apple's bounded system timer format](https://developer.apple.com/documentation/swiftui/systemformatstyle/timer) with `Text(.currentDate, format: .timer(countingDownIn: start..<deadline))`. It counts down within the saved interval rather than using `Text(date, style: .timer)`, which [Apple documents as counting upward after the date passes](https://developer.apple.com/documentation/widgetkit/displaying-dynamic-dates). No JavaScript loop or exact-zero background callback is required. SQL derives expired state from the deadline when read; it does not wait for an expiry write. The app refreshes its native readout while foregrounded and reads saved state on reopening. Countdown start, no restart on duplicate Complete, and zero holding are now Passed — user-reported for the limited installed trial below.

### Installed database compatibility

The existing database filename, set identity, and original table schema remain. Column-presence checks add nullable `rest_deadline` and `rest_skipped_at` columns in a transaction, rechecking under the write lock. Repeated or partially completed migrations are safe to retry. Existing values and completion history are preserved. An already-completed legacy set does not receive a retroactive rest deadline, even after another Complete request. Use the deliberate fictional-data reset to start the new rest trial. Reset deletes the row including rest fields and ends the activity; new IDs reject delayed actions from an earlier session.

### Local verification and limits

Nine SQLite tests execute the production SQL and migration statements through a separate JavaScript transaction/migration wrapper. They cover overlapping completion, stable deadlines, expiry at and after zero, repeated Skip, Skip failure and retry, stale IDs, reset, legacy draft/completed data, and partial migration. These checks do not execute Swift, App Intents, or the native countdown renderer. TypeScript, local iOS JavaScript export, and generated native source/configuration inspection passed on Windows.

The earlier [rest preview build](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/d3568ab8-654b-49cf-a0ee-d43bfe91497f) finished **ERRORED**, `XCODE_BUILD_ERROR`. Earliest compiler error: generated extension `ios/SwoldierProofLiveActivity/ProofActivity.swift:8:27`, `cannot find type 'Date' in scope`. The only subsequent source corrections add `import Foundation` to `native/ProofActivity.swift` and `native/ProofCoordinator.swift`, both of which directly use Date.

Exactly one separately authorized [corrected preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/aec6ed60-6c49-4883-9f53-9f3513ae4333) was submitted in the following task and **FINISHED**. Native compilation and signing **passed**; the Xcode log reports `ARCHIVE SUCCEEDED` and contains neither the Date error nor the earlier ExpoModulesCore ambiguity. An IPA is available. Its inspected archive matched the 15 required files at submission, and the downloaded IPA later confirmed bundled Rest labels, rest SQL, and native rest symbols. These historical checks cover that build, not the subsequent compact layout patch. The installed build ID was not independently read from the phone.

### Latest device evidence — 2026-11-11

All observations here are for user-reported installed build `aec6ed60-6c49-4883-9f53-9f3513ae4333`, not independently observed. An earlier close/reopen revealed the Rest row with the existing 40 lb × 9 record, one saved record, and six requests unchanged. Later comparison taps may have changed the request count; do not use that earlier count as the next upgrade baseline. These observations do not establish the missing-interface cause or recover the original upgrade-preservation trial.

| Observation | Status and limit |
| --- | --- |
| Rest row after relaunch, same saved values/counts | Passed — user-reported for this relaunch only. |
| Rest starts on completion | Passed — user-reported. |
| Duplicate Complete does not restart rest | Passed — user-reported. |
| Countdown holds at zero | Passed — user-reported. |
| Skip stops rest while the authenticated Lock Screen stays visible | Passed — user-reported. |
| Skipped state remains saved after closing/reopening | Passed — user-reported. |
| Display comparison | No-tap screen went black within five seconds; a later duplicate-Complete comparison stayed visible. Original immediate blackout was not reproduced in that comparison. Cause unconfirmed; no fix claimed. |
| Title and bottom controls clipped; Skip and Complete visible at zero | Earlier rest-build layout issue. Draft/rest/zero/skipped layouts fit on the compact build — Passed — user-reported, as detailed below. |
| Original upgrade preserves pre-existing data | Inconclusive; an earlier reset may have occurred. The later relaunch observation is not an upgrade test. |

Only the named functional observations on the rest build and the separately reported compact-layout observations below are passed. Neither report establishes every functional trial was repeated on the compact build. A black screen is not evidence of either foreground navigation or activity dismissal; record those separately.

### Complete trace and black-screen comparison

The card's Complete button passes stable IDs to `ProofCompleteSet.perform()`. That LiveActivityIntent requests `.background` and `.requiresLocalDeviceAuthentication`, awaits the coordinator's serial mutation, commits SQLite (set and deadline together on first completion), then awaits `activity.update` on the existing matching activity. It returns `.result()` afterward. A save failure publishes the prior state with a retry message. Complete does not call `Activity.request`, `end`, reset, URL navigation, foreground continuation, or display-sleep APIs. Activity creation exists only in the in-app Start path; immediate dismissal only in explicit Reset. This is a source trace, not an observed runtime trace.

Apple documents [intent execution in the app process](https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities), [local authentication](https://developer.apple.com/documentation/appintents/intentauthenticationpolicy/requireslocaldeviceauthentication), and a separate optional [activity-update alert](https://developer.apple.com/documentation/activitykit/activity/update(_:alertconfiguration:)). The proof supplies no alert configuration. Background app-process execution does not by itself mean foreground navigation. Apple's [Always-On rendering guidance](https://developer.apple.com/documentation/activitykit/creating-custom-views-for-live-activities) and [display support guide](https://support.apple.com/guide/iphone/iph7117338a8/ios) describe dimming and system-managed screen-off conditions. These are possible comparison factors, not a diagnosis of this report. The reviewed guidance establishes no keep-awake guarantee for this proof; no keep-awake or alert workaround was added.

Comparison protocol on the already-completed fictional set, without reset or deleting data (partial user report above; not independently instrumented; authentication-during-action comparison C remains Not run):

1. Keep the phone upright, camera unobstructed, away from the side button, with the same lighting and settings. Note Always-On, Low Power Mode, and Focus settings without changing them. Use another camera if available to distinguish the entire display going dark from only the activity becoming black; note clock/wallpaper, padlock, time to darkness, and whether waking shows the same card or a foreground app.
2. A: wake, let Face ID authenticate (open padlock, Lock Screen still visible), then make no action for about 15 seconds. B: repeat the same wake/authentication, then tap Complete once on the existing completed set. Compare immediate blackout with baseline sleep timing. The B tap intentionally adds one request; it must not change the saved set or restart rest.
3. C: re-lock, verify a closed padlock, and tap Complete while allowing Face ID during the action. Compare with B, where authentication happened first. Record any system prompt or foreground transition. This compares authentication timing, not a release gate requiring a genuinely locked action.
4. Deliberately reopen after any further comparison and note values/counts/rest state. If darkness happens only with C, authentication/display transitions would become a stronger hypothesis; if with B and C but not A, the action path would need further investigation. The actual report is darkness within five seconds without tapping and no darkness in a later duplicate-Complete comparison. That does not reproduce the original immediate blackout or establish a cause. No instrumented process/display trace has been collected; no blackout fix is claimed.

### Compact layout patch — compiled, layout Passed — user-reported

Apple's [Live Activity specifications](https://developer.apple.com/design/human-interface-guidelines/live-activities#Specifications) give a Lock Screen height range of 84–160 points, and its Lock Screen guidance recommends 14-point margins. The previous completion state grew to separate title, values, status, countdown, Skip, and action rows. That makes excess height a plausible clipping explanation, not a measured native layout diagnosis.

The compact patch changes only `native/ProofWidget.swift`: three rows (title/status; values/rest; controls), 6-point row spacing, 14-point margins, single-line labels with limited scaling, 44-point-minimum button labels, and an emphasized monospaced bounded timer. Complete remains available for duplicate-request testing. Skip can remain at zero until a saved-state update: the unchanged store rejects expired Skip requests. No clock-based conditional, expiry callback, or view-refresh guarantee was added. Storage, deadlines, authentication, and Dynamic Island presentations remain unchanged.

Nine existing SQL-wrapper tests and TypeScript passed; regenerated ignored iOS configuration copied the exact widget source into the extension target only. These static/configuration checks neither compile Swift nor measure the rendered height. The reported compact-layout fit/reachability results below do not pass all accessibility sizes, contrast checks, or recovery trials. The earlier rest build's functional passes remain tied to that build.

Exactly one separately authorized [compact preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/cacac282-0ac2-43d5-9c66-70ebd3479ae6) was submitted and **FINISHED**. Native compilation and signing Passed: the Xcode log reports `ARCHIVE SUCCEEDED`, includes ProofWidget.swift, and contains zero compiler errors. The only source difference from installed rest build aec6ed60-6c49-4883-9f53-9f3513ae4333 is the prepared ProofWidget.swift layout; the other 14 upload files, storage, timer calculation, native intents, and duplicate-Complete behavior are unchanged. The fresh 15-file archive and lockfile matched local SHA-256 hashes. Reused the existing project/phone/frozen signing credentials; EAS reported Free, 2/15 iOS builds used and zero overage before submission. App and extension remain 1.0.0 (1). No automatic retry or new source edit. Compilation does not prove clipping is corrected or explain the blackout.

### Compact layout device results — 2026-11-11

For build `cacac282-0ac2-43d5-9c66-70ebd3479ae6`, the user reports:

| Layout | Result |
| --- | --- |
| Draft | Passed — user-reported. |
| Active rest | Passed — user-reported. |
| Zero | Passed — user-reported. |
| Skipped | Passed — user-reported. |

Text/buttons fit without clipping and controls remain reachable — user-reported, not independently observed. Do not infer that all five functional checks from build `aec6ed60-6c49-4883-9f53-9f3513ae4333` were repeated. Compact-build upgrade preservation is **inconclusive** because before-values were not recorded; original upgrade preservation remains inconclusive after a possible earlier reset. The earlier blackout cause remains unconfirmed; no fix claimed. This is limited device evidence, not verification across text sizes or lifecycle states.

<a id="compact-layout-upgradedevice-checklist--not-run"></a>

### Compact layout upgrade/device checklist — reference protocol

The four layout observations above were reported passed. Upgrade preservation was not established. Retain this protocol for future checks; its broader regression/recovery expectations are not all passed by the layout report.

1. Before upgrading, note the **current** pounds, reps, saved-record count, completion-request count, and Skipped state. Do not assume the earlier six-request snapshot is still current.
2. Install the compact preview over the existing app without deleting or resetting. Close and reopen it; verify all noted values/counts and Skipped are unchanged. This is a new upgrade trial; it cannot resolve the original inconclusive trial retrospectively.
3. Only after recording preservation, deliberately reset the fictional proof for fresh layout trials. Check the draft, active-rest, zero, and skipped presentations: title/status and values readable, countdown clear, bottom controls unclipped and reachable. Retain +1 once and Complete twice; the second Complete must not restart rest. Use a separate fresh interval for Skip and confirm saved Skipped after reopening. Required taps must keep the authenticated Lock Screen visible.
4. Report each result separately. Zero may leave Complete and Skip visible; no exact-zero callback is assumed and the unchanged store rejects an expired Skip. Note any blackout recurrence without attributing a cause or claiming the compact patch fixes it.

<a id="rest-device-checklist--all-not-run"></a>

### Rest device checklist — partial results, remaining checks

1. After a successful new build, install it over the existing proof on the registered phone. Do not delete the app or reset first. Note the old values and counts before installation, then confirm that the old fictional record remains intact afterward. Old completed records should show Rest: Not started. Record preservation before deliberately resetting for the fresh trials.
2. Natural-expiry/regression trial: deliberately reset, start 40 lb × 8 reps, authenticate with Face ID while keeping the Lock Screen visible, and tap +1 once. First Complete must save 40 lb × 9 reps and start approximately 20 seconds of rest. Wait several seconds, then Complete again: rest must continue toward the original deadline. Reopen during rest to verify the remaining time, one saved record, and two completion requests.
3. Continue the same natural-expiry trial: return to the Lock Screen after the in-app check, watch the countdown reach zero and remain at zero for several seconds without counting upward. Reopen and verify Expired (0 seconds).
4. Separate Skip trial: reset again, start 40 lb × 8 reps, return to the Face ID-authenticated visible Lock Screen, tap +1 once and Complete twice several seconds apart, and confirm the second Complete does not restart rest. Tap Skip rest before zero. The card must show Rest skipped; reopening must show Skipped, 40 lb × 9 reps, one saved record, and two completion requests. Retrying Skip if reproducible must not alter the saved outcome. A Skip received after expiry must leave it expired.
5. Every required Complete and Skip tap must leave the authenticated Lock Screen visible and the app out of the foreground. Opening the app deliberately afterward is the verification step, not part of the action.
6. Reset and start again only as a deliberate fresh-data trial after evidence is recorded. Upgrade preservation remains inconclusive. Functional passes above belong to rest build aec6ed60-6c49-4883-9f53-9f3513ae4333; the compact build has four separately reported layout passes, not an implied full functional rerun.

The rest/compact milestone was published at ff627edc17102ad9fe50992a421a8ca5303fc42d. Its ordinary active-rest background/resume check has since Passed — user-reported as scoped above; force-quit/system termination remain separate and unrun. The earlier three-set preview compiled/signed successfully, but does not include the later timer-only patch. The subsequent timer-only preparation task did not build. Its separately authorized review/build has now succeeded; follow the current assessment/checklist at the top. No commit or push.

Sources: [Expo SDK 57](https://expo.dev/changelog/sdk-57) · [Expo inline modules](https://docs.expo.dev/modules/inline-modules-reference/) · [Apple’s Live Activity interactivity guide](https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities) · [App Intent authentication policy](https://developer.apple.com/documentation/appintents/intentauthenticationpolicy/requireslocaldeviceauthentication).
