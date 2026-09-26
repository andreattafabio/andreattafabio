# Security reporting

## Report privately

Do not post credentials, personal/customer information, private logs or usable
exploit details in public issues, pull requests, screenshots or agent transcripts.
Use an existing owner-approved private channel to the repository maintainer.
If no such channel is known, request private contact without disclosing details.
If this repository's Security tab offers private vulnerability reporting, that
is another option; this document does not assert that the feature is enabled.

Include the repository and affected commit, expected and observed behavior,
potential impact, and minimal reproduction using synthetic data. Redact values,
session identifiers and customer records. Do not test against other users,
production payments, real messaging or live data without explicit authorization.

## Triage and recovery

The maintainer determines severity, permitted verification, remediation and any
coordinated disclosure. If a credential may have been exposed, notify the owner
privately: deleting a file does not revoke a credential or erase Git history.
Rotation, access changes, production remediation and history rewriting require
their own authorized plan. Never paste the suspected value into a ticket.

No support window, response-time guarantee, bounty, penetration-test permission
or legal safe harbor is created by this document. Confirm supported versions and
release status with the maintainer; the latest branch is not proof of deployment.

See [contribution guidance](CONTRIBUTING.md), [repository rules](AGENTS.md) and
[maintenance guidance](docs/REPOSITORY-HYGIENE.md). Documentation checks are not a
security audit and do not establish authentication, authorization or data safety.
