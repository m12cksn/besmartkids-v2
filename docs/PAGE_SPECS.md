# Page-level UI/UX specifications

All pages inherit DESIGN_SYSTEM.md accessibility and responsive gates. All data pages use skeleton loading, contextual empty state, recoverable error + retry, and explicit authorization/not-found handling. Never show infinite loading or fake content as live progress.

## / — Landing

Purpose: explain visual learning and lead to grades. Layout: public header, two-column hero (copy + SVG fraction illustration), journey, pilot preview, CTA, footer. Components: branded Button/Card, grade chips. Mobile: copy above illustration. Interactions: “Pilih kelas” → /grades; “Masuk” → /login. States: stable local content; illustration fallback; no fabricated testimonials. Accessibility: one h1, decorative SVG hidden or meaningful text alternative. Acceptance: both CTAs work, Grade 5 pilot is clear, no overflow at required widths.

## /grades — Grade catalog

Purpose: choose Grade 1–6. Layout: intro + six grade cards. Components: Card, status Badge, buttons. Mobile one column; tablet two; desktop three. Interaction: available grade → topics; upcoming cards explain availability without dead links. States: no published content → honest notice; fetch error retry. Accessibility: meaningful card link names and textual status. Acceptance: six grades shown, only published topics advertised.

## /grades/[grade]/topics — Topic catalog

Purpose: public preview of available topics. Layout: breadcrumb, grade title, topic cards and availability. Components: Cards, lesson count, login CTA. Mobile stacked. Interaction: authenticated start → topic; guest → login with validated same-origin return path. States: invalid grade 404; upcoming grade notice; empty/error/loading. Accessibility: semantic breadcrumb and heading order. Acceptance: Grade 5 pilot visible; no unpublished material leaked.

## /login — Authentication and onboarding

Purpose: guardian signs in/creates account and activates child profile. Layout: focused form, guardian explanation; consent then alias/grade steps. Components: Form, inputs, checkbox, alert. Mobile full-width readable form. Interactions: login/signup/reset, policy acknowledgment, consent, profile setup; server validates return path. States: invalid credentials, expired link, submitting, network failure; no activation before consent. Accessibility: labels, password-manager support, linked errors and focus management. Acceptance: authenticated navigation works; no child email required; invalid session cannot access protected routes.

## /student — Dashboard

Purpose: resume and choose next lesson. Layout: student shell, greeting/grade, resume Card, topics, progress summary. Mobile resume first, drawer navigation. Interactions: resume exact saved location, browse topics, change grade via validated action. States: first visit chooses first published lesson; deleted/unavailable activity offers safe fallback; no-data/error/loading. Accessibility: clear navigation landmarks and textual progress. Acceptance: server-backed current activity; no fabricated scores.

## /student/topics/[slug] — Topic overview

Purpose: show objectives and ordered lesson path. Layout: breadcrumb, visual topic header, lesson list, practice CTA. Components: Cards, status icons with labels, Progress. Mobile vertical list. Interactions: open/resume lesson, begin practice. States: no published lessons, loading, error, 404 inaccessible topic. Accessibility: no color-only status. Acceptance: lesson order and prerequisite guidance accurate; completion separate from accuracy.

## /student/lessons/[id] — Interactive lesson

Purpose: learn and explore. Layout: objectives, video, explanation, diagrams/demo, guided examples, practice CTA; desktop optional contents sidebar. Mobile sequential blocks. Components: accessible video, KaTeX, SVG manipulative, navigation and save indicator. Interactions: manipulate objects, keyboard equivalents, acknowledge required steps, resume position. States: video unavailable shows transcript + retry; missing required content prevents publication; persistence error never claims saved. Accessibility: captions, transcript, accessible math, reduced motion. Acceptance: all approved learning blocks present; refreshed server state restores checkpoint; watching video alone cannot mark mastery.

## /student/practice/[sessionId] — Practice

Purpose: solve one question at a time. Layout: progress/exit, prompt, visual, answer control, submit, feedback and next. Components: QuestionRenderer and save state. Mobile full-width workspace; sticky actions cannot obscure content. Interactions: edit, explicit submit, hint, retry, terminal review then next; exit preserves drafts. States: unanswered, submitting, first wrong, terminal correct/incorrect, network retry, completed; foreign session unavailable. Accessibility: full keyboard path, live feedback and text alternatives. Acceptance: four types supported; maximum two server-counted attempts; transport retries safe; keys absent before review.

## /student/results/[sessionId] — Results

Purpose: review completed practice. Layout: score and first-try accuracy, outcome list, explanations/video, return CTA. Mobile stacked. Components: Cards, expandable review, notation. Interactions: review mistakes and return to topic; new practice creates new session. States: unfinished redirects to resume with explanation; empty/error/loading. Accessibility: outcome text, readable equations, captions. Acceptance: server-calculated totals match attempts; only owned eligible review accessible.

## /student/progress — Progress

Purpose: understand activity and learning evidence. Layout: grade/topic completion, lesson status, comparable best scores, recent attempts. Mobile cards in place of wide tables. Components: Progress, labeled statistics, history list. Interactions: open topic/review. States: first learner guidance; filters with no data; retry/loading. Accessibility: numeric text equivalents, no color-only trend. Acceptance: completion and accuracy separate; no mastery claim; only own records.

## /admin — Content administration

Purpose: draft, validate and publish pilot content. Layout: protected admin shell, topic/lesson/question lists, editor/preview, validation and publication dialog. Mobile scrollable labeled table region or stacked records; editor full width. Components: Form, Tabs, Dialog, typed config controls. Interactions: draft edits, private preview, validation, publish new immutable version, unpublish future discovery. States: unauthorized 403; no drafts CTA; invalid JSON/math/media references block publication; conflict when stale edit. Accessibility: keyboard editor controls, field-level errors, dialog focus. Acceptance: student cannot enter or call admin actions; publication requires math-review record and schema/media validation; existing sessions retain pinned versions; audit records created.
