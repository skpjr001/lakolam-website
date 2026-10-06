---
title: "Pentomino Fill"
blurb: "Pentomino fill — cover a rectangle, holed square or picture exactly with a set of pentominoes or tetrominoes, with pieces to cut out"
category: maths
version: "1.0.0"
---
Fill the shape exactly with the pieces — then cut them out and try it.

## What it is

A shape drawn on a grid — a rectangle, a square with a hole, or a simple
picture such as a house, a cat or a rocket — and a set of pieces made of
squares: pentominoes (five squares each) or, for younger children,
tetrominoes (four squares each). The pieces cover the shape exactly. A
second page has the same pieces at the same size, with dashed lines, to cut
out and move around.

## How to use it

Cut out the pieces along the dashed lines, or draw them in by hand. Place
every piece on the shape so that the pieces cover every square of it with no
gaps and no overlaps, and nothing hangs over the edge. Pieces may be turned
and flipped over. Grey pieces already drawn on the shape are fixed — leave
them where they are.

The page says how many answers there are. "There are many ways — find one"
means any filling is right. "There is exactly one way" means the grey pieces
leave only one possible filling.

Tips: start with the awkward corners and narrow strips, where few pieces
fit. The long I piece and the X (the plus sign) are the fussiest — find
their places early. If a gap is left that is not a multiple of the piece
size, something has to move.

## Purpose

A hands-on geometry activity: area as counting squares, turning and flipping
shapes (rotations and reflections), and planning ahead. The easiest pages
suit young children with tetrominoes; filling a 6×10 rectangle with all
twelve pentominoes is a classic challenge for adults.

## History

Pentominoes were named by the mathematician Solomon Golomb in 1953 and made
famous by Martin Gardner's columns in *Scientific American*. The twelve
pieces became a staple of classroom geometry and of puzzle sets; the 6×10
rectangle has 2,339 different fillings, and the 3×20 rectangle only two.

## This implementation

- **Spec knobs:** `pieces` (`auto` — tetrominoes for Kids, pentominoes
  otherwise — `pentominoes`, `tetrominoes`), `region` (`auto`, `rectangle`,
  `hole`, `picture`), `mode` (`auto` — find-one for Kids, Easy and Expert,
  unique for Medium and Hard — `find_one`, `unique`), `difficulty`,
  `cutouts` (add the cut-out page), `cell` (0 sizes the shape to the page),
  `line`.
- **Generation:** a shape is drawn from the size tier for the difficulty
  (small: 15–25 cells; medium: 30–45; large: the 60-cell rectangles 6×10,
  5×12, 4×15, 3×20 and the 8×8 square with a 2×2 hole), then a random tiling
  is found with each pentomino at most once (tetrominoes may repeat, a few
  times each). The pieces of that tiling are the set, so every page is
  solvable by construction. Unique pages pre-place pieces from the tiling
  until exactly one filling is left, then take back any that turn out not
  to be needed.
- **Solving:** exact cover (Algorithm X) choosing the first uncovered cell,
  so each filling is counted once even when the set holds two identical
  tetrominoes; pockets that are not a whole number of pieces are cut off.
- **Guarantees:** deterministic per seed; the answer key's filling uses
  exactly the printed set and covers the shape, checked piece by piece.
  Unique pages are proven with a count capped at 2 (an exhausted node budget
  counts as ambiguous) and say `unique: true`; find-one pages say
  `unique: false, solvable: true`, with the number of fillings found
  (`solutions`, exact or "at least" up to 500). The puzzle, key and cut-out
  pages share one page size, so they print at the same scale and the
  cut-outs fit the shape. Rated by the number of pieces left to place
  (`rating_basis: pieces_to_place`): tetrominoes — up to 6 Kids, more Easy;
  pentominoes — up to 3 Kids, 4–5 Easy, 6–8 Medium, 9–10 Hard, 11–12
  Expert. If a band is not reached in twelve attempts the nearest band found
  is returned and labelled (`difficulty_requested` in meta).
