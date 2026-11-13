# Build log

Record a short entry after each working session. Newest entries go first. Write what actually happened, including checks that could not run.

**Planned:** agreed or proposed work. **Implemented:** code exists. **Verified:** a named check ran and passed.

## 2026-11-12 — Record saved-confirmation device results and review publication

**Status** — Bounded upgrade preservation and fresh Set 1 confirmation/Continue/reopen **Passed — user-reported** for build 33cfa887-8f9f-46cd-a5d8-95d88dd3e31f. Publication review found no blocker; ten paths proposed in HANDOFF. Documentation only; no source change, cloud build, staging, commit or push.

- Read AGENTS/current handoff/project/latest log and reviewed the accumulated three Swift/seven Markdown changes against baseline 92da1c915ff702941fcc8b00003dd3f0caf2933e. Local main remains that commit; no untracked files. Existing work preserved; no fresh remote-ref check.
- Screenshot-supported upgrade evidence, as described by the user: saved actuals 40 × 8, 50 × 8, 45 × 10; plans; three records/requests; Expired/Dismissed rest; deadline and acknowledgement timestamps unchanged. No screenshots were attached or independently inspected in this task. Exact timestamps were not supplied and are not invented. This is the completed/dismissed-rest upgrade case only.
- After resetting, user completed Set 1 at 40 × 8. User confirmed prompt ✓ Set saved, remaining through 0:00 without clipping; Continue removed it and revealed Set 2 at 50 × 8 on the authenticated visible Lock Screen. User confirmed reopening showed one record/one request and Expired/Dismissed rest. These are reported interactions/app observations, not independent instrumentation. The preserved three records were before reset; this fresh trial completed one set, not all three.
- Do not extend this pass to failure/retry, duplicate/stale actions, early-Continue confirmation, fresh final-rest confirmation, VoiceOver, larger text, isolated older-payload decoding or broader recovery/migration. One request/one record is not duplicate testing. Prior native compilation/signing was independently verified in the build task and was not rerun. Prior Continue build evidence remains separate. TS-001 deferred automatic reveal and TS-002 countdown jumps stay open.
- Publication review traced committed-set/rest identity, exact failed-operation retry metadata and failure precedence. Storage, migration, deadlines, guards, intent definitions, dependencies and configuration remain unchanged. Source hashes for all 15 intended upload files still match the successful build's inspected manifest. Reviewed paths exclude credentials, signing/device files, generated artifacts, dependencies, screenshots and private records. Existing fictional proof evidence is retained.
- Checks rerun: 29 production-SQL wrapper tests and TypeScript Passed; wrappers execute production SQL through separate JS transaction/migration logic, not Swift/runtime retry behavior. Local Markdown links/anchors and whitespace Passed. All source bytes and prior log/reflections preserved. No new native or phone tests independently executed.
- Updated seven current status/evidence documents, preserving all historical build entries and personal reflections. Suggested future commit: Add saved-set confirmation and exact-action retries. No publication blocker found for this bounded proof checkpoint; unrun edge cases remain explicit limitations rather than claimed passes.

### What I learned — user-written

### Next small task

When explicitly authorized, recheck the diff and remote state, then commit/push only the ten reviewed paths listed in HANDOFF. No new build is needed to publish unchanged source; keep the remaining device checks and both troubleshooting issues open.

---

## 2026-11-12 — Review corrected retries and build saved confirmation

**Status** — Corrected source review Passed with no remaining blocking issue and no source edits. Exactly one [saved-confirmation preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/33cfa887-8f9f-46cd-a5d8-95d88dd3e31f) **FINISHED** at 2026-11-13T05:28:37.744Z (November 12 local). Native compilation/signing **Passed**; installation, runtime compatibility, failure injection, layout and device checks **Not run**.

- Read AGENTS/current handoff/project/latest log/proof guidance and traced the three-source-file patch against baseline 92da1c915ff702941fcc8b00003dd3f0caf2933e. Existing ten unstaged paths preserved. Local HEAD remains the baseline; no remote-ref query, staging, commit or push.
- All retry buttons invoke the captured action with its original session/set/rest IDs and delta where applicable; no conversion from Complete to Continue or inference of newer targets. Existing SQL guards reject outdated mutation targets. A duplicate/stale Complete can still count a received request for its addressed existing set, without saving a newer set or restarting rest. Continue cannot acknowledge another rest.
- Successful transaction return occurs after COMMIT and constructs fresh activity content with failure flag/payload cleared; a further throw captures the request that failed again. New payload fields are optional for prior content decoding; an old failure without metadata asks to reopen rather than guessing a retry. Swift compilation now passes; real older-activity decoding and runtime failure recovery are not established by compilation.
- Confirmation still requires a completed row matching the current rest in the committed snapshot, checked again at rendering. Failure overrides normal rest/draft/final content. Normal confirmation lasts through zero until stored acknowledgement. No changes to storage/migration, deadlines, records/drafts/plans, intent definitions, action guards, dependencies, identifiers or signing configuration.
- Windows checks Passed: 29 production-SQL tests through a separate JS wrapper and TypeScript. Eight previously regenerated native source/resource copies still match current source; no fresh native project regeneration was needed because source was unchanged. The wrappers do not execute Swift, coordinator publication or SwiftUI rendering. Markdown links, whitespace and preservation checks passed.
- Fresh directory-isolated EAS archive contains exactly 15 intended source/configuration/lockfiles; SHA-256 hashes all match local files and remained unchanged after upload. Allowlist/content review found no credentials, signing files, device IDs, dependencies, generated artifacts or unrelated files. Only ProofActivity.swift, ProofCoordinator.swift and ProofWidget.swift differ from the published baseline within that archive; a separate local hash manifest records the exact upload inputs.
- Current Free allowance checked: 8/15 iOS before, 9/15 after; zero overage and zero estimated charges. Submitted once using existing project and frozen remote credentials. CLI did not revalidate profiles against Apple servers without Apple login; do not claim a fresh independent device/profile check. Xcode ARCHIVE SUCCEEDED with zero compiler errors and exported/signed IPA. Dependency/build warnings remain; no retry, paid-plan change or App Store submission.
- Refreshed handoff and current status pointers; preserved all prior log entries and personal reflections. Installation/checklist emphasizes upgrade preservation, durable confirmation through zero, Continue dismissal, final flow, readable controls and physical-tap versus received-request evidence. Prior user-reported passes stay scoped to build 41621efa. TS-001 deferred automatic reveal and TS-002 countdown jumps remain open.

### What I learned — user-written

### Next small task

Capture current phone data, install the saved-confirmation preview over the existing proof without deleting/resetting, and run the focused confirmation/Continue/layout checklist. Keep failure injection and other unrun cases separate.

---

## 2026-11-12 — Review saved confirmation; correct mismatched failure retry

**Status** — Blocking feedback mismatch found by source review; narrow correction prepared. **No cloud build submitted**, following the explicit stop-on-blocker instruction. Windows checks Passed; corrected Swift/native compilation and all new device checks **Not run**.

- Read AGENTS/current handoff/project/proof/log and reviewed all three changed source files against published baseline 92da1c915ff702941fcc8b00003dd3f0caf2933e. Local HEAD remains that baseline; ten existing unstaged paths were preserved. Remote main was verified in the prior task, not queried again here. No staging/commit/push.
- The old generic saveFailed publication could follow any action. Its rest text always instructed Continue to retry, so a failed duplicate/stale Complete during displayed rest would instead acknowledge rest. This was established by tracing the catch and button intent, not by a device failure test. A previous final-summary branch could also conceal the failure.
- Narrow source correction stays in ProofActivity, ProofCoordinator and ProofWidget: optional failedAction retains operation plus exact session/set/rest IDs and adjustment delta; Codable/Hashable are added to the existing action enum. Failure takes priority over all normal layouts and uses the corresponding existing intent. Failed Complete offers Retry Complete; failed Continue offers Continue; failed edits retry the original change. Legacy Skip retains its original entry point. Older content without retry metadata requests reopening to inspect saved state. Dynamic Island displays failure rather than a normal summary. No automatic replay.
- Success remains tied to the completed row for that rest in a snapshot returned after COMMIT, with a second identity check in the widget. It survives zero until stored acknowledgement dismisses rest. Failure suppresses it. A failed duplicate request does not mean its earlier saved record was lost. Retrying a stale request remains guarded; a successfully received duplicate Complete can increment its request count but cannot add a record/restart rest. Successful publication or foreground reconciliation rebuilds from saved state.
- Preserved store/SQL/migration, intents, plans/drafts/actuals, acknowledgement, deadlines, action guards, timer, final-set flow, dependencies and signing. Source changes add only failure/publication presentation metadata and recovery controls; no database change. No speculative countdown/automatic-reveal fix; TS-001/TS-002 remain open.
- Checks rerun on Windows: 29 production-SQL tests through a separate JS transaction/migration wrapper, TypeScript, and isolated native configuration regeneration with eight matching host/extension source/resource copies. These do not execute Swift, its Codable synthesis, coordinator or SwiftUI. Source/diff review verifies exact retry parameters, commit ordering and unchanged timer/storage paths. Markdown links, whitespace and preservation checks passed. No native compile, signing, installation, phone decoding/layout, failure injection or device interaction test.
- No quota check, fresh EAS archive, upload or build after the blocker. Updated current project/handoff/proof guidance; historical entries and personal learning reflections preserved. Existing saved-feedback work retained. All new device checklist items remain Not run; prior Continue reports remain scoped to build 41621efa.

### What I learned — user-written

### Next small task

Review the corrected failure feedback before separately authorizing one preview build. Recheck allowance and isolated archive at that time; then test upgrade preservation, confirmation through zero/Continue, readable controls and actual received-request counts.

---

## 2026-11-12 — Prepare durable saved-set visual confirmation

**Status** — Local presentation patch prepared. Windows checks Passed; new Swift/native compilation, signed build, installation and device behavior **Not run**. Earlier Continue phone results remain user-reported and do not pass this layout change.

