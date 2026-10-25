---
title: "Cacti and Succulents"
blurb: "Cacti and succulents in pots — ribbed columns and barrels with staggered areoles and spines, saguaros, prickly pears, echeveria and aeonium rosettes — alone or on a windowsill"
category: design
version: "1.0.0"
---
Ribbed cacti with felted areoles and star-shaped spine clusters, prickly
pears, saguaros and succulent rosettes — potted alone or lined up on a
sunny windowsill.

## What it is

A cactus stem is a ribbed column: the ribs let it swell with water and
shrink again without splitting. Along the crest of every rib sit the
areoles, small felted cushions from which spines and flowers grow, and
the areoles of neighbouring ribs are staggered by half a step so they
interlock. This page grows column and barrel cacti that way, a saguaro
with its upturned arms, a prickly pear of flat pads dotted with tufted
areoles and red fruit, and the rosettes of echeveria and aeonium, whose
leaves unfold one after another at the golden angle. The plants stand in
pots on a windowsill — or, for the saguaro alone, in the desert.

## How to use it

A cheerful print for a kitchen, a classroom or a plant lover. Look at a
barrel cactus: follow one rib from soil to crown and see the areoles
along its edge, then look at the next rib — its areoles sit between. On a
rosette, find the newest leaf at the centre and step outward: each older
leaf is a little longer and lies a little flatter. The black-and-white
version is a page to colour in: try a different flower colour on every
plant.

## Purpose

A design-lane page of potted plants built from their real growth rules:
ribbed cross-sections, areoles on the crests, phyllotactic rosettes.

## History

Cacti are native to the Americas and were brought to Europe in the 16th
century; collectors' windowsills of small cacti and succulents became a
craze in the 1800s and again today. The saguaro (*Carnegiea gigantea*) of
the Sonoran Desert can grow arms after some seventy years. The areole as
the defining organ of the cactus family was described by botanists in the
19th century (see Edward F. Anderson, *The Cactus Family*, 2001). The
golden-angle arrangement of rosette leaves is the same phyllotaxis found
in sunflowers and pine cones (Bravais and Bravais, 1837).

## This implementation

- **Spec knobs:** `kind` (collection, auto, column, barrel, saguaro,
  opuntia, echeveria, aeonium), `pots` (3–6 on the windowsill), `ribs`
  (5–40; empty for the seed's choice), `spines` (auto, none, short, long,
  hooked), `flowers`, `palette` (auto, sunny, mint, dusk, ink), `caption`,
  `width`, `height`, `margin`.
- **Generation:** a stem is a tube along a centreline (straight for a
  column or barrel; out, round an elbow and up for a saguaro arm) with
  rotation-minimising frames; its cross-section is
  `r(θ) = R(s)(1 + a|cos(n(θ − θ₀)/2)|^p)`, crests at `θ₀ + 2πk/n`.
  Areoles are placed on the crests every `step` along the stem, rib `k`
  shifted by `(k mod 2)·step/2`; with an odd rib count the one pair that
  cannot be staggered is turned to face away from the viewer. Each areole
  carries a felt cushion, a star of radial spines and one to four
  centrals (hooked at the tip on fishhook barrels); flowers open at the
  areoles nearest the crown. Prickly-pear pads are obovate lenses that
  branch from their parents' rims, with a diamond lattice of tufted
  areoles. Rosette leaf `k` turns `k` golden angles, with length falling
  and tilt rising towards the centre; leaves are spatulate with a short
  point. Everything is a mesh seen through an orthographic camera and
  painted far to near; pots are drawn in layers around the plant so the
  rim hides its base. A collection of four or more stands on a glass shelf
  and the sill.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; every areole lies exactly on a
  rib crest (where the rib factor peaks); areoles on every pair of
  neighbouring ribs that can be seen are offset by exactly half a step;
  rosette leaves are exactly one golden angle apart with length strictly
  falling towards the centre; all ink inside the page; clamped `pots` and
  `ribs` record `requested_<field>`.
