---
title: "Edge Match"
blurb: "Edge match — cut out 4 to 25 square cards and lay them so every touching edge completes one shape; exactly one arrangement"
category: puzzle
version: "1.0.0"
---
Cut out the square cards and lay them in a square so that every touching
edge completes one shape — there is exactly one way.

## What it is

An edge-matching puzzle of 4, 9, 16 or 25 square cards to cut out. Each
edge of a card carries half a coloured shape — half a disc, square,
diamond or hexagon, some with a white spot — printed either solid or
pale. The cards are printed shuffled and turned. The answer page shows the
cards laid out solved, each with its number, turned the way it goes.

## How to play

Cut out the cards along their outlines. Lay them in a square, three by
three for nine cards, four by four for sixteen, five by five for
twenty-five. Wherever two cards touch, the two half shapes must make one
whole shape: the same shape in the same colour, one half solid and the
other half pale. The edges round the outside of the square do not need to
match anything. You may turn the cards any way you like; in the kids'
version, keep every number upright and only slide the cards. There is only
one way to fit them all, apart from turning the whole finished square.

Start with the shapes that appear least often: a half shape whose partner
is printed on only one other card tells you where that card goes.

## Purpose

A tabletop puzzle to make at home: the retail "scramble square" genre,
from a gentle nine-card picture match to a twenty-five-card challenge in
the spirit of the famously hard large edge-matching puzzles. Every page
has one solution, so the last card always fits.

## History

Edge-matching puzzles go back to the nineteenth century; Major MacMahon's
coloured squares and triangles (1921) made them a subject of recreational
mathematics. Nine-card picture versions with half animals on each edge
became a toy-shop staple in the twentieth century, sold as "scramble
squares" and similar names. In 2007 the 256-piece Eternity II offered a
two-million-dollar prize; it has never been solved. Edge matching with
free rotation is NP-complete, which is why a few more pieces make such a
difference.

## This implementation

- **Spec knobs:** `difficulty` (kids, easy, medium, hard, expert),
  `size` (pieces per side, 2–5; null: 3 for kids to medium, 4 for hard, 5
  for expert), `kinds` (motif kinds 2–8; null: from the band and size),
  `rotation` (null: allowed except for kids), `cell` (piece side, 60–200
  pt), `line` (0.5–4 pt). Each size has a smallest number of kinds that
  reliably gives one solution (2 to 6, measured); fewer are raised and
  reported as `requested_kinds`. Other clamps are reported as
  `requested_*`; an explicit knob that matches the band's choice is noted
  as `*_set_explicitly`.
- **Generation:** a solved board is labelled at random — every internal
  edge one kind and opposite halves either side, outer edges free — then
  improved by local search: whenever a second arrangement exists, an edge
  of a piece that the rival moved is relabelled. Pieces that repeat, or
  look the same turned, are relabelled first. The board is then shuffled
  and every piece turned at random for printing.
- **Solving:** the uniqueness count is a depth-first search that always
  fills the open position with the fewest fitting (piece, turn) pairs,
  using bit masks of candidates per side label. With turning, piece 1 is
  held at its printed turn, which picks exactly one of the four whole-board
  rotations of every arrangement, so the count is modulo board rotation.
  Counts stop at 2; a count that runs out of its node budget is ambiguous
  and is never served.
- **Guarantees:** `unique: true` (modulo board rotation when pieces turn).
  No two pieces alike and none symmetric under a turn, so one physical
  layout is one arrangement. Difficulty is rated from the nodes the
  uniqueness proof explored (`rating_basis: search_nodes`): under 400
  easy, under 3,000 medium, under 40,000 hard, otherwise expert; a
  no-turning board under 2,000 nodes is kids. Every band is reachable from
  its own plan; when a requested band differs from the rating the request
  is reported as `requested_difficulty`. Tests re-prove every band with an
  independent count (spiral order from the centre, every neighbour checked
  directly, no symmetry breaking — a unique turning board shows exactly
  four raw arrangements), check the two counts agree on random boards,
  read the key back, and sweep every boundary.
