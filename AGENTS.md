# Working on Workout App

## Read first

Read `docs/HANDOFF.md`, `docs/PROJECT.md`, and the latest entry in `docs/BUILD_LOG.md` before working. Follow the user's latest instructions. Keep confirmed requirements, recommendations, and open decisions distinct. Use `docs/HANDOFF.md` as the current task and resume record.

The project at D:\SwoldierApp contains product documentation and an isolated one-set proof in proofs/lock-screen. Local setup, research, and implementation checks are recorded in docs/HANDOFF.md and docs/BUILD_LOG.md. Recheck Git state before work. The production framework remains open; follow the current handoff and the user's authorized scope.

Honor the task's mode. For a read-only setup check, report observations without changing files, installing tools, initializing Git, moving existing work, or scaffolding an app. Do not infer permission to start implementation from the future milestone list.

## Work in small, teachable steps

For each implementation task:

1. Give a brief plan for the current task and how to check it.
2. Implement that task. Continue through routine, reversible edits without repeatedly asking for permission.
3. Explain the important changes in plain language: what changed, why, and where.
4. Run a targeted, meaningful check when possible. Report the command or action, environment, result, and any limitation. Do not add tests that merely repeat the implementation or broaden testing without a concrete reason.
5. Explain one relevant concept. Ask one short question for the user to answer in their own words, and suggest one tiny edit they can try themselves. Do not invent their answer or claim they completed the edit.
6. Update `docs/BUILD_LOG.md` truthfully. Update affected decisions and milestone status in `docs/PROJECT.md`, then refresh `docs/HANDOFF.md` with the current state and next small task. For a read-only task, return proposed documentation updates in the report rather than writing them.

If a missing decision materially changes the work, explain the tradeoff and ask one focused question. Otherwise, use the existing decisions and continue. Keep implementation explanations out of the app's normal user interface.

## Product rules

- Build for iPhone first. Keep the active workout simple and follow the behavior in `docs/PROJECT.md`.
- Separate routine targets and suggested values from completed set records. Displaying a value does not complete a set.
- Record actual weight in pounds, reps, and RIR. Blank is different from zero; do not invent an entry.
- Keep history attached to the exact exercise or variation performed. Never carry one exercise's load into a different exercise as if it were that exercise's history.
- Changing a routine, swapping an exercise, or applying a future suggestion must not rewrite completed records. Handle any explicit correction to a past record deliberately.
- Keep personal scans, credentials, and private workout exports out of commits. Use fictional data for committed examples and tests.
- Treat cloud sync, automatic scan import, suggested substitutions, and later review features as separate tasks. Do not add them to the current task without a reason grounded in the project plan.

## Be precise about status

Do not call an illustrative mockup a native app or widget. Do not claim a build, persistence check, device test, or widget interaction passed unless it actually ran. Record blocked or unrun checks explicitly. Keep framework and platform assumptions visible until verified.
