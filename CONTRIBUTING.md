# Contributing to wp-react-lib

Thank you for your interest in contributing. This project is maintained by [Development Gateway](https://www.developmentgateway.org/). `@devgateway/wp-react-lib` is a library for integrating React applications with WordPress via the REST API.

## Table of Contents

- [Development Setup](#development-setup)
- [Branching Model](#branching-model)
- [Making Changes](#making-changes)
- [Commit Messages](#commit-messages)
- [Code Style](#code-style)
- [Opening a Pull Request](#opening-a-pull-request)
- [License](#license)
- [Security](#security)

---

## Development Setup

### Prerequisites

- Node.js v22+
- pnpm v10+

### Install

```bash
git clone git@github.com:devgateway/wp-react-lib.git
cd wp-react-lib/wp-react-lib
pnpm install
```

### Secrets scanning (pre-commit hook)

This project uses [Gitleaks](https://github.com/gitleaks/gitleaks) to prevent secrets from being accidentally committed. Install the hook after cloning:

```bash
pip install pre-commit
pre-commit install
```

### Build in watch mode

```bash
pnpm dev
```

### Build once

```bash
pnpm build
```

---

## Branching Model

- `main` is the stable branch and the base for all pull requests.
- Create a branch off `main` for every change, using a prefix that matches the Conventional Commits type: `feat/`, `fix/`, `chore/`, `docs/`, `refactor/`, or `ci/`.
- Do not push directly to `main`.

---

## Making Changes

### Adding a changeset

Every PR that changes published behaviour must include a changeset:

```bash
pnpm changeset
```

Select `@devgateway/wp-react-lib`, choose the bump type, and write a one-line changelog description.

| Change type | Bump |
|---|---|
| Breaking API change | `major` |
| New hook, component, or export | `minor` |
| Bug fix, refactor, dependency update | `patch` |

---

## Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Use a prefix that reflects the nature of the change:

| Prefix | When to use |
|---|---|
| `feat:` | New hook, component, or user-facing feature |
| `fix:` | Bug fix |
| `chore:` | Dependency update, tooling, config |
| `docs:` | Documentation only |
| `refactor:` | Code restructure with no behaviour change |
| `ci:` | CI/CD workflow changes |

For breaking changes append `!` to the prefix, and add a `BREAKING CHANGE:` footer in the commit body:

```
feat(wp-react-lib)!: rename usePost return shape

BREAKING CHANGE: usePost now returns { data, loading, error } instead of a flat object
```

Examples:
```
feat(wp-react-lib): add useMenuItems hook
fix(wp-react-lib): correct SSR window guard in usePost
chore: upgrade immutable to 5.1.3
```

---

## Code Style

- TypeScript for all new source files
- Keep the library generic — no application-specific or client-specific logic
- Contributions that tightly couple to a particular WordPress setup will be asked to be extracted or made configurable

---

## Opening a Pull Request

Forking is not enabled on this repository. To contribute, request access from a maintainer, then create a branch directly in this repo off `main`.

1. Create a branch off `main` (see [Branching Model](#branching-model))
2. Make your changes and add a changeset
3. Ensure `pnpm build` passes locally
4. Open a PR against `main` with a clear description of what changed and why
5. At least one maintainer approval is required before merging
6. All CI checks must pass

Do not introduce hardcoded credentials, internal URLs, client-specific identifiers, or PII. Ensure any new dependency has an Apache-2.0-compatible license.

---

## License

By contributing you agree that your contributions are licensed under the [Apache License 2.0](LICENSE).

---

## Security

Please do not report security vulnerabilities through public GitHub issues. See [SECURITY.md](SECURITY.md) for the responsible disclosure process.
