---
title: "String Art"
blurb: "String art — modular chord envelopes, cardioids and their kin"
category: design
version: "1.1.0"
---
Threads between pins on a circle: pin `i` connects to pin `i·k mod n`, and
the chords envelope a curve the thread never draws.

## What it is

The multiplication table on a circle. `k = 2` envelopes the cardioid, `k = 3`
the nephroid, and each higher multiplier adds a cusp; layered multipliers
(distinguished by line weight, the print-safe stand-in for thread colour)
build the familiar layered nail-and-thread look.

Two more thread pictures share the page (`mode`):

- **Maurer rose** — the rose `r = sin(nθ)` walked in steps of `d` degrees,
  361 points joined by straight threads, over the plain rose drawn in a
  heavier line. An even `n` gives `2n` petals, an odd one `n`.
- **Farris mystery curve** — a sum of circular motions,
  `z(t) = Σ aₖ·e^{i(fₖt + φₖ)}`. When every frequency leaves the same
  remainder modulo `m`, a turn of the parameter by `1/m` turns the whole
  curve by `1/m`: the curve has m-fold symmetry. Threads join each of `40m`
  points on the curve to a point a little further along it.

## History

Peter Maurer described his roses in 1987 ("A Rose is a Rose…", *American
Mathematical Monthly*); Frank Farris introduced the sums of circular motions
he called mystery curves in 1996 (*Mathematics Magazine*), as a way to see
symmetry arise from arithmetic on frequencies.

Curve stitching was invented by Mary Everest Boole in the late 19th century
as a way to teach children the geometry of envelopes; the modular
multiplication form became a mid-20th-century string-art and classroom
staple, and the cardioid-in-a-mug connection keeps it alive in mathematical
folklore.

## The implementation's guarantees

- **Spec knobs:** `pins`, `multipliers`, `rim`, `size`, `stroke`; `mode`
  (`modular` — the default and the original page — `maurer` or `farris`);
  for `maurer`, `rose_n` and `rose_d` (0 picks per seed; seeded steps are
  coprime to 360, so all 360 angles are visited); for `farris`, `symmetry`
  (3–12, 0 picks 3–9 per seed) and `terms` (2–5 motions, default 3).
- **Additive:** a spec without `mode` produces byte-identical pages to
  version 1.0 (checked over the default and three other specs for six seeds
  each). The curve modes draw only from their own streams
  (`stringart/maurer`, `stringart/farris`).
- **Curve geometry is tested:** every Maurer vertex lies on its rose, a step
  coprime to 360 visits all 360 angles and closes on the 361st point (a step
  sharing a factor visits fewer, and `angles_visited` says how many); every
  Farris frequency is ≡ 1 (mod m), at least one turns backwards (what folds
  loops through the middle), and `z(t + 2π/m) = e^{2πi/m}·z(t)` holds
  numerically, so the curve really has the m-fold symmetry the metadata
  claims. The thread layer uses a whole number of pins per 1/m turn of the
  parameter, so it is exactly as symmetric as the curve.

- The chord count is measured, not `pins × layers`: `i·k ≡ i (mod n)` has
  `gcd(k−1, n)` fixed points and those threads do not exist — a test pins the
  arithmetic (100 pins, k = 51: fifty chords, not ninety-eight).
- Ink is the negotiation: the escalation ladder thins the thread to the
  0.75 pt validator floor and then halves the chord density. Every stroke
  weight stays at or above the floor — the first version thinned past it and
  the validator said so.
- Rating basis: none — a design. Honesty fields: pins, multipliers, the
  drawn chord count, and the attempt the page settled at; for the curve
  modes, `mode`, `rose_n`/`rose_d`/`petals`/`angles_visited` or
  `symmetry`/`frequencies`/`chords`/`lag`.
