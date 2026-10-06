---
title: "Substrate"
blurb: "Substrate — cracks that grow and branch at right angles until they meet, drawn as a city map, Mondrian, stained glass or blocks to colour"
category: design
version: "1.0.0"
---
Cracks that grow across the page, branch off at right angles and stop where
they meet, until the page looks like the street plan of a city that grew on
its own.

## What it is

A few long cracks start somewhere on the page and run in both directions
until they hit the edge. Then, again and again, a new crack starts from a
random point on an old one, sets off at a right angle (or nearly), and grows
until it runs into another crack or the edge. Early cracks are long and cross
the whole page like avenues; later ones are shorter and shorter, like side
streets and lanes. Every junction is a T, and the spaces left between the
cracks are blocks. Cracks can run straight or bend in gentle arcs.

Four looks: a street map (cased roads over blocks, parks and ponds, the
oldest cracks as main roads), a Mondrian (heavy black lines, white blocks and
a few red, blue, yellow and black ones), stained glass (bright panes in dark
lead, touching panes always different), and line art to colour.

## How to use it

The map and Mondrian looks make striking prints and covers; the curved
version looks like an old town grown around a hill. As a colouring page,
every block is a closed shape big enough to fill, and the thick lines show
which cracks came first. Try colouring it as a map: green parks, blue ponds,
warm roofs. Or colour it as a Mondrian with only three colours and plenty of
white. Or follow the generations: one colour for the blocks along the main
roads, another for the side streets.

## Purpose

A city-map and Mondrian-like design with a recognisable character all its
own. Unlike a subdivision page, where each cut stops inside one box, or an
ice-ray lattice, where straight bars cut convex panes at any angle, these
cracks branch at right angles from points along older cracks, grow until they
collide, and may curve, so the page reads as a street plan grown over time.

## History

Jared Tarbell's *Substrate* (2003), written in Processing, grew cracks on a
computer screen by exactly these rules and became one of the best-known
works of early generative art. Its look echoes real things that crack and
branch: drying mud, glazes and paint, and cities whose streets were laid out
one at a time.

## This implementation

- **Spec knobs:** `seeds` (1-8 seed cracks, default 3), `cracks` (2-400 in
  all, default 110; fewer if the page fills first), `min_gap` (8-120 pt,
  default 16: no block thinner, no junction closer), `curl` (0-1, default 0:
  straight; at 1 a crack may turn on a circle a quarter of the page across),
  `jitter` (0-30 degrees from a right angle at a branch, default 3), `style`
  (`map` default, `mondrian`, `stained`, `line_art`), `stroke` (the finest
  line weight), `width`, `height`, `margin`.
- **Generation:** the map is a set of faces, starting with the frame. A seed
  crack starts at a random interior point of a face (picked by area) at a
  random angle and grows both ways; a spawned crack starts at a random point
  of a crack edge of a face, heading inward at a right angle plus jitter.
  Each crack has a seeded curvature (0 when `curl` is 0) and grows inside its
  face (straight cracks by one exact ray cast, curved ones in 2.5 pt steps)
  until it meets the face's boundary, and the hit point is computed exactly.
  A crack is kept only if it is at least `min_gap` long and does not cross
  itself, every junction and corner of the face stays at least 0.9 `min_gap`
  from it, its run stays that far from the face's sides, it meets its end
  edge at no less than 35 degrees, and both halves are at least
  1.5 `min_gap`² and 42 mm². A kept crack splits its face in two, and the
  junction points are added to the faces on the far side, so the faces are
  always an exact partition of the frame. Older cracks draw wider: seed
  cracks are level 0, their branches level 1, and so on.
- **Solving:** nothing to solve; it is a design.
- **Guarantees (tested):** deterministic per seed, and seeds differ. The
  blocks tile the frame exactly (areas sum to the frame's area, random probes
  lie in exactly one block), every block is a simple polygon above the
  minimum area, and junctions keep their distance. Every crack ends on an
  earlier crack or the frame (T-junctions only, no loose ends), every spawned
  crack starts on its parent within the jitter of a right angle, and no two
  cracks cross. Stained-glass neighbours never share a colour (smallest-last
  greedy colouring). Line-art pages, straight and curved, pass the adult
  colourability check (regions of at least 40 mm², strokes of at least
  0.75 pt, ink under 55%). Four hundred cracks take well under a second.
  Meta reports `tiles_frame`, `smallest_block_mm2`, `generations` and the
  number of rejected attempts.
- **Caveats:** the growth is sequential (one crack at a time) rather than
  Tarbell's simultaneous animation, which makes every collision exact and the
  faces easy to keep; the look is the same family. Tarbell's sand-painted
  colour texture is not reproduced; blocks are flat colours.
