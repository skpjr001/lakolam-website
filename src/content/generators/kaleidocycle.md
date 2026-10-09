---
title: "Kaleidocycle"
blurb: "Kaleidocycles to cut, fold and glue — a ring of six tetrahedra that turns endlessly, four pictures continuous across every hinge, the turning simulated"
category: design
version: "1.0.0"
---
A ring of six paper tetrahedra that turns through its own middle forever,
showing four different pictures in turn.

## What it is

A kaleidocycle (also sold as a flextangle) is a ring of six tetrahedra —
triangular pyramids — joined edge to edge by hinges. Push the top inwards
and the whole ring rolls through its centre hole like a smoke ring, and a
new set of faces comes to the top. After four quarter-turns you are back
where you started, having seen four pictures. This page is the whole ring
as one net to cut out, with four designs of bands, spots and stars
arranged so each picture runs on unbroken across the faces that show it
together.

## How to use it

Print the page on thin card or heavy paper (120–160 g/m²).

1. Cut round the outside along the solid lines, keeping the grey tabs.
2. Crease every dashed line firmly, both ways: fold it forwards, then
   backwards. The hinges need to be floppy.
3. Each row of four triangles makes one tetrahedron. Roll the first row
   round and glue its tab under the far edge, so the four triangles close
   into a pyramid. Do the same for every row; the rows stay joined by the
   hinges between them.
4. You now have a chain of six tetrahedra. Bring the two ends together and
   glue the last tabs to close it into a ring.
5. Let the glue dry, then hold the ring with both hands and gently push the
   middle of the top downwards and through the centre hole. It turns over
   and shows the next picture. Keep going: it never runs out.

## Purpose

The kaleidocycle is a surprising object to hold: six rigid pieces linked by
hinges that turn endlessly. Making one is practice in careful cutting,
creasing and gluing, and it raises good questions about shape and motion:
why six tetrahedra, why four pictures, why the hole must open and close. It
also makes an ideal canvas for art that has to work on a moving surface.

## History

The name *kaleidocycle* was coined by Wallace Walker, who designed
them as paper models in the 1950s, and the 1977 book *M.C. Escher
Kaleidocycles* by Doris Schattschneider and Wallace Walker made them famous
by covering them with Escher's interlocking designs. In 2019 mathematicians
described a new family with a twist, the Möbius kaleidocycles, linking
the toy to the geometry of curves in space.

## This implementation

- **Spec knobs:** `art` (`bands`, `spots`, `mixed`); `look` (`colour`,
  `outline`); `size_cm` (hinge length 2–8 cm, 0 for the largest that fits;
  a size that does not fit is shrunk and recorded as `requested_size_cm`);
  `page`; `margin` (inches, 0.1–1, clamped and recorded). The ring always
  has six tetrahedra; each has its two hinge edges equal to the distance
  between them.
- **Generation:** the ring is modelled as a closed chain of six hinges,
  each turned a quarter turn from the last. With the joint angles following
  the pattern (φ, ψ, −φ, −ψ, φ, ψ), the chain closes along a single loop in
  the (φ, ψ) plane, found by Newton's method at each step round the loop.
  The net comes from every way of joining each tetrahedron's strip of four
  faces to the next, keeping those that unfold without overlaps with every
  face printed side out, turned square to a hinge and as large as the page
  allows. Every join the ring needs that is not a fold becomes a seam with
  one glue tab. Each picture is drawn as bands or spots round the corners
  of its six faces, coloured by which 3D corner they surround, with a star
  in each face for the spotted designs; the seed picks the colours, band
  radii and counts.
- **Solving:** nothing to solve.
- **Guarantees:** `turning_checked`. The ring is turned once round its loop
  in 720 steps: it closes at every step (residual under 1e-9); every joint
  stays at least 6.9 degrees short of folding its two tetrahedra into each
  other; tetrahedra that are not neighbours stay apart (separating axes;
  the tests confirm with points inside each tetrahedron); and the face of
  each tetrahedron looking up the ring's axis is tracked, giving four
  pictures in which each tetrahedron shows each of its faces once. The net
  is the ring unfolded: 24 triangles congruent to the faces, all printed
  side out, nothing overlapping, and every join the ring needs is a fold or
  a seam with exactly one tab. Each picture is sampled on both sides of
  every edge two of its faces share, from the drawn shapes, and the colours
  match (in the outline look, its lines cross the edge at the same places).
