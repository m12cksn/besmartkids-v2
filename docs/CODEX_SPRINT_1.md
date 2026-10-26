# Exact Codex instruction — Sprint 1

Planning handoff retained for reference. Iwan authorized continuation on 24 October 2026; the existing foundation branch was reused. Current results are recorded in docs/reports/SPRINT_1.md.

You are implementing Sprint 1 of BeSmartKids V2. Read docs/PRD.md, ARCHITECTURE.md, DESIGN_SYSTEM.md, PAGE_SPECS.md, QUESTION_ENGINE.md, SPRINT_BACKLOG.md and applicable AGENTS.md before editing. Preserve the approved MVP and document conflicts.

1. Inspect the actual repository, branch, working tree, package manager, dependency versions and scripts. Do not overwrite unrelated changes. If no repo URL/access is provided, report the blocker; use a local scaffold only once the owner authorizes this choice. With a repo, branch feat/sprint-1-foundation; do not commit to default branch.
2. Confirm current compatible Next.js App Router/React/TypeScript/Tailwind/shadcn versions using official documentation, then pin dependencies and commit the lockfile. Use Lucide React and Motion. Avoid installing Supabase, KaTeX, dnd-kit, Konva or JSXGraph until the sprint needs them. Avoid runtime external fonts. No paid services, external messages or deployment.
3. Scaffold strict TypeScript Next.js with src/app and route groups from ARCHITECTURE.md. Create only public Sprint 1 routes: /, /grades, /grades/5/topics. Other valid grades show explicit upcoming state; invalid grades 404. Login/authenticated routes are future scope: show a clearly labeled upcoming login affordance without a dead link or fake authentication.
4. Implement BeSmartKids tokens, custom Button/Card styles, responsive header/footer, focus styling and reduced-motion handling. Use approved green/yellow/light palette. Create a responsive original React/SVG fraction illustration; no answer engine, grader or backend yet.
5. Landing: clear Indonesian value proposition, Learn→Explore→Practice→Understand→Progress expressed in child-friendly Indonesian, Grade 5 pilot label and “Pilih kelas” CTA. Catalog: all six grades, only Grade 5 links to pilot preview. Preview lists Pecahan, Desimal, Persentase as planned content with explicit “Pratinjau—belum bisa dipelajari”; no fake lessons, counts or progress presented as available. No invented testimonials.
6. Use typed local catalog fixtures clearly isolated from future data services. Keep public and private future boundaries clear; do not implement placeholder security or pretend Supabase is connected. Include .env.example only if used; never credentials. Update README with exact installation/dev/check commands and current limitations.
7. Add meaningful RTL coverage for grade availability/navigation and invalid grade handling as feasible; Playwright for landing→catalog→Grade 5 preview and keyboard navigation. Configure Vitest/RTL/Playwright without broad unnecessary tests. Run lint, typecheck, tests and production build using actual scripts. Resolve failures within scope; report unavailable network/dependency/browser blockers explicitly.
8. Inspect actual browser output at 360, 768, 1280 CSS px, 200% zoom and reduced motion; verify no page overflow, visible focus, accessible names, usable targets, clear upcoming labels and working CTAs. If browser inspection is unavailable, mark visual acceptance pending. Automated axe checks are optional and do not replace manual keyboard/contrast review.
9. Produce docs/reports/SPRINT_1.md with files changed, actual commands and results, browser observations, unresolved issues, dependency choices and next-sprint prerequisites. Open a PR if supported and authorized by the task; never merge or deploy. Stop at this sprint boundary.

## Acceptance checklist

- [ ] Strict TS foundation and reproducible locked install; no unsupported dependency assumptions.
- [ ] Approved branding visibly customized beyond default shadcn.
- [ ] /, /grades and /grades/5/topics work; six grades have truthful availability; invalid grade returns not found.
- [ ] Clear pilot preview, no pretend functioning lessons/auth/progress.
- [ ] Responsive/keyboard/reduced-motion/zoom checks recorded from a real browser.
- [ ] Lint, typecheck, meaningful unit/UI tests, e2e and build results recorded honestly.
- [ ] No secrets, paid purchases, production data changes or deployment.
- [ ] README and sprint report describe the implemented scope and remaining blockers.
