---
title: "Brick by Brick"
blurb: "Brick by Brick — a crossword cut into three-square bricks: put each row's bricks back so every run is a word"
category: word
version: "1.0.0"
---
A crossword cut into bricks: put each row's bricks back in the right order and every word falls into place.

## What it is

A crossword wall with no clues. The finished grid was cut, row by row,
into bricks three squares wide — some bricks carry black squares — and
the empty diagram shows only where the bricks go. Beside each row are
that row's bricks, jumbled. Rebuild the wall so that every run of letters
across and down is a real word. At the hardest level each box beside the
wall mixes the bricks of two rows together.

## How to play

Each row of the diagram holds the bricks listed beside it (or, when two
rows share a box, the bricks of that box between them). Copy every brick
into the diagram, keeping its letters and black squares in the order
shown — a brick is never turned round or split. When the wall is
finished, every row and every column reads as words of three or more
letters, separated by black squares; no single letters or two-letter
scraps are left standing.

Start where the bricks can only go one way: a row with a brick that is
all black, or a brick whose letters cannot start or end a word. Then use
the columns — a letter you have placed must begin or continue a word
going down, so the bricks of the next row have to fit under it. There is
exactly one way to rebuild each wall.

## Purpose

A word puzzle for people who like fitting things together. It mixes
crossword skills (knowing which letter runs can be words) with the logic
of a jigsaw: every placement constrains the rows above and below.
Without clues it can be solved by anyone with a good vocabulary, and the
bricks give a gentle way in.

## History

Brick by Brick is a long-running feature of American puzzle magazines,
where it appears with a full set of crossword clues: the bricks help
solvers who are stuck on a clue, and the clues help place the bricks.
This clue-free version leaves the bricks to do all the work, which is
honest only because the answer is checked to be the one wall that can be
built.

## This implementation

- **Spec knobs:** `difficulty`; `size` — 6, 9 or 12 squares (0 = the
  difficulty's; other values round to the nearest); `grouping` — `auto`,
  `row` (each row's bricks in their own box) or `pair` (two rows' bricks
  mixed in one box); `cell` (square size, 14–48 pt); `line` (0.3–3 pt).
- **Levels:** Easy — 6×6, one box per row. Medium — 9×9. Hard — 12×12.
  Expert — 12×12 with two rows per box. Kids is not reachable (a 6×6 wall
  is already Easy) and is served as Easy. An explicit size and grouping
  set the band honestly: 6×6 in pairs is Medium, 9×9 in pairs Hard.
- **Generation:** a 180°-symmetric, fully checked block pattern (every run
  3 to 5 letters on 6×6, 3 to 7 above; white squares connected; no 2×2 of
  blocks) is filled from family-friendly words — three-letter words from
  the basic tier, longer ones from the common tier — with a bitset slot
  filler. Each row is cut into three-square bricks; each box's bricks are
  shuffled, and a box is never printed in its solved order.
- **Solving:** an exhaustive search tries every distinct arrangement of
  each box's bricks, top row first. A finished row must read as words of
  three or more letters of the large dictionary (SCOWL ≤ 70, ≈ 114k
  words); every column's growing run must still be the start of such a
  word that fits in the rows left, and a run closed by a black square or
  the foot of the wall must be a word. Walls are counted up to two.
- **Guarantees:** deterministic per seed; exactly one wall can be built
  from the bricks under the rules — proven by the count, and a count that
  runs out of its node budget is treated as ambiguous and the wall
  discarded; the tests re-count every level with an independent search.
  Answers are family-friendly. If a requested size or grouping cannot be
  generated, the wall relaxes to rows, then to a smaller size, and meta
  records `requested_size` and `requested_grouping`. Meta carries
  `unique`, `difficulty` with `rating_basis: wall_size_and_grouping`, the
  search nodes used and the answer words.
