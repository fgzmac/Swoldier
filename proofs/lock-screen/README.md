# Swoldier Lock Screen proof

One fictional 40 lb × 8 rep set, in a standalone Expo SDK 57 app. The production framework is still open. The local source now adds a 20-second rest/Skip rest extension; routine editing, full workouts, and personal data remain excluded. See the [project plan](../../docs/PROJECT.md) for the wider scope.

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

Next: plan one bounded active-rest background/resume recovery check with before/after values, counts, and remaining time. Keep system termination and user force-quit as separate unrun cases. No new implementation or cloud build is implied. The rest/compact milestone is reviewed for publication in the current task; Git history and the session report identify its commit and push result.

Sources: [Expo SDK 57](https://expo.dev/changelog/sdk-57) · [Expo inline modules](https://docs.expo.dev/modules/inline-modules-reference/) · [Apple’s Live Activity interactivity guide](https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities) · [App Intent authentication policy](https://developer.apple.com/documentation/appintents/intentauthenticationpolicy/requireslocaldeviceauthentication).
