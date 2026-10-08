---
title: "Pantograph"
blurb: "Edge-to-edge quilting pantographs — loops, waves, scallops and points as one continuous line per row, seamless repeats, rows nested at a measured clearance; quilt preview, printable template or plotter lines"
category: design
version: "1.1.0"
---
Edge-to-edge quilting designs: one continuous line per row, repeating
seamlessly across the quilt, with the rows tucked into each other at a
measured gap.

## What it is

A pantograph is the paper pattern a longarm quilter follows to stitch the
same design right across a quilt. Each row is a single unbroken line —
loops, double loops, loops riding a wave, smooth waves, scallops or sharp
points — that repeats every few inches. Row after row is stitched below the
last, and the shapes are made to interlock, so the finished quilting is an
even, all-over texture with no gaps and no lines running into each other.

The page comes three ways: a colour preview of the design quilted over a
simple patchwork top, a printable pattern sheet with guide lines and
measurements, and a plain line drawing for a pen plotter or for tracing.

## How to use it

On the pattern sheet, each row starts at the arrow marked START and ends at
END; the dashed horizontal lines are the top and bottom of the row, and the
fainter dashed upright lines mark where one repeat ends and the next begins.
The note at the bottom says how much to enlarge the sheet for a full-size
pattern (or that it is already full size); check the one-inch bar after
printing. Tape enlarged copies end to end, matching the repeat marks, to
make a strip as wide as your quilt.

Stitch the first row along the top of the quilt, then move down by the row
pitch printed on the sheet and stitch the next. If the sheet says alternate
rows are shifted, start every second row half a repeat along. Rows spaced
this way never come closer than the gap printed on the sheet. For hand-guided
or domestic machine quilting, trace the design onto tear-away paper or a
marking sheet at full size.

## Purpose

Edge-to-edge quilting is the quickest way to finish a quilt evenly, and its
whole craft lies in the line: one path a machine can follow without
stopping, that joins itself at every repeat, and that nests with the rows
above and below without touching them. The pattern sheet carries the
numbers a quilter needs — row height, repeat, pitch and the gap between
rows — so the design can be scaled and laid out with confidence. The same
lines make calm, meditative plotter drawings.

## History

Pantographs take their name from the drafting instrument of linked
parallel bars, invented by Christoph Scheiner around 1603, which copies a
drawing by tracing it. Longarm quilting machines adopted the same idea in
the twentieth century: the quilter stands at the back of the frame and
guides a laser pointer or stylus along a long paper pattern while the
needle, on the other side, stitches the same path through the quilt. Paper
pantographs — rolls about twelve feet long printed with rows of a
continuous design — became a staple of longarm studios, and
computer-guided machines later took the same designs as digital files.
Loops, meanders, Baptist fans and feathers are among the classic
edge-to-edge patterns.

## This implementation

- **Spec knobs:** `family` (auto, loops, double_loops, loop_wave, waves,
  scallops, points), `output` (quilt, pantograph, plotter), `row_height`
  (2–16 in), `repeat` (2–24 in), `clearance` (smallest gap between rows,
  0.125–2 in), `interlock` (0 stacks whole bands, 1 nests rows as tightly as
  the clearance allows; default 0.7), `stagger` (shift alternate rows half a
  repeat), `palette` (auto, denim, sage, blush, charcoal, mustard),
  `width`, `height`, `stroke`. Out-of-range or non-numeric values are
  clamped or replaced by the default (`spec_clamped` in the metadata).
- **Generation:** every row is a periodic curve with
  `f(t + 1) = f(t) + (repeat, 0)`: trochoids for the loop families (one
  loop, a big and a small loop, or loops on a slow wave), a sine with an
  optional third harmonic and sharpened crests for waves, powered sine
  arches for scallops, and a four-segment zigzag for points; shape
  parameters come from the seed. Each repeat is flattened to a polyline (240
  samples; the zigzag's own four segments) scaled to exactly the row height,
  and a row is that polyline translated repeat by repeat, drawn as one path.
  The pitch is found by stepping down from `row_height + clearance` (where
  the rows cannot meet) in fortieths of the row height while the clearance
  holds, then bisecting at the first failure; `interlock` then picks a pitch
  between that tightest pitch and whole bands. Staggered loops cannot tuck
  under each other, so with `stagger` they stack at whole bands.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. Measured on the drawn polylines
  and reported in the metadata (`verification:
  "seamless_repeat+row_clearance"`): the exact segment-to-segment distance
  from a row to every row near enough to matter — over all horizontal
  repeats and the stagger — is at least the requested clearance
  (`measured_clearance_in`); a repeat ends at its start point shifted by the
  repeat width, heading the same way (`seamless_repeat`); each row is one
  stroke; the self-crossings per repeat equal the designed loop count
  (`crossings_per_repeat`); `min_turn_radius_in` reports the tightest curve
  away from the designed sharp points. Tested: the seam from the curve
  function at several repeats, the clearance re-checked by dense
  point-to-point sampling, the crossing counts, one move-to per row in every
  output, and every family, enum and boundary value generating. The
  pattern sheet prints at full size when it fits and otherwise at a round
  reduction (25%, 33.3%…) with the enlargement stated and a one-inch bar.
- **Version 1.1.0:** the quilt preview's covering rows overshoot the patch
  on every side and are cut by its clip; rows wholly outside the clip (up to
  140 pt below the page) were kept as invisible ink and are now left out.
  The picture is unchanged; quilt-preview bytes change, template and
  plotter pages are byte-identical to 1.0.0.
