---
title: "Algebraic Curves"
blurb: "Real algebraic curves of degree 4-10: Harnack perturbations of lines and circles and Viro patchwork M-curves, filled by sign"
category: design
version: "1.0.0"
---
The ovals of a real polynomial curve, filled by sign: Harnack's and Viro's
constructions of the most beautiful answers to Hilbert's sixteenth problem.

## What it is

A real algebraic curve is the set of points where a polynomial in `x` and
`y` is zero. A curve of degree `d` falls apart into closed loops (ovals) and,
for odd degree, one line-like piece, and the plane between them splits into
regions where the polynomial is positive and regions where it is negative.
This page shades those regions in two colours, outlines the curve, and can
echo it with ripples — offset lines at equal distances, like the contour
lines along a shore.

Two constructions are drawn. **Perturbation** multiplies lines and circles
together (a degree-`d` curve made of simple pieces that cross) and adds a
tiny second polynomial, so that every crossing comes apart into two smooth
arcs. **Patchwork** builds a curve from a triangulated triangle of exponents
with a sign on every point; with Harnack's signs it has as many ovals as any
curve of its degree can have.

## How to use it

As a print, the regions read like a map of islands and lagoons: look for how
each crossing of the original lines has opened, and in a patchwork for the
little ovals standing in rows. As a colouring page (line style), colour the
regions in two alternating colours — neighbours across the curve always take
different colours, and that colouring is exactly the sign of the polynomial;
the ripple bands can be shaded lighter toward the curve. The caption names
the degree and, for a patchwork, how many pieces the curve has against the
most it could have.

## Purpose

To show real algebraic geometry as it is: the curves are true curves of the
stated degree, the colouring is the sign of their polynomial, and the patchwork
counts are exact — including M-curves, which reach Harnack's bound.

## History

Axel Harnack proved in 1876 that a curve of degree `d` has at most
`(d − 1)(d − 2)/2 + 1` components, and built curves reaching the bound by
perturbing a curve and a union of lines. David Hilbert (1891) refined the
method and asked, as the sixteenth of his 1900 problems, how the ovals of
such curves can be arranged; Gudkov settled degree 6 in 1969. Oleg Viro
invented patchworking around 1979–80 (*Gluing of plane real algebraic curves
and constructions of curves of degrees 6 and 7*, 1984), and its
combinatorial form — a convex triangulation with signs — was used by
Ilia Itenberg to disprove Ragsdale's conjecture (1993). See Viro,
*Patchworking real algebraic varieties* (arXiv math/0611382), and
Itenberg–Mikhalkin–Shustin, *Tropical Algebraic Geometry* (2007).

## This implementation

- **Spec knobs:** `width`, `height` (points); `method` (`auto`,
  `perturbation`, `patchwork`); `degree` (4–10, 0 = the seed picks 5–8);
  `signs` (`auto`, `harnack`, `random` — patchwork only); `ripples` (offset
  lines each side, 0–12); `style` (`colour`, `lines`); `palette` (`auto`,
  `lagoon`, `ember`, `indigo`, `sage`, `rose`, `ink`); `construction` (draw
  the lines and circles, or the triangulation and signs); `caption`;
  `stroke`.
- **Generation:** *Perturbation:* `F = Π Lᵢ + ε G` with `d − 2m` seeded
  lines and `m` circles (each factor written as its signed distance), laid
  out for the widest spacing between crossings. `G` is the minimum-norm
  polynomial of degree ≤ `d` taking a seeded sign at every crossing (which
  way that crossing opens), stiffened until the curve stays near its
  factors between crossings; `ε` is the largest value keeping every
  smoothing radius `√(2ε|G|/|P|)` inside a seeded fraction of the crossing's
  neighbourhood. `F = 0` is traced by marching squares and each point
  Newton-projected onto the curve; regions are the sign bands of `F/|∇F|`.
  *Patchwork:* a regular triangulation of the Newton triangle (lift by a
  strictly convex quadratic plus seeded noise, keep the lower faces;
  primitive, `d²` triangles), signs (Harnack: `+` where both exponents are
  even), reflected into four quadrants with signs `σ·ε₁ⁱε₂ʲ`; in every
  mixed triangle a segment joins the midpoints of the sign-changing edges.
  The square is drawn with one of its eight symmetries; the T-curve is
  rounded by four rounds of corner cutting (which stays inside the triangles
  it crosses) and the regions are the faces of its arrangement, 2-coloured.
  Ripples are level lines of the distance to the curve.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed. Perturbation: every drawn curve
  point satisfies `|F|/|∇F| < 10⁻⁶` and `F` changes sign across it (tested);
  each filled region has the sign of `F` (tested on a sample grid); the
  degree is exactly `d`; the ovals inside the frame never exceed Harnack's
  bound (tested). Patchwork: the triangulation is primitive and covers the
  triangle (tested); components are counted exactly in the projective plane
  (boundary points glued antipodally) — Harnack's signs give an M-curve for
  every degree 4–10 (tested) and random signs never exceed the bound
  (tested); the 2-colouring is proper and every lattice point lies in a
  region of its own sign (tested). `verification` in meta names the check;
  clamped knobs are reported as `requested_<field>`.