- Read AGENTS/current project/handoff/proof/latest log and traced Complete, storage commit, snapshot publication and widget selection. Task started clean on main at [92da1c915ff702941fcc8b00003dd3f0caf2933e](https://github.com/fgzmac/Swoldier/commit/92da1c915ff702941fcc8b00003dd3f0caf2933e); fresh read-only remote main matched. The previous 17-file checkpoint was committed/pushed normally. No publication action in this task.
- Added optional savedRestSetID to Activity content, populated only from a completed row in the returned stored snapshot matching the current rest's setID + ":rest" identity (used by existing completion and legacy import). Snapshot returns after commit. Widget matches the confirmation to its displayed rest; no pending/tap/next-draft-completed inference. Older decoded content without the optional field does not guess success; ordinary saved-state republishing fills it.
- Added compact **✓ Set saved** above countdown/Continue, lasting through zero until acknowledgement dismisses rest. Success has the accessible label Set saved. A saveFailed publication shows readable **Save failed — tap Continue to retry** instead, with up to two lines and the existing failure accessibility hint. Existing draft save-failure feedback stays intact. Values, adjustments and Complete remain hidden during rest. Control sizes, margins, countdown and final summary unchanged; fit/VoiceOver require device testing.
- Preserved SQL, store/transactions, acknowledgement, deadlines, plans, actuals, migration, intents, duplicate/stale guards, reset, dependencies, identifiers and final-set flow. No timer, animation, haptic or wake change. No new infrastructure or troubleshooting claim; TS-001/TS-002 stay open.
- Local checks Passed: 29 existing production-SQL tests through a separate JS wrapper, TypeScript, and configuration generation in a separate ignored fixture with eight exact host/extension native-source/resource comparisons. SQL tests do not execute Swift or the new confirmation mapping; generated-source inspection does not compile native code. Static diff/source trace checks commit-before-publication, identity and failure precedence. Markdown links and whitespace checked. No new native or phone test run.
- Updated current publication status and visual requirement/checklist. Test plan captures preserved upgrade data, confirmation through zero, Continue dismissal/final flow, layout/accessibility, failure/retry when safely reproducible and accidental repeated taps. Compare received request counts, records and deadlines: two physical taps do not establish two executed intents. Historical entries and personal reflections preserved; no cloud upload/build, staging, commit or push.

### What I learned — user-written

### Next small task

Review the prepared three-file visual patch before separately authorizing one preview build. Then run the focused phone checklist; keep new compilation and device outcomes Not run until observed.

---

## 2026-11-12 — Record fresh Continue regression and review publication checkpoint

**Status** — Fresh-fixture regression **Passed — user-reported** for build 41621efa-1d34-4af1-8860-804b7eb01b5d. Separate from the earlier migrated-record sequence. Accumulated checkpoint reviewed for a future authorized publication; no staging, commit or push in this task.

- Read AGENTS/current project/handoff and supporting evidence documents; inspected Git and preserved existing work on ff627edc17102ad9fe50992a421a8ca5303fc42d. Documentation changes only in this task; no application modification.
- After the user's fictional-data reset, saved sets were 40 lb × 8, 50 lb × 8 and 45 lb × 10. Final screenshot as described: three records, three completion requests, Planned sets recorded, rest Expired, rest screen Dismissed and a saved Continue timestamp. Exact timestamp not supplied; no image independently inspected in this task.
- User confirmed prompt Continue before and after zero, with required actions staying on the authenticated visible Lock Screen. These interactions are user-reported; the final screenshot supports app state, not unseen transition timing. Native compilation/signing was verified previously and was not rerun.
- This is the default-value fresh sequence, not the previously proposed 40 × 9 / duplicate-Complete variant. Duplicate/stale Continue, current-build duplicate Complete, force-quit, termination, other migration cases and other untested checks remain Not run. No new reopen/layout pass inferred. Earlier migrated-record results stay separate and unchanged. TS-001 automatic reveal remains deferred and TS-002 countdown jumps remains unresolved.
- Reviewed accumulated source/test/documentation diff and new backlog for publication: three-set migration, atomic saving/advancement, explicit action identities, durable acknowledgement, rest visibility, retained manual diagnostics and scoped evidence. No blocking issue found. Proposed exactly 17 files listed in HANDOFF, including new backlog; dependency lockfile/configuration are tracked and unchanged. No credentials, signing files, device identifiers, generated artifacts, personal screenshots or private workout/scan records found in proposed content. Fictional proof values and diagnostic evidence are intentionally retained.
- Checks rerun on Windows: 29 production-SQL wrapper tests and TypeScript Passed. Wrapper executes production SQL through separate JavaScript migration/transaction logic, not Swift. All 15 intended files remain byte-identical to the inspected successful Continue upload. Local Markdown links/anchors and whitespace passed; prior log/reflection bytes and unrelated/source files preserved. No native build or independent device test performed.
- Updated seven status/evidence Markdown documents and recommended separately authorized publication using commit message: Add three-set proof with persistent Continue rest controls. Remaining phone coverage is documented, not a production-release claim. No features, dependencies, cloud upload/build, staging, commit or push.

### What I learned — user-written

### Next small task

When explicitly authorized, recheck Git and publish only the reviewed 17-file checkpoint with a normal commit/push. Preserve any intervening changes; keep remaining device checks and TS-001/TS-002 open.

---

## 2026-11-12 — Record Continue migrated-record device results

**Status** — Build 41621efa-1d34-4af1-8860-804b7eb01b5d: bounded migrated-record sequence **Passed — user-reported**. App states are screenshot-supported as described by the user; this task did not independently inspect new images or observe the phone. Earlier native compilation/signing remains Passed. This was not a fresh three-set trial.

- Read AGENTS/current handoff/project/proof guide/feasibility/backlog and latest log entries; inspected Git state and preserved existing uncommitted work on baseline ff627edc17102ad9fe50992a421a8ca5303fc42d.
- Before/after upgrade evidence preserves Set 1 actual 135 lb × 10, Set 2 draft 50 × 8, Set 3 draft 45 × 10, all plans, one saved record / one completion request and exact expired deadline 1794515816.494715. This supports the displayed expired-rest migration case only, not other upgrade paths.
- Continue on that migrated expired rest promptly revealed Set 2 on the authenticated visible Lock Screen — user-reported. Reopened app showed Expired/dismissed, saved acknowledgement, unchanged drafts/deadline and counts 1/1 (supplied screenshot-supported state).
- Set 2 completed at 50 × 8; early Continue revealed Set 3 at 45 × 10 — user-reported. Described screenshot showed Skipped/dismissed, counts 2/2. Set 3 completed at 45 × 10; user confirmed guided final expiry/Continue. Final screenshot showed Planned sets recorded, three actuals / three requests, Expired/dismissed and saved Continue timestamp. No fourth set or automatic finish was reported; no internal trace or exact new timestamp is invented.
- Kept fresh-fixture testing, duplicate/stale Continue, current-build duplicate Complete, force-quit, system termination, other migrations, phone write-failure/retry and dedicated layout/republication checks Not run. Ordinary reopen evidence is not a lifecycle stress test. TS-001 automatic-reveal delay remains deferred; TS-002 countdown jumps remain unresolved. Historical reports and production-framework uncertainty preserved.
- Updated seven Markdown documents with scoped results, evidence types and remaining checks. Recommended one fresh-fixture regression on the existing build after capturing the migrated-record evidence; no new build required and no reset performed here.
- Documentation checks: local Markdown links/anchors and whitespace checked; task-relative diff restricted to documentation. Prior build-log content/reflections, application-source bytes and Git index preserved. No application tests rerun for this documentation-only task; earlier SQL-wrapper checks do not execute Swift. No source change, upload/build, staging, commit or push.

### What I learned — user-written

### Next small task

Run the bounded fresh-fixture Continue regression on the existing build after preserving current evidence. Keep duplicate/stale requests and broader migration/lifecycle cases explicitly unrun unless separately observed.

---

## 2026-11-12 — Review and build the persisted Continue proof

**Status** — Exactly one [Continue preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/41621efa-1d34-4af1-8860-804b7eb01b5d) submitted and monitored to **FINISHED**. Native compilation/signing **Passed**. Installation, on-device migration, layout fit, and all Continue device checks **Not run**. TS-001/TS-002 remain open/deferred.

- Read AGENTS/current handoff/project/latest log/proof setup and reviewed Continue source, SQL, Swift transaction/publication paths, widget selection, and migration. No blocking issue or source correction found. Preserved all existing uncommitted work on ff627edc17102ad9fe50992a421a8ca5303fc42d; no application edit in this review/build task.
- Confirmed rest selection depends on saved acknowledgement, not isStale or timer zero. Continue reads time after the write lock, acknowledges the current identified rest, and marks skipped only before its saved deadline. At/after expiry it preserves expired status. SQL does not update sets/drafts/plans/counts/deadlines; current session/set/rest and null-acknowledgement guards prevent stale or duplicate dismissal. Successful commit precedes publication; failures remain retryable. Native completion also requires acknowledgement plus its prior guards. Final Continue reveals Planned sets recorded, no fourth set or automatic finish.
- Migration review: version 3 adds one nullable column transactionally and backfills previously skipped records only. Active/expired unskipped installed rows require Continue; legacy no-deadline records receive no new rest. Version recheck/transaction prevents repeat imports/backfill, rollback preserves prior data, and foreground repair publishes saved acknowledgement without reseeding. Runtime phone migration and older activity decoding remain unverified by the build.
- Local checks rerun Passed: 29 production-SQL tests through a separate JavaScript transaction/migration wrapper, TypeScript, eight matching previously regenerated native source/resource copies, local Markdown links/anchors and whitespace. SQL wrappers do not execute Swift. The earlier local JavaScript export passed; unchanged source was reviewed rather than rerunning that export. Cloud compilation is a separate result below.
- Fresh EAS upload archive contained exactly 15 required files, including all nested source and package-lock.json; every SHA-256 matched local source. Allowlist/content review excluded credentials, signing/device identifiers, private records/screenshots, dependencies, generated artifacts, tests/docs, and unrelated repository files. Compared with D1 22e675fd-8642-4faf-88d5-aa254129f6c5, only App.tsx and native ProofActivity/ProofCoordinator/ProofIntents/ProofSQL/ProofStore/ProofWidget changed. Other eight upload files unchanged. Exact hash manifest retained outside the repository; EAS No VCS omits the Git base automatically, so baseline is independently recorded here.
- Verified EAS Free allowance before submission: 7/15 iOS builds used, zero estimated overage. Both existing active/unexpired ad hoc profiles include the same registered phone; certificate unexpired. Used existing project with proof-directory EAS_NO_VCS/EAS_PROJECT_ROOT isolation and frozen signing credentials. Exactly one noninteractive preview command; no automatic retry, paid-plan change, credential change, or App Store submission. After completion: 8/15 used, zero overage.
- Build 41621efa-1d34-4af1-8860-804b7eb01b5d FINISHED at 2026-11-13T00:42:03.868Z (2026-11-12 in America/Los_Angeles). Xcode reports ARCHIVE SUCCEEDED, zero compiler errors, and includes ProofStore/ProofIntents/ProofWidget. EAS produced an IPA. Native compilation/signing Passed, not phone migration/interaction/layout. App/extension versions remain 1.0.0 (1), so use the build link and Continue banner to identify the upgrade.
- Updated current status/handoff/proof checklist and related summaries. Checklist captures installed data first, installs without deleting/resetting, checks early Continue then expired Continue, final planned-set summary/exactly three records, and reopen persistence. Device results remain Not run until supplied. Historical logs, diagnostic evidence, and learning reflections preserved. Deferred automatic reveal and countdown jumps remain unresolved; no fix claimed. No commit/push.

### What I learned — user-written

### Next small task

Install the successful Continue preview over the existing app after recording before-values; run the focused handoff checklist and report observed results. Keep upgrade preservation, functionality, layout, and countdown cadence separate.

---

## 2026-11-12 — Implement persisted Continue in the three-set proof

**Status** — Continue prepared locally. Windows checks Passed; Swift compilation, native/device migration, installation, and Continue phone checks **Not run**. No cloud upload/build, commit, or push.

- Read AGENTS/current PROJECT/HANDOFF/backlog/latest log and inspected source/Git. Preserved existing uncommitted work on ff627edc17102ad9fe50992a421a8ca5303fc42d. Kept the fictional three-set scope and existing dependencies, identifiers, signing, and production framework decision unchanged.
- Added schema version 3: one nullable continued_at column in proof_rests_v2, with transactional migration/version update. Existing skipped rows receive a compatibility acknowledgement from their skipped_at timestamp; active/expired unskipped rows remain unacknowledged and require Continue. No new deadline/rest for legacy records without one. Existing v2 sets, plans, actuals, counters, and deadlines are preserved. Legacy imports still run once; failed migration rolls back safely. No delete/reset required.
- Continue runs a background/local-authenticated LiveActivityIntent bound to session/set/rest. Under the write lock, one guarded SQL update saves acknowledgement and only marks skipped when the saved deadline is in the future. At/after zero, rest remains expired, not falsely skipped. Continue never changes set records, plans/drafts, completion counts, or deadlines. Repeated/old/forged requests cannot dismiss a newer rest. Existing archived Skip intents route through the same guarded operation.
- Commit precedes ActivityKit publication; failed writes remain retryable with no false success. Complete retains the saved-deadline gate and now also requires current acknowledgement so old controls cannot bypass Continue. The final rest is acknowledged in the same way, revealing Planned sets recorded with no fourth set or exercise-finished flag. Start/Show can recreate a missing activity for an unacknowledged final rest.
- Normal rest card shows the bounded timer and exactly Continue; values/edit/Complete remain hidden. At zero the card stays until acknowledgement, independent of isStale; publications use nil staleDate. Optional content acknowledgement supports older activity decoding and foreground reconciliation. Removed D1 labels from the workout card while retaining recorded evidence and the separate manual metadata panel. App displays elapsed state and acknowledgement separately. No timer/poll/server/infrastructure added; countdown pauses/jumps remain unresolved, and automatic-reveal investigation stays deferred.
- Checks Passed: 29 production-SQL tests using a separate JavaScript transaction/migration wrapper, TypeScript, local iOS JavaScript/Hermes export (580 modules), eight exact regenerated host/shared/extension source/resource copies. Coverage includes before/exact/after expiry, retry, repeated/stale Continue, reopen before/after, unchanged drafts/plans/actuals/counts, final rest, v2 active/expired/skipped data, and failed migration/commit rollback. SQL wrappers do not execute Swift or ActivityKit. No native compilation or device rendering claim.
- Updated project/status/backlog/proof guide and handoff with compatibility rules and an upgrade-first checklist. Existing D1 evidence, prior failed/delayed outcomes, historical logs, and personal reflections preserved. All Continue device trials remain Not run; old Skip UI results are not a Continue pass.

- Final static/documentation checks Passed: 86 local Markdown links/anchors, working/staged whitespace, bounded timer helper byte-for-byte comparison, and task-start file hashes. Only seven proof source files, the SQL-wrapper test file, and seven related Markdown documents changed. All other existing work, dependency/configuration/signing files, and prior log/reflection bytes preserved. D1 card labels and context.isStale selection are absent. HEAD unchanged, nothing staged.

### What I learned — user-written

### Next small task

Review the prepared Continue/migration patch for one separately authorized preview build. Then upgrade without deleting/resetting and verify before/after-zero Continue, saved acknowledgements, preserved data/counts, final summary, and compact Lock Screen behavior using the handoff checklist.

---

## 2026-11-12 — Adopt Continue and add the troubleshooting backlog

**Status** — Documentation checkpoint only. Continue adopted; implementation, native compilation of that change, and device checks Not run. Automatic-reveal investigation deferred; countdown jumps separately unresolved.

- Read AGENTS and current project/handoff/proof/feasibility/log documents. Inspected Git; preserved existing uncommitted work on ff627edc17102ad9fe50992a421a8ca5303fc42d. No application changes.
- Added the supplied Downloads/TROUBLESHOOTING_BACKLOG.md at docs/TROUBLESHOOTING_BACKLOG.md. No destination file existed, so no merge was needed. Copied supplied bytes unchanged; source file preserved. TS-001 and TS-002 retain evidence, uncertainty, revisit triggers, and closure criteria. Additional details in the supplied file remain attributed to its supplied reports, not independently verified here.
- The user's request adopts Continue; the attachment supplies its recorded behavior. Its future investigation instructions are proposals, not authorization to implement, investigate, or build in this session. No proposed investigation was executed.
- Adopted countdown and one button labeled Continue. Before zero, end rest early and reveal the next existing draft; at/after zero reveal without saving a set or restarting rest. Preserve draft edits/plans/completed records and duplicate/stale-action protections. At the final planned set, Continue reveals Planned sets recorded without a fourth set or automatic exercise finish. Required taps stay on the authenticated Lock Screen. Exact implementation remains next; prior Skip observations do not pass Continue.
- Continue explicitly supersedes automatic return as a first-version requirement. The prior always-visible-controls recommendation was not adopted; keep editing/Complete hidden on the rest card. Automatic reveal remains unresolved/deferred, not fixed or proven impossible. Countdown cadence remains a separate issue; no cause assumed.
- Linked backlog from PROJECT and HANDOFF, updated current requirements/acceptance checks and decision log, and made preparing Continue the next small implementation task. Aligned root/proof README and feasibility current summaries while retaining historical source descriptions and protocols. Preserved historical decisions, all earlier build-log entries, and personal reflections.
- No application changes, dependency installation, cloud upload/build, commit, or push. Framework remains open. No SQL/TypeScript/native/device rerun for this documentation-only task.

- Verification Passed: 83 local Markdown file/anchor links, working/staged whitespace and new-backlog trailing-whitespace checks. Supplied backlog and repository copy match byte-for-byte; Downloads source is unchanged. SHA-256 comparison confirms all pre-existing non-documentation files unchanged; every prior build-log byte/reflection preserved. Six existing Markdown files updated plus the new backlog; nothing staged, HEAD unchanged.

### What I learned — user-written

### Next small task

Prepare Continue in the bounded three-set proof; check before/after-zero behavior, unchanged drafts/counts, repeated/stale requests, and final planned-set summary. Keep build/device validation separate and do not resume deferred automatic-reveal research.

---

## 2026-11-12 — Record matched D1 evidence and recommend an interaction decision

**Status** — D1 automatic reveal observed with unacceptable approximate delay — user-reported. Prompt reveal acceptance remains unmet. No new source change, upload/build, commit, or push. Recommendation below is not an adopted requirement.

- Read AGENTS, current handoff/project/latest log and diagnostic source. Preserved existing uncommitted work on ff627edc17102ad9fe50992a421a8ca5303fc42d. Independently reviewed the evidence limits and read current official Apple documentation. No phone/image was independently inspected in this task; screenshot and panel facts were supplied as text.
- D1 evidence: Lock Screen and diagnostic panel both show publication `1E9DB281`. Submitted `2026-11-12T20:36:36.506Z`. Published staleDate and saved deadline carried by that publication both display `2026-11-12T20:36:56.494Z`. Described Lock Screen screenshot: stale:T, CTRL, Set 2/3, 50 lb × 8, one saved record displayed. User reports automatic reveal after approximately 1–2 minutes. No recording establishes exact transition timing.
- Correlation is supported by matching IDs. Supplied deadline is 19.988 seconds after submission, consistent with the saved 20-second interval preceding publication; these values show no minute-scale deadline offset. Captured stale:T/CTRL agrees with the actual selector. This does not establish when F→T or REST→CTRL first occurred, their relative timing, continuously unchanged publication identity, or an internal iOS event timestamp. The panel reads current ActivityKit content, not a fresh database read; displayed record count is not a new persistence/duplicate-prevention pass.
- Official contract: [staleDate](https://developer.apple.com/documentation/activitykit/activitycontent/staledate) and the [ActivityKit guide](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities#Configure-the-Live-Activity) describe the stale state/flag at the configured date; [Apple's stale-view example](https://developer.apple.com/videos/play/wwdc2023/10185/?time=1004) supports alternate rendering. Reviewed sources provide no maximum visible-controls latency. [TimeDataSource](https://developer.apple.com/documentation/swiftui/timedatasource) updates Text and does not establish arbitrary whole-card refresh timing. The [interactivity guide](https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities) supports native intent controls and distinguishes Live Activities from widget timelines.
- Engineering conclusion: repeated reported delays make the current stale-state design unsuitable as the sole gate for prompt automatic reveal. Supported API does not mean this interaction has passed. Cause remains unknown; no battery/network/display-setting claim or general fixed-delay policy. Countdown pauses/jumps remain separately unresolved. Earlier observations of absent controls at the initial observation point and later delayed reveals remain intact. No new final-set, upgrade preservation, exact saved-state, full-flow, or layout pass inferred.
- One recommended direction, requiring the user's decision: keep next-draft weight/reps/adjustment/Complete controls visible with countdown and Skip. Native saved-deadline/Skip checks reject early Complete at execution; no timed hide/disable/re-enable and no additional Resume/refresh tap. This trades timer-only quiet rest for a busier screen and permits draft editing during rest again. It is **not adopted** and does not promise instant intent execution or fix countdown jumps. Existing data guards/Face ID/no-foreground-app requirements remain. No new staleDate variation, repeated D1 trial, server/push infrastructure, background polling, or dependency proposed.
- If accepted in a future task, bound the interaction proof to early Complete rejection, post-deadline normal Complete without opening/refreshing, unchanged previous records/deadline during edits, duplicate/stale protection, and compact fit. These proposed checks are Not run; implementation/build need later authorization. Production framework remains open.
- Updated HANDOFF and affected current status in PROJECT, feasibility, root/proof README; kept the original diagnostic protocol as context rather than the next task. All historical build-log entries and learning reflections preserved. No SQL/TypeScript/native/device tests rerun for a documentation-only evidence task.

- Final checks Passed: 77 local Markdown links/anchors, working/staged whitespace, independently checked 19.988-second timestamp difference, and task-start SHA-256 comparison. Only the six intended current-status Markdown files changed; application/configuration/test files and every prior build-log byte/reflection remain unchanged. Independent evidence review found no overclaim or silent scope adoption; stale repeat-diagnostic instructions were marked historical. Existing 16 working-tree changes remain unstaged; HEAD unchanged.

### What I learned — user-written

### Next small task

Decide whether to accept next-set controls remaining visible during rest, with completion guarded by the saved deadline. The timer-only/no-extra-tap requirement remains unchanged until the user decides; no tap-required fallback is silently adopted.

---

## 2026-11-12 — Review and build the D1 rest-expiry diagnostic

**Status** — Exactly one [D1 preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/22e675fd-8642-4faf-88d5-aa254129f6c5) submitted and monitored to **FINISHED**. Native compilation/signing **Passed**. Installation, upgrade preservation, diagnostic layout fit, and all D1 device results **Not run**. Earlier comparison remains automatic reveal observed, unacceptable delay — user-reported; no cause/fix claimed.

- Read AGENTS/current handoff/project/proof/latest log and reviewed D1 with an independent source reviewer. Preserved all 16 existing modified files on baseline ff627edc17102ad9fe50992a421a8ca5303fc42d; no application source correction was needed or made in this task. Relative to comparison 9510b48e-aea0-4f67-b724-6e46ff4ee9ae, only App.tsx, modules/LockScreenProofModule.swift, native/ProofActivity.swift, native/ProofCoordinator.swift, and native/ProofWidget.swift differ. The other ten upload files are byte-identical.
- No blocking issue found. Raw context.isStale, short publication ID, and literal REST/CTRL/DONE/OLD labels use the same rendered context. Metadata is stamped at existing publication sites only, preserving actual outgoing staleDate/relevanceScore. Optional fields support older decoded activity content; ordinary foreground equality ignores diagnostics, preventing stamp-only republishes. Typed Sendable diagnostics cross the actor boundary before dictionary bridging. Manual inspection captures each current activity.content once and neither accesses workout storage nor repairs/publishes.
- Expiry selection, bounded timer, native store/SQL/intents, atomic saving, drafts/deadlines/completed records, migration/reset, and session/set/rest action guards are unchanged. No additional background work, polling, dependencies, push/server infrastructure, or schema changes. Diagnostic text adds rendering content, so fit and timing effects remain device questions.
- Diagnostic interpretation: correct matching metadata plus a late visible flag/branch points upstream of the selection helper; a timely flag with a late branch calls for layout/selection investigation. The on-screen flag still requires rendering and cannot independently timestamp an internal iOS event or separate internal state timing from display delivery. Metadata is current ActivityKit content, not a historical journal or fresh database check. Reopening may trigger existing foreground repair and replace its ID; never use a new ID's metadata to establish the filmed old card's values.
- Windows checks Passed: 19 production-SQL tests through a separate JavaScript transaction/migration wrapper, TypeScript, eight exact previously regenerated native source/resource copies and matching inline-module copy. SQL-wrapper tests do not execute Swift. Fresh EAS archive contained exactly 15 required source/configuration/lockfile files; all SHA-256 hashes matched local source. Excluded credentials, signing/device identifiers, private records/screenshots, dependencies, generated artifacts, tests/docs, and unrelated files. Source manifest retained outside the repository.
- Verified EAS Free usage 6/15 iOS builds before submission, zero estimated overage. Both existing active/unexpired ad hoc profiles include the same registered phone, with unexpired certificate. Used existing project and directory-scoped EAS_NO_VCS/EAS_PROJECT_ROOT, frozen credentials, noninteractive single build command. No paid-plan/signing changes, retry, or App Store submission. After completion: Free usage 7/15, zero overage.
- Build 22e675fd-8642-4faf-88d5-aa254129f6c5 completed at 2026-11-12T19:49:11.946Z. Xcode reports ARCHIVE SUCCEEDED, zero compiler errors, and includes ProofWidget, ProofCoordinator, and the inline module. EAS produced an IPA. Native compilation/signing Passed; this does not verify installation, migration on the installed database, decoding an old live card, diagnostic fit, or device timing. Both targets remain 1.0.0 (1); confirm D1 visibly rather than inferring artifact identity from version alone. No VCS build mode omits the Git base; independently verified baseline and exact file hashes identify uploaded source.
- Updated current handoff, project/feasibility, root status, and proof checklist with upgrade-first filming and matching-ID limits. Preserved all earlier log bytes and user-written reflections. All D1 phone trials remain Not run; previous limited user-reported evidence retains its own build/scope. No commit/push; source remains local and uncommitted over the published baseline.

- Final verification Passed: 72 local Markdown links/anchors, working-tree and staged whitespace checks, all 15 source hashes still matching the upload, and preservation of every prior build-log byte/reflection. Only the six current-status Markdown documents changed during this review/build task. HEAD remains ff627edc17102ad9fe50992a421a8ca5303fc42d, all 16 existing working-tree changes remain unstaged, and no new project files are untracked.

### What I learned — user-written

### Next small task

Capture current data, install D1 without deleting/resetting and compare; confirm its banner. Film one fresh untouched rest through zero/eventual controls, tracking timer, stale flag, actual layout, publication ID, and countdown jumps separately. After filming, inspect metadata only for a matching publication ID; report correlation unavailable if reopening replaced it.

---

## 2026-11-12 — Prepare temporary D1 rest-expiry diagnostics

**Status** — Temporary diagnostic source prepared. Native compilation, installation, control fit, and diagnostic device checks **Not run**. Prior comparison outcome remains automatic reveal observed with unacceptable delay — user-reported; no cause/fix claimed.

- Read AGENTS/current handoff/feasibility/project/latest log and actual proof. Preserved all existing uncommitted three-set work on baseline ff627edc17102ad9fe50992a421a8ca5303fc42d. Added no cloud operations, dependencies, schema changes, commits, or pushes.
- Added optional publication ID/time fields to ContentState, preserving older decoding. Stamp at existing ActivityKit request/update sites only; retain exact outgoing staleDate/relevanceScore. Foreground equality strips diagnostics, preventing newly generated metadata from creating additional updates on unchanged polls. Failed-save publications remain marked failed with existing expiry metadata; no false success introduced.
- Lock Screen D1 header reads raw context.isStale outside layout selection and displays short publication ID. REST/CTRL/DONE/OLD labels identify the actual branch. Existing showsRest and bounded timer function are unchanged, as are native store/SQL/intents and action IDs/guards. Kept 44-point targets and 14-point margins; tightened draft row spacing to 4 points for the compact header. Native fit/large-text behavior remains unmeasured. Dynamic Island unchanged.
- Added readPublicationDiagnostics native bridge and manual app panel. Reads current ActivityKit content under the existing coordinator gate, with no ProofStore access, repair, or publication. Typed Sendable struct crosses the actor boundary before bridge dictionary conversion. Exposes actual published staleDate, saved deadline carried by the publication, submission time (UTC/epoch seconds), short ID, set number, and failure flag. This is not fresh database verification or a display-event timestamp. The app visibly identifies D1. No new polling; the existing ordinary foreground read behavior remains.
- Diagnostics stay in ActivityKit content; no separate disk log or database storage. Manual panel stays unchanged until requested again, even after reset. Old content can show unknown metadata until an ordinary publication. Film first, then compare matching IDs: reopening may trigger existing foreground repair, and a changed ID invalidates correlation with an earlier tuple. The on-screen raw flag still depends on rendering and cannot independently timestamp an internal system event. Diagnostic additions may perturb timing.
- Prepared short filmed trial: preserve existing data, complete one set, leave visible Lock Screen untouched through zero/eventual return; capture timer zero, stale F→T, layout switch, and publication ID, with another device if available. Record countdown jumps separately. Only afterward reopen and manually inspect metadata and saved values/counts. New trial outcomes remain Not run; broader final-set, upgrade, migration, and record checks are not inferred.
- Independent agent review found no blocking issue; recommended typed Sendable boundary, which was applied. Local checks Passed: 19 production-SQL wrapper tests, TypeScript, eight exact regenerated host/shared/extension copies. SQL tests execute production statements through a separate JavaScript transaction/migration wrapper, not Swift. No native compile or device rendering claim.
- Updated handoff, project/feasibility/current status, and proof instructions. Historical log entries and personal learning reflections preserved. Production framework remains open. No upload/build, commit, or push.

- Final checks Passed: iOS JavaScript/Hermes export (580 modules, local ignored output), 72 local Markdown links/anchors, working/staged whitespace, and task-start hash comparison. Only five application files and six current-status documents changed this task; store/SQL/intents/configuration/dependencies and all other tracked files are byte-identical. Expiry selector, timer, and control-size helper text is unchanged. Every earlier log byte/reflection preserved; HEAD unchanged, nothing staged. JavaScript export is not a Swift compile or signed build.

### What I learned — user-written

### Next small task

Review D1 and its limits before separately authorizing native compilation and one filmed untouched-rest trial. Keep behavior and stored data unchanged.

---

## 2026-11-12 — Record delayed automatic reveals and bound the next diagnostic

**Status** — Comparison build 9510b48e-aea0-4f67-b724-6e46ff4ee9ae: **automatic reveal observed, unacceptable delay — user-reported**. No implementation change, diagnostic instrumentation, native build, or new independently observed device test.

- Appended later findings without rewriting earlier initial absence/failure observations: first untouched expiry eventually revealed controls roughly 1–2 minutes after zero; a subsequent countdown hid controls throughout, then controls returned exactly 1 minute 40 seconds after zero as timed by the user. The exact figure is user-reported, not independently measured. Do not infer final-set behavior, saved values/counts, upgrade preservation, or a general 100-second/two-minute system policy. Countdown pauses/jumps remain unresolved.
- Read current instructions/handoff/project/feasibility/proof and latest log, inspected Git and actual publication/store/widget paths. All 15 local source/lockfile hashes match the comparison upload manifest. No extra deadline offset, unit conversion error, delayed task, or background expiry timer was identified: native epoch seconds + 20 feeds both timer and staleDate. The removed Date.now branch is absent. No source defect establishing the cause was found; the earlier guard hypothesis is not a proven diagnosis/fix.
- Reviewed official Apple staleDate/isStale, ActivityKit guide and WWDC stale-view example, TimeDataSource, interactivity, push-update, and activityStateUpdates references. They describe staleness at the configured date and supported alternate rendering, but no reviewed maximum latency for visible interactive controls. Current observed timing does not satisfy this interaction. Text ticking, whole-card rendering, and stored deadline accuracy remain separate; no battery/network/display cause established.
- Proposed, but did not implement, the smallest diagnostic: raw isStale label outside the selection helper, selected-branch label, fictional rest/deadline correlation, and a bounded publication tuple captured at the existing update path. Film an untouched interval, then inspect metadata. Correct metadata plus a late marker/late branch points upstream of our helper; timely marker/late branch points to selection/layout. The visible marker does not timestamp the internal OS ActivityState change. A suspended app observer cannot be assumed to record that transition promptly; no background listener/polling proposed as a workaround.
- Documented alternatives and tradeoffs using official APIs: persistent intent controls with native readiness gating changes timer-only scope; explicit refresh/Resume requires a tap and fails the adopted requirement unless changed; remote ActivityKit updates add excluded server/network/budget complexity and no identified hard visible-deadline bound. No silent scope substitution, new dependency, push infrastructure, polling, or speculative fix.
- Updated PROJECT, HANDOFF, feasibility, root status, and proof checklist/assessment. Preserved historical build-log entries and personal reflections. Source, storage, drafts, deadlines, migrations, completed records, and action protections unchanged. Baseline remains ff627edc17102ad9fe50992a421a8ca5303fc42d with existing work unstaged. No upload/build, commit, or push.

- Verification: 70 local Markdown file/anchor links and working/staged whitespace Passed. All 15 uploaded-source hashes still match; all other tracked files unchanged except the six intended Markdown documents. Every prior log byte/reflection preserved. No SQL/TypeScript rerun for this documentation-only task; no native/device execution. HEAD unchanged, nothing staged.

### What I learned — user-written

### Next small task

Prepare the bounded read-only phase/publication diagnostic described in the proof guide; do not change rest behavior. Any later native build and filmed device comparison need their own task authorization.

---

## 2026-11-12 — Review and build the isStale-only comparison

**Status** — Exactly one [isStale comparison preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/9510b48e-aea0-4f67-b724-6e46ff4ee9ae) submitted and monitored to **FINISHED**. Native compilation and signing Passed. Installation, upgrade preservation, automatic reveal across three rests, saved values/counts, final summary, and countdown cadence checks remain **Not run** for this build.

- Read AGENTS, current handoff/project/latest log and reviewed the prepared ProofWidget comparison and source paths. HEAD remains ff627edc17102ad9fe50992a421a8ca5303fc42d; preserved all 15 existing modified files. No application source edited in this task. Relative to f55d4dff-e9ef-475d-ad7e-9f501a7e65db, only ProofWidget.swift differs: the prepared removal of Date.now from showsRest, retaining saved deadline/Skip checks and isStale.
- No blocking issue identified. Each successful Complete atomically saves actuals/new rest ID/deadline, selects that rest row, commits, then publishes matching state and staleDate. Duplicate Complete cannot create/restart rest. Active Skip saves before publishing nil staleDate; the next completion publishes its own new deadline. Expired/stale Skip republishes current saved state instead of restoring old metadata; failed writes keep the last displayed expiry metadata. Foreground repair and actions share the publication gate. This source review does not prove the system resets its stale presentation at the right time; the Set 2 trial explicitly tests that risk.
- Preserved atomic persistence, native saved-deadline gating, drafts/plans/completed records, migration/reset, explicit session/set/rest IDs, duplicate/stale protections, timer rendering, dependencies, identifiers, and signing configuration. The prior failure's cause remains a hypothesis, and countdown pauses/jumps remain open. No new phone outcome inferred from compilation.
- Local checks Passed: 19 production-SQL tests with a separate JS transaction/migration wrapper, TypeScript, eight exact generated-source/resource copies, and whitespace. SQL-wrapper tests do not execute Swift or ActivityKit. Fresh EAS upload archive contained exactly 15 required files including nested source and package-lock.json; all local SHA-256 hashes matched. No credentials, signing/device identifiers, dependencies, generated artifacts, tests/docs, private records, or unrelated files included. Source manifest stored outside the repository.
- Verified EAS Free allowance before submission: 5/15 iOS builds used, zero overage. Both active/unexpired ad hoc profiles included the same registered phone, with unexpired certificate. Reused existing project and frozen signing credentials under directory-scoped EAS_NO_VCS/EAS_PROJECT_ROOT. Exactly one build command; no retry, paid-plan change, credential change, or App Store submission.
- Build `9510b48e-aea0-4f67-b724-6e46ff4ee9ae` completed at 2026-11-12T18:49:30.340Z. Xcode reports ARCHIVE SUCCEEDED, zero compiler errors, and includes ProofWidget/ProofCoordinator. EAS produced an IPA. Native compilation/signing Passed. Both targets remain 1.0.0 (1); version alone does not establish installed artifact identity. EAS No VCS mode omits a source commit; the independently verified base and 15-file hashes identify submitted source.
- Refreshed current status and focused six-step checklist: capture/compare existing data before any fresh reset; untouched Set 1 expiry; Set 2 controls hidden throughout its new rest; Set 3 final summary with no fourth set/automatic finish; reopen and inspect actual values/count; record pauses/jumps separately, ideally by filming from another device. No new device pass recorded. Earlier f55 failure and two UI-only Skip observations retain their original scope.
- Historical log entries and user-written learning reflections preserved. No commit or push. All existing local changes remain uncommitted; production framework remains undecided.

- Final audit: 67 local Markdown links/anchors and working/staged whitespace Passed; all 15 uploaded-source/archive hashes still match. All application source unchanged this task; only six current-status documents edited. Every historical log byte/reflection preserved; HEAD unchanged and nothing staged. Post-build EAS usage: Free, 6/15 iOS used, zero overage.

### What I learned — user-written

### Next small task

Install the successful comparison build over the current proof without deleting/resetting first, compare captured data, then perform the focused three-rest sequence and report each outcome separately. Do not submit another build automatically.

---

## 2026-11-12 — Investigate timer-only expiry failure and prepare guard-free comparison

**Status** — f55 automatic transition **Failed — user-reported**. Active-rest Skip and Skip at displayed zero each revealed controls: **Passed — user-reported, UI reveal only**. Countdown pauses/jumps remain open. Minimal candidate prepared locally; native compilation and candidate device checks **Not run**.

- Read instructions, current handoff/project/feasibility/proof source and latest log; inspected Git. Preserved all existing 15 modified files over ff627edc17102ad9fe50992a421a8ca5303fc42d. All 15 source/lockfile hashes matched the recorded upload manifest for f55d4dff-e9ef-475d-ad7e-9f501a7e65db before editing; source provenance does not independently identify the installed phone artifact.
- Recorded the user's evidence exactly: countdown reached 0:00 but no automatic next values/controls appeared; described screenshot still shows 0:00 and Skip. Countdown sometimes pauses/jumps rapidly through several seconds. Skip during active rest and at displayed 0:00 each revealed expected controls. Screenshot not independently inspected. No saved-record-count, draft-preservation, final-set, full three-set, upgrade-preservation, or exact deadline pass inferred from those Skip observations. Prior reported evidence remains scoped to its original trials/builds.
- Rechecked official Apple staleDate/isStale and update documentation, WWDC23 stale rendering, TimeDataSource, bounded SystemFormatStyle.Timer, and WidgetKit dynamic dates. These establish supported system-managed text/stale presentations, not a guaranteed regular visible tick, exact whole-card refresh latency, or evaluation-at-display-time contract. Sources are linked in the proof investigation. Timer text changing, whole-card selection, and saved deadline accuracy are separate. No evidence establishes battery, network, or display settings as the cause.
- Traced Complete → atomic store commit → paired current content/deadline publication. The same serial gate orders action publications and mismatch-only foreground repair. Active Skip commits skipped_at before publication. If truly expired, SQL Skip does not change data but still republishes the snapshot with its past staleDate; the previous wall-clock guard can then evaluate after expiry. Displayed zero alone does not establish whether the deadline had passed at action execution. This is a source-based explanation for manual refresh, not a runtime trace or proof of a saved Skip.
- Hypothesis: if the stale view is evaluated just before its deadline or prepared ahead of display, f55's `!context.isStale || deadline > Date.now` still chooses rest. That comparison schedules no follow-up render. Independent Text could reach zero without replacing that selected branch. No captured isStale/evaluation timestamps establish that this occurred; a missing/delayed system transition is another possibility. The pause/jump report may be separate and remains unresolved.
- Prepared the smallest one-variable candidate in ProofWidget.showsRest: remove `deadline > Date.now` and use deadline existence, saved skip, and context.isStale. This follows the documented stale-view pattern without a wall-clock veto. It is a comparison patch, not a proven fix; old/new rest presentation still needs a device regression trial. No other source changed. Native deadline gating, explicit session/set/rest identity, duplicate/stale protections, plans/drafts/actual records, migration/reset, timer format/range, coordinator, and dependencies are untouched. No server, push infrastructure, background polling, delayed task, or new diagnostics infrastructure.
- Windows checks Passed: all 19 production-SQL wrapper tests, TypeScript, and eight exact generated host/shared/extension source/resource copies. The tests use a separate JavaScript transaction/migration wrapper, not Swift execution. No native compile, installation, system-stale rendering, or new device trial ran. Existing f55 native compilation/signing pass is historical and does not compile this newer candidate.
- Updated current status and the focused comparison plan. Preserve data before future upgrades; observe untouched expiry against an external clock/video if available, then deliberately reopen to inspect saved values/deadline/counts. Reopening can repair metadata, so it is a separate observation. Use separate Skip trials, a subsequent rest after a stale phase, and final summary; if the candidate fails, propose minimal read-only phase/deadline diagnostics before broader changes. No deletion/reset requested merely to investigate current data.
- No cloud upload/build, account/signing changes, dependency installation, commit, or push. Historical build-log entries and learning reflections preserved. Production framework remains undecided.

- Final audit Passed: 68 local Markdown links/anchors, working/staged whitespace, historical log byte preservation, and all other tracked-file hashes unchanged except the seven intended files (one widget plus six status documents). Only ProofWidget.swift differs from the 15-file f55 upload manifest. HEAD remains the published baseline, nothing staged.

### What I learned — user-written

### Next small task

Review the minimal guard-free candidate and the focused expiry comparison before separately authorizing a native build. Keep countdown cadence open and record device results separately from compilation.

---

## 2026-11-12 — Review and build timer-only rest

**Status** — Exactly one [timer-only preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/f55d4dff-e9ef-475d-ad7e-9f501a7e65db) submitted and monitored to **FINISHED**. Native compilation and signing Passed. Installation, upgrade preservation, timer-only rest/automatic expiry/Skip/final-summary checks remain **Not run**.

- Read current instructions/project/handoff/latest log/proof and inspected Git. Preserved all 15 existing unstaged files on baseline `ff627edc17102ad9fe50992a421a8ca5303fc42d`; no commit or push. Reviewed the system staleDate/isStale path, Skip persistence/failure handling, final-rest summary, and serialized foreground repair. Current state and rest deadline are published together after commit; stale actions cannot publish an earlier snapshot over a newer action through this coordinator gate.
- Added one narrow presentation safeguard in ProofWidget.swift: an unskipped current deadline in the future keeps rest visible even when context.isStale is true. Older expiry metadata alone cannot expose newer-rest controls. The date comparison is a render-time safety gate, not a timer, delayed task, or guaranteed redraw. System staleness remains the supported transition mechanism, with actual timing/reliability still requiring device evidence. Rechecked official Apple staleDate, isStale, and update documentation linked in the proof assessment.
- Skip still commits before clearing the rest presentation; failed writes retain the deadline and retry UI. Final rest precedes Planned sets recorded. Foreground read repairs mismatching activity state/deadline under the same action gate, never resets/reseeds drafts, and skips identical publications. No storage, SQL/migration, saved deadline, completed-record, action-guard, identifier, dependency, or signing changes.
- Local checks Passed: all 19 production-SQL tests through a separate JS migration/transaction wrapper, TypeScript, eight exact regenerated host/shared/extension source/resource copies, local Markdown links/anchors, and working/staged whitespace. SQL-wrapper tests do not execute Swift or ActivityKit; no Windows check proves device rendering.
- Fresh EAS archive contained exactly 15 required files including nested sources and package-lock.json, all SHA-256 hashes matching local source. Reviewed allowlist/content; no credentials, signing/device files, dependencies, generated artifacts, tests/docs, private records, or unrelated files included. Manifest saved outside the repository. Relative to previous f8955622-dd9c-4e10-8eac-39c120a55890 upload, only ProofCoordinator.swift and ProofWidget.swift differ. Relative to base, uploaded changes remain App.tsx and native/ProofActivity.swift, ProofCoordinator.swift, ProofIntents.swift, ProofSQL.json, ProofStore.swift, ProofWidget.swift. EAS No VCS mode does not attach the base commit; independently checked hashes identify submitted source.
- Verified Free allowance before submission: 4/15 iOS builds used, zero overage. Both existing active/unexpired ad hoc profiles included the same registered phone, with unexpired certificate. Reused existing Expo project and frozen signing credentials under proof-directory isolation. Exactly one build command submitted; no automatic retry, credentials/plan change, paid overage, or App Store submission.
- Build `f55d4dff-e9ef-475d-ad7e-9f501a7e65db` finished at 2026-11-12T18:00:02.001Z. Xcode reports ARCHIVE SUCCEEDED, zero compiler errors; reviewed widget/coordinator source appears in the native build. An IPA is available. App and extension remain 1.0.0 (1), so that version alone does not identify this upload. Native compilation/signing Passed separately from all unrun installation/migration/transition device trials.
- Refreshed handoff, current status, and upgrade-first checklist. Preserve prior user-reported evidence exactly; this build adds no phone result. Capture values/counts/rest before installation, install over existing data, then test untouched expiry, separate Skip, a newer rest after an expired one, and final summary. Timer zero alone is not a pass; note transition delay. Historical entries and personal learning reflections preserved.

- Final audit: 66 local Markdown links/anchors and working/staged whitespace Passed; all 15 submitted source hashes still match the inspected archive. Post-build usage remains Free, now 5/15 iOS builds used, zero overage. Only ProofWidget.swift and six status documents changed in this review/build task; previous log bytes, reflections, and all other existing work are preserved. Nothing staged; HEAD unchanged.

### What I learned — user-written

### Next small task

Install the successful timer-only preview without deleting/resetting first, compare captured data, then perform the bounded untouched-expiry/Skip/final-summary checklist. Report each result separately; do not automatically submit another build.

---

## 2026-11-12 — Prepare timer-only rest and system-driven expiry presentation

**Status** — Bounded presentation patch implemented locally, preserving uncommitted three-set work. Native compilation and all timer-only device checks **Not run**. Supported system mechanism researched; actual switch timing/reliability unverified.

- Read current instructions/project/handoff/feasibility/proof documents and inspected Git. HEAD remains `ff627edc17102ad9fe50992a421a8ca5303fc42d`; preserved all existing uncommitted changes. Adopted timer-only rest supersedes showing/editing the next draft during rest. Show only countdown/Skip; after Skip or natural expiry reveal the stored next draft/controls without another tap or app opening. After the final rest show Planned sets recorded, with no fourth set or automatic exercise finish.
- Recorded precisely the latest supplied evidence: user-described before/after screenshots show 40 lb × 10, one saved record, two completion requests, and expired rest preserved through this upgrade. Screenshots were not independently inspected in this task. The old exact deadline was not visible, so exact deadline preservation remains unverified. Earlier upgrade attempts remain inconclusive; no full migration/recovery pass is inferred.
- Recorded next draft 50 lb × 8 appearing during rest and early Complete displaying “Rest active—wait or skip” while leaving one saved record as Passed — user-reported on the earlier three-set UI. The former presentation is now superseded. Remaining three-set trials, full three-record completion, and all new timer-only tests are not marked passed. Earlier blackout cause remains unconfirmed, no fix claimed.
- Assessed current official Apple documentation before editing: ActivityContent.staleDate, ActivityViewContext.isStale, the ActivityKit display guide, and WWDC23's explicit description of system rendering of the stale view. This establishes a supported system-driven alternate presentation beyond a timer label reaching zero; it does not supply an independently measured exact-time guarantee. Sources and limitations are in the [proof assessment](../proofs/lock-screen/README.md#automatic-expiry-assessment--official-evidence-and-limits).
- Only new application edits this task: ProofWidget.swift and ProofCoordinator.swift. Attach the stored unskipped deadline as staleDate for every activity publication; use context.isStale to select countdown/Skip versus the saved draft or final summary. Retain the date even if already past. A failed Skip/save publication preserves this transition date instead of clearing it; active-rest failure offers Retry Skip rest without falsely showing success. Skip clears it after durable saving. The Dynamic Island follows the same phase and no longer displays next-draft values during rest.
- Found an upgrade-only metadata edge: old activities have nil staleDate. Ordinary foreground read now takes the coordinator gate and resyncs a mismatching activity state/staleDate from the saved snapshot, even for an expired/final card, without resetting or reseeding data. Equal content is not republished on every foreground poll. Normal upgrade/reopen can establish metadata; after Complete, the expiry test still requires no further tap/app opening and depends on the system stale transition, not this read path.
- The transition only changes rendered content: no default reload, rest mutation at zero, background timer, delayed task, TimelineView schedule, Date.now refresh assumption, APNs/backend, or wake/keep-awake workaround. Existing plan/draft/actual storage, atomic commits, saved deadlines, native rest gate, stale/duplicate IDs, migration, reset, fixture limits, and identifiers are unchanged.
- Re-ran all 19 production-SQL wrapper tests and TypeScript; passed. SQL-wrapper tests do not execute Swift or system rendering; edit-during-rest storage coverage remains useful for preserving previously edited drafts, not an offered new rest UI. Regenerated ignored native configuration and verified exact host/extension source copies; no native compile or render check. The earlier f8955622-dd9c-4e10-8eac-39c120a55890 native pass does not compile this later patch.
- Updated adopted requirements, dated decision log, limited evidence, and checklist. First future device proof is one untouched 20-second expiry without tap/app opening; record delay and screen state, not merely timer zero. Use a separate Skip interval, preserve existing edited drafts, then test final-rest summary. Screen-off/wake and reduced-luminance cases are separate. If automatic switching fails/delays, diagnose that case before adding infrastructure; an extra Resume tap is not an adopted substitute.
- Final checks passed: 59 local Markdown links/anchors, working/staged whitespace, exact task delta of two Swift files plus six status documents, and every previous build-log byte/reflection preserved. All storage/SQL/migration/intent/default/test/App/config/dependency and learning/discovery files remain byte-identical to task start. Existing 15 modified files remain unstaged; HEAD unchanged. Re-ran the 19 SQL-wrapper tests and TypeScript after the foreground metadata-resync adjustment, and regenerated matching native copies; still no Swift compile or device execution.
- No source upload, cloud build, dependency upgrade, commit, push, new exercise, fourth set, or automatic finish. Historical entries and personal learning reflections preserved. Production framework remains open.

### What I learned — user-written

### Next small task

Review this timer-only/system-staleness patch before separately authorizing native compilation and the [minimal untouched-expiry device proof](../proofs/lock-screen/README.md#three-set-device-checklist--all-not-run). Do not build automatically or mark the new transition passed without device evidence.

---

## 2026-11-12 — Review and build the three-set proof

**Status** — Exactly one three-set preview submitted; **FINISHED**. Native compilation and signing Passed. Installation, migration of the installed database, and every new three-set device check are **Not run**.

- Read the instructions, handoff, project plan, latest log, and proof guide; preserved the existing 15 modified files on baseline `ff627edc17102ad9fe50992a421a8ca5303fc42d`. Reviewed atomic completion/rest/advancement, independent planned defaults, draft-only edits, saved-deadline/skip gating after the write lock, stale/duplicate IDs, expiry without a callback/view refresh, rerunnable legacy migration, and exactly three records without automatic finish. No blocking issue or needed source correction identified; no application source edited in this task.
- Re-ran all 19 file-backed production-SQL wrapper tests and TypeScript; passed. These tests execute production SQL with a separate JavaScript transaction/migration/snapshot wrapper, not Swift or ActivityKit. Generated host/shared/extension source copies and target membership matched the prepared source; inspection alone is not native compilation.
- Fresh EAS upload archive: exactly 15 required files, including nested module/native/plugin files and package-lock.json. SHA-256 hashes matched local source; no credentials, signing/device identifiers, dependencies, generated artifacts, tests/docs, or unrelated files included. Source/lockfile/configuration were preserved throughout review.
- Independently rechecked both active, unexpired ad hoc profiles/certificate; each profile includes the same registered phone. EAS reported Free, 3 of 15 iOS builds used, zero overage before submission. Reused the existing Expo project and frozen signing credentials with proof-directory isolation; no new registration, credential, or paid-plan change.
- Submitted exactly one [three-set preview f8955622-dd9c-4e10-8eac-39c120a55890](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/f8955622-dd9c-4e10-8eac-39c120a55890) and monitored its final **FINISHED** result. Xcode log reports `ARCHIVE SUCCEEDED`, zero compiler errors, and includes ProofStore.swift, ProofIntents.swift, and ProofWidget.swift. EAS produced an IPA. Native compilation/signing Passed; app and extension remain 1.0.0 (1). Build completion timestamp: 2026-11-12T07:33:52.387Z. No retry.
- Submitted source: baseline above plus the prepared changes in App.tsx and native/ProofActivity.swift, ProofCoordinator.swift, ProofIntents.swift, ProofSQL.json, ProofStore.swift, and ProofWidget.swift. The other eight required upload files, including dependency lockfile/configuration, remain unchanged from the baseline. EAS No VCS mode does not attach a source commit; independently checked base, file list, and SHA-256 manifest identify the source. Existing tests/docs remain local and excluded from upload.
- Refreshed current status and the upgrade-first checklist. Capture existing values/counts/rest BEFORE installation, install over the existing app without deleting/resetting, close/reopen and compare the migrated old record under Set 1 plus counts/deadline/skip. New Set 2/3 drafts are expected; active rest may naturally expire during installation. Only after recording preservation, deliberately reset for fresh three-set tests.
- Prepared the six-step phone checklist covering independent defaults, actual values, draft edits during rest, blocked early Complete, Skip without completion, natural expiry without app-opening, duplicate/stale taps, no fourth set/automatic finish, and compact authenticated Lock Screen controls. All new phone checks remain Not run. Earlier user-reported one-set/rest/background-resume results remain attached to the existing proof and do not pass the three-set trial. Prior upgrade preservation stays inconclusive; blackout cause unconfirmed, no fix claimed.
- Final checks passed: 56 local Markdown links/anchors, working-tree/staged whitespace, all 15 uploaded source/archive hashes still matching, and every historical build-log byte/reflection preserved. Only six status documents changed in this task; all application source is unchanged and the existing 15 modified files remain unstaged at the same HEAD. Post-build account check still reports Free, 4/15 iOS builds used, zero overage cost.
- No additional features, source correction, automatic retry, commit, push, or App Store submission. Historical entries and personal learning reflections preserved.

### What I learned — user-written

### Next small task

Install the successful preview using the [upgrade-first checklist](../proofs/lock-screen/README.md#three-set-device-checklist--all-not-run), record migration preservation before any reset, then perform the fresh three-set trial.

---

## 2026-11-11 — Prepare the bounded three-set proof

**Status** — Implemented locally on published baseline `ff627edc17102ad9fe50992a421a8ca5303fc42d`. Nineteen production-SQL wrapper tests and Windows integration checks passed. New native compilation, installed migration, and all three-set device checks **Not run**.

- Recorded latest existing-proof observation: ordinary active-rest background/resume **Passed — user-reported**; remaining time accurate and saved values/counts unchanged. This does not pass force-quit, system termination, upgrades, or any new three-set trial. Older rest/compact functional/layout passes remain scoped to their builds; prior upgrade preservation is inconclusive and blackout cause unconfirmed.
- Started clean at the supplied baseline. Implemented exactly three fictional planned sets: 40 lb × 8, 50 lb × 8, 45 lb × 10; each completion starts 20-second test rest. Each next draft gets its own plan rather than copying the prior actual values. Plan columns stay separate from editable draft/frozen completed values.
- Native SQLite completion requires the first unfinished set, explicit session/set/active-rest IDs, and actual deadline/skip eligibility after taking the write lock. It commits actual completion, a unique rest row, and the active-rest pointer together before ActivityKit publishes the next draft. Duplicate/stale Complete cannot save the next set; old Skip cannot cancel later rest. Diagnostic Complete counters can increase for rejected requests addressed to an existing set.
- Draft weight/rep edits remain available during rest and cannot change plan, completed values, or the rest deadline. Fixture-only increments/limits: ±5 lb within 0–200, ±1 rep within 0–30, enforced in native SQL. These do not select production validation settings. Skip never completes a set. Complete stays tappable while rest runs, with a native rejection notice; after actual expiry the same IDs can succeed without a zero-time callback or view refresh.
- Added transactional version-2 session/set/rest tables and one-time import of installed legacy data, preserving original IDs, actual values, completion count, and existing deadline/skip. Legacy completed sets get no invented deadline; sets 2/3 get independent defaults. The legacy row stays intact as migration evidence, not an extra displayed record. Read snapshots restore the current draft/rest consistently. Deliberate confirmed reset clears only fictional legacy/versioned proof rows and ends the activities.
- Kept compatible ActivityAttributes and optional new state fields; live action IDs now belong to content state rather than the immutable original set attribute. An older decoded card is read-only until the in-app Show Live Activity refreshes IDs, before starting a new trial. New Lock Screen controls are weight/rep minus/plus, Complete, and Skip. Final state says Planned sets recorded; no fourth set or exercise-finished transition. No Add Set, Finish Exercise, routine editor, RIR, notifications, or extra exercise.
- Nineteen file-backed production-SQL tests passed through a separate JS migration/transaction/snapshot wrapper: defaults/advancement, edits during rest, early/forged gate rejection, exact expiry, Skip, overlapping and stale/future actions, three separate records, recovery, reset, commit/save rollback/retry, old draft/completed/active/skipped/expired data, and failed/partial migration. An initial test-wrapper parameter parser incorrectly read colons in SQL literals; corrected that wrapper and reran successfully. These tests do not execute Swift or ActivityKit.
- TypeScript and local iOS JavaScript export passed. Regenerated ignored iOS configuration and inspected exact host/shared/extension source copies and membership; no CocoaPods/native compile. Rechecked official Apple intent parameter/interactivity and bounded timer guidance. Generated inspection and TypeScript are not native compilation or rendered layout evidence.
- Updated current project decisions, proof guide, evidence boundaries, and six-step device checklist. Relaxed the stale one-set wording in AGENTS.md without changing product rules. Preserve installed data before any later fresh-fixture reset. Native compilation/signing, actual installed migration, authenticated three-set interactions, and compact fit remain Not run.
- Final review passed 55 local Markdown file/anchor links and working-tree/staged whitespace. Verified the exact 15-file change inventory, unchanged dependencies/configuration/identifiers and learning/discovery documents, original legacy schema/rest migrations, and every prior build-log byte/reflection. HEAD remains the supplied baseline and nothing is staged.
- No dependency upgrade, production framework decision, source upload, cloud build, commit, push, or paid action. Historical entries and learning reflections preserved.

### What I learned — user-written

### Next small task

Review the three-set native source, identity/deadline gate, migration, and [device checklist](../proofs/lock-screen/README.md#three-set-device-checklist--all-not-run) before separately authorizing one preview build. Do not build automatically.

---

## 2026-11-11 — Review the rest milestone for publication

**Status** — Compact layout results recorded as **Passed — user-reported**. Accumulated rest implementation reviewed for the authorized commit and normal push; Git history and the session report identify the final commit/publication result. No new features or build.

- For build `cacac282-0ac2-43d5-9c66-70ebd3479ae6`, recorded draft, active-rest, zero, and skipped layouts as **Passed — user-reported**. The user reports text/buttons fit without clipping and controls remain reachable. These observations were not independently observed and do not imply every functional test was repeated on this build.
- Preserved the five earlier rest/Skip functional passes for build `aec6ed60-6c49-4883-9f53-9f3513ae4333` separately. Compact-upgrade preservation remains inconclusive because before-values were not recorded; original upgrade preservation is also inconclusive after the possible earlier reset. Earlier blackout cause remains unconfirmed and no fix is claimed.
- Reviewed the full accumulated source diff from baseline `73b277dee50af3286380084a49b3f071dd111b97`: atomic first completion/deadline, no restart on duplicates, commit-before-display Skip with stale/expiry guards, additive migration without retroactive rest, retry/rollback handling, bounded native countdown, reset, Foundation imports, foreground readout, and compact controls retaining duplicate testing. No blocking source defect found and no application source edited in this task.
- Re-ran all nine production-SQL/migration tests through the separate JavaScript wrapper and TypeScript; passed. The SQL-wrapper tests do not execute Swift or ActivityKit. All 15 application/configuration hashes still match the previously successful compact-build manifest. Native compilation/signing evidence belongs to that earlier build; no new native build or independent device check ran here.
- Reviewed the intended 14-file publication inventory: six Markdown documents, seven application-source files, and the persistence test. Dependencies/lockfile remain unchanged and already tracked. Reviewed ignore rules and publication contents; no credentials, signing files, device identifiers, generated artifacts, screenshots, or private records are included. Historical build-log diff is additive; existing reflections preserved.
- Fresh read-only remote refs returned exit 0 and remote main matched the baseline before publication. Restricted staging/commit to the reviewed milestone; normal push only, no history integration or force push. Commit message: `Add rest countdown and compact Lock Screen controls`. Exact Git outcome is reported in the session after execution.
- Refreshed current status and handoff. Next recommendation: plan one bounded active-rest background/resume recovery trial with before/after evidence, keeping system termination and user force-quit separate and unrun. No additional features, cloud build, or App Store submission.
- Final review checks passed: 51 local Markdown links/anchors, working-tree whitespace, unchanged application-source hashes, and every pre-existing build-log byte/reflection preserved. Staged contents and whitespace are checked again before the authorized commit.

### What I learned — user-written

### Next small task

Plan the active-rest background/resume recovery check on the existing proof; capture values/counts/time before and after, without inferring upgrade preservation from the layout pass.

---

## 2026-11-11 — Record rest results and build the compact layout

**Status** — Exactly one compact preview submitted; **FINISHED**. Native compilation and signing Passed. New upgrade/layout/device checks **Not run**. Original upgrade preservation remains inconclusive; blackout cause unconfirmed.

- Recorded the user's five named passes for installed build `aec6ed60-6c49-4883-9f53-9f3513ae4333`: rest starts on completion; duplicate Complete does not restart it; zero holds; Skip stops rest while the authenticated Lock Screen stays visible; Skipped remains saved after closing/reopening. All are **Passed — user-reported**, not independently observed or transferred to the new layout build.
- Recorded the display comparison accurately: screen went black within five seconds without tapping; a later duplicate-Complete comparison stayed visible. The original immediate blackout was not reproduced in that comparison. Cause remains unconfirmed; no fix or keep-awake capability claimed. Authentication-during-action comparison C has no reported result. Original upgrade preservation stays inconclusive because an earlier reset may have occurred.
- Reviewed the prepared compact layout against the successful rest upload: only `native/ProofWidget.swift` differs. The other 14 archive files, including storage/SQL, timer calculation, intents/authentication, configuration, identifiers, dependencies, and lockfile, are unchanged. Bounded timer, duplicate Complete access, stable intent IDs, and expiry-safe Skip behavior remain. No application source edited in this task; all existing local work preserved.
- Nine production-SQL/migration tests through the separate JavaScript wrapper and TypeScript passed again. These do not execute Swift. The generated widget source still matches the prepared source. Fresh local EAS archive contained exactly 15 required files, including nested module/native/plugin sources and package-lock.json; SHA-256 hashes matched local source. No credentials, signing/device files, dependencies, generated artifacts, or unrelated files were included.
- Rechecked existing active ad hoc profiles: both include the same registered phone and profiles/certificate are unexpired. EAS reported Free, 2 of 15 iOS builds used and zero overage before submission. Used directory-scoped isolation and frozen credentials for the existing Expo project; no credential or paid-plan change.
- Uploaded/submitted exactly one [compact preview cacac282-0ac2-43d5-9c66-70ebd3479ae6](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/cacac282-0ac2-43d5-9c66-70ebd3479ae6), monitored to **FINISHED**. Its Xcode log reports `ARCHIVE SUCCEEDED`, includes ProofWidget.swift, and contains zero compiler errors; EAS produced an IPA. Native compilation and signing Passed. App/extension version remains 1.0.0 (1). No automatic retry.
- Source base: `73b277dee50af3286380084a49b3f071dd111b97` plus the existing local rest changes in App.tsx and native/ProofActivity.swift, ProofCoordinator.swift, ProofIntents.swift, ProofSQL.json, ProofStore.swift, and ProofWidget.swift, including the earlier Foundation imports and prepared compact widget. Relative to the installed rest build, only the widget presentation differs. EAS No VCS mode does not attach a Git commit; the independently checked base and exact local manifest identify the submitted source. Tests and documentation were excluded from upload.
- Updated the next task to snapshot actual current values/counts/Skipped, install over the existing app without deleting/resetting, close/reopen to verify preservation, and only then perform deliberate fresh draft/rest/zero/skipped layout trials. Later comparison taps mean the earlier six-request snapshot may no longer be current. New upgrade/layout/device checks remain Not run; compilation is not evidence that clipping or blackout is fixed.
- Final checks passed: 52 local Markdown links/anchors, working-tree/staged whitespace, all 15 submitted source/archive hashes still matching, and every historical build-log byte/reflection preserved. Only six status documents changed during this task; no application files changed. Existing 14 modified files remain unstaged at the same HEAD.
- No new features, App Store submission, commit, or push. Historical entries and user-written learning reflections preserved.

### What I learned — user-written

### Next small task

Perform the [compact upgrade/device checklist](../proofs/lock-screen/README.md#compact-layout-upgradedevice-checklist--not-run), preserving the existing data before any fresh-data reset.

---

## 2026-11-11 — Investigate black display and compact the rest card

**Status** — Limited relaunch/countdown observations Passed — user-reported. Black-screen cause unknown. Compact layout prepared locally; its native compilation and physical-device checks are **Not run**. Skip persistence Not run; original upgrade preservation inconclusive.

- Read current instructions and project documents; preserved pre-existing work on baseline `73b277dee50af3286380084a49b3f071dd111b97`. The user reports closing/reopening revealed the Rest row without changing the existing 40 lb × 9 record, one saved record, or six requests. On a fresh trial, countdown started, duplicate Complete did not restart it, and zero held. Marked only those observations Passed — user-reported, not independently observed. The user also reports immediate black display after Complete until a wake tap, clipped title/bottom controls, and Skip/Complete still visible at zero. No new screenshot or runtime trace was independently captured in this task.
- Traced Complete: stable IDs → locally authenticated background LiveActivityIntent → serialized coordinator → SQLite commit of set/deadline → update the existing matching activity → return. The Complete path neither requests nor ends/recreates an activity, resets data, opens a URL/foreground continuation, nor controls display sleep. Creation occurs only in Start, dismissal only in Reset. Static trace cannot rule out an OS/process/display event at runtime.
- Reviewed current official Apple guidance linked in the [proof diagnosis](../proofs/lock-screen/README.md#complete-trace-and-black-screen-comparison): app-process/background intent execution, local authentication, optional activity alerts, system-managed Always-On rendering, and Live Activity dimensions/margins. These do not establish the black-screen cause or a keep-awake guarantee. Added no alert, keep-awake workaround, or instrumentation.
- Only new application-source edit this task: native/ProofWidget.swift. Replaced the tall stack with three rows: title/status, values/rest, and controls. Uses 14-point margins, 6-point row spacing, single-line labels with limited scaling, 44-point-minimum button labels, and the same emphasized monospaced bounded countdown. Intended to fit Apple's 84–160-point Lock Screen guidance; actual SwiftUI dimensions, accessibility sizes, and clipping are not verified on Windows.
- Kept Complete available for duplicate-request tests. Skip remains available when a deadline exists and no skip is saved, including at zero; the unchanged SQL safely rejects expired requests. No exact-zero callback or view refresh is assumed. Storage, timer/deadline calculation, App Intents/authentication, identifiers, dependencies, signing configuration, and Dynamic Island content are unchanged.
- Nine existing production-SQL/migration tests through a separate JavaScript wrapper and TypeScript passed. The tests do not execute Swift. Regenerated the ignored iOS configuration and verified the generated widget exactly matches source and belongs only to the Live Activity extension. No CocoaPods/native compile, rendered layout check, installation, or physical-device comparison ran for this patch. Earlier successful rest preview aec6ed60-6c49-4883-9f53-9f3513ae4333 does not compile or test this later layout.
- Proposed a short no-reset comparison on the existing completed set: A no tap after Face ID; B duplicate Complete after Face ID; C Complete with Face ID during the action. Keep settings/position constant and record padlock, time to darkness, whole display versus activity-only black, wake result, and foreground transitions. Comparison Complete taps intentionally increment requests without changing set values or restarting rest. These comparisons remain Not run; any association is not yet a causal finding.
- Updated current evidence/status, retained legacy Markdown anchors, and kept original upgrade preservation inconclusive after the possible earlier reset. Do not delete or reset for the next comparison. Skip persistence remains a separate unrun fresh trial. No cloud upload/build, commit, push, or additional features.
- Final checks passed: 51 local Markdown file/anchor links, working-tree/staged whitespace, all prior build-log bytes/reflections preserved, and task-start hashes confirming every application file except ProofWidget.swift is unchanged. No extra tests were added for the reversible presentation change.

### What I learned — user-written

### Next small task

Perform and record the installed-proof [A/B/C display comparison](../proofs/lock-screen/README.md#complete-trace-and-black-screen-comparison) without deleting or resetting data. Review the compact patch before separately authorizing a native build.

---

## 2026-11-11 — Build the corrected Foundation imports

**Status** — Exactly one corrected rest preview submitted in this task; **FINISHED**. Corrected native compilation and signing passed. Upgrade migration, installation, and all rest device tests are **Not run**.

- Read the current instructions, handoff, project status, latest log, and proof README. Preserved the existing 14 modified files and all historical entries/reflections. Local HEAD remains `73b277dee50af3286380084a49b3f071dd111b97`; nothing staged, committed, or pushed.
- Compared all 15 upload files with the recorded manifest for failed build `d3568ab8-654b-49cf-a0ee-d43bfe91497f`. The only subsequent source corrections are one `import Foundation` line in each of `native/ProofActivity.swift` and `native/ProofCoordinator.swift`. Removing those lines reproduces the failed upload's hashes; no behavior, dependency, identifier, or signing configuration change.
- Verified generated source copies and Xcode source-phase membership: ProofActivity.swift with Foundation belongs to both the app and extension; ProofCoordinator.swift with Foundation belongs to the app only. Windows inspection is not a Swift compile.
- Re-ran nine production-SQL/migration tests through the separate JavaScript wrapper and TypeScript; passed. The wrapper tests do not execute Swift, App Intents, or the native renderer. Fresh local archive contained exactly the 15 required files, including nested native/module/plugin sources and package-lock.json; every SHA-256 matched local source. No secrets, signing files, device identifiers, dependencies, generated artifacts, or unrelated repository files were included.
- Independently rechecked both active, unexpired ad hoc profiles and certificate: each profile includes the same registered phone. EAS reported Free, 1 of 15 iOS builds used and zero overage cost before submission. Reused the existing project and frozen credentials without changing plans or credentials.
- Uploaded and submitted exactly one corrected preview: [aec6ed60-6c49-4883-9f53-9f3513ae4333](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/aec6ed60-6c49-4883-9f53-9f3513ae4333). Monitored to **FINISHED**. Downloaded its Xcode log to a temporary directory outside the repository; it reports `ARCHIVE SUCCEEDED`, zero compiler errors, and neither the Date error nor the old ExpoModulesCore ambiguity. EAS produced an installable IPA. Corrected native compilation and signing passed.
- Exact uploaded source: base commit above plus the local rest changes in App.tsx, native/ProofActivity.swift, native/ProofCoordinator.swift, native/ProofIntents.swift, native/ProofSQL.json, native/ProofStore.swift, and native/ProofWidget.swift, including the two Foundation imports. The other eight archive files, including the dependency lockfile, remain unchanged from the failed upload. No VCS mode does not attach a source commit; the base, file list, and locally verified hashes identify the source. Tests and documentation were excluded from upload.
- Updated current status and the upgrade-first checklist: install over the existing proof without deleting/resetting, verify the existing record survives without retroactive rest, then use separate fresh expiry and Skip trials, each retaining +1 once and Complete twice. No migration, installation, or rest device trial has been performed or marked passed.
- Final documentation checks passed: 47 local Markdown file/anchor links and working-tree/staged whitespace. Verified all prior build-log bytes/reflections unchanged and all 15 uploaded application/configuration files still matching local source.
- No automatic retry, additional features, App Store submission, commit, or push. Personal learning reflections remain blank for the user.

### What I learned — user-written

### Next small task

Install the corrected preview over the existing proof and record legacy-record preservation before any reset; then perform the separate natural-expiry and Skip trials in the [device checklist](../proofs/lock-screen/README.md#rest-device-checklist--all-not-run).

---

## 2026-11-11 — Review and attempt the rest preview build

**Status** — Exactly one rest preview submitted in this task; final status **ERRORED**. Two narrow Foundation import corrections are prepared locally but were not uploaded or compiled.

- Reviewed atomic set/deadline completion, stable deadlines on duplicate Complete, commit-before-display Skip, expiry/stale-ID guards, additive migration without retroactive rest, bounded native countdown, and reset. No blocking issue was identified before submission; the review missed the Foundation imports later required by Xcode.
- Re-ran all nine production-SQL/migration tests through the separate JavaScript wrapper and TypeScript; passed. These do not execute the Swift migration or native renderer. Both existing active ad hoc profiles independently verified with the same registered phone and unexpired certificate/profiles.
- EAS reported the Free plan, 1 of 15 iOS builds used, and no overage charges before submission. Reused credentials with freeze-credentials; no revocation or paid-plan change.
- Fresh pre-build archive: exact 15 required files and dependency lockfile; SHA-256 hashes matched local source, with no secrets, signing/device files, dependencies, generated artifacts, or unrelated repository files.
- Base commit: `73b277dee50af3286380084a49b3f071dd111b97`. Included local application changes: `App.tsx` (rest readout), `native/ProofSQL.json` and `native/ProofStore.swift` (migration, atomic deadlines, guarded skip and expiry reads), `native/ProofCoordinator.swift` (native mutation/publication), `native/ProofActivity.swift` (optional rest dates), `native/ProofIntents.swift` (Skip intent), and `native/ProofWidget.swift` (bounded countdown and Skip button). Tests and documentation were excluded. No dependency or identifier changes.
- Uploaded once and monitored [rest preview d3568ab8-654b-49cf-a0ee-d43bfe91497f](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/d3568ab8-654b-49cf-a0ee-d43bfe91497f) to **ERRORED**, `XCODE_BUILD_ERROR`. Earliest compiler error: generated extension `ios/SwoldierProofLiveActivity/ProofActivity.swift:8:27`, `cannot find type 'Date' in scope`. The old ExpoModulesCore ambiguity is absent.
- Applied the narrow post-failure correction: `import Foundation` in source-owned `native/ProofActivity.swift` and `native/ProofCoordinator.swift`, both of which directly use Date. No behavior change. These two lines were **not included in the failed build**. Regenerated source copies and a fresh local 15-file archive matched the corrected source; the only differences from the uploaded application are these two import lines.
- After correction, nine SQL-wrapper tests and TypeScript passed again. Corrected native compilation is pending. Migration on the actual installed database, upgrade installation, and all rest device trials are **Not run**.
- Updated the device checklist to install a future successful build over the existing proof without deleting/resetting first, verify record preservation, then use separate fresh natural-expiry and Skip trials with the original +1/duplicate-Complete regression.
- Final documentation checks: 46 local Markdown file/anchor links passed across the six affected documents, working-tree/staged whitespace checks passed, and every pre-existing build-log byte (including reflections) was verified preserved.
- No second build, App Store submission, commit, or push. Historical entries and learning reflections preserved.

### What I learned — user-written

### Next small task

Review the two Foundation imports and separately authorize one native preview build. Do not retry automatically. After a successful build, perform the upgrade-first device checklist.

---

## 2026-11-11 — Prepare the 20-second rest and Skip rest extension

**Status** — Implemented local source on published baseline `73b277dee50af3286380084a49b3f071dd111b97`. New native compilation and device trials are **Not run**. The earlier one-set pass remains user-reported for its original build.

- First completion now commits one set and a 20-second absolute deadline together. Repeated completion preserves that deadline and any skip while retaining the completion-request counter. Native mutation time is sampled after acquiring the write lock.
- Added a background, locally authenticated Skip rest intent. It commits an early-end timestamp before publishing ActivityKit state. Repeated, expired, pre-completion, and stale-ID skips are harmless; save failures show retry without claiming success.
- The Live Activity uses Apple's bounded system timer format, available below the unchanged iOS 26 minimum. Reopening derives running, expired, skipped, or not-started state from SQLite. No continuous JavaScript execution or exact-zero background callback is needed.
- Added transactional, additive migration of two nullable rest columns. Existing drafts and completed records are preserved; completed legacy records get no retroactive rest. Reset clears rest with the fictional set and ends the activity.
- Nine production-SQL/migration tests through a separate JavaScript wrapper passed, as did TypeScript. These tests do not execute Swift. Local JavaScript export and generated app/extension source/configuration inspection passed; CocoaPods integration, Xcode compilation, installation, and all rest device trials are Not run.
- Final review passed 52 local Markdown links and git diff --check; historical entries/reflections and the original installed schema were checked unchanged. Kept dependencies, identifiers, signing configuration, production framework status, and the one-set boundary unchanged. Prepared the [new device checklist](../proofs/lock-screen/README.md#rest-device-checklist--all-not-run). No cloud upload/build, commit, or push.

### What I learned — user-written

### Next small task

Review the local rest source and separately authorize one native preview build; then perform the rest/Skip rest checklist.

---

## 2026-11-11 — Record the user-reported first iPhone proof

**Status** — Installation and the guided one-set sequence are **Passed — user-reported**, not independently observed, for EAS build `2a692799-0280-4f0c-b7f7-1f65b65c1149`.

- The user reports Face ID authentication with the Lock Screen remaining visible. The +1 rep action and both Complete taps did not open the foreground app.
- The user reports that deliberately reopening showed 40 lb × 9 reps, one saved record, and two received completion requests. This is limited to the guided sequence; no independent device observation or instrumented trace is claimed.
- Kept reset, post-completion edits, rapid-tap stress testing, genuinely locked/widget comparisons, interruptions, system termination, force quit, rest, and all other device trials **Not run**. Production framework selection remains open.
- Refreshed the current status, proof results, and handoff, including stale summary statements in the repository README and learning/setup guide. Historical logs and personal learning reflections were preserved.
- Reviewed the existing source diff: only `import ExpoModulesCore` → `public import ExpoModulesCore` remains over base commit `7da44d93b1f6d47b42d2ce0d07120e03bb26c6f0`; no source was edited in this documentation task. Publication review includes the existing build/signing history and focused patch.
- Recommended the next bounded proof: completion starts one saved rest countdown and Skip rest works on the Face ID-authenticated visible Lock Screen, without opening the app. Use a short fictional interval; verify zero, skip persistence, and that repeated completion does not duplicate or restart rest. These are planned checks, not passed tests or implemented behavior.
- Review checks passed: 51 local Markdown links, git diff --check, unchanged one-line Swift patch, exact publication file inventory, and historical log/reflection preservation. Documentation only: no cloud build, source change, staging, commit, or push.

### What I learned — user-written

### Next small task

Review and publish this milestone when authorized, then separately scope the recommended rest/Skip rest proof. [Current handoff](HANDOFF.md)

---

## 2026-11-11 — Build the one-line Swift import patch

**Status** — The single authorized patched preview build **FINISHED** successfully. Native compilation and signing passed. Installation and device tests are **Not run**.

- Base source commit: `7da44d93b1f6d47b42d2ce0d07120e03bb26c6f0`. Verified the only proof source change is `import ExpoModulesCore` → `public import ExpoModulesCore` in `modules/LockScreenProofModule.swift`. All other local changes are session documentation excluded from the upload. EAS No VCS mode does not attach a Git commit hash; this records the independently checked source base and exact patch.
- Rechecked the inspected archive's exact 15-file manifest and SHA-256 hashes against current source, including the corrected inline module and required nested source and lockfile.
- Reused the existing Expo project, registered phone, certificate, and both active ad hoc profiles. Independent checks again confirmed that each profile includes the same single phone and that the certificate and profiles are unexpired. Submitted with frozen credentials; no unnecessary signing changes, plan changes, identifiers, dependencies, or application behavior changes.
- Uploaded once and submitted exactly one preview in this task: [build 2a692799-0280-4f0c-b7f7-1f65b65c1149](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/2a692799-0280-4f0c-b7f7-1f65b65c1149). Monitored to **FINISHED**. The Xcode log includes the inline source, reports `ARCHIVE SUCCEEDED`, and contains no original ambiguous-import diagnostic. EAS produced an installable IPA.
- [Installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/2a692799-0280-4f0c-b7f7-1f65b65c1149): open in Safari on the registered iPhone and use Install. Successful compilation/signing does not establish runtime persistence or Lock Screen behavior.
- Device test still **Not run**: start 40 lb × 8 reps; allow Face ID while staying on the visible Lock Screen; tap +1 once and Complete twice; deliberately reopen and verify 40 lb × 9 reps, one saved record, and two received completion requests.
- Preserved prior local documentation and historical entries. No automatic retry, App Store submission, commit, or push.

### What I learned — user-written

### Next small task

Install the successful preview and perform the one-set device checklist, recording the result without private records or identifiers.

---

## 2026-11-11 — Prepare the focused Swift import patch

**Status** — One-line source patch prepared; native compilation pending. No upload or new cloud build.

- Inspected the failed build's full relevant Xcode diagnostics. The compiler identifies `modules/LockScreenProofModule.swift:1:8` and notes `internal import ExpoModulesCore` in the generated `ios/Pods/Target Support Files/Pods-SwoldierLockScreenProof/ExpoModulesProvider.swift:8:1`.
- Installed Expo 57.0.32 / expo-modules-autolinking 57.0.17 generates that internal import and registers the inline class directly. The inline source is synchronized into the main app target; CocoaPods adds the generated provider to that same app target. They compile in the app's Swift module, not separate Swift modules. The Live Activity extension is a separate target and does not include this inline module.
- Changed only `import ExpoModulesCore` to `public import ExpoModulesCore`. The original implicit import was public in the current Swift language mode; making it explicit removes the diagnosed ambiguity while preserving the existing public class and definition signatures. An internal import alone would require reviewing their visibility. Swift permits different explicit import levels across files in one module. [Swift SE-0409](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0409-access-level-on-imports.md) · [Expo inline targets](https://docs.expo.dev/modules/inline-modules-reference/)
- Kept all class/method declarations, bridge name, persistence, intents, Live Activity behavior, target identifiers, signing, dependencies, and production scope unchanged. No generated file or dependency was patched.
- Windows checks passed: TypeScript and all three existing file-backed SQL tests. These do not execute the Swift code. Regenerated native configuration in an ignored fixture and regenerated the provider with the installed SDK tooling: the class is still discovered, both explicit import levels are present, and the inline folder belongs only to the app target. CocoaPods integration and Swift compilation were not run locally.
- Generated a fresh archive-only inspection directory. It contains exactly the expected 15 proof files; all SHA-256 hashes match local source and the corrected inline module is included. No credentials, device/signing files, dependencies, generated artifacts, or unrelated repository files are present.
- Existing local documentation work and historical log entries were preserved. No upload, cloud build, commit, or push. Installation and all device tests remain **Not run**.

### What I learned — user-written

### Next small task

Review the one-line patch, then separately authorize one preview build to test native compilation. Signing remains configured; do not revoke credentials or resubmit automatically after a failure.

---

## 2026-11-11 — Submit the first signed preview build

**Status** — Apple access and two-target ad hoc signing verified. One preview build submitted; final status **ERRORED** in Xcode.

- Started clean on main at the published Expo-linking commit, `7da44d93b1f6d47b42d2ce0d07120e03bb26c6f0`. Corrected the handoff's stale uncommitted statement.
- EAS reported the Free plan with 0 of 15 monthly iOS builds used. The existing 15-file reviewed archive still matched published source.
- The user completed Apple login and two-factor authentication privately. The read-only Apple provisioning/certificate-list check succeeded. No credentials or device identifiers are recorded here.
- The registration command initially only produced a website link; its exit 0 did not establish phone registration. The user resolved a blank Safari page, installed the registration profile, and provided the registration-success screen.
- Completed credential setup privately. Independent Expo metadata checks verified active ad hoc profiles for both targets, each containing the same single registered phone, with unexpired profiles and distribution certificate. The user reused the same distribution certificate for both targets; no revocation was requested. No sensitive identifiers are recorded here.
- Uploaded the reviewed proof once and submitted [preview build 87687ca0-ead7-47ee-a7e8-d1174ba043e9](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/87687ca0-ead7-47ee-a7e8-d1174ba043e9). Source matches commit `7da44d93b1f6d47b42d2ce0d07120e03bb26c6f0`; only local session documentation changed and it was excluded from the 15-file upload. EAS has no Git commit hash because the build used the documented No VCS mode.
- Monitored that single submission to **ERRORED**, error code `XCODE_BUILD_ERROR`. The Xcode log points to `modules/LockScreenProofModule.swift:1:8`: `ambiguous implicit access level for import of 'ExpoModulesCore'; it is imported as 'internal' elsewhere`. No second submission or implementation change was made.
- Native compilation ran and failed. No installable artifact was produced. Installation and all workout/Lock Screen device tests remain **Not run**. No paid-plan change, App Store submission, commit, or push performed.

### What I learned — user-written

### Next small task

Investigate and align the inline module import and declaration visibility with SDK 57 internal-import rules. Run available local checks; obtain separate authorization before another cloud build.

---

## 2026-11-10 — Link the Expo proof and inspect its local archive

**Status** — Linked the existing proof to Expo and verified the corrected local archive. Apple Developer activation is pending according to the user.

- Started from a clean working tree on main at `937368810272c0180e14976dee5a3d263e3cc3ef`. Ran EAS CLI 27.7.2 from npm's cache without adding a project dependency.
- The user completed Expo browser login privately. CLI verification returned account `fgzmacaraeg`; created only [@fgzmacaraeg/swoldier-lock-screen-proof](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof). Initialization created the project but returned exit 1 because the dynamic config could not be written automatically. Added the returned project ID, `8b7ce1c7-0553-42b3-b7a3-e8b5a5ccce58`, to the existing app config; project-info verification then returned exit 0.
- Scoped `EAS_NO_VCS=1` and `EAS_PROJECT_ROOT` to the proof directory for EAS commands. Used only `build:inspect --platform ios --profile preview --stage archive`, with a new output directory under Windows temporary storage.
- The first archive command returned 0 but its contents failed inspection: it held seven top-level files and omitted eight required nested source files. Changed the three folder exceptions in `.easignore` to match bare directory paths used during traversal. Regenerated the archive and verified the exact 15-file proof-only manifest, dependency lockfile, and all 15 SHA-256 hashes against local source.
- Inspected the final archive for credentials, signing files, device identifiers, dependencies, generated artifacts, private records, and unrelated repository files; none were found. JavaScript syntax, resolved Expo project/identifier configuration, directory-level ignore checks, 47 local Markdown links, and git diff --check passed.
- The user reports membership payment is complete and activation is pending. No Apple team inspection, phone registration, signing configuration, source upload, cloud build, purchase, commit, or push was performed. Native compilation and device tests remain **Not run**.

### What I learned — user-written

### Next small task

After Apple activation, confirm the team is active before separately authorizing device registration or signing. [Current handoff](HANDOFF.md)

---

## 2026-11-10 — Review the first proof checkpoint for publication

**Status** — Reviewed the proof source and earlier unpublished feasibility plan. No material source defect was identified. Native and device behavior remains unverified.

- Re-ran the three file-backed SQLite tests, TypeScript, Expo dependency validation, and the iOS JavaScript export on Windows; all passed. Generated configuration inspection passed for both targets, source membership, embedding and dependency, app-only SQLite resource and link, Expo module registration, identifiers, entitlements, deployment targets, and plists.
- The tests execute the bundled production SQL using a separate JavaScript open/read/write and transaction wrapper. They do not execute the Swift store, coordinator serialization, intent dispatch, or success/failure display. Native compilation, CocoaPods integration, signing, installation, and all device checks are **Not run**.
- Reviewed stable session/set IDs, single-row completion, commit-before-success ordering, retryable failed transactions, and rejection of rep changes after completion. The extension only renders ActivityKit state; the app and native intents use the same app-local store without an App Group.
- Reviewed the publication manifest including source, dependency lockfile, and feasibility documentation. Dependencies, generated artifacts, signing material, credentials, device identifiers, and private records are excluded. Refreshed stale documentation pointers and made the SQL test limitation explicit.
- A successful read-only remote query returned exit 0 and found main at the starting local commit, `2b2b811f72ecb40c1dcd92a68fad5c913774d4eb`. This entry records the prepublication review; the commit and push result are verified separately through Git refs and the session report. No EAS upload, cloud build, account creation, or enrollment was performed.

### What I learned — user-written

### Next small task

When ready, confirm Expo account access and active Apple Developer Program membership before device registration or any source upload. [Current handoff](HANDOFF.md)

---

## 2026-11-10 — Implement the one-set Lock Screen proof

**Status** — Implemented the isolated [proof app](../proofs/lock-screen/README.md). Production framework selection remains open.

- The user reported iPhone 15 Pro, iOS 26.6.1 (23G83), and working Face ID. Apple’s published release and restore filename corroborated the version/build pairing. Set the minimum to iOS 26.0 for explicit background intents and selected the Expo SDK 57 hosted image for later.
- Added a 40 lb × 8 reps fixture, two Swift App Intents, and app-local SQLite. The database commits edits and completion before the card updates. A second completion updates only the proof’s request counter; late rep edits are ignored. The in-app screen can inspect and reset the fictional data.
- On Windows, Expo dependency validation, TypeScript, and an iOS JavaScript export passed. Three tests ran the bundled SQL in file-backed SQLite and passed: persistence and two overlapping completions, reset and stale IDs, and rollback after a blocked commit.
- Standard Expo iOS prebuild skipped Windows. An inspection fixture using the installed Expo template and configuration steps verified both targets, the embedded extension, source membership, app-only SQL resource, bundle IDs, deployment targets, plists, and generated Expo module registration. This did not compile Swift.
- Swift compilation, CocoaPods integration, signing, installation, and device tests are **Not run**. No Expo project was linked, no device was registered, and no cloud build was submitted.

### What I learned — user-written

### Next small task

When ready, confirm active Apple Developer Program membership and Expo account access for the preview build. [Current handoff](HANDOFF.md)

---

## 2026-11-10 — Recommend the first Windows-to-iPhone proof route

**Status** — Recommended Expo Build Free with an internal preview build and a native Swift Live Activity for the proof. Production framework selection remains open.

- Recorded the Windows-only setup, regular Apple Account, lack of a cloud build account, and willingness to enroll in the Apple Developer Program when ready.
- Checked Apple's and Expo's official documentation for native intents, extension signing, registered-device installation, and current costs. Expected first-year service cost is US$99 at U.S. pricing if builds fit within Expo's free monthly iOS limit.
- Specified one fictional set, a rep edit, and one durable completion from the Face ID-authenticated Lock Screen. A repeated request for the same set must leave exactly one record. [Route and acceptance](LOCK_SCREEN_FEASIBILITY.md#recommended-first-proof-from-windows)
- All build, signing, installation, and device tests are **Not run**.

### What I learned — user-written

_Leave blank for the user._

### Next small task

Confirm the target iPhone model, iOS version and build, and Face ID availability. [Current handoff](HANDOFF.md)

---

## 2026-11-10 — Allow Face ID for Lock Screen workout actions

**Status** — The user approved Face ID authentication while staying on the visible Lock Screen. This supersedes the earlier strict no-unlock criterion. Entering or opening the foreground app during a required action fails acceptance.

- Updated the planned checks for saved edits, duplicate prevention, rest timing and skipping, and advancing exactly once. The genuinely locked trial remains a comparison.
- Recorded the minimum prerequisites for building, signing, and installing the proof. Device details, Mac or hosted access, and the available signing and installation route need confirmation.
- All build, installation, persistence, and device tests are **Not run**. [Project plan](PROJECT.md) · [Device proof](LOCK_SCREEN_FEASIBILITY.md)

### What I learned — user-written

_Leave blank for the user._

### Next small task

Confirm one available build, signing, and install route for the authenticated button trial. [Current handoff](HANDOFF.md)

---

## 2026-11-10 — Lock Screen feasibility research

**Phase/task** — Compare the Apple surfaces and design a bounded device proof.

**Status** — Documentation research and proof design complete. Device and installation results are **Not run**.

### Findings and checks

- Reviewed Apple’s widget and Live Activity interaction, authentication, lifecycle, and timer documentation. Apple documents an unlock gate for embedded buttons and toggles on both surfaces. Passive countdown display remains a candidate.
- Recorded the action map, paired closed/open padlock test, two-exercise fixture, persistence and interruption checks, and separate background, system-termination, and force-quit cases. [Feasibility research and proof plan](LOCK_SCREEN_FEASIBILITY.md)
- Compared Xcode on an accessible Mac and hosted build routes using Apple, Codemagic, and Expo documentation. Device OS, Mac access, signing team, install path, and framework are still open.
- Confirmed the initial working tree was clean on main at 2b2b811f72ecb40c1dcd92a68fad5c913774d4eb. The whitespace checks passed, 25 local Markdown links resolved, and 38 source URLs returned HTTP 200. Earlier log entries and reflections were preserved. This session adds local documentation only.

### What I learned — user-written

_Leave blank for the user._

### Next small task

Confirm a build and install route for the paired-state button gate. [Current handoff](HANDOFF.md)

---

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
