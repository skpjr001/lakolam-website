---
title: "Photo Parametric"
blurb: "A picture (an upload or a built-in silhouette) redrawn as one Fourier-series curve with its epicycles, rows of darkness-modulated waves, or one modulated spiral"
category: design
version: "1.0.0"
---
Your picture redrawn as mathematics: one Fourier curve spun by circles, rows
of waves that swell with shadow, or a single spiral that wiggles into a
portrait.

## What it is

A page that turns a picture into a curve. Upload a photo or drawing (or use
one of the built-in silhouettes) and choose how it is redrawn:

- **Fourier** — the outlines in the picture are traced into one closed loop,
  and the loop is rebuilt from a sum of turning circles. With few circles the
  shape is soft and rounded; with more it sharpens towards the original. The
  circles themselves can be shown, chained arm to arm, caught at one moment
  as they draw.
- **Waves** — rows of sine waves across the picture. Where the picture is
  pale the line runs flat; where it is dark the wave swings wide, so from a
  distance the rows read as shading.
- **Spiral** — one line from the centre outwards, round and round, wiggling
  wider over the dark parts of the picture.

Each comes in black line art or in colour, with the colour running along the
curve.

## How to use it

Pick a picture with a clear subject and strong contrast: a face lit from
one side, an animal against the sky, a bold logo or a silhouette. For the
Fourier curve, outlines matter most, so simple shapes give the cleanest
loops; try a few numbers of circles and watch the drawing sharpen. For the
waves and the spiral, tone matters most, so a photo with deep shadows and
bright highlights works best. Step back from the page to see the picture
appear.

The Fourier line art is a closed loop whose crossings make regions you can
colour; colour the shape and the gaps between its curls in alternating
shades. The waves and the spiral are open lines for display or framing.

## Purpose

To show, on paper, two big ideas from mathematics and printing. Any closed
outline, however complicated, can be drawn by adding up circles that turn at
whole-number speeds; this is the Fourier series, and the page makes it
visible. And a single line can carry a whole photograph if its wiggle grows
with the darkness under it; this is line halftoning, the trick behind
engravings and pen-plotter portraits. It also turns a family photo into a
one-of-a-kind print.

## History

Joseph Fourier claimed, in his *Théorie analytique de la chaleur* (1822),
that any function could be written as a sum of sines and cosines; making
that precise occupied mathematicians for the rest of the century. Written
with complex numbers, each term of a Fourier series is a circle turning at a
whole-number speed, and the sum is a chain of circles on circles — the
epicycles of Ptolemy's *Almagest* (2nd century AD), which modelled the
planets that way. Norwood Russell Hanson's "The Mathematics of Epicycles"
(*Isis*, 1960) pointed out that enough epicycles can trace any closed path,
and in the 2010s animations of Fourier epicycles drawing outlines became a
popular way to teach the idea, notably Mathologer's "Epicycles, complex
Fourier series and Homer Simpson's orbit" (2018) and 3Blue1Brown's "But what
is a Fourier series?" (2019).

The outlines are found with the 3x3 gradient operator Irwin Sobel and Gary
Feldman presented at the Stanford Artificial Intelligence Laboratory in
1968, thinned by the non-maximum suppression step of John Canny's edge
detector (1986).

A single line that renders a picture is older still: Claude Mellan's
engraving *The Sudarium of Saint Veronica* (1649) draws a face with one
spiral line that swells and thins. Modulating a line's wiggle rather than its
width suits pens and plotters, whose line has a fixed weight; amplitude-
modulated "squiggle" and spiral drawings became a staple of pen-plotter art
in the 2010s.

## This implementation

