# Documentation quality and branding policy

This is the maintenance contract for this repository's contributor documentation,
not a certificate that every historical document or production behavior is correct.
Start with [the agent guide](AGENT-START.md) and [repository rules](../AGENTS.md).

## Run the read-only check

From the repository root, with Git and Node.js 22 or newer available:

```sh
node scripts/check-documentation.mjs --self-test
node scripts/check-documentation.mjs
git diff --check
```

The [checker](../scripts/check-documentation.mjs) uses only Node built-ins. It does
not install dependencies, fetch URLs, modify files, call providers or change CI.
This maintenance-tool requirement does not change the application's runtime pin.
Materialize checked files before running in a sparse checkout; unavailable content
is an error, not a silently skipped success.

It checks these living guides: root README and AGENTS, agent starting point,
handoff template and this policy; plus existing root CONTRIBUTING/SECURITY/ARCHITECTURE/ARCHITECTURE and
core docs README/ARCHITECTURE/CONTRIBUTING/TESTING/DEPLOYMENT/configuration guides.
It verifies common inline Markdown link/image paths, ATX-heading anchors (including
duplicate headings), explicit HTML anchors, required guide presence, and package
script names declared in the starting-point guide. Known generated promotional
patterns are rejected in the root README, application HTML outside docs/scratchpad,
and JavaScript/TypeScript under src, app, components, lib and data. Identity assets are compared with exact
Git blob hashes of visually verified legacy generator icons and social imagery.
Indexed hashes detect renamed copies too; altered visual variants still require
manual inspection. This is an integrity identifier, not a security hash claim. Identity assets are compared with exact
Git blob hashes of visually verified legacy generator icons and social imagery.
Indexed hashes detect renamed copies too; altered visual variants still require
manual inspection. This is an integrity identifier, not a security hash claim.

Limitations: this is not a full CommonMark parser. Reference-style links, nested
parentheses in link targets, setext headings, external URL availability, historical
logs, arbitrary UI copy, rendered images, accessibility, factual accuracy and live
services need separate review. A passing check does not prove those areas.

## Keep knowledge current without duplicating it

| When a change touches | Update and verify |
| --- | --- |
| Entry points, routes, package commands | The [starting-point guide](AGENT-START.md), linked source and affected README instructions |
| Configuration names or consuming runtime | The existing configuration reference, if present; document names and consumers, never secret values |
| A durable architecture or workflow decision | An existing domain guide or a short decision record: context, alternatives, decision, consequences, owner and superseded decision |
| An agent handoff or interrupted task | A [handoff](HANDOFF-TEMPLATE.md) with head/base SHA, file ownership, evidence, unknowns and the next concrete action |
| A dated audit becomes stale | Preserve its date and scope; link the replacement instead of presenting old evidence as current |

Keep startup context short. Link the authoritative file rather than copying a
second set of rules. Tool-specific entry files should point back to repository
rules. Do not propagate project instructions into global agent configuration.
When two instructions conflict, record the conflict and seek the responsible
owner's decision; do not infer new merge, deploy or data authority.

## No generated promotional branding

Do not reintroduce generator welcome pages, platform promotional badges, tool
endorsements, generator author/description metadata, generic platform social cards
or external editor-injection scripts. Use this project's verified identity and
existing approved assets; never invent ownership, provider or legal facts.

Brand removal is not a dependency or hosting migration. Preserve functional asset
paths, package identifiers, API variables, auth origin checks and accurate provider
or legal disclosures unless a separately reviewed replacement is verified. Do not
break image URLs or erase audit history just to make a text search return zero.
Review favicons, social cards and rendered pages visually when changing them.

## Completion evidence

Before handoff, record commands actually run and their outcomes at the tested SHA.
Separate passed, failed, blocked and not run; list known gaps with a next action.
Rerun relevant checks if the base or head changes. Never substitute this guard for
application tests or a preview review when code or public metadata changed.
Human review and the repository's release authorization remain required.
