# Swoldier Lock Screen proof

One fictional 40 lb × 8 rep set, in a standalone Expo SDK 57 app. The production framework is still open. This proof does not include rest, routine editing, full workouts, or personal data. See the [project plan](../../docs/PROJECT.md) for the wider scope.

## How the proof saves

- The Expo screen starts the draft and requests the Live Activity through a Swift module. The widget extension renders the card and supplies the session and set IDs to its two App Intents.
- Apple documents that a `LiveActivityIntent` runs in the containing app’s process. The proof requests background execution and local device authentication. Both intents and the in-app screen use SQLite in the app’s Application Support directory. The widget never opens the database, so no App Group, shared-container entitlement, JavaScript listener, or ActivityKit push credential is needed.
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
- Closing and relaunching again, post-completion +1 rejection, interrupted execution, system termination, and user force-quit recovery.
- Reset/restart and stale actions after reset.
- Genuinely locked comparisons and accessory-widget trials.
- Rest countdown/Skip rest, other numeric controls, add-set, exercise advancement, and wider workouts.

## Recommended next proof — planned, Not run

Complete the fictional set to start a short rest countdown, then Skip rest from the visible Lock Screen after Face ID without opening the app. See [the bounded checks](../../docs/HANDOFF.md#next-task). This is a recommendation only; no rest behavior was implemented or tested in this milestone.

Sources: [Expo SDK 57](https://expo.dev/changelog/sdk-57) · [Expo inline modules](https://docs.expo.dev/modules/inline-modules-reference/) · [Apple’s Live Activity interactivity guide](https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities) · [App Intent authentication policy](https://developer.apple.com/documentation/appintents/intentauthenticationpolicy/requireslocaldeviceauthentication).
