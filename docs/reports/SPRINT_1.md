# Sprint 1 — Public experience

Date verified: 26 October 2026. Branch: `feat/sprint-1-public-experience`.

## Scope delivered

- Student-facing Indonesian landing page with responsive fraction artwork and a
  five-step learning journey.
- Grade 1–6 catalog at `/grades`.
- Grade 5 preview for fractions, decimals, and percentages; grades 1–4 and 6
  truthfully remain marked as upcoming.
- Static valid grade routes and a useful 404 for invalid grades.
- Public header/footer, skip link, keyboard focus states, minimum-size controls,
  reduced-motion behavior, and responsive layouts.
- Supporting product, architecture, design-system, page, question-engine, and
  backlog documentation, plus unit/E2E coverage and a non-deploying quality
  workflow.

Authentication, backend behavior, stored progress, grading, and deployment are
outside Sprint 1 and were not implemented.

## Integration notes

The patch had already been applied in the working tree when verification resumed.
The feature branch was based on local commit `eca85057d284fee13fe628d620e76cdeaa52dfe6`.
The newer local-network configuration was retained:
`allowedDevOrigins: ["127.0.0.1", "192.168.18.3"]`.

Cache Components and Partial Prefetching remain disabled because the finite grade
catalog uses `generateStaticParams` with `dynamicParams = false` for hard 404s.
Playwright starts the production server after the build, matching the bundled
Next.js testing guidance and avoiding a Windows-only development-loader failure.

## Verification on this computer

- `npm.cmd ci --no-audit --no-fund`: passed; 466 packages installed. npm warned
  that the `unrs-resolver` install script is not covered by `allowScripts`.
- `npm.cmd run build`: passed; 11 static/SSG pages generated.
- `npm.cmd run lint`: passed.
- `npm.cmd run typecheck`: passed.
- `npm.cmd run test`: passed; 3 files and 10 tests.
- `npm.cmd run test:e2e -- --reporter=line`: all 12 Chromium and mobile-Chromium
  cases completed without assertion failures. Coverage includes the public
  journey, Grade 5 preview, upcoming and invalid-grade states, keyboard skip-link
  navigation, reduced motion, and horizontal overflow at 360, 768, and 1280 px.
- The Windows Playwright process did not emit its final summary or exit after all
  12 cases because it hung while tearing down the web server; it was stopped
  manually. CI must confirm a clean Playwright exit.
- `git diff --check`: passed before commit.

The first Playwright attempt used `next dev` and failed before assertions because
Turbopack reported that the installed Tailwind loader could not be found. The
loader was present and resolvable by Node, and the production build was healthy;
the runner was changed to the production server recommended for E2E tests.

No formal manual WCAG contrast audit was performed. Automated responsive checks
covered desktop/mobile widths, but CI and human review should still confirm final
visual polish and the Playwright teardown behavior.

No merge or deployment was performed.
