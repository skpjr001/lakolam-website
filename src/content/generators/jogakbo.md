---
title: "Jogakbo"
blurb: "Korean patchwork wrapping cloth pieced scrap by scrap along straight seams, as art or a numbered sewing template"
category: design
version: "1.0.0"
---
A Korean patchwork wrapping cloth, pieced scrap by scrap along straight seams — to hang, to colour or to sew.

## What it is

A jogakbo (조각보, "cloth of pieces") is a bojagi — a square wrapping cloth — made
from leftover scraps of silk or ramie. The scraps are not cut to a plan: each one is
sewn to what is already there along one whole edge, so every joint is a straight seam,
and the cloth grows outward until it reaches its size. Sheer cloths show their seams
as fine double lines when held to the light, because the seam allowance is folded and
stitched flat (the *gekki* seam).

This page draws a jogakbo that has been pieced exactly that way. As art it comes in
jewel-coloured silk, in pale ramie whose doubled seams show darker, or as line art to
colour. As a template it lays the pieces out apart, each with its seam allowance and a
number giving the order to sew them in.

## How to use it

- **To colour or display:** colour each patch on its own; neighbouring patches look
  best in different colours. The narrow double lines are the seams.
- **To sew:** use the template page. Enlarge it to the size you want. Cut each piece
  on its solid line; the dashed line inside is the stitching line. Sew the pieces in
  number order: a run of numbers that sits together forms a strip or small block —
  sew those together first, then sew that block on as one piece, always along one
  whole straight edge. Press each seam allowance to one side, fold it under and
  stitch it down to make the flat double-lined gekki seam.

## Purpose

A calm, many-coloured abstract for walls and colouring books, and a working pattern
for a first piece of bojagi patchwork. The piecing order teaches how a jogakbo is
built: outward from one scrap, never by cutting a big shape apart.

## History

Bojagi were used across Korea, by every class, to wrap, carry, store and cover
things, and to honour gifts. Jogakbo, the patchwork kind, were made by women at home
in the Joseon dynasty (1392–1910) from scraps left over from making clothes; the
patchwork was a habit of thrift and a wish for good fortune stitched into the cloth.
They are now prized as textile art for their free, asymmetrical composition, and a
living craft taught and practised in Korea and abroad. The page is a geometric
grammar in the manner of the tradition (straight-seam accretion piecing and gekki
seams); it does not reproduce any particular cloth.

Sources: Huh Dong-hwa, *The Wonder Cloth: Korean Bojagi* (Museum of Korean
Embroidery, 1990); Kumja Paik Kim, *Profusion of Color: Korean Costumes and Wrapping
Cloths of the Chosŏn Dynasty* (Asian Art Museum of San Francisco, 1995); Chunghie
Lee, *Bojagi and Beyond* (2010).

## This implementation

**Spec knobs:** `mode` (art or template); `palette` (auto, silk, ramie, line_art);
`pieces` (8–160, 0 = 40–80 by the seed); `lean` (0 = rectangles only, up to 1 for
strongly slanted seams); `gekki` (draw the double seam); `allowance` (template seam
allowance, points); `stroke`; page `width`, `height`, `margin`.

**Generation:** a unit is a convex quadrilateral. To piece it, a seed patch is set
inside it bounded by four lines, and the line on one side at a time is moved outward
— the band between the old and the new line, bounded by the two neighbouring lines
extended, is the next piece, and it meets the block along one full straight edge. The
last move on each side lands on the unit's own edge. Lines are stored as fractions
along the unit's sides, so every band and every block is a convex quadrilateral by
construction; a side's two ends may move by different amounts (`lean`), giving
trapezoids. The whole cloth is pieced from a central seed; then the largest piece is
itself pieced (mostly as a strip) until the piece count is reached, which makes the
piecing order a tree. Neighbouring patches get different colours. The gekki double
line is each patch's outline moved in by half the seam width, so its two lines come
from the patches on either side and close cleanly at corners. The template spreads
the pieces from the centre until no two cutting outlines touch.

**Solving:** Nothing to solve.

**Guarantees:** the pieces tile the square exactly (areas sum to the square, no two
overlap, every corner inside); every join in the piecing order adds a unit along one
full straight edge of the block — the two share both endpoints of exactly one edge,
lie on opposite sides of it, and make the recorded quadrilateral — and there is one
join fewer than pieces; with `lean` 0 every seam is horizontal or vertical; template
cutting outlines never overlap; all ink is on the page. Tested on many seeds.
