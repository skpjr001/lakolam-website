---
title: "Cityscape"
blurb: "Cityscape — layered skylines of towers, domes and brownstones, with reflections"
category: design
version: "1.0.0"
---
A city skyline in layers: towers and spires behind, art-deco crowns and
domes in the middle, a row of brownstones in front, all reflected in the
water below.

## What it is

A skyline drawn the way an illustrator builds one, in two to four layers.
The far towers rise behind, the middle layer steps in front of them, and
the street row stands nearest. Each building is made of simple parts: tiers
that step back as they rise, a roof (a spire, a stepped crown, a dome on
a drum, a penthouse with an antenna, a slanted top, chimneys and rooftop
water tanks), and a facade of window grids, tall slots between piers,
ribbon windows, cornices and front doors. Nearer buildings hide the ones
behind them. Below the skyline lies either a street or still water that
mirrors the city, and the sky can hold a sun or moon, clouds, birds and,
at night, stars.

Four architectures: **mixed** (towers behind, art deco in the middle,
brownstones in front), **art deco**, **brownstone** and **skyscraper**.
Four looks: **dusk**, **night**, **day** and **line art**.

## How to use it

Print the colour pages as posters or nursery art. Pin up a dusk, a night
and a day version of the same city to see it through the day. The
line-art version is a colouring page. Every building, window, door, cloud
and reflection is its own closed space. Try colouring the far layer
lightest and the near layer darkest, so the city gains depth. Or light up
a few windows in yellow and leave the rest dark for a night scene, then
copy them into the water below.

## Purpose

Skylines are one of the most popular subjects for colouring books and
wall art, and one of the most tedious to draw. The overlapping layers need
every hidden line removed, and a stray line leaves a region that cannot
be coloured. Generated as exact shapes, every page gives a new city with
clean overlaps and a matching reflection.

## History

City skylines became a subject in their own right with the skyscraper
age. The setback towers of 1920s and 30s New York, shaped by the 1916
zoning law, gave art deco its wedding-cake crowns and spires. Hugh
Ferriss's drawings of them are classics of the genre. Layered skyline
silhouettes, with paler shapes behind, use the old painter's device of
aerial perspective. Brownstone rows, with their cornices and stoops, and
the wooden water tanks on their roofs are as much a part of the picture.

## This implementation

- **Spec knobs:** `architecture` (`mixed` default, `art_deco`,
  `brownstone`, `skyscraper`), `layers` (2-4, default 3), `reflection`
  (water, default on; off gives a street), `sky` (sun or moon, clouds,
  birds, stars at night), `look` (`dusk` default, `night`, `day`,
  `line_art`), `width`, `height`, `margin`, `line`.
- **Generation:** each layer is filled left to right with seeded buildings
  from the architecture's pool for that depth. Far layers are taller and
  finer, the street row lower with doors, towers overlap in a seeded order,
  and row houses stand side by side with the odd alley. A building is a
  stack of tiers plus roof parts, and its silhouette is a piecewise-linear
  function of x standing on the shared ground line. Occlusion runs front
  to back. What stands in front of a building is the pointwise minimum of
  the nearer silhouettes, computed with exact crossing points. What shows
  is the region between the building's silhouette and that envelope,
  traced as x-monotone simple polygons. Windows, cornices, lines, the sun
  and clouds are clipped against the same envelopes. The reflection is
  each visible region mirrored in the ground line and cut at the bottom of
  the frame, plus every reflected window that fits whole.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and seeds differ. The
  occlusion agrees with an independent painter's model (the last-drawn
  building whose silhouette covers a point) at more than 99% of random
  probes. The rest are slivers dropped under the colouring floor, and no
  probe lies in two building pieces. Every piece is a simple polygon of at
  least 325 square points, just over the 40 square millimetre adult floor;
  smaller slivers are dropped and handed to whatever stands behind, so
  nothing leaves a hole. Facade pieces lie on their own building's visible
  region, and reflections lie in the water and mirror the street row.
  Line-art pages pass the adult colourability check for every architecture
  across seeds. Every layer count and option generates in well under a
  second.
- **Caveats:** buildings are stylised, not real places. Shapes are
  polygons (domes and arches are fine polylines). The water tank stands on
  a shaded panel, not open legs, because a silhouette here is a function
  of x and cannot have holes.
