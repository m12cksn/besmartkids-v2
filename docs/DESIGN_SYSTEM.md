# BeSmartKids design system

Status: proposed, not browser-verified.

## Identity

“Laboratorium matematika yang ramah”: clean white workspaces, green learning paths, yellow accents, precise SVG manipulatives. Preserve the lightbulb brand cue with an original simple mark; use text wordmark until approved logo asset is supplied. No invented existing logo. Avoid generic dashboard styling and decorative clutter.

## Tokens and components

| Token                                                                                                                                                                                                                                                                                                              | Value   | Use                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------------------------------------- |
| primary                                                                                                                                                                                                                                                                                                            | #15803D | primary actions, active navigation    |
| success                                                                                                                                                                                                                                                                                                            | #22C55E | success surfaces/icons with dark text |
| accent                                                                                                                                                                                                                                                                                                             | #FACC15 | highlights with #0F172A text          |
| background                                                                                                                                                                                                                                                                                                         | #F8FAFC | page background                       |
| foreground                                                                                                                                                                                                                                                                                                         | #0F172A | text                                  |
| surface                                                                                                                                                                                                                                                                                                            | #FFFFFF | cards and workspaces                  |
| White text is not assumed safe on success green/yellow. Check actual contrast for each pairing and state. Focus indicator must remain visible on white and green surfaces.                                                                                                                                         |
| Spacing: 4px base, common 8/12/16/24/32/48. Cards radius 20px; inputs/buttons 12px. Body 16–18px, line height ≥1.5; headings responsive. Prefer system sans initially; external font requires justification. Primary targets ≥44×44px. Max reading width ~68 characters. Math objects sized independently of text. |
| Use customized shadcn/ui Button, Card, Form, Dialog, Tabs, Sidebar and Progress. Lucide icons have accompanying labels or accessible names. Motion only for meaningful state change, 150–250ms; respect prefers-reduced-motion and never rely on animation for instructions.                                       |

## Shell and interaction

Public: wordmark, grade catalog, login, clear learning CTA. Student: simple navigation (Beranda, Materi, Progres), current grade and one prominent resume button. Desktop sidebar collapses to mobile drawer. Admin uses denser tables and explicit draft/published state.
Practice: one question, clear attempt count, large SVG workspace, explicit “Periksa jawaban”; selection never submits automatically. First wrong answer: supportive hint. Terminal feedback: explanation and next action. Persistence status: Menyimpan / Tersimpan / Belum tersimpan—coba lagi. No fake badges or fabricated learner statistics.

## Accessibility and math

Target WCAG 2.2 AA. All SVG activities have text equivalents and keyboard controls. Fraction segments use buttons with pressed/selected semantics and labels; number line offers arrow keys and a synchronized numeric alternative. Do not require drag, precise pointer placement, hover or color perception. KaTeX output includes accessible math text. Form errors linked to fields; feedback in polite live regions; avoid focus jumps. Dialogs trap/restore focus; drawer has Escape behavior. Captions and transcripts accompany video. No autoplay audio, flashing or timed penalty.

## Responsive QA

At 360px: stacked cards, compact header, full-width action, no sideways page scroll. At 768px: two-column catalog where usable. At 1280px: three-column catalog, sidebar + workspace. Use content-driven breakpoints. Verify touch, keyboard, 200% zoom, long Indonesian strings and reduced motion. Record real screenshots and issues during implementation; no screens have been verified yet.

## Sprint 1 implementation choice

System Arial/Helvetica stack replaces the scaffold Google-font dependency. Existing shadcn-style primitives are retained and customized. The lightbulb mark is provisional.
