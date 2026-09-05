---
title: "String Art"
blurb: "String art — modular chord envelopes, cardioids and their kin"
category: design
version: "1.0.0"
---
Threads between pins on a circle: pin `i` connects to pin `i·k mod n`, and
the chords envelope a curve the thread never draws.

## What it is

The multiplication table on a circle. `k = 2` envelopes the cardioid, `k = 3`
the nephroid, and each higher multiplier adds a cusp; layered multipliers
(distinguished by line weight, the print-safe stand-in for thread colour)
build the familiar layered nail-and-thread look.

## History

Curve stitching was invented by Mary Everest Boole in the late 19th century
as a way to teach children the geometry of envelopes; the modular
multiplication form became a mid-20th-century string-art and classroom
staple, and the cardioid-in-a-mug connection keeps it alive in mathematical
folklore.

## The implementation's guarantees

- The chord count is measured, not `pins × layers`: `i·k ≡ i (mod n)` has
  `gcd(k−1, n)` fixed points and those threads do not exist — a test pins the
  arithmetic (100 pins, k = 51: fifty chords, not ninety-eight).
- Ink is the negotiation: the escalation ladder thins the thread to the
  0.75 pt validator floor and then halves the chord density. Every stroke
  weight stays at or above the floor — the first version thinned past it and
  the validator said so.
- Rating basis: none — a design. Honesty fields: pins, multipliers, the
  drawn chord count, and the attempt the page settled at.
