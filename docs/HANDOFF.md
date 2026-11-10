# Current project handoff

Updated: 2026-11-10. The adopted discovery scope, planned checks, later features, and open questions are recorded in [PROJECT.md](PROJECT.md). The next task is feasibility research and proof design.

- Working folder: D:\SwoldierApp. Origin: https://github.com/fgzmac/Swoldier.git.
- Historical publication: the documentation foundation was pushed at commit 75a4c62aefeb27dfdfbb7c3b5e87ad307115cbd4.
- Fresh verification on 2026-11-10: local HEAD and remote main both matched that commit; local main tracked origin/main. The working tree was clean before the checkpoint began; the follow-up inspection found the five expected local documentation edits. The remote query was read-only and succeeded.
- The discovery session ended with five local Markdown edits. See Git history for the checkpoint commit and publication status.
- The iPhone 15 Pro / iOS 26.6.1 is user-reported, not device-verified. Framework selection is open. App, persistence, and Lock Screen tests have not run.

## Next small task: research no-unlock Lock Screen interactions

Use official Apple documentation to map the required actions to candidate iOS surfaces. The workout starts in the app before the phone locks. While the phone remains locked and the app does not open in the foreground, the user must be able to adjust pounds, reps, and RIR; complete a set; add a set; and finish an exercise and advance.

Define a bounded proof for the reported iPhone 15 Pro / iOS 26.6.1 using fictional data and a tiny workout fixture. Specify setup and build prerequisites, a test per required action, how to verify the device stays locked and the app does not open in the foreground, and how to verify the resulting state afterward. For completion, require exactly one saved record with the edited values and a rest countdown, including a repeat-tap check. Distinguish what official docs establish from what still needs device testing. Report any unsupported or uncertain action for an explicit scope decision.

Success means a cited capability map and a reviewable proof plan. An app-opening shortcut cannot count as meeting the requirement. This is research and proof design only; do not implement the proof or select a framework.

Use [DISCOVERY_SESSION.md](DISCOVERY_SESSION.md) as the historical agenda, [PROJECT.md](PROJECT.md) as the decision record, and [BUILD_LOG.md](BUILD_LOG.md) as the session history.

For Git on this exFAT folder, use the command-scoped exception: `git -c safe.directory=D:/SwoldierApp -C D:/SwoldierApp <command>`. Global Git settings were not changed.
