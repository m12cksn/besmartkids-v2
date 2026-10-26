# Modular question engine

Status: contract proposal; not implemented.

## Separation

QuestionRenderer maps a discriminated public type to a React renderer. Renderers receive {question, value, onChange, disabled, feedback}; they collect answers only. Shared shell owns prompt, attempts, submit, save state and feedback. Server grader registry independently maps type to a private grader. Never bundle grader modules into client code.

## Typed JSON contract

PublicQuestion = {sessionQuestionId, versionId, type, prompt, visualConfig, answerSchemaVersion:1}. No correct answer, accepted answer list, revealing explanation or executable code in public JSON, HTML, RSC payloads, static assets or source maps.

| Type                                                                                                                                                                                                                                                                                                              | Public visualConfig                         | Submitted answer           | Private grading config                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------- | -------------------------------------------------------- |
| multiple_choice                                                                                                                                                                                                                                                                                                   | options:[{id,label}], optional illustration | {optionId}                 | {correctOptionId}                                        |
| numeric_input                                                                                                                                                                                                                                                                                                     | inputMode, unit?, decimalPlaces?            | {value:string}             | exact canonical decimal or explicitly reviewed tolerance |
| fraction_visual_selection                                                                                                                                                                                                                                                                                         | wholeCount, partsPerWhole, arrangement      | {selectedPartIds:string[]} | target rational and selection rules                      |
| number_line                                                                                                                                                                                                                                                                                                       | min,max,step,tickLabels,interactionMode     | {tickIndex:integer}        | accepted tick indices or exact rational target           |
| Each config is a versioned Zod discriminated union with strict keys, size bounds and a non-executable diagram vocabulary. Validate at authoring, publishing, loading and submission boundaries. Visual configs must not accidentally reveal targets through hidden fields, labels or preselected correct objects. |

## Mathematical correctness

Represent fractions/decimals as rational integers or canonical decimal strings in grading; avoid floating point equality. Bound denominator, magnitude, string length and object count. Fraction selection requires unique IDs within configured parts; equivalence accepted only if pedagogically intended. Define whether position or count matters for each published key. Numeric input accepts documented Indonesian comma or dot decimal separators; reject ambiguous thousands notation and non-finite/scientific input unless explicitly supported. Number line uses integer tick indices with rational conversion. Every key includes reviewed fixtures for correct, equivalent, near-miss and invalid answers.

## Attempt lifecycle

unanswered → first incorrect → terminal incorrect on second incorrect; any correct answer → terminal correct. Draft changes and invalid payloads consume no attempts. First wrong response can provide reviewed hint, never key. Terminal question review can expose its explanation/key only to session owner. Session completion unlocks final summary. No answer key in previews accessible to students.
Request idempotency scoped to session; persist payload hash and original response. Replayed identical request returns same response even after completion. Reused key with changed answer yields 409. Transaction locking serializes concurrent attempts; no client-side counter authorizes submissions. Session pins versions so later edits cannot change results.

## Persistence and rendering

Save drafts on settled change and before navigation; show failure honestly. Refresh reconstructs committed answers and attempts from server. Never silently submit a draft on reconnect. SVG components maintain controlled React state; accessible selection and numeric alternatives provide equivalent outcomes. Use React/SVG first, KaTeX for notation; add dnd-kit only when drag activity is approved, react-konva or JSXGraph only with documented need and accessibility alternative.

## Tests required before release

Registry dispatch and controlled changes; keyboard-only completion for all four types; rational equivalence and localization; unknown type/schema rejection; malformed answer consumes zero attempts; correct first attempt closes question; two incorrect attempts lock; student A cannot read/submit/review student B; draft refresh; duplicated request; two concurrent requests at attempt limit; key reuse conflict; question version immutability; private key absent from anonymous/student payloads; terminal-review policy enforced through direct API calls. UI tests alone cannot establish DB isolation or atomicity.
