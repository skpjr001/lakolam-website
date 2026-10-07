---
title: "Tarsia Jigsaw"
blurb: "Tarsia jigsaw — cut-out triangles that rebuild a triangle or hexagon when every question meets its answer"
category: maths
version: "1.0.0"
---
Cut out the triangles and fit them back together — every question must touch its answer.

## What it is

A cut-and-match puzzle. A big triangle (or a hexagon) has been cut into
small triangular pieces. Wherever two pieces meet, one edge carries a
question and the other carries its answer: 7 × 8 meets 56, 3/4 meets 0.75,
2(x + 3) meets 2x + 6. The pieces are printed jumbled up and turned round,
each with a small number. The edges round the outside of the finished shape
are either blank or carry "distractors" — questions and answers that match
nothing on any other piece. The answer key shows the finished shape with the
number of the piece that goes in each place.

## How to play

1. Cut out all the pieces along the lines.
2. Pick any piece and work out the question on one of its edges.
3. Find the piece with the answer on one of its edges and put the two
   edges together, so the question and the answer touch.
4. Keep going until every piece is used. The pieces build one big triangle
   (or hexagon).
5. Every question has exactly one answer among the pieces, and no two
   answers are the same, so if you need a value you cannot find, check your
   working.
6. Blank edges, and edges whose question or answer matches nothing, belong
   on the outside of the shape — they are clues to the outline.
7. Some numbers read differently upside down (6 and 9, 18 and 81): those
   have a bar underneath to show which way up they go.

Work in pairs or small groups and talk about each match before you place it.

## Purpose

Tarsia puzzles turn a page of practice questions into something to handle,
argue about and assemble. Because every piece has to fit, pupils check
their own work as they go: a wrong answer leaves a piece with nowhere to
go. Teachers use them for revision, as group activities, and as a gentle
way into topics such as fractions, decimals and percentages, where many
different-looking forms mean the same value. The levels follow school
mathematics from adding and taking away (age 6-7) through times tables,
fractions, decimals and percentages, to solving equations and expanding
and factorising quadratics (age 14-16).

## History

The format is named after Hermitech Laboratory's free *Tarsia Formulator*
software, written for UK mathematics classrooms in the early 2000s; the
name comes from *intarsia*, the Italian craft of wood inlay in which shaped
pieces are fitted together into a picture. The idea it packaged — dominoes
and jigsaws with questions and answers on matching edges — is older, and
it spread through the Standards Unit materials *Improving Learning in
Mathematics* (2005) and teacher-sharing sites, where Tarsia jigsaws remain
one of the most shared activity types for secondary mathematics.

## This implementation

- **Spec knobs:** `difficulty` (the level of the questions within the
  topic); `topic` (`arithmetic`, `fractions`, `algebra`); `shape`
  (`triangle`, `hexagon`); `size` — pieces along each side, a triangle 3-6
  (9, 16, 25 or 36 pieces) and a hexagon 1-2 (6 or 24 pieces), held to that
  range (meta reports `requested_size`); `outer` (`blank` or
  `distractors`); `width`, `height`, `line`.
- **Generation:** arithmetic runs from adding and taking away within 20
  (Kids) through times tables and division (Easy), two-digit times
  one-digit, division and squares (Medium), order of operations and
  negative numbers (Hard), to powers and decimal products (Expert);
  fractions from unit fractions of amounts (Kids) through fractions of
  amounts and simplest form (Easy), fraction-decimal-percentage
  equivalences and percentages of amounts (Medium), adding and subtracting
  (Hard), to multiplying and dividing (Expert); algebra from the missing
  number in a box (Kids) through one-step equations (Easy), two-step
  equations and collecting like terms (Medium), expanding brackets and
  unknowns on both sides (Hard), to expanding and factorising quadratics
  (Expert). One question-and-answer pair is drawn per inner edge, all with
  different values; a board that needs more different values than a
  level's normal number range holds uses a wider range (meta
  `widened_number_range`). Each pair goes on an inner edge the right way
  round at random; distractors are one side of a further fact whose value
  appears nowhere else, drawn from the level's own range first. The cut-out
  page puts the pieces in the board's places shuffled and turned (at most
  one left where it belongs); text runs along each edge, reading upright
  from inside the piece, sized so the text on neighbouring edges never
  meets.
- **Solving:** the assembly is found by an exhaustive search: places are
  filled in reading order, trying every unused piece in each of its three
  turns, keeping only placements where each shared edge joins two equal
  values and no matching edge faces outward.
- **Guarantees:** `unique` — every printed edge is read back from its drawn
  pieces by an independent parser (fractions, decimals, percentages,
  powers, polynomials, and a linear equation read as its solution); each
  question equals its answer, every value is printed exactly twice (a
  question and its answer, on the two sides of one edge) or once (a
  distractor), and the search over the pieces *as printed on the cut-out
  page* finds exactly as many assemblies as the shape has turns (3 for a
  triangle, 6 for a hexagon) — one assembly, up to turning the whole shape
  (meta `assemblies_counted`). The tests also re-read every answer, check
  that every printed character is in the font, that a second partner for
  any edge is caught, and that every topic, level, shape and size
  generates.
