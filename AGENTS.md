# Working in andreattafabio

## Read first

1. [Contributor and agent starting point](docs/AGENT-START.md): repository purpose, real commands, task-specific sources and safety boundaries.
2. [README](README.md) and the linked domain guides. Existing project-specific instructions and the user's current task scope still apply.
3. Current PR discussion, head/base commits and changed-file scope before editing.

## Collaboration

- Work on a focused branch; isolate your checkout when other contributors are active. Preserve unrelated changes. Do not stage, stash, reset or publish another contributor's work as your own.
- Agree on one writer for overlapping files; record dependencies and integration order. Stop editing if the branch unexpectedly changes.
- Assign implementation, review and integration responsibilities explicitly. Any supported agent may provide context or perform assigned work; an agent name is not evidence or release authority.
- Keep instructions portable in repository Markdown. Do not copy project-specific rules into global agent configuration or edit authentication settings.
- Use the [handoff template](docs/HANDOFF-TEMPLATE.md). Link exact source/evidence, state what passed, failed or was not run, and give the next concrete step.

## Safety and verification

No application runtime or build manifest is present. Keep private client names, internal links, credentials and operational incident details out of this public repository; verify public profile links and claims before publishing.

- Use only commands that exist in the applicable package or guide. Review lifecycle hooks and remote targets before running them.
- Keep secrets, credentials and personal/customer records out of docs, fixtures, issues and logs. Use synthetic data and mock/sandbox integrations.
- Generated output, schema, dependency, hosting and production changes require their own scope and verification. Do not make them as incidental cleanup.
- Pin claims to the tested commit and environment. Dated logs, review verdicts and green builds do not establish current runtime safety.
- Do not merge, deploy, migrate, send real messages or change provider settings without the required owner authorization. A docs-only merge can still trigger deployment automation.
