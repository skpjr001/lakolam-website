---
title: "Wakes on Still Water"
blurb: "Wakes on still water: Kelvin's 19.47° crests behind boats and ducks, and the rings of dropped stones"
category: design
version: "1.0.0"
---
Boats, ducks and dropped stones on a calm surface, every wake drawn to
Kelvin's exact 19.47° pattern.

## What it is

A view straight down onto still water. Anything that moves across deep
water at a steady speed leaves the same wave pattern behind it: curved
*transverse* crests running across its track, and short *divergent* crests
angled back along the edges, all inside a V whose half-angle is 19.47° —
for a duckling as for a ferry. Speed changes only the size of the pattern.
Each page shows a launch with its long wake, a regatta of boats whose wakes
cross into a lattice, a duck leading her ducklings in a line (each with a
little V of its own), or a pond with lily pads and the rings spreading from
dropped stones.

## How to use it

Hang it, frame it, or use it to start a conversation about waves: lay a
protractor on any wake and measure the angle between its edge and the
track — it is always about 19½°, however fast the boat was going. Count the
crests behind a boat and compare them with a duck's: the duck's are closer
together because the duck is slower. The black-and-white version is a
colouring page; the wedges between crests and the spaces inside the rings
make good shapes to fill.

## Purpose

A page that is both calm and exact. The Kelvin wake is one of the few
everyday patterns with a precise mathematical shape that you can check on
any lake, and drawing it correctly — cusps, curved crests and all — is what
makes the picture read as water rather than as a sketch of it.

## History

William Thomson, Lord Kelvin, worked out the ship-wave pattern in 1887 ("On
ship waves", *Proceedings of the Institution of Mechanical Engineers*),
showing that waves of every length interfere so that only a wedge of
half-angle arcsin(1/3) ≈ 19.47° is disturbed. Horace Lamb's
*Hydrodynamics* (§256 in later editions) gives the crest curves used here.
Rabaud and Moisy (2013) showed that fast boats can leave narrower-looking
wakes, but the classic angle holds for the slow, deep-water case drawn
here. The ripple rings of a dropped stone are the circular cousin of the
same dispersive waves.

## This implementation

- **Spec knobs:** `width`, `height` (page, points, 200–3000); `scene`
  (auto, boat, regatta, ducks, pond); `crests` (1–30 behind each boat; a
  duck draws three quarters as many, a duckling half); `curved` (gently
  turning courses, or straight); `stones` (0–12 sets of rings, or null for
  the scene's own number: pond 4, ducks 1, boats 0); `stroke` (newest crest
  width, 0.75–4 pt); `style` (colour, lines); `palette` (auto, lagoon,
  dusk, jade, slate, azure). Clamped values are reported as
  `requested_<field>` in meta.
- **Generation:** crest *n* is the curve x = a cos ψ (1 + sin² ψ),
  y = −a sin ψ cos² ψ with a = nλ (λ = 2πU²/g, the wavelength set by the
  speed), ψ ∈ [−1.25, 1.25] rad with both cusps (tan ψ = 1/√2) sampled
  exactly; the divergent arms stop short of the bow, where all crests
  collapse together. A course is a polyline laid backwards from the source
  in legs of constant curvature; a crest point (x, y) is placed x back along
  the course and y across it, so a straight course gives Kelvin's pattern
  exactly and a turning one bends with it. Curvature is held below
  0.07 / (half-width of the widest crest) for boats and 0.2 / … for ducks,
  so the inside of a turn never folds. Older crests are thinner and mixed
  towards the water colour (the page has no transparency). Ducklings follow
  their mother's course at seeded spacings; one that would leave the page is
  not drawn. Boats are placed by the best of 24 seeded tries at keeping the
  wake on the page and away from the other boats. The seed also chooses the
  scene and palette when `auto`, the speeds, headings, stones, lily pads and
  the light glints on the water.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; every straight wake's envelope
  half-angle is 19.47° ± 0.1° (tested on every crest of every source); crest
  n crosses the track exactly nλ behind the source; all ink is clipped to
  the page; the line-art style reports the colourability check as
  `colorable`.
