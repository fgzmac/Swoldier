# Learning and setup

## Verified foundation status — 2026-11-09

- Working folder: D:\SwoldierApp. Source preserved at C:\Users\bbdaw\OneDrive\Desktop\WorkoutApp\workout-app-starter.
- All 8 relative filenames and SHA-256 hashes matched immediately after copying and before editing. README and AGENTS are at the root; no nested starter folder.
- Earlier local inspection verified Windows 11 Home, native PowerShell, and 32 GB installed RAM.
- During foundation setup, the tool versions were: Git 2.55.0.windows.4; Node.js v24.19.0; npm 11.17.0; VS Code 1.145.2 x64; Codex CLI 0.167.0-alpha.3.2.
- During foundation setup, D: was rechecked as exFAT, Healthy / OK. The user supplied diagnostic results reporting no problems and exit 0. Separately, the earlier assistant-run /markclean check returned 0 and cleared the dirty flag. The original cause remains unknown. No repair was repeated during migration.
- The foundation was pushed previously. A read-only check on 2026-11-10 confirmed that GitHub main still points to 75a4c62aefeb27dfdfbb7c3b5e87ad307115cbd4. Local main tracked origin/main and was clean at the start of the checkpoint.
- Production framework remains undecided. This foundation snapshot predates the isolated proof. See the current [handoff](HANDOFF.md) for Windows check results and unrun native/device checks.
- Local files, GitHub, and ChatGPT uploads do not synchronize automatically.

## 1. Build while you learn

Start the app after a short introduction to the tools. Continue the relevant lessons alongside each feature. You do not need to finish a full AI curriculum before building a workout logger.

Your first goal is to explain one complete flow: **enter a set → update the screen → save the actual result → reopen it correctly**. Then repeat that pattern for a complete workout.

Keep the milestones in [PROJECT.md](PROJECT.md) as the main plan. Start with the Lock Screen research and proof design in M0, then move through one exercise, one complete routine, and a full training week as described in the plan.

## 2. Courses: before, during, and later

The recommendations below are based on the official public course descriptions, not a claim that their full signed-in curriculum was reviewed.

| When | Resource | Use it for |
| --- | --- | --- |
| Before the first coding session | OpenAI Academy: **Get Started with Codex**, or **Codex 101: Introduction and Onboarding** | Learn how to give a small task, provide context, and inspect the result. Choose one introductory path. |
| During M0–M2 | React Native's **React Fundamentals** and the relevant chapters of Expo's beginner tutorial | Learn components, props, state, and the basic development workflow as you use them. Review TypeScript basics when the code needs them. |
| After the first few features | OpenAI Academy: **Codex 102: Practical Workflows**, then relevant parts of **Extend Codex Workflows** | Improve repeatable project work once you have a real project to practice on. |
| When adding an actual AI feature | OpenAI Academy: **API Builder Bootcamp** | Learn API fundamentals and, when needed, evaluation, cost, and reliability. Routine logging does not require an OpenAI API integration. |
| If the project later needs them | Advanced agents, retrieval, and team-scale workflows | Study a topic when it solves an actual project problem. |

Official resources:

