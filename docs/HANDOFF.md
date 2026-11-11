# Current project handoff

Updated 2026-11-10. The [one-set Lock Screen proof](../proofs/lock-screen/README.md) is linked to Expo, and its local upload archive is verified. Production framework selection remains open.

- Expo CLI verified the signed-in personal account as `fgzmacaraeg`. The proof project is [@fgzmacaraeg/swoldier-lock-screen-proof](https://expo.dev/accounts/fgzmacaraeg/projects/swoldier-lock-screen-proof), ID `8b7ce1c7-0553-42b3-b7a3-e8b5a5ccce58`. The actual project ID is in the existing dynamic app configuration.
- The user reports Apple Developer membership is paid, with activation pending. Apple account/team status was not independently inspected. No phone registration, Apple signing setup, source upload, or cloud build occurred.
- Using EAS CLI 27.7.2 with `EAS_NO_VCS=1` and `EAS_PROJECT_ROOT` scoped to `D:\SwoldierApp\proofs\lock-screen`, the archive-only command returned exit 0. The first archive omitted nested source folders; corrected bare-directory exceptions in `.easignore` and regenerated it. The final archive has exactly 15 required files, including the dependency lockfile; all 15 SHA-256 hashes match the local source. No credentials, signing files, device identifiers, dependencies, generated artifacts, private records, or unrelated repository files were found.
- The user reports iPhone 15 Pro / iOS 26.6.1 (23G83) with working Face ID. The device was not independently inspected. Face ID is allowed while the Lock Screen stays visible; opening the foreground app during an action fails.
- Earlier Windows SQL, TypeScript, JavaScript export, and generated native configuration checks passed. The SQL tests use production statements through a separate JavaScript wrapper, not the Swift store or intent/display path. Swift compilation, CocoaPods integration, signing, installation, and all device checks remain **Not run**.
- The starting Git checkpoint was `937368810272c0180e14976dee5a3d263e3cc3ef` on main, with a clean working tree. This account-linking and archive correction is local and uncommitted; no commit or push was performed.

## Next task

Wait for Apple Developer activation, then confirm the team is active and can manage iPhone signing. Stop before device registration, Apple signing configuration, source upload, or a cloud build unless separately authorized. The [proof instructions](../proofs/lock-screen/README.md#later-sign-build-and-install-on-the-iphone) describe those later steps.

For Git on this exFAT folder, use the command-scoped exception `git -c safe.directory=D:/SwoldierApp -C D:/SwoldierApp <command>`.
