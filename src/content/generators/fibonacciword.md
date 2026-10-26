---
title: "Fibonacci Word Fractals"
blurb: "Fibonacci word fractals: the odd–even turtle curve, Fibonacci snowflakes tiling the page, and the Rauzy fractal in three or five pieces"
category: design
version: "1.0.0"
---
Pictures drawn by a string of zeros and ones: a line that folds into
nested crosses, snowflakes that tile the page, and a fractal island in
three colours.

## What it is

The **Fibonacci word** 0100101001001… is built like the Fibonacci numbers:
each word is the last one followed by the one before. Read it as
instructions for a pen — step forward, and at every 0 turn left or right
depending on whether you are at an even or odd step — and it draws the
**Fibonacci word fractal**, a single line of squares within squares. At
other turning angles it draws its curly cousins, and the **tribonacci word**
(where each word is the last three joined) draws chains of hexagons and
pentagons. A related word of left and right turns, walked four times
round, closes into the **Fibonacci snowflake**, a shape that tiles the
whole plane by sliding copies. And the tribonacci word, counted letter by
letter and projected flat, fills the **Rauzy fractal**: a bumpy island
that falls into three (or five) pieces which fit together exactly.

## How to use it

A poster, or — with the **ink** palette — a page to colour: the
snowflakes as a two- or four-colour pattern, the Rauzy island piece by
piece. On the curve, follow the colour from one end to the other: it is
one unbroken line that never crosses itself. **Detail** makes the curve
longer and finer, the snowflakes more intricate, and the Rauzy island's
edges more exact.

## Purpose

A design-lane page that shows how much structure hides in a very simple
rule, and how one family of words gives three quite different pictures —
a curve, a tiling and a fractal tile.

## History

Alexis Monnerot-Dumaine described the Fibonacci word fractal and its
odd–even drawing rule in 2009 ("The Fibonacci Word fractal", HAL
hal-00367972). The Fibonacci snowflakes are due to Alexandre
Blondin-Massé, Srečko Brlek, Ariane Garon and Sébastien Labbé ("Christoffel
and Fibonacci tiles", DGCI 2009; "Two infinite families of polyominoes that
tile the plane by translation in two distinct ways", *Theoretical Computer
Science* 412, 2011). Gérard Rauzy introduced his fractal in 1982 ("Nombres
algébriques et substitutions", *Bulletin de la SMF* 110). The Fibonacci
word itself goes back to Johann Bernoulli's and Christoffel's studies of
such sequences and was named in the combinatorics of words of the 1970s.

## This implementation

- **Spec knobs:** `figure` (auto, curve, snowflake, rauzy), `word` (auto,
  fibonacci, tribonacci — curve only), `turn` (auto, right, pentagonal,
  hexagonal, octagonal: 90°, 72°, 60°, 45° — curve only), `detail` (1–10),
  `pieces` (auto, three, five — rauzy only), `palette` (auto, aurora,
  terracotta, indigo, mint, ink), `frame`, `caption`, `width`, `height`,
  `margin`. A clamped `detail` is reported as `requested_detail`.
- **Generation:** *curve* — the word f₁₄₊detail (or the tribonacci word
  t₇₊detail) read by the odd–even rule at the chosen angle; the path is
  turned in 15° steps to whichever angle fills the frame best, scaled, and
  stroked at half a step's width in sixty colour runs along its length.
  *snowflake* — the snowflake word qₙ (n = 3⌊detail/3⌋ + 4, so n ≡ 1 mod 3,
  where the path is simple), its path (qₙ)⁴ on the square lattice, and
  translates by the lattice of its first two quarter displacements,
  coloured as a checkerboard or in four (each tile has four neighbours, at
  ± either lattice vector, so both colourings are proper). *rauzy* —
  40,000 × detail prefixes of the tribonacci fixed point 0 ↦ 01, 1 ↦ 02,
  2 ↦ 0, their letter counts projected by the left eigenvector (1, α − 1,
  1/α) for a complex root α of x³ − x² − x − 1, coloured by the next letter
  (or next two), rasterised at about five points per cell with sampling
  gaps closed from their neighbours, and traced into region outlines. The
  seed picks the figure, the word and angle, the split, the colouring and
  palette, and where the curve's colour run starts.
- **Solving:** Nothing to solve.
- **Guarantees:** |fₙ| is the n-th Fibonacci number (n ≤ 25) and the
  tribonacci lengths satisfy their recurrence; the 90° curve stays on the
  lattice and never draws an edge twice; snowflakes of orders 4, 7, 10 and
  13 close, are simple, have area equal to their lattice cell, and cover
  every unit cell of the plane exactly once by translation; the Rauzy
  pieces' areas match the letter frequencies 1 : 1/β : 1/β² within 0.02,
  with fewer than 8 % of cells claimed by two pieces (only the shared
  boundary); all ink stays on the page; deterministic per seed.
