---
title: "Symmetry"
blurb: "Symmetry — complete the mirror picture on a grid, draw lines of symmetry, find the order of rotational symmetry, each count computed from the drawn figure"
category: maths
version: "1.0.0"
---
Finish the mirror picture, find every line of symmetry, and count how often a shape fits onto itself in a turn.

## What it is

A page of two to twelve symmetry questions of four kinds. **Complete the
picture** shows part of a straight-edged shape on a squared grid beside a
dashed mirror line — upright, level or diagonal — or, on harder pages, a
quarter of a shape between two mirror lines. **Lines of symmetry** shows a
block letter, a polygon, a star or a patterned design to draw every line of
symmetry on and count them; on harder pages it also asks for the order of
rotational symmetry. **Rotational symmetry** asks for that order alone.
**Is it a line of symmetry?** shows a shape crossed by a dashed line to
answer YES or NO. The answer key draws the missing part of each picture, the
lines of symmetry and the centre of turning in red, and fills in every
answer.

## How to play

A **line of symmetry** (mirror line) splits a shape into two halves that
are reflections of each other: fold along it and the halves fit exactly.

- **Completing a picture:** take each corner of the drawn part and count
  squares to the mirror line, then go the same number of squares straight
  out on the other side and mark the reflected corner. For an upright or
  level mirror, count along the grid lines; for a diagonal mirror, count
  the steps to the mirror along the grid's diagonals. Join the reflected
  corners in the same order. With two mirrors, reflect the quarter in one
  mirror, then reflect both parts in the other, so all four quarters
  match.
- **Finding lines of symmetry:** try upright, level and slanting lines
  through the middle of the shape. A tracing-paper or folding test helps.
  A regular polygon with n sides has n lines of symmetry; a rectangle has
  2, not 4 — its diagonals are not mirror lines.
- **Order of rotational symmetry:** imagine tracing the shape and turning
  the tracing about its centre. Count how many times in one full turn it
  fits exactly over the shape (the starting position counts once). A shape
  that only fits when it is back where it started has order 1. An S or Z
  has order 2 but no lines of symmetry.

## Purpose

Symmetry is taught in every primary curriculum and returns in secondary
school: the US Common Core's grade 4 standard asks children to recognise
and draw lines of symmetry; England's Year 4 programme asks them to
"complete a simple symmetric figure with respect to a specific line of
symmetry", with rotational symmetry following at Key Stage 3 and GCSE; and
India's new NCERT Ganita Prakash class 6 has a whole chapter on lines of
symmetry and rotational symmetry. Grid completion builds careful
counting and the idea of distance from a line; spotting and counting
symmetries builds the habit of testing a guess rather than trusting the
look of a shape.

## History

Symmetry is one of the oldest ideas in art: it is in the patterned pots of
the Neolithic, Egyptian friezes, Greek temples and the tiled walls of the
Alhambra. The Greek word *symmetria* meant "agreement in proportion".
The mathematics came much later: in the nineteenth century, symmetries of
a shape were seen to form a *group*, and Leonardo da Vinci had already
noticed (as Hermann Weyl recounted) that a finite figure can have only two
kinds of symmetry — turning alone, the "cyclic" kind of a pinwheel, or
turning together with as many mirror lines as turns, the "dihedral" kind
of a snowflake or a regular polygon. That is why the number of mirror
lines of a shape is either zero or equal to its order of rotation.

## This implementation

- **Spec knobs:** `difficulty`; `task` (`mixed`, `complete`, `lines`,
  `rotation`, `check`); `count` (2-12); `color` (soft fills); `width`,
  `height`, `line`.
- **Generation:** grid pictures are lattice outlines on an 8 × 8 (Kids) to
  14 × 14 (Expert) grid. The given half wanders away from the mirror and
  back in small steps, monotone along the mirror so the whole outline
  never crosses itself; the diagonal half is a staircase of unit and
  diagonal steps; a quarter between two mirrors only moves away from one
  mirror and towards the other. Kids uses an upright mirror, Easy adds
  level mirrors, Medium diagonal ones, Hard and Expert two mirrors at once.
  Figures are 15 block letters on a unit grid, regular polygons, stars,
  rectangles, rhombuses, parallelograms, isosceles and scalene triangles,
  kites, isosceles trapezoids, and (Hard and Expert) random snowflake-like
  designs built with n mirrors and pinwheels built with n-fold turning
  only; from Hard, everything but letters is turned to a random angle.
  "Is it a line of symmetry?" shows a true mirror line about half the time
  and otherwise a tempting false one (level, upright, diagonal or halfway
  between two true lines), at least 15° from every true line. Rotational
  symmetry starts at Hard; lower requests are served there and meta
  records `requested_difficulty`. This complements Copy and Symmetry, which
  completes dot-grid line patterns and shaded-square pictures; here the
  pictures are straight-edged outlines, diagonal mirrors are included, and
  the other three tasks count symmetries.
- **Solving:** the symmetry of every drawn figure is computed from its
  outlines alone. Straight-through points are dropped to find the true
  corners; their centre is fixed by every symmetry; every turn about it and
  every reflection in a line through it that maps the farthest corner onto
  another equally far corner is tried, and kept only if it maps every
  outline exactly onto an outline. The key's counts, lines and YES/NO
  answers come from that computation, not from how the figure was made.
- **Guarantees:** `answers_checked` — each answer equals the computed
  symmetry, and each grid picture, once finished, has the mirror line(s) as
  lines of symmetry by the same engine, is a simple outline on the grid, and
  is exactly the given part plus its integer reflections. The tests check
  the engine independently by sampling points inside and outside each
  figure: every claimed turn and reflection keeps inside points inside, the
  order equals the largest k ≤ 12 for which a 1/k turn about the area
  centroid does so, lines halfway between claimed lines are not mirror
  lines, the number of lines is 0 or the order, and the block letters and
  standard shapes have their known symmetries.
