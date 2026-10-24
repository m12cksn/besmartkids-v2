# Question Engine — Architecture Contract

The engine is documented now but implemented in Sprint 5.

## Separation of concerns

```text
validated public config -> renderer -> normalized student answer
normalized answer + authenticated session -> server submission -> secret grading
```

Renderers never receive answer keys and never decide correctness. Server grading
is atomic, idempotent, version-aware, and capped at two submitted attempts.

## Initial renderer contract

The MVP supports multiple choice, numeric input, fraction selection, and number
line. Each renderer will:

- accept a discriminated-union configuration validated by Zod;
- expose a serializable normalized answer;
- work with pointer, touch, and keyboard input;
- provide visible labels and screen-reader instructions;
- render mathematical visuals with React and SVG by default;
- stay reusable between lesson examples and practice sessions.

## Planned public shape

```ts
type QuestionConfig =
  | { type: "multiple-choice"; prompt: ContentBlock[]; options: Choice[] }
  | { type: "numeric-input"; prompt: ContentBlock[]; constraints: NumericRules }
  | { type: "fraction-selection"; prompt: ContentBlock[]; visual: FractionVisual }
  | { type: "number-line"; prompt: ContentBlock[]; visual: NumberLineVisual };
```

The final schema will version both content and renderer configuration. Active
practice sessions retain the exact question version they started with.
