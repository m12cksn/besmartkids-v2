# Sprint backlog

All sprints are small review gates, not calendar promises. Implementation status is recorded in docs/reports/SPRINT_1.md; later sprints remain not started. Dependencies are sequential unless noted. Each sprint ends with a concise report: scope changed, files, actual test commands/results, browser observations, limitations, risks, next step. No production deployment without approval.

| Sprint | Scope / deliverables                                                                    | Dependencies                                                                     | Acceptance and verification                                                                                                                                                 |
| ------ | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1      | project scaffold, theme, public shell, landing, six-grade catalog, Grade 5 preview      | owner reviews planning; repository available or local scaffold explicitly chosen | typecheck/lint/build pass; real browser at 360/768/1280; CTA routes, keyboard, reduced motion; no auth/progress promises                                                    |
| 2      | migrations, Supabase clients, guardian auth/consent, profile, protected shells, RLS     | S1; development Supabase configuration; account model/consent reviewed           | signup/login/logout, consent gate; A/B isolation; student cannot grant admin or edit scores; secrets excluded                                                               |
| 3      | versioned catalog/lessons, minimal admin draft/preview/validate/publish, media policies | S2; reviewed assets                                                              | draft invisible publicly; published immutable; admin-only actions; lesson renders all blocks                                                                                |
| 4      | session API, transactions, private grader registry, multiple choice/numeric             | S2–3                                                                             | direct API ownership, two-attempt cap, concurrency/idempotency, exact grading and key-leak tests pass                                                                       |
| 5      | fraction visual + number line, draft persistence, checkpoint/resume                     | S4                                                                               | four renderers keyboard/touch; reload + second-device resume; failed saves/revisions honest                                                                                 |
| 6      | final results, progress dashboard, comparable best scores, pilot content                | S3–5; math reviewer                                                              | 6 proposed lessons/24 reviewed questions published only after validation; completion/accuracy separate; end-to-end learn/practice/review                                    |
| 7      | integrated QA and release readiness                                                     | S1–6                                                                             | accessibility/manual browser QA; cross-user/security regressions; content review; operational/retention decisions; report blockers and request separate production approval |

## Priority and risk ledger

P0: answer leakage, cross-student access, race on attempts, client-controlled score, consent bypass. Block release on any occurrence.
P1: wrong mathematical key/diagram, lost checkpoint, inaccessible manipulative, missing video transcript, unpublished content exposure. Block affected content/flow.
P2: cosmetic polish, optional explanation videos. No expansion into payments/AI/scheduling.

## Definition of done

Implemented code reviewed; acceptance checks actually run; no unresolved critical defects; browser evidence for UI; changed contracts/docs updated; no secrets or real-child fixtures; PR when repository supports it. “Designed”, “implemented”, “tested”, “approved”, and “deployed” are distinct statuses.
