---
title: "Gothic Tracery"
blurb: "Gothic window tracery — pointed arches, sub-lancets, tangent oculi and foils, in glass or line art"
category: design
version: "1.0.0"
---
A Gothic window drawn with compass and straightedge: a pointed arch, lancets
inside it, a round window between their heads and a foil inside that, in
jewel-coloured glass or as line art to colour.

## What it is

Tracery is the stonework that holds the glass in a Gothic window. A tall
pointed arch is divided by slender stone bars (mullions) into narrow lights,
and the space under the arch's point is filled with openings of its own:
circles, trefoils, quatrefoils and the curved pieces between them. Every
shape was set out with a pair of compasses on the tracing floor, and every
curve on this page is a true arc of a circle struck the same way.

Five kinds of window are drawn:

- **Geometric** — the arch splits into two smaller arches with a circle
  (an oculus) between their heads, touching both of them and the great arch
  above. The circle holds a foil. Then each smaller arch splits the same
  way, and again: two, four or eight lights.
- **Y-tracery** — the mullions fork at the springing, their branches running
  up to the arch like the arms of a Y.
- **Intersecting** — every mullion branches into two arcs that cross one
  another, making a lattice of pointed lozenges in the head.
- **Reticulated** — a net of S-curved (ogee) shapes, like stacked onion
  domes, over lights with ogee heads.
- **Perpendicular** — mullions run straight up to the arch, crossed by a
  transom into tiers of small arched panels.

The arch can be equilateral (the classic Gothic point), a tall lancet or a
broad drop arch, and the page can hold one window or a group of up to four.

## How to use it

The glass version is ready to frame or print as a card: jewel colours in a
pale stone frame, the big lights leaded in diamond quarries. For colouring,
choose the line-art version. Every piece of glass is its own closed shape,
and the stone around them is one continuous frame, so you can colour the
glass and leave the stone white, or colour the stone too. Matching pieces on
the left and right are mirror images, which makes it easy to keep a window
symmetrical: deep blues and reds for the lights, gold or green for the foils,
and a lighter colour for the little pieces between.

## Purpose

A companion to the stained-glass rose window: the other great window of the
cathedrals, built the way the masons built it. Every window is different —
proportions, foils, how far the pattern divides — yet every one is sound:
circles really touch where they should, every bar has thickness, and no
piece of glass is too small to colour.

## History

Tracery began in France around 1200, when builders at Reims cut large
openings straight through the stone above paired windows instead of
leaving a solid wall with small holes ("plate tracery"). The new "bar
tracery" of thin stone ribs spread across Europe. In England the styles
follow one another closely: the Y and intersecting tracery of around
1300, the Geometric windows of circles and foils (Westminster Abbey,
Lincoln), the flowing ogee nets of the Decorated period (reticulated
tracery, Wells and Exeter), and the straight mullions and panels of the
Perpendicular style, which lasted from the later 1300s into the 1500s.
Masons laid out their designs full size on tracing floors of plaster —
two survive, at York and at Wells — using only compasses, a straightedge
and the rules of geometry.

## This implementation

- **Spec knobs:** `variant` (geometric, y_tracery, intersecting,
  reticulated, perpendicular, or mixed — chosen by the seed, per window),
  `arch` (equilateral, lancet, drop), `depth` (1–3: how often the
  geometric construction recurses; for the other schemes it adds lights),
  `lights` (2–6 for the non-geometric schemes; 0 chooses from the depth),
  `foil` (mixed, trefoil, quatrefoil, cinquefoil, sexfoil, rosette),
  `cusps` (cusp the heads of the lights), `windows` (1–4 side by side),
  `bar` (tracery bar width; each level of recursion is 0.78 as thick),
  `frame` (stone frame width), `stroke`, `coloring` (glass or lineart),
  `width`, `height`.
- **Generation:** an arch is two arcs struck from centres on the springing
  line: radius equal to the span for the equilateral arch, 1.45 spans for
  the lancet, 0.72 for the drop arch. Geometric tracery halves the light into
  two arches of the same proportion and places the oculus by a closed
  form: with its centre on the axis at height t, tangency to the great
  arch's arcs and to the halves' inner arcs gives a² + t² = (R − ρ)² and
  b² + t² = (r + ρ)², so ρ = (R² − r² − a² + b²) / 2(R + r). An oculus is
  kept only where it touches the halves' arcs below their points. Foils are
  n overlapping lobes reaching the ring and meeting in cusps; a rosette is
  n circles tangent to each other and to the ring (as many as stay big
  enough to glaze). Foil choices are made once per level, so a window is
  mirror-symmetric. Cusped heads are two lobes tangent to the jambs and an
  upper lobe through the cusps, large enough that the light keeps its
  point; the pockets between them and the arch are stone. Intersecting
  tracery adds, at every mullion, two arcs of the main arch's radius.
  Reticulated tracery tiles the head with ogee meshes, each side an S of
  two arcs meeting tangentially, sharing their sides with the lights'
  ogee heads. Perpendicular tracery stacks a transom, a tier of arched
  panels and a top tier cut by the arch. Each bar line is an exact outline
  of segments and arcs. The glass is computed, not drawn: every face of the
  construction is found by sampling (on a grid mirrored about the window's
  axis) which outlines a point lies inside, and its pane is the exact
  intersection of those outlines moved in by half their bar width and the
  complements of the others moved out — segments shifted, arcs re-radiused
  about their own centres, sharp corners re-found where the moved
  neighbours meet and opened corners closed with round joins. The boundary
  is split wherever two outlines cross, kept where it lies inside every
  other term, and chained into closed loops. Faces under 420 square points
  become stone. Narrow windows in a group are made taller, with lighter
  stonework.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. Every oculus is tangent to both
  arcs of its arch and to the inner arcs of both halves (to 1e-9 of the
  span, tested), touching them below their points; every foil lobe reaches
  its ring exactly, and rosette circles touch their neighbours. Every pane
  is a closed outline lying inside the opening, at least 420 square points
  (about 54 mm²); no two panes overlap, and any two are separated by at
  least two half-bars of stone (tested on every variant). Single windows
  are mirror-symmetric pane for pane. Line-art pages pass the colourability
  check (regions of at least 40 mm², strokes of at least 0.75 pt, ink
  under 55%). Meta reports the schemes, depth, lights, oculi, foils,
  `panes`, `smallest_pane`, `stone_faces`, `all_panes_closed` and
  `colorable`. A page builds in well under a second.
