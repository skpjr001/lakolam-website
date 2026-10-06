---
title: "Fractal Bands"
blurb: "Fractal bands — Mandelbrot, Julia, Burning Ship and Newton level sets as fillable loops"
category: design
version: "1.0.0"
---
The Mandelbrot set and its cousins drawn as nested, fillable bands: the
classic fractal poster turned into vector line art.

## What it is

Take a point of the plane, square it and add a constant, and repeat. Some
points stay close forever; the rest fly off to infinity, some at once and
some only after hundreds of steps. The points that never escape form the
famous black shapes: the Mandelbrot set, the Julia sets, the Burning Ship.
The familiar fractal pictures colour every other point by how long it took to
escape. Here those escape times are cut at evenly spaced levels instead, like
the contour lines of a map, so the picture becomes a set of closed rings and
bands. They hug the set more and more tightly the closer they come, and every
one of them is a region to colour.

The Newton fractal works the same way. Newton's method for solving
`z^n − 1 = 0` pulls every starting point towards one of the n answers. The
bands show how quickly each point gets there, and the colours show which
answer it reaches.

## How to use it

- **Colouring page (line art):** colour band by band. Using one colour
  family and stepping from light at the outside to dark near the set (or the
  reverse) gives the classic glowing-halo look. Bright neighbouring bands make
  it psychedelic. The large region in the middle is the set itself: leave it
  white, or fill it with your darkest colour.
- **Art print (palette):** already coloured from a gradient, with the set in
  deep ink. The Newton prints give each answer its own colour, light where
  points arrive quickly and dark along the frontier where they hesitate.
- **Famous views:** the whole set; Seahorse Valley, where curls like
  seahorse tails line the gap between the two largest bulbs; Elephant Valley,
  a parade of trunks on the other side; a double spiral; and a tiny copy of
  the whole set hidden on its needle. The Burning Ship shows its ship, masts
  and all.
- **Kaleidoscope:** the symmetry fold reflects one wedge of the picture round
  the centre, turning any view into a mandala.

## Purpose

Fractal art for colouring books and wall prints. These are real fractal
boundaries computed from their definitions, not traced drawings, and every
page is clean vector line work with no pixels to blur at any print size.

## History

Gaston Julia and Pierre Fatou studied repeated complex functions during the
First World War, with no way to see what they described. Benoit Mandelbrot,
working at IBM with early computer graphics, published the first pictures of
the set that bears his name in 1980. The Mandelbrot set became famous through
the 1985 Scientific American cover and the 1986 book *The Beauty of Fractals*
by Peitgen and Richter, whose escape-time colourings defined the look.
Adrien Douady and John Hubbard named the rabbit and proved the set is
connected. The Burning Ship was described by Michelin and Rossetti in 1992.
Newton's method is from the 1670s, and Arthur Cayley asked in 1879 which root
each starting point reaches. The answer, for three or more roots, is a
fractal.

## This implementation

- **Spec knobs:** `family` (`auto` | `mandelbrot` | `julia` | `burning_ship`
  | `multibrot` | `newton`); `window` (`auto` | `full` | `seahorse_valley` |
  `elephant_valley` | `double_spiral` | `mini_set` | `detail`; a view the
  family does not have falls back to `full`, and `auto` gives the Burning
  Ship its ship); `power` (Multibrot exponent 3–6, Newton degree 3–8; 0 =
  seeded); `bands` (level lines, 3–24, default 12); `max_iter` (0 = suited to
  the view's depth); `symmetry_fold` (2–12, 0 or 1 = off); `style` (`lines` |
  `palette`, default `palette`); `palette` (`auto` | `ember` | `ocean` |
  `aurora` | `candy` | `sepia`); `width`, `height`, `stroke` (pt).
- **Generation:** a seeded plan picks the family, the view (a curated centre
  and span with seeded drift, zoom and rotation) and, for Julia sets, `c`
  from ten famous parameters inside or on the edge of the Mandelbrot set
  (rabbit, basilica, spirals, dragon, cauliflower...), jittered by ±0.004.
  Julia sets and the full Burning Ship are framed by a coarse pass: the
  principal axis of the set's body is turned to the page's long side and its
  extent sets the zoom, and the detail view centres on a seeded edge point.
  The field is sampled on a 480-column grid (about 500 × 700 samples): the
  smooth escape count `n + 1 − log_d(log|z|)` with bailout radius 256, the
  Mandelbrot cardioid and period-2 bulb skipped analytically, and for Newton
  `max_iter − (n + fraction)` with the fraction taken from the last two
  distances to the root. Levels blend even steps in value with even steps in
  rank (equal-area bands) between the 4th and 98.5th percentile (93rd in
  line art, so lines do not crowd into solid ink at the filigree); Newton
  uses even steps. The field is then capped one step above the top level
  (all deeper points merge into one core region), smoothed once with a
  1-2-1 kernel, and clamped by the frame's distance function to sit below
  the lowest level outside the frame. Marching squares
  (`lako_geom::isoline`, exact chaining, saddle-safe) traces each level.
  Chains that touch themselves at a point are split into simple loops,
  loops are simplified (Douglas–Peucker, 0.25 pt), and loops under the
  40 mm² colouring floor are dropped and counted. The band on each loop's
  inside is found by majority vote of grid samples the loop encloses.
  Palette pages paint loops from largest to smallest area, so every point
  shows the band of the innermost loop around it.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and different seeds give
  different pages. Every level line closes (`open_lines: 0`, `all_closed`
  in meta) and stays inside the frame. The band each loop reports inside
  it agrees with the field at its probe sample. Loops of a page never cross.
  A kaleidoscope fold maps every point and its rotation by the wedge angle
  to the same plane point. Line-art pages pass the ADULT colourability gate
  for Mandelbrot, Julia and Newton across seeds. When a page fails, it is
  re-composed with 20% fewer levels, up to three times, and `attempt` says
  how many were needed. Palette pages report `colorable: null`, because a
  print is not a colouring page. Meta also carries the family, view, centre,
  span, rotation, `julia_c`, `levels`, `loops`,
  `dropped_below_area_floor`, `smallest_loop_mm2` and `unprobed` (loops
  whose inside could not be sampled, always 0 in tests). A page takes
  0.1–0.6 s in release builds, up to about 1.2 s when line art needs a
  second attempt.
- **Caveats:** the loops are drawn from a sampled field, so detail finer than
  about one grid cell (about 1.1 pt) is smoothed away. That is the right
  scale for colouring, but it is not a zoom into infinite depth. The
  full-set Burning Ship is a plain blob and best left to the ship view.
