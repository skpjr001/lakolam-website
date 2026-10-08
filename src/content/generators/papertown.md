---
title: "Paper town"
blurb: "Paper town — fold-up cottages, shops, barns, churches and lighthouses at OO, HO or N scale or as village ornaments, every net fold-checked closed and every tab paired with its edge"
category: design
version: "1.0.0"
---
Fold-up paper buildings — cottages, shops, barns, a church and a
lighthouse — for a model railway or a Christmas village.

## What it is

A sheet of cut-out parts that fold and glue into a small building. There
are eight buildings:

- a **cottage** under a gable roof, with its door in the middle;
- a **hipped house**, its roof sloping down on all four sides;
- a **saltbox**, two floors at the front and a long roof sweeping down to
  one floor at the back;
- a **terrace** of three houses under one roof, each in its own colour;
- a **shop** with its gable to the street, a shop window, a striped awning
  and a sign;
- a **barn** under a gambrel roof, with big cross-braced doors and a hayloft
  door;
- a **church**, a nave with tall arched windows and a separate tower with a
  belfry, a clock and a spire;
- a **lighthouse**, an eight-sided striped tower with its lantern and cap.

Each comes at a real model-railway scale — OO (1:76.2), HO (1:87) or N
(1:148) — or as a village ornament about 9 cm long that fits on one sheet,
with a hole in the base for a battery tealight when the base is big enough.
The walls carry brick, clapboard, stone, plaster or half-timbering, the
roofs tiles, slates, shingles or thatch, in colour or as line art to colour
in. A small picture shows the building as it will look when built.

## How to use it

1. Print at 100 % ("actual size"), not "fit to page", on thin card. The
   box in the corner is 1 cm wide; check it with a ruler. A model-railway
   building may need more than one sheet: print every page.
2. Cut along the solid lines. For an ornament, cut out the circle in the
   base too.
3. Score and fold back along every dashed line, so the printed side stays
   outside. Grey glue tabs fold in behind.
4. Every tab has a letter. Glue it under the edge marked with the same
   letter in a circle. Start with the walls round the base, then add the
   ends, and put the roof on last.
5. A church is two models: build the nave and the tower, then glue the
   tower against the far end of the nave.

## Purpose

Card buildings are the cheapest way to fill a model railway layout, and a
row of lit paper houses is a favourite Christmas decoration. Both only work
if the parts really fit: a roof a millimetre short leaves a gap, and a tab
on the wrong edge cannot be glued. Here every net is folded and checked
before it is printed, and every tab is matched to the edge it goes under.

## History

Printed card models go back to the paper toy theatres and cut-out sheets
(Ausschneidebogen) of 19th-century Europe. In Britain, Builder Plus and
Superquick sold printed card kits for railway modellers from the 1950s,
and German and Danish publishers printed whole towns. Christmas villages of
small lit houses grew out of the German nativity scene (Putz) tradition and
became popular in North America in the twentieth century, first in card
and later in ceramic.

## This implementation

- **Spec knobs:** `kind` (`cottage`, `hipped`, `saltbox`, `terrace`,
  `shop`, `barn`, `church`, `lighthouse`); `scale` (`ornament`, `oo`, `ho`,
  `n`); `look` (`colour`, `outline`); `storeys` (1–3, 0 lets the seed
  choose one or two; it sets the wall height); `tab_mm` (3–12); `labels`
  (title, steps and seam letters); `index` (which page of a set); `page`,
  `landscape`; `margin` (inches).
- **Generation:** each building is one or two convex solids — a prism
  under a gable, saltbox or gambrel profile, a box under a hipped roof, a
  tapered eight-sided tower under a pointed cap, or a square tower under a
  spire — with seeded proportions in metres. Every face is laid flat in its
  own plane and unfolded along a hinge tree: the long walls on the base,
  the ends, the roof and (for towers) the base and cap as separate parts
  cut from it, so the parts pack tightly. The seams the fold leaves open
  each get one glue tab, preferring the wall side of a wall-to-roof seam,
  with steeper shoulders or a narrower tab where a full one would overlap
  the net. Parts are packed at 100 % onto the page; if a part cannot fit at
  the scale asked for, the next smaller scale is used and the meta records
  `requested_scale`. An ornament is scaled so its longest side is about
  9 cm, smaller until it fits one sheet. Out-of-range numbers are clamped
  and recorded as `requested_*`; an `index` past the last page wraps round
  and is recorded too. The seed picks proportions, colours, textures, a
  shop's sign and a lighthouse's stripes.
- **Solving:** nothing to solve.
- **Guarantees:** `fold_checked`, re-checked from the finished model. Each
  solid's whole net (cut hinges included) is folded in 3D hinge by hinge —
  the mirror image of folding the printed side outward, so it proves the
  same thing — and closes into a convex solid with every edge met by
  exactly one other edge, Euler characteristic 2 and the volume of the
  solid's own formula. Every seam the fold meets has exactly one glue tab,
  on that seam's edge and the same length as the edge it is glued under.
  Within a part no face or tab overlaps another. Every window and door lies
  inside its wall at least 0.5 mm from its edges, and a tealight hole
  stays 2 mm inside the base. Every part lies inside the page at 100 %, and
  no two overlap. The tests re-derive the seams from the printed parts
  alone, check Euler's formula, and check that the folded solid is
  congruent to the building.
