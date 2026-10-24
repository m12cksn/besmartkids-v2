# BeSmartKids V2

Interactive mathematics learning for Indonesian students in Grades 1–6. This
repository currently contains the Sprint 1 foundation only.

## Local setup

Requirements: Node.js 22+, npm 11+.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Supabase values may remain unset for the Sprint 1 showcase. Any code path that
creates a Supabase client validates them at runtime and fails with a safe error.

## Quality commands

```bash
npm run lint
npm run typecheck
npm test
npx playwright install chromium
npm run test:e2e
npm run build
```

## Documentation

- [Product requirements](docs/PRD.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Design system](docs/DESIGN_SYSTEM.md)
- [Question engine](docs/QUESTION_ENGINE.md)

## Scope status

Sprint 1 provides the toolchain, design tokens, reusable primitives, Supabase
placeholders, testing setup, and documentation. Authentication, lesson content,
the question engine, grading, database migrations, and admin workflows are
intentionally deferred to their approved sprints.
