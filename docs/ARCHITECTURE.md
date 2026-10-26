# Architecture proposal

Status: design only. No infrastructure created. Stack follows the master instruction.

## Project structure

```text
src/
  app/
    (public)/page.tsx
    (public)/grades/page.tsx
    (public)/grades/[grade]/topics/page.tsx
    (auth)/login/page.tsx
    (student)/student/{page.tsx,layout.tsx}
    (student)/student/topics/[slug]/page.tsx
    (student)/student/lessons/[id]/page.tsx
    (student)/student/practice/[sessionId]/page.tsx
    (student)/student/results/[sessionId]/page.tsx
    (student)/student/progress/page.tsx
    (admin)/admin/page.tsx
    api/practice/sessions/route.ts
    api/practice/sessions/[sessionId]/{draft,answers,finish,review}/route.ts
    api/learning/checkpoints/route.ts
  components/{ui,layout,brand,math}/
  features/{catalog,auth,lessons,practice,progress,admin}/
  lib/{supabase,validation,server}/
  styles/
supabase/{migrations,seed.sql,tests}/
tests/{unit,integration,e2e}/
public/
docs/
```

Brace notation describes multiple paths, not literal folder names. Server-only modules isolate secrets, grading, privileged queries. Server Components load data; Client Components own local interactive state. Route handlers authenticate, validate with Zod and invoke transactional database operations. Next.js protected responses must not enter a shared cache.

## Database model

All IDs UUID, timestamps UTC. Explicit FKs, indexes on ownership/order, unique constraints and check constraints in migrations.

- guardian_consents(id, guardian_user_id → auth.users, policy_version, accepted_at, revoked_at).
- student_profiles(id, guardian_user_id UNIQUE, alias, grade CHECK 1..6, consent_id, created_at). One child per guardian proposed for MVP.
- user_roles(user_id, role): admin grants only through trusted operator; no self-service role mutation.
- grades(id 1..6, title, sort_order).
- topics(id, grade_id, slug UNIQUE, title, status, order).
- lessons(id, topic_id, slug, current_published_version_id, order, status).
- lesson_versions(id, lesson_id, version, objectives, blocks JSONB, video_asset_id, published_at); immutable on publication.
- media_assets(id, kind, storage_path or approved video reference, transcript, captions, accessibility_metadata, status).
- questions(id, topic_id, current_published_version_id, status).
- question_versions(id, question_id, version, type, prompt, public_config JSONB, learning_objective, published_at).
- private.question_keys(question_version_id PK, grading_config JSONB, explanation JSONB, explanation_video_id). No student SELECT grants, including explanations before review eligibility.
- practice_sets(id, topic_id, version, status); practice_set_items(set_id, question_version_id, ordinal UNIQUE per set).
- practice_sessions(id, student_id, practice_set_id, status, started_at, completed_at, score); question membership frozen at creation.
- session_questions(id, session_id, question_version_id, ordinal, state, attempts_used CHECK 0..2, correct_attempt).
- answer_submissions(id, session_question_id, attempt_no CHECK 1..2, answer JSONB, is_correct, request_id, created_at); UNIQUE(session_question_id, attempt_no), UNIQUE(session_id-equivalent ownership scope, request_id) implemented via session_id column.
- answer_drafts(session_question_id PK, answer JSONB, revision, updated_at).
- lesson_progress(student_id, lesson_version_id, required_steps JSONB, completed_at, UNIQUE pair).
- learning_checkpoints(student_id PK, activity_type, activity_id, location JSONB, revision, updated_at).
- admin_audit(id, actor_user_id, action, entity_id, entity_version, created_at).
  Session totals and progress views derive from authoritative rows; best scores are a view over comparable completed sessions. Do not accept client totals.

## Authorization and RLS

Enable RLS on every exposed table. Anonymous users read published catalog/content metadata only. Student ownership follows auth.uid() → student_profiles.guardian_user_id; never trust body student_id. Users may read their own attempts/progress but cannot directly insert/update attempts, scores, sessions or lesson completion. Controlled RPCs/route handlers own those writes. Direct draft/profile writes, if allowed, must validate ownership and restricted columns; prefer controlled RPCs.
Admin check uses trusted role table (or protected claims verified server-side), never user-editable metadata. Admin route protection and DB policies both required. Revoke public schema usage on private schema; no exposed view embeds keys. Storage buckets have ownership/published-content policies; private media uses short-lived access URLs.
Prefer caller JWT plus narrowly scoped RPCs. Any SECURITY DEFINER function sets a safe search_path, qualifies relations, checks auth.uid(), ownership, role and constraints, and revokes execute from unauthorized roles. Service-role credential stays server-only; it bypasses RLS and requires explicit ownership checks, never generic proxy endpoints.

## API contract (v1 proposal)

JSON success: {data, requestId}; error: {error:{code,message,fieldErrors?},requestId}. 400 invalid input; 401 unauthenticated; 403 forbidden; 404 absent or inaccessible resource; 409 conflict/stale revision; 422 semantically invalid answer; 429 rate limited. Never echo private grading data.

- POST /api/practice/sessions {practiceSetId, idempotencyKey} → 201 {sessionId, questions:PublicQuestion[], checkpoint}; retry returns same session.
- GET /api/practice/sessions/:id → 200 {status, questions, committedAttempts, drafts, revision}; add route.ts alongside action directories.
- PUT .../:id/draft {sessionQuestionId, answer, expectedRevision} → {draftRevision,savedAt}; stale revision 409; no attempt consumed.
- POST .../:id/answers {sessionQuestionId, answer, idempotencyKey} → {attemptNo,correct,remainingAttempts,state,hint?,review?}. review only for that terminal question.
- POST .../:id/finish {idempotencyKey} → {status,score,firstAttemptAccuracy}; reject incomplete questions with 409. No silent skipping in MVP.
- GET .../:id/review → {eligibleQuestions,summary}; only terminal questions; full final summary requires complete session.
- PUT /api/learning/checkpoints {activityType,activityId,location,expectedRevision} → {revision,savedAt}; reject foreign/inaccessible IDs; progress completion uses a separate validated server action.
  Server verifies max sizes, question membership, pinned version, consent and session state. Add rate limits to auth and grading; no unnecessary answer data in logs.

## Reliability

A grading transaction locks session and session_question in stable order, checks idempotency before state changes, grades against private pinned key, inserts attempt, updates question/session/checkpoint and commits. Same key with different payload → 409; transport retry returns original result. Two concurrent requests cannot exceed attempt budget or finish a closed question.
Do not mark “Tersimpan” until server acknowledgment. Offline state retains in-memory draft, warns user, disables grading and offers retry; no offline grading. Out-of-order checkpoint/draft writes use revisions. Database migrations are reversible where feasible and verified on nonproduction data first.

## Operations

GitHub feature branches + PRs when repository is supplied. Proposed Vercel deployment only with approval; separate development/test/production Supabase projects. Commit .env.example placeholders, ignore local secrets. Pin verified dependency versions and lockfile during setup, no assumption that a particular framework version is current. No real student data in fixtures. Backup/restore and retention decisions are release gates, not completed capabilities.
