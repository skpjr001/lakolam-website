---
title: "Stained Glass Pattern"
blurb: "Stained-glass cutting patterns — numbered pieces with colour codes, a foil-allowance template and glass list; every piece cuttable, every score line edge to edge"
category: design
version: "1.0.0"
---
Cutting patterns for real stained glass: numbered pieces, a colour for each,
a template to trace onto glass and a list of how much glass to buy.

## What it is

A full-size pattern for a glass panel or a suncatcher. Every piece is
numbered and carries a letter for its glass colour, and a key names the
colours. There are seven designs: a rectangular panel crossed by straight
lines and gentle curves; the same with a border of corner squares and
strips; a round suncatcher cut by chords and curves; a sunburst of rings and
rays; a compass rose; a hexagon of nested rings; and a diamond of nested
diamonds. Two more pages come with it: a cutting template, where every piece
is drawn a little smaller to leave room for the copper foil, and a glass
list with the area of every piece and the total for each colour.

## How to use it

1. Print the pattern at 100% and check the 1 inch bar. A panel too big for
   the paper is shown smaller and says how far to enlarge it; enlarge it at a
   copy shop to the size printed in the heading.
2. Buy glass from the glass list: the "buy" column adds a quarter for waste.
3. Print the cutting template at the same size, glue it to thin card and cut
   the pieces out along their lines. The gaps between them are the room the
   foil needs.
4. Trace each template piece onto glass of its letter and score just inside
   the line. On the lines and border panels and the round chord design,
   every line runs from edge to edge, so you can also score whole lines
   across a sheet in the order shown on the glass list.
5. Grind the edges, foil each piece, lay the pieces on the printed pattern
   by number, and solder.

Every piece is safe to cut: no corner is sharper than the minimum angle
(30 degrees unless you choose otherwise), no piece has an inside corner, no
inside curve is tighter than the minimum radius, and no piece is narrower
than the minimum width.

## Purpose

Beginner patterns sell on the promise of "easy straight lines", but a
pattern drawn by eye often hides a sliver, a needle-sharp point or an inside
corner that breaks the glass. Here every piece is measured against the rules
a glass cutter works by before the pattern is printed, the template is
shrunk by the foil allowance for you, and the glass is counted.

## History

Copper-foil glasswork was popularised by Louis Comfort Tiffany's studio in
the 1880s and 1890s, which wrapped each piece in a thin copper strip so that
small, curved pieces could be joined; lead came, the older method, goes back
to medieval church windows. Hobby glass took off in the 1970s with cheap
grinders and pattern books, and the rules every beginner learns date from
then: cut along lines that run edge to edge, avoid inside curves and deep
points, and keep pieces big enough to hold.

## This implementation

- **Spec knobs:** `design` (`lines`, `border`, `circle`, `sunburst`,
  `compass`, `hexagon`, `diamond`); `width`, `height` (inches, 4-24; round,
  hexagon and diamond designs use the smaller); `detail` (1-5); `curves`
  (gentle arcs in lines, border and circle); `min_angle` (degrees, 20-45);
  `min_width` (inches, 0.25-1); `inside_radius` (inches, 0.25-3); `foil`
  (millimetres taken out by pattern shears, 0.5-2.5); `colours` (2-8);
  `distinct_neighbours`; `look` (`colour`, `outline`); `page` (`letter`,
  `a4`).
- **Generation:** every lead line is a polyline (arcs are flattened to
  within 0.15 pt). The lines, border and circle designs add score lines one
  at a time, each from one edge of the panel (or the border's centre) to
  another, straight or a gentle arc whose radius follows the minimum inside
  radius; a candidate is kept only if every piece it creates passes the
  cutting rules, and it must keep clear of existing crossings. The fixed
  designs try seeded layouts (ray counts, ring radii, point widths, rim
  segments) nearest the requested detail, sized from the limits — the
  compass rose's point length comes from the minimum angle, its disc and
  rings from the minimum inside radius — and use the first whose every
  piece passes. Pieces are the faces of the planar arrangement of all lead
  lines (split at every crossing and touch, loose ends pruned), numbered in
  reading order and labelled at the point farthest from their edges. Glass
  colours are assigned by a backtracking colouring so neighbours differ;
  edge-to-edge designs need only two colours. If no pattern meets the
  limits on a small panel, the minimum width, inside radius and angle are
  relaxed step by step and the requested values are reported as
  `requested_min_width` and so on; clamped knobs are reported the same way.
- **Solving:** nothing to solve.
- **Guarantees:** `cuttable` and `tiles_panel`, re-checked on the finished
  pattern: every corner (a turn over 12 degrees) is convex and at least the
  minimum angle; every concave stretch is a curve no tighter than the
  minimum inside radius; every piece holds a circle of the minimum width;
  piece areas sum to the panel and a grid of sample points each falls in
  exactly one piece. In the edge-to-edge designs the check re-cuts the panel
  with an independent polygon splitter, score line by score line in order,
  refusing any line that stops inside a piece, and must land on the same
  pieces. Neighbours, found afresh from shared outline, differ in colour
  when asked; glass per colour is re-summed; and every template piece lies
  the allowance inside its piece.
- **Limits:** the compass rose keeps a large centre disc at the default
  1 inch inside radius, and its points are no sharper than the minimum
  angle, so it reads as a bold star rather than a fine needle rose. Panels
  bigger than the paper print scaled, with the enlargement stated.
