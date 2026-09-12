# andreattafabio: contributor and agent starting point

Public GitHub profile repository; README.md is the user-facing profile.

Source snapshot checked **2026-09-12**, default branch `main` at
[`c47106eabf63`](https://github.com/andreattafabio/andreattafabio/commit/c47106eabf6374353ab0f8628a3202f2663548e5).
This records repository structure and declared commands, not a production audit or passing test run.

## First five minutes

1. Read [AGENTS.md](../AGENTS.md) and [README.md](../README.md). Load task-specific guides below.
2. Confirm the repository remote, branch, head and changed-file scope. Use an isolated checkout when another contributor is active.
3. Inspect [open PRs](https://github.com/andreattafabio/andreattafabio/pulls) and the task discussion before taking a file. Agree who writes each overlapping file; a note in a handoff is not a technical lock.
4. Record the task's acceptance criteria, excluded areas and verification plan in the PR or existing workstream record.
5. Use the [handoff template](HANDOFF-TEMPLATE.md) before changing agents or ending a session.

Any agent can read these Markdown files, including Grok, Opus, Fable, SOL, Codex,
Claude Code and Cowork. File auto-loading varies by tool: explicitly attach or ask
the next agent to read the linked files. Model identity does not grant repository,
merge, deployment or data access. Existing project role assignments still apply.

## Project-specific boundaries

No application runtime or build manifest is present. Keep private client names, internal links, credentials and operational incident details out of this public repository; verify public profile links and claims before publishing.

Current user instructions and repository policy determine authorization. Dated
logs describe past work; they do not authorize fresh production actions. If two
guides disagree, compare their dates, source and owner decision, then record the
conflict instead of silently choosing the more permissive instruction.

## Local development and declared checks

This is a profile repository. Preview Markdown and check public links and claims. There is no package manifest, install command, application build or automated test gate to run. Do not add one merely to fit an application template.

## Where to change what

| Concern | Source or existing guide |
| --- | --- |
| Project overview | [README.md](../README.md) |

## Verification and troubleshooting

- Documentation: check relative links against the tracked tree, script names against the correct manifest, and every factual claim against its linked source. A link that resolves does not prove its contents are current.
- Implementation: run the affected package's checks and exercise acceptance criteria, including rejection, duplicate/retry and unavailable-provider states where applicable.
- Missing configuration: identify the variable name, consuming source and runtime; obtain test values through the approved secret channel. Never paste production values into a PR or bypass a guard to get a green build.
- Failed gate: record the command, working directory, tool versions, exact commit and sanitized failure. Compare against the base before calling it a regression. Distinguish failed, blocked, not run and passed.
- Hosted behavior: record preview/deploy URL and served commit separately from the source head. A green CI run, successful build or HTTP 200 alone does not establish access control, delivery or payment correctness.
- Integration: if head or base moves, review the combined diff and rerun affected checks. A self-review is not independent review.

## Keep these documents useful

Update this guide in the same PR when entry points, package commands, environment
names or safety boundaries change. Link detailed domain knowledge instead of
duplicating it. Keep dated evidence in its existing workstream or PR, with SHA,
scope and limitations; do not append full session transcripts to startup files.
Use a short decision record for durable choices: context, decision, alternatives,
consequences, owner/approval and superseded decision. Review release evidence again
after integration. Merge and production/provider changes require separate authority.
