---
title: "Turing Patterns"
blurb: "Turing patterns — reaction-diffusion spots, stripes and mazes, and animal coats: jaguar, leopard, giraffe, cheetah, zebra"
category: design
version: "1.1.0"
---
The spots, stripes and mazes that two reacting, diffusing chemicals draw all
by themselves — traced into clean contour lines.

## What it is

Alan Turing's morphogenesis: one substance activates a reaction, another
inhibits it, and because they spread at different speeds the mixture settles
into a standing pattern — leopard spots, zebra stripes, coral labyrinths,
fingerprint whorls. This runs that reaction and outlines the boundary between
high and low concentration.

## What to do with it

There is nothing to solve. It is a design — a distinctly organic art print, and
an intricate colouring page whose channels take colour beautifully. It can also
grow an animal's coat — jaguar or leopard rosettes, giraffe patches, cheetah
spots or zebra stripes — in fur colours, optionally cut into the shape of a
hide.

## Purpose

The most lifelike texture in the design lane, and the one true simulation
here: not the geometric partitions of `voronoi` or the contour *heights* of
`contour`, but emergent biological pattern, rendered as honest vector line-work
via marching squares.

## History

Alan Turing's 1952 paper *The Chemical Basis of Morphogenesis* proposed
reaction-diffusion as the origin of biological pattern; the Gray-Scott model
(1983) is the version used here, beloved by the generative-art community
(Karl Sims, Nervous System) for its endless variety.

## This implementation

- **Spec knobs:** `grid` (simulation resolution, 60–160), `pattern`
  (spots / stripes / maze / mitosis; empty picks per seed), `steps`
  (1000–6000), `size`, `line`, `coat` (none — the default, line-work of
  `pattern` — or jaguar / leopard / giraffe / cheetah / zebra; a coat
  replaces `pattern`), `swatch` (clip the page into a hide-shaped outline).
- **Generation:** the Gray-Scott equations are integrated on a toroidal grid
  from seeded starter patches; the resulting inhibitor field is thresholded and
  traced by marching squares into vector contour segments.
- **Coats** are pigment fields grown in the regime that gives each animal's
  markings. *Cheetah:* the spot regime with diffusion scaled down, from
  dense starters — many small solid spots. *Leopard and jaguar:* a two-stage
  process after Liu, Liaw and Maini (2006): stage one grows large spots on a
  coarse grid; stage two grows a fine labyrinth, and the markings are the
  fuzzy intersection of that labyrinth with a band round the edge of each
  stage-one spot, so each band breaks into the arcs of a rosette; the
  rosette's middle is tinted, and the jaguar also takes dots in the core from
  a third, fine spot field. *Giraffe:* stage-one spots are patch centres;
  every point's exact distance to the boundary with the next-nearest centre,
  (d₂² − d₁²) / 2|c₂ − c₁|, gives Voronoi patches set back by half a gap,
  roughened by a fine labyrinth and rounded by a light blur. *Zebra:* the
  stripe regime with an anisotropic diffusion tensor, nine times faster
  along a direction field that stands upright at the shoulder and sweeps
  back towards the haunch, so the labyrinth lines up into stripes that still
  fork and end. Coat fields are traced by an *oriented* marching squares
  (dark always on one side, saddles resolved by the cell average), chained
  into closed loops through the grid edges they cross — so holes wind
  opposite to outlines and fill correctly with the nonzero rule; specks
  under four square cells are dropped. `swatch` clips the page (coat or line
  work) into a symmetric stretched-hide outline and draws the outline.
- **Guarantees:** deterministic per seed (the simulation uses no wall-clock,
  only the seed); the output is vector line-work whose closed contours are
  colourable. A pure design generator — no puzzle, no answer key. Coat pages
  are filled colour (`colorable: false`) and meta records `coat`,
  `markings`, `stage_one_spots`, `tinted_centres`, `dark_share` and
  `loops_closed`; tested: the filled loops paint a grid point exactly when
  the pigment field there is dark (≥ 99.5 % of points, the rest dropped
  specks), zebra stripes vary at least 1.8 times faster across the body than
  along it where they stand upright (cheetah spots stay round), every
  rosette ring breaks into several arcs round a tinted centre, the giraffe's
  pale network is one connected piece, the hide outline is mirror-symmetric,
  and `coat: none` with `swatch` off keeps every earlier page byte-identical.
