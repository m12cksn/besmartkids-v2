# BeSmartKids V2 — Product Requirements

Status: proposed baseline for review; no implementation approved or verified.
Owner: Iwan Setiawan. Prepared: 24 October 2026.

## Vision and audience

Premium, visual-first Indonesian mathematics learning for Grades 1–6. Journey: Learn → Explore → Practice → Understand → Progress. Student UI uses Bahasa Indonesia and age-appropriate instructions. Guardians handle account creation and consent. Teachers/admins curate content.

## MVP boundaries

Responsive landing; six-grade catalog; guardian-assisted authentication/onboarding; student dashboard; topic/lesson navigation; video, written and visual lessons; React/SVG manipulatives; four question types; two attempts; server grading; durable answers/progress; resume; results/explanations; progress page; minimal admin publishing.
Release content gradually. Initial published content: Grade 5 Fractions, Decimals, Percentages only. Other grades visibly say “Segera hadir”; never present placeholder lessons as available.
Excluded: payments, AI tutoring, scheduling, advanced parent dashboards, complex gamification. No production deployment, paid services, external messages or destructive production changes without owner approval.

## Pilot proposal

Three topics (Pecahan, Desimal, Persentase), two lessons per topic, eight validated questions per topic (24 total). This quantity is a proposed content budget, not existing inventory. Cover representation, equivalence and comparison/conversion with explicit prerequisites. Avoid implying all Grade 5 mathematics is available. Each lesson includes objectives, video with captions/transcript, short explanation, visual, manipulable demonstration, guided example and linked practice.
Human mathematical review is required before publication; verify prompts, diagrams, keys, accepted equivalents, explanations, Indonesian wording, accessibility and age suitability. Missing videos block publication of video-required lessons.

## Functional requirements

- FR01: browse grades publicly and distinguish published/upcoming content.
- FR02: guardian authenticates; record versioned consent before child profile activation. Store alias and grade; no child email, exact birth date, school/address required.
- FR03: dashboard resumes last persisted activity, with honest empty state for a new learner.
- FR04: lessons provide all required learning blocks; video playback alone never demonstrates mastery.
- FR05: practice uses authenticated server-generated sessions with pinned question versions and stable order.
- FR06: allow at most two valid graded submissions per question; correctness terminates that question early. First incorrect answer gives a hint without key; correct or second incorrect unlocks that question's explanation.
- FR07: submitted answers and grading persist atomically; retries cannot consume extra attempts. Draft answer save is distinct from a graded submission.
- FR08: only server computes scores, best score and progress. Resume restores committed attempts and saved drafts after refresh/login on another device.
- FR09: results distinguish first-try correct, second-try correct and not-yet-correct; show explanation and optional video only for authorized terminal questions.
- FR10: admin can create/edit drafts, preview, validate, publish a new version, and unpublish future discovery. Published versions remain immutable for existing sessions.

## Measurement and completion policy

Completion = required lesson steps acknowledged and linked practice submitted; no minimum score required. Topic completion = all required published lessons in its release completed. Unpublish/release changes must not silently rewrite historical completion.
Primary score = number of questions eventually correct / total questions × 100 (equal weight); retain first-attempt accuracy separately. Best score compares completed sessions for the same practice/version set; do not combine unrelated difficulties. Abandoned sessions show partial progress, not a final score.
Track persistence failures, resume correctness, first-attempt accuracy, repeated misconceptions, task success and completion separately. Do not label a child as having mastered mathematics from completion or a single score. No invented success rates or targets based on nonexistent users.

## Quality and release gates

WCAG 2.2 AA target; keyboard alternatives to every pointer activity; no color-only feedback; reduced motion; readable SVG equivalents. Responsive QA at 360, 768 and 1280 CSS px and 200% zoom. No critical console errors, horizontal page overflow, exposed private keys, unauthorized access or duplicate attempts.
Meaningful Vitest/RTL tests for scoring/renderer behavior; Playwright for complete critical journeys; database integration tests for isolation, concurrency and idempotency. No claim of completion without actual command results and browser evidence.

## Risks and open decisions

Repository URL/access is unresolved. Production Supabase project, approved video assets and mathematics reviewer are not supplied. Guardian consent text, retention period, deletion process and applicable child-data requirements require owner review before real student enrollment. Proposed MVP account model: one guardian login with one child profile; multiple-child switching deferred. Confirm before schema implementation. Versions and library compatibility are to be checked against official documentation during Sprint 1.
