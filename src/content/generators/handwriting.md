---
title: "Handwriting Practice"
blurb: "Handwriting practice — ruled guides, model letters and dotted copies to trace"
category: design
version: "1.0.0"
---
Ruled writing lines with a model letter or word to copy, dotted copies to
trace, and space to write it yourself.

## What it is

A handwriting sheet in school print. Every row is a set of guide lines — a
top line, a dashed midline, a solid baseline and a descender line below — so
small letters fill the space between the midline and the baseline, capitals
and tall letters reach the top line, and the tails of g, j, p, q and y drop
to the line below. Each row begins with a model to copy, followed by dotted
copies to trace and then empty space. Single letters come with numbered
starting points and arrows showing the order and direction of each stroke.
Pages can practise single letters, words or whole sentences, in capitals,
small letters or both, and in plain print or precursive (print with little
exit flicks, a first step towards joined writing).

## How to use it

Look at the model at the start of the row. For a single letter, put your
pencil on the red dot marked 1 and follow the arrow, then do stroke 2, and
so on. Trace over each dotted copy carefully, keeping small letters between
the dashed middle line and the baseline and letting tall letters reach the
top line. Then write the letter or word on your own in the empty space, and
on any rows that show only the model. Sit every letter on the baseline.

## Purpose

Handwriting practice is one of the most printed worksheet types there is —
for preschool and early grades, for home learners, and for older writers
tidying up their print. A sheet that starts with a model, fades into tracing
and ends in free writing follows the "I do, we do, you do" pattern teachers
use, and the difficulty setting moves the balance from tracing to writing.

## History

Ruled copy-books with a model line at the top of each page were the
standard way to teach writing from the seventeenth century on. Twentieth-
century school scripts such as ball-and-stick print (built from straight
lines and circles) and later precursive styles made the four-line guide and
the dotted tracing letter the familiar handwriting sheet of today.

## This implementation

- **Spec knobs:** `text` (letters, words or a sentence; empty = a seeded
  choice of simple words, or a short sentence on Hard and Expert), `case`
  (`upper`, `lower`, `both` — a lone letter shows its capital and small forms
  together, words keep the case they were typed in), `style` (`print` or
  `precursive`), `guides` (`four` or `three` lines), `layout` (`auto`,
  `items` or `sentence`), `trace_copies` (0 = fill the row as the difficulty
  suggests), `trace_style` (`dotted` or `faded`), `stroke_order`,
  `difficulty`, `x_height` (0 = from the difficulty), `width`, `height`,
  `margin`, `name_line`.
- **Generation:** the crate carries its own single-stroke alphabet — A-Z,
  a-z, 0-9 and . , ! ? ' - — drawn as vector strokes in ball-and-stick
  proportions: x-height one guide space, capitals, digits and ascenders two,
  descenders one below the baseline (t is a short ascender). Strokes are
  stored in teaching order, which is where the stroke numbers and arrows
  come from; they are placed beside or behind each starting point, clear of
  the letters and of each other. Dotted copies are laid along each stroke at
  even arc-length spacing. Sentences are broken into lines with the fewest
  lines and the most even line lengths. The rows of the page are shared
  among the items. Difficulty maps to age: Kids uses 26 pt guides and traces
  every row; Easy (21 pt), Medium (17 pt) and Hard (14 pt) trace about two
  thirds, half and a third of the rows with fewer copies each, the rest
  showing just the model; Expert (12 pt) shows the model once per row and
  leaves the rest to free writing.
- **Solving:** nothing to solve — this is a practice page; `rating_basis` is
  `guide_size_and_traced_rows`.
- **Guarantees:** deterministic per seed. Every requested character has a
  glyph — any other character is refused with an error naming it, never
  dropped. Every glyph sits on the baseline with the height of its class,
  checked per class against the guide lines: small letters span midline to
  baseline, tall letters, capitals and digits top line to baseline,
  descenders reach the descender line, and every glyph stays within its
  advance width. Text that cannot fit the page is refused rather than
  clipped.
