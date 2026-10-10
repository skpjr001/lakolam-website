---
title: "Complex Function Art"
blurb: "Complex-function art: phase portraits of rational and trigonometric functions as colour tiles, or their level curves as a colouring page"
category: design
version: "1.0.0"
---
A formula of a complex number, drawn as a map: colours that wheel round its
zeros and poles, or the curved square grid that its level lines make.

## What it is

Every point of the page stands for a complex number z, and a formula f
turns it into another complex number f(z). Each value has a direction
(its argument, an angle) and a size (its modulus). The page shows both:

- the **colour** style is a *phase portrait*: the hue at each point says
  which way f(z) points, stepping round the colour wheel; the shade steps
  with its size. Round a zero of the function every colour of the wheel
  meets in one point, going round one way; round a pole the colours go
  round the other way. Where both kinds of step are drawn the tiles are
  little curved squares that shrink into the zeros and poles;
- the **line** style draws the same boundaries as black lines inside a
  frame: lines of constant direction running between zeros and poles, and
  lines of constant size ringing them, crossing at right angles into a
  grid of curved squares to colour in. Round each zero and pole, where the
  squares would grow too small, a clear round space is left.

The formulas come in three families: zeros and poles placed on rings with
rotational symmetry; sums like z^4 + c/z, which put a ring of zeros round
a pole; and sin, cos, tan or exp of a power of z, perhaps times a ring of
extra zeros or poles. The window can be a rectangle or a circle.

## How to use it

On the line page, colour the curved squares. Give each band between two
direction lines its own colour, the way the phase portrait does, and the
colours will spin round every clear space: round a zero they run one way
round the wheel, round a pole the other. Or shade alternate squares light
and dark for a checkerboard that bends with the grid. Fill the clear
spaces round the zeros and poles with a bold colour of their own. The
colour page is ready to print as a poster or card.

## Purpose

A picture of a complex function is hard to draw: its graph needs four
dimensions. A phase portrait fits it on a flat page and shows at a glance
where the zeros and poles are, how many times each counts, and how the
function behaves between them. The pages are art prints and colouring
pages, and a way into complex analysis: every page records its formula,
its zeros and poles and its window exactly, so it can be checked by hand
or redrawn in any plotting tool.

## History

Colouring the domain of a complex function by its value was taken up in
the 1990s as computer colour became common. Frank A. Farris introduced the
idea to a wide readership, and the name *domain colouring* is credited to
him, in his review of Tristan Needham's *Visual Complex Analysis* (American
Mathematical Monthly 105, 1998); Hans Lundmark's notes "Visualizing complex
analytic functions using domain coloring" (2004) made the method widely
known. Elias Wegert and Gunter Semmler named and studied *phase plots* —
colour by the argument alone — in "Phase Plots of Complex Functions: a
Journey in Illustration" (Notices of the AMS 58, 2011), and Wegert's book
*Visual Complex Functions: An Introduction with Phase Portraits*
(Birkhauser, 2012) develops *enhanced* phase portraits that add the level
lines of the modulus and a conformal grid of curved squares, as here.

The mathematics the pictures show is older. Augustin-Louis Cauchy's
argument principle (1830s-1850s) says that the argument of f turns once
forwards round each simple zero and once backwards round each simple pole,
which is why every colour meets at those points. Because f is analytic,
log f is a conformal map: when the steps of argument and of log-modulus
are equal (2 pi / sectors here), it carries each tile to a square, which
is why the grid's cells are curved squares crossing at right angles.

## This implementation

- **Spec knobs:** `family` (auto, rational, power, trig; auto lets the
  seed choose), `style` (line, colour), `palette` (rainbow, sunset, ocean,
  forest, berry, ink_blue; colour style only), `bands` (both, phase,
  modulus: which level curves cut the plane — in colour, both gives the
  checkerboard of tiles, phase plain hue sectors, modulus hue shaded in
  three steps by size), `frame` (rectangle, circle), `sectors` (4-36,
  even; default 8; the modulus step is 2 pi / sectors in log|f|),
  `symmetry` (0 lets the seed choose; rational 1-8, power 2-8 as n + m,
  trig 1-3 as the power of z), `zoom` (0.5-3), `width`, `height`
  (144-2000 pt, Letter by default), `margin` (0-144 pt), `stroke`
  (0.75-4 pt). Clamped values are reported as `requested_<field>`.
- **Generation:** the formula is drawn from a structured space: radii from
  a short list of fractions, angles at rational multiples of pi, small
  integer powers. Rational functions put two or three rings of zeros or
  poles (orders 1-2) and perhaps a zero or pole at the centre; each ring
  of k points at radius r is the factor (z^k - r^k e^(i k theta)); ring
  radii differ by a ratio of at least 1.4, and there are at most ten
  zeros and ten poles on the rings, counted with order, so the grid never
  crowds the page. The window is fitted round the zeros and poles. The plane is sampled on a
  grid over the page. Colour style: each sample gets a (sector, band)
  label from arg f and log|f|; for each label present the field
  min(phase margin, modulus margin, distance into the frame) is traced by
  marching squares into closed loops, simplified, wound so that non-zero
  filling leaves holes open, and filled in its colour (one path per
  colour) over a background of the palette's mean. Modulus levels cover
  the middle 96% of log|f| values in the window; values beyond merge into
  the outer bands. Line style: the phase lines arg f = theta and
  theta + pi are traced together as the zero set of sin(arg f - theta);
  the modulus lines are level lines of log|f|. Round each zero and pole
  of order m a hub is cleared: the level line of |f|, on the modulus
  grid, just outside the circle of radius m * 17 pt / step, where tiles
  are 17 pt across (stepped inwards if that line would enclose a zero of
  the other kind, or a quarter of the window). Where tiles still crowd
  between hubs (smaller than 0.75 * 17 pt, measured as step / |grad log|f||),
  the area is cleared too, and its rim drawn. Lines are cut to the window
  and the clear areas exactly, by bisection.
- **Solving:** nothing to solve.
- **Guarantees:** determinism; the meta records the formula (`formula`,
  exact fractions), its structure (`function`), every zero and pole in the
  window with its order, and the window. Tests check the argument
  principle on a small circle round every listed zero and pole (winding
  +m and -m), and on a large circle (winding = zeros minus poles inside,
  so the lists are complete); that colour tiles cover the window and carry
  the hue of arg f; that hub rims lie on their modulus level; that no line
  runs into a zero or pole; that the default line page passes the
  adult colourability check; and, by rasterising and flood-filling, that
  regions too small to colour are rare. They are not impossible: where a
  clearing's rim or the frame cuts a tile, a sliver can remain.
