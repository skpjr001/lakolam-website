---
title: "Fuse Beads"
blurb: "Fuse beads — true-size ironing-bead patterns: pixel creatures, coasters, hexagon snowflakes, name plates and a slot-together bead box, every piece proven to fuse as one"
category: design
version: "1.0.0"
---
True-size fuse-bead patterns — pixel creatures, coasters, snowflakes,
name plates and a bead box that slots together — every piece checked to
iron into one piece.

## What it is

A chart for ironing beads (the 5 mm "midi" beads), printed at true size
so it can lie under a clear pegboard. Each bead is a coloured circle; the
empty pegs of the board are small dots. A colour key lists every colour
with its bead count. Motifs: a mirror-symmetric pixel creature with an
outline; a round, square or hexagon coaster with a radial pattern; a
six-fold snowflake on a hexagon board; a name plate with letters on a
bordered plate; and a box — a base and four walls whose edges have
interlocking teeth.

## How to use it

Put the chart under a clear pegboard (or count pegs on an opaque one) and
place a bead of the shown colour on each circle. Check the colour counts
before you start. Cover the beads with ironing paper and iron with a
medium, dry iron in small circles for 10 to 20 seconds until the beads
just join; let it cool under a book, then turn it over and iron the back.
Children should ask an adult to do the ironing.

For the box, make the five panels separately. Stand the four walls on the
base: the teeth on each edge fit into the gaps on the next panel. A dab of
glue holds them.

## Purpose

A craft staple for kids, classrooms and holiday clubs, with patterns that
are guaranteed to work: no stray bead falls off when the piece is lifted,
everything fits the pegboard, and the box panels fit together exactly.

## History

Fusible plastic beads appeared in Sweden in the 1960s as a therapy and
school craft (Hama, 1961) and in the United States in the 1970s (Perler,
from 1984 under that name). The square 29 × 29 and hexagon pegboards
became the standard shapes, and pattern books, websites and pixel-art
communities followed, along with 3D builds from panels.

## This implementation

- **Spec knobs:** `motif` (auto, sprite, coaster, snowflake, name, box),
  `board` (auto, square, hex, round; snowflakes always use hexagon, name
  plates and boxes square, sprites square or round), `size` (beads
  across, 9–29; a box's width and depth, 6–14; sprites on a round board up
  to 19; a hexagon board is always odd), `text` (1–12 letters or digits
  for a name plate; with motif auto it makes the plate), `palette` (auto,
  bright, pastel, earth, frost, mono), `width`, `height` (page, 144–3000
  pt). Changes are reported as `requested_*`. A page too small for true
  size scales the chart down and says `true_size: false`.
- **Generation:** sprites are a random half mirrored, kept to their
  largest connected part, with eyes and an outline (which touches every
  body bead, so it ties the piece together). Coasters colour each peg by
  ring and sector with four-, six- or eightfold symmetry and a rim.
  Snowflakes grow from the centre in whole symmetry orbits, each new cell
  next to the crystal. Name plates are a solid bordered plate with 3 × 5
  pixel letters. The box is the shell of a W × D × H block of cubes, one
  per bead, open at the top: a cube on one face goes to that panel, cubes
  on an edge alternate between the two panels, and bottom corners go to
  one of three; the phases and corner owners are searched in a seeded
  order until every panel is one piece.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. `verification:
  one_connected_piece_on_the_board_counts_retallied` (boxes:
  `every_panel_one_piece_and_panels_partition_the_box_shell`). Every piece
  is one connected component on its board's neighbours (4 on square and
  round boards, 6 on hexagon boards), every bead is on a peg, and box
  panels map back onto their faces and cover every shell cube exactly
  once. Tests recheck connectivity independently by bead-centre
  distances, check the snowflake's sixfold symmetry, the sprite's mirror,
  the plate's letters against the font, the box's tooth pattern, and
  recount the beads drawn on the page against the key.
