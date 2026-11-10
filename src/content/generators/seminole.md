---
title: "Seminole-Style Patchwork"
blurb: "Patchwork bands in the manner of the Seminole and Miccosukee: strip sets cut, slid and re-sewn into diamonds, crosses, steps and lightning"
category: design
version: "1.0.0"
---
Bright bands of tiny diamonds, crosses, steps and lightning, pieced the way
Seminole and Miccosukee seamstresses piece them: strips sewn, cut, slid and
sewn again.

## What it is

A stack of patchwork bands in the manner of the Seminole and Miccosukee
peoples of Florida. Each band begins as a *strip set*: long strips of solid
cloth sewn together side by side. The set is cut across into short
segments, straight or at an angle, and the segments are sewn back together
edge to edge, each one slid a little along the seam, or turned end for end,
or alternated with segments from a second strip set. Out of nothing but
straight seams come rows of small repeating figures: checks, crosses with a
coloured heart, chains of diamonds, slanting steps, stepped lightning
zigzags, saw-tooth "fire" and scattered "rain". Narrow plain strips run
between the bands, some with a wavy rickrack braid sewn along them, the way
a skirt or a man's big shirt is built up band on band.

## How to use it

Read one band at a time and look for its repeat: the same few segments
come round again and again. Follow one colour through a band and you can
see how it was cut — a stripe that breaks into stairs was slid along each
seam; a diamond is a square of the middle strip stepped down one strip at a
time; a cross is three narrow segments from two strip sets. The colour
pages are ready to print; the line-art page outlines every patch of one
colour, so you can choose your own cloths and colour band by band. Try
strong contrasts — a dark ground with bright figures — as the makers do.

## Purpose

A rich, rhythmic page that shows how a simple, repeatable operation —
cut, slide, re-sew — produces a whole vocabulary of geometric ornament, and
an introduction to a living textile art of the American South-East.

## History

The Seminole and Miccosukee peoples of southern Florida took up the
hand-cranked sewing machine around 1900, buying machines and bolts of
cotton at trading posts. Women first decorated clothing with bands of
contrasting cloth and simple appliqué; the pieced technique, in which strip
sets are cut and re-joined into small repeating units, appeared in the
1910s and was well established by the 1920s, when tourist camps in Miami
brought it wider notice. The bands grew smaller, more numerous and more
intricate over the following decades, rickrack trim joined them, and
patchwork skirts, capes and men's "big shirts" remain a proud mark of
Seminole and Miccosukee identity, made today for family, ceremony and sale.
Many patterns carry names given by their makers — among them fire, rain,
lightning, crosses, diamondback and arrows. This page is Seminole-style: it
applies the construction to invented colourways and unit recipes, and
copies no maker's work. See Dorothy Downs, *Art of the Florida Seminole and
Miccosukee Indians* (University Press of Florida, 1995), and Beverly Rush
with Lassie Wittman, *The Complete Book of Seminole Patchwork* (Madrona,
1982).

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000; default 600 × 800);
  `bands` (patterned bands, 1-16, default 6); `motif` (`mixed` — a
  different unit per band, picked by the seed — or one of `checks`,
  `crosses`, `diamonds`, `steps`, `lightning`, `fire`, `rain` for every
  band); `style` (`bright`, `pastel`, `lines`); `rickrack` (sew rickrack
  along some plain strips; default on); `stroke` (seam and outline width,
  0.1-4, default 0.5).
- **Generation:** each band is a recipe — one to three strip sets (cloths
  and widths), a cut angle α shared by every seam, and one period of
  segments (strip set, width, slide along the seam, turned or not) plus a
  drift added each period. With seam direction `d = (sin α, cos α)` and seam
  normal `n = (cos α, −sin α)`, segment `j` covers `n·P ∈ [N_j, N_j + w_j]`
  and a point `P` of it came from depth `v = P.y + N_j sin α − s_j cos α` in
  its strip set (`H − v` when turned). The assembly is invariant under
  `T = W n + drift·d`; the band is trimmed parallel to `T` to the widest
  window the segments cover with no hole (from the affine depth at each
  segment's corners) and turned so `T` runs along the page. Every patch is
  an exact convex polygon, segment ∩ strip ∩ window, repeated by `T` and
  clipped to the page. Bands and plain strips are scaled together to fill
  the page height exactly. Line art merges same-cloth patches (polygon
  union) so the colourist sees the figures, not every seam.
- **Guarantees:** deterministic per seed. Each band is exactly the
  cut-and-slide result of its strip sets: at hundreds of points per band
  the drawn patch's cloth equals an independent re-simulation (find the
  segment, undo its slide, read the strip set), patches never overlap and
  their areas sum to the band's area, so there are no holes (tested). Each
  band repeats with the period it reports (`period_pt`, tested from the
  drawn patches). Bands and plain strips tile the page height from 0 to
  the page height with no gap (tested), and all ink is inside the page.
  `verification: bands_resimulated_periodic_tiling`. The line-art page is
  stroke-only at 1 pt by default; its `colorable` flag reports the adult
  colourability check honestly (small patches at the band edges and in
  the rain units fall under its 40 mm² floor). Clamped knobs are reported
  as `requested_<field>`.
