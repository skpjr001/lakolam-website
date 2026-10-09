---
title: "Mystery Mosaic"
blurb: "Mystery mosaics — extreme colour by number on fine hexagon, triangle, diamond or square cells hiding a stained-glass, tiling, quilt or rug design; painting every cell by the key reproduces the picture exactly"
category: design
version: "1.0.0"
---
Thousands of tiny numbered cells and a colour key. Colour them all and a
stained-glass window, a painted egg, a quilt or a rug appears.

## What it is

A page tiled edge to edge with small hexagons, triangles, diamonds or
squares — a few hundred for beginners, around four and a half thousand at
the hardest level — each with a small number. The key at the foot of the
page pairs each number with a named pencil colour. Some cells have no
number: they stay white. Nothing on the page hints at the picture; it
emerges only as the colours go in. The answer page shows the finished
mosaic.

## How to use it

Pick a colour from the key and colour every cell with its number, then
move on to the next colour; working one colour at a time is fastest, and
the picture starts to show after a few colours. Leave cells without a
number white. Fine-tipped pencils or felt tips suit the smallest cells; a
magnifier helps at the hardest level. If you are unsure what you are
looking at, step back from the page — mosaics read best from a distance.

## Purpose

Extreme colour by number is a best-selling kind of adult colouring book:
slow, absorbing and rewarding, because the picture is a surprise. This
generator turns Lakolam's colour designs into those pages, at five levels
of fineness, on four cell shapes.

## History

Paint by number kits were launched in 1950 by Dan Robbins and Max Klein's
Palmer Paint Company. Mosaics of small tesserae go back to ancient Greece
and Rome, and needlepoint and cross-stitch charts have long turned
pictures into grids of numbered or symbol cells. "Mystery" colour by
number books, whose picture is hidden in hexagons and triangles, became
popular in the 2010s.

## This implementation

- **Spec knobs:** `source` (auto, stained glass, isohedral tiling, pysanka,
  quilt, rug, bargello), `cells` (hex, triangle, diamond, square),
  `colours` (3–20; 0 = from the difficulty: Kids 6, Easy 8, Medium 12,
  Hard 16, Expert 20), `difficulty` (about 350, 800, 1,600, 2,800 and
  4,500 cells, smallest number 9, 7, 5.5, 4.5 and 4 pt) and `page`.
- **Generation:** the source design is generated through the catalogue
  registry, its captions removed, rasterised and cropped to its content;
  paper of a uniform light colour around it is recognised. Whole cells of
  the chosen shape tile the space that keeps the design's proportions, at
  the level's cell count, made coarser if a number would fall under the
  level's smallest size. Each cell samples the picture at its centre and
  toward each corner; cells mostly on paper stay blank, the others take
  the nearest of 24 named pencil colours (redmean-weighted RGB). The
  palette is cut to the requested size by folding the least-used pencil
  into the nearest remaining one for each of its cells, repeatedly. Key
  entries run darkest first.
- **Verification:** `obeys()` reads every printed number back to its key
  entry and checks that entry's pencil is the quantised picture's colour
  for the cell (kept separately from the printed numbers), that blank
  cells are paper in the picture, that every key colour is used, that the
  number size meets the level's minimum and that every cell lies inside
  the frame. Tests rasterise the answer page and paint each cell by its
  printed number to confirm the key reproduces it exactly, check that the
  cells tile without overlap, and that a wrong number is caught. A design
  without at least two colours is replaced by another. If the picture
  holds fewer colours than asked, the request is reported as
  `requested_colours`; a named source is reported as `requested_source`.
- **Where it lives:** in `lako-catalog`, beside colour by code, because it
  uses other generators' designs.
