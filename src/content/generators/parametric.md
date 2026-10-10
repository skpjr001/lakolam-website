---
title: "Parametric Art"
blurb: "Parametric art: Yeganeh line families, Farris wheels, Maurer roses, Fay's butterfly and polar curves, as line art or palette gradients"
category: design
version: "1.0.0"
---
Birds, flowers and ribbons drawn by a few lines of trigonometry — line
families, wheels on wheels, Maurer roses and the butterfly curve.

## What it is

A single figure, centred on the page, drawn entirely from a formula. It is
one of five kinds:

- a **line family**: hundreds of straight lines (or circles), each a small
  step on from the last, whose ends sweep round together until the lines
  build a bird in flight, a ribbon, a fan or a shell;
- **wheels on wheels**: one looping curve traced by a point on a wheel
  turning on a wheel turning on a wheel, with an exact rotational
  symmetry — three-fold, six-fold, up to twelve-fold;
- a **Maurer rose**: a rose curve with its points joined by straight
  chords, which weave a lattice over and between the petals;
- **Fay's butterfly**: the famous curve whose loops, laid over each other,
  draw a butterfly's wings;
- other **polar curves**: Grandi's roses with fractional petal counts, and
  flowers made from a mixture of waves.

Black lines on white to colour in, or the same lines shaded through a
palette from one end of the curve to the other.

## How to use it

Colour the spaces between the lines. Where many lines cross they make small
cells: fill them one by one for a stained-glass look, or shade whole bands
of a line family in one colour and let the lines show through. On a curve
page, follow one loop round and give each petal or lobe its own colour, or
repeat the same few colours round the figure to bring out its symmetry. The
colour version is ready to print as a poster or card.

## Purpose

These figures show how little it takes to draw something that looks alive:
a sine, a cosine, a few small whole numbers. They make an absorbing
colouring page, a handsome print, and a way into the mathematics of
periodic motion, symmetry and curves — each page records the exact formula
that drew it, so it can be plotted again by hand or in a graphing tool.

## History

Drawing with a family of straight lines is old — string art and the
"curve stitching" Mary Everest Boole taught to children in the 1900s make
smooth envelopes out of straight threads. Hamid Naderi Yeganeh, an Iranian
mathematical artist, turned it into a medium from 2014: images made of
hundreds or thousands of line segments (later also circles and ellipses)
whose endpoints are trigonometric formulas of the segment's number. His "A
Bird in Flight" (2016) is 500 segments, the i-th joining ((3/2) sin(2 pi
i/500 + pi/3)^7, (1/4) cos(6 pi i/500)^2) to ((1/5) sin(6 pi i/500 + pi/5),
(-2/3) sin(2 pi i/500 - pi/3)^2); his figures were published by Plus
magazine, the University of Regina's Math Central and the American
Mathematical Society, among others.

Frank A. Farris's paper "Wheels on Wheels on Wheels — Surprising Symmetry"
(Mathematics Magazine, 1996) showed that a sum of circular motions
z(t) = a1 e^(i n1 t) + a2 e^(i n2 t) + ... has m-fold rotational symmetry
exactly when all the frequencies leave the same remainder on division by m;
he developed the idea into the book *Creating Symmetry* (2015). Such sums
are finite Fourier series, and the picture of wheels on wheels goes back to
the epicycles of ancient astronomy.

Peter M. Maurer described the roses that bear his name in "A Rose is a
Rose..." (American Mathematical Monthly, 1987): walk round the rose
r = sin(n theta) in steps of d degrees and join the points. The roses
themselves (rhodonea curves) were named by Guido Grandi in the 1720s.
Temple H. Fay published "The Butterfly Curve" in the American Mathematical
Monthly in 1989; in the upright form used here it is
r = e^sin(theta) - 2 cos(4 theta) + sin^5((2 theta - pi)/24).

## This implementation

- **Spec knobs:** `family` (auto, line_family, wheels, maurer_rose,
  butterfly, polar; auto lets the seed choose), `style` (line, colour),
  `palette` (sunset, ocean, forest, berry, rainbow, ink_blue; colour style
  only), `width`, `height` (144–2000 pt, Letter by default), `margin`
  (0–144 pt), `stroke` (0.5–4 pt). Line families: `preset` (random,
  bird_in_flight, swallow, two_thousand_lines — Yeganeh's published
  formulas), `elements` (segments, circles; random formulas only), `count`
  (24–4000, 0 = the figure's own). Wheels: `symmetry` (2–12, 0 = seed),
  `terms` (3–5, 0 = seed). Maurer rose: `petals` n (1–12, 0 = seed), `step`
  d in degrees (1–359, 0 = seed), `show_rose`. Polar: `curve` (auto,
  rhodonea, mixture). Knobs that belong to another family are ignored.
  Out-of-range numbers are clamped and reported as `requested_<field>`.
- **Generation:** random formulas come from a structured space: small whole
  frequencies, powers mostly odd (1, 3, 5, 7, with some squares), phases at
  multiples of pi/2–pi/6, amplitudes from a short list of fractions. Line
  families use the two shapes of formula in Yeganeh's published work — a
  slow and a fast frequency swapped between the two endpoints (as in A Bird
  in Flight), or a ladder of four consecutive frequencies with one power (as
  in 2000 lines) — and are kept only if both ends move, the figure is not a
  sliver, segments are neither stubs nor all page-wide, the frequencies
  share no factor (no retracing), neighbouring segments lie within 1.5% of
  the figure of each other (circles: centres within 0.4 of the least
  radius) and the count that needs stays inside the ink budget; the
  figure's own count is the smallest that is smooth. Circle radii are
  measured in half the centre path's extent. Wheels take k frequencies
  n = r + m j for distinct j in −3..3, with r a unit mod m, the n sharing no
  factor and the j differences no factor (so the symmetry is exactly m, not
  a multiple), the slowest term of radius 1 and the others 1/5–2/3 at
  phases of multiples of pi/6. Maurer roses come from a list of classic
  (n, d) pairs or a fresh d coprime to 360. Rhodonea k = p/q from a curated
  list, closing after pi q (p q odd) or 2 pi q; mixtures sum a petal wave, a
  second wave and sometimes e^sin(theta), and run until every term's period
  divides the span. The figure is fitted by its own bounding box: centred,
  one scale, the larger side touching the margin. Line style: black strokes,
  each closed curve a closed path; a line family's own count is thinned so
  nominal ink coverage stays under 38% (`thinned_from` in meta). Colour
  style: 64 palette bins along the curve parameter (segment number for line
  families), one path per bin. Meta records the family, the full formula as
  text and as data, the count, scale and ink coverage.
- **Solving:** nothing to solve — a design to colour or display.
- **Guarantees:** deterministic per seed; all ink inside the margins.
  Tested: A Bird in Flight matches the published formula term by term;
  wheels satisfy z(t + 2 pi/m) = e^(2 pi i r/m) z(t) to 1e-9 for every m
  2–12, the drawn polyline maps onto itself under that rotation, and the
  figure is not 2m-fold; Maurer vertices follow the definition and the 360
  chords close; Fay's butterfly matches its formula and closes after 24 pi
  and not at any earlier whole turn; rhodonea and mixture curves close at
  their recorded span; every figure is centred and fills its frame; the
  default line page and every family's line page pass the adult colouring
  check (strokes at least 0.75 pt, ink under 55%), and the least circle of a
  circle family is at least 40 mm². The colouring check counts stroke width
  and coverage; it cannot measure the tiny cells where many lines cross, so
  the densest centres of line families and Maurer roses are for fine pens.
