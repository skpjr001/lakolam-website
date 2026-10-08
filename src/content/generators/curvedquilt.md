---
title: "Curved Quilt Templates"
blurb: "Curved-seam quilt templates — Drunkard's Path, Dresden plate and Orange Peel at true size with a test square, seam allowance as an exact offset and matching notches, plus a layout sheet with counts; mating curves re-measured equal"
category: design
version: "1.0.0"
---
True-size templates for curved-seam quilt blocks: Drunkard's Path,
Dresden plate and Orange Peel. Each comes with seam allowances, matching
notches and a layout sheet.

## What it is

A page of cutting templates printed at true size, with a test square to
check the printer. Each template shows its cut line (solid) and its sewing
line (dashed), and says how many to cut and in which fabric.

- **Drunkard's Path** has a quarter-circle pie and the L-shaped piece it
  sets into. Notches on both curves show where they meet.
- **Dresden plate** has a wedge blade, pointed or rounded at the tip, and a
  centre circle.
- **Orange Peel** has a lens-shaped melon and its background square.

A thumbnail of the quilt layout sits beside the cutting list. The layout
view draws the whole arrangement large. For Drunkard's Path that is 36
units set as circles, waves, a winding path or a scattered arrangement,
with a count of which corner the pie sits in. For Orange Peel it is 16
blocks whose melons ring together. For a Dresden plate it is the finished
plate on its background.

## How to use it

Print at 100% (actual size, no scaling) and measure the test square. It
must be exactly 1 inch (or 3 cm) on each side. Cut the templates out on the
solid line and trace round them on the wrong side of the fabric. The dashed
line is the sewing line, a quarter inch (or 0.75 cm) inside the edge. Snip
each notch a little way into the seam allowance.

**Drunkard's Path:** lay the L on the pie, right sides together, with the
curves matching. Pin the middle notch first, then the other notches, then
the ends, easing the concave curve round the convex one. Sew slowly along
the curve and press towards the L. Set the finished units as the layout
shows.

**Dresden plate:** sew the blades together side by side into a ring. For
pointed blades, fold each blade in half lengthwise, right sides together,
sew across the top, and turn it out to make the point. For rounded blades,
turn the curved edge under along the sewing line. Press the ring flat,
appliqué it to a background square, and cover the middle with the centre
circle, its edge turned under.

**Orange Peel:** turn the melon's edge under along the sewing line and
appliqué it on the background square with its two tips on opposite
corners. Turn every other block a quarter turn so the melons form rings.

## Purpose

A curved seam goes together cleanly only if the two curves are the same
length and their notches match. Otherwise one side runs out before the
other and the block puckers. Each template set here is drawn in the block's
own coordinates, so the pie's curve and the L's curve are the same arc,
and each notch is the same point on both. The sewing lines are then
measured again, independently, by flattening the curves into fine
polylines. Both sides must agree to a tenth of a millimetre, and each notch
must sit at the matching fraction of the way along. The cut line must lie
exactly one seam allowance outside the sewing line all round. The Dresden
blades must close the ring, and the cutting list must count the pieces the
layout uses.

## History

Drunkard's Path is one of the oldest American curved blocks. Its two-piece
unit appears in quilts from the early nineteenth century, and the many
ways of turning it carry names such as Fool's Puzzle, Wonder of the World,
Love Ring and Snake Trail. The Dresden plate, named for the decorated
porcelain of Dresden, became one of the most popular appliqué designs of
the 1920s and 1930s, when pattern companies and newspaper columns spread it
across the United States. Orange Peel, also called Melon Patch, is a simple
appliquéd lens whose overlapping arcs form rings of circles across the
quilt. All three remain staples of modern quilting, often cut with
specialist rulers or die cutters, and printed templates remain the
cheapest way to start.

## This implementation

- **Spec knobs:** `block` (drunkards_path, dresden_plate, orange_peel),
  `units` (inches with a 1/4 in seam, or cm with a 0.75 cm seam), `size`
  (finished block side, 2–12 in or 5–30 cm, or the plate diameter, 4–24 in
  or 10–60 cm), `layout` (auto, circles, waves, path, scattered; Drunkard's
  Path only), `blades` (12–24) and `tip` (pointed, rounded), both Dresden
  only, `colours` (2–4 fabrics), `view` (templates, layout), `palette`
  (auto, indigo, christmas, sorbet, modern, mono), `width`, `height` (page,
  144–3000 pt). If the templates do not fit the page at true size, the
  finished size is stepped down until they do (reported as
  `requested_size`). On a page too small even for the smallest size, the
  page is scaled, says so in print, and records `true_size: false`.
- **Generation:** the Drunkard's Path pie is a quarter circle of two thirds
  of the unit, with notches at a quarter, a half and three quarters of the
  curve. Dresden blades are wedges of exactly 360°/n, sides on radii, from
  an inner radius of 0.3 of the plate's radius (never less than 2.2 seam
  allowances). A pointed tip is a right-angled point at the plate's radius.
  A rounded tip is a half circle as wide as the blade. The centre circle
  covers the blades' raw inner ends by a full seam allowance. The Orange
  Peel melon is two quarter circles of the block's side, meeting at
  opposite corners. Cut lines are built edge by edge: straight edges move
  out on parallel lines, arcs on concentric circles (smaller for a concave
  curve), with corners where the moved edges meet, or round joins at a
  rounded tip's shoulders. Layouts are seeded: arrangement, a shift across
  the quilt, fabric order and accents.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. `verification:
  mating_seams_remeasured_notches_coincide_allowance_offset_counts_recounted`.
  Mating seams have equal length to 0.1 mm, share their end points (sewn
  face to face) and midpoint, and carry notches at the same points. Every
  sewing point is exactly the allowance from the cut line, and no cut
  point is closer. Dresden side lines are radial and 360°/n apart, with n
  blades. The cutting list equals the pieces in the layout. Tests measure
  flattened curves independently, find each notch's fraction along both
  curves, check offsets against flattened polylines, turn one blade onto
  its neighbour, recount the layout, check that the 1 in test square is 72
  points, refuse hand-broken templates, check that every option changes the
  page (and that the Dresden-only and Drunkard's-only knobs are ignored
  elsewhere), and sweep every boundary for a finite page inside its bounds.