- **Spec knobs:** `image` (a PNG or JPEG as a data URL or base64; empty uses a
  built-in silhouette chosen by the seed), `mode` (fourier, waves, spiral),
  `style` (line, colour), `palette` (sunset, ocean, forest, berry, rainbow,
  ink_blue; colour style only), `width`, `height`, `margin`, `stroke`
  (0.3-4 pt). Fourier: `terms` (8-500), `epicycles`, `epicycle_time`
  (0-1 of one trip round), `echoes` (0-4 fainter curves from a quarter, a
  sixteenth… of the terms), `edge_threshold` (0.02-0.9). Waves: `rows`
  (8-200). Spiral: `turns` (8-150). Waves and spiral: `wavelength`
  (1.5-40 pt), `frequency_follows`. Out-of-range numbers are clamped and
  reported as `requested_<field>`.
- **Generation:** the picture is decoded at a working size of at most 320 px
  on its longer side (silhouettes are drawn at 320 px square), stretched so
  its lightest pixel is paper and its darkest is full ink, and fitted to the
  page inside the margins with its aspect ratio kept, centred. *Fourier:* a
  1-2-1 blur, the Sobel gradient, a threshold at `edge_threshold` of the
  strongest edge and non-maximum suppression give one-pixel edges; they are
  walked into 8-connected chains (side steps before diagonals, so no corner
  pixel is stranded), chains under 6 px are dropped, the longest are kept up
  to 4,200 px, and the chains are joined into one closed tour by repeatedly
  jumping from the current end to the nearest chain end. The tour is
  resampled at 2,048 points of equal arc length, transformed by a direct
  DFT, and the constant term plus the `terms - 1` largest coefficients
  (ties to the lower frequency) are summed at 4,096 times to draw the curve.
  Epicycles are drawn in that order at `epicycle_time`: the arm through every
  centre to the pen, and every circle of radius at least 10.5 pt in line style
  (smaller circles would be regions under the 40 mm² colouring floor) or 2 pt
  in colour. If Gibbs overshoot or a large circle would cross the margin,
  everything is shrunk uniformly to fit, centred. *Waves:* row i is
  y = y_i - A d sin(phi) with A = 0.45 of the row spacing, d the darkness
  (three taps across the row) and phi integrated along x at 2 pi f(d) /
  `wavelength`, f = 1 (or 0.5 + d with `frequency_follows`), 12 samples per
  shortest wave, flat runs merged. *Spiral:* r = p theta / 2 pi out to the
  largest circle inside the picture frame, p = radius / `turns`, pushed out by
  0.45 p d sin(phi), fine steps over ink and coarse ones over paper. Colour
  style cuts the curve into 128 runs coloured by place along the curve
  (fourier), by radius (spiral) or by row (waves). The seed only chooses the
  silhouette: an upload draws the same page at every seed.
- **Solving:** nothing to solve — a design to colour or display.
- **Guarantees:** deterministic per picture, spec and seed; meta records the
  source (`upload` with its pixel size and an FNV-1a hash of the file, or
  the silhouette id) and what reproduces the art exactly — for Fourier every
  kept coefficient [k, re, im] in page points with the formula, for waves and
  spiral the formula and its constants. Tested: the DFT of a sampled circle
  is exactly its centre and one k = 1 term; the reconstruction error falls
  monotonically as terms rise and equals the energy of the dropped terms
  (Parseval); all 2,048 terms reproduce the sampled path to 1e-7 pt; the
  epicycle pen lies on the drawn curve; a traced disc is (almost) a single
  k = 1 circle; a silhouette's edges are one pixel wide; the wave and spiral
  wiggle never exceeds 0.45 of the spacing times the darkness and its mean
  rises band by band with darkness; neighbouring wave rows never touch; all
  ink lies inside the margins; line style is pure black. The default line
  page (Fourier) passes the adult colourability check; the Fourier curve's
  crossings make its regions, though the check cannot see slivers where
  `echoes` run close to the main curve. **Waves and spiral line pages are
  not colouring pages:** they are open lines with no closed regions, and meta
  says `colorable: false` with a note. A picture that is not a PNG or JPEG,
  is too large, or (in Fourier mode) has no edges is refused with a clear
  message.
