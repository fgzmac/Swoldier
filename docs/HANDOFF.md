# Current project handoff

## 2026-11-20 — Gio’s iPhone results for the combined preview

Gio reported the following results on iPhone build `c832451a-1988-46fd-9d35-ff0037610114`.

| Check | User-reported result |
| --- | --- |
| Upgrade | Passed |
| Fictional BodySpec DXA import | Passed |
| Delete workout | Passed |

The earlier scheduled workout pass belongs to `c0bb769c`. Live BodySpec sign-in and personal scan import remain pending.

## 2026-11-20 — Signed combined preview ready to install

**FINISHED** at 6:16 p.m. Pacific. Build `c832451a-1988-46fd-9d35-ff0037610114` is the internal iPhone preview of the fictional BodySpec importer and Delete workout, version 1.0.0 (1). [Install the combined preview on the registered iPhone](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/c832451a-1988-46fd-9d35-ff0037610114).

Exactly one build was submitted from the Windows working tree on `feat/midnight-ui` at `70d997f682c4cacebf60228340dbb9c1776831d1`, using the existing `preview` profile and frozen remote credentials. Immediately before submission, all 33 paths and SHA-256 hashes matched in a fresh EAS archive and the working tree, including the seven local app inputs. The exact manifest is in the preparation entry below.

Xcode logged `ARCHIVE SUCCEEDED`, code signing for the app and widget, and the copy of `SwoldierProofLiveActivity.appex` into the app's PlugIns folder. Fastlane confirmed signed IPA export and EAS published the IPA. Included build credit fell from $33 to $31 of the $45 monthly allowance. Overage was $0 before and after.

The pre-install checklist covered the journal, completed workouts and preservation across upgrade. Gio’s results for this build are recorded above.

## 2026-11-20 — Combined DXA and Delete workout preview

**Ready for one internal iOS build.** The Windows candidate is the working tree on `feat/midnight-ui` at `70d997f682c4cacebf60228340dbb9c1776831d1`, with seven changed app inputs. `Organizer.tsx` contains the fictional samples and preview/save flow. `App.tsx` and `workoutModel.ts` connect Delete workout to `modules/LockScreenProofModule.swift`. The bridge calls `native/ProofCoordinator.swift`, which invokes `native/ProofStore.swift` and ends activities for the selected session. The store checks completion using `native/ProofSQL.json` and deletes within a transaction.

**Archive.** From `proofs/lock-screen`, EAS CLI 27.7.2 ran `build:inspect --platform ios --profile preview --stage archive` with `EAS_NO_VCS=1` and `EAS_PROJECT_ROOT` set to that directory. The existing profile specifies internal distribution, a physical iPhone and the sdk-57 image. The 33 archive files matched both the preflight hashes and the tested working tree byte for byte. The nine bundled PNGs matched the artwork at HEAD. Unrelated design samples, reference files, personal scans, credentials, local databases, tests and generated outputs were excluded.

**Windows checks.** All 168 tests passed with zero failures or skips, including the importer and all three Delete workout regressions. TypeScript passed. The iOS export produced one Hermes bundle from 596 modules and nine assets. Expo generated an Xcode project from a separate copy of the archive using the installed SDK template. All ten generated Swift/SQL copies matched. The host contains both stores, the coordinator and both SQL resources. The extension contains ProofActivity, ProofIntents and ProofWidget. Host-only inline module discovery, the iOS 26 deployment target and the `swoldier-proof` URL scheme passed inspection.

**Preparation checkpoint.** This manifest was rechecked immediately before the authorized build. The signed build and Gio’s iPhone results are recorded above.

The local EAS archive-stage output is in `proofs/lock-screen/.expo/preview-dxa-delete-20261120/archive/`. Its sibling `archive.sha256` lists the paths relative to the proof root. SHA-256 of that manifest (UTF-8, LF) is `88742ad7b24a01ba71cded31c908f3c58efe9e312d0c799c14e6d4364ab1fb0a`.

<details>
<summary>Exact archive inputs and SHA-256 hashes</summary>

```text
6287c81600bcc61784ee11853e3099e6d8854f9acb6d15a5638c44446e8fa298  App.tsx
e88e42023935b73988397005cabbe1c85121dec482571099fc4ac3884235da87  Midnight.tsx
4d5a8a6d90d59646e5bf691fc1eff147a67d2d11505ffc631859da56f9972852  Organizer.tsx
248459463ac8f7373faa362348a80f74865a873d4d6944835c79906c5a998f5a  RoutineEditor.tsx
86d74f5cb1bdc7e8d63d319628e9fbde221ffcaad19022e5afa781dae2c6cc3b  SetEditor.tsx
73ae69a5a98db78457c0af0aeb7f6ae9b247703f073a8c5db0c1346b51a38bd7  WeekPlanner.tsx
88ddc4408db6276107a31e627d55203d8d91b0f591e1db5d7aeb9d9f28c3e389  app.config.js
875240626c8e8474fb64497066b770db22d2b2983e5288ce2771ff5f7df89c0c  assets/midnight/bench.png
1914db5119e171352a06ab1af18fbc66b802dad095d971856b31dd36cce0f3cb  assets/midnight/cal.png
84d702e233a88738c372200da9dc22342b1b24c1aaf8fcaa84c4c18a3886769b  assets/midnight/calendar-planner.png
4eefbf9f2a7ed6cec7634190b2f4f0bc0f1cd3fab442b7d23fa395a8e841f2ae  assets/midnight/drop.png
e28056cd66438b64d12223337ac3ab1584cf7624fa1484196a217278909dc49b  assets/midnight/pill.png
c5cc39eda64ce9d62cb64a26c9a4f33efd5e3faef60afd194bb9a88c5f055ea3  assets/midnight/right.png
33da702eeb970b6fb97e4b4e09db35828d400dc5d3bc9a0e557692656b239739  assets/midnight/routines.png
7e6979ed3ddba32c22cc132334c527f57b5dc624ef466d1168a00ff42716f97c  assets/midnight/today.png
93ec8d85ec56fd2cd8ad0c96cf5f124121d8413dea346dbe12913a0bb74664a7  assets/midnight/training-journal.png
5816a0b5044576ca768fe4d6dfac5133278f5d0df418d334110484448b6e5216  eas.json
3cc816440c81db1b45a7d796c25ee6b45e19cfa2d64f1f934e42b1384c82d90b  index.js
4c98e9f52dae029d9607410ac31627de713789fdd03f7bac8e094fdaa268e744  modules/LockScreenProofModule.swift
6dd5840312e3d9849ebfac610084546e88bc81b05304f9140ba94e72e7755051  native/ProofActivity.swift
af6e3f94ab5a4380e312749a4696ae4aadc5b36f8f5211950dc168204701980d  native/ProofCoordinator.swift
5c957c4630eceedcde0b48232820f87b39c6348c55c004a0098e6934f3a95ed1  native/ProofIntents.swift
e2143231afea2e5aadc5ffcd8b2fb5ae46d85d42a7aa515527576689883cb2a8  native/ProofSQL.json
059ba2ac994425abf528a9dda1ccd029d6f46e4935fb76b23ea63d1053f54061  native/ProofStore.swift
f449cece63d8c9f955d2688cd67487ef12db710e6199484d8f2e2f360742c702  native/ProofWidget.swift
f4b2b02955832bc3c19fb502746acc3a099021516e3c7ced1b64f648c2cf3add  native/RoutineSQL.json
a1d8ac8b7e715795b70998d9a5b4705bfd595a9e1bbbcd5dae11e09cafec9039  native/RoutineStore.swift
698747d5365843c144422948b0b91d02c81b29a1618f34444228e08572fd6fab  package-lock.json
bd7967db96f138f190fac5c3e29d797c665ae4ce9fc4027d910320d7b1376065  package.json
08dc1863144e8c3c1fac291e0260b5dd921621ad5013806193b19eec4facf08a  plugins/withLockScreenProof.js
a22aeca71b837c9b68b9a42f7f93e7449bc04bfd18335e80c49fb9b2bb1d7b1c  routineModel.ts
8c4892ccf48b43c120a49a4992740a32a2f3c1a273ba5443849af3e6f8456ea9  tsconfig.json
b8ae6fd8020eeab25192e500a38e12b2ff7fa306a3b7cbcaced32f0817faa116  workoutModel.ts
```

</details>

## 2026-11-20 — Fictional BodySpec import verified on Windows

In Today → Accountability, choose **Import fictional BodySpec scan**. Sample 1 previews 2026-11-18, BodySpec (fictional), 23.4% body fat, 120.5 lb lean mass and an estimated RMR of 1512 kcal/day. Sample 2 has the same date, a different result ID and a blank RMR. **Record scan** remains available for manual entry.

On Windows at `feat/midnight-ui` / `70d997f` with local changes, all 168 tests passed, including the DXA regression and all three Delete workout regressions. TypeScript passed. The Tracker test used a substitute native bridge and file-backed SQLite to check cancel without a write, reopen, repeat-import protection, two same-date results and preservation of a matching manual scan. See the [build log](BUILD_LOG.md) for the integration record.

The supplied patch records the owner's subsequent “Workout passed” report for signed preview c0bb769c. After double Complete, Undo, correction, re-completion, Finish and reopen, the owner saw one new workout, two saved sets, the corrected 40 lb × 9 first set, intact targets and the completed occurrence in Today and Calendar. The owner reported the upgrade looked correct. Exact rest-deadline preservation, a full before/after comparison, goal increments and accessibility remain open. The phone card below predates this report.

Next device check, when a signed candidate includes the local features, is to repeat the fictional scan and Delete workout checks on iPhone. Live BodySpec sign-in still requires client and callback confirmation, measurement mapping and consent/token-handling verification before a personal import.

## 2026-11-20 — Delete a completed workout

In a future signed preview, go to Today > Completed Workouts and expand a fictional workout. Cancel deletion once, then confirm the named workout and reopen the app. Check the completed count, goals, routine status, and any scheduled date. Verify a second workout from the same routine and an unfinished workout still have their original sets. Repeat for the most recently finished workout. The currently signed preview c0bb769c predates this feature.

## 2026-11-20 — Lock Screen header and control spacing

Check the revised widget on iPhone with a long exercise name and larger text, including the Undo editing state with RIR and End Rest visible. The local visual preview uses a short exercise name.

## 2026-11-20 — Training Week selected for Calendar

Training Week is now in the local Calendar header. A four-screen visual review is available under design-samples/midnight-screen-previews. Today, Routines and Calendar are browser renders of the current components with fictional state. The Lock Screen card is an illustrative reconstruction with Show RIR enabled. In the next preview, compare the selected artwork, month chips and agenda header on the phone.

## 2026-11-20 — Calendar hero and dated task labels

On a future iPhone preview, check a busy day with four or more entries, long routine names, larger text and a month spanning six weeks. Tap the date to verify that the full agenda opens with the same entries and completion states. Three Calendar hero samples are available locally; the desk planner is currently wired in.

## 2026-11-20 — Routines journal artwork

The selected training journal is wired into the local Routines library header. In the next preview, check the title, count and artwork together at standard and larger text sizes.

## 2026-11-20 — Midnight visual corrections after installation

Midnight preview 66ffdd5f compiled and signed from PR #1 commit a145fd4. The installed Today and Calendar screenshots showed a crowded Agenda header, missing illustrations and text-only tabs. They show an active workout summary. The Calendar screenshot is for a different date than the before-upgrade screenshot, so it does not verify the earlier date’s entries.

The local correction restores the reference artwork, revises Today’s workout and goals, and separates the selected date, add action, month navigation and entry options. Review Today and Calendar side by side with their approved references in a future iPhone preview. Check the narrow-width header, large text, the add form opening directly below the header, and the same saved dated entries from both screens. The correction has no signed build or phone result yet.

## 2026-11-20 — Midnight review and upgrade checklist

The feature branch `feat/midnight-ui` keeps the signed A–J inputs in a prerequisite commit and adds Midnight in a second commit. The previous signed preview was 3e11df7b. Midnight passed 163 local tests, TypeScript, iOS JavaScript export and generated native target/resource checks. Swift compilation, signing, upgrade, accessibility and rendered layouts are pending for Midnight.

After a separately approved preview, check these on the iPhone in order.

1. Before installation, capture the routine list and groups, active session and set, actuals including RIR, rest deadline, and today's agenda checks and water totals. Upgrade in place and reopen before changing anything.
2. Use Resume from Today and the routine row. If the active session was scheduled, also use Calendar. Confirm the same session, set and rest state every time.
3. Set different weekly, monthly and yearly targets. Edit and remove one. Check the other two, completed history and prior accountability entries. Move a routine into a category, collapse it, then remove the category and check it returns exactly once.
4. Change one check or water entry in Today and reopen Calendar on that date. Verify its ID-equivalent entry, totals and selected slot, then edit from Calendar and check Today.
5. With a long exercise name, a multi-digit set number and larger text, check widget width, reachable buttons and VoiceOver labels. Show RIR in Options, try blank, zero and nonzero values, hide and show it, then complete and Undo during rest. Compare the value and original deadline. Verify the preference persists across sessions.

Both deferred troubleshooting issues remain open. Keep earlier device reports attached to their original builds.

## 2026-11-19 — Corrected A–J preview compiled and signed

[Install build 3e11df7b](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/3e11df7b-346a-4408-b099-08a78fb3cf2d). Before submitting, compared the new 23-file EAS archive and live source with the failed build's manifest. Only ProofWidget.swift differed, exactly matching the recorded relocation of @ViewBuilder to countdown. Xcode archived successfully and Fastlane exported the signed IPA. Expo Doctor reported the existing Expo patch-version warning (57.0.32 versus expected ~57.0.33). One medium iOS preview consumed $2 included credits. The balance went from $39 to $37 with $0 overage.

