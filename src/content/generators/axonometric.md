---
title: "Axonometric Grid Paper"
blurb: "Axonometric grid paper — dimetric, trimetric, planometric and oblique grids with exact foreshortened steps on each axis"
category: paper
version: "1.0.0"
---
Drawing grids for dimetric, trimetric, planometric and oblique views — every
axis at its own angle and its own exact scale.

## What it is

Axonometric drawing shows a solid with its three edge directions drawn as
three directions on the page: the vertical, and two receding axes at angles
to the horizontal. Each axis has its own scale, so depth can be drawn
shorter than width and height. Isometric drawing uses equal 30° angles and
equal scales; this paper gives the others:

- **Engineering dimetric** — receding axes at about 7° and 42°, with the
  42° axis drawn at half size (scales 1 : 1/2 : 1). It is the standard
  dimetric view of technical drawing, and looks more natural than
  isometric.
- **Dimetric 15°/15°** with both receding axes at three-quarter scale, and
  the pixel-art **2:1 dimetric** whose lines go two across for one up.
- **Trimetric** 15°/45° and 15°/30°, each axis at its own scale.
- **Planometric** (military) 30°/60° and 45°/45°: the floor plan is drawn
  undistorted and heights stand straight up from it.
- **Cavalier** and **cabinet** oblique views: the front face drawn true,
  depth at 45°, full size (cavalier) or half size (cabinet).

The page is ruled as the **block** — the top and two sides of a large block
meeting at the centre — or the **room**, a floor and two walls meeting in a
corner, each face ruled with its own two axes. A **lattice** layout instead
runs all three families of lines across the whole page, meeting at every
point like isometric paper.

## How to use it

Print the page at actual size ("Actual size" or "100%" in the print dialog)
so the grid steps keep their true length.

Draw each edge of your object along one of the three directions: upright
edges on the vertical lines, and the two horizontal directions on the two
families of slanting lines. Count grid steps for lengths: one step on any
axis stands for the same real length, even where the steps look shorter, so
a 4 by 2 by 3 box is four steps, two steps and three steps along the three
axes. Sketch the object on the face of the block or room that matches its
side, or across the lattice anywhere on the page. Lines that are parallel
in the object stay parallel in the drawing.

## Purpose

For engineering and technical drawing classes, product and furniture
sketches, architectural and interior views (the planometric grid keeps
plans measurable), exploded assembly diagrams, and pixel and game art in
the 2:1 style. In a book, axonometric sections make a technical-sketching
workbook that goes beyond the usual isometric pad.

## History

William Farish set out isometric drawing for engineers in a paper of 1822.
In the decades that followed, dimetric and trimetric views with unequal
scales were worked out, and Karl Pohlke's theorem (1853) showed that any
three lines from a point, with any three scales, are a parallel projection
of three perpendicular axes — the basis for oblique views like cavalier
and cabinet. The 1 : 1/2 : 1 dimetric with axes at about 7° and 42°
became the dimetric view of German and international drawing standards (DIN
5 and ISO 5456-3), and its angles appear on many German drafting set
squares. Planometric or "military" projection, with the plan drawn true, is
long used by architects; the 2:1 dimetric was adopted by video-game artists
because its lines step evenly across a pixel grid.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `projection` (isometric,
  engineering_dimetric, dimetric15, pixel_dimetric, trimetric15x45,
  trimetric15x30, planometric30x60, planometric45, cavalier, cabinet);
  `scale` (conventional, true_projection, full_size); `layout` (block, room,
  lattice); `unit` (mm4, mm5, mm10, quarter_inch, half_inch — the full-size
  step); `mirror` (swap left and right axes); overrides `left_angle_deg`
  and `right_angle_deg` (0–75, the pair at least 10° in sum) and
  `left_ratio`, `right_ratio`, `vertical_ratio` (0.25–1); `ink`; `weight`
  (0.1–2 pt, axes twice that).
- **Generation:** engineering dimetric uses the exact orthographic angles
  arcsin(1/8) = 7.18° and arccos(3/4) = 41.41°, at which a true projection
  has scales exactly 1 : 1/2 : 1. True-projection scales for any pair of
  angles (both positive, sum under 90°) come from the axonometric relation
  cos θᵢⱼ = −nᵢnⱼ/(vᵢvⱼ), vᵢ² = 1 − nᵢ², normalised so the largest is 1;
  oblique and planometric views have none and keep their conventional
  scales (recorded as `scale_fallback`). In the block and room layouts the
  three axes leave the centre of the page, and each face between two axes
  holds the lines parallel to one axis through the other axis's nodes, at
  exactly `unit × scale` apart along each axis; lines are clipped to the
  margins. In the lattice layout verticals are `unit ÷ (tan α + tan β)`
  apart and both slanting families pass through every node, so the vertical
  step is exactly the unit and the receding steps follow from the angles
  (recorded as `steps_mm` and the implied `ratios`).
- **Solving:** nothing to solve — a page to draw on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every line runs exactly along its axis direction; in the
  block and room layouts every face line passes through a node a whole
  number of exact steps along an axis, and in the lattice the three
  families meet at every node (all checked in the tests); all ink, stroke
  widths included, stays inside the margins on every page size,
  orientation, projection and layout. A knob outside its range is clamped
  and recorded as `requested_<field>` in the meta.
