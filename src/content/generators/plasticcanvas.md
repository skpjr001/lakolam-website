---
title: "Plastic Canvas"
blurb: "Plastic-canvas charts — tissue-box covers, coaster sets, baskets and ornaments on 7-, 10- or 14-mesh, with a cutting list, yarn estimate and assembly net; the net is folded in 3D so every seam joins hole for hole"
category: design
version: "1.0.0"
---
Plastic-canvas charts for tissue-box covers, coaster sets, baskets and
ornaments, with a cutting list, yarn estimate and assembly plan whose
seams are proven to meet hole for hole.

## What it is

A complete pattern for a three-dimensional plastic-canvas project on 7-, 10-
or 14-mesh canvas. Each piece has its own chart, one square per stitch,
headed with how many to cut and its size in holes and bars. A tissue-box
cover has a top with a centred opening and four sides. A coaster set has
four coasters and an open holder with a base, front, back and two ends. A
basket has a base and four sides. An ornament is a front and a back in an
octagon, house, long diamond or rectangle. The motifs are stripes, a woven
plaid, bargello-style flames, nested diamonds and eight-pointed stars, each
framed in the edging colour and mirrored about the centre of the piece.

Below the charts, an assembly plan lays the pieces out flat as a net with a
letter on every edge to be joined. A yarn key gives each colour, its stitch
count and an estimate of the yardage, followed by the seam lengths, the
finished size and the canvas and yarn to use.

## How to use it

Count holes, not bars, when you cut: a piece marked 33 × 40 holes has 32 ×
39 bars between them. Cut along the bars, close to the last hole, and trim
the nubs. Where an ornament's outline crosses a square diagonally, cut from
hole to hole across the square.

Work each chart one square at a time. Each coloured square is one stitch
over the square between four holes, slanting from bottom left to top
right in continental stitch, or crossed in cross stitch. Leave the outer
holes free for joining. A square marked CUT OUT is cut away; overcast its
edges when the piece is stitched.

To join the pieces, hold two edges with the same letter together, wrong
sides in, and whipstitch through each pair of holes in the edging colour.
Every pair of edges with the same letter has the same number of holes, so
the corners come out square. Overcast every edge without a letter. For an
ornament, stitch the back like the front, join all the way round, and add
a hanging loop at the top.

## Purpose

A plastic-canvas box only goes together if its pieces agree. If a side is
one bar too tall, a corner seam runs out of holes. If an opening is too
close to the edge, the top tears. A chart can look right and still fold
into a twisted box. Every pattern here is assembled before it is printed:
the flat net is folded in three dimensions, and every lettered seam has to
bring both of its edges onto the same line of holes, running in opposite
directions so the pieces meet face out. Every other edge must be an edge
that is overcast alone, and the finished shape must have the printed size.
The yarn estimate is counted from the stitches on the charts.

## History

Plastic canvas was introduced in the 1970s as a rigid, washable substitute
for the stiffened cotton canvas used in needlepoint. Its grid of holes
takes the same tent, cross and gobelin stitches, and it can be cut and
built into shapes that stand up on their own. By the 1980s it had become
one of the most popular American needlecrafts, with pattern leaflets from
publishers such as The Needlecraft Shop and whole magazines devoted to it.
Boutique tissue-box covers, coaster sets, baskets and holiday ornaments
were the craft's staples, and they remain so, particularly in community
and senior craft groups. The standard mesh is 7 holes to the inch, worked
in worsted yarn. Finer 10-mesh and 14-mesh canvas take sport-weight yarn or
embroidery floss.

## This implementation

- **Spec knobs:** `project` (tissue_box, coaster_set, basket, ornament),
  `mesh` (7, 10 or 14; other values snap to the nearest), `across`
  (1–12 in), `tall` (1–12 in: box or basket sides, half of it for a
  coaster holder's sides, or an ornament's height), `motif` (auto,
  stripes, plaid, flames, diamonds, stars), `colours` (2–5, the last being
  the edging), `stitch` (continental, cross), `palette` (auto, country,
  pastel, jewel, autumn, mono), `width`, `height` (page, 144–3000 pt).
  Sizes become bars as inches × mesh, kept between 8 and 90 bars. An
  ornament's house and long-diamond shapes round the width up to an even
  number of bars and raise the height to fit. A coaster holder's sides are
  no taller than a coaster. Any value changed this way is reported as
  `requested_*`.
- **Generation:** each piece is a convex outline through holes, and every
  square fully inside it (and outside an opening) gets a stitch. Squares
  next to an edge or the opening take the edging colour, and the rest take
  the motif, which depends only on distance from the centre column so
  every chart mirrors. The tissue-box opening is about two fifths of the
  top, centred exactly, with at least two bars of margin all round. Boxes
  are nets of a root (top or base) with four hinged sides. The ornament's
  back hangs from the front's left side. Seams are the hinges, the box
  corners, and the ornament's mirror-image edge pairs. Yarn is estimated
  per square (continental √2 + √5 bars of yarn, cross 2√2 + 2) plus a bar
  and a wrap for each overcast hole (two layers on a seam), with 15% added
  for tails.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. `verification:
  net_folded_in_3d_every_seam_hole_for_hole_stitches_recounted`. The net is
  folded by rotating each piece about its hinge (90° for box sides, 180°
  for an ornament's back). Every seam must join edges with equal hole
  counts, and its two edges' holes must coincide in 3D in opposite order,
  which also rules out a twisted seam. Every edge must be in exactly one
  seam or be a free edge, and no free edge may meet another edge. The
  folded shape must have the printed size. The opening must keep two bars
  of margin. Every stitch must lie inside its piece, every stitchable
  square must be stitched, and every chart must mirror. Each net piece is
  cut as many times as it is placed, and the stitch counts and yardage are
  recounted. Tests also glue each net hole for hole with a union-find and
  check its Euler characteristic (a disc for boxes, a sphere for
  ornaments). They refuse hand-broken designs (a wrong seam, twisted
  corners, a side a bar too tall, a stitch in the opening, a gap, a
  lopsided chart, a forgotten edge, wrong yarn), check that every option
  changes the page, and sweep every boundary for a finite page inside its
  bounds.
