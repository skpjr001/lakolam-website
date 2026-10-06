---
title: "Area Puzzles"
blurb: "Area puzzles — find the ? in a figure of rectangles using only area = length x width"
category: maths
version: "1.0.0"
---
A rectangle cut into rectangles, a few lengths and areas, and one number
marked "?" — found with nothing but length × width.

## What it is

Each puzzle is a figure made of rectangles. Some numbers are printed: the
numbers inside a piece are its area, the numbers outside the figure are
lengths, measured between the little marks at their ends. One number is a
question mark. Every length is a whole number, and the question can always
be answered with whole numbers — no equations, no fractions. The figures are
not drawn to scale, so the picture cannot be measured with a ruler.

## How to play

Use three facts, over and over:

- **Area = length × width.** If you know two of them, you know the third:
  a piece of area 24 that is 6 wide is 4 tall.
- **Lengths along a line add up.** If a side of 10 is split into 4 and
  something, the something is 6.
- **Pieces next to each other share a side.** Two pieces side by side
  have the same height; two pieces stacked have the same width. And two
  pieces that together make a rectangle have their areas added: pieces of
  area 12 and 18 side by side make a rectangle of area 30 — if it is 5 tall,
  it is 6 wide, even when neither piece's width is known.

Look for a piece where you already know two of its three numbers, work out
the third, and carry it to a neighbour. The question mark is always reached
in the end, and the answer is whole.

## Purpose

Area puzzles train the meaning of area rather than the formula: area as
something that adds, splits, and trades against length. They reward
patience and seeing structure — which pieces line up, which join into a
bigger rectangle — and they make a satisfying bridge between arithmetic
worksheets and logic puzzles for ages 9 and up, and for adults.

## History

The genre was created by the Japanese puzzle author Naoki Inaba, who
published hundreds of such figures in Japan; they reached English-speaking
readers in the 2010s through translated collections, newspapers and
classroom use. Inaba's rule — whole numbers only, no algebra — is kept here
exactly.

## This implementation

- **Spec knobs:** `difficulty`; `puzzles` (1–4 per page, default 4);
  `ask` (`mixed`, `area` or `length` — what the "?" may be); `width`,
  `height` (page, Pt); `line`.
- **Generation:** a rectangle with whole-number sides is cut by straight
  cuts (a guillotine subdivision) into 3 pieces (Kids), 4 (Easy), 5
  (Medium), 6 (Hard) or 7 (Expert). Every outside length of a piece and
  every piece's area is a candidate clue; one becomes the "?". With all the
  others printed, a deduction engine must reach the "?"; then clues are
  removed in a seeded order whenever the engine still reaches it, so every
  printed clue is needed. A puzzle the engine solves in one step is
  rejected.
- **Solving:** the engine knows only sound, whole-number rules — area =
  width × height (and exact division back), lengths along a line add and
  subtract, and a rectangle made of two pieces has their areas added (or
  one taken from the other). Pieces with the same span share their width
  or height by construction. It works in rounds, so every derived fact has
  a shortest-depth derivation, which the meta lists as `proof`.
- **Guarantees:** deterministic per seed. Every rule is an identity about
  the figure, so the "?" is forced by the printed clues (`unique: true`);
  `Puzzle::obeys` re-checks that the pieces tile the rectangle, every
  printed number is true, the "?" is reached and every clue is needed. The
  tests prove the "?" forced a second, independent way: enumerating every
  whole-number figure with the same lines that agrees with the clues and
  checking they all give the same answer (with a control that removing a
  clue lets it come loose).
- **Difficulty:** `rating_basis: "deduction_steps"` — the number of facts
  in the proof, plus 2 when the proof uses a combined rectangle (adding or
  subtracting areas, or dividing a combined area): 2 or less Kids, 3–4
  Easy, 5–6 Medium, 7–9 Hard, 10 or more Expert. Each puzzle is rated on
  its own; the requested band is reached in all bands in practice (400
  seeded attempts per puzzle), and if it ever were not, the nearest band
  found is served and labelled as such (the page's `difficulty` is its
  hardest puzzle's, beside `requested_difficulty`).
- **Answer key:** the "?" in red, the working the proof needs that has a
  place on the figure (areas of blank pieces, outside lengths) in red, and
  "? = N" under each figure.
- Outlines are always rectangles; L-shaped outlines and a "ratio" rule for
  pieces whose sides are not whole are not offered.
