# Product Requirements — BeSmartKids V2

## Vision

Help Indonesian primary-school students build mathematical confidence through
clear explanations, tactile interactions, timely feedback, and visible progress.

## Users

- Students in Grades 1–6 using phones, tablets, or desktop computers.
- Parents and teachers reviewing progress.
- Content administrators preparing and publishing controlled lesson content.

## Product principles

1. Make the next action obvious and touch-friendly.
2. Explain mathematics visually without making animation essential.
3. Keep answer keys and grading on the server.
4. Resume learning safely after refresh or disconnection.
5. Meet WCAG-minded keyboard, contrast, focus, and reduced-motion needs.

## Approved delivery sequence

1. Foundation and design system.
2. Landing page and Grade 1–6 catalog.
3. Authentication and student dashboard.
4. Lesson engine and video integration.
5. Interactive question engine.
6. Autosave, grading, results, and progress.
7. Minimal admin and Grade 5 pilot content.
8. Security, accessibility, QA, and pilot deployment.

## Sprint 1 acceptance criteria

- Next.js App Router, strict TypeScript, Tailwind CSS, shadcn-compatible UI,
  Lucide, and Motion are configured.
- Brand tokens and reusable accessible UI primitives exist.
- Supabase browser/server client factories use validated placeholders.
- Vitest, Testing Library, and Playwright are configured with baseline tests.
- Lint, typecheck, unit tests, end-to-end smoke test, and production build pass.

## Out of scope for Sprint 1

Production content, auth flows, database schema, grading, progress tracking,
question renderers, admin features, deployment, and analytics.
