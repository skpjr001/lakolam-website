---
title: "Labyrinth"
blurb: "Unicursal labyrinths — one corridor, classical or seeded, proven single-path"
category: design
version: "1.0.0"
---
One corridor, folded into concentric circuits, leading from the entrance to
the centre. No junctions, no dead ends, no decisions — a labyrinth is walked
or traced, not solved.

## What it is

A unicursal (single-path) design in the classical tradition: `n` concentric
circuits with every turn stacked on one axis. The corridor visits each
circuit exactly once, in an order — the *level sequence* — that determines
the labyrinth's whole character. The famous Cretan pattern is the sequence
`3, 2, 1, 4, 7, 6, 5` over seven circuits: in to the third circuit, out to
the first, then inward to the seventh and back to the fifth before the
centre.

## How to use it

Trace the corridor with a finger or pencil from the entrance to the centre —
there is exactly one way — or colour the corridor and the wall band as two
regions. The `meanders` figure in the metadata counts how often the path
reverses direction between inward and outward: a spiral scores 0, the
classical seven scores 2, and seeded designs usually score more.

## Why it is in the catalogue

The maze lane's unicursal cousin, and a category of its own in activity and
mindfulness books. It is a *design*, not a puzzle: the mandatory verification
is geometric — the built corridor is proven not to touch itself anywhere, and
the level sequence is proven valid — rather than a solver proving a solution
unique.

## History

The classical pattern is among the oldest abstract designs in continuous use:
it appears on a clay tablet from Pylos (c. 1200 BCE), on Cretan coins of the
4th century BCE — the association with the Minotaur myth named the whole
form — and carved and laid from Galicia to Gotland. The medieval church
tradition (Chartres cathedral's pavement labyrinth, c. 1201, is the canonical
example) elaborated it to eleven circuits with turns on four axes. The
single-axis family this generator draws is the classical one; the sequence
notation used here follows the labyrinth-typology literature (Kern,
*Through the Labyrinth*, 2000).

## The implementation's guarantees

- **Unicursal by construction and by check.** The level sequence is validated
  (each side of the axis must nest its turns like brackets), and the built
  corridor centreline is separately proven never to approach itself closer
  than 0.8× the ring pitch — the geometry and the sequence maths cannot share
  a mistake.
- **Classical style** uses the Cretan seed-pattern sequence where one exists
  for the circuit count (3, 7, 11, 15, 19); other counts fall back to a
  seeded valid sequence. Orientation and handedness still vary by seed, so no
  seed is dead.
- **Random style** searches the whole valid single-axis family with the
  seeded RNG — every page a different labyrinth with identical guarantees.
- **Colourability** is checked with the adult rules and the wall stroke thins
  on retry if ink coverage asks for it. The corridor is one enormous region;
  the wall band is another.
- Rating basis: none — there is no difficulty, which is the point. The
  honesty fields are the sequence itself, the meander count, and the corridor
  width in points.
