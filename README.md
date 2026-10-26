# BeSmartKids V2

A visual mathematics platform for Indonesian students in Grades 1–6.

## Current scope

Sprint 1 provides a responsive public landing page, a six-grade catalog and a
Grade 5 preview of fractions, decimals and percentages. Every lesson is still
upcoming. Authentication, real lessons, grading, student progress and admin
workflows are specified but **not implemented**. Existing Supabase factories
are scaffolding only; no database connection is required for these public pages.

## Setup

Requirements: Node.js 22+, npm 11+. Tested here with Node 24.19.0 and npm 11.9.0.

```bash
npm ci
npm run dev -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. No environment file is needed for the public preview.
Keep future credentials in `.env.local`; `.env.example` contains placeholders.
The UI uses a system font stack and does not download Google fonts.

## Verification

```bash
npm run build
npm run check
npx playwright install chromium
npm run test:e2e -- --reporter=line
```

`check` runs ESLint, TypeScript and Vitest. `build` creates production output but
does not deploy it. Playwright needs its matching Chromium binary. See
[the Sprint 1 report](docs/reports/SPRINT_1.md) for actual results and pending QA.
GitHub Actions repeats the quality gates on pull requests; configuration is not
evidence that a workflow has passed.

## Specifications

- [PRD](docs/PRD.md)
- [Architecture and API contracts](docs/ARCHITECTURE.md)
- [Design system](docs/DESIGN_SYSTEM.md)
- [Question engine](docs/QUESTION_ENGINE.md)
- [All page specifications](docs/PAGE_SPECS.md)
- [Sprint backlog](docs/SPRINT_BACKLOG.md)
- [Sprint 1 Codex handoff](docs/CODEX_SPRINT_1.md)

Do not deploy to production, purchase services or modify production data without
Iwan's approval. Use feature branches and reviewable pull requests.
