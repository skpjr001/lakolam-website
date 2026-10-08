---
title: "Spirolateral"
blurb: "Spirolaterals on square, triangle and hex grids — closure proven, faces coloured by winding"
category: design
version: "1.1.0"
---
Walk 1, 2, 3 … steps, turn, and repeat — until the path comes home.

## What it is

A spirolateral is a figure drawn by a simple rule on a grid of dots: go
forward one step and turn, two steps and turn, three steps and turn, and so
on up to some number, then start the count again at one. Keep going and,
for most choices, the path eventually returns to where it started, facing
the way it started, and the figure is complete. On square dot paper the
turn is a right angle; on triangular dot paper it can be 120° (a triangle
grid) or 60° (a hex grid). Turning the other way at one or two chosen
steps gives a whole new family of shapes. Each page shows several finished
figures with their recipes — `1 TO 7, 90°` or `1 TO 11, 120°, REVERSED AT
5 7` — and the regions they enclose are coloured by how many times the
path winds around them.

## How to use it

Print the colour page as wall art, or use the colouring version: every
region the path encloses is outlined, ready to fill. A good scheme is to
colour by layer — regions the path circles once in a light colour, twice in
a stronger one, and so on — as the colour page does. Each figure also
works as a drawing challenge: take dot or squared paper, follow the recipe
under a figure (one step, turn, two steps, turn …, turning the other way at
any reversed steps) and see whether your path matches. Try changing the
largest number and predicting whether the path will close.

## Purpose

Spirolaterals turn a one-line rule into a surprising picture, and they
carry real mathematics: whether the path closes, and after how many rounds,
depends on the total turn of one round. Classroom favourites for exploring
angle, pattern and proof, they also make striking geometric designs with a
woven, knotted look.

## History

Spirolaterals were introduced by Frank Odds in a short article in the
*Mathematics Teacher* in 1973, and spread through
school maths as a turtle-geometry activity — they suit Logo's turtle, which
draws by "forward" and "turn" — and as a staple of investigative maths on
dot paper. Later writers extended them to other turning angles and to
reversed turns, and Ed Pegg Jr. collected many of their properties.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`, `grid` (square, triangle,
  hex, mixed), `count` (1–12 figures), `order` (0 = seeded 3–12 per
  figure, or a fixed 2–24), `reversals`, `show_grid`, `labels`,
  `palette` (sunset, lagoon, primary, graphite), `line_art`, `stroke`.
- **Generation:** for each figure, eight closing candidates are drawn
  (order, and with `reversals` a seeded set of up to n/3 reversed steps;
  open recipes, duplicates and figures over 40 steps from the start are
  redrawn) and the one enclosing the most faces is kept — on colouring
  pages, preferring one whose smallest face clears the colouring floor at
  its panel's scale. A fixed order that cannot close on its grid is relaxed
  (first by allowing reversals, then to seeded orders; `order_honoured` in
  the metadata). Faces come from a flood fill of the lattice cells (unit
  squares, or unit triangles on the triangular lattice) with the walked
  edges as walls; each bounded face is traced to closed outlines and given
  the winding number of the walk around it. Colour pages fill faces by
  winding on a palette ramp under the walk; line art outlines every face,
  inks solid any face still too small to colour (`inked_small_faces`), and
  draws the walk over them.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. `verification: closure_proven`:
  one round turns the walker by T = (n − 2r)·θ; if T is not a whole turn,
  the figure closes after 360° / gcd(T, 360°) rounds, and if it is, only
  when one round's displacement is zero. Every figure's walk is then
  replayed in exact integer lattice coordinates (Gaussian integers, or
  Eisenstein integers on the triangular lattice) and checked to end at the
  start facing the start after exactly that many rounds and not before.
  Tested: the theory agrees with the walk for every order 2–14 on every
  grid with and without a reversal, and open recipes never return; classic
  cases (1–4 at 90° is open, 1–3 at 90° closes in 4 rounds, 1–3 at 120° is
  open); the faces' areas weighted by winding equal the walk's signed area;
  line art passes the adult colourability check.
- **Version 1.1.0:** lattice dots stay inside their panel. On a skewed
  (60°) lattice the dot range was the bounding box of the index range's
  corners, which is wider than the figure, so dots could run into the next
  panel or, on an edge panel, 14 pt off the page. Pages whose dots already
  stayed in their panels are byte-identical to 1.0.0; the default page
  changes.
