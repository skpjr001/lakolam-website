---
title: "Butterflies and Moths"
blurb: "Butterflies and moths from Nijhout's ground plan — true venation, eyespots and dislocated bands — pinned in a specimen drawer"
category: design
version: "1.0.0"
---
A collector's drawer of butterflies and moths, every wing painted from the
one plan that all their patterns share.

## What it is

Pinned butterflies and moths, each with its family's wing shape, its true
pattern of veins, and wing markings built the way the insects build them.
Six families appear: brush-footed butterflies (fritillaries, admirals,
buckeyes), swallowtails with their tails, whites and sulphurs, small blues,
coppers and hairstreaks, hawk moths with long narrow forewings, and broad
silk moths with eyespots in the middle of each wing. A page is a drawer of
specimens with label cards, or one large specimen.

Look closely and the same parts recur on every wing: veins running out from
a central cell to the edge, bands that cross the wing but jump a little at
each vein, rows of eyespots that each sit neatly between two veins, a
darker dusting at the base, a chequered fringe along the outer edge.

## How to use it

- **Frame it.** The colour drawer is made to hang; the slate lining makes a
  darker, museum-like print.
- **Colour it.** The outline version keeps every vein and every band and
  spot as a shape to fill — copy the colour drawer, or invent new species.
- **Spot the plan.** On each butterfly, find the eyespots and count the veins
  either side of one. Follow a band across the wing and see where it steps
  at a vein. Find the same band on a different family.
- **Compare families.** Which wings have tails? Which antennae end in a club,
  a hook or a feather? (Butterflies have clubs; hawk moths have hooks; silk
  moths have feathery combs.)

## Purpose

Butterfly wings look endlessly varied, but they are variations on one
theme. Seeing many families side by side, each drawn from the same parts,
shows that theme — and a drawer of specimens that harms no insect makes a
handsome print and a patient colouring page.

## History

John Henry Comstock and James G. Needham named the wing veins of insects in
the 1890s (Comstock and Needham, "The wings of insects", *American
Naturalist*, 1898–99); their system — subcosta, radius, media, cubitus and
anal veins, with the discal cell between them — is still used. In the
1920s B. N. Schwanwitsch and Fritz Süffert showed independently that
butterfly patterns are made of a few homologous elements repeated in every
wing cell, and H. Frederik Nijhout drew these together as the *nymphalid
ground plan* (Nijhout, *The Development and Evolution of Butterfly Wing
Patterns*, Smithsonian, 1991): basal bands, a central symmetry system around
the discal spot, a border symmetry system of eyespots with parafocal
elements, and marginal bands, each free to shift or vanish independently
from cell to cell. Collectors' drawers of pinned specimens with label
cards are the familiar way natural-history museums store them.

## This implementation

- **Spec knobs:** `family` (`auto` default — a drawer then shows every
  family — `nymphalid`, `swallowtail`, `pierid`, `lycaenid`, `sphinx`,
  `saturniid`), `layout` (`drawer` default, `single`), `specimens` (2–12, in
  a drawer), `eyespots` (`auto` — each form's own — `none`, `border`: a full
  row on every wing), `dislocation` (0–1, default 0.5: how far bands step at
  the veins), `labels`, `backing` (`linen` default, `slate`, `white`),
  `style` (`colour` default, `colouring`), `line` (0.25–3), `width`,
  `height`, `margin`.
- **Generation:** each wing outline is a closed Catmull-Rom curve through a
  family's control points (seeded jitter, a small seeded turn about the wing
  base), sampled densely, scalloped inward between vein tips on the outer
  margin and drawn out into tails (at M3 on swallowtails, CuA2 on
  hairstreaks). Venation has a fixed topology per family (a simplified
  Comstock–Needham table: forewing Sc, R1–R5 or fewer, M1–M3, CuA1–2, anal
  veins; hindwing Sc+R1, Rs, M1–M3, CuA1–2, anal veins), each vein leaving
  the base or the rim of the discal cell, some radial veins on a shared
  stalk, and ending exactly on an outline vertex. Consecutive veins bound
  the wing cells. Every ground-plan element is a field in two cell-local
  coordinates — `u` across the cell (distance to one vein over the sum of
  distances to both) and `ρ`, the fraction of the way from the wing base to
  the margin — shifted per cell by a smoothed seeded walk scaled by
  `dislocation`; its region is the zero contour of
  `min(field, distance inside the cell)` traced by marching squares, so it
  never leaves its cell. Eyespots are concentric circles on a cell's
  midline, their radius capped below the distance to the cell's edge.
  Families have two or three named forms each (e.g. fritillary, admiral,
  buckeye), picked by the seed. The left half is the exact reflection of
  the right; the body (segmented abdomen, thorax, head and eyes) is built
  symmetric point for point.
- **Solving:** Nothing to solve.
- **Guarantees:** every specimen is its own exact mirror image (bit-equal
  reflected coordinates, tested over every family, form and eyespot
  setting); every eyespot lies wholly inside one wing cell (its centre is
  farther from the cell's edge than its radius, and its rim is in no other
  cell); vein counts match the family table and every vein ends on the
  margin; cells tile the wing; deterministic per seed; ink inside the page.
  `verification: mirror_exact_eyespots_inside_cells`. Clamped `specimens`,
  `dislocation` and `line` are reported as `requested_*`. Vein tables and
  colour forms are simplified illustrations, not species identifications.
