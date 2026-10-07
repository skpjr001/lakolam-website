---
title: "Volume and Surface Area"
blurb: "Volume and surface area worksheet — count cubes, cuboids, prisms and cylinders"
category: maths
version: "1.0.0"
---
Count the cubes, then measure the solids: cuboids, prisms and cylinders,
with every answer exact.

## What it is

A worksheet of two to eight questions, each with a picture. The first
pages show shapes built from cubes, drawn in three dimensions, and ask how
many cubes there are; solid cuboids of cubes lead on to volume. Later pages
show cuboids (rectangular prisms), cubes, L-shaped prisms, triangular
prisms and cylinders with their edges labelled, and ask for the volume,
the surface area, a missing length, a cylinder's height or how many litres
a fish tank holds. Each question ends with an answer line; the answer key
fills in every answer with its units.

## How to play

- **Counting cubes:** count column by column. Each page tells you what
  you may assume: either part of every cube can be seen, or every cube
  stands on the table or on another cube and you can see the top cube of
  every stack — then a stack whose top is three cubes up holds three
  cubes, even where the lower ones are hidden.
- **Volume of a cuboid:** length x width x height. A cuboid of 1 cm cubes
  4 long, 3 wide and 2 high holds 4 x 3 x 2 = 24 cubes: 24 cubic centimetres.
- **Surface area of a cuboid:** add the areas of all six faces — they come
  in three matching pairs: 2 x (lw + lh + wh).
- **Missing length:** divide the volume by the two edges you know.
- **Prisms:** the volume is the area of the end face times the length.
  Split an L-shaped end into two rectangles; a right-angled triangle's area
  is half of base x height. The surface area is the two ends plus a
  rectangle for each side face (each side length times the prism's
  length).
- **Cylinders:** the volume is pi x radius x radius x height; the total
  surface area is two circles (2 x pi x r x r) plus the curved side
  (2 x pi x r x h). Leave pi as a symbol: 3 x 3 x 10 x pi = 90pi. If the
  drawing gives the diameter, halve it first.
- **Litres:** 1 litre = 1,000 cubic centimetres, so divide a volume in
  cubic centimetres by 1,000.

Volumes are in cubic units (cubic centimetres), areas in square units
(square centimetres) and lengths in plain units (centimetres).

## Purpose

Volume and surface area run from counting cubes in the primary years
(US grade 5 measurement, England's Year 6) through cuboids and prisms
(grades 6-7, Key Stage 3) to cylinders and composite solids (grade 8,
GCSE). Counting cubes in a drawing trains seeing in three dimensions —
including the hidden cubes a stack must contain — and builds the meaning
of "cubic units" before the formula; the formula pages then practise
choosing the right faces and keeping units straight.

## History

The Moscow Mathematical Papyrus (about 1850 BCE) already computes the
volume of a truncated square pyramid. Euclid's *Elements* (Book XII)
proves volume relations for prisms, pyramids and cylinders, and Archimedes
showed in *On the Sphere and Cylinder* that a sphere has two thirds of the
volume and surface of the cylinder around it — the result he asked to have
carved on his tomb. Bonaventura Cavalieri's principle (1635), that solids
with equal cross-sections at every height have equal volumes, is why
"area of the end x length" works for every prism. Isometric drawing,
which shows the cubes here, was formalised by William Farish in 1822 for
engineering drawings.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `cubes`, `cuboids`,
  `surface_area`, `prisms`, `cylinders`); `locale` (`us` writes
  "rectangular prism", inches and feet and "cubic units" for cube
  counts, and asks no litre questions; `uk` and `in` write "cuboid",
  millimetres, centimetres and metres and litres); `count` (2-8);
  `width` (300-2400 pt), `height` (300-3000 pt), `line` (0.25-4 pt).
  Out-of-range numbers are clamped.
- **Generation:** Kids counts 3-7 cubes on a 2-3 x 2 floor plan, two high
  at most, with every cube visible, and solid cuboids up to 3 x 3 x 3.
  Easy counts 6-12 visible cubes, gives the volume of solid cuboids of
  1 cm cubes (up to 5 x 5 x 4) and of cuboids from whole-number edges.
  Medium counts 9-20 cubes where some are hidden under visible stacks,
  and adds surface areas, cubes, a missing edge from the volume, and
  L-shaped prisms. Hard uses edges with one decimal place, triangular
  prisms, cylinders (volume in terms of pi) and L-prism surface areas.
  Expert asks for surface areas of triangular prisms (sides from
  Pythagorean triples, so every face is whole) and cylinders (sometimes
  labelled by diameter), a cylinder's height from its volume, a tank's
  capacity in litres, and missing decimal edges. Single-topic pages are
  served at an honest level: counting cubes tops out at Medium, cuboids
  start at Easy, surface area and prisms at Medium and cylinders at Hard;
  meta then reports `requested_difficulty`. Drawings are not to scale
  (edge lengths are compressed so a 15-unit edge does not dwarf a 2-unit
  one), and the page says so; hidden edges of cuboids and triangular
  prisms are dashed.
- **Cube drawings:** cubes are drawn isometrically on a triangular
  lattice, where each visible face is exactly two lattice triangles, so
  hidden faces are removed exactly (vendored from the isometric-blocks
  generator). Each picture is proved to read one way: a search places
  stacks column by column from the front (a column can only be hidden by
  columns in front of it on both axes, so each column's triangles are
  final as soon as it is placed and must match the picture's shading at
  once) and finds every arrangement of stacks on the table that keeps the
  page's rule and draws the same shading and lines. A picture is kept only
  when that arrangement is the generated one. The proof matters: a
  2 x 2 x 2 block, for example, could also be read with its back stack
  replaced by a single cube further back, and such pictures are rejected.
- **Solving:** the key writes each answer exactly — whole numbers, exact
  decimals, multiples of pi — with its units.
- **Guarantees:** answers are exact decimals (no rounding anywhere);
  every cube picture keeps its stated rule and has exactly one reading
  under it. The tests recompute every answer from first principles —
  counting unit cubes one by one and their exposed faces for blocks and
  L-prisms, slab-by-slab tenth-cubes for decimal cuboids, the shoelace
  formula for triangular ends, the printed volume divided by the printed
  edges for missing lengths; they read every cube picture back from the
  drawing by testing each lattice triangle's centre against the drawn
  face paths and compare shading and face outlines with the model; they
  check every printed edge label against the solid; and they check the
  reading search against a brute force over every arrangement of stacks
  in a 3 x 3 box up to two high, which also confirms that ambiguous
  pictures exist and are found. Meta reports `answers_checked`,
  `cube_counts: unique_reading_under_stated_rule`, and each question with
  its solid and answer.
