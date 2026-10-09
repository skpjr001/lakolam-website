---
title: "Colour Cards"
blurb: "Colouring bookmarks, greeting cards, gift tags, door hangers and postcards cut from a mandala, stained glass or tiling — cut lines inside the margin, folds simulated, every space still colourable after cropping"
category: design
version: "1.0.0"
---
Bookmarks, greeting cards, gift tags, door hangers and postcards to colour
in, cut from a mandala, a stained-glass window or a patterned tiling.

## What it is

A sheet of pieces to colour, cut out and use: four long bookmarks with a
hole for a tassel; a greeting card folded once (its verse printed on the
back of the sheet) or folded twice from one side of the sheet (its verse
already inside); six luggage-label gift tags with lines for To and From;
two door hangers with a hole and slit for the handle; or two postcards with
an address back. Each piece carries part of a design in black outline, cut
off neatly by the piece's edge, and a short message such as Happy Birthday
or Thank You, or no words at all. A coloured version prints the design in
its own colours, ready to use.

## How to use it

Colour the pieces first, then cut along the solid outlines and punch or cut
out the holes; fold along the dashed lines. For the card folded twice, fold
the top half back, then the left half back: the design is on the front, a
small motif on the back and the verse inside. For the card folded once,
print the second page on the back of the sheet (flip on the long edge),
then fold the top half back behind the front. Print postcard backs the same
way. Thin card stock works best; thread a ribbon or tassel through a
bookmark or tag hole, and slip a door hanger over the handle by its slit.

## Purpose

Colouring that becomes something to give or use is a favourite with
seniors' groups, classrooms and families, and colouring bookmarks and cards
are sold widely as printables. Cropping a design to a piece leaves spaces
cut open and slivers too thin to colour; here every cut space is closed by
the edge and every sliver is filled in, so the piece colours as well as
the whole design.

## History

Paper bookmarks became common in the 19th century, when printed cards
replaced ribbons sewn into books. Folded greeting cards spread with the
penny post in the 1840s; Christmas cards date from 1843. Colour-it-yourself
cards and bookmarks grew up alongside the adult colouring boom of the
2010s.

## This implementation

- **Spec knobs:** `product` (bookmark, half-fold card, quarter-fold card,
  gift tag, door hanger, postcard), `source` (auto, mandala, stained glass,
  voronoi, isohedral, tessellation, apollonian, zentangle, girih),
  `message` (auto, none, birthday, thank you, love, friendship,
  congratulations, welcome; a named source or message is reported as
  `requested_source` / `requested_message`), `coloured` and `page`.
- **Generation:** the pieces are laid out on the page with every cut line
  at least a quarter inch inside it. Each piece gets its own seed of the
  source design (cards share one), reduced to black line art, scaled to
  cover its art area (enlarged for the small card-back motif) and cropped
  to the piece; a white mask covers everything outside the pieces. Each
  piece's art area is rasterised with its frame drawn and everything
  outside inked; every closed space whose inscribed circle is under 3 pt
  across is traced back into an outline and filled black.
- **Verification:** `obeys()` checks that every outline, hole and slit is
  inside the page margin and that no pieces overlap. For cards it
  simulates the folds — each panel reflected across each fold, turned
  over, and stacked in layer order — and checks the front is the top
  layer facing out and upright, the back the bottom layer upright when the
  card is turned over, and the verse upright on the side it is printed on
  when the last fold is opened. In line art it rasterises every piece
  afresh and checks no space under 3 pt is left. Tests hand-trace a
  quarter fold and check that wrong plans (a back the wrong way up, a
  verse on the wrong side) fail.
- **Where it lives:** in `lako-catalog`, beside colour by code, because it
  uses other generators' designs.
