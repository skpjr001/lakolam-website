---
title: "Memphis"
blurb: "Memphis pattern — 80s confetti of squiggles, zigzags, triangles and dots on a seamless repeat tile"
category: design
version: "1.0.0"
---
Eighties Memphis-style confetti: squiggles, zigzags, triangles, dots and
half-circles scattered on a tile that repeats without a seam.

## What it is

A bright, playful pattern of flat shapes tossed across the page like
confetti — wavy squiggles, lightning zigzags, solid, outlined and striped
triangles, rings, half-circles, plus signs, rounded bars, little grids of
dots and scattered spots. No two shapes touch, and the whole design is one
square tile repeated: the shapes running off the right edge come back in on
the left, and those off the bottom come back at the top, so the tiles join
with no visible line.

## How to use it

Use the colour page as wrapping paper, a scrapbook background, a card or a
notebook cover; the tile output is a single repeat to use as digital paper
or a fabric or wallpaper swatch — set it to repeat in any program and the
edges will join. Print the line-art version to colour: the outlined shapes
are for colouring, and the small solid black shapes are already inked.
Memphis colouring works best in a few loud, flat colours — teal, hot pink,
yellow, lilac and black — with each shape in a single colour.

## Purpose

Memphis confetti is a lasting favourite for party, retro and kids' designs,
and making one tile repeat seamlessly by hand is fiddly: every shape that
crosses an edge has to be matched on the other side, and nothing may crowd
its neighbours across the join. Here that is built in, so every page and
every tile is ready to repeat.

## History

The Memphis Group was a collective of designers and architects founded in
Milan in 1981 by Ettore Sottsass, taking its name from a Bob Dylan song.
Members including Michele De Lucchi, Nathalie Du Pasquier, George Sowden,
Martine Bedin and Peter Shire made furniture, ceramics and textiles that
broke with tasteful modernism: clashing colours, plastic laminates,
geometric shapes and loud printed patterns. Du Pasquier's and Sowden's
patterns in particular — squiggles, dashes, dots and triangles — defined
the look, which spread through 1980s graphics, television and fashion and
returned in the 2010s. These pages are original patterns in the Memphis
spirit, not copies of any Memphis design.

## This implementation

- **Spec knobs:** `width`, `height`; `tile` (one repeat, 72–1200 points);
  `output` (page: the tile repeated across the page; tile: one square
  repeat); `density` (0–1); `scale` (shape size, 0.5–2); `mix` (all,
  geometric, wiggly); `palette` (classic, pastel, primary, neon);
  `line_art`; `stroke`.
- **Generation:** shapes are thrown like darts onto the tile treated as a
  torus, in three size classes — big shapes first, then medium, then small
  confetti — each class taking a number of shapes set by `density`, with up
  to 800 throws per class. A throw is kept only if its bounding circle
  clears every circle already placed by the gap (2.5% of the tile),
  measuring distance the short way round the torus, so across the tile's
  edges too; no shape is wider than the tile less the gap, so it also
  clears its own repeats. Each shape is drawn inside its circle at a random
  angle: squiggles are chains of half circles drawn as a band (narrower
  than the arcs' radius, so the outline never folds), zigzags are mitred
  bands, and the rest are triangles (solid, outlined, hatched), circles,
  rings, half-circles, dot grids, plusses, rounded bars and confetti dots.
  The page draws every repeat of every shape whose circle reaches it,
  clipped to the page. Line art outlines each shape in black, inks shapes
  too small to colour solid, draws the shapes half as big again, and grows
  them further if the page would still fail the colouring check
  (`scale_raised`).
- **Solving:** nothing to solve — a design.
- **Guarantees:** the repeat is seamless and no two shapes touch: every
  centre lies inside the tile, every pair of shapes is at least the gap
  apart on the torus, and every shape clears its own repeats — re-checked on
  every page (`verification: seamless_repeat`, `seamless`, `no_overlap`,
  `min_clearance_pt`); a page that failed would not be returned. Tested: a
  brute-force check of every pair over the nine neighbouring repeats; every
  drawn outline lies inside its shape's circle (to the 0.03% a cubic circle
  bulges); a page exactly two tiles wide, rasterised at whole pixels per
  tile, has matching halves pixel for pixel (bar the clipped edge column);
  every shape belongs to the chosen mix; line art is black only and passes
  the adult colourability check.
