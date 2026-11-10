# First discovery and setup session

Prepared: 2026-11-09. This is an agenda, not a record of answered questions.

## 1. Describe the ideal experience
Who is the first version for, and what should feel easier than logging today?

Walk through opening a routine, seeing the current set, editing pounds/reps/RIR, completing it, resting, adding or finishing sets, swapping exercises, finishing the workout, and reviewing it. Confirm which actions belong in the app versus the widget or another quick-access surface.

## 2. Choose the smallest useful release
Review the proposed Push-only version. Decide what must work for a real session. Decide whether the widget is required for release or starts as an early experiment. Keep beginner templates, suggested swaps, BodySpec progress, and weekly progression suggestions in the backlog without silently adding them to v0.1.

## 3. Clarify behavior
- What happens to unfinished entries and interrupted workouts?
- Which fields can be blank? How should bodyweight, assistance, and unknown RIR work?
- What starts rest, how long is it, and what happens when undoing a set?
- Do swaps affect today only or the reusable routine?
- What remains editable after finishing?
- Which future suggestions require review?

Resolve the choices needed for the next task. Keep the remaining questions open rather than forcing every decision in one session.

## 4. Review setup after the vision
Keep the current folder in place. Verify tools, RAM/storage, SSD location, phone testing, Git state, and backup needs before migration or implementation. The existing remote is public. Keep real scans, credentials, and private workout exports out of public material.

## Roles and durable records
- User: sets direction, chooses tradeoffs, tests the app, and writes learning reflections.
- dot: coordinates discussion, reconciles decisions and status, and maintains the next step.
- ChatGPT feature and learning chats: discuss one outcome at a time; bring adopted decisions back to PROJECT.md.
- Codex: handles a bounded authorized implementation task, reads current records, explains changes, checks results, and updates logs.
- GitHub: preserves commits actually pushed; it does not capture unsaved/local files or private app data automatically.

PROJECT.md holds the plan and decision log. HANDOFF.md holds current status and next action. BUILD_LOG.md holds session history and user-written learning. LEARNING_AND_SETUP.md holds setup and course guidance. Avoid competing current-status copies.

## End each meaningful session
1. Record adopted decisions and open questions in PROJECT.md.
2. Record changes and actual checks in BUILD_LOG.md.
3. Leave the learning reflection for the user; never invent it.
4. Update HANDOFF.md with one next task and success check.
5. State what was saved locally, committed, and pushed separately.
6. Refresh ChatGPT reference uploads deliberately; do not assume synchronization.

## Learning checkpoint
A local save, Git commit, and pushed commit are different states. A project record is not itself a verified backup.

Question: How would you tell a future session what is planned versus what was actually tested?

Optional tiny edit: add one idea and the problem it solves to PROJECT.md's idea inbox. This has not been completed for the user.