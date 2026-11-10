---
title: "Dissections"
blurb: "Geometric dissections: Dudeney's hinged triangle-to-square, Pythagorean proofs and Wallace-Bolyai-Gerwien cuts"
category: design
version: "1.0.0"
---
One shape cut into pieces that rearrange into another: Dudeney's hinged
triangle-to-square, the Pythagorean proofs, and the theorem that any polygon
can be cut into a square.

## What it is

A plate in the style of an old geometry book. On one side is a shape cut
into a few coloured pieces; on the other the same pieces, turned and slid,
make a different shape of exactly the same area. Each piece keeps its
colour and its number, so the eye can follow it across. The plates are:

- **Dudeney's haberdasher's puzzle** — an equilateral triangle into a
  square in four pieces, which can be hinged together in a chain and swung
  from one shape to the other (the hinges are the dots).
- **Perigal's dissection** — the squares on the two legs of a right
  triangle cut into five pieces that make the square on the hypotenuse,
  drawn on the classic figure of a triangle with a square on each side. The
  pieces only slide; none of them turns.
- **Bhaskara's proof** — the square on the hypotenuse as four copies of the
  triangle round a small square, rearranged into the two leg squares side
  by side.
- **The shear proof, cut rigid** — the line from the right angle across the
  hypotenuse square splits it into two rectangles; each leg square is cut
  and slid into its own rectangle.
- **The Greek cross squared** — a cross of five squares into one square in
  four identical pieces.
- **The hexagon squared** — a regular hexagon halved into a parallelogram,
  straightened into a rectangle, and slid into a square.
- **Wallace–Bolyai–Gerwien** — a random polygon cut into many pieces that
  make a square, by the general method that works for any polygon.

## How to use it

Look for each numbered piece in both shapes: the colour and the number
match. Try to see the move — a slide, a half turn about a corner, a quarter
turn — that takes it from one place to the other. For the Pythagorean
plates, convince yourself that the two small squares together really fill
the big one; that is the proof.

To make it a hands-on puzzle, print the line-art page on card, colour each
piece, cut out one shape's pieces and rebuild the other shape. For
Dudeney's puzzle, tape the pieces together at the dots and swing the chain
open and closed.

## Purpose

Dissections are proofs you can hold: two shapes have the same area because
one can be cut up and laid on the other. The plates show the classic
proofs of Pythagoras' theorem and the surprising fact, proved in the 1830s,
that any two polygons of equal area can always be cut into each other.

## History

Henry Ernest Dudeney (1857–1930), the English puzzle writer, set the
haberdasher's puzzle — cut an equilateral triangle into four pieces that
make a square — in the *Weekly Dispatch* in 1902, printed his solution
there, showed a hinged mahogany model to the Royal Society in 1905 and
included it in *The Canterbury Puzzles* (1907). Henry Perigal (1801–1898), a
London stockbroker and amateur geometer, found his dissection of the two
leg squares around 1830 and published it in 1873 in the *Messenger of
Mathematics*. Bhāskara II (1114–1185) drew
the hypotenuse square as four triangles round a small square in his
*Bījagaṇita*; the same figure appears in the Chinese *Zhoubi Suanjing*.
Euclid's proof (*Elements* I.47, c. 300 BC) shows that each leg square
equals a rectangle in the hypotenuse square, which is what the shear proof
animates. Dudeney devoted a chapter of *Amusements in Mathematics* (1917)
to Greek cross puzzles. William Wallace (1807), Farkas Bolyai (1832) and
Paul Gerwien (1833) proved that polygons of equal area are always
equidecomposable; in 1900 David Hilbert asked, as his third problem,
whether the same holds for solids, and Max Dehn showed in 1901 that it does
not. Greg N. Frederickson's *Dissections: Plane & Fancy* (1997) and *Hinged
Dissections* (2002) collect the field.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200–3000); `kind` (`auto`,
  `dudeney`, `perigal`, `bhaskara`, `shear`, `greek_cross`, `hexagon`,
  `polygon`; auto is picked by the seed); `leg_ratio` (shorter over longer
  leg, 0.25–0.95, for the three Pythagorean kinds; null picks a Pythagorean
  triple — 3-4-5, 5-12-13, 8-15-17, 7-24-25 or 20-21-29); `sides` (corners
  of the seeded polygon, 3–9, polygon kind only); `style` (`colour`,
  `lines`); `palette` (`auto`, `jewel`, `pastel`, `bauhaus`, `earth`);
  `labels` (`numbers`, `arrows`, `both`, `none`); `caption`; `stroke`
  (0.2–4).
- **Generation:** each piece is stored twice, as its polygon in the source
  and, vertex for vertex, in the target. Constructions cut convex pieces by
  lines (a new vertex at parameter t along an edge of the target polygon is
  placed at the same t along the same edge of the source, so the source
  side never accumulates error) and move the target polygons of a region by
  rigid motions. Dudeney: D, E the midpoints of AB, BC; J on AC with EJ
  equal to the square's side; K on AC with JK half a side; perpendiculars
  from D and K to EJ; pieces half-turned about D, E and K. Perigal: the
  larger leg square cut through its centre parallel and perpendicular to
  the hypotenuse, pieces translated to the hypotenuse square's corners.
  General method: ear-clip the polygon (fattest ear first); each triangle to
  a rectangle on its longest side (cut at half height, the two top corners
  half-turned about the side midpoints); each rectangle to the square's
  width (cut into strips and stacked or laid side by side until the width is
  within a factor two, then the three-piece slide along the line from the
  new top-left corner to the old bottom-right); stack the rectangles. The
  hexagon goes through a parallelogram and a 3 × √3/2 rectangle, then the
  slide. Pages are laid out side by side or stacked, whichever is larger;
  the Pythagorean Perigal and shear plates use the triangle-with-squares
  figure.
- **Guarantees:** every page passes `verify`, whose result is in the meta
  (`verification: rigid_motion_recovered_exact_tiling`): each piece's
  rigid motion is recovered from its two polygons (best cyclic vertex
  shift, least-squares rotation, no reflection) and every vertex lands
  within 1e-9 of the figure's size; on each side the pieces overlap by less
  than 1e-9 of the area, lie inside their shape and add up to its area; the
  two shapes have equal area. The tests check this again independently:
  each target polygon rebuilt from its first edge alone, the union of the
  pieces against the shape with lako-geom's overlay booleans, and grid
  samples covered by exactly one piece. Dudeney's target is a square of the
  right side with three hinges shared by two pieces on both sides;
  Perigal's pieces only translate. The line-art pages pass the adult
  colourability check. Clamped knobs are reported as `requested_<field>`.
