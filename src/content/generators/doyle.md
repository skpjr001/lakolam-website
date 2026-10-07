---
title: "Tangent Circles"
blurb: "Tangent circles — Doyle spirals, nested Steiner and Pappus chains, Ford circles"
category: design
version: "1.2.0"
---
Circles that only ever touch: Doyle spirals winding out from a centre,
rings of circles inside circles, chains shrinking into a point, and the
circles of the fractions.

## What it is

Four classic arrangements of circles in which every circle touches its
neighbours at exactly one point, with no overlaps and no gaps along the
contact:

- **Doyle spiral** - every circle touches exactly six others, and the
  whole pattern looks the same after you turn it and shrink it, so arms of
  circles wind in to a centre and out to the edge, growing as they go.
- **Steiner chains** - a ring of circles between an outer circle and an
  inner one, each touching both and its two neighbours. The inner circle sits
  off-centre, so the ring swells on one side. Then every circle is filled
  with a ring of its own, and so on.
- **Pappus chains** - inside a circle sits a second circle touching it at one
  point. The crescent between them fills with a chain of circles that shrink
  away toward that point in both directions. Every circle can hold a chain of
  its own.
- **Ford circles** - one circle for every fraction, sitting on the edge of
  a big circle. Two of them touch exactly when their fractions are
  neighbours in the Farey sequence, like 1/3 and 1/2.

## How to use it

Print the colour pages as wall art: the spiral and the nested rings have
a hypnotic pull, and every page gives a new arrangement. The line-art pages
are colouring pages. Each circle is its own space, and so is each little
curved triangle between three circles. Try colouring along one arm of a
spiral to find how the arms wind, or keep each ring of a chain to two
alternating colours. Choose the ring or rosette decoration to add a second
layer of detail inside the larger circles.

## Purpose

Tangent circles are some of the most satisfying shapes in mathematical art,
and among the hardest to draw by hand. A circle drawn a hair too big
overlaps its neighbour and the spell breaks. Computing them exactly gives
crisp, clean, colourable pages at any size, and a fresh pattern every time.

## History

Steiner chains are named for Jakob Steiner (1796-1863). His porism says
that if a ring of circles closes up once, it closes up wherever you start
it. Pappus of Alexandria described his chain in the arbelos around 300 AD.
The modern proof uses inversion, which turns the chain into a column of
equal circles. Lester R. Ford introduced his circles in 1938. Peter Doyle
found the spiral packings around 1990, and they were studied by Beardon,
Dubejko and Stephenson (1994) and, as art, by Robin Houston and many
others. The spiral pattern itself recalls the seed heads of sunflowers.

## This implementation

- **Spec knobs:** `family` (`doyle` default, `steiner`, `pappus`, `ford`),
  `p` and `q` (the Doyle spiral's two arm counts; 0 picks a seeded pair;
  since 1.1.0 a pair with no spiral, such as `p = q` or `3, 7`, draws the
  nearest pair that has one, by `|Δp| + |Δq|`, and meta records the
  `requested_pair` — it used to be an error),
  `depth` (1-4, default 3: Steiner and Pappus chains nest their own kind,
  Ford circles fill their roomier circles with Steiner chains, and a Doyle
  spiral fills only its largest circles, one level fewer), `min_radius`
  (smallest circle drawn, default 5 pt), `motif` (`none`, `ring`,
  `rosette`), `style` (`colour` default, `line_art`), `palette` (`lagoon`,
  `sunset`, `garden`, `jewel`), `width`, `height`, `margin`, `line`.
- **Generation:** *Doyle*: circles sit at `a^j b^k` in the complex plane
  with radius `r |a^j b^k|`. With `a = z e^{it}` and the closing condition
  `a^p = b^q`, the three tangency conditions reduce to two real equations
  in `(z, t)`, solved by damped Newton's method from a few fixed starts.
  Pairs that fail to converge, or converge to anything but a packing in
  which the circle at 1 touches exactly six neighbours and overlaps none,
  are rejected. Seeded pairs come from `3 <= p <= 14`, `p + 2 <= q <= p + 14`
  with the size ratio `r` between 0.10 and 0.22. The colouring
  `(q j + p k) mod n` is well defined on the spiral and gives touching
  circles different colours. *Steiner*: a concentric ring of `n` circles
  in the unit disc (inner radius `(1 - sin(pi/n)) / (1 + sin(pi/n))`) is
  carried through a seeded disc automorphism `z -> (z - a)/(1 - conj(a) z)`.
  *Pappus*: inverting about the contact point turns the two circles into
  parallel lines and the chain into a column of equal circles, which is
  inverted back. *Ford*: circles of radius `1/(2k^2)` over every fraction
  `h/k`, plus the horocycle of `1/0`, carried into the disc by the Cayley
  map and a seeded automorphism. Every Möbius image of a circle is computed
  from three of its points.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and seeds differ. Every
  solved Doyle pair is a packing and closes up (`a^p = b^q`). On laid-out
  pages, no two circles cross: any two either nest or sit side by side.
  Every circle well inside a spiral touches exactly six others, measured
  independently of the solver. Every tangency the chain and Ford
  constructions claim is re-measured to a relative error below one in a
  million, and Steiner rings close for every offset. Motif circles lie
  inside their hosts. A Steiner line-art page with 11 pt circles passes the
  adult colourability check. Every family generates in well under a second,
  even at the deepest nesting.
- **Caveats:** a Doyle spiral is infinite at its centre. The page stops at
  `min_radius` and leaves a small open eye there. The curved gaps between
  circles shrink with the circles, so line-art pages with small circles have
  gaps below the colouring floor. `colorable` checks the circles only, as
  the shared check measures closed paths, not the gaps between them.
- **Versions:** 1.2.0 — setting only one of `p` and `q` keeps it and lets
  the seed pick the other (before, a lone `p` or `q` was ignored and the
  seed picked both). Pages with both or neither set are unchanged.
