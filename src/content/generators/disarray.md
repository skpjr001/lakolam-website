---
title: "Disarray"
blurb: "Plotter-art compositions in the spirit of Nees and Molnár: squares slipping into disorder, nested squares unsettled"
category: design
version: "1.0.0"
---
Order sliding into disorder — computer-art compositions in the spirit of
Georg Nees and Vera Molnár.

## What it is

A page of squares that cannot quite keep still. In *desordres*, every cell
of a grid holds a set of nested squares whose corners have been nudged off
true — some cells calm, some restless, a ring missing here and there. In
*gravel*, a tall column of squares begins in perfect rows and, row by row,
the squares tilt and slip further out of place, like stones tumbling down a
slope. In *disarray*, a grid of squares is calm around one point and
increasingly unsettled the further you look from it. They are drawn as pen
lines on paper or as flat colour, and each page is a new composition.

## How to use it

Frame the colour version as a print, or use it for a cover, a card or a
poster — the pen-line styles look best printed on cream or white stock. The
colouring version keeps every square apart from every other, so each one is
a clean shape to fill: try colouring by row, so the order at the top and
the scatter at the bottom read even more strongly, or colour nested rings
from dark at the edge to light at the centre.

## Purpose

These pages show the simplest idea in generative art: begin with a strict
order, then let chance into it a little at a time. The tension between the
grid and its disturbance is the whole picture, and it rewards looking
closely at where order gives way.

## History

In the mid-1960s, a handful of artists and mathematicians began making
pictures with computers and pen plotters. Georg Nees, working at Siemens in
Erlangen, showed computer graphics in Stuttgart in 1965 in one of the first
exhibitions of computer art; his *Schotter* ("gravel", 1968) is a column of
twelve by twenty-two squares whose rotation and displacement grow row by
row, and *Cubic Disarray* is a related study of squares falling out of a
grid. Vera Molnár, a Hungarian-born painter in Paris who had worked with a
"machine imaginaire" — systematic rules applied by hand — before she had a
computer, began programming in 1968; her *(Dés)ordres* (1974) fills a grid
with concentric squares whose corners are randomly displaced. These pages
are original compositions made with the same kind of rules, credited to the
tradition; they do not reproduce any of the artists' works.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`, `composition` (desordres,
  gravel, disarray), `cols` and `rows` (0 for the composition's own grid:
  6 × 8, 12 × 22, 11 × 14), `disorder` (0–1.5, 1 is the classic amount),
  `palette` (pens, plotter, primary, pastel — the last two fill shapes),
  `line_art`, `stroke`.
- **Generation:** cells are the largest squares that fit the grid. Gravel
  gives each square an allowance equal to its row's place down the column
  (0 at the top, 1 at the bottom); disarray gives each the distance from a
  seeded focal point over three quarters of the grid's diagonal. A square
  turns by up to allowance × disorder × 45° and moves by up to allowance ×
  disorder × half a cell each way. Desordres cells draw 5–11 nested squares
  (fewer in line art, rings at least 6 pt apart, the smallest at least 24 pt
  across), each corner nudged by up to an amplitude set by the cell's
  allowance — one cell in five is very calm; colour pages leave out about
  one ring in eight, as Molnár did. Line art coarsens the grid until shapes
  clear the colouring floor (`grid_coarsened`) and keeps every shape apart:
  squares are placed in order, and one that would meet an earlier square, a
  later square's home position or the margin has its disorder scaled by 0.7
  until it fits (after twelve tries it goes home, which is always clear);
  nested corners move by less than half the ring spacing and outer corners
  by less than half the space between cells.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. `verification: disorder_bounded`:
  every shape records the rotation and offset it used, and each is checked
  against the bound its row, distance or cell allows. In line art
  `disjoint` is proven by exact segment-intersection and containment tests
  between every pair of nearby shapes (nested squares must not cross their
  neighbours), every shape is a simple quadrilateral, and the page passes
  the adult colourability check. Tested: gravel's top row is untouched and
  the bottom third is far more disturbed than the top third; disorder 0
  gives perfect order; colour gravel does overlap (so the check is not
  vacuous); every knob at its bounds generates.
