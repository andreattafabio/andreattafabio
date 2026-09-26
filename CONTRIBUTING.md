# Contributing

Start with [repository rules](AGENTS.md), the [contributor and agent guide](docs/AGENT-START.md)
and [maintenance guidance](docs/REPOSITORY-HYGIENE.md). Existing domain policies and
the current owner-approved task determine scope; this page does not replace them.

## A reviewable change

1. Check the remote, default branch, open PRs and current head. Work on a focused
   branch in an isolated checkout; preserve other contributors' changes.
2. State acceptance criteria and exclusions. Agree one writer per overlapping file
   and record dependencies before concurrent work.
3. Update the authoritative guide when changing a command, configuration name,
   entry point or durable decision. Link it instead of duplicating rules.
4. Run the documented checks appropriate to the diff. Record command, working
   directory, runtime, exact SHA and passed/failed/blocked/not-run outcomes. Keep
   application tests separate from documentation validation.
5. Review the complete base-to-head diff, including inherited changes. Use the
   [handoff template](docs/HANDOFF-TEMPLATE.md) with residual risks, next action,
   reviewer and release responsibility. Recheck evidence after integration.

An implementation agent's self-check is not independent review. Do not infer
merge, deploy, messaging, data-access or provider authority from an agent name or
a successful check. Follow the project's existing release gates.

## Safe maintenance

Keep dependencies and lockfiles unchanged in documentation-only work. Do not add
build output, personal editor settings, credentials or customer records. Preserve
intentional tracked assets and provider identifiers. Report suspected security
issues through the [private-reporting guidance](SECURITY.md), not a public issue.
