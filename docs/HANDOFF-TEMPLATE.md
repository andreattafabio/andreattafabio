# Task handoff template

Copy this into the existing workstream record or PR for **andreattafabio**. Replace
placeholders; do not create a competing global status log. Keep this template
unchanged between tasks. Store no credentials, private customer records or live
payment/session tokens in the handoff.

## Identity and scope

- Task/issue and PR:
- Writer, reviewer, integration owner and their assigned roles:
- Repository, branch, base SHA and reviewed head SHA:
- Worktree status and any local-only/unpushed work:
- Goal and observable acceptance criteria:
- Explicit exclusions and production/data boundaries:

## What changed

- Files/areas changed and why:
- Architecture or behavior decisions, with source/decision links:
- Other PR dependencies, ordering and known overlapping files:
- File ownership agreed with other active contributors:

## Evidence

| Check/scenario | Command or reproduction; working directory | Result | Exact SHA and evidence link |
| --- | --- | --- | --- |
| Replace with an applicable check | Include tool/runtime versions where relevant | PASS / FAIL / BLOCKED / NOT RUN | Source head or hosted served commit |

State what was actually exercised, including negative cases. Include sanitized
failure output and distinguish existing base failures from introduced ones.
Never infer integration safety from a diff-only review, a count of passing tests,
a model's verdict or a green preview card. State explicitly when review was by
the implementer and independent review is still pending.

## Resume here

- Next concrete step and the file/source to start with:
- Open questions or blockers, owner, options and recommended resolution:
- Known limitations and untested states:
- What invalidates this evidence (changed head/base, config, dependency or deployed version):

## Release and rollback

- User-visible, security/privacy and deployment impact:
- Production/provider/database actions performed: none, unless separately authorized and evidenced:
- Approval still required and who grants it:
- Rollback proposal and how to verify recovery:
- For a docs-only change: revert the reviewed documentation commit through normal review; no data restoration is implied. Merging documentation may still trigger existing deployment automation.

Start a fresh session at [AGENT-START.md](AGENT-START.md), then refresh GitHub
state. A handoff transfers context, not credentials, authority or proof of release.
