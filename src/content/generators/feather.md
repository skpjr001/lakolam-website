---
title: "Feathers"
blurb: "Feathers drawn barb by barb — flight, contour, tail, down, peacock and owl — with bars, spots, eyes and splits"
category: design
version: "1.0.0"
---
Feathers drawn the way they grow: hundreds of fine barbs, each one
coloured along its length.

## What it is

A feather is a central shaft with a vane on each side, and each vane is
made of hundreds of thin barbs zipped together. The pattern on a feather -
bars, spots, a peacock's eye - is not painted on: each barb carries its own
stripe of colour, and side by side they make the picture. These pages draw
feathers barb by barb, with the bare quill at the base, the soft down
above it, the barbs sweeping toward the tip, and the little splits where a
few barbs have come unzipped.

Six kinds: a lopsided wing (flight) feather, whose front vane is narrow; a
rounded body (contour) feather; a long tail feather; a fluffy down feather;
a peacock's eye feather; and a soft, barred owl feather. A page shows one
large feather, a specimen plate of several, or a fan.

## How to use it

- **Frame it.** The colour feathers are made to hang, singly or as a set.
- **Colour it.** The outline version divides each vane into bands to colour
  in stripes, like a real barred feather.
- **Look closely.** Find the splits. Find where the down ends and the
  zipped vane begins. On the flight feather, which side faces forward in
  flight? (The narrow one.)
- **Compare with real feathers.** Lay a found feather beside the page and
  look at it with a lens: the barbs, and the tiny barbules that hook them
  together, are all there.

## Purpose

Feathers are a small marvel of structure and colour that most people only
glance at. Drawing every barb shows how a vane is built and how a pattern
emerges from many lines - and makes a delicate, detailed print.

## History

Feathers fascinated early microscopists: Robert Hooke drew a feather's
barbs and barbules in *Micrographia* (1665). Natural-history plates of the
18th and 19th centuries laid out feathers as specimens, and John James
Audubon and others painted them barb by barb. The asymmetry of flight
feathers was used by Feduccia and Tordoff (1979) to argue that
*Archaeopteryx* could fly. Modern work on how feather patterns form along
barbs includes Prum and Williamson's reaction-diffusion models (2002).

## This implementation

- **Spec knobs:** `kind` (`auto` default, `flight`, `contour`, `tail`,
  `down`, `peacock`, `owl`), `layout` (`single` default, `plate`, `fan`),
  `feathers` (2-12, plate and fan only), `pattern` (`auto` default - the
  kind's own - `plain`, `bars`, `spots`, `ocellus`, `barring`), `splits`
  (0-8 per feather), `barb_spacing` (1-4 pt), `style` (`colour` default,
  `ink`, `colouring`), `line`, `width`, `height`, `margin`.
- **Generation:** the rachis is a cubic with a seeded bend, parameterised by
  arc length `s`. Each kind has a half-width profile `w(s) = W·u^rise·
  sqrt(1 - u^tip)` per side (flight 0.07 vs 0.17 of the length; a peacock's
  adds a Gaussian swell for the eye). Barbs leave every `barb_spacing`
  points (2.6 times wider on a peacock's lower shaft) at an angle that
  falls from base to tip, and end on the outline at
  `e(s) = s + w(s)·cot α(s) / L`, forced increasing, capped at
  `1 - 0.35(1 - s)` near the tip; each is a quadratic leaving at its angle,
  straightening over the last 15%. A split shifts a run of barb ends
  tipward by 0.6-1.6% of the length, easing back over 2.5 shifts. Below the
  vane, downy barbs wander and curl; just above it, barbs stay downy at
  their bases. Each barb is cut into pieces about 3 pt long and each piece
  is coloured by the pattern at its place (along the shaft, across the
  vane, and for the eye in the feather's own frame: nested ellipses), with
  a darker inner vane and pale tip. Feathers are fitted to their cell,
  regrown at the size that fits what actually grew; a fan shares one base
  and opens to suit the page.
- **Solving:** Nothing to solve.
- **Guarantees:** every barb starts on the rachis and ends exactly on the
  vane outline; barbs on the same side never cross outside a split (tested
  against their five next neighbours); flight feathers have a narrow-to-wide
  vane ratio under 0.6 and contour feathers over 0.9; deterministic per
  seed; ink inside the page. `verification: barbs_end_on_vane_outline`.
  Clamped `feathers`, `splits` and `barb_spacing` are reported as
  `requested_*`.
