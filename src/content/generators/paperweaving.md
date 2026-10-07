---
title: "Paper Weaving"
blurb: "Paper weaving — a slit mat and numbered strips printed so that weaving over and under reveals a picture, a check or a gingham"
category: design
version: "1.1.0"
---
Cut a mat, cut the strips, weave them over and under — and a picture
appears.

## What it is

A paper-weaving craft in two printed pages. The first page is the **mat**:
a sheet with a row of dashed lines to cut into slits, leaving a border all
round, and a small picture of how the finished weave will look. The second
page holds the **strips**, numbered, one for each row of the mat. Every
strip square is either coloured or white with a small dot. Weave the strips
through the slits — coloured squares over the mat, white squares under —
and the colours line up into a woven picture: a fish, a heart, a house; or
a classic two-colour check; or a gingham of stripes. Three weaves are
offered: plain (over one, under one), twill (over two, under two, stepping
one square each row, which makes diagonal lines) and basket (over two,
under two, in pairs of rows).

## How to use it

1. Print both pages, on card or thick paper if you can.
2. **The mat:** cut it out along the solid outline. Fold it in half across
   the dashed lines and snip along each dashed line from the fold, then
   open it out and finish each slit — stop at the border, never cut into
   it.
3. **The strips:** cut each one out along its solid outline. Keep them in
   number order.
4. Take strip 1 and weave it into the top row of the mat (the row marked 1),
   starting from the left edge: wherever the strip square is coloured, the
   strip goes **over** the mat; wherever it is white with a dot, it goes
   **under**.
5. Push the strip up snugly, then weave strip 2 into row 2, and so on.
6. When every strip is in, check the picture against the small preview,
   then glue or tape the strip ends to the border.

Younger children can start with the check or stripes pictures and the plain
weave, with a grown-up cutting the slits. Twill and basket weaves are a
good next step once over-under is easy.

## Purpose

Paper weaving builds fine-motor control (cutting on a line, threading,
holding paper flat), pattern sense and following a sequence. Seeing a
picture appear square by square shows how cloth is made and how pixels
build an image, so it links art, design and technology and early coding
ideas (a picture stored as a grid). It suits ages five and up, and makes a
calm classroom or holiday craft.

## History

Weaving strips of leaf, reed and bark is among the oldest human crafts,
far older than the loom. Paper weaving entered the classroom with Friedrich
Froebel's kindergarten in the nineteenth century: "weaving mats" of
coloured paper, slit by machine, with loose strips to weave in patterns,
were one of his occupations, and they spread across kindergartens in
Europe and America. The plain, twill and basket weaves used here are the
three basic weave structures of textiles.

## This implementation

- **Spec knobs:** `picture` (motif, check, stripes), `weave` (plain, twill,
  basket), `icon` (the motif's picture; none = chosen for the page),
  `columns` (4-16), `strips` (4-16), `colour` (off = greys for
  black-and-white printing), `width`, `height`, `theme` (a seasonal picture
  pack for a chosen motif — `halloween`, `christmas`, `easter`,
  `thanksgiving`, `birthday`, `valentines`, `festivals` — or `none` for the
  classic pictures; the pack's pictures are tried first and a classic motif
  is used only if none traces well at the grid size; ignored when `icon`
  names the motif or the picture is a check or stripes). `icon` also takes
  any seasonal picture ("pumpkin").
- **Generation:** the weave fixes, for every crossing, whether the strip
  lies over the mat. The picture fixes the colour every crossing must show:
  a motif traces an icon's silhouette onto the grid (a square is picture
  when at least five of nine sample points in it fall inside; an icon is
  taken only if its trace covers between 22 % and 70 % of the grid), a
  check is the weave itself in two colours, stripes colour mat columns and
  strips in alternating pairs. Each strip square is then printed with its
  crossing's colour if the strip lies on top there and left white (with a
  dot) if not; each mat square is printed only where the mat lies on top.
  The page shows the mat and a preview; the strips are a second page (a
  cut-out page alongside the design). Squares are the same size on both
  pages, so strips fit the mat.
- **Solving:** nothing to solve — a craft; the checks are the guarantees
  below.
- **Guarantees:** deterministic per seed. Verification `weave_simulated`. The finished weave is simulated
  crossing by crossing — the strip's print where it lies on top, the mat's
  elsewhere — and must equal the printed preview exactly, with no white
  square ever on top; strip squares are printed exactly where the strip
  goes over, so the printed over/under order is the weave's. The weave must
  hold together: every strip and every mat column goes both over and
  under, and no float (a run on top) exceeds three squares — plain floats
  one, twill and basket two. Tests check the printed pages themselves:
  they rasterise the mat, strips and preview, read the colour printed in
  every square, weave them by the printed rule and compare with the
  preview's colours. No printing colour is close enough to white to pass
  for an "under" square.
