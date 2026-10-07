---
title: "Knots"
blurb: "Knot and link diagrams — torus knots, Lissajous knots and closed braids as ribbons or broken lines"
category: design
version: "1.1.0"
---
Mathematical knots and links drawn as ribbons that weave over and under
themselves: torus knots, Lissajous knots and closed braids.

## What it is

A knot is a loop of string in space that cannot be untangled without
cutting. On paper it is drawn as a picture of its shadow, with a break
wherever one strand passes under another. Three kinds of knot:

- **Torus knots and links** — a strand wound round a doughnut, `p` times
  round the hole and `q` times through it, written T(p, q). The trefoil is
  T(2, 3). When `p` and `q` share a factor the curve splits into several
  interlinked loops: a link.
- **Lissajous knots** — the path of a point swinging back and forth at
  three different rates at once, like a three-dimensional harmonograph.
- **Closed braids** — a few strands plaited at random and then joined end
  to end in a ring.

Each page draws the knot as a coloured ribbon (one colour per loop of a
link) or as a single broken line, and prints its name and how many times it
crosses itself. An option makes every strand go over, under, over, under
in turn: an alternating knot, the look of Celtic knotwork.

## How to use it

Colour the ribbons. In the line-art version each ribbon piece is a closed
shape, so it can be shaded on its own or traced as one continuous colour
through the crossings. Follow a strand with a finger, or a pencil, to find
out whether the picture is one loop or several. Count the crossings and
check the number printed underneath. Teachers can use the torus knots to
show how T(2, 3), T(2, 5) and T(2, 7) grow, and the alternating option to
start a conversation about why some knots cannot be drawn alternating.
Bold ribbon knots also make striking minimalist prints.

## Purpose

Knot diagrams sit between mathematics and ornament: Celtic interlace,
sailors' knots and the pictures in knot-theory books all use the same
over-and-under convention. Generating them from real space curves makes
every diagram a genuine knot or link, every crossing honest, and the
crossing count printed on the page a true count of what is drawn.

## History

Lord Kelvin's 1867 idea that atoms might be knotted vortices sent Peter
Guthrie Tait to tabulate knots by crossing number, with Thomas Kirkman and
Charles Little. Torus knots were among the first families studied. Emil
Artin introduced braids in 1925, and Alexander's theorem (1923) shows that
every knot is a closed braid. Lissajous knots were introduced by Bogle,
Hearst, Jones and Stoilov in 1994. Kauffman's and Thistlethwaite's work in
the 1980s settled Tait's old conjectures about alternating diagrams.

## This implementation

- **Spec knobs:** `family` (`random` default, `torus`, `lissajous`,
  `braid`), `p`, `q` (torus; 0 = a seeded pick from a pool of knots and
  links), `strands` (braid, 3–5) and `length` (braid word length = number of
  crossings, 4–20), `style` (`ribbon` default, `line`), `alternating`,
  `band` (ribbon width in points, default 16), `line` (outline or line
  weight), `palette` (`jewel`, `celtic`, `primary`, `ink`), `line_art`,
  `label`, `width`, `height`, `margin`.
- **Generation:** the space curve is sampled densely: T(p, q) as
  `(R + r cos θ)(cos φ, sin φ)`, `z = r sin θ`, with `φ = p′t`,
  `θ = q′t + 2πj/(d·p′)` for each of the `d = gcd(p, q)` components and a
  seeded tube radius. Lissajous knots use pairwise-coprime frequencies and
  seeded phases. A braid is a seeded word using every generator, with no
  letter beside its inverse, laid round an annulus. Each letter is an
  S-shaped swap of two neighbouring strands with depth `±sin`. Samples are
  offset by an irrational fraction so none sits exactly on a symmetric
  crossing. The projection to the page is searched for crossings with a
  grid-hashed segment sweep, on closed parameter intervals with
  de-duplication, so a crossing through a shared sample is counted once.
  The strand with the greater depth goes over. A projection is accepted
  only if every crossing meets at 20° or more, the two depths differ
  clearly, no two crossings crowd each other and no segments overlap.
  Otherwise the seeded parameters are redrawn. The alternating option
  reassigns over and under along each component, searching the start
  parities of the components so that both strands at every crossing agree.
  Each component is cut at its under-crossings into pieces, the cut
  reaching `w/(2 sin α)` plus a margin either side, so the under strand
  stops clear of the over strand's band. Ribbon pieces are offset to both
  sides (mitred normals) into closed bands. A loop that never goes under
  becomes a ring with its hole. The band width is capped at the curve's
  smallest radius of curvature divided by 1.2 and at 30% of the closest
  crossing spacing, then shrunk by 15% steps until no band outline crosses
  itself or another.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and seeds differ. Every
  crossing is transversal (at least 20°) with the over strand truly
  higher, no segments overlap, and the band half-width respects the
  curvature limit. Band outlines are pairwise disjoint and simple, checked
  segment against segment across families and seeds. The printed crossing
  count is the computed one, and it matches theory: q(p − 1) crossings and
  gcd(p, q) components for T(p, q) (all of one sign, a positive braid),
  `2ab − a − b` for a Lissajous diagram with frequencies a, b, and one per
  letter for a braid closure. Finding crossings again on the reversed
  curves gives the same count. The alternating option makes every
  component alternate, T(2, q) alternates as drawn and T(3, 4) does not. In
  line style there is one piece per under-crossing and every gap clears
  the crossing. Line-art ribbons pass the adult colourability gate. Meta
  reports crossings, components, writhe, whether the diagram alternates,
  the smallest crossing angle and the final band width. A page takes a few
  hundredths of a second.
- **Caveats:** the crossing count is that of the diagram drawn, not the
  knot's crossing number. A closed braid can be a simpler knot than its
  word suggests, and the name says only "closed braid knot" or "link".
- **Versions:** 1.1.0 — setting only one of `p` and `q` for a torus knot
  keeps it and lets the seed pick the other (before, a lone `p` or `q` was
  ignored). Pages with both or neither set are unchanged.
