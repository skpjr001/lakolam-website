---
title: "Metamorphosis Tiling"
blurb: "Metamorphosis tiling — square, hexagonal or triangular tiles that bend, step by step across the page, into interlocking creatures"
category: design
version: "1.0.0"
---
A tiling that changes as you read it: plain squares, hexagons or triangles
at one end of the page bend, row by row, into interlocking creature-like
tiles at the other.

## What it is

Every tile on the page fits its neighbours exactly, with no gaps and no
overlaps, yet no two rows are quite alike. At the plain end the tiles are
ordinary polygons: a chessboard of squares, a honeycomb, or a field of
triangles. Moving across the page their sides start to wave, then swell
into bumps and hollows, until each tile has become a knobbly, lively shape
that grips its neighbours like a jigsaw piece. Near the far end the bends
change character again, and the fully grown tiles get an eye each, so the
creatures seem to look back at you. The change can run down the page,
across it, from one corner, or outward from the middle.

## How to use it

Colour it, or frame it as it comes. The colour versions alternate two or
three colours so that no two touching tiles match. The line-art version is
a colouring page: every tile is a closed shape, large enough for coloured
pencils. A good game is to follow one tile from the plain end to the far
end and watch it grow into its creature, or to colour the whole page so the
colours shift slowly along with the shapes. Try designing your own creature:
pick one fully grown tile, give it fins, feathers or a tail inside its
outline, and repeat it on its neighbours.

## Purpose

Tilings that morph are among the most admired pieces of mathematical art,
and hard to draw by hand: every bend in one tile has to be matched exactly
by its neighbour, all across the page. Generated as exact shared edges,
every page tiles perfectly, and every seed gives a new family of creatures.

## History

M. C. Escher's woodcut *Metamorphosis I* (1937) and the four-metre
*Metamorphosis II* (1939-40) turn a chessboard into lizards, a honeycomb
into bees and birds, and back again, and his notebooks worked out how far a
tile's edges can be bent while it still tiles the plane. Heinrich Heesch
classified the edge rules behind such tiles in the 1930s. Craig Kaplan's
work on Escherization and Scott Huff's morphing tessellations brought the
idea to computers and to a new generation of tile artists.

## This implementation

- **Spec knobs:** `lattice` (`square` default, `hex`, `triangle`),
  `direction` (`down` default, `across`, `diagonal`, `outward`), `palette`
  (`earth` default, `sea`, `grey`, `line_art`), `tile` (about how wide a
  tile is, in points; default 64), `strength` (0-1, default 0.85), `eyes`,
  `stroke`, `width`, `height`, `margin`.
- **Generation:** tile corners are lattice points, and each tile side joins
  two lattice points one lattice step apart (two step directions on the
  square lattice, three on the triangular lattice, which carries both the
  triangles and the hexagons; hexagons sit on one coset of three). Every
  side is keyed by its canonical start and direction and computed once: the
  chord displaced along its normal by `amp * length * n(s)`, where `n` is a
  sum of three sines vanishing at both ends, normalised to peak 1. Each
  direction gets two seeded shapes. The edge's position along the morph
  direction sets its amplitude (smoothstep from 8% to 55% of the way) and a
  blend from the first shape to the second (55% to 95%). Both tiles of a
  side walk the same points, one forward and one back. A whole-page check
  then measures every pair of edges with a bucket grid: if any two cross,
  or two come closer than 6% of a tile away from the corners they share,
  the bending is shrunk by 12% and rebuilt (down to none, which always
  passes); `bend_scale` reports the result. The frame starts at a lattice
  corner and, for squares and triangles, holds whole tiles across and whole
  rows down. Eyes go on tiles at least 60% changed, beside the centre,
  where the tile has room. Tiles are coloured by lattice class: a
  chessboard for squares, up and down for triangles, three colours for
  hexagons.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and seeds differ. On
  every lattice, in every direction and at full strength, the tiles match
  edge for edge (each boundary step of one tile inside the frame is taken
  backward by exactly one other tile) and every tile is a simple polygon.
  No two edges on the page cross and none crosses itself, checked brute
  force over every pair. Random points in the frame lie in exactly one
  tile. Tiles at the plain end are exact polygons and tiles at the far end
  are bent by at least 8% of their size. Touching tiles differ in colour.
  Eyes lie inside their tiles, clear of the outline. Line-art pages pass the
  adult colourability check. Generation is well under a second at the
  smallest tile size.
- **Caveats:** the triangle lattice, with six sides meeting at each corner,
  often has to bend less than asked for to keep its gaps open
  (`bend_scale` below 1). Tiles cut by the frame can leave small part-tiles
  along the edges the bending reaches.
