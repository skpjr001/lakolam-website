---
title: "Isometric Blocks"
blurb: "Isometric blocks — seeded stairs, towers, cities, pyramids and fractals, impossible figures and tumbling blocks"
category: design
version: "1.0.0"
---
Stacks of cubes seen at the classic isometric angle: stairs, towers, little
cities, pyramids and fractal sponges, plus impossible figures and the
tumbling-blocks quilt pattern.

## What it is

Pictures built from identical cubes, each drawn with a light top, a mid-tone
left side and a dark right side, so the stack reads as solid. Nine kinds of
page:

- **Stairs**: a straight flight, a ridge that climbs and falls, or a
  climb to a landing and back down round a corner.
- **Towers**: a square plot of columns of different heights.
- **City**: a skyline grown by a wandering walk; the streets it keeps
  coming back to rise into towers.
- **Pyramid**: a stepped pyramid, sometimes with a temple on top.
- **Fractal**: a Menger sponge, Cantor dust or a Sierpiński pyramid of
  cubes.
- **Penrose triangle**: three bars at right angles that join up in a loop
  that cannot exist.
- **Impossible staircase**: a square walkway of two flights of steps and
  two level landings. Walk round it and you only ever climb, yet you end
  where you began.
- **Impossible trident**: three prongs at one end, two bars at the other,
  and no place where one becomes the other.
- **Tumbling blocks**: the quilt pattern of cubes packed edge to edge, each
  in its own fabric colours.

Each can be drawn in tones, as an engraving (blank tops, hatched sides,
solid shadows), or as line art for colouring.

## How to use it

Colour the line art with three pencils, light, medium and dark, always the
same way round, and the cubes jump off the page. The impossible figures are
good puzzles to look at: trace the Penrose triangle's edges with a finger
and try to find where it goes wrong. Tumbling blocks is a classic
patchwork design: use the page as a colour plan, or with line art as a
template for English paper piecing. The tone pages make clean
architectural prints.

## Purpose

Isometric drawing is the stuff of building toys, video games and maths
dot paper, and impossible figures are among the best-loved optical
illusions. A cube in isometric view is made of exactly six triangles of a
triangular grid. That lets every page be drawn exactly, with hidden faces
removed by bookkeeping rather than geometry, so each region is a clean
polygon ready to colour.

## History

Isometric projection was formalised by William Farish in 1822 for
engineering drawing. Oscar Reutersvärd drew the first impossible triangle of
cubes in 1934, and Lionel and Roger Penrose published the impossible
triangle and impossible staircase in 1958. M. C. Escher built *Waterfall*
and *Ascending and Descending* on them. The impossible trident ("blivet")
circulated in 1964 as a puzzle in *Mad* magazine and engineering journals.
Tumbling blocks (also "baby blocks") is a nineteenth-century American quilt
pattern, and the Menger sponge was described by Karl Menger in 1926.

## This implementation

- **Spec knobs:** `structure` (`city` default, `stairs`, `towers`,
  `pyramid`, `fractal`, `penrose_triangle`, `impossible_stairs`, `trident`,
  `tumbling`), `size` (cubes per side, fractal level 1–3 or chain length;
  0 = a good default), `shading` (`tones`, `hatched`, `line_art`),
  `palette` (`stone`, `sand`, `ocean`, `forest`, `candy`), `surfaces`
  (merge each flat surface into one region instead of showing every cube),
  `stroke`, `cell` (tumbling blocks' cube edge), `width`, `height`,
  `margin`.
- **Generation:** a voxel's corner `(x, y, z)` lands on lattice point
  `(x − z, y − z)` of a triangular lattice, so each visible face (+x, +y,
  top) is exactly two lattice triangles. Voxels are painted far to near by
  `x + y + z` into a map from triangle to face. Voxels of equal depth never
  share a triangle, so the order is exact. Faces hidden by a neighbouring
  voxel are skipped. The triangles each face key still owns (one key per
  cube face, or per plane with `surfaces`) are split into edge-connected
  regions and traced into boundary loops: outer boundaries one way, holes
  the other, and at a pinch point the walk takes the sharpest left turn so
  every loop is simple. Lines are the lattice edges with different regions
  on either side, joined into straight runs. Impossible figures use the
  view direction: points differing by `(1, 1, 1)` coincide on the page. The
  Penrose triangle is a chain of x, y and z bars ending one step short of
  `(n, n, n)`. The staircase is a chain of two level landings of `m` treads
  (along +x and +y) and two flights of `s` treads (along −x and −y), every
  flight tread but the corner one a step up, with `m − s` even and the climb
  `k = m − s` in all. Treads are two cubes wide and two deep. Climbing goes
  on the −x and −y flights because only there do the risers face the
  viewer: a flight climbing along +x or +y hides its risers and reads as
  going down. There is no way round this in isometric view. A loop that
  climbs on all four sides has no visible risers on two of them. In both, the painting inside the
  start's hexagons is taken from a painting that leaves out the chain's
  last cubes (the corner-overlap trick). The trident paints two tall bars
  and three raised prongs whose edge lines coincide (cross-sections
  differing by `(0, 1, 1)`), shows the bars on one side of a seam across
  the strip and the prongs on the other, and does not draw the seam.
  Tumbling blocks centre cubes on `x + y ≡ 0 (mod 3)`, which gives every
  lattice triangle exactly one cube.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and seeds differ.
  Hidden-face removal is exact. An independent check finds, for every
  triangle, the cubes whose silhouettes cover it and confirms the owner is
  the nearest. Every covered triangle is owned, and no two cubes of equal
  depth overlap. Every traced loop is simple, and the loops' signed areas
  add up to the region's triangle count. Merged surfaces give far fewer
  regions. The Penrose triangle's override stays inside the start's
  hexagon and every cube shows. The staircase chain (long flights 9 to 24)
  is face to face, never steps down, climbs exactly `k` with every riser
  facing the viewer, ends one step from `(k, k, k)` (the start's twin on
  the page), shows every step, and shows each tread's top at its own
  height, apart from the closing treads the corner covers on purpose. The trident shows seven long
  lines along the prongs and five along the bars, the bars' lines among the
  prongs'. Tumbling blocks cover the plane with three faces per cube.
  Line-art pages of pyramids, stairs and the Penrose triangle (surfaces
  merged) pass the adult colourability gate. Meta reports voxels, visible
  triangles, regions, the cube edge and `smallest_region_mm2`.
- **Caveats:** line-art pages with every cube edge drawn (`surfaces` off)
  can have regions below the adult colouring floor on large structures.
  `colorable` reports it. The trident's tones change across the seam,
  because no consistent shading exists. Its line art is the true illusion.
