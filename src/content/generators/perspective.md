---
title: "Perspective"
blurb: "Perspective drawing sheets — one-point names, hallways and roads, two-point street corners and boxes, three-point towers; trace, complete-the-drawing or finished, every receding edge checked to its vanishing point and hidden lines removed exactly"
category: design
version: "1.0.0"
---
Drawing sheets for one-, two- and three-point perspective: a street
corner, floating boxes, towers, a hallway, a road and your name in 3D
block letters.

## What it is

Perspective is how a flat drawing shows depth. Parallel lines that run
away from you appear to meet at a **vanishing point** on the **horizon
line**, which is at your eye level. Each sheet uses one, two or three
vanishing points.

- **One-point:** fronts face you. Only the edges going away from you
  meet, at one point. The sheets are floating boxes, a hallway, a road
  to the horizon, and a name in block letters.
- **Two-point:** you look at a corner. Both sets of horizontal edges
  meet, at two points on the horizon. The sheets are a street corner
  and boxes.
- **Three-point:** you look up at (or down on) tall towers. The
  vertical edges meet as well, at a third point above (or below).

Each sheet comes three ways:

- **Trace:** the finished drawing over light guide lines to the
  vanishing points.
- **Complete:** only the horizon, the vanishing points and the front
  edges are given, and you finish the drawing. The answer key is the
  finished drawing.
- **Finished:** a clean line drawing to colour.

## How to use it

Use a sharp pencil and a ruler.

**Trace sheets:** go over the drawing. Notice that every edge going away
from you lies along a guide line to a vanishing point (VP).

**Complete sheets:** from each corner you are given, rule a light line
to the vanishing point. Decide how deep each box or letter is, and mark
it on those lines. Close each shape with edges parallel to the ones you
were given, so a front face's back edges stay level and upright in
one-point. In two-point, the new verticals stay upright and the new
horizontals go to the other vanishing point. Leave out edges that the
nearer shapes would hide, then ink the drawing and rub out the guides.
Check your work against the answer key.

**Eye level:** a low eye level is a worm's-eye view. You look up at
things above the horizon and see their undersides. A high eye level is a
bird's-eye view, from which you see the tops.

## Purpose

Perspective drawing is part of most art courses for ages 10-14.
Hand-drawn worksheets are easy to get slightly wrong: a line that
misses its vanishing point by a millimetre teaches the wrong habit.
These sheets are made by an actual camera model, so every line is right,
and each new seed gives a fresh scene.

## History

Filippo Brunelleschi demonstrated linear perspective in Florence around
1415 with a painted panel of the Baptistery, viewed through a hole and a
mirror. Leon Battista Alberti set out the method for painters in *On
Painting* (1435). Renaissance artists used one and two vanishing points.
The third point, for the soaring verticals of skyscrapers seen from the
street or from above, became common in twentieth-century architectural
illustration and comics. Artists usually place the vanishing points at
the edges of the sheet, as these pages do.

## This implementation

- **Spec knobs:**
  - `kind`: `street` (default), `boxes_one`, `boxes_two`, `towers`,
    `hallway`, `road` or `name`.
  - `eye`: `auto`, `low`, `level` or `high`. For towers, `high` looks
    down. For a name, it moves the vanishing point below, beside or
    above the word.
  - `mode`: `trace`, `complete` or `finished`.
  - `hidden`: hidden edges are removed (`none`), or drawn `dashed` to
    show the solids as glass.
  - `objects`: 0-9 buildings, boxes or towers, where 0 lets the seed
    choose.
  - `text`: the word for `name`. Up to 10 capitals and digits; other
    characters are dropped and reported.
  - `page` (landscape, but portrait for towers) and `line`.
- **Generation:**
  - Each scene is built in world units as axis-aligned solids with
    surface details: windows, doors, floor tiles, road markings.
    Letters come from a 5 × 7 block alphabet, outlined as the boundary
    of their cells and extruded backward.
  - A pinhole camera (eye position, a yaw about the vertical, a pitch)
    projects the scene. It is chosen so that every vanishing point it
    needs falls inside the frame. For two-point, the focal length is set
    so the two horizontal vanishing points sit just inside the frame's
    sides. For three-point, the focal length also fits the horizon and
    the vertical vanishing point inside it.
  - Objects are placed by choosing a spot on the page and a depth, then
    rejecting any that leave the frame or come too close to another.
    Street buildings run along both streets from the corner, and the
    camera backs away until they fit.
- **Solving:** nothing to solve; this is a design.
- **Guarantees:** every sheet is checked as it is made.
  - **Vanishing points:** each vanishing point is computed in closed
    form from the camera. Every drawn piece of a receding edge must lie
    on the line through its axis's vanishing point (to 1 part in a
    million). Axes parallel to the picture stay parallel.
  - **Hidden lines:** a point of an edge is hidden by a face when it is
    beyond the face's plane and inside the wedge of planes through the
    eye and the face's sides. Both tests are linear along the edge, so
    hidden parts are exact intervals.
  - **Independent cross-check:** a ray cast to the middle of every
    visible and every hidden piece must agree, against the solid blocks
    by the slab method. The tests also sample 39 points along every edge
    and check each against a ray-cast raster.
  - **Tests:** they re-derive each vanishing point as the limit of
    points far along the axis. They count a lone cube's edges (9 seen, 3
    hidden), confirm that every vanishing point lands on the page for
    every kind and eye level, and confirm that moving one edge makes the
    check fail.
- **Caveats:**
  - The lines are straight and the solids are boxes: roofs are flat,
    and there are no curves or sloping planes.
  - The block letters are pixel letters, so rounded corners show as
    steps.
  - Wide-angle two-point views (vanishing points at the sheet edges)
    distort objects near the sides, as real art-class sheets do, so
    objects stay in the middle.