Installation and A–J device checks await the [upgrade-in-place phone checklist](../proofs/lock-screen/README.md#november-19-upgrade-first-phone-checklist). Capture current data before upgrading. Earlier build evidence and troubleshooting items retain their recorded scope.

## 2026-11-19 — A–J preview

**Build failed.** The [one A–J build](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/f645e5c0-65ce-4128-a428-0a08edc97dc6) reached Xcode. ProofWidget.swift:298 failed with “function declares an opaque return type, but has no return statements in its body from which to infer an underlying type.” The new header had taken the existing countdown's @ViewBuilder annotation. Locally restored the annotation to countdown, regenerated and verified the extension source and all ten native copies. This single annotation relocation is the only build-input difference after submission. Its native compile and signing remain pending. No IPA or installation URL was produced. Expo Doctor also flagged locked Expo 57.0.32 versus expected ~57.0.33. All A–J requirements preceded submission. No second build was submitted.

Two post-failure usage queries showed $6 of $45 used, $39 remaining and $0 overage, unchanged from preflight. Recorded credit delta at the last query was $0. A new build would require separate authorization.

Today rotates one starter quote per local date, shows a collapsible Accountability tracker and shares the Calendar agenda, including the existing Night slot displayed as Evening. An unfinished workout remains independently accessible. Completed Workouts opens a counted history list, with the existing per-workout details and edit permissions.

Accountability stores metric or habit goals, dated check-ins and manual dated/source-labeled scan observations in an additive revision-checked organizer table. Estimated RMR is displayed in kcal/day. Blank measurements stay blank. Routine groups use a separate revision in that table. Membership and order reference routine IDs. Group removal returns members to Ungrouped.

The routine editor uses exercise-owned Rest settings and Set settings, Move up/down/top/bottom, conditional rest seconds, optional targets and secondary configuration buttons. Today, Calendar and editor cards use stronger outlines. The Live Activity adds a bold exercise header, labeled set count and a static dark rest panel with a luminous outline. The existing deadline, action identities and End Rest/Undo behavior supply its state.

For prior Calendar preview 5a6419aa only, upgrade preservation, water, supplements and routine scheduling passed by user report. Before-upgrade screenshots document the earlier state. Whole-date completion, undo and empty-date outcomes still await a report.

Local validation covered 157 passing pre-upload tests and an additional passing editor-harness check of hidden seconds, dirty targets and movement with a long exercise name. The migration/CAS, group removal, check-in history, date boundary and calendar progress checks run through SQLite/TypeScript wrappers. TypeScript, iOS JavaScript export, ten generated native copies and target/resource membership passed. No physical layout, installed migration, accessibility or phone result for A–J has been recorded.

Source is local main at 7a6fbad35645f21f5a9ba8873ca3cc9214b4e229 plus working-tree inputs. All 23 isolated archive hashes match reviewed source. The lockfile matches the preceding build. Exact inputs, SHA-256 and batch paths are in the ignored proof manifest `.expo/aj-1119/manifest.json`. All A–J requests were present before submission. Next run the [upgrade-first checklist](../proofs/lock-screen/README.md#november-19-upgrade-first-phone-checklist).

## 2026-11-18 — Calendar preview

[Install Calendar preview 5a6419aa](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/5a6419aa-4eda-4022-a5e4-af52c29e6f68). EAS FINISHED. Xcode archived the app and extension and Fastlane exported the signed IPA. Exactly one internal preview used $2 included medium-worker credits. Starter balance moved from $41 to $39, with $0 overage. Expo Doctor passed 20/21 and flagged locked Expo 57.0.32 against expected ~57.0.33. Installation and device acceptance remain pending.

The preview uses local main at 7a6fbad35645f21f5a9ba8873ca3cc9214b4e229 with accumulated working-tree changes. The isolated archive contained 22 reviewed inputs, all matching local SHA-256. Sixteen differ from the commit and eleven differ from build b329ba8c. The unchanged lockfile and all input hashes are recorded in the ignored proof directory `.expo/calendar-1118/manifest.json`.

Calendar imports old dated assignments into the routine database inside its schema transaction. Reopening preserves occurrence IDs and revisions. The existing workout database supplies the original Start request identity with each new snapshot. Day writes check their prior revision. Water totals and parent completion are derived from saved children. Supplement details use one free-text entry per child. Today summaries start collapsed. The workout editor, rest dismissal, Resume and conflict panels use the updated wording and interaction. Food with calories and macronutrients remains deferred.

All 154 local tests passed, including migration, stale writes, deleted-entry preservation on reopen, water/checklist reversals, workout history and action guards. During review a Save regression blocked saving a named empty routine. The corrected validation requires an exercise at Start and the original save-in-flight regression passes. TypeScript, iOS JavaScript export, ten generated native file/resource copies, target membership and exact-set URL checks passed. SQL wrappers and editor harnesses cover local logic. Device migration, older content, actual link delivery, keyboard/confirmation scrolling, larger text and VoiceOver await testing. The previous weekly-planner phone trial remains paused. Both deferred troubleshooting issues remain open.

Next, capture existing data before installing over the app and follow the [Calendar upgrade and phone checks](../proofs/lock-screen/README.md#calendar-upgrade-and-phone-checks). Start with local dates and completed workout records before adding fictional calendar items.

## Usability preview compiled and signed — 2026-11-16

**Exactly one authorized build succeeded:** [b329ba8c-d0b2-4354-a734-f02ccb4135d3 — install on iPhone](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/b329ba8c-d0b2-4354-a734-f02ccb4135d3). EAS FINISHED, Xcode ARCHIVE SUCCEEDED, IPA exported and signed. Existing preview/internal profile, sdk-57 image and frozen signing credentials; no resubmission or retry.

Before submission all 22 current source/archive SHA-256 hashes matched the reviewed final manifest, with unchanged lockfile. Source base remains **7a6fbad35645f21f5a9ba8873ca3cc9214b4e229** plus the reviewed uncommitted usability inputs. All 27 working paths are preserved; no staging/commit/push or fresh remote query. Ignored `.expo/usability-preflight/submitted-inputs.json` records each input/hash and the exact uncommitted input list alongside final build logs and billing responses.

Current official Expo guidance confirms medium default and $2 medium-iOS pricing. Before submission Starter had $43 included credits and $0 overage. Afterward the live report confirms a second medium iOS build: **$4 total credits used, $41 remaining, $0 overage**. This build consumed exactly **$2 included credits**, no additional cash charge. User-reported subscription spend remains $19 of the $50 testing cap. No billing/dependency/credential change.

Warnings: Expo Doctor passed 20/21; locked Expo 57.0.32 differs from expected ~57.0.33. Build continued unchanged. Native logs include generated AppDelegate/iOS 26 and UIRequiresFullScreen deprecations, duplicate C++ library and missing Metal-toolchain search-path warnings, generated JS/Hermes warnings, script-output warnings and signed-extension stripping notice. These did not prevent archive/sign/export; no claim that they are repaired.

Reused unchanged 152 local tests/typecheck/export and native membership review; wrapper tests do not execute Swift. **Native compilation and signing now Passed for this build.** Installation, installed migration/history preservation, older ActivityKit decoding, links/navigation dialogs, runtime concurrency/retries, rendered fit/accessibility and new device outcomes remain **Not run**. Both deferred issues and separate screen-sleep investigation remain open; original blank-to-zero observation remains inconclusive/not reproduced. Prior device evidence retains its original scope.

**Next small task:** capture existing data and install over the current app without deleting/resetting, then follow the [ordered upgrade-first checklist](../proofs/lock-screen/README.md#final-preflight-phone-checklist--not-run): preservation first, three corrected bugs next, then controls/navigation/scheduling/layout. Report observations before marking any trial passed. Historical entries and learning reflections remain untouched.

## Final local usability build preflight — 2026-11-16

**Ready for one separately authorized preview; none submitted.** Local main/HEAD remains **7a6fbad35645f21f5a9ba8873ca3cc9214b4e229**, upstream origin/main, all 27 changed paths unstaged. No fresh remote query. Application inputs are unchanged from the completed correction review.

Actual local EAS `build:inspect --stage archive` succeeded. Exactly **22 required files** and every SHA-256 match current source and the reviewed manifest. The dependency lockfile remains unchanged from HEAD. Ten generated native copies, app/extension source and SQL-resource membership, host-only inline module and `swoldier-proof` exact-set URL scheme were inspected. The archive excludes docs/tests, dependencies, generated projects, credentials, signing/device evidence and unrelated/private files. Final manifest, archive, redacted signing summary, usage response and unexecuted command are preserved in ignored `proofs/lock-screen/.expo/usability-preflight/`.

Read-only EAS checks confirm the existing project, one registered phone and both app/extension AD_HOC profiles active, including that phone; certificate/profile expiry is November 11, 2027. This is EAS-stored metadata, not an independent Apple-portal revocation check. Preview remains internal, physical iOS, sdk-57, local app versions; cached EAS CLI 27.7.2 is reused with frozen credentials. No credentials, dependencies or billing changed.

**Budget:** current Starter usage is $2 of $45 credits, **$43 remaining**, $0 usage overage. A medium iOS preview is expected to consume **$2 credits**, leaving **$41**, with no extra usage charge. The profile does not explicitly pin worker size; estimate uses current medium-worker usage and must be rechecked if worker selection/pricing or intervening account usage changes. User-reported subscription total remains $19 of the $50 cash cap; receipt/tax was not independently inspected. No spending occurred.

Reused unchanged 152 passing tests, TypeScript and JS export; no unrelated suite rerun. SQL wrappers and the TypeScript editor harness do not execute Swift or React Native. Fresh archive/hash/native inspection and documentation/whitespace checks cover this preflight. New native compilation/signing, installed migration, older ActivityKit decoding, link delivery, rendered fit/accessibility and device behavior remain **Not run**. Both deferred issues, screen sleep and the inconclusive/not-reproduced blank-to-zero report remain open.

**Next small task:** separately authorize one preview after rechecking source/credit freshness, then follow the [ordered upgrade-first checks](../proofs/lock-screen/README.md#final-preflight-phone-checklist--not-run). No upload/build, staging, commit or push in this task. Historical entries and reflections remain unchanged.

## Usability review corrected and rechecked — 2026-11-16

**Ready for build preparation; no remaining confirmed source blocker found in this review.** main/HEAD remains **7a6fbad35645f21f5a9ba8873ca3cc9214b4e229** with the same 27 unstaged paths, upstream origin/main. No fresh remote query. Preserved the full incoming patch in ignored local review evidence before corrections. No build/upload, dependency/billing change, spending, staging, commit or push.

**Findings, corrected locally:**

- **P1 — exact-set editor could reuse another set's input buffer.** A second link changed component props without remounting its state; a focused harness against the pre-review source saved A's entered pounds using B's identity. `App.tsx` now gives each accepted opening a fresh key; `SetEditor.tsx` retains its original target/revision for the mounted editor. New links validate the requested session/set before and after navigation confirmation. Stale/missing/skipped targets are rejected rather than substituted.
- **P2 — links bypassed unsaved-edit navigation guards.** A link could unmount a dirty routine editor or replace exact-entry context without confirmation. Links now use the current editor/routine leave guard, confirm discarded edits, refuse during a save, and ignore superseded pending requests. Guards register in the layout phase; the routine guard also checks the synchronous save lock. Failed exact saves retain values and their original retry payload.
- **P2 — an old Finish/Discard confirmation could turn into ordinary Start after the workout finished.** The pre-review SQL wrapper reproduced an unexpected new session instead of rejection. Native validation now checks every supplied resolution, including finished/missing current sessions, before mutation. Already-committed Start retries are still handled first and find their original session. No schema, SQL, identifiers, dependencies or signing change was needed for these corrections.

**Re-review/validation:** 152 tests Passed: 122 workout SQL-wrapper, 22 routine/model, 8 production TypeScript/editor-logic checks. Added failed-before/passed-after reproductions, exact-link/leave-buffer tests, competing Skip/Complete and Finish/Discard requests, duplicate Undo skip, archived-plus-active v8 preservation and routine-deletion cleanup rollback. Editor tests transpile production components into a minimal hook/element harness; they do not run React Native UI. SQL tests use separate JS orchestration and do not execute Swift. TypeScript, iOS JS export, ten current native source/resource copies, target/resource/host-only module/URL-scheme inspection, 22-input local package hashes, Markdown links, historical-log preservation and whitespace pass.

**Limits:** Swift compilation/signing, installed migration, older ActivityKit decoding, iOS link delivery/navigation dialogs, actual concurrency/retry injection, rendered layout, VoiceOver/larger text and all new device behavior remain **Not run**. The compact card/Options/long-name layouts still need phone checks. Latest-batch Undo skip is bounded to the current exercise. Calendar reassignment remains last explicit choice; saved timestamps are grouped in the device's current timezone, so timezone changes may regroup dates. There is no cloud/calendar conflict resolution or automatic workout start. Screen sleep, TS-001 automatic reveal and TS-002 countdown jumps remain unresolved; initial blank → 0 remains inconclusive/not reproduced.

**Next small task:** perform local build preflight against the corrected source and current account allowance, without assuming permission to upload or build. A later separately authorized preview should run the [review-specific phone checks](../proofs/lock-screen/README.md#usability-review-phone-additions--not-run) plus the upgrade-first checklist. Previous build evidence and historical entries below retain their original scope. Personal learning reflections are unchanged.

## Ten-note usability pass prepared locally — 2026-11-16

**Current baseline:** main/HEAD **7a6fbad35645f21f5a9ba8873ca3cc9214b4e229**, upstream origin/main; no fresh remote query. Earlier partial work was preserved and extended after the user supplied all ten notes and a routine-library design reference. The earlier missing-notes sections below are historical, not current blockers. No staging/commit/push, dependency upgrade, upload/build or spending.

**Implemented:** explicit skipped-set/early-finish state and latest-batch Undo skip; guarded unfinished-workout Resume/Finish-and-keep/confirmed Discard-and-start; named Next/Finish; confirmed routine deletion; Fill in as I train with collapsed optional targets; exact-set numeric editor linked from the card; RIR blank-plus-to-0 with Clear left and adjustment group right. App now separates Today, Routines and This week, library/editor and completed summaries, uses the reference's cream/green visual direction, and hides diagnostics. One manually assigned saved routine per date supports a user-created split. No templates/community/progression or production-framework decision.

**Safety/choices:** additive v8 migration preserves old data and never reclassifies 0×0. Skip doesn't create records/rest or auto-advance. Undo skip reverses the latest batch only before leaving that exercise. Existing rest must still be acknowledged. Exact edits use original set identity, revision and idempotent request; they preserve targets/rest/counts. Current-workout saved-record corrections require explicit confirmation; older archived summaries remain read-only. Finish/discard plus new Start is atomic; confirmation detects intervening edits/counts/rest changes. Routine deletion never opens the workout store. New session dates support calendar display; unknown historical start dates stay unknown.

**Checks actually passed:** 142 tests (118 workout SQL-wrapper, 21 routine/model, 3 TypeScript model), TypeScript, iOS JavaScript export, ten generated native-file comparisons and host/extension/resource/inline-module/URL-scheme inspection. Separate JS wrappers do not execute Swift. Local 22-file packaging allowlist and hash comparison passed; ignored evidence is in `proofs/lock-screen/.expo/usability/`, excluded from publication. Markdown links/whitespace checked after documentation. New native compilation, installed migration, older activity decoding, deep-link delivery, rendered fit/accessibility and physical-device behavior are **Not run**. Build 2614e927's bounded evidence remains separate.

**Changed paths (27, all unstaged):**

- Root/status: `README.md`, `docs/BUILD_LOG.md`, `docs/HANDOFF.md`, `docs/LOCK_SCREEN_FEASIBILITY.md`, `docs/PROJECT.md`, `docs/TROUBLESHOOTING_BACKLOG.md`.
- Proof UI/config: `proofs/lock-screen/.easignore`, `App.tsx`, `README.md`, `RoutineEditor.tsx`, new `SetEditor.tsx`, new `WeekPlanner.tsx`, new `workoutModel.ts`, `routineModel.ts`, `app.config.js` (all filenames after the first share the proof directory).
- Native: `proofs/lock-screen/modules/LockScreenProofModule.swift`; `proofs/lock-screen/native/ProofActivity.swift`, `ProofCoordinator.swift`, `ProofIntents.swift`, `ProofSQL.json`, `ProofStore.swift`, `ProofWidget.swift`, `RoutineSQL.json`, `RoutineStore.swift` (shared native directory).
- Tests: `proofs/lock-screen/tests/persistence.test.cjs`, `routines.test.cjs`, new `workout.test.cjs` (shared tests directory).

**Next small task:** review this local usability diff, especially skip/undo generation guards, exact-edit revisions, atomic resolution/deletion and the new compact card/Options layout. Then, only if separately authorized, perform one preview build and the [upgrade-first usability checklist](../proofs/lock-screen/README.md#usability-phone-checklist--not-run). No current build authorization is assumed. Deferred TS-001 automatic-reveal delay and TS-002 countdown jumps remain open; screen sleep remains a separate physical comparison with no cause/fix claimed. Original blank → 0 remains inconclusive/not reproduced. Historical entries and user-written reflections are untouched.

## Usability pass started; missing workout notes — 2026-11-16

**Partial implementation, not the completed usability pass.** Starting Git was clean main at published **7a6fbad35645f21f5a9ba8873ca3cc9214b4e229**, tracking origin/main. No fresh remote query; preserved history/reflections. The user's referenced ten real-workout notes were not present in this chat or the searched local project documents. Requested them, especially unfinished-workout choices, Log as you go setup and whether the exact-set editor may open the app/edit completed sets. These decisions materially affect persistence/history and are not invented here.

**Prepared independent changes:** next-exercise action displays the next snapshot exercise's name (older activity fallback remains Next Exercise); action/target IDs are unchanged. First RIR plus from blank now stores explicit 0, subsequent plus increments, minus on blank remains blank and Clear still returns blank. This supersedes the former blank-plus-to-1 requirement only for this unbuilt patch. Clear RIR is separated from ± into the action row; minimum height remains 44 points. Normal saved-rest confirmation/Undo/Continue, existing deadline/acknowledgement/retry guards, snapshots and actuals remain unchanged. No migration or retrospective rewrite of existing 0×0 records.

**Local verification:** 123 tests Passed (104 production-SQL wrapper, 19 routine/model), TypeScript Passed. Revised expected first-entry behavior and added Clear → minus → plus → reopen coverage, with unchanged plans/counts/rest and nullable values. Wrapper orchestration is JavaScript, not Swift/ActivityKit. Named-label/optional-content wiring and action identity checked in source. No native compilation, fresh native generation, installed upgrade, rendered fit or device pass for these changes. Three action controls during Undo and long next-exercise names still need rendered testing; no control shrinking or sleep workaround.

**Not implemented yet:** Skip set, finish exercise early, unfinished-workout resolution, routine deletion, Log as you go, exact-set editor and broader presentation cleanup. Skipped-set state must be distinct from zero records; existing 0×0 records must not be rewritten. The full request remains active pending the missing notes; this partial work does not claim transition/retry/migration coverage for unimplemented actions.

**Screen sleep:** investigated separately using official Apple documentation and source tracing; no cause or keep-awake fix established. [Evidence and bounded comparison](TROUBLESHOOTING_BACKLOG.md#screen-sleep-investigation--2026-11-16). TS-001/TS-002 stay open, original blank → 0 remains inconclusive/not reproduced. Previous build 2614e927's evidence remains historical and does not test this patch.

**Next small task:** obtain the ten notes, settle the three missing interaction/data choices, then resume stage 1 with explicit skipped-state and lifecycle transitions plus stale/retry/upgrade checks. Continue the user's remaining stages locally only. No upload/build, dependency change, staging, commit, push or spending in this task.

## RIR phone evidence and publication review — 2026-11-16

**No publication blocker found.** Reviewed the accumulated RIR diff against **23e8cf2d3928bd3fc2ade9b8e6586e7e3cc82b25**. Local main/HEAD remains that baseline tracking origin/main; index empty, no fresh remote query. All 19 build-input hashes match both the successful 2614e927 manifest and preserved archive. Application source/tests are unchanged from the reviewed version; no source edit in this task. Publication remains pending separate authorization.

**Device evidence:** [full evidence and current checklist](../proofs/lock-screen/README.md#rir-phone-results-and-current-checklist--2026-11-16) for **2614e927-835b-4180-a588-d326d043c282** separates user-described screenshot states from **Passed — user-reported** interactions. Screenshots support displayed Editor Test B revision 17 upgrade preservation with blank RIR added to drafts, short-name layout fit, reopened draft RIR 2, distinct saved RIR including 0, positive-rest Undo retaining RIR/timer, and End Rest preserving Set 2 at 50 × 8 / RIR 2 with one record and Skipped/Dismissed rest. Missing-reps rejection retained Editor Test A revision 8 at 42.5 × blank / RIR 2, one request, zero records, no rest, with “Enter reps before Complete.” No screenshot was independently inspected in this documentation task.

User reports bounds/blank/zero/Clear, optional completion, Undo/corrected re-completion, new/Add Set blank RIR and all three rest modes passed. Positive expiry permitted corrected completion/fresh rest; after End Rest, Set 2 completed with RIR 2, two records/fresh countdown. Friendly unfinished-Start wording passed without raw exception/path text, preserving the active workout. These build-scoped results supersede earlier unbuilt/device-unverified statements only for these checks; c059edb9's evidence remains separate.

**Still Not run:** broader recovery/concurrency, deliberate stale/duplicate execution and failure/retry injection, older-history/all-routine-setting preservation, other migration states, isolated older ActivityKit decoding, long names/larger text/all sizes, accessibility and fully locked interaction. Dense RIR/context layout risk remains outside shown short-name layouts. Original blank → 0 remains inconclusive/not reproduced, with no fix claimed; TS-001 automatic-reveal delay and TS-002 countdown jumps remain open/deferred.

**Publication checks:** complete source/test/documentation diff and proposed contents reviewed; no credentials, signing files, device identifiers, private workout/scan records, generated artifacts or unrelated files proposed. Symbol restoration matches baseline. Reused unchanged 122/122 SQL-wrapper/model tests, TypeScript/export and ten generated source/resource/target checks; wrappers do not execute Swift or ActivityKit. The successful build independently establishes compilation/signing; new phone reports establish only the bounded evidence above. Fresh local checks cover all 19 input/archive hashes, unchanged source/tests, historical preservation, sensitive-content review, Markdown links and whitespace. Ignored preflight/build logs, manifests and local review receipts stay excluded.

**Exact proposed publication paths (16):**

1. README.md
2. docs/BUILD_LOG.md
3. docs/HANDOFF.md
4. docs/LOCK_SCREEN_FEASIBILITY.md
5. docs/PROJECT.md
6. docs/TROUBLESHOOTING_BACKLOG.md
7. proofs/lock-screen/App.tsx
8. proofs/lock-screen/README.md
9. proofs/lock-screen/native/ProofActivity.swift
10. proofs/lock-screen/native/ProofCoordinator.swift
11. proofs/lock-screen/native/ProofIntents.swift
12. proofs/lock-screen/native/ProofSQL.json
13. proofs/lock-screen/native/ProofStore.swift
14. proofs/lock-screen/native/ProofWidget.swift
15. proofs/lock-screen/tests/persistence.test.cjs
16. proofs/lock-screen/tests/routines.test.cjs

**Suggested commit:** Add optional per-set RIR and record phone validation

**Next small task:** if separately authorized, recheck these exact reviewed paths/hashes and local/remote main, stage only these 16 paths, inspect staged whitespace/content, then commit/push normally. No staging, commit or push now. No upload/build, dependency/billing change or new spending; last verified Starter credit $43 and $0 usage overage, subscription $19 total user-reported. Historical entries/reflections and both deferred issues are preserved.

## RIR preview compiled and signed — 2026-11-16

**One authorized build, successful:** [2614e927-835b-4180-a588-d326d043c282 — installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/2614e927-835b-4180-a588-d326d043c282). EAS reports FINISHED; Xcode logs show ARCHIVE SUCCEEDED and Fastlane confirms the IPA was exported and signed. Preview/internal distribution, existing project and frozen signing credentials, Xcode 26.6 on the sdk-57 image; no retry. RIR, restored symbols and the existing Start-message correction are now **native-compiled**, but remain **device-unverified**. Earlier dated sections retain their historical unbuilt status.

**Budget evidence:** live EAS queries verified Starter, $45 included credits before submission, and $0 usage overage. The user reported the total Starter payment including tax was $19, with no other purchases; the payment receipt itself was not independently inspected. After this one medium iOS build, EAS reports $2 credits used, **$43 remaining**, and **$0 additional usage charges/overage**. Reported testing-phase spending remains $19 of the $50 cap ($31 headroom); credits are separate from cash spending. No plan/billing change or additional purchase was made. The CLI's $19 recurring estimate is the next subscription estimate, not a second charge or independently verified receipt.

**Exact source:** local HEAD remains **23e8cf2d3928bd3fc2ade9b8e6586e7e3cc82b25**, main tracking origin/main. No commit/push occurred and no fresh remote query was needed for this build. All 14 reviewed working paths and the full diff matched the preserved publication review before submission. All 19 fresh isolated archive inputs matched reviewed SHA-256 hashes; prior unchanged ten generated source/resource and target-membership checks remain applicable. The seven uncommitted build inputs were `App.tsx` and `native/ProofActivity.swift`, `ProofCoordinator.swift`, `ProofIntents.swift`, `ProofSQL.json`, `ProofStore.swift`, `ProofWidget.swift`. The Start-message correction was already in HEAD. Archive excludes documentation, tests, dependencies, generated native projects, credentials, signing/device files and unrelated/private files. Local manifests, billing evidence and logs remain ignored under `proofs/lock-screen/.expo/evidence/rir-build-1794853720960/`; nothing there is proposed for publication.

**Warnings and limits:** Expo Doctor passed 20/21 checks; its current patch expectation is Expo ~57.0.33 versus locked 57.0.32. Build continued successfully without a dependency change. Logs also contain generated/dependency iOS deprecations, duplicate C++ library/missing Metal-toolchain search-path warnings, Hermes/bundle and build-script warnings, and a future Fastlane Ruby-version notice. No proof-source compiler error was found. These warnings were not repaired in this bounded build task. Reused unchanged 122 SQL-wrapper/model tests, TypeScript/export and native-generation inspection; wrappers do not execute Swift. Native compilation/signing now Passed; **installation, native/installed migration, older ActivityKit content decoding, rendered fit, accessibility and device behavior remain Not run**, including Start-message runtime wording. Dense RIR/context layout remains a phone-verification risk. Original blank → 0 remains inconclusive/not reproduced; TS-001 automatic-reveal delay and TS-002 countdown jumps stay open/deferred.

**Next small task:** perform the [upgrade-first RIR phone checklist](../proofs/lock-screen/README.md#rir-phone-checklist--not-run), recording actual outcomes separately. Capture existing data before upgrading; install without deleting/resetting and compare. Check blank/0/1–10/Clear, persistence, optional RIR completion, missing-reps refusal, Undo/corrected re-completion, blank RIR on new/Add Set drafts, and reachable normal/Undo controls. Separately check the friendly unfinished-workout Start refusal. Do not mark any trial passed before evidence arrives. No source edits, dependency upgrades, staging, commit or push in this task; history/reflections preserved.

## RIR publication review — 2026-11-16

**No publication blocker found.** Reviewed the complete accumulated diff against published baseline **23e8cf2d3928bd3fc2ade9b8e6586e7e3cc82b25**. Local HEAD still matches that baseline on main tracking origin/main; no fresh remote query in this review. All 14 proposed paths remain unstaged, index empty, no unrelated untracked candidates. Source and tests were not edited in this review.

**Scope and evidence:** only optional per-set RIR implementation, its tests and related documentation are proposed. The symbol restoration is already equal to baseline, so the final diff contains no unintended symbol substitutions. The Start-message correction is already published in the baseline, not a new source change here; it remains **unbuilt/device-unverified**. c059edb9's earlier compilation and bounded screenshot-supported/user-reported results do not validate either RIR or that message correction. For RIR, native compilation, native/installed migration, older ActivityKit decoding, rendered fit, accessibility and device behavior remain **Not run**. Dense RIR/context layout remains a rendered-verification risk. Initial blank → 0 stays inconclusive/not reproduced; TS-001 automatic-reveal delay and TS-002 countdown jumps remain open/deferred.

**Validation reused and checked:** source/test hashes remain unchanged from the passing correction review, so reused 122/122 SQL-wrapper/model tests, TypeScript and prior JavaScript export rather than repeating unchanged suites. These do not execute Swift or ActivityKit. All 19 build-input hashes still match the inspected preflight archive, which includes RIR, restored symbols and the existing Start-message code. Prior ten generated native-copy/target/resource checks and host-only inline-module discovery remain applicable. Reviewed all proposed paths/content; no credentials, signing files, device identifiers, private records, generated artifacts or unrelated changes found. Fresh publication checks cover hashes, historical-document preservation, sensitive-pattern scan, ignored evidence, Markdown links and whitespace. Historical entries/reflections remain intact; only current project status fields are refreshed.

**Local evidence preserved, excluded from publication:** copied the preflight report, SHA-256 manifest and 19-file inspected archive from temporary storage into `proofs/lock-screen/.expo/evidence/rir-preflight-2026-11-16/`. Copies were byte/hash verified, and Git confirms the directory is ignored by the existing proof ignore rule. No ignore-setting change. The preflight recorded Free plan, 15/15 iOS builds used, $0 estimated charges, period ending 2026-12-01 UTC. No fresh allowance query or billing change in this publication review. Exhausted allowance blocks a new free preview, not publication of this explicitly unbuilt checkpoint; no paid build authorized.

**Exact proposed publication paths (14):**

1. README.md
2. docs/BUILD_LOG.md
3. docs/HANDOFF.md
4. docs/PROJECT.md
5. proofs/lock-screen/App.tsx
6. proofs/lock-screen/README.md
7. proofs/lock-screen/native/ProofActivity.swift
8. proofs/lock-screen/native/ProofCoordinator.swift
9. proofs/lock-screen/native/ProofIntents.swift
10. proofs/lock-screen/native/ProofSQL.json
11. proofs/lock-screen/native/ProofStore.swift
12. proofs/lock-screen/native/ProofWidget.swift
13. proofs/lock-screen/tests/persistence.test.cjs
14. proofs/lock-screen/tests/routines.test.cjs

**Suggested commit:** Add optional per-set RIR to Lock Screen proof

**Next small task:** only when explicitly authorized, verify the reviewed hashes and current local/remote Git state, stage exactly these 14 paths, inspect staged contents/whitespace, and publish normally. This task does not stage, commit, push, upload or build. Publication would not establish a native/device pass. The local review hash receipt is kept beside the ignored preflight evidence for a later comparison.

## RIR symbol restoration review passed — 2026-11-16

**Result:** the narrow correction passes source review; no further source edit required. Compared the entire current `ProofWidget.swift` with the saved pre-correction copy: the only differences are 14 restored symbols across 13 lines (3 checkmarks, 6 em dashes, 2 middle dots, 1 multiplication sign, 2 minus signs). Every corrected line exactly matches a line in published baseline **23e8cf2d3928bd3fc2ade9b8e6586e7e3cc82b25**. Actions, original IDs, retries, storage/timer behavior, accessibility labels/meaning and layout modifiers are unchanged by the correction; intended RIR additions remain intact.

**Focused checks:** strict UTF-8/code-point inspection found no remaining garbled sequences, replacement characters or unexpected control characters. The only non-ASCII characters in the file are the five intended symbol types. Its bytes still match the previously checked generated extension source (SHA-256 `162af4f00255662bdb14febe4629f9b66cf1930f37c688de02160178b7a31f6c`). Whitespace and documentation-link checks passed. No unrelated test suite, TypeScript check, export or regeneration was repeated; previous results remain historical evidence. HEAD remains the baseline on main; all accumulated work remains unstaged.

**Limits and next step:** the dense RIR/context row explicitly remains pending rendered verification, including Undo countdown, long names/notices and larger text. This review establishes neither native compilation, older-content decoding, installed migration, device behavior nor accessibility. The RIR patch and Start-message correction remain **unbuilt/device-unverified**. The next validation step is a separately authorized native preview only after sufficient free allowance is confirmed; none is authorized here. Last verified allowance was exhausted (15/15); no paid build authorized. Original blank → 0 stays inconclusive/not reproduced; TS-001/TS-002 remain open. No source changes, upload, build, dependency change, staging, commit or push in this review; historical entries/reflections below are preserved.

## RIR review — encoding correction awaiting review — 2026-11-16

**Outcome:** found a blocking source-text encoding regression in the prepared `ProofWidget.swift` diff against **23e8cf2d3928bd3fc2ade9b8e6586e7e3cc82b25**. Existing checkmarks, minus buttons, separators and failure messages contained garbled Unicode sequences. This was confirmed in UTF-8 source/code points, not inferred from terminal appearance. Restored 14 symbol occurrences across 13 lines; every corrected line exactly matches a baseline line. No layout, action, storage or other source behavior was changed by this correction. **Stop for correction review; not cleared for a build.**

Starting HEAD still matched the baseline on main tracking origin/main, with the same 14 accumulated unstaged paths and no staged files. Existing work is preserved. No fresh remote/allowance query, upload, build, dependency change, staging, commit or push.

**Bounded review findings:** SQL NULL is read with an explicit NULL check into Swift `Int?`, mapped to bridge `NSNull`, displayed with `??`/optional mapping, and passed unchanged to optional ActivityKit RIR; zero is not replaced by blank. The additive v7 migration is under the write transaction/version recheck. Complete marks the existing actuals row completed and creates/advances rest within the same transaction; Undo retains RIR in that row. Re-completion gets a fresh rest identity. New-set/Add Set INSERTs omit RIR and default to NULL. Adjustment/Clear use the existing session/current-set/rest/unfinished guards; ±1 validation and database constraints enforce integer 0–10. RIR is absent from the required-reps gate. Exact retry cases retain original operation/delta/IDs. Existing rest, Start/snapshot and workout action SQL is unchanged; only the existing `readSets` projection gains RIR.

**Compatibility limit:** the added optional field uses synthesized Codable and is intended to decode missing RIR as nil; [Apple documents missing/null handling for decodeIfPresent](https://developer.apple.com/documentation/swift/keyeddecodingcontainer/decodeifpresent%28_%3Aforkey%3A%29-8tib2). This supports the source assessment, not execution of the app's decoder. Swift was unavailable on this Windows PATH. Native compilation/decoding and installed migration remain **Not run**.

**Layout risks:** normal and Undo draft views retain existing adjustment dimensions and Complete Set/End Rest actions; saved rest is unchanged after symbol restoration. The context/RIR/Clear row is dense. Long names, the small Undo countdown, two-line notices and larger text may truncate or exceed the nominal height estimate. The weight/reps row also has finite width for large/decimal values. No rendered-fit or accessibility pass is claimed, and no speculative resizing was added.

**Checks after correction:** 122/122 SQL-wrapper/routine-model tests and TypeScript Passed. Ten fresh generated native-file SHA-256 comparisons and host/extension source/resource memberships Passed. All 13 corrected lines were compared to baseline; only text symbols changed. Markdown links/whitespace checked. No repeated JS export was needed for a Swift-string-only correction. Wrappers do not execute Swift, ActivityKit, React UI or failure/retry presentation; generated-source checks are not compilation.

**Next small task:** review the narrow symbol-restoration correction and confirm the remaining layout/decoder test plan. Do not build in this task. The Start-message correction and RIR remain unbuilt/device-unverified; initial blank → 0 remains inconclusive/not reproduced; TS-001/TS-002 and all untested phone cases stay open. Last verified free allowance is exhausted (15/15); no paid build authorized. Historical entries and learning reflections below are unchanged.

## Optional per-set RIR prepared locally — 2026-11-16

**Current state:** before editing, clean main tracked origin/main; HEAD and successful remote-main query both matched published **23e8cf2d3928bd3fc2ade9b8e6586e7e3cc82b25**. Bounded RIR implementation is now local/uncommitted. No upload, build, staging, commit, push, dependency or Git-setting change. Older checkpoint sections below retain their historical scope.

**Implemented:** optional actual RIR (reps in reserve), whole numbers 0–10; blank is unrecorded, explicit zero retained. + on blank enters 1; − leaves blank; bounds clamp; Clear returns to blank. Native guarded mutations commit before publication. Draft RIR survives reopening, completion includes it in the existing atomic actuals/rest transaction, Undo keeps it editable, and re-completion saves the correction. Every new planned/today-only set starts blank RIR; Add Set still copies only pounds/reps. No routine targets, RPE conversion or recommendations.

**Compatibility and actions:** transactional v7 adds one nullable checked column, leaving historical RIR blank and other rows/rest metadata/identities intact. Archived workout JSON is not rewritten; older missing RIR means unrecorded. Existing migrations run only when needed. Optional ActivityKit RIR is designed to decode absent fields as nil; this is source-reviewed, not native-tested. New adjustment/clear intents carry original session/set/rest IDs and use the existing current-draft/unfinished-exercise guards. Failed actions retain their exact operation, delta and identities for retry. No changes to Complete/Undo/Continue/Add/Next/Finish SQL or rest gating.

**Layout:** draft context and RIR −/value/+/Clear share the first row, followed by existing weight/reps and completion/End Rest rows. Button sizes are unchanged; draft padding is 8 points and text scaling is disabled there. Undo countdown remains visible even with rejection feedback. Normal saved-set rest confirmation/Undo/Continue and positive/zero/Off behavior are unchanged. Three nominal 44-point rows plus spacing/padding total 156 points; this is a source estimate, not rendered fit. Long names, larger text and VoiceOver remain unverified; a broader layout change may be needed if phone checks expose clipping.

**Local checks:** 122 tests Passed (103 persistence SQL-wrapper tests, 19 routine/model checks), TypeScript, iOS JavaScript export, ten regenerated native SHA-256 comparisons and source/resource target memberships. Added 12 tests cover null/zero, bounds/clear/reopen, Complete/Undo/re-completion/Add Set across three rest modes, missing reps, stale requests, write rollback, and v6 migration/rollback/rerun across draft/active/acknowledged/undone/finished states. Wrappers execute shipped SQL with separate JS orchestration; they do not execute Swift, ActivityKit or UI. Markdown links and whitespace checked. Swift compilation, native decoding, installed migration, rendered fit/accessibility and new phone behavior: **Not run**.

**Evidence retained:** c059edb9's bounded compilation/device evidence remains build-specific. The subsequently published Start-message correction is still **unbuilt/device-unverified**, as is this RIR patch. Initial blank → 0 stays **inconclusive / not reproduced**; no adjustment fix established. Failure injection, deliberate stale/duplicate execution and broader lifecycle/accessibility trials remain device-unrun. TS-001 automatic-reveal delay and TS-002 countdown jumps stay open/deferred. Production framework remains open. Last verified free allowance 15/15 used; no paid build authorized or allowance query in this task.

**Next small task:** review the bounded RIR diff, nullable mapping/retry identities and three-row layout before seeking any separately authorized native build. See the [future RIR phone checklist](../proofs/lock-screen/README.md#rir-phone-checklist--not-run). Do not submit a build while allowance or authorization is absent.

## Start integration publication review — 2026-11-15

**No publication blocker found.** Local main/HEAD and a successful fresh read-only remote-main query both match **e9856759843deeb8005c2eb05204b5eef4d3d4ec**; upstream origin/main. Reviewed the accumulated snapshot/migration/value/rest implementation, subsequent expected-error patch, tests and documentation. No source edits in this review. All 19 proposed paths below remain unstaged; no upload/build/commit/push.

**Updated c059edb9 evidence:** fresh-start pounds minus kept blank pounds/reps in card/app, revision 17 with zero records/requests and no rest. Complete → Undo → minus kept blank pounds × 1, zero records/one request, tracking Off and blank plan. Direct blank plus once after Undo produced 5 lb × 1 in card/app with plan/counts preserved. These are Passed — user-reported actions with screenshot-supported states from the supplied description, not independently observed execution. [Full repeat evidence](../proofs/lock-screen/README.md#blank-value-repeat-checks--2026-11-15). Initial blank → 0 remains inconclusive/not reproduced, not fixed or erased. No adjustment correction was established.

**Expected Start refusal review:** the same native unfinished-workout guard throws only the dedicated unfinishedWorkout case; the module catches only that case and returns startRejection=workout_unfinished. RoutineEditor is the sole production bridge caller and checks routineStartNotice before closing. Friendly text: “A workout is already in progress. Go back to resume it. Your workout has not changed.” Dirty/new drafts are still rejected before the call; expected refusal retains editor state and request token while finally releases busy. Coordinator storage/publication ordering is unchanged. Successful snapshot responses remain compatible, unknown rejection codes throw, and unrelated native errors propagate with diagnostics. No broad exception-string sanitization. This patch is source-reviewed, **unbuilt/device-unverified**; no Swift execution claimed.

**Validation/provenance:** 110 tests (91 SQL-wrapper/19 routine-model) and TypeScript Passed. Wrappers run shipped SQL/production TypeScript through separate JS orchestration, not Swift, React UI or ActivityKit. Local successful-preview archive/manifest: all 19 archived hashes verified; 15 current inputs still match. Exactly four differ: RoutineEditor.tsx, routineModel.ts, modules/LockScreenProofModule.swift, native/ProofStore.swift, all for the later Start-message patch. Current tests additionally use TEXT bindings and add regressions; they are excluded from upload inputs. Ten existing generated native copies still match current source. Prior local JS export remains applicable to unchanged source; no new export/compile or hosted IPA download needed. Publication path/content review and targeted secret/signing/device-ID scans found no sensitive or generated content. Markdown links/whitespace checked; histories/reflections preserved.

**Limits:** c059edb9 compiled/signed and has only its bounded reported device passes. The later message patch has no native compilation, rendered wording or phone pass. Blank-reps minus, injected failures/retries, deliberate stale/duplicate execution, broad concurrency/recovery/accessibility and older archived history remain unrun. Client retry UUID remains editor-lifetime scoped; reopening relies on unfinished-session protection/resume. Both TS-001/TS-002 remain open/deferred; production framework and RIR remain open work. Last verified allowance 15/15 used, not queried again; no paid build authorized.

**Next small task:** when explicitly authorized, recheck Git and this exact scope, stage these 19 paths, inspect staged contents/whitespace, then commit/push normally. Suggested message: **Add saved-routine workout snapshots and clear Start feedback**. Publication does not validate the unbuilt message patch; keep that limitation in the commit/checkpoint documentation.

1. README.md
2. docs/BUILD_LOG.md
3. docs/HANDOFF.md
4. docs/LOCK_SCREEN_FEASIBILITY.md
5. docs/PROJECT.md
6. docs/TROUBLESHOOTING_BACKLOG.md
7. proofs/lock-screen/App.tsx
8. proofs/lock-screen/README.md
9. proofs/lock-screen/RoutineEditor.tsx
10. proofs/lock-screen/modules/LockScreenProofModule.swift
11. proofs/lock-screen/native/ProofActivity.swift
12. proofs/lock-screen/native/ProofCoordinator.swift
13. proofs/lock-screen/native/ProofSQL.json
14. proofs/lock-screen/native/ProofStore.swift
15. proofs/lock-screen/native/ProofWidget.swift
16. proofs/lock-screen/native/RoutineStore.swift
17. proofs/lock-screen/routineModel.ts
18. proofs/lock-screen/tests/persistence.test.cjs
19. proofs/lock-screen/tests/routines.test.cjs

## Start device results and narrow wording correction — 2026-11-15

**Current status:** c059edb9's bounded device sequence is now recorded in the [proof evidence table](../proofs/lock-screen/README.md#start-device-evidence-and-two-issues--2026-11-15), separately from its prior compilation/signing. Screenshots, as described by the user, support preservation of the displayed completed workout, missing-rep refusal and the final revision-17 state; interactions remain user-reported. No images were independently re-inspected here. Local main remains published e9856759843deeb8005c2eb05204b5eef4d3d4ec with all previous work preserved; no source publication or new build.

**Recorded scope:** unsaved edits prevented Start; revision-3 snapshot stayed unchanged after a routine edit and a sequential competing Start refusal. Reported 90-second rest/confirmation/Undo/after-expiry re-completion worked; revision 3 finished at 40 × 9, 50 × 8, 45 × 10, three records/four requests, original plans intact. Revision 4 started at 42.5 × 8 and decimal completion passed by report. Blank pounds versus zero and Off/tracked-zero confirmation/Undo/Continue passed in the supplied sequence. Off Undo/edit/re-complete passed except minus on blank. Add Set copied 0 × 12 without a plan; corrected 0 × 13 saved, three total records by report. Revision 17's missing-rep screenshot shows blank draft/three requests/zero records/no rest; reps plus entered 1 with blank pounds by report. Final screenshot supports blank pounds × 1 and 0 × 12, two records/five requests, original plans preserved, tracking Off/dismissed rest. Do not expand these into general concurrency, retries, lifecycle/accessibility or archived-history passes.

**Minus on blank remains unresolved:** user clarified only the Lock Screen was checked before the later plus. Stored change versus display-only mismatch is unknown; 0 → 5 does not prove direct blank → 5. Source trace and TEXT-bound shipped-SQL checks preserve NULL after Off completion/Undo/minus; blank reps has the same SQL protections and passes locally. Native reads/bridge/rendering have explicit nullable handling. All 19 inputs initially matched c059edb9's source manifest; hosted IPA download returned HTTP 403, so actual bundled SQL was not inspected. No speculative adjustment/storage/publication correction made. [Smallest phone discriminator](../proofs/lock-screen/README.md#next-diagnostic-on-the-existing-build--not-yet-run).

**Start wording correction prepared locally — unbuilt/device-unverified:** the existing unfinished-workout guard now throws a dedicated case. The bridge catches only that case and returns `workout_unfinished`, avoiding Expo's UnexpectedException wrapper for this expected condition. The editor displays a friendly resume message and keeps draft/request identity; Back says “Back to workout.” Unrelated native errors and unknown rejection codes retain diagnostics. No change to SQL, migration, unfinished protection, deadlines, action IDs, snapshot/retry semantics or workout state. The prior successful build does not compile or verify this patch.

**Checks Passed:** all 110 tests (91 workout SQL-wrapper, 19 routine/model), TypeScript, local iOS JS/Hermes export and ten regenerated native copies. Persistence wrappers now bind all parameters as TEXT like Swift; added Off Complete/Undo/minus/reopen and blank-reps/direct-plus diagnostics. Tests execute production SQL/TypeScript through JS, not Swift, ActivityKit or React UI. Native compilation/runtime and new device checks remain Not run. Prior logs/reflections preserved; local Markdown/whitespace checked. No upload/build/staging/commit/push; last verified free allowance 15/15 used, not queried again. TS-001/TS-002 remain open/deferred.

**Next small task:** on existing c059edb9, capture a confirmed blank immediately before/after minus and reopen before any plus/Complete to compare the fresh app readout. Do not delete/reset. Record whether storage or only the card shows zero, plus any foreground repair. Keep the wording patch pending review and a separately authorized future build; no paid build is authorized.

## Saved-routine Start preview ready — 2026-11-15

**Exactly one authorized preview FINISHED:** [Build and installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/c059edb9-035e-44fa-adc2-b5291b038cf9), **c059edb9-035e-44fa-adc2-b5291b038cf9**, completed 2026-11-16T00:15:03.775Z / November 15, 4:15 PM America/Los_Angeles. Current Swift/native compilation and signing **Passed**: relevant native sources compiled, Xcode archive succeeded, and a signed IPA was exported. Installation, installed migration, native runtime and all new phone checks **Not run**. Earlier unbuilt/review sections below describe their original checkpoints.

**Preflight/source:** local main remains **e9856759843deeb8005c2eb05204b5eef4d3d4ec**, upstream origin/main, with all 17 accumulated paths unstaged. All 11 accumulated source/test hashes still match the reviewed version. A fresh isolated archive contained exactly 19 required files, all SHA-256 matching local source, including the dependency lockfile and both SQL resources. Ten generated native copies and host/extension membership matched; no credentials, signing/device identifiers, private records, dependencies, generated or unrelated files in the archive. Source inputs are the baseline plus nine reviewed changes: App.tsx, RoutineEditor.tsx, modules/LockScreenProofModule.swift and native ProofActivity.swift, ProofCoordinator.swift, ProofSQL.json, ProofStore.swift, ProofWidget.swift, RoutineStore.swift. The other ten inputs are unchanged from baseline after Git line-ending normalization. Audit files remain outside Git; no application-source edits or dependency changes. EAS_NO_VCS/proof-directory isolation means the build's Git commit field is empty; the local baseline and exact input manifest were recorded separately.

**Account/signing:** fresh Free-plan usage was 14/15 iOS before submission and **15/15 afterward: zero remaining this cycle**, zero overage builds and $0 estimated charges. Reported cycle ends 2026-12-01T00:00:00Z. Existing project/phone/remote signing were reused with frozen credentials; CLI skipped fresh Apple-server provisioning validation because this noninteractive run did not authenticate with Apple. Successful signed export is separate evidence. Version/build remain 1.0.0 (1). No paid usage, retry, account/signing change, staging, commit or push.

**Warnings:** formatted build summary reports 0 errors / 8 warnings; raw dependency logs contain additional repeated warnings, so eight is not an exhaustive raw-log count. Surfaced warnings concern generated AppDelegate/UIRequiresFullScreen iOS 26 deprecations, duplicate libc++, a missing Metal-toolchain Swift library search path, signed-extension stripping, a Hermes script phase without outputs and fastlane's future Ruby 3.3 requirement. Raw React/Expo/Hermes warnings also include headers/nullability/protocol/deprecation/concurrency and bundled-JS global/eval diagnostics. No diagnostic warning was attributed to the reviewed proof Swift sources; no warning was fixed or suppressed in this task.

**Known limits:** Start's client retry UUID persists while the editor remains mounted; reopening uses unfinished-session protection/resume. Old ActivityKit-content decoding, actual installed-data migration, bridge behavior, native concurrency/uncertain-response recovery, layout/accessibility and lifecycle/failure injection remain unverified. Rejected Complete can increase the received-request counter without saving a record or starting rest. Prior 107 wrapper/model tests and migration diagnostics are separate Windows evidence, not native runtime tests. Both TS-001 delayed automatic reveal and TS-002 countdown jumps remain open/deferred; production framework and RIR remain open work.

**Next small task — upgrade-first phone check (all Not run):** capture current routine/workout values, plans, counts, rest timestamps and acknowledgement before installing over the existing app without deleting/resetting. Close/reopen and compare; if a rest expires during installation, compare the stored deadline rather than identical remaining seconds. Confirm a new Start cannot replace unfinished work. Then follow the [saved-routine checklist](../proofs/lock-screen/README.md#saved-routine-start-integration--2026-11-15) for dirty/saved revision handling, snapshot isolation, nullable/decimal actions, all three rest modes, Undo/Add Set, explicit Finish/new Start and readable Lock Screen controls. Report each result separately; do not infer archived-history visibility because no history browser exists.

## Saved-routine Start review — 2026-11-15

**No blocking defect found; ready for a separately authorized preview build.** Reviewed the accumulated integration against **e9856759843deeb8005c2eb05204b5eef4d3d4ec**. Local main/HEAD remains that baseline with upstream origin/main; all 17 accumulated paths remain unstaged. No fresh remote query, application-source correction, upload/build, staging, commit or push in this review. Earlier sections below retain their original checkpoint status.

**Source findings:** migration copies existing columns under the version-checked write transaction and rolls back failed changes. Start serializes the workout transaction, captures one saved routine revision/names in a routine read transaction, and commits the independent snapshot/request mapping before publication. Dirty editor state is rejected without discard; unfinished work blocks replacement. Finished rows and archived readout remain stored. Nullable/decimal native reads, explicit null bridge values and app/card presentation preserve blank versus zero; Complete requires entered reps. Off/zero/positive rest retain separate acknowledgement and the existing Undo/re-completion/Add/Next/Finish action guards.

**Retry boundary:** the editor retains its request UUID while mounted; the database stores the committed mapping. An in-place retry returns the original current session before rereading the routine. Closing/reopening the editor loses the client token: a new request then encounters unfinished-session protection and must resume the existing workout. An old archived request rejects without replacing a newer session. These source paths need native/device verification; do not describe them as a tested crash-recovery flow. Rejected or stale Complete may still increment the existing diagnostic request counter for the current exercise; this does not mean a record was saved or rest restarted.

**Checks Passed on Windows:** all 107 existing tests and TypeScript. Three additional isolated SQL diagnostics preserved every pre-existing column/row for v5 expired, skipped and finished sessions through v6, with valid registration and SQLite integrity checks. The suite also covers rollback/rerun, active/acknowledged/undone migration, nullable/decimal actions, rest modes, snapshots, concurrent identical Start and retained history. These execute shipped SQL/TypeScript with separate JavaScript orchestration, not Swift, the real routine-read transaction, React interactions or ActivityKit. Ten existing generated native source/resource copies match current SHA-256; host/extension membership and the upload allowlist remain consistent. No fresh archive or native regeneration was needed for this source-unchanged review. Local Markdown links/whitespace checked.

**Not run:** current Swift compilation/signing, old ActivityKit-content decoding, installed migration, bridge/runtime validation, actual native concurrency/uncertain-response recovery, layout/accessibility and all new device trials. Previous preview 1a119269 covers the earlier editor, not Start integration. TS-001 delayed automatic reveal and TS-002 countdown jumps stay open/deferred; production framework and RIR remain open work.

**Next small task:** separately authorize one preview only after checking current free allowance and a fresh isolated archive/source hashes. After a successful compile, use the [upgrade-first checklist](../proofs/lock-screen/README.md#saved-routine-start-integration--2026-11-15): capture installed data without reset; verify preservation and unfinished-session refusal; test saved/dirty Start and snapshot isolation; exercise blanks/zero/decimals plus Undo/Add Set; check Off/zero/positive rest and explicit Finish/new Start. Keep compile, migration, layout and phone evidence separate.

## Saved-routine Start integration — 2026-11-15

**Implemented locally; unbuilt.** Baseline remains published **e9856759843deeb8005c2eb05204b5eef4d3d4ec** on main, upstream origin/main. Preserved the four uncommitted assessment-document changes and all prior history. The decisions below supersede the pending blank-value question in the earlier assessment; no fallback was adopted.

**Adopted values:** blank is distinct from zero in SQLite, native snapshots, bridge and UI. Blank pounds can be completed with entered reps; blank reps rejects completion, while explicit zero remains valid. Decimal pounds retain their value. First + on blank pounds/reps enters 5/1; minus on blank does nothing. Edits affect workout actual-entry values, never copied plans or the saved routine. Routine-derived workouts use the editor's provisional 0–2000 lb / 0–1000 rep bounds, with existing 5 lb / 1 rep increments; fictional fixtures retain their old bounds. These are proof limits, not production settings.

**Start:** open a saved routine and choose Start saved routine. Dirty/new editor drafts must be saved first; the message preserves edits and never starts a stale hidden plan. Native storage reads the requested ID/revision and exercise names in one routine read transaction, then commits copied order/names/source identities/plans/rest settings and fresh session-scoped action IDs in the workout database. A retained request UUID deduplicates retries, including ActivityKit failure after commit. An unfinished workout blocks new Start with an explicit resume message. Starting again after finishing archives the old displayed snapshot and retains its original set/exercise/rest rows; an old request cannot replace the newer workout. No history browser added.

**Migration/rest:** v6 transactionally rebuilds the set/rest tables for nullable decimals/deadlines, preserving installed values, IDs, counts, completion/Undo/Continue state and deadlines; legacy settings stay tracked at 20 seconds. Saved routines are read, not rewritten. Off creates a durable no-timer acknowledgement with saved confirmation/Undo/Continue; no countdown or time gate. On/0 shows 0:00 without a wait, but still requires Continue for the ordinary next draft. Undo immediately edits; Complete uses the saved deadline and can re-complete an undone draft after expiry or immediately when tracking is Off. Normal confirmation lasts until Continue. Fixture Reset is guarded against routine workouts and only deletes the current fixture, not archived workouts/routines. [Implementation details and device checklist](../proofs/lock-screen/README.md#saved-routine-start-integration--2026-11-15).

**Checks Passed on Windows:** 107 TypeScript/SQL-wrapper tests (89 existing + 18 integration/migration checks), TypeScript, local iOS JS/Hermes export, ten regenerated native source/resource copies and host/extension membership checks. Tests execute production SQL with separate JavaScript orchestration, not Swift/ActivityKit/React UI. Covered blank/zero/decimal values, rejected missing reps, Undo/re-completion/Add Set, Off/0/positive rest, snapshot isolation/order, concurrent identical Start, stale revision, unfinished-session protection, archived history, old actions/requests, transaction rollback and v5 active/acknowledged/undone migration/reruns. Local Markdown/whitespace checked. No Swift compiler available here.

**Not run:** new Swift compilation/signing, installed-data migration, old ActivityKit-content decoding, native bridge/runtime, failure injection on phone, layout/accessibility, long exercise names, concurrent Start across actual native processes, and all new device checks. Prior successful preview 1a119269 does not contain this source. Both TS-001 automatic-reveal delay and TS-002 countdown jumps remain open; no timer fix claimed. Production framework and later RIR work remain open. No dependencies, upload/cloud build, staging, commit or push.

**Next small task:** review the v6 migration, exact Start retry identities, native nullable/decimal bridge and the three rest modes before separately authorizing one preview build. Use the upgrade-first checklist without reset; keep wrapper, compile and device evidence separate.

## Routine-to-workout integration assessment — 2026-11-15

**Baseline verified:** local main/HEAD and a successful fresh remote-main query both equal **e9856759843deeb8005c2eb05204b5eef4d3d4ec**, upstream origin/main. Starting working tree was clean. The 16-file routine-editor milestone is published; the earlier publication-review task below is historical.

**Implementation decision needed before a fallback:** the routine model permits blank pounds/reps and decimal pounds, but current workout `proof_sets_v5` requires non-null actual pounds/reps; ProofSetSnapshot and Live Activity ContentState use nonoptional Int values. Workout reads use sqlite3_column_int64 and adjustments use the fictional 0–200 lb / 0–30 rep clamps. Direct integration would reject blanks or lose valid routine values. Do not replace blanks with zero, round pounds or silently restrict Start to fully filled routines.

Asked the user whether to extend the workout model for nullable values/decimal pounds, and to decide blank-entry behavior: what Complete does with blank reps and what the first +/− tap does on a blank field. Recommendation, not adopted: preserve nullable drafts/decimal pounds end-to-end; retain reps-only completion with blank pounds, require entered reps before completion, and define explicit blank-entry controls rather than guessing a numeric value. Await that decision before source implementation.

**Other integration work identified, not implemented:** saved revision snapshot with copied order/names/plans/rest and fresh action IDs; explicit unsaved-editor handling; durable Start request identity; preserve active and completed sessions without reset. The current session table has one active slot and Start returns that existing session, even after finish; history-preserving session retention needs an explicit migration. Rest creation currently hardcodes 20 seconds, and acknowledgement UI is tied to a deadline. Disabled rest needs a no-timer confirmation/Undo/Continue state; tracked zero should have no wait while retaining acknowledgement. [Bounded integration plan and checks](../proofs/lock-screen/README.md#routine-to-workout-integration-assessment--2026-11-15).

**Checks actually run:** source trace and isolated in-memory SQLite checks using shipped schema/migrations: null pounds rejected, null reps rejected, explicit zeros accepted, decimal 42.25 retained by SQLite (native integer projection is a separate source finding), repeated Start insert leaves one session. No installed data touched. These are SQL diagnostics, not Swift/runtime tests or implemented-integration acceptance checks. Documentation links/whitespace checked. No source edits, new dependencies, upload/build, staging, commit or push. Integration/native/device tests remain **Not run**; Start and disabled-rest workout behavior remain unimplemented. Existing user-reported passes, historical logs/reflections and both deferred troubleshooting issues remain intact.

**Next small task:** resolve blank-value completion/adjustment semantics, then implement the smallest lossless snapshot migration/integration and its preservation/idempotency tests. Do not adopt a fallback or broaden into templates, a redesign or production framework selection.

## Routine-editor publication review — 2026-11-14

**No publication blocker found.** Reviewed the complete accumulated routine-editor/optional-rest diff against published baseline **2245126dbec1a316c67621c6567db8420d233f6f**, including the five new files. Local main/HEAD remains that commit and tracks origin/main; no fresh remote query. All 16 paths below remain unstaged. No source changes, upload, build, staging, commit or push in this review.

**Device evidence for 1a119269-ecca-4cce-962d-5bf4d7d10e9a:** workout preservation is supported by the supplied before/after screenshots, recorded from the user's evidence summary rather than independently re-inspected images in this task. Routine preservation, Track rest Off persistence, remembered **60-second** duration, blank accepted Off, blank rejected On without losing edits, On/0 persistence and routine independence are **Passed — user-reported**. No additional values, counts or timestamps inferred. The earlier missing-set observation remains inconclusive; subsequent blank-versus-zero tests passed, with no confirmed bug or fix. [Build-scoped checklist](../proofs/lock-screen/README.md#current-optional-rest-preview--2026-11-14).

**Publication checks:** 89 tests (71 workout SQL-wrapper regressions and 18 routine/model checks) and TypeScript Passed. Wrappers execute production TypeScript and shipped SQL through separate JavaScript transaction logic, not Swift/runtime code. All **19 current build inputs** match both the preserved successful-preview archive and its SHA-256 manifest, including the dependency lockfile and both SQL resources; no archive extras or changed inputs. Existing native compilation/signing Passed in that preview; no new compile/device test ran here. Reviewed source wiring, validation, revision checks, separate routine storage, tests and documentation. Publication-path/content review and secret/device-ID pattern checks found no credentials, signing files, private records, dependencies or generated artifacts. Local Markdown links and whitespace checked.

**Scope/remaining checks:** Start remains disconnected from routines; future disabled-rest workout behavior (no countdown/wait, but saved confirmation and Undo before Continue) is adopted and **unimplemented**. This report does not establish failure/retry injection, deliberate stale/conflicting saves or actions, malformed native payloads, force-quit/system termination, broader recovery/migration, accessibility/larger text, broad layout or Complete Set / End Rest wording device passes. Unreported cases remain **Not run**. Production framework remains open; TS-001 delayed automatic reveal and TS-002 countdown jumps remain open/deferred. Historical sections below describe their original checkpoints, including earlier Not run states.

**Next small task:** when authorized, recheck Git/remote and scope, stage only these 16 reviewed paths, inspect the staged diff/whitespace, then commit and push normally. Suggested message: **Add routine editor with optional rest tracking**. Do not connect Start or include generated/audit files in that publication.

1. README.md
2. docs/BUILD_LOG.md
3. docs/HANDOFF.md
4. docs/LOCK_SCREEN_FEASIBILITY.md
5. docs/PROJECT.md
6. docs/TROUBLESHOOTING_BACKLOG.md
7. proofs/lock-screen/.easignore
8. proofs/lock-screen/App.tsx
9. proofs/lock-screen/README.md
10. proofs/lock-screen/RoutineEditor.tsx
11. proofs/lock-screen/routineModel.ts
12. proofs/lock-screen/modules/LockScreenProofModule.swift
13. proofs/lock-screen/native/RoutineSQL.json
14. proofs/lock-screen/native/RoutineStore.swift
15. proofs/lock-screen/plugins/withLockScreenProof.js
16. proofs/lock-screen/tests/routines.test.cjs

## Optional-rest preview ready — 2026-11-14

**Exactly one authorized preview FINISHED:** [Build and installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/1a119269-ecca-4cce-962d-5bf4d7d10e9a), **1a119269-ecca-4cce-962d-5bf4d7d10e9a**, completed 2026-11-14T23:21:56.523Z / 3:21 PM America/Los_Angeles. Native compilation and signing **Passed**: archive succeeded and signed IPA exported. This includes the routine editor, optional Track rest and reviewed decoder-local correction. No new source blocker or source edits; the previous decoder-only review passed with six focused wrapper tests and no further correction. Earlier preparation/blocker sections below are historical.

**Warnings:** build reported zero errors/eight warnings. Available output includes generated AppDelegate iOS 26 deprecations (OpenURLOptionsKey, UIWindow initialization, UIScreen.main), duplicate libc++ and a missing Metal-toolchain Swift library search path. Fastlane also warned Ruby 3.2.11 support will end in favor of 3.3+. These did not prevent archive/signing. No dependency, generated-source or signing changes made to suppress them.

**Preflight/source:** fresh Free allowance verified before submission; fresh isolated archive contains exactly 19 required files with all SHA-256 hashes matching reviewed local files. Both ProofSQL.json and RoutineSQL.json included; ten native files match reviewed generated copies. No extra paths, sensitive-pattern findings, credentials/signing/device identifiers/private records/dependencies/generated artifacts. Existing project/identifiers/registered phone/signing reused with frozen credentials; CLI skipped fresh Apple-server validation in non-interactive mode, distinct from successful signed export. Only RoutineEditor.tsx, routineModel.ts and RoutineStore.swift differ from earlier build e7194787. Source base remains local main/HEAD **2245126dbec1a316c67621c6567db8420d233f6f** plus accumulated uncommitted routine-editor work. EAS_NO_VCS omits a Git commit field; exact source manifest retained outside Git. Start remains disconnected from routines. No remote query, staging, commit, push or retry.

**Allowance:** 13/15 free iOS builds before; **14/15 afterward, one remaining**, zero overage builds and $0 estimated charges. This is the verified result of this submission, not a guarantee of later availability.

**Next small task — phone checklist, all Not run:**

1. Capture current workout actuals/drafts/plans/counts/rest metadata and existing routine order/sets/rest durations. Install over the current app without deleting/resetting; close/reopen and compare. Legacy routines should retain their duration and tracking behavior.
2. In a test routine, enter a recognizable duration, turn **Track rest Off**, save and reopen. Confirm Off and remembered text persist.
3. Turn **On** and confirm the entered duration returns unchanged; save/reopen again.
4. Clear the duration, switch Off and verify save/reopen succeeds with a blank (not zero). Switch On and save: validation must reject without losing any edits. Check explicit 0 separately.
5. Reuse the same exercise in a second routine with a different flag/duration. Edit/save/reopen both; verify independence and unchanged existing workout data/actions.

Installation, native runtime decoding/validation/persistence, layout/accessibility and new optional-rest device behavior remain **Not run**. The prior repeat blank-versus-zero pass is **user-reported**, not proof of this new build; no earlier missing-set bug/fix inferred. TS-001/TS-002 remain open/deferred. History and personal learning reflections preserved.

## Optional-rest review — 2026-11-14

**Source-level initialization blocker found; narrow correction prepared, compilation pending.** RoutineEntry's decoder used `?? restSeconds.map { ... }` while `restSecondsInput` and `sets` were still uninitialized. The nil-coalescing fallback is an autoclosure and referred to the instance property, capturing partially initialized self. Changed only that decoder to use a local `decodedRestSeconds` for the stored duration and fallback. Defaults, field names, values and validation are unchanged. This is a source-review finding, **not a reproduced Swift compiler failure**: no Swift compiler available here, and no cloud build authorized. Review the local correction before a separately authorized native compile; do not report ready/verified on the basis of wrapper tests.

**Other review findings:** missing tracking flag defaults on; legacy duration/zero supplies remembered text without rewriting saved documents. Each routine entry owns its flag/text/duration. Off serializes no active duration (null/omitted), retains blank/zero/other entered text and permits saving it; on requires trimmed ASCII integer 0–3600 matching the numeric duration. TS and Swift source agree for model-generated payloads; optional native nil omission is accepted by the model. Invalid input fails before the routine transaction and save catch paths leave dirty edits intact. Revision-checked atomic saves, exercise identity and separate RoutinePlans storage remain unchanged. Bridge names/types agree, and Start still calls the fictional workout with no routine input. No other blocking issue found in the reviewed paths; runtime correctness is still unverified.

**Checks Passed:** 89 existing TypeScript/SQL-wrapper tests and TypeScript; additional JavaScript serialization checks cover disabled null/omitted duration, exact raw text, all 3,601 valid enabled integer values, invalid inputs, and legacy 0/90/3600 defaults. These do not run Swift decoding/validation or React UI. Ten regenerated native copies match current files. Workout sources, module bridge, SQL, configuration and dependencies match e7194787; its compilation does not cover optional rest or this correction. Documentation links/whitespace checked. No archive/upload/build/staging/commit/push; all accumulated work preserved.

**Evidence/next task:** keep repeat blank-versus-zero **Passed — user-reported** separate; no confirmed missing-set bug/fix inferred. Both deferred troubleshooting issues remain open. Next: review this decoder-only correction, then separately authorize native compilation if appropriate. After a successful future build, capture routines/workout data before upgrading without reset; compare legacy settings, toggle off/save/reopen/on, test blank versus 0 and invalid enabled input, verify independent routine settings and unchanged workout history. All new native/runtime/device checks remain **Not run**. Historical logs and learning reflections preserved.

## Optional routine rest — 2026-11-14

**Implemented locally, unbuilt:** each routine exercise has a labeled **Track rest** switch. Turning it off preserves the entered duration text, including blank/invalid text, through toggles and save/reopen. Enabled tracking requires an integer duration from 0–3600; disabled tracking has no active duration and does not validate the remembered numeric text. Other routine validation still applies. New entries default on with a blank duration (provisional UI choice, retaining the earlier default). Settings remain independent per routine; Start is still disconnected.

**Installed-data compatibility:** additive JSON fields `trackRest` and `restSecondsInput`; existing numeric `restSeconds` remains the active duration when enabled and is null/omitted when off. Missing tracking flags decode as on; missing input text is derived from the saved duration, including explicit zero. No SQL schema migration, automatic rewrite/reset or workout mutation. Old routine documents remain unchanged until explicitly saved. Swift independently validates enabled text/duration agreement before the existing atomic revision-checked save. Downgrading to the older preview after saving this new format is not a supported compatibility claim.

**Future workout behavior — adopted, not implemented:** disabled tracking means no countdown or waiting requirement. Successful saving must still show confirmation and offer Undo before Continue advances. Do not silently advance or reuse a remembered duration as an active deadline. Later routine-start integration must snapshot the flag/duration independently of the editable routine.

**Checks Passed:** 89 tests (71 workout SQL-wrapper regressions, 18 routine/model tests), TypeScript, iOS JS/Hermes export (582 modules), ten regenerated native-file comparisons and host-only routine source/resource membership. New checks cover toggling/save/reopen, disabled blank/invalid text, re-enable validation without losing edits, blank versus zero, legacy document retention, independent settings/reorder/removal and stale-save rejection. These execute TypeScript and shipped SQL with JS wrappers, NOT Swift decoding/runtime or device UI. Only RoutineEditor.tsx, routineModel.ts and native/RoutineStore.swift build inputs differ from e7194787; tests/docs also updated. Workout sources, SQL, identifiers, dependencies and configuration unchanged.

**Evidence correction:** the repeat blank-versus-zero test is **Passed — user-reported**. The earlier missing-set report is not a confirmed bug or demonstrated fix. No new screenshots, values/counts or build identifier were supplied with this report; do not infer broader routine or recovery passes. Both existing troubleshooting issues stay open/deferred.

**Next small task:** review conditional validation and legacy decoding, then separately authorize a native/device preview if appropriate. Device checklist (all optional-rest checks **Not run**): preserve current routines/workout on upgrade without reset; reopen a legacy routine and confirm its duration/flag; enter a duration, toggle off/save/reopen/on and verify retention; save disabled blank/invalid text and confirm enabling requires correction without losing edits; reuse the same exercise in another routine and verify isolation/workout history. New Swift compilation, installed-data decoding, native persistence, switch layout/accessibility and optional-rest device behavior **Not run**. Prior e7194787 compilation applies only to its earlier source. No upload/build/staging/commit/push; all accumulated work, history and reflections preserved.

## Routine-editor preview ready — 2026-11-13

**Focused correction review Passed; exactly one preview FINISHED.** [Build and installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/e7194787-c08c-47bb-89a7-e5ef547b26bd) — **e7194787-c08c-47bb-89a7-e5ef547b26bd**, completed 2026-11-14T04:13:48.100Z (November 13 local). Native compilation/signing **Passed**: archive succeeded and signed IPA exported, zero errors/eight warnings, using SDK 57 with Xcode 26.6. No source correction or dependency change in this review. The withheld-build section below describes the previous task only.

**Validation review:** both validators use the same ECMAScript edge-whitespace set and 80-code-point/scalar boundary; C0/C1 controls are rejected after trimming. TypeScript rejects lone UTF-16 surrogates before either bridge call; Swift strings contain Unicode scalars and malformed routine JSON fails before writing. Ordinary names, whitespace, emoji, combining sequences, boundaries and malformed-surrogate vectors passed TypeScript checks. A source-literal/JavaScript comparison confirmed all 25 trim-set scalars against JavaScript trim across 1,112,064 Unicode scalars. This is NOT Swift runtime execution. Invalid input cannot partially replace the plan; catch paths retain edits. Identity/revision/transaction/workout behavior is unchanged by this correction. The Foundation/scalar APIs compiled in the actual build configuration.

**Checks:** 84 tests (71 workout SQL-wrapper regressions, 13 routine/model checks) and TypeScript Passed. Tests execute production TypeScript and shipped SQL through separate JS wrappers, not Swift/device persistence. Fresh archive: exactly 19 required files, all SHA-256 hashes match local source, no additional paths or sensitive content found. Credentials/signing/device identifiers/private records/dependencies/generated artifacts excluded. All 19 inputs also match the previous corrected archive, so prior ten generated-copy/host-membership checks remain applicable.

**Source/Git:** main/HEAD **2245126dbec1a316c67621c6567db8420d233f6f**, upstream origin/main, plus accumulated routine-editor work and validation correction. EAS_NO_VCS directory isolation does not attach a Git commit; base and exact source manifest recorded locally. Seven inputs differ from base: App.tsx, RoutineEditor.tsx, routineModel.ts, modules/LockScreenProofModule.swift, native/RoutineStore.swift, native/RoutineSQL.json, plugins/withLockScreenProof.js. Other twelve inputs match, including dependencies/config and Complete Set / End Rest widget wording. Start remains fixture-only. All 16 accumulated paths remain unstaged; no fresh remote query, commit or push.

**Allowance/signing:** Free iOS usage 12/15 before submission, 13/15 after; **two remain, zero overage builds/$0 estimated charges**. Existing project, identifiers, phone and credentials reused with frozen credentials. Non-interactive CLI skipped fresh Apple-server certificate/profile validation; signed export separately succeeded. No retry/additional build. Private logs/manifests are outside Git in the temporary routine-build audit folder.

**Next small task:** capture installed workout actuals/drafts/plans/counts/rest metadata; install over the app without deleting/resetting and compare after reopening. Follow the [six-step routine/wording checklist](../proofs/lock-screen/README.md#focused-later-device-checklist--all-not-run). A tiny first edit is renaming one fictional routine and reopening it. **Installation, native runtime validation, routine persistence, layout/accessibility, failure injection/conflict races and wording device checks remain Not run.** Compilation does not establish these outcomes. TS-001/TS-002 remain open/deferred; production framework remains open. History and personal reflections preserved.

## Routine-editor review — 2026-11-13

**Build withheld: validation blocker found; narrow correction prepared.** Native name validation used Swift grapheme-cluster length and Foundation whitespace/control classes, while TypeScript used Unicode code-point length and ECMAScript trim/C0–C1 rules. For example, 41 decomposed accented letters are 82 code points: the form rejects them but the original native length check accepted them. RoutineStore now uses scalar length, explicit ECMAScript edge whitespace and matching C0–C1 rejection. TypeScript also rejects lone UTF-16 surrogates before JSON reaches Swift. No routine schema, transaction, workout, dependency or signing changes in this review. Swift verification remains pending.

**Review:** whole-document BEGIN IMMEDIATE/COMMIT plus revision-checked updates protect saved plans; invalid form input never invokes save, and catch paths retain dirty edits. Separate routine storage has no workout writes. Stable exercise IDs survive membership removal; ordered planned-set entries remain part of each independent routine document, with no workout references to their array positions. Native optional values preserve blank versus zero. Three bridge names match their TypeScript callers, the routine Swift/JSON files belong only to the host Sources/Resources phases, and the configured inline module directory is unchanged. Start remains fixture-only. Existing Complete Set / End Rest and normal rest Continue labels are unchanged. These are source-review findings, not successful native/runtime tests.

**Checks Passed:** 84 tests (71 workout SQL-wrapper regressions plus 13 routine/model checks), TypeScript, local iOS JS/Hermes export (582 modules), ten regenerated native source/resource hash comparisons and host-only membership. New tests cover decomposed accents, emoji, edge whitespace/control characters, malformed UTF-16 and invalid edits leaving the saved plan/unsaved model unchanged. They execute production TypeScript and shipped SQL through separate JavaScript wrappers, not Swift or React rendering. Form error retention is inspected in source, not failure-injected on device.

**Fresh local EAS archive:** 19 required files, all SHA-256 hashes equal local source, no additional paths. Derived from the current entry point/imports, inline module, plugin and native sources/resources/config/lockfile; the old 15-file count is obsolete. Includes RoutineEditor.tsx, routineModel.ts, RoutineStore.swift and RoutineSQL.json. Excludes docs/tests, dependencies, generated output, signing files, credentials, device identifiers and private records. Archive inspection is local; no source upload/build. Manifest and generated-check evidence retained outside Git in the temporary routine-review audit folder.

**Git/build:** main/HEAD remains 2245126dbec1a316c67621c6567db8420d233f6f, tracking origin/main; accumulated 16 paths remain unstaged. No fresh remote query. Because the review found a blocker, no build was submitted even after correction. Current free allowance was not queried; no build allowance consumed or paid charge incurred. No installation link exists for this review. Historical allowance figures are not current availability.

**Next small task:** review this focused validation correction, then recheck the current allowance and archive before one separately authorized preview. New Swift compilation, bridge/native validation and persistence, installation, layout/accessibility, routine interactions and the published wording's device checks remain **Not run**. Both troubleshooting issues remain open/deferred; production framework stays open. See the [six-step device checklist](../proofs/lock-screen/README.md#focused-later-device-checklist--all-not-run). No staging, commit or push; history/reflections preserved.

## Routine-editor preparation — prior task, 2026-11-13

Published baseline **2245126dbec1a316c67621c6567db8420d233f6f** verified: local main/remote main match in a successful read-only query; starting tree clean, upstream origin/main. The previous two-exercise/wording milestone is published. Its publication instructions below are historical, not pending work.

**Implemented locally:** foreground routine create/name/save/reopen/edit, manual exercise names with reusable UUID identities, ordered membership with move/remove, three initially blank planned sets and add/remove/edit controls, explicit routine-exercise rest. Separate native RoutinePlans.sqlite3 stores exercise identities and revisioned, atomic routine plan documents. No existing workout migration/reset, no Start integration, no Live Activity change. Saved plan settings do not share state across routines. Removed membership preserves identity/history; blank remains distinct from zero.

**Direction:** prebuilt routines/templates later after core functionality; manual naming/reuse now. RIR is still required later for logging. Production framework remains open. Proof validation is provisional: names 1–80, maximum 30 distinct exercise identities per routine, 1–20 sets, blank or 0–2000 pounds (two decimals), blank or integer 0–1000 reps, explicit integer rest 0–3600 with no default; zero rest means no rest. Empty named routines are allowed. Unsaved routine edits are not durable until Save; discard prompts protect navigation, and failures keep edits. Saved exercise names persist independently, including if a routine draft is discarded.

**Checks Passed:** 82 tests (71 existing workout SQL-wrapper regressions, 11 routine checks), TypeScript, iOS JS/Hermes export, ten generated native file comparisons and host-only Swift/resource build-phase checks, local Markdown/whitespace. Routine tests execute production TypeScript plus shipped SQL via separate JS wrappers; no Swift/native validation/runtime execution. A populated workout database file remained byte-for-byte unchanged during routine mutations in the wrapper check. Dependencies/signing/identifiers unchanged.

**Not run:** new Swift compilation, installation, native bridge/migration/runtime persistence, rendered form/keyboard/accessibility and all routine device interactions. Complete Set / End Rest remains unbuilt/device-unverified from the published baseline. Both deferred troubleshooting issues remain open. No EAS upload/build, staging, commit or push.

**Next small task:** review the routine store's native validation, transaction/revision protection, form behavior and generated module/resource wiring before any separately authorized device build. [Provisional choices, limits and upgrade/editor checklist](../proofs/lock-screen/README.md#routine-editor-proof--2026-11-13). Later Start integration must create an independent durable workout snapshot of routine revision/exercise identity/plan/rest, preserving blanks; subsequent routine edits must never rewrite active/completed workouts. Do not implement that integration in this checkpoint.

## Previous published checkpoint — historical context

## Publication review — 2026-11-13

**No publication blocker found.** Reviewed the complete accumulated diff against published baseline **593d39d834e0ad33dd375822fc2e2313e466c592**: two-exercise fixture/v5 migration, Add/Next/Finish transactions and guards, added-set Undo, exact retries, app/card presentation, tests and all documentation. No source edit during this review. Local main/HEAD still equals baseline, tracking origin/main; no fresh remote query. All 15 paths remain unstaged, with no untracked files or staged changes.

**Next small task:** when explicitly authorized, recheck Git/remote and the reviewed scope, stage only the 15 paths below, inspect staged contents/whitespace, commit and push normally. Suggested commit message: **Add two-exercise proof and clarify Undo rest controls**. Publication review does not authorize a build or claim the later labels are native/device verified. A separate future build/device check is needed for the wording patch.

**Archive comparison:** compared all 15 current build inputs with the preserved, inspected a6785cf2 archive and checked the archive against its recorded SHA-256 manifest. **14 match; exactly one differs: native/ProofWidget.swift.** Every difference in that file is presentation wording: Undo-rest Complete → Complete Set; Continue → End Rest; matching accessibility labels and rest-dismissal hint; the local default/known deadline instruction now reads “Complete Set at zero or End Rest.” Other notices are preserved. All Button intent bindings and session/set/rest IDs, normal saved-rest Continue, failure/retry branches, countdown, storage and guards are unchanged. No source additions/removals relative to that archive. Config, dependencies and package-lock.json match.

Matching inputs: App.tsx, app.config.js, eas.json, index.js, modules/LockScreenProofModule.swift, native/ProofActivity.swift, native/ProofCoordinator.swift, native/ProofIntents.swift, native/ProofSQL.json, native/ProofStore.swift, package-lock.json, package.json, plugins/withLockScreenProof.js, tsconfig.json. The archive excludes docs/tests; their baseline diffs were reviewed separately. Historical statements that all hashes matched describe the earlier build submission, not current source.

**Validation:** 71 production-SQL wrapper tests and TypeScript re-run Passed; Markdown links and whitespace Passed. Wrappers execute shipped SQL with separate JavaScript transaction/migration/read logic, not Swift, App Intents or ActivityKit. a6785cf2 compilation/signing and its limited screenshot-supported/user-reported sequence apply only to that archived source. Current wording patch remains **unbuilt and device-unverified**: new Swift compilation, rendered fit and accessibility Not run. Deliberate duplicate/stale/competing requests, failure retries and broader device recovery/migration cases remain unrun unless separately evidenced. Both TS-001 and TS-002 remain open/deferred.

**Publication contents:** complete proposed diff and file contents reviewed, with credential/device-pattern checks; no credentials, signing files, device identifiers, private records/scans, screenshots, dependencies or generated artifacts found. Recorded values are fictional proof-test results. AGENTS.md unchanged; lockfile already tracked and unchanged, so neither is an additional proposed path. Historical build-log entries and learning reflections preserved. No upload/build/staging/commit/push.

**Exact proposed files (15):**

1. `README.md`
2. `docs/BUILD_LOG.md`
3. `docs/HANDOFF.md`
4. `docs/LOCK_SCREEN_FEASIBILITY.md`
5. `docs/PROJECT.md`
6. `docs/TROUBLESHOOTING_BACKLOG.md`
7. `proofs/lock-screen/App.tsx`
8. `proofs/lock-screen/README.md`
9. `proofs/lock-screen/native/ProofActivity.swift`
10. `proofs/lock-screen/native/ProofCoordinator.swift`
11. `proofs/lock-screen/native/ProofIntents.swift`
12. `proofs/lock-screen/native/ProofSQL.json`
13. `proofs/lock-screen/native/ProofStore.swift`
14. `proofs/lock-screen/native/ProofWidget.swift`
15. `proofs/lock-screen/tests/persistence.test.cjs`

## Latest guided device results — 2026-11-13

For build **a6785cf2-13ea-4384-985d-065fc0051ea2**, the supplied upgrade screenshots support preserved records/draft/plans/counts/rest timestamps and one legacy exercise. The fresh-fixture sequence supports Add Set above Next Exercise after Continue, a today-only 45 × 11 draft without changing plans or three saved records, and later B defaults 15 × 12 then 20 × 10 with Add Set above Finish Workout. Added-set Undo immediately restoring editing while rest continued and Finish staying on the authenticated Lock Screen are **Passed — user-reported**. Next loading B on the visible Lock Screen is also user-reported.

The subsequent screenshot supports Set 4 saved at 45 × 12, four records/five requests; it does not establish exact interaction timing. The final screenshot supports both exercises/workout finished: A 40 × 8, 50 × 8, 45 × 11 and today-only 45 × 12; B 15 × 12, 20 × 10; six records/seven requests; final rest Skipped/Dismissed. Screenshot-supported state is recorded from the user's supplied summary, not independently inspected images in this task. [Detailed evidence and limits](../proofs/lock-screen/README.md#guided-two-exercise-device-evidence--2026-11-13).

Deliberate duplicate/stale/competing actions, failure retries, accessibility and broader recovery remain **Not run on device**. Other migration cases, exact added-set gating/timing and post-finish reopen are not inferred. The **Complete Set / End Rest** wording patch below remains **unbuilt and device-unverified**. Both troubleshooting issues stay open. No new source/build/publication action.

## Latest local wording patch — 2026-11-13

Undo-rest editing now labels its two existing actions **Complete Set** and **End Rest**, with matching accessibility labels and local instruction text. Normal saved rest retains **Continue**. End Rest does not save the draft; Complete Set still checks the stored deadline and saves before creating fresh rest. Only ProofWidget.swift presentation changed; actions, IDs, exact retries, storage and guards unchanged. TypeScript, focused source-diff/layout inspection, Markdown and whitespace checks Passed. Rendered fit, new Swift compilation and device behavior **Not run**. No cloud upload/build/staging/commit/push.

**Wording review completed:** publication review above confirms presentation-only changes. A separately authorized preview and phone check remain necessary for readable/reachable controls and the unchanged early-completion/rest-dismissal behavior. The successful a6785cf2 preview below predates this patch and contains the earlier labels. Its guided upgrade and exercise sequence now has the limited evidence above; the full checklist still contains unrun cases. [Current wording and focused checklist](../proofs/lock-screen/README.md#local-undo-rest-wording-refinement--2026-11-13). Both deferred troubleshooting issues remain open.

Updated 2026-11-13. Local main/HEAD remains published baseline [593d39d](https://github.com/fgzmac/Swoldier/commit/593d39d834e0ad33dd375822fc2e2313e466c592), tracking origin/main. Prior preparation verified the remote; no fresh remote-ref query in this review. All 15 accumulated unstaged paths preserved. **Review passed with no source correction.** Exactly one [two-exercise preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/a6785cf2-13ea-4384-985d-065fc0051ea2) **FINISHED** at 2026-11-14T01:15:06.493Z (November 13 local). **Native compilation/signing Passed**: archive succeeded, zero errors/nine warnings, signed IPA exported. **Later guided results recorded above:** limited upgrade preservation and Add/Undo/Next/Finish evidence; broader migration/decoding, layout/accessibility, action-safety and recovery checks remain Not run. The wording patch postdates this build. No retry, staging, commit or push.

## Original built-source checklist — retain for remaining trials

The supplied guided upgrade/fresh-fixture sequence is now recorded above; it does not pass every original checklist item. Preserve that evidence, and keep unreported migration states, deliberate action-safety and recovery trials separate. The wording review is complete; next publication and any later preview require their own authorization. No further build is authorized by this handoff.

**Adopted UI:** final completion retains confirmation/countdown/Undo/Continue; after Continue, show exactly two vertical actions: Add Set above Next Exercise, or above Finish Workout on the final exercise. Never advance/finish automatically. Added sets copy this exercise's last completed actual values, preserve plans, and support existing Undo/immediate editing and deadline guards.

**Fixture:** new/reset sessions contain Fictional Exercise A (40 × 8, 50 × 8, 45 × 10) and Fictional Exercise B (15 × 12, 20 × 10); both use 20-second rest. Installed sessions stay a single legacy exercise, retaining every ID/value/plan/count/rest field; they offer Add Set / Finish Workout after final rest acknowledgement. No silent second exercise and no deletion/reset needed for upgrade preservation.

**Storage:** v5 transactionally copies the old three-set table into a new authoritative table with exercise identity and today-only flags, preserving the original table; adds exercise/session finish metadata. Added drafts have no planned target. SQL validates session/set/rest and current exercise eligibility; fresh rest identities protect re-completion, an existing new draft consumes Add eligibility, and finish/advance commit atomically. Finished/previous exercise records cannot be mutated by stale actions. Optional Activity metadata preserves old-content shape; exact retries retain original identities. The supplied upgrade supports preservation for one installed legacy session; other migration cases and dedicated old-content decoding remain Not run.

**Review/checks:** re-ran 71 production-SQL wrapper tests and TypeScript: Passed. The wrappers execute shipped SQL with separate JavaScript migration/transaction/snapshot logic, not Swift/runtime evidence. Inspected commit-before-publication, exact retry identities, final-rest choices, finished-history guards, added-set Undo, competing transitions and v5 copying; no blocker. At the a6785cf2 build review, eight generated source/resource files matched the then-current native inputs; Markdown/whitespace Passed. Earlier local JS/Hermes export remains a preparation result, not a rerun. The new EAS build separately establishes native compilation/signing, not migration or device behavior. Dependencies/identifiers unchanged; production framework open.

**Build provenance/archive:** baseline 593d39d834e0ad33dd375822fc2e2313e466c592 plus the accumulated local App.tsx and native ProofActivity.swift, ProofCoordinator.swift, ProofIntents.swift, ProofSQL.json, ProofStore.swift and ProofWidget.swift changes. No source correction during review. A fresh isolated archive contained exactly 15 intended files, including nested Swift/SQL/plugin/module sources and package-lock.json; all SHA-256 hashes matched the local files at submission time. The later wording patch now makes ProofWidget.swift differ, as detailed in the publication review above. Docs/tests, dependencies, generated artifacts, credentials/signing/device files and unrelated files excluded. Existing Expo project and app/extension credentials reused with freeze-credentials; Apple-server profile validation was skipped because this noninteractive session was not authenticated to Apple. No registration or signing changes. Free iOS allowance: 11/15 before, 12/15 after; zero overage and $0 estimated charges. Exactly one submission.

**Original device plan — only the explicitly reported subset above has evidence:** upgrade without deleting/resetting and compare one-exercise data first; then deliberately reset for the two-exercise fixture. Check final rest timing/order, Add copy and no-save/no-rest semantics, added-set Undo/edit/expiry/re-completion, durable A→B advance with B defaults, B Add/Finish, and reopen after finish. Inspect controls and preserve old records; deliberate duplicate/stale/retry/lifecycle trials remain separate. [Full implementation and checklist](../proofs/lock-screen/README.md#two-exercise-proof--prepared-locally-2026-11-13).

Add Set is implemented locally in this bounded proof only. TS-001 delayed automatic reveal and TS-002 countdown jumps remain open; no timing/display fix claimed. Earlier Undo successes remain user-reported, scoped to build 74c497a5 and earlier sequences.

## Published Undo handoff — historical context

The following handoff was committed at 593d39d834e0ad33dd375822fc2e2313e466c592 and is preserved for evidence/history. Its former next-publication task is complete; new two-exercise work is described above.

Updated 2026-11-13. Published baseline remains [3f0874507b2fb5e713b09226c04dddea101d2e11](https://github.com/fgzmac/Swoldier/commit/3f0874507b2fb5e713b09226c04dddea101d2e11); local main/HEAD rechecked. No remote query in this task. All 15 existing unstaged paths preserved; no staging/commit/push. **Immediate-edit Undo review passed without source correction.** Exactly one [immediate-edit Undo preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/74c497a5-308e-4f0d-bee7-53152648eed5) **FINISHED** at 2026-11-13T17:45:38.671Z (November 13 local). **Native compilation/signing Passed**: Xcode archive succeeded with zero errors and eight warnings; signed IPA exported. The focused upgrade/immediate-edit/Continue/expiry/control-layout sequence is now **Passed — user-reported**, recorded 2026-11-13; dedicated migration/decoding, failure/retry, stale/duplicate, accessibility and broader lifecycle checks remain **Not run**. Earlier Undo preview b035cb35 and its user-reported results remain separate below. No retry, staging, commit or push.

<a id="next-task--review-undo-before-one-separately-authorized-device-build"></a>
<a id="next-task--upgrade-and-test-undo-on-the-iphone"></a>

<a id="next-task--review-the-immediate-edit-undo-refinement"></a>

<a id="next-task--upgrade-and-test-immediate-edit-undo"></a>

## Next task — publish the reviewed Undo checkpoint when authorized

Publication review against baseline 3f0874507b2fb5e713b09226c04dddea101d2e11 found no blocker. Recheck the diff and remote state, then stage/commit/push only the 15 reviewed paths below when explicitly authorized. Suggested commit message: **Add Undo with immediate editing and preserved rest**. No publication action taken in this task; local HEAD remains baseline and all changes remain unstaged. Remote refs were not queried here.

The five focused device-checklist steps for build **74c497a5-308e-4f0d-bee7-53152648eed5** are **Passed — user-reported**, confirmed 2026-11-13. This covers displayed data preservation across upgrade, immediate Undo editing with preserved rest, edits surviving early Complete rejection, edited early Continue followed by corrected completion/new rest, completion after zero without Continue or opening the app, and readable/reachable controls with plans/other records unchanged. No new screenshots, exact entered values, aggregate counts or timestamps were supplied; none were independently observed or inferred.

Failure/retry injection, deliberate stale requests, duplicate execution, VoiceOver/larger text and broader lifecycle/migration/decoding checks remain **Not run**. This report does not establish that countdown jumps are fixed. TS-001 delayed automatic reveal and TS-002 countdown jumps remain open; Add Set remains adopted, unimplemented. The earlier b035cb35 final-set correction is separate; final-set completion without Continue on this newer build was not separately evidenced.

**Publication checks:** full accumulated source/test/documentation diff reviewed; 51 production-SQL wrapper tests and TypeScript Passed. Wrappers do not execute Swift. All 15 upload inputs still match the successful build's source hashes. Markdown links/whitespace and historical-log/reflection preservation checked. No untracked files, credentials/signing/device identifiers, generated artifacts, dependencies, screenshots or private records found in the proposed diff. No source edits. Existing dependency lockfile is already tracked and unchanged, so it is not an additional proposed path.

**Exact proposed files (15):**

1. README.md
2. docs/BUILD_LOG.md
3. docs/HANDOFF.md
4. docs/LOCK_SCREEN_FEASIBILITY.md
5. docs/PROJECT.md
6. docs/TROUBLESHOOTING_BACKLOG.md
7. proofs/lock-screen/App.tsx
8. proofs/lock-screen/README.md
9. proofs/lock-screen/native/ProofActivity.swift
10. proofs/lock-screen/native/ProofCoordinator.swift
11. proofs/lock-screen/native/ProofIntents.swift
12. proofs/lock-screen/native/ProofSQL.json
13. proofs/lock-screen/native/ProofStore.swift
14. proofs/lock-screen/native/ProofWidget.swift
15. proofs/lock-screen/tests/persistence.test.cjs

**Current build provenance:** baseline 3f0874507b2fb5e713b09226c04dddea101d2e11 plus accumulated uncommitted App.tsx and native ProofActivity.swift, ProofCoordinator.swift, ProofIntents.swift, ProofSQL.json, ProofStore.swift and ProofWidget.swift changes. Only ProofSQL.json, ProofStore.swift and ProofWidget.swift differ from the prior b035cb35 upload. A fresh isolated archive contained exactly 15 intended files including package-lock.json; all SHA-256 hashes matched local source. Dependencies, generated artifacts, signing/credential/device files, docs/tests and unrelated repository files excluded. Existing project and remote app/extension signing reused with frozen credentials; no new registration or signing changes. Noninteractive setup did not freshly validate profiles on Apple Servers. Free iOS usage was 10/15 before and 11/15 after, zero overage and zero estimated charges.

**Current adopted behavior — 2026-11-13:** Successful committed Undo now immediately exposes its restored pounds/reps and adjustment controls alongside the original bounded countdown. Continue is not needed to edit. Changes preserve plans, other records, later drafts and the saved deadline. Complete stays tappable: native SQL rejects it before the deadline unless Continue explicitly ended rest early; at/after the saved deadline, only the matching undone draft can complete without acknowledgement. The instruction “Complete at zero or Continue” is timeless; there is no isStale, disabled-button clock gate, timer callback or promised exact redraw. Normal completed-set rest keeps confirmation/countdown/Undo/Continue until acknowledgement. Continue preserves edits; re-completion atomically saves corrected actuals and starts a fresh rest identity/deadline.

**Safety and compatibility:** only the last acknowledgement predicate in Complete changed, allowing an unacknowledged rest only when undone_at is present and its set_id matches the target; the existing saved-deadline and active session/set/rest guards remain. Swift samples now after obtaining the write lock. No schema/content field change or new migration: existing v4 undone rests use the new presentation on normal republish/reopen, preserving all stored data; older migration/decoding paths stay unchanged. Normal unacknowledged rest still requires Continue after zero. Old/repeated Undo/Continue/edits and retries keep their original IDs; fresh UUID rest identity still protects same-set re-completion. Old Complete can count a received request for its addressed set but cannot mutate a newer completed record/rest. Committed snapshot publication and failed-action precedence are unchanged.

**Earlier Undo evidence — Passed — user-reported, recorded 2026-11-13:** final-set Undo at zero; corrected re-completion at 45 lb × 11 with its plan still 45 lb × 10; and active-rest Undo preserving the draft/deadline. These reports concern the earlier Undo flow associated with build b035cb35-659a-4782-a7b7-3e5d0125be89 in this session, not the new immediate-edit refinement. No new screenshots or device instrumentation were independently inspected. Do not extend these results to upgrade preservation, duplicate/stale dispatch, exact failure/retry, force-quit, termination, accessibility or other unreported trials.

**Local checks:** 51 production-SQL wrapper tests Passed (seven new targeted checks; existing early-Continue re-completion test adjusted for the superseded expiry rule), TypeScript Passed, eight regenerated native-file comparisons Passed, and Markdown links/whitespace/history checks Passed. SQL is executed by a separate JavaScript wrapper, not Swift. The review reran the 51 SQL-wrapper tests and TypeScript, verified eight generated-file matches and a fresh 15-file archive, and found no blocking issue or source correction. Exactly one [immediate-edit Undo preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/74c497a5-308e-4f0d-bee7-53152648eed5) **FINISHED** at 2026-11-13T17:45:38.671Z (November 13 local). **Native compilation/signing Passed**: Xcode archive succeeded with zero errors and eight warnings; signed IPA exported. The focused upgrade/immediate-edit/Continue/expiry/control-layout sequence is now **Passed — user-reported**, recorded 2026-11-13; dedicated migration/decoding, failure/retry, stale/duplicate, accessibility and broader lifecycle checks remain **Not run**.

<a id="immediate-edit-phone-checklist--all-not-run"></a>

## Immediate-edit phone checklist — scoped results and remaining trials

The reported guided sequence is recorded above. Do not mark the broader final-set or deliberate edge-case steps passed without separate evidence.

1. Before installing this preview, capture actuals/drafts/plans/counts and rest/deadline/acknowledgement; install without deletion/reset and compare after ordinary reopen.
2. Fresh trial: Complete an edited Set 1, then Undo during active rest. Confirm values/adjustments appear immediately on the authenticated visible Lock Screen while the original countdown continues. Edit pounds/reps without Continue; inspect unchanged plan, later drafts, deadline and other records after reopen.
3. Tap Complete before zero. Verify no completed record/new rest; the received-request counter may increment by existing design. Continue early, verify edits survive and skipped/acknowledged state is saved, then re-complete once with corrected actuals/new rest.
4. Separate trial: Undo during rest, edit, and leave the card through zero without Continue or opening the app. Tap Complete using that same card; verify one corrected current record and a fresh deadline. No exact visual refresh at zero is required or promised.
5. Undo final Set 3 at/after zero, edit and Complete without Continue. Verify three current actuals, unchanged plans/earlier records, normal final rest and no fourth set/automatic finish. Check reachable controls/clipping separately.
6. Deliberate old-ID/duplicate/retry injection, migration/lifecycle and accessibility cases remain separate unrun trials. Physical taps do not establish intent counts. Record countdown jumps separately; both troubleshooting issues remain open.

**Add Set — adopted, unimplemented:** copy the last completed set's pounds/reps for the same exercise to an editable today-only draft; routine count unchanged. No fourth set/control added. No-prior-completion behavior and production framework remain open. TS-001 delayed automatic reveal and TS-002 countdown jumps remain open/deferred.

## Earlier Undo build provenance — 2026-11-12

The following describes the previous source, not a build of this refinement. Its earlier Continue-before-edit and acknowledgement-at-expiry requirements are superseded for the matching undone draft only.

**Build provenance:** baseline 3f0874507b2fb5e713b09226c04dddea101d2e11 plus the prepared local App.tsx and native ProofActivity.swift, ProofCoordinator.swift, ProofIntents.swift, ProofSQL.json, ProofStore.swift and ProofWidget.swift changes. All 15 allowlisted archive files (including package-lock.json) matched local SHA-256 hashes; unrelated repository files, tests/docs, dependencies, generated artifacts and sensitive/signing/device files excluded. Existing remote app/extension signing reused with frozen credentials, no signing change; noninteractive setup did not freshly validate profiles against Apple Servers. Final Xcode archive succeeded with zero errors (nine warnings); signed IPA exported. Free iOS allowance was 9/15 before and 10/15 after, zero overage and zero estimated charges. No retry, staging, commit or push.

## Earlier saved-confirmation checkpoint evidence

The following review/build evidence was recorded before Undo. Its publication task is complete at 3f0874507b2fb5e713b09226c04dddea101d2e11; former next-task instructions and source descriptions are historical, not the current next step.

Updated 2026-11-12. **Published baseline:** [92da1c915ff702941fcc8b00003dd3f0caf2933e](https://github.com/fgzmac/Swoldier/commit/92da1c915ff702941fcc8b00003dd3f0caf2933e); local HEAD rechecked, remote main was verified in the earlier preparation task and was not queried again here. Existing ten unstaged paths preserved. Corrected retry review passed; this documentation/publication review made no source changes and found no publication blocker. Exactly one [saved-confirmation preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/33cfa887-8f9f-46cd-a5d8-95d88dd3e31f) **FINISHED** at 2026-11-13T05:28:37.744Z (November 12 local). **Native compilation/signing Passed**. Bounded upgrade preservation and fresh Set 1 confirmation/Continue/reopen now **Passed — user-reported**, with evidence types separated below. Failure/retry, duplicate/stale actions, VoiceOver, larger text and broader recovery remain **Not run**. Prior Continue passes remain user-reported for build 41621efa. TS-001/TS-002 stay open/deferred.

**Adopted 2026-11-12 — Continue; native compilation/signing Passed; migrated-record and fresh-fixture device sequences Passed — user-reported, remaining checks unrun.** Show countdown and one button labeled exactly **Continue** on the rest card, plus the newly adopted compact confirmed-save/failure feedback described below. Before zero, Continue ends rest early and reveals the next existing draft. At/after zero, Continue reveals that draft without saving a set or restarting rest. Preserve prior draft edits, planned targets, completed records, and duplicate/stale-action guards; keep the authenticated Lock Screen visible. After the third rest, Continue reveals **Planned sets recorded**, with no fourth set or automatic exercise finish. Keep editing/Complete hidden on the rest card; do not adopt the earlier visible-controls recommendation.

Continue supersedes automatic return as a first-version requirement. Prompt automatic reveal is deferred, not fixed or proven impossible. The implementation must not depend on delayed system staleness to make controls available. See [TROUBLESHOOTING_BACKLOG.md](TROUBLESHOOTING_BACKLOG.md): TS-001 tracks delayed reveal; TS-002 separately tracks countdown pauses/jumps. Future investigations in the supplied backlog are proposals, not work authorized by this documentation task.

<a id="next-task--publish-the-reviewed-saved-confirmation-checkpoint"></a>

## Earlier publication review — saved-confirmation checkpoint

The user attributes the latest upgrade and fresh trial to build **33cfa887-8f9f-46cd-a5d8-95d88dd3e31f**. **Screenshot-supported preservation, as described by the user:** before/after actuals 40 × 8, 50 × 8, 45 × 10; plans; three records/requests; Expired/Dismissed rest; deadline and acknowledgement timestamps unchanged. Exact timestamps were not supplied. No new images were attached or independently inspected here; artifact identity is user-reported.

**Separate fresh trial after reset — Passed — user-reported:** Set 1 completed at 40 × 8; ✓ Set saved appeared promptly, persisted through 0:00 and was not clipped. Continue removed confirmation and revealed Set 2 at its planned 50 × 8 on the authenticated visible Lock Screen. User confirmed ordinary reopen showed one record/one request and Expired/Dismissed rest. This is one fresh completed set, not a new full three-set trial. [Detailed evidence and limits](../proofs/lock-screen/README.md#saved-confirmation-device-results--2026-11-12).

**Publication review:** ten proposed paths below; no source changes in this task, no untracked files, and no credentials, signing/device files, generated artifacts, dependencies or private records found in the reviewed diff. All 15 source/configuration/lockfiles still match the successful build's inspected source hash manifest. Existing source/SQL and evidence distinctions reviewed; 29 SQL-wrapper tests, TypeScript, Markdown links and whitespace Passed. SQL wrappers are not Swift/runtime tests. Historical logs/reflections and unrelated work preserved. Nothing staged, committed or pushed; local HEAD remains 92da1c915ff702941fcc8b00003dd3f0caf2933e. Remote refs were not rechecked in this documentation task.

**Next small task:** when explicitly authorized, recheck the working diff and remote state, then stage/commit/push only these ten reviewed paths. Suggested commit message: **Add saved-set confirmation and exact-action retries**. This is a bounded proof checkpoint, not a production-release or broad test-coverage claim. No new build is needed merely to publish the unchanged source.

1. README.md
2. docs/BUILD_LOG.md
3. docs/HANDOFF.md
4. docs/LOCK_SCREEN_FEASIBILITY.md
5. docs/PROJECT.md
6. docs/TROUBLESHOOTING_BACKLOG.md
7. proofs/lock-screen/README.md
8. proofs/lock-screen/native/ProofActivity.swift
9. proofs/lock-screen/native/ProofCoordinator.swift
10. proofs/lock-screen/native/ProofWidget.swift

AGENTS.md, dependency lockfile, tests, storage/SQL, intent definitions and configuration are already tracked and unchanged; they are not additional staged paths for this checkpoint.

**Corrected review passed:** each error-card retry uses the original failed operation and session/set/rest IDs; edits retain their delta, and legacy Skip retains its entry point. Complete cannot turn into Continue or target the next set. Continue's guarded update requires the matching current rest/set and no prior acknowledgement. Outdated Complete cannot complete a newer set or restart rest; its received-request counter can still increment for the addressed existing set by design. A successful store return publishes a newly constructed saved snapshot with saveFailed false and failedAction nil; another throw captures the request that actually failed. No automatic replay. Optional new payload fields do not make older serialized content require new keys; old failure content without retry metadata requests reopening rather than inventing a target. Source compatibility was reviewed and the code compiled; actual older-content decoding on the phone remains Not run.

**Confirmation trace:** only a committed completed row matching the current rest supplies savedRestSetID, checked again in the widget. No tap or pending write produces success. Failure takes precedence over every normal layout, including the final summary; success remains through zero until stored Continue acknowledgement dismisses rest. Store, SQL/migration, deadlines, drafts/plans/actuals, action guards, intents and dependencies are unchanged. The only uploaded source differences from baseline are native/ProofActivity.swift, ProofCoordinator.swift and ProofWidget.swift; no source correction was needed in this review/build task.

**Checks/build:** 29 production-SQL wrapper tests and TypeScript Passed. Wrappers execute production SQL with separate JS transaction/migration logic, not Swift or the retry view. Eight previously regenerated native files still match current source. Fresh isolated archive: exactly 15 allowlisted source/configuration/lockfiles, SHA-256 hashes match local files before and after upload, no credentials, signing/device files, dependencies, generated artifacts or unrelated files. Reused the existing Expo project/phone configuration and remote signing with --freeze-credentials; Apple-server revalidation was skipped by noninteractive CLI without Apple login, not claimed freshly performed. Xcode ARCHIVE SUCCEEDED, zero compiler errors, signed IPA exported; dependency/build warnings remain. Free account usage 8/15 iOS before, 9/15 after, zero overage and zero estimated charges. One submission, no retry or App Store submission; no staging/commit/push.

### Remaining device checks — Not run

- Failure injection and each retry path, including failed Complete/Continue/edits and older failure content with no retry metadata.
- Duplicate/stale actions and received-request accounting; one request/one record does not test duplicates. Two physical taps do not prove two intents executed.
- Early Continue confirmation dismissal and fresh final-set confirmation/final Continue on this build; do not infer them from earlier Continue build results or preserved pre-reset records.
- VoiceOver, larger text and a broader layout/reachable-control sweep; the reported unclipped message is a limited presentation pass.
- Force-quit, system termination, repeated republication, other migration/upgrade states and broader recovery. Ordinary reopen in this sequence does not cover them.

Keep TS-001 automatic-reveal delay and TS-002 countdown jumps open. See the [partially completed checklist](../proofs/lock-screen/README.md#saved-confirmation-device-checklist--not-run).

## Historical evidence before Continue

The following build-specific source descriptions and observations are historical; they do not describe the current Continue selector or supersede the new results below.

Earlier comparison evidence retained: **Automatic reveal observed, unacceptable delay — user-reported** for comparison build 9510b48e-aea0-4f67-b724-6e46ff4ee9ae. First untouched expiry revealed controls roughly 1–2 minutes after zero. A subsequent rest hid controls throughout its countdown, then revealed them 1 minute 40 seconds after zero, timed by the user. This later observation does not erase the earlier absence at the initial observation point. Countdown pauses/jumps remain unresolved. No final-set, saved-values/counts, or upgrade-preservation result is inferred.

**D1 diagnostic built:** exactly one [D1 preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/22e675fd-8642-4faf-88d5-aa254129f6c5) **FINISHED**. Native compilation/signing **Passed** (ARCHIVE SUCCEEDED, zero compiler errors, IPA produced). D1 now has partial user-reported device evidence below. Controlled upgrade preservation and diagnostic layout-fit checks remain **Not run**; exact transition timing is not established. Installation procedure/artifact identity was not independently verified. The Lock Screen now shows raw stale T/F independently of selection, a short publication ID, and literal REST/CTRL/DONE/OLD branch labels. The app identifies D1 and offers a manual ActivityKit metadata panel: actual published staleDate, saved deadline in that publication, and submission time in UTC/epoch seconds. Optional metadata is stamped only at existing publish calls; ignored by ordinary read equality to avoid extra updates. No source behavior fix is claimed. Existing store, timer, expiry selection, drafts, deadlines, migration, and action guards are preserved.

D1 review found no blocking issue and required no source correction. Raw flag, literal selected-layout label, and short ID use the same rendered context; manual diagnostics capture current ActivityKit content once without workout-store access or publication. Optional fields preserve older content decoding, and equality strips diagnostics to avoid stamp-only updates. Relative to 9510, only App.tsx, the native bridge, ProofActivity, ProofCoordinator, and ProofWidget differ. The 15-file fresh archive matched all local hashes and excluded sensitive/unrelated files. Reused the existing project/phone and frozen valid signing. Free usage: 6/15 before, 7/15 after, zero overage. Build completed 2026-11-12T19:49:11.946Z. Base ff627edc17102ad9fe50992a421a8ca5303fc42d plus existing uncommitted work; no source edit, retry, commit, or push in this review/build task.

## D1 evidence and assessment — 2026-11-12

**Automatic reveal observed, unacceptable approximate delay — user-reported.** This is the user's report of D1, not an independently observed phone session or newly inspected image. The following metadata and screenshot contents were supplied as text:

| Observation | User-reported value |
| --- | --- |
| Lock Screen and diagnostic panel publication | `1E9DB281` in both |
| Submission time | `2026-11-12T20:36:36.506Z` |
| Published staleDate | `2026-11-12T20:36:56.494Z` |
| Saved deadline carried in that publication | `2026-11-12T20:36:56.494Z` |
| Lock Screen at capture | `stale:T`, `CTRL`, Set 2/3, 50 lb × 8, one saved record displayed |
| Automatic reveal | Approximately 1–2 minutes later, user estimate; no recording establishes exact transition timing |

**What follows from the evidence:** matching IDs allow correlation of these two readouts. The displayed staleDate and carried deadline agree, 19.988 seconds after submission, consistent with the saved 20-second interval being established before the publication call. There is no extra minute-scale offset in these supplied timestamps. The captured stale:T/CTRL combination agrees with the current selector. These are narrow inferences from supplied values and inspected source, not fresh database verification. The panel reads ActivityKit content; it is not a new SQLite read. The displayed record count does not independently verify storage, duplicate prevention, draft preservation, or upgrade preservation.

**What remains unknown:** no video establishes timer-zero time, first F→T, first REST→CTRL, their order/separation, or an unchanged ID throughout the interval. Matching IDs at the two observations resolve the metadata-correlation concern for that publication, but do not timestamp an internal iOS event. Internal staleness timing versus context/render delivery remains unresolved. No battery, network, display-setting, or app defect is established. Countdown pauses/jumps remain a separate unresolved issue. Final-set behavior, complete three-set flow, upgrade preservation, and diagnostic fit have no new pass.

**Apple's documented contract:** [staleDate](https://developer.apple.com/documentation/activitykit/activitycontent/staledate) defines when content becomes stale; the [ActivityKit guide](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities#Configure-the-Live-Activity) says activityState becomes stale and isStale becomes true at that date. [isStale](https://developer.apple.com/documentation/widgetkit/activityviewcontext/isstale) exposes that condition. Apple's [stale-view example](https://developer.apple.com/videos/play/wwdc2023/10185/?time=1004) supports rendering an alternate view. The reviewed sources do not specify a maximum latency for those replacement controls to become visible. [TimeDataSource](https://developer.apple.com/documentation/swiftui/timedatasource) supports automatically updating Text; that is not a whole-card refresh schedule. Do not transfer a widget timeline-reload guarantee to a Live Activity, which [does not use widget timelines](https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities).

**Engineering conclusion:** the current stale-state mechanism is unsuitable as the sole gate for prompt automatic reveal in this proof, given repeated reported delays. The API is supported; timely control availability has not met acceptance. This is not a diagnosis of Apple's internal timing or proof that every automatic design is impossible. No reviewed materially different mechanism establishes prompt automatic reveal for this current proof. Remote [ActivityKit pushes](https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications) add server/network/budget dependencies without an identified visible-deadline bound, so they are not the recommended next direction. No guessed stale-date offset, background timer/poll, or repeated D1 variant is proposed.

Earlier observation retained:  Build [f55d4dff-e9ef-475d-ad7e-9f501a7e65db](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/f55d4dff-e9ef-475d-ad7e-9f501a7e65db) compiled/signed successfully, but automatic reveal at expiry **Failed — user-reported**: the described screenshot shows 0:00 and Skip with no next-set controls. The user also reports pauses/jumps in the countdown. Active-rest Skip and Skip at displayed 0:00 each revealed expected controls: **Passed — user-reported, UI reveal only**. No saved-count, draft-preservation, final-set, or stored-deadline pass follows. Countdown behavior remains open; no battery/network/display-setting cause is established. The screenshot and installed build identity were not independently inspected in this task.

The minimal comparison removes only the extra Date.now veto in ProofWidget.showsRest and selects the saved draft/final summary via isStale. The former veto might mask a stale presentation evaluated before the deadline; this remains a hypothesis, not a diagnosis. Exactly one [isStale comparison preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/9510b48e-aea0-4f67-b724-6e46ff4ee9ae) FINISHED. Native compilation/signing Passed (ARCHIVE SUCCEEDED, zero compiler errors); later device observations are recorded above; no final-set, saved-values/counts, or upgrade-preservation pass is inferred. Only ProofWidget.swift differs from f55's upload. No source corrections in this task; storage, deadlines, drafts, records, migration, action guards, timer formatting, coordinator, dependencies, and signing preserved. Base remains ff627edc17102ad9fe50992a421a8ca5303fc42d with existing work uncommitted. One authorized upload/build, no retry, commit, or push. Production framework remains open.

Current fixture stays 40 × 8, 50 × 8, 45 × 10 with 20-second rest. Continue now persists acknowledgement independently of elapsed rest. Active/expired installed rests remain unacknowledged; existing skipped rests are backfilled as acknowledged. No record/draft/default/deadline reset. See [implementation and migration details](../proofs/lock-screen/README.md#continue-implementation--2026-11-12). Historical D1 findings below remain attached to their builds, not current source behavior.

Latest evidence: user-described before/after screenshots preserve 40 lb × 10, one saved record, two completion requests, and expired rest through the latest upgrade. The old exact deadline was not visible, so exact deadline preservation is unverified; earlier upgrade attempts stay inconclusive. Next draft 50 × 8 appearing during rest and early Complete displaying “Rest active—wait or skip” with one saved record are Passed — user-reported on the previous UI. The former behavior is now superseded. Remaining three-set trials stay Not run; the newer failed expiry and limited Skip reveals are recorded above. Earlier one-set/rest/background-resume passes remain scoped; blackout cause is still unconfirmed with no fix claimed.

The implemented mechanism remains ActivityContent.staleDate / ActivityViewContext.isStale, using the saved unskipped deadline on every publication; the D1 assessment above now rejects it as the sole prompt-reveal gate. No guarantee of device timing or regular visible countdown cadence follows. The uploaded f55 version also checked the wall clock in view selection; the local candidate removes that extra condition. Ordered publications keep the current state/rest ID and deadline together; rejected stale actions republish current saved state. The user reports a subsequent countdown hid controls throughout, a limited presentation observation; broader stale-action and final-set checks remain separate. Native completion separately checks the saved deadline after the write lock. No extra timer, callback, server, or polling was introduced.

Skip actively saves a matching unexpired interval before publishing. After actual expiry, SQL Skip is a no-op but still causes the coordinator to publish current state with the past staleDate. Thus a tap can refresh the card without a saved Skip or another completion. Displayed 0:00 alone does not identify the execution-time deadline relation. See the [official assessment, source trace, and focused comparison](../proofs/lock-screen/README.md#timer-only-device-investigation--2026-11-12).

For upgrade/reopen, ordinary foreground read now serializes with actions and republishes saved state/staleDate only if different, repairing older cards with nil staleDate without resetting data (including expired/final cards). It does not republish on unchanged polls. This initial metadata resync must not be confused with the no-tap/no-app-opening expiry proof after Complete.

- Expo CLI verified the signed-in personal account as `fgzmacaraeg`. The proof project is [@fgzmacaraeg/swoldier-lock-screen-proof](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof), ID `8b7ce1c7-0553-42b3-b7a3-e8b5a5ccce58`. The actual project ID is in the existing dynamic app configuration.
- Apple Developer provisioning access was independently verified after private login on 2026-11-11 through a read-only certificate-list request. The user completed the phone registration website flow. Both active ad hoc profiles independently verified: each includes the same single registered phone; the profiles and certificate are unexpired. The original failed build and one separately authorized patched preview were submitted; the patched preview finished successfully.
- Historical rest archives before/after the Foundation corrections matched their local source. The fresh compact archive also contained the exact 15 required files and lockfile with matching SHA-256 hashes, no signing/device files, secrets, dependencies, generated artifacts, or unrelated files. Only ProofWidget.swift differs from the successful rest upload; its storage, timer, intent, identifier, dependency, and signing configuration files are unchanged.
- The user reports iPhone 15 Pro / iOS 26.6.1 (23G83) with working Face ID. The device was not independently inspected. Face ID is allowed while the Lock Screen stays visible; opening the foreground app during an action fails.
- Earlier Windows SQL, TypeScript, JavaScript export, and generated configuration checks passed; SQL-wrapper tests do not execute Swift. The first one-set installation/sequence remains Passed — user-reported for its older build. Limited later rest observations are recorded above, not a pass of full rest acceptance or lifecycle recovery.
- [First preview build](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/87687ca0-ead7-47ee-a7e8-d1174ba043e9) finished **ERRORED**, `XCODE_BUILD_ERROR`. Compiler location: `modules/LockScreenProofModule.swift:1:8`; error: `ambiguous implicit access level for import of 'ExpoModulesCore'; it is imported as 'internal' elsewhere`. That first build produced no installable artifact; the separately authorized patched result is recorded below.
- The one-line `public import ExpoModulesCore` patch was uploaded over base commit `7da44d93b1f6d47b42d2ce0d07120e03bb26c6f0`; it is the only proof source change. [Patched preview build 2a692799-0280-4f0c-b7f7-1f65b65c1149](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/2a692799-0280-4f0c-b7f7-1f65b65c1149) **FINISHED**. Native compilation and signing passed, the original import error is absent, and EAS produced an IPA. The user now reports successful installation and the guided sequence on that build.
- The rest/compact milestone was committed and pushed at `ff627edc17102ad9fe50992a421a8ca5303fc42d`. The earlier separately authorized three-set preview completed; all three-set source and the newer timer-only patch remain uncommitted. The timer-only and comparison builds are historical; the preceding build task authorized exactly one D1 preview upload/build, now completed. That evidence task recorded a pending recommendation; the current documentation task records the adopted Continue decision. No dependency upgrade, commit/push, or production framework decision.
- Local rest checks: nine production-SQL/migration tests through a separate JS wrapper, TypeScript, JavaScript export, and generated native source/configuration inspection passed. After the import corrections, the nine SQL tests and TypeScript passed again and generated source copies were reinspected. These checks do not execute Swift migration, App Intents, or the native countdown renderer. Verify the existing installed record before any reset; legacy completed records should receive no retroactive deadline.
- [Rest preview d3568ab8-654b-49cf-a0ee-d43bfe91497f](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/d3568ab8-654b-49cf-a0ee-d43bfe91497f) finished **ERRORED**, `XCODE_BUILD_ERROR`. Earliest compiler error: generated extension `ios/SwoldierProofLiveActivity/ProofActivity.swift:8:27`, `cannot find type 'Date' in scope`. That failed upload omitted the two Foundation imports; its historical result is unchanged.
- [Corrected rest preview aec6ed60-6c49-4883-9f53-9f3513ae4333 / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/aec6ed60-6c49-4883-9f53-9f3513ae4333) **FINISHED**. Only source corrections since the failed upload: `import Foundation` in `native/ProofActivity.swift` and `native/ProofCoordinator.swift`. Inspected generated copies and target membership: Activity in app and extension; Coordinator in app only. Fresh archive matched all 15 required local files and lockfile. EAS reported Free, 1/15 iOS builds used, zero overage before submission; reused frozen signing credentials. Xcode reports `ARCHIVE SUCCEEDED`, with no Date or ExpoModulesCore ambiguity errors. Corrected native compilation and signing passed; an IPA is available. This does not verify runtime migration or rest behavior.
- Complete source trace: background/local-authenticated intent → serial SQLite commit → update existing matching activity → return. No request/end/reset, foreground navigation, or display-sleep control in this path. No measured runtime trace establishes the black-screen cause or a keep-awake capability.
- Historical compact-preview preparation (before three-set/timer-only changes) changed ProofWidget.swift only: three rows with the same bounded timer and intents; Complete stays available, Skip at zero remains a harmless store-guarded request. No new application edit in the build task. Nine SQL-wrapper tests and TypeScript passed again; generated widget still matches the source. These Windows checks do not execute Swift. See [comparison and layout limits](../proofs/lock-screen/README.md#complete-trace-and-black-screen-comparison).
- [Compact preview cacac282-0ac2-43d5-9c66-70ebd3479ae6 / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/cacac282-0ac2-43d5-9c66-70ebd3479ae6) **FINISHED**. Native compilation and signing Passed: Xcode reports `ARCHIVE SUCCEEDED`, includes ProofWidget.swift, and contains zero compiler errors. EAS produced an IPA. Before submission, Free allowance was 2/15 iOS builds used, zero overage; both active unexpired profiles included the same phone. Reused frozen credentials. This build does not establish clipping is fixed, data survived an upgrade, or the blackout cause.
- Latest compact-build layout results are Passed — user-reported for four states only, as summarized above and in the [device results](../proofs/lock-screen/README.md#compact-layout-device-results--2026-11-11). Earlier functional passes remain attached to the rest build. The display comparison reported no-tap darkness within five seconds and a later duplicate-Complete comparison staying visible; the original immediate blackout was not reproduced there, with no causal finding or claimed fix.
- Version-2 tables import the legacy row/rest once without rewriting the original row, keep plan and actual values distinct, and reset only fictional proof data. Nineteen tests use production SQL through a separate JavaScript wrapper; they do not execute Swift, ActivityKit, or native migration. The earlier three-set source compiled in the preview below; the later timer-only patch has now also compiled/signed in the preview recorded above, with device behavior still unverified. Latest upgrade evidence supports visible fields only, not exact old deadline or all migration cases. History/reflections remain preserved.
- [Three-set preview f8955622-dd9c-4e10-8eac-39c120a55890 / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/f8955622-dd9c-4e10-8eac-39c120a55890) FINISHED. Xcode reports `ARCHIVE SUCCEEDED`, zero compiler errors, and includes store/intents/widget source; an IPA is available. Review found no blocker or needed source correction. Fresh upload archive had exactly 15 required files/lockfile, all local SHA-256 hashes matching, with no sensitive/unrelated files. Both valid existing ad hoc profiles included the same registered phone. EAS Free allowance before submission: 3/15 iOS builds used, zero overage. Reused frozen credentials with proof-directory isolation; no signing or plan changes. Both target versions remain 1.0.0 (1). Build-native success is separate from all unrun phone checks.

On 2026-11-11, the user reported installation and the guided one-set test passed on EAS build `2a692799-0280-4f0c-b7f7-1f65b65c1149`. Face ID authenticated while the Lock Screen stayed visible; +1 rep and both Complete taps did not open the foreground app. Deliberately reopening showed 40 lb × 9 reps, one saved record, and two received completion requests. This is user-reported evidence, not independent observation. Only this sequence is marked passed.

<a id="next-task--user-decision-no-implementation-yet"></a>

<a id="next-task--prepare-continue"></a>

<a id="next-task--review-continue-for-a-preview"></a>

## Continue build and current results

Exactly one [Continue preview / installation page](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof/builds/41621efa-1d34-4af1-8860-804b7eb01b5d) submitted and monitored to **FINISHED**. Native compilation/signing **Passed**: Xcode ARCHIVE SUCCEEDED, zero compiler errors, IPA produced. Completed 2026-11-13T00:42:03.868Z (2026-11-12 in America/Los_Angeles). The later migrated-record sequence is now **Passed — user-reported**, within the evidence limits below. The separate fresh-fixture results are recorded below; broader migration and dedicated layout checks remain unrun. No source correction was needed during review.

The fresh archive contained exactly 15 allowlisted source/configuration/lockfile files; every SHA-256 hash matched local source, with sensitive/unrelated files excluded. Relative to D1, only App.tsx and native ProofActivity/ProofCoordinator/ProofIntents/ProofSQL/ProofStore/ProofWidget differ. Base remains ff627edc17102ad9fe50992a421a8ca5303fc42d plus existing uncommitted work; EAS No VCS does not attach that Git base automatically. The separate source manifest identifies the exact upload. Existing project and frozen signing reused; both valid ad hoc profiles include the same phone. Free allowance: 7/15 before, 8/15 after, zero overage. Exactly one build, no retry, credential/plan change, commit, or push.

Review confirmed persisted acknowledgement controls rest visibility, including at zero. Early Continue saves skipped/acknowledged state; expired Continue saves acknowledgement without marking skipped. Acknowledgement commits before publication; replay/stale identity guards, native completion gate, current drafts/plans/records/counts/deadlines, and final-set bound are preserved. Migration adds one nullable field transactionally: active/expired unskipped records remain unacknowledged; skipped records receive the historical skip as a compatibility acknowledgement. No data deletion or reset required. See [implementation details](../proofs/lock-screen/README.md#continue-implementation--2026-11-12).

Windows checks rerun: 29 production-SQL tests using a separate JavaScript wrapper and TypeScript Passed; eight previously regenerated native source/resource copies match. The wrapper does not execute Swift. Earlier local JavaScript export passed and source was unchanged during this review; the cloud build now separately compiled the native targets. Compilation does not establish installed-data preservation or user-visible behavior.

### Continue evidence recorded — 2026-11-12

Evidence source: the user's descriptions of before/after and final screenshots, plus reported Lock Screen interactions. No screenshots or phone session were independently inspected in this task. Build attribution is user-reported. See the [full evidence table](../proofs/lock-screen/README.md#continue-device-results--migrated-record-sequence-2026-11-12).

- **Upgrade preservation — Passed for the displayed expired-rest case:** Set 1 actual 135 lb × 10; Set 2 draft 50 × 8; Set 3 draft 45 × 10; all plans; one record / one request; exact expired deadline 1794515816.494715 unchanged in the described before/after screenshots.
- **Migrated expired Continue — Passed — user-reported:** promptly revealed Set 2 on the authenticated visible Lock Screen. Reopened app showed Expired/dismissed, saved acknowledgement, unchanged drafts/deadline and counts 1/1 (screenshot-supported app state as supplied).
- **Early Continue after Set 2 — Passed — user-reported:** completed 50 × 8, then Continue before zero revealed Set 3 at 45 × 10. Described screenshot showed Skipped/dismissed, counts 2/2.
- **Final expired Continue — Passed — user-reported:** completed Set 3 at 45 × 10 and confirmed the guided final expiry/Continue sequence. Final screenshot showed Planned sets recorded, three actual records / three requests, Expired/dismissed, and a saved Continue timestamp. No fourth set or automatic finish was reported; no independent internal trace is claimed.

The preceding evidence was a migrated-record sequence, **not the separate fresh three-set trial recorded below**. The existing Set 1 was not completed anew in this build. Exact later deadlines/timestamps are not supplied. Acknowledgement persisted on the reported ordinary reopen; no force-quit, system-termination, repeated-republication, or broad migration pass follows. Duplicate/stale Continue, current-build duplicate Complete, other migration cases, phone save-failure/retry, and dedicated layout/accessibility checks remain **Not run**. Earlier build passes retain their original scope.

### Fresh-fixture result — separate trial, 2026-11-12

**Passed — user-reported** for the same Continue build after the user reset the fictional fixture. Saved sets: **40 lb × 8, 50 lb × 8, 45 lb × 10**. The described final screenshot shows three records, three completion requests, Planned sets recorded, Expired rest, Dismissed rest screen, and a saved Continue timestamp. The user confirmed prompt Continue before/after zero and required actions staying on the authenticated visible Lock Screen. Screenshot-supported final app state and reported interactions are separate evidence; neither was independently observed here. See the [fresh-trial record](../proofs/lock-screen/README.md#continue-fresh-fixture-regression--2026-11-12).

This result does not claim the proposed 40 × 9 / duplicate-Complete variant passed: the reported first set is 40 × 8 and the final request count is three. Duplicate/stale Continue, current-build duplicate Complete, force-quit, system termination, other migration cases, phone failure/retry, and dedicated layout/republication checks remain **Not run**. No additional reopen result is inferred; earlier reopen evidence remains attached to the migrated sequence.

## Completed publication review — historical record

**Publication completed:** all 17 reviewed files below were committed and normally pushed at [92da1c915ff702941fcc8b00003dd3f0caf2933e](https://github.com/fgzmac/Swoldier/commit/92da1c915ff702941fcc8b00003dd3f0caf2933e), message **Add three-set proof with persistent Continue rest controls**. Remote main matched HEAD and the tree was clean afterward; rechecked at this task start. The following review details describe that published checkpoint, not the new local feedback patch.

Publication review: no blocking source or publication-content issue found. The full accumulated diff covers the three-set store/migration, identity guards, Continue acknowledgement, presentation, retained manual D1 diagnostics, tests, and related documentation. Production scope/framework remain unchanged. The 15 intended source/configuration/lockfile files still match the successful Continue upload byte-for-byte. The lockfile and configuration are already tracked and unchanged, so they need no new staging.

Checks rerun on Windows: 29 production-SQL wrapper tests and TypeScript Passed. SQL tests use a separate JavaScript transaction/migration wrapper, not Swift execution. Markdown links/anchors and whitespace Passed. Candidate content/path review found no credentials, signing files, personal device identifiers, generated artifacts, personal screenshots, or private workout/scan exports. Fictional proof values and historical diagnostic timestamps are retained as evidence. Existing native compilation/signing is a prior build result, not rerun here.

Published checkpoint file list (17 files; backlog was new in that commit):

```text
AGENTS.md
README.md
docs/BUILD_LOG.md
docs/HANDOFF.md
docs/LOCK_SCREEN_FEASIBILITY.md
docs/PROJECT.md
docs/TROUBLESHOOTING_BACKLOG.md
proofs/lock-screen/App.tsx
proofs/lock-screen/README.md
proofs/lock-screen/modules/LockScreenProofModule.swift
proofs/lock-screen/native/ProofActivity.swift
proofs/lock-screen/native/ProofCoordinator.swift
proofs/lock-screen/native/ProofIntents.swift
proofs/lock-screen/native/ProofSQL.json
proofs/lock-screen/native/ProofStore.swift
proofs/lock-screen/native/ProofWidget.swift
proofs/lock-screen/tests/persistence.test.cjs
```

Remaining device coverage is documented, not silently passed or a production-release claim. A later bounded duplicate/stale-action trial needs reproducible identities/taps; do not call a newly rendered current control a stale request. No new feature or cloud build is proposed as part of this publication step.

Keep [TS-001 and TS-002](TROUBLESHOOTING_BACKLOG.md) open/deferred. No automatic-reveal investigation resumed or countdown-smoothness fix claimed. Preserve historical evidence and learning reflections; no commit/push.

For Git on this exFAT folder, use the command-scoped exception `git -c safe.directory=D:/SwoldierApp -C D:/SwoldierApp <command>`.
