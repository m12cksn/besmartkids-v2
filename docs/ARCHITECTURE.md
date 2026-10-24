# Architecture

## Runtime

BeSmartKids uses a single Next.js App Router application deployable to Vercel.
Server Components are the default. Client Components are introduced only for
browser state, direct interaction, or Motion.

## Boundaries

```text
src/app/              routing, layouts, and composition
src/components/ui/    shadcn-style visual primitives
src/components/layout shared page chrome
src/components/math/  reusable SVG mathematics visuals (Sprint 5)
src/features/         domain-owned UI, schemas, and services
src/lib/supabase/     browser/server Supabase factories
src/lib/validation/   shared Zod validation
src/lib/grading/      server-only grading rules (Sprint 6)
src/types/            generated and shared types
supabase/              migrations, RLS policies, and seed data
tests/                 unit, integration, and end-to-end tests
```

Features may import shared components and libraries. Shared code must not import
from a feature. Cross-feature access goes through a feature's public entry point
once those modules exist.

## Security baseline

- The browser receives only the Supabase URL and publishable/anon key.
- Service-role credentials are server-only and never prefixed with `NEXT_PUBLIC_`.
- Authentication and authorization are enforced server-side and through RLS.
- Database lesson content uses controlled Zod schemas; it is never executable.
- Answer secrets remain in a separate, non-public table in the grading sprint.

## Data evolution

PostgreSQL changes are forward-only SQL migrations. Generated database types are
committed after schema changes. The Sprint 1 placeholder intentionally contains
no business schema; table and RLS design belongs to the database sprint.

## Quality gates

Every merge should pass lint, strict typecheck, relevant Vitest suites, critical
Playwright journeys, and a production build. Tests are reported only when run.
