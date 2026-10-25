---
title: "Lippan Mirror Relief"
blurb: "Lippan-style mud-and-mirror relief: white clay ribbons on n-fold stars and lattices, mirrors in the cells"
category: design
version: "1.0.0"
---
White clay ribbons and set mirrors on terracotta, in the manner of the mud-and-mirror work of Kutch.

## What it is

Lippan kaam is relief decoration in clay and mirror from Kutch, in Gujarat. Ribbons of
clay mixed with dung are rolled by hand, pressed onto a wall along a geometric layout,
smoothed and whitewashed, and small pieces of mirror are set into the spaces between
them — round mirrors in round cells, diamonds in rhombic cells, triangles in
triangular ones — so that the walls of a house glitter in lamplight.

This page builds a square lippan-style panel: a central medallion of an eight- or
twelve-pointed star, nested polygons, spokes and zigzag bands between concentric rings,
a diamond lattice in the corners, and a broad border set with a row of small mirrors.
Every ribbon is outlined twice, the way the potter's tool leaves a groove along each
edge. Palettes: white clay on terracotta, on indigo, on maroon, and line art to
colour.

## How to use it

Display it, or colour the line-art version: leave the ribbons white (or cream), fill
the mirrors silver-grey or with metallic pens, and paint the ground between in one
deep colour — terracotta, indigo, maroon or black. It also serves as a full-size
layout for a lippan-style panel on board: trace the ribbon lines, build them up in
air-dry clay, and press mirror pieces into the marked cells.

## Purpose

A sparkling decorative panel and a symmetric, many-celled colouring page, introducing
a living Indian craft.

## History

Lippan kaam ("mud work") belongs to the Kutch region of Gujarat, where it decorates
the inside walls of the round *bhunga* houses. It is practised by women of the Rabari
herding community and by Kumbhar (potter) and Mutwa communities, among others; Rabari
work is known for its mirrors, Kumbhar and Mutwa work for figurative and geometric
relief. Today it is also made on boards for sale and has spread into interior design
across India. This page is a geometric grammar "lippan-style", in the manner of the
tradition, and reproduces no particular work or community's design.

Sources: Judy Frater, *Threads of Identity: Embroidery and Adornment of the Nomadic
Rabaris* (Mapin, 1995); Gujarat State Handicrafts Development Corporation, notes on
Kutch mud and mirror work; Kala Raksha and Khamir (Kutch craft organisations),
craft documentation.

## This implementation

**Spec knobs:** `fold` (the medallion's symmetry, 4–16; 0 = 6, 8 or 12 by the seed);
`bands` (bands between the medallion's rings, 1–5; 0 = 3–4); `corners` (diamond
lattice outside the medallion); `ribbon` (clay ribbon width as a fraction of the
panel); `palette` (auto, terracotta, indigo, maroon, line_art); `stroke`; page
`width`, `height`, `margin`.

**Generation:** the skeleton is a set of centre lines: concentric rings (polygons of
12n sides, so every point a band ties to is a vertex), an {n/k} star in the central
disc, and between each pair of rings a band of radial zigzag (triangles), double
zigzag (diamonds), nested polygon tied back to the inner ring, or spokes — outer
bands at twice the frequency so their cells stay compact. A diagonal lattice fills
the corners, cut exactly at the outer ring. The clay of real width comes from the
bar engine of the ornament toolkit: the frame minus the panes, with clean joins; the
panes are the cells. A pane with three or four corners gets a facet mirror (the pane
inset from the clay and shrunk about its centre); any other gets a round mirror at its
centroid if that lies in it and in no other pane. Round bosses of clay with a mirror
mark the star's points and the centre. Grooves are each pane grown a little into the
clay.

**Solving:** Nothing to solve.

**Guarantees:** the medallion's skeleton has exact n-fold rotational symmetry about the
centre; the corner lattice stays outside it; every cell mirror lies inside its pane
and clear of the clay on every side, and no two mirrors overlap; all ink is on the
page.
