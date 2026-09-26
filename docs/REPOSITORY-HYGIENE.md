# Repository hygiene: andreattafabio

Source inventory recorded **2026-09-26** at
[c10c0d618ec2](https://github.com/andreattafabio/andreattafabio/commit/c10c0d618ec2a8a834ce34759362fe27441ea36e); default branch
`main`. This is a dated inventory, not a claim about current hosting,
production, vulnerability status or every historical document.

Start with [repository rules](../AGENTS.md), [the agent guide](AGENT-START.md),
[contributing](../CONTRIBUTING.md) and [security reporting](../SECURITY.md).

## Reproducible local checks

With Git and the Node version required by the [documentation policy](DOCUMENTATION-QUALITY.md):

```sh
node scripts/check-documentation.mjs --self-test
node scripts/check-documentation.mjs
node scripts/check-repository-hygiene.mjs --self-test
node scripts/check-repository-hygiene.mjs
git diff --check
```

Both maintenance scripts use Node built-ins: no install, network, file mutation,
provider access or CI configuration changes. Materialize checked files in sparse
checkouts. The hygiene checker validates common inline links in these maintenance
guides, declared root command names/implementations and tracked operating-system junk. Tracked
environment paths and competing root lockfiles produce review notices, not silent
deletion or an unsupported secret-leak finding. Existing review notices are not
waived by a PASS. The documentation policy lists Markdown-parser limitations.

## Runtime and command source

No standalone root runtime pin file was found in this inventory.
Check the project guide and existing deployment configuration for the application runtime. The documentation-tool runtime does not override it.

No root dependency lockfile was found. This can be intentional for a static/docs-only repository; do not introduce a package manager as cleanup.

No runnable root package-script reference is provided here. Follow the starting-point guide for any existing static tooling.

This table records declarations, not passing results or a safe-to-run allowlist.
Inspect lifecycle hooks, generated outputs, live URLs and integration targets
before invoking application commands. External publication, provider changes and
real submissions are outside these read-only maintenance checks.

## Review notices and boundaries

- No tracked environment-file or competing-lockfile notice was identified by this narrow inventory. This is not a secret scan or security audit.

- Preserve tracked build artifacts when the project intentionally authors them.
  Do not delete a directory merely because it is named `dist`, `build` or `public`.
- Keep credentials, private reports, customer data, local agent state and machine
  paths out of new commits. Ignore rules do not protect already tracked files.
- Make dependency updates one reviewed change at a time; do not use blanket audit
  fixes or suppress a failed check to make a maintenance PR pass.
- Keep approved first-party identity and asset provenance. Do not add generator
  promotional copy or badges; functional provider identifiers and dated history
  are not branding-removal targets.

## Update and release discipline

Update the starting-point guide and this command inventory when manifests,
entry points, runtime requirements or workflows change. Keep durable decisions in
the existing domain guide and dated QA evidence in the existing workstream/PR.
Link the replacement when an audit is superseded; do not relabel old evidence as new.

A handoff records repository, branch, head/base SHA, file ownership, acceptance
criteria, actual commands/results, residual risks and next action. If the base or
head moves, reassess the complete diff and affected checks. A self-check is not
independent review; source checks, hosted CI, preview and production are separate.
Follow current project release authority. Even docs-only merges may trigger builds.

Rollback of this maintenance addition means reverting its reviewed commit(s),
not resetting the shared branch or rewriting published history. Inherited changes
in an older PR need their own review and rollback scope.

Not covered: full historical-link crawling, reference-style Markdown links,
external URL availability, dependency vulnerabilities, secret-content/history
scanning, access controls, branch protections, backup recovery or live behavior.
Review those separately with appropriate access and task authorization.
