# Current project handoff

Updated 2026-11-10. The isolated [one-set Lock Screen proof](../proofs/lock-screen/README.md) is implemented locally. Production framework selection remains open.

- The user reports an iPhone 15 Pro on iOS 26.6.1 (23G83) with working Face ID. Apple’s published version/build pairing agrees. Both proof targets require iOS 26.0 or later.
- The proof starts a fictional 40 lb × 8 set. **+1 rep** and **Complete set** write through native SQLite before the card updates. Face ID is allowed while the Lock Screen stays visible; opening the foreground app during an action fails.
- On Windows, Expo dependency validation, TypeScript, the iOS JavaScript export, three file-backed SQL tests, and generated native configuration inspection passed. The tests reuse production SQL with a separate JavaScript transaction wrapper; they do not run the Swift store, actor, or intent/display path. Swift compilation, CocoaPods integration, signing, installation, and all iPhone checks are **Not run**.
- Windows only; no Mac, Expo account, active Apple Developer Program membership, Expo project ID, or signing profiles. This checkpoint groups the reviewed proof source, feasibility plan, and related documentation. Use Git history and the session's publication report for the exact commit and push result.

## Next task

When you’re ready to enroll, confirm that your Expo account and Apple Developer Program team are active and can manage iPhone signing. Stop before device registration or any source upload. The [proof instructions](../proofs/lock-screen/README.md#later-sign-build-and-install-on-the-iphone) list the later commands and signing steps.

For Git on this exFAT folder, use the command-scoped exception `git -c safe.directory=D:/SwoldierApp -C D:/SwoldierApp <command>`.
