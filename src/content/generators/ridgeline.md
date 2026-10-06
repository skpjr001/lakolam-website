---
title: "Ridgelines"
blurb: "Ridgelines — stacked profiles with exact hidden lines: pulsar plots, surfaces, mountains"
category: design
version: "1.0.0"
---
Stacked profiles that hide one another: the Unknown Pleasures pulsar plot,
wire-frame landscapes and layered mountains.

## What it is

Draw a wavy line, then another a little higher up behind it, and another,
each one hidden wherever a line in front rises above it. A stack of plain
graphs turns into a landscape. Joy Division's *Unknown Pleasures* cover, the
radio pulses of the first pulsar ever found, is the most famous example. The
same trick draws a 3-D surface from two crossing sets of lines, and a
mountain range from a few silhouettes fading into the distance.

## How to use it

- **Pulsar (the default):** white lines on black, a print as it stands. The
  black-on-white version is quiet enough to hand-colour the gaps between
  lines.
- **Surface:** a mathematical landscape seen from above at an angle. Choose
  from ripples spreading from a dropped stone, smooth hills, rugged terrain,
  or an egg crate. Fold-overs show their undersides, as a real mesh would.
- **Mountains (colour):** a finished poster. Ridges fade from dark in front
  to pale in the distance, with the sun behind them.
- **Mountains (line art):** a colouring page. Every ridge band is its own
  region, and the sun and its two halo rings sit behind the peaks. Colour
  from dark in front to light at the back for depth, or invent a sunset.

## Purpose

Prints and colouring pages with the clean, graphic look of the
hidden-line plot, the first way computers ever drew 3-D pictures. It also
works as a talking point in data and maths classes: these are graphs, just
stacked.

## History

The pulsar CP 1919 was discovered by Jocelyn Bell Burnell and Antony Hewish
in 1967. Harold Craft plotted 80 successive pulses of it as stacked,
hidden-line profiles for his 1970 PhD thesis at Cornell. The figure was
reprinted in the *Cambridge Encyclopaedia of Astronomy*, and Peter Saville
used it for Joy Division's 1979 album *Unknown Pleasures*. Hidden-line
surface plots go back to the 1960s and 1970s. The floating-horizon algorithm
(Williamson 1972; Wright 1973; later described by Rogers in *Procedural
Elements for Computer Graphics*) made them practical on pen plotters, where
every line drawn costs time and ink. Layered silhouettes are much older,
from the receding ridges of Chinese shan shui painting and Hokusai's prints.

## This implementation

- **Spec knobs:** `mode` (`pulsar` | `surface` | `mountains`, default
  `pulsar`); `rows` (0 = 64 pulse profiles, a 45 × 45 mesh, or 6 ridges;
  clamped to 20–100, 12–80 and 3–12); `function` (surface: `auto` | `sinc`
  | `hills` | `terrain` | `egg_crate`); `amplitude` (0.2–3); `camera`
  (surface elevation in degrees, 10–70, 0 = seeded 24–40); `fill` (pulsar
  and surface: light on a dark ground; mountains: a colour print instead of
  line art; default true); `width`, `height`, `stroke` (pt).
- **Generation:** the floating horizon is a piecewise-linear envelope stored
  as sorted breakpoints. It can have gaps where nothing is drawn yet, and
  jumps, stored as two breakpoints at one `x`. To clip a segment, the
  breakpoints of the horizon inside it split it into pieces on which both
  are linear, and each piece has at most one crossing, found by one
  division. That makes the clip exact, with no sampling or tolerance bands.
  Raising the envelope (`U ← max(U, segment)`) inserts the crossings and
  the jumps at the segment's ends. Pulsar rows are a seeded value-noise
  baseline plus two to five Gaussian pulses bunched near a seeded centre
  under a Gaussian envelope, drawn front (bottom) to back against the upper
  horizon. Surfaces are projected with a seeded azimuth (25–65°, either
  side, so neither mesh direction is vertical), the chosen elevation and a
  perspective divide. Every mesh edge is processed in order of depth
  (Wright's wavefront order) and clipped against both an upper and a lower
  horizon. The lower one is kept as the upper horizon of the mirrored
  drawing. Mountains are ridged value noise (`Σ aᵢ(1 − |nᵢ|)²`, five
  octaves), with nearer layers lower on the page, taller and busier. Each
  visible piece of a ridge, together with the horizon beneath it, closes
  into a band polygon. A band under the 40 mm² floor is dropped as a sliver,
  and the horizon is not raised there, so no gap opens. The sun and two halo
  rings are clipped against the final horizon. Colour mountains paint the
  sky, the sun discs, then the bands, with colours mixed from near to far
  by depth.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and different seeds give
  different pages in every mode. Hidden lines are really hidden, checked by
  brute force independently of the algorithm. On pulsar pages every drawn
  point is on or above every nearer row, and every sampled point that clears
  all nearer rows is drawn. For random segments clipped against
  upper-and-lower horizons, no drawn point falls strictly inside the
  envelope of earlier segments. The horizon keeps every vertex of a raised
  polyline exactly (to 1e-9), keeps gaps open, and handles jumps. Mountain
  bands are closed polygons at or above the area floor, and line-art
  mountain pages pass the ADULT colourability gate across seeds. Meta
  reports `hidden_line_removal: "floating_horizon_exact"`, the counts of
  visible pieces, regions and dropped slivers, and `smallest_region_mm2`.
  `colorable` is reported for mountain line art and is `null` for the
  print styles. A page takes under 0.1 s in release builds.
- **Caveats:** for surfaces, depth order by edge midpoint is the classic
  floating-horizon approximation. It is exact for the clip it performs, but
  on very steep or folded surfaces an edge can be drawn before a nearer one
  that would hide it. The gentle default functions and elevations stay
  clear of that. Pulsar and surface pages have no closed regions and are
  prints rather than colouring pages.