- [OpenAI Academy courses overview](https://academy.openai.com/pages/courses)
- [Find the named Codex courses](https://academy.openai.com/public/search?query=codex)
- [Codex 101: Introduction and Onboarding](https://academy.openai.com/en/public/clubs/builders-etkn1/resources/codex-101-introduction-and-onboarding-2026-03-18)
- [Codex 102: Practical Workflows](https://academy.openai.com/public/clubs/builders-etkn1/resources/codex-102-practical-workflows-2026-03-18)
- [API Builder Bootcamp](https://academy.openai.com/public/clubs/builders-etkn1/resources/api-builder-bootcamp-2026-08-19)
- [React Fundamentals](https://reactnative.dev/docs/intro-react)
- [Expo tutorial introduction](https://docs.expo.dev/tutorial/introduction/)

Treat the app and the courses as complementary. The Codex courses teach how to work with the coding tool; the React/Expo material teaches the app technology.

## 3. Chosen working folder and proposed tools

The working folder is D:\SwoldierApp. The source remains unchanged on C:. See HANDOFF.md for current Git status. The earlier 186 GB free on C: report is historical.

My proposed starting stack remains **TypeScript + React Native + Expo**, with **VS Code and Codex** and your physical iPhone for testing. It has not yet been selected. The existing repository is [fgzmac/Swoldier](https://github.com/fgzmac/Swoldier); the documentation foundation is published on its main branch. Use fictional data in committed examples and keep personal scans and private exports separate.

| Tool | Job |
| --- | --- |
| TypeScript | The language for app logic, with types that describe values such as a workout set. |
| React Native | Components for the mobile app's screens. |
| Expo | Tools for running and building the React Native app. |
| VS Code | The editor where you read and change files. |
| Codex | Coding assistance, explanations, and targeted verification. You still review the result. |
| Git | Local change history: a commit is a named snapshot. |
| GitHub | A remote copy of commits you push; it does not automatically back up every file on the SSD. |
| Expo cloud builds, using EAS | Build the native iPhone app on remote machines when needed. |

Expo documents Windows as a supported development environment for its beginner workflow. Its cloud build service can create iOS builds from any operating system without local native build tools. Expo Go can support ordinary screen exercises. The Lock Screen proof uses a custom signed preview build to include its native extension. Sources: [first app setup](https://docs.expo.dev/tutorial/create-your-first-app/) and [development builds](https://docs.expo.dev/develop/development-builds/introduction/).

The local iOS Simulator requires macOS. A physical iPhone is the testing device in this Windows proposal. Source: [iOS Simulator requirements](https://docs.expo.dev/workflow/ios-simulator/).

If you now have access to a suitable Mac, revisit Swift/SwiftUI with Xcode as another reasonable route. Do not change stacks merely because an example uses a different one.

### The Lock Screen requirement needs an early proof

Expo currently provides a widget library, but it does not run in Expo Go. Widget code and the main app have separate runtimes. The app-side interaction listener only runs while the app process is alive. Source: [Expo Widgets](https://docs.expo.dev/versions/latest/sdk/widgets/).

Face ID is acceptable during the proof while the Lock Screen remains visible. An action that opens the foreground app fails the release requirement. Expo Build is recommended for the proof, with a native Swift Live Activity and durable native storage. Device tests are **Not run**. [Device proof](LOCK_SCREEN_FEASIBILITY.md)

The proof uses Expo Free and requires Apple Developer Program membership when preparing the signed ad hoc iPhone build. The route plan lists the costs, signing requirements, and install steps. [Proof route](LOCK_SCREEN_FEASIBILITY.md#recommended-first-proof-from-windows)

## 4. Storage, RAM, cloud development, and hosting

These solve different problems:

| Situation | What helps |
| --- | --- |
| The internal disk is full | Keep the project and suitable large development files on the external SSD; free enough internal space for normal system operation and caches. |
| The computer runs out of RAM | An SSD does not add RAM. Reduce simultaneous tools or consider a remote development environment if local work is still impractical. |
| You need to compile an iPhone app from Windows | A cloud build service can handle compilation. |
| You want the coding environment to run on another computer | A service such as GitHub Codespaces provides a remote development environment. |
| The app needs an online server for accounts, sync, or server logic | That is backend hosting. It is a separate, later product decision. |

GitHub Codespaces can be accessed in a browser or VS Code, but its remote environment is Linux; it does not provide a macOS/Xcode environment. Source: [What are GitHub Codespaces?](https://docs.github.com/en/codespaces/about-codespaces/what-are-codespaces).

**Recommendation:** try the existing SSD and physical iPhone first. Do not pay for generic website hosting for this version. A logger that stores workouts on the phone does not need its own online backend. Cloud development can be considered if the laptop still cannot run the editor and development server comfortably.

Keep the SSD connected while working. An SSD containing the only copy is not a backup. Push committed code and documentation to your remote repository. Phone workout data and private scans need their own backup/export decision later; a source-code repository is not the app's workout database.

### Reference checklist for later environment changes

Initial inspection is complete. Before later environment changes, recheck relevant facts:

- Current operating system and whether the tooling uses Windows or WSL.
- Whether `D:\SwoldierApp` exists; D: free space and filesystem. RAM is user-reported as 32 GB.
- Existing files and local Git status in the selected folder and the earlier OneDrive folder, including uncommitted work and the configured remote.
- Existing Git, Node.js, VS Code, and Codex installation status.
- Later, before native device work: iPhone model/iOS version and whether an Apple Developer membership exists.
- Which terminal/environment will be used consistently. Avoid mixing Windows and WSL dependency installations in the same project without a reason.

An assistant in a remote workspace cannot inspect your physical SSD merely because it can run shell commands. Run local checks on your own computer or supply the results. Do not share credentials. No formatting, purchases, or migration of existing files is required to read this starter pack.

## 5. Use Codex as a coding partner and tutor

Follow the short workflow in [AGENTS.md](../AGENTS.md). Codex recognizes AGENTS.md as a project-instruction file; the other document names in this pack are conventions we chose. Source: [OpenAI's development-workflow example](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex).

For each small feature:

1. Write what the user should be able to do and two or three checks for success.
2. Ask Codex for the short approach, then the implementation of that task.
3. Read the changed code. Ask it to trace one tap through the event handler, state, storage, and screen.
4. Run the app and try a normal action plus the most relevant edge case.
5. Explain the change in your own words. Make one tiny related edit yourself.
6. Add a short build-log entry, make a Git commit, and push it when the remote exists.

Example task after M0 is complete:

> Read AGENTS.md, docs/HANDOFF.md, docs/PROJECT.md, and the latest docs/BUILD_LOG.md entry. Implement only M1's editable Incline Bench Press set row. Let me enter weight, repetitions, and RIR, then mark or unmark the set complete. Keep blank values distinct from zero. Explain the data structure, the event handler, and why the screen updates. Run the relevant available check and report anything not tested. Give me one small edit to try myself. Do not expand this task into persistence, widgets, or a full routine. Update the build log, handoff, and affected project status with the actual result and next step.

This narrower task is part of M1, not a claim that all of M1 is done. Choose input rules needed for that task as part of implementation.

### What to learn from each milestone

| Feature | Main concept to explain |
| --- | --- |
| One editable set | Types, components, input events, and state. |
| Several sets | Arrays, stable IDs, and updating the right record. |
| Save and reopen | Persistent storage versus temporary in-memory state. |
| Rest timer | A saved end time versus a counter that depends on the app remaining active. |
| Manual substitution | Exercise identity and preserving historical records. |
| Widget proof | Communication between the app and a separate native component. |

You do not need to memorize every library method. Aim to explain what your app stores, how a user action changes it, why the design was chosen, and what evidence shows it works.

## 6. Keep a useful project record

- **PROJECT.md:** thoughts, feature ideas, decisions, and the next milestone.
- **HANDOFF.md:** the current task, evidence, uncertainties, and exact next action.
- **BUILD_LOG.md:** changes, checks, blockers, and your own learning notes after a session.
- **Git:** the actual code history and the changes for each commit.
- **README.md:** the current overview; add setup instructions and a short demo once they exist.

Use a five-minute end-of-session entry if that keeps logging sustainable. A useful decision note can be one sentence: “We saved a rest end time so the display can recover after the app is reopened.” Mark a decision as proposed until it is adopted.

Codex may summarize work it actually performed. Keep “What I learned” in your own words. Save an occasional screenshot or short demo with fictional data once there is something working. Those records will help you explain the project later.

## Next working session: account readiness

The user reports an iPhone 15 Pro, iOS 26.6.1 (23G83), and working Face ID; the phone has not been independently inspected. The isolated proof source is prepared. Follow the [current handoff](HANDOFF.md) to confirm Expo account access and active Apple Developer Program membership when ready, before any device registration or build upload.
