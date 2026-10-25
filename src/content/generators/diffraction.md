---
title: "Fraunhofer Diffraction"
blurb: "Fraunhofer diffraction: the far-field light of polygon, circle and slit apertures and their arrays"
category: design
version: "1.0.0"
---
The light a laser throws on a far wall after passing through a tiny hole —
rings, stars and lattices of spots, computed exactly.

## What it is

When light passes through an opening only a few wavelengths wide it does not
cast a sharp shadow: it spreads, and the waves from different parts of the
opening add up or cancel on the far wall. The bright and dark pattern that
results is the opening's *Fraunhofer diffraction pattern*. A round hole gives
the Airy disc and its rings; a polygon gives a star with twice as many arms
as sides when the sides are odd; two slits give Young's fringes; a lattice of
holes gives a lattice of spots inside the pattern of one hole. Each page draws
one such pattern as bands of brightness, with the opening that made it shown
small in the corner.

## How to use it

Hang it as a print, or use it to see how shape becomes light. Compare the
corner picture with the pattern: the long edges of a rectangle throw long
streaks at right angles to themselves; a triangle's three edges make a
six-armed star; the more holes in a lattice, the sharper its spots. The colour
pages mix three laser colours — red spreads widest, blue least — so each ring
fringes like a rainbow. The line-art version is a colouring page: every band
between two lines is a region to fill, darker towards the edge, lighter
towards the centre.

## Purpose

Textbook physics as wall art, and an exact one: nothing is drawn by eye or by
an approximate numerical transform. It also documents a canvas lesson —
there is no transparency, so overlapping coloured light is reproduced by
filling each region with the additive mixture it would have had.

## History

Francesco Maria Grimaldi named diffraction in 1665. Thomas Young's two-slit
experiment (1801–1803) showed light was a wave, and Augustin-Jean Fresnel's
prize memoir of 1818 explained diffraction quantitatively. Joseph von
Fraunhofer measured far-field patterns of slits and gratings in 1821–1823,
and George Biddell Airy derived the pattern of a circular aperture in 1835
("On the Diffraction of an Object-glass with Circular Aperture",
*Trans. Cambridge Phil. Soc.* 5). The edge-sum formula for polygons follows
from Green's theorem; see e.g. Lee & Mittra, "Fourier transform of a
polygonal shape function", *Applied Optics* 22 (1983).

## This implementation

- **Spec knobs:** `aperture` (auto, polygon, star, rectangle, slit_pair,
  circle), `sides` (3–12, 0 = seed), `array` (auto, single, pair, square,
  hexagonal, random, ring), `holes` (2–60, 0 = seed), `style` (colour, bands,
  lines), `palette` (auto, spectrum, ember, aurora, gold, ice), `levels`
  (3–24), `decades` (1–8), `zoom` (0.25–4), `width`, `height`.
- **Generation:** the seed picks the opening, its rotation and the array
  (random holes are placed by rejection with a minimum gap). The amplitude is
  exact: polygons by Green's theorem as a sum over edges
  (`F = (i/|q|²) Σ (q × e) e^{−iq·m} sinc(q·e/2)`), circles by the Airy
  function `2J₁(qa)/(qa)` with J₁ from its power series and Hankel's
  asymptotic expansion, arrays by the array factor `Σ e^{−iq·r}`. The page
  shows `log₁₀ I`, normalised to the central peak, at evenly spaced levels
  over `decades` decades; the scale is chosen so the faintest light shown
  reaches the corners (most directions for polygons, the longest streak for
  rectangles and slits). Half the grid is evaluated and mirrored, since
  `I(q) = I(−q)`. Levels are traced as closed loops on a grid clamped below
  the lowest level at the frame. In colour, three wavelengths (650, 532,
  450 nm) are evaluated; single openings are contoured on the mean of the
  three log-intensities so every colour's dark rings stay dark, arrays on the
  total light; each region is filled with the average additive mix of its
  samples. Bands use one wavelength and a dark-to-white ramp; lines draw
  fewer levels at twice the scale with regions under 40 mm² dropped, and are
  checked for colourability.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; every level loop closes; all ink
  inside the page (colour fills are clipped to it). Tests check the
  polygon formula's sign against a numerical integral, `I(0) = area²`
  (normalised to 1), the circle's first dark ring at `qa = 3.8317`, J₁
  against tables, 2n-fold symmetry for odd regular polygons and n-fold for
  even, and full-brightness lattice orders. Meta carries
  `"verification": "exact_fourier_transform"`.
