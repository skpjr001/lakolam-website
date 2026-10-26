---
title: "Terrazzo"
blurb: "Terrazzo: angular marble chips in a graded size mix, set without overlap in a polished matrix, with brass divider strips"
category: design
version: "1.0.0"
---
A polished stone floor: broken marble chips of every size, set close but
never touching in a smooth matrix, divided by bright brass strips.

## What it is

A design of terrazzo, the floor made by scattering chips of marble and
granite into wet cement and grinding it flat so every chip shows its cut
face. The chips are angular, in a graded mix — a few large pieces, many
small ones and a dust of grains — in several stones: red, yellow, white,
black and green marbles for a Venetian floor, softer blush, sage and powder
blue for a modern one, or greys alone. Brass divider strips can split the
surface into a grid, a lattice of diamonds, an Art Deco fan or a pattern of
rectangles, with the matrix colour alternating from zone to zone.

## How to use it

Use it as a background, a print or a colouring page. To colour it, choose
the line-art palette and decide on four or five stone colours first; then
colour the large chips, then the small ones, a few of each colour at a
time, so the mix stays even over the whole floor. Leave the matrix pale.

## Purpose

A restful, endlessly detailed surface that shows how a random scatter still
looks orderly when its sizes follow one law and nothing overlaps.

## History

Terrazzo grew from Venetian workers' habit, from the 15th century on, of
setting marble offcuts into clay floors and polishing them (*pavimento alla
veneziana*); the craft was carried by Friulian terrazzo makers to France,
Germany and the United States, where electric grinders and brass or zinc
divider strips made it the floor of Art Deco lobbies and mid-century
schools and airports. Today it is made with resin as well as cement. This
page follows the way the floors are mixed, not any particular floor.
Sources: National Terrazzo & Mosaic Association, *Terrazzo Specification
and Design Guide*; Ottorino Bortolussi and others on the Friulian
*terrazzieri* of Sequals.

## This implementation

- **Spec knobs:** `palette` (auto, venetian, modern_pastel, monochrome,
  line_art), `dividers` (auto, none, grid, diamond, fan, panels),
  `size_law` (graded, uniform, bimodal), `max_chip` and `min_chip` (chip
  sizes in points), `coverage` (share of the floor covered by chips),
  `strip_width` (brass strip width), `width`, `height`, `margin`.
- **Generation:** chip sizes are drawn independently from the chosen law on
  `[min_chip, max_chip]` — graded is a truncated power law with density
  ∝ s^−2.4, bimodal puts 22 % of chips in the top 40 % of the range and the
  rest in the bottom 30 % — until the chips' area reaches the coverage. Each
  chip is an angular convex polygon (4–8 vertices, squashed and turned)
  scaled so twice its farthest vertex from its centre is exactly the drawn
  size. Chips are placed largest first at random positions; a position is
  accepted only when a separating axis proves the chip at least the matrix
  gap from every nearby chip (a box grid keeps the search local) and at
  least half a strip plus the gap from every strip. The strips and the
  floor's edge form a planar arrangement whose faces are the zones; the
  zones take two matrix tones by greedy colouring. Large chips sometimes get
  a fine white vein.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  chips_never_overlap_and_never_cross_a_strip`; meta reports how many drawn
  chips found no room. Tested: no two chips intersect, and an independent
  edge-distance check confirms the matrix gap; for every law the placed
  sizes pass a Kolmogorov–Smirnov test against the law's distribution at
  α = 0.001 (and a uniform mix fails against the graded law), with under 5 %
  of drawn chips rejected; every chip lies at least half a strip plus the
  gap from every strip for every divider layout; the zones cover the floor;
  all ink stays on the page.
