---
title: "Geoboard Cards"
blurb: "Geoboard task cards — pictures, shapes, letters, numbers and area puzzles as rubber-band polygons on a peg grid, areas checked by shoelace and Pick's theorem"
category: maths
version: "1.0.0"
---
Task cards for the geoboard: make the picture, shape, letter or number
with rubber bands, or work out the area of a mystery polygon.

## What it is

A page of two to eight cards, each showing a peg board (5 × 5 up to
11 × 11 pegs) with coloured rubber bands stretched round the pegs. Picture
cards show a house, boat, fish, rocket, castle and more, made of several
bands. Shape cards name the shape: square, rectangle, right or isosceles
triangle, parallelogram, trapezoid, kite, pentagon, hexagon, octagon.
Letter and number cards show block capitals and digits. Area cards show a
polygon and ask for its area. The answer page gives every card's area in
squares and, for one-band cards, the pegs on the band and inside it.

## How to play

Copy the card onto your geoboard: find the corner pegs of each band on
the card, then stretch a band round the same pegs on your board. Count
pegs from a corner to place the first one. On a dot-paper recording sheet,
join the same dots with a pencil.

For the area cards, count the whole squares inside the band, then the
half squares cut by the slanting sides. For harder shapes, draw a
rectangle round the shape and take away the triangles outside it — or
count the pegs: area = pegs inside + half the pegs on the band − 1.

## Purpose

Hands-on geometry for early years to upper primary: shape names,
position and copying, letter formation, then area by counting, by
decomposing and by Pick's theorem. Every band is something one rubber band
can make, and every area in the key is checked twice.

## History

Caleb Gattegno introduced the geoboard in the 1950s as a way to explore
geometry with the hands. Georg Pick proved his area theorem for lattice
polygons in 1899; it reached a wide audience when Hugo Steinhaus included
it in *Mathematical Snapshots* (1969 edition). Geoboards and their task
cards remain a standard classroom resource.

## This implementation

- **Spec knobs:** `content` (pictures, shapes, letters, numbers, area),
  `difficulty` (kids and easy keep to rows and columns of pegs, medium
  adds 45° diagonals, hard any slope, expert polygons of six or more
  corners with any slope), `pegs` (5–11 per side; letters and numbers
  need 6), `cards` (2–8, odd counts rounded up), `width`, `height` (page,
  144–3000 pt). Clamps are reported as `requested_*`.
- **Generation:** pictures come from a curated set, mirrored and placed at
  random; shapes are built from integer side vectors for their name and
  band; letters and digits are traced from a 3 × 5 pixel font into
  outline bands (a letter with a hole gets a band for the hole; where two
  parts meet only at a corner they become two bands sharing that peg);
  area polygons are rectangles, traced polyominoes or star-shaped
  polygons through random pegs, kept when their rating matches the band.
- **Solving:** areas by the shoelace formula; pegs on a band by the
  greatest common divisor of each side.
- **Guarantees:** `answers_checked: true`.
  `verification: simple_lattice_bands_area_by_shoelace_equals_picks_theorem`.
  Every band is a closed polygon on pegs of the board that never crosses
  or touches itself and has no straight-through corners. Its area by the
  shoelace formula must equal Pick's theorem with the pegs inside counted
  one by one. Named shapes are re-classified from exact integer tests of
  sides and angles; letters' bands add up to the font's pixel count. The
  page's band (`rating_basis: edge_slopes_and_corners`) is the hardest
  card's; letters and numbers are always kids or easy and report a
  different request as `requested_difficulty`. Tests check every area a
  third way by sampling, refuse broken cards, and sweep every boundary.
