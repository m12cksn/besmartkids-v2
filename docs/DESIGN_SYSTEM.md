# Design System

## Direction

The visual language is optimistic, capable, and calm: bright enough for children
without becoming toy-like. Generous whitespace and rounded geometry soften dense
mathematics, while dark slate text keeps reading comfortable.

## Core tokens

| Role | Value | Use |
| --- | --- | --- |
| Primary | `#15803D` | Primary actions, key progress, active states |
| Success | `#22C55E` | Correct states and positive completion |
| Accent | `#FACC15` | Highlights and moments of delight |
| Background | `#F8FAFC` | Page canvas |
| Text | `#0F172A` | Primary content |

Tokens live as CSS variables in `src/app/globals.css` and are exposed to Tailwind
4 through `@theme inline`. Components must use semantic token utilities rather
than copying hex values.

## Typography and spacing

Geist is the interface typeface. Headings use strong weight and compact tracking;
body text targets a comfortable 1.5–1.75 line height. Layout starts mobile-first,
uses a 44px minimum interactive target, and scales within a 72rem content width.

## Component rules

- Extend primitives in `src/components/ui`; do not fork styling in feature pages.
- Use Lucide icons with text labels unless the control has an accessible name.
- Every interactive element must have a visible keyboard focus state.
- Color cannot be the only carrier of meaning.
- Loading, empty, error, and disabled states are part of component acceptance.
- Motion is restrained and respects `prefers-reduced-motion`.

## shadcn/ui

`components.json` configures the New York style, React Server Components, aliases,
CSS variables, and Lucide. Checked-in components are owned by this repository and
customized to the brand tokens.
