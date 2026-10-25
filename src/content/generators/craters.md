---
title: "Moonscape"
blurb: "Moonscape: power-law craters laid down oldest first, each rim erasing the line work inside it, hatched away from the light"
category: design
version: "1.0.0"
---
A cratered lunar surface engraved impact by impact, oldest first, so every
young crater cuts cleanly through the older ones beneath it.

## What it is

A page of the Moon: either a rectangle of ground seen from straight above,
or the whole disc, where craters near the edge are squeezed into ellipses
because they are seen at a slant. Small craters are simple bowls; larger
ones have terraced walls, a skirt of thrown-out rock and a central peak; the
largest are ringed basins with dark, flooded floors. A few of the youngest
throw long bright rays across everything older. Every crater is shaded the
same way the real ones are under a low Sun — a dark shadow inside on the
side facing the light, a lit far wall, and a shaded outer slope away from
the light. Smooth dark plains, the "seas", lie underneath it all.

## How to use it

Frame it, or read it like a geologist. Where two craters overlap, the one
whose rim is unbroken is the younger: it landed on top and wiped out the
part of the older one inside it. Pick any crater and work out which of its
neighbours came before it and which after. Count the craters of different
sizes — the small ones vastly outnumber the large ones, by about four times
for every halving of size. The outline style has bold rims and fewer, larger
craters for colouring: shade the shadow side of each one dark and the far
wall light, and the page turns three-dimensional.

## Purpose

Generative art whose rules are the Moon's own: impacts arrive at random,
their sizes follow the power law measured on the lunar highlands, and the
order in which they land decides what survives. It shows how a surface keeps
a record of time — the principle of superposition that lets geologists date
lunar terrain by counting and overlapping craters — and how crater shape
changes with size.

## History

Galileo drew the Moon's craters in *Sidereus Nuncius* (1610); Robert Hooke
dropped bullets into wet clay to make them in *Micrographia* (1665), and
James Nasmyth and James Carpenter's *The Moon* (1874) set the engraved,
low-Sun look this page borrows. G. K. Gilbert argued for impacts in 1893;
Eugene Shoemaker proved it in the 1960s and, with the Apollo-era mappers,
turned overlapping craters into a clock. The cumulative size law
N(>D) ∝ D⁻² for the saturated highland crater population follows W. K.
Hartmann's crater-count work ("Lunar cratering chronology", *Icarus* 13,
1970) and D. E. Gault's saturation experiments (1970). The simple → complex
→ multi-ring-basin sequence follows H. J. Melosh, *Impact Cratering: A
Geologic Process* (1989).

## This implementation

- **Spec knobs:** `view` (auto, patch, disc), `style` (hatch, stipple,
  outline, tone), `count` (0 = a saturated surface: 1,400 on a patch, 1,800
  on the disc, 200/260 larger craters in the outline style; 10–4,000),
  `largest` (largest crater as a fraction of the field width; 0 = 0.3 on a
  patch, 0.24 on the disc; 0.05–0.6), `light_deg` (direction the light comes
  from, counter-clockwise from the right), `rays`, `palette` (auto, sepia,
  graphite, slate, ink), `width`, `height`.
- **Generation:** diameters come from the truncated power law
  D = D_min / √(1 − U(1 − (D_min/D_max)²)), so N(>D) ∝ D⁻². Centres are uniform
  over the patch (and a margin round it, so edge craters are cut by the
  frame) or uniform over the visible hemisphere, where each crater's radial
  axis is foreshortened by the cosine of its angle from the disc centre. Ages
  are a uniform draw weighed against size, so big craters tend to be old.
  One to three maria (unions of overlapping discs) and a fine grain are laid
  down first. Then, oldest first, each crater cuts away every older line,
  dot and grain inside its rim — clipping in the crater's own frame, where
  its rim is the unit circle — and draws itself: a paper-coloured floor, the
  inner shadow crescent (the rim disc minus a copy shifted away from the
  light), the outer slope away from the light, terraces, peak and ejecta or
  basin rings by size, a rim heavy on the sunward half and light on the
  other, and rays for up to four of the youngest eighth. Shading is
  parallel hatching (cross-hatched in large craters, solid in small ones),
  jittered-grid stipple, flat tones, or nothing (outline). Everything is
  finally clipped to the frame or the disc. The seed picks the view and
  palette when `auto`, and every placement.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; no line, dot or grain of an older crater
  (or of the ground) survives inside the rim of any younger crater (tested
  by sampling every drawn segment against every younger rim); crater sizes
  follow the inverse-square cumulative law (least-squares log–log slope
  within 0.15 of −2 on 4,000 craters, within 0.05 for the sampler alone);
  morphology matches the size bands; disc craters are foreshortened by
  exactly √(1 − ρ²); the ink palette is grey only; clamped `count` and
  `largest` are reported as `requested_count`, `requested_largest`; the
  outline style reports its colourability check (`colorable`); everything
  stays inside the page.
