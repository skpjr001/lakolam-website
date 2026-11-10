---
title: "Gaussian Prime Gardens"
blurb: "Gaussian and Eisenstein prime gardens: the primes of the complex integers, their moats and their closed prime spirals"
category: design
version: "1.0.0"
---
The primes of the complex integers laid out as a garden: Gaussian primes on
a square grid, Eisenstein primes on a triangular one, with the moats that
separate them and the closed spirals that wind between them.

## What it is

Whole numbers have primes; so do the *Gaussian integers*, the points
`a + bi` of a square grid, which can be added and multiplied like ordinary
numbers. Some ordinary primes stay prime there: 3, 7, 11, every prime that
leaves remainder 3 when divided by 4. Others break into two factors: 5 is
(2 + i)(2 − i), 13 is (3 + 2i)(3 − 2i), every prime that leaves remainder 1.
The prime 2 is special, the square of 1 + i up to a turn. The *Eisenstein
integers* do the same on a triangular grid, where 3 is special, primes with
remainder 2 on division by 3 stay prime and those with remainder 1 split.

Plotted, the primes make a pattern with the symmetry of a square (turn it a
quarter, or flip it, and it looks the same) or of a hexagon (a sixth of a
turn, or a flip). The page shows them as tiles in a round bed, in one of
three ways:

- **Moat:** imagine hopping from prime to prime with steps no longer than a
  fixed length. The primes fall into islands you can cross by hops, and the
  gaps between islands are *moats*. Islands that are turned or flipped
  copies of one another share a colour.
- **Garden:** every prime as a tile, coloured by distance from the centre,
  by angle (mirrored in each slice, like a kaleidoscope), or by whether it
  is a split prime, a prime that stayed prime, or the special one.
- **Spiral:** walk in a straight line across the grid and turn left every
  time you land on a prime. Each walk drawn here comes back to where it
  started, heading the same way, and makes a closed, often lacy loop.

## How to use it

Print it as a poster; it reads at any size, from a classroom wall to a card.
On the moat page, find the island round the centre and see how far out you
could hop; try longer hops and watch the islands merge. Count how many
copies each coloured island has: eight on the square grid, twelve on the
triangular one, or fewer when an island lies on a line of symmetry. On the
garden page, check a few tiles by hand: 2 + 3i is prime because 4 + 9 = 13
is prime, 3 is prime but 5 is not. Trace a spiral with a finger and count
its turns.

## Purpose

To make a piece of number theory visible and checkable: which primes split,
why the picture has exactly the symmetry it has, and what the famous moat
question (can you walk to infinity on Gaussian primes with bounded steps?)
looks like close up.

## History

Carl Friedrich Gauss introduced the integers `a + bi` in his 1832 memoir on
biquadratic residues, *Theoria residuorum biquadraticorum*, where he showed
they factor uniquely into primes. That a prime p ≡ 1 (mod 4) is a sum of two
squares was stated by Albert Girard and by Pierre de Fermat (letter to
Mersenne, 1640) and proved by Leonhard Euler (1749). Gotthold Eisenstein
studied the integers of ℤ[ω] in the 1840s for cubic reciprocity. The
Gaussian moat problem, usually credited to Basil Gordon in 1962, asks
whether one can walk to infinity on Gaussian primes with steps of bounded
length; Ellen Gethner, Stan Wagon and Brian Wick ("A stroll through the
Gaussian primes", *American Mathematical Monthly*, 1998) showed that a moat
of width √26 exists, and later searches by Tsuchimura (2005) pushed the known
moats wider. The spirals are the "Gaussian prime spirals" of Joseph O'Rourke
and Stan Wagon (*Mathematics Magazine*, 2015).

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `ring` (`auto` picks
  by the seed, `gaussian`, `eisenstein`); `mode` (`moat`, `garden`,
  `spiral`); `radius` (4-200 lattice steps, default 40: primes of norm up to
  radius²); `step` (1-6, default 1.5: the longest hop within an island);
  `colour_by` (`auto` = cluster for moats, angle for gardens, norm for
  spirals; `norm`, `angle`, `family`, `cluster`); `shape` (`tile`: squares
  or hexagons, `dot`); `palette` (`auto`, `night`, `paper`, `ember`,
  `meadow`, `ocean`); `links` (draw the hops in moat mode); `spirals` (1-12,
  default 5); `caption`.
- **Generation:** the rational primes up to radius² are sieved. The
  ramified prime gives 1 + i (or 1 − ω); each p ≡ 1 (mod 4) (or 1 mod 3) is
  split by searching `a² + b² = p` (or `a² − ab + b² = p`); each q ≡ 3
  (mod 4) (or 2 mod 3) up to the radius stays inert. Every prime found is
  spread over the symmetry group: the 4 (or 6) units times conjugation.
  Islands are the connected components of the graph joining primes at most
  `step` apart (union–find over a lattice index). Islands are grouped into
  symmetry orbits, keyed by the smallest lattice point among all images of
  their members; the largest orbits take the palette colours in a seeded
  rotation and lone primes are muted. Spirals start from seeded non-prime
  points inside 80 % of the radius, step along a unit and turn one unit left
  (90° or 60°) after landing on a prime; a walk is kept only if it returns to
  its starting point and heading within the disc and within 60,000 steps,
  has at least 24 steps and is not a loop already drawn.
- **Guarantees:** deterministic per seed. Primality is verified
  independently: the tests test every lattice point of the disc with a
  direct norm rule (norm prime, or a unit times a rational prime ≡ 3 mod 4,
  or ≡ 2 mod 3) and trial division, and find exactly the primes drawn.
  Symmetry is exact: the prime set is closed under every unit and under
  conjugation. Islands are recomputed independently by breadth-first search
  over all pairs at most `step` apart in the plane, and match. Every spiral
  drawn is closed: the tests replay it and check it returns to its start
  state. All ink lies inside the page. `verification:
  primes_by_norm_test_symmetry_exact_islands_recomputed`. Clamped knobs are
  reported as `requested_<field>`.
