---
title: "TSP Art"
blurb: "TSP art — a stippled picture drawn as one continuous line that never crosses itself"
category: design
version: "1.0.0"
---
A shaded picture drawn as one continuous line that visits thousands of dots,
returns to where it started and never crosses itself.

## What it is

Scatter dots over a picture, thick where it is dark and sparse where it is
light, and you have a stipple drawing. Now join every dot with a single
pencil line, without lifting the pencil and without the line ever crossing
itself, and finish where you began. The line wanders like a river maze:
tight and busy in the shadows, loose and open in the light, and from a few
steps back it turns into the picture. The subjects are a lit sphere, a cube,
a full moon with seas and craters, a heart, a star, a crescent moon, your own
word in solid letters, rings, and drifting clouds.

## How to use it

- **The line (the default):** a finished print, and the classic pen-plotter
  or laser-engraver piece. The whole page is one closed stroke, so a plotter
  draws it without lifting the pen. Stand back to see the picture, and step
  close to see the maze.
- **Follow the line:** put a finger anywhere and trace. You will pass every
  part of the picture and come back to your start. It works as a calm,
  meditative tracing page.
- **Dots:** the stipples alone, bigger where the picture is darker. A
  pointillist print, or a page to join up yourself.
- **Words:** choose the glyph subject and type up to six letters or digits;
  they appear as rounded, lit letters on a light plate.
- More dots give a finer, darker, more detailed picture; fewer dots give a
  bolder maze.

## Purpose

Wall art and plotter prints with a story: a picture that is also a
mathematical object, a single loop through every point. It gives a classroom
a way into one of the most famous problems in computer science, the
travelling salesman problem, and it suits laser engraving, pen plotters and
embroidery, where a single unbroken path is exactly what the machine wants.

## History

The travelling salesman problem asks for the shortest round trip through a
set of cities. It was posed in the 1930s, became a benchmark of operations
research, and remains famous for having no known fast exact method. The
local improvements used here are classics: 2-opt (Croes, 1958), which
undoes a crossing by reversing a stretch of the route, and Or-opt (Or,
1976), which moves a short run of stops elsewhere. Adrian Secord's
*Weighted Voronoi Stippling* (2002) showed how to place dots like a
stippling artist. Robert Bosch and Adrian Herman put the two together as
"TSP art" (2004), and Craig Kaplan and Bosch's *TSP Art* (Bridges, 2005)
made it a genre. Bosch's later book *Opt Art* (2019) collects the form.

## This implementation

- **Spec knobs:** `subject` (`auto` | `sphere` | `cube` | `moon` | `heart` |
  `star` | `crescent` | `glyph` | `radial` | `noise`; `auto` lets the seed
  pick among sphere, heart, moon, star, cube and crescent); `text` (glyph
  subject, A–Z and 0–9, up to six; default `LOVE`); `points` (2,000–15,000,
  default 6,000); `iterations` (Lloyd passes, 0–60, default 40); `style`
  (`line` | `dots`); `size` (page side, pt); `stroke` (line width, 0.5–3
  pt); `dot` (largest dot radius, pt).
- **Generation:** each subject is a procedural darkness field on the unit
  square, with no image input. The sphere and moon use Lambert shading of
  their normals, with a seeded light from the upper left or right and a cast
  shadow that touches the sphere. The cube is three isometric faces in three
  tones. The heart, star (both Quilez's exact signed distance functions),
  crescent (difference of discs) and glyph are silhouettes from signed
  distance functions. Each is inflated into a pillow (height
  `√(1 − (1 − t)²)`, `t` = depth over the deepest point) and lit by its
  numerical normal, with a dark rim to hold the outline. Glyph letters are
  the built-in stroke font's centrelines thickened by a distance threshold,
  set on a faint rounded plate so the line can travel between letters.
  Rings are a banded radial gradient, and clouds are domain-warped value
  noise in a disc. The moon adds noise maria and seeded craters. The field
  is sampled on a pixel grid sized for about 16 inked pixels per stipple
  (256–1,100 px a side). Stipples start by rejection sampling, then move by
  weighted Lloyd relaxation (Secord): each point goes to the
  darkness-weighted centroid of its discrete Voronoi cell. A centroidal
  tessellation packs points at density proportional to `ρ^½`, and a line's
  ink grows with the square root of point density. So the weights are
  darkness cubed for the line (squared for dots), and the tones read
  through. Two thirds of the passes run at half resolution. The cells come
  from a bucket-grid nearest-point search on the first pass. After that,
  each pixel is re-tested only against its previous owner and that owner's
  neighbours (the points owning touching pixels). That keeps a pass at a
  handful of distance tests per pixel, about 5× faster than a fresh search.
  The tour starts as a nearest-neighbour route from point 0. It is then
  improved by 2-opt with ten-nearest-neighbour candidate lists and
  don't-look bits, and by Or-opt, which moves runs of 1–3 points to between
  a neighbour and its successor or predecessor in the cheaper orientation.
  The two alternate up to three rounds. A final pass finds every pair of
  crossing edges through a segment grid. It uncrosses each pair by reversing
  the stretch between them, and it repeats until none remain (up to 60
  rounds). Every move strictly shortens the tour, and every stage has a
  fixed move or pass budget, so the output is the same on every machine and
  in WebAssembly. The line is drawn as straight segments and closed. Dots
  are filled circles whose radius grows with the square root of the local
  darkness.
- **Solving:** nothing to solve. This is a design. The tour is a good
  local optimum, not a proven shortest route. Meta reports its length, the
  nearest-neighbour length it started from, and the moves made.
- **Guarantees (tested):** deterministic per seed, and different seeds give
  different pages. The tour visits every stipple exactly once
  (`visits_each_point_once`, a permutation check). The line is one closed
  stroke (`one_line`). It does not cross itself (`crossings`, `non_crossing`).
  The reported count is checked against an independent brute-force test of
  every pair of edges, on every subject, and it is zero. Uncrossing alone
  untangles a deliberately scrambled 400-point tour completely. Local search
  shortens the nearest-neighbour route by more than 10%. Stipples follow
  the darkness: the mean tone under them is more than twice the page's
  mean, and under 1% sit on blank paper. The default page takes about 0.4 s
  in release builds, and 15,000 points take about 1 s.
- **Caveats:** a subject made of separate pieces (a sphere and its shadow,
  letters) is still one line, so it has short bridging strokes where the
  tour hops between pieces. Crossing tests are strict. Two edges that only
  touch or overlap collinearly are not counted, and with floating-point
  stipple positions this does not happen in practice. This is a line-art
  print, not a colouring page, so no colourability claim is made.
