---
title: "Lyapunov Fractals"
blurb: "Lyapunov fractals: the logistic map switched between two growth rates by an A/B sequence, its exponent banded into order and chaos"
category: design
version: "1.0.0"
---
Order and chaos in two colours of light: smooth golden rivers and sharp
fins of stability cutting through a dark sea, all from one line of
arithmetic.

## What it is

A map of the logistic equation `x → r·x·(1 − x)`, the textbook model of a
population that grows and then crowds itself. Here the growth rate `r` is
switched between two values, `a` and `b`, by a repeating pattern of the
letters A and B — for example ABABAB… or AABAB AABAB… Every point of the
picture is one pair `(a, b)`: across is `a`, up is `b`. For each point the
population is followed for hundreds of generations and the **Lyapunov
exponent** is measured — how fast two nearly equal populations drift
apart. Where it is negative the population settles into a steady rhythm
(order, the light colours); where it is positive it never settles (chaos,
the dark colours). The page shades the ordered side in bands, from the
most stable at the deepest colour to the brink of chaos at the palest.

## How to use it

A poster or a page to look into. The pale edges of the bright shapes are
where order gives way to chaos; the thin fins and spikes that reach into
the dark sea are rhythms that survive inside chaos for a narrow range of
growth rates. The caption gives the letter pattern and the window of `a`
and `b` drawn. The **ink** palette gives the outlines alone, to colour in.

## Purpose

A design-lane page that turns a famous experiment in chaos into vector
art: every band is a closed, fillable shape, so the picture prints sharp at
any size. It complements the escape-time fractals (Mandelbrot and Julia
sets) with a fractal made from a real model of growth.

## History

Mario Markus and Benno Hess introduced these pictures in 1989–1990 to study
periodically forced population models ("Lyapunov exponents of the logistic
map with periodic forcing", *Computers & Graphics* 13, 1989), and Markus's
images in *Scientific American* (A. K. Dewdney, "Mathematical Recreations",
September 1991) made them famous. The exponent itself is Aleksandr
Lyapunov's (1892). "Zircon City", the sequence BBBBBBAAAAAA on
`a ∈ [3.4, 4]`, `b ∈ [2.5, 3.4]`, is one of the best-known views.

## This implementation

- **Spec knobs:** `view` (auto, classic, zircon_city, zoom), `sequence`
  (A/B letters, empty = chosen by the view or the seed), `palette` (auto,
  gold, lagoon, ember, orchid, ink), `bands` (ordered bands, 3–24),
  `iterations` (100–4,000, plus a warm-up of a third as many),
  `resolution` (grid samples across, 80–600), `frame`, `caption`, `width`,
  `height`, `margin`. Clamped values are reported as `requested_<field>`.
- **Generation:** the exponent λ(a, b) = mean of ln |r (1 − 2x)| over the
  orbit from x₀ = 0.4 after the warm-up, the derivatives multiplied eight at
  a time and logged once per eight steps; superstable points (λ = −∞) are
  floored at −8. The grid is cut into bands by marching squares: ordered
  levels at quantiles of the negative values (so bands have similar area),
  the zero level, and the median of the chaotic values (taken on a lightly
  smoothed chaotic field so the split follows the trend, not the sampling
  noise). The field is ringed with low samples so every level line closes,
  and the picture is clipped to its frame. The zoom view draws twelve
  candidate windows in `[2.6, 3.95]²` and keeps the one whose coarse sample
  best mixes order with chaos and spreads its exponents. The window is
  widened to the picture's shape. The line-art palette uses half the
  ordered bands and drops regions too small to colour.
- **Solving:** Nothing to solve.
- **Guarantees:** with `a = b` (or a single-letter sequence) the computed
  exponent matches the analytic one — ln |2 − r| on the fixed point,
  ½ ln |4 + 2r − r²| on the period-2 cycle, ln 2 at r = 4 — within 10⁻³
  (3·10⁻² at r = 4); swapping the letters and the axes gives the same
  exponent to 10⁻¹²; every level line closes; the zero level is always a
  band edge; all ink stays on the page; the default page takes well under
  two seconds; deterministic per seed.
