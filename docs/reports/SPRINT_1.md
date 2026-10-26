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

## Follow-up QA preparation — 26 October 2026

Reviewed GitHub head 5b14b688554922509fcc7ee638b008ec6ce96894 directly.
GitHub returned zero workflow runs and zero pull requests. The workflow only
listened to PRs and pushes to the foundation branch, so pushing the feature
branch alone did not trigger CI.

Local follow-up changes:
- Also trigger CI on pushes to feat/sprint-1-public-experience.
- Give E2E an owned production server on port 3107, forbid reusing a developer's
  existing server, and keep HTML reports from auto-opening. A two-minute suite
  timeout reports failure rather than silently force-exiting. These are runner
  safeguards, not a verified fix for the Windows teardown hang.
- Default to reduced motion until the client preference is known; CSS enforces
  stationary, fully opaque reveal content before/during hydration.
- Add frame-sampling assertions for actual reduced-motion output.
- Add 200% text enlargement/reflow assertions at 640 CSS px. This is explicitly
  text resizing, not a claim that browser toolbar zoom has been tested.

Follow-up results: npm run check and npm run build pass; 3 unit files / 10 tests,
11 generated pages. Playwright --list discovers 16 cases. Browser execution and
manual visual review remain pending because the matching Chromium download is
invalid in this environment. Do not count test discovery as a passing E2E run.
The Windows teardown issue remains unverified until a complete run exits 0.

Follow-up remote delivery: repository tree creation and draft PR creation both
returned 403 Resource not accessible by integration. No follow-up QA changes were
uploaded, no PR was created, and no CI pass is claimed. A patch against 5b14b68
is provided for application via the user's authenticated VS Code checkout.


## GitHub connection restored and CI verified

GitHub writes now work through the corrected account connection. Draft PR #1
was created; workflow 40256805179 passed on head 5b14b68, including the Playwright
step with a normal successful exit on Linux. No merge/deployment occurred.
The historical 403 delivery blockers above are resolved.

QA changes now also retain screenshots from the viewport tests as CI artifacts
for visual review. The strengthened 16-case suite must pass on its own new head;
the earlier green workflow does not validate newly added tests. Actual browser
toolbar zoom and the Windows-specific teardown diagnosis remain separate gaps.

## Expanded CI and screenshot review

Workflow 40257087801 passed on functional head 1f39e79: 10 unit tests and all
16 E2E cases passed, with normal process exit. The push workflow also passed.
Reviewed nine Chromium screenshots from artifact 12623440645: landing, grades
and Grade 5 topics at each of 360, 768 and 1280 CSS px. No visible clipped text,
collisions or broken mathematics artwork was found in those captures.

Core color-token calculations: white on primary green 5.02:1, muted text on
background 7.24:1, dark accent text on yellow 9.52:1. This is not a certification
of all WCAG criteria or a screen-reader audit.

A test-only extension in a disposable Chromium profile now adds actual tab zoom
through chrome.tabs.setZoom(2), verifies getZoom()==2 and the expected 640 CSS px
viewport from a 1280px window, then checks reflow/navigation and captures images.
It has only loopback host access and is never part of the shipped application.
This new 17th browser case still requires its own CI result; do not conflate it
with the already passing 200% text-enlargement tests.


## Actual zoom result

Workflow 40257622477 passed all 17 E2E cases (12.9s) on f026136, including
browser.tabs zoom=2 and 640 CSS px for each of the three public pages from a
1280px window. Build, lint, typecheck and all 10 unit tests also passed.
The full-page screenshot exporter clipped the zoomed output; viewport-only zoom
captures replace it for accurate visual review. DOM overflow and label checks
passed; the export issue is not being represented as a confirmed application
layout defect. Current screenshot-review evidence and CI links are in PR #1.
