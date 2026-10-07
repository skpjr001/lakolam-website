---
title: "Transformations"
blurb: "Transformations worksheet — translate, reflect, rotate and enlarge shapes on a coordinate grid, and describe the transformation"
category: maths
version: "1.0.0"
---
Slide, flip, turn and enlarge shapes on a grid — then name the move that
maps one shape onto another.

## What it is

A worksheet of two to six questions, each with its own squared grid. Most
show a shape A and ask you to draw its image B after a **translation**
(a slide), a **reflection** (a flip in a mirror line), a **rotation** (a
turn about a centre) or an **enlargement** (called a *dilation* in the US)
from a centre by a scale factor. Others show two shapes and ask you to
**describe fully** the single transformation that maps A onto B, and the
hardest combine two transformations in turn and ask for the single one that
does the same job. The answer key draws every image in red, lettered, and
writes every description out in full.

## How to play

- **Translation:** every corner moves the same way. "3 right and 2 down",
  or a column vector with the move across on top and the move up (negative
  for down) underneath. Move each corner, then join them up.
- **Reflection:** each corner's image is the same distance from the mirror
  line on the other side, measured straight across (at right angles to the
  line). For the line y = x, swap the coordinates: (2, 5) goes to (5, 2).
  For y = -x, swap and change both signs.
- **Rotation:** turn the shape about the centre by 90 degrees or 180
  degrees. Tracing paper helps: trace the shape, hold the centre with a
  pencil point and turn the paper. About the origin, a half turn sends
  (x, y) to (-x, -y), and a quarter turn anticlockwise (counterclockwise)
  sends (x, y) to (-y, x).
- **Enlargement (dilation):** draw a line from the centre through each
  corner. With scale factor 2 the image corner is twice as far from the
  centre along that line; with 1/2 it is half as far. A negative scale
  factor puts the image on the other side of the centre, upside down.
- **Describing:** name the kind of move and everything needed to repeat
  it — a translation needs its vector (or its moves), a reflection its
  mirror line, a rotation its angle, direction and centre, and an
  enlargement its scale factor and centre. One word on its own does not
  get the marks.
- **Combined:** draw B, then C, then compare A with C directly.

Check each image: a translation, reflection or rotation keeps the shape
exactly the same size; an enlargement multiplies every length by the scale
factor.

## Purpose

Transformations are taught from upper primary (reflections and
translations on squared paper) through middle school (grade 8 geometry in
the US Common Core, including dilations) to GCSE in England, where
"describe fully" is a standard exam question. Drawing images practises
coordinates and careful measuring; describing them practises reasoning
backwards — finding a mirror line, a centre or a scale factor from the
shapes alone. Combining two transformations shows that two reflections
make a translation or a rotation.

## History

Felix Klein's *Erlangen Program* (1872) recast geometry as the study of
what stays the same under a group of transformations: rigid motions keep
lengths and angles, similarities keep shape. That idea reached schools in
the "new maths" reforms of the 1960s — the School Mathematics Project in
England built its geometry course around transformations — and it stays in
today's curricula, where "congruent" and "similar" are defined by
transformations rather than by matching sides.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `translate`, `reflect`,
  `rotate`, `enlarge`, `describe`, `combined`); `locale` (`us` writes
  "dilation", "center", "counterclockwise", "reflect across" and
  translations in words; `uk` and `in` write "enlargement", "centre",
  "anticlockwise", "reflect in" and column vectors); `count` (2-6, one grid
  per question); `width` (300-2400 pt), `height` (300-3000 pt), `line`
  (0.25-4 pt). Out-of-range numbers are clamped.
- **Generation:** Kids uses a plain 10 x 10 squared grid: slides in
  squares and reflections in a drawn mirror line. Easy uses the first
  quadrant (0-10): moves in words, drawn mirror lines x = a and y = b,
  quarter and half turns about a marked point near the shape, and
  describing slides and reflections. Medium uses four quadrants (-6 to 6):
  vectors, the axes and lines x = a, y = b, turns about the origin, scale
  factor 2 from a marked centre, and describing. Hard adds y = x and
  y = -x, turns about any point and scale factors 2 and 3. Expert adds
  scale factors 1/2 and 3/2 (and -2 and -1/2 outside the US, whose courses
  stop at positive dilations) and combined transformations — two
  reflections or turns in the axes, y = ±x or lines x = a, y = b — kept
  only when the result is itself a translation, reflection or rotation.
  Shapes are right-angled and scalene triangles, L-shapes, right
  trapezia, rectangles and parallelograms in a random orientation; an
  object and its image never overlap. Single-kind pages are served at an
  honest level: translations top out at Medium, reflections and rotations
  at Hard, enlargements start at Medium, describing at Easy and combined
  questions are Expert only; meta then reports `requested_difficulty`. A
  scale factor of -1 is never used: it is a half turn, and the page calls
  it one.
- **Solving:** images are computed with exact rational arithmetic; the
  key draws each in red with its letter, marks the centre or mirror line
  of a described transformation, and writes the description in full.
- **Guarantees:** every vertex of every shape — object, image and the
  intermediate shape of a combined question — is a lattice point inside
  the grid, and every shape is a simple polygon whose image differs from
  it. Shapes in "describe" and combined questions have no symmetry, so
  exactly one transformation maps A onto B (two would combine into a
  symmetry of A). The tests read every polygon back from the drawing,
  check each vertex lies on the lattice, and recompute each image from
  geometry in floating point (feet of perpendiculars, sines and cosines);
  for every description they search all similarities of the plane — any
  angle, centre, scale or mirror line, found by sending two vertices of A
  to every pair of vertices of B — and find exactly one, the one named.
  Meta reports `answers_checked`, every shape's vertices and every written
  answer.
