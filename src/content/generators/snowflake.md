---
title: "Snowflake"
blurb: "Snow crystals grown by Reiter's hexagonal cellular model — plates, sectored plates, stellar and fernlike dendrites — with exact six-fold symmetry, as line art or icy gradients"
category: design
version: "1.0.0"
---
Snow crystals grown cell by cell from a single seed of ice — plates,
sectored plates, ferny dendrites and needle stars, each perfectly six-fold.

## What it is

A page of snow crystals that were not drawn but *grown*. A hexagonal grid of
cells holds a little water vapour each; a single cell of ice sits in the
middle. Step by step the vapour drifts, the ice collects it, and wherever a
cell fills up it freezes. Thousands of steps later a crystal has grown,
and its shape depends on just two numbers: how much vapour fills the air,
and how much more arrives from above. Little vapour makes long branched
arms; plenty makes broad hexagonal plates; in between come sectored plates,
ferns and simple stars — the same family of forms that real snow shows.

Each crystal is drawn as its outline — one closed six-fold curve — with
optional growth rings (the outline the same crystal had earlier in its
growth) and ridges down its arms, so it is divided into spaces to colour.
One crystal can fill the page, or a grid of different crystals can share
it. Black lines on white to colour in, or shaded in icy colours from the
first ice at the heart to the last at the rim.

## How to use it

Colour the bands between the growth rings: dark at the heart, where the
crystal began, fading toward the rim, the way light catches real ice. Or
give each arm's halves, either side of its ridge, two shades of one colour,
so the crystal looks faceted. A page of different crystals makes a winter
sampler: colour each one in its own palette, then cut them out for cards,
gift tags or window decorations. The colour version is ready to print as it
is.

## Purpose

Snow crystals show how a simple rule, repeated, makes intricate form: the
six-fold symmetry comes from the shape of the ice lattice, and the
branching from the way tips reach fresh vapour first. These pages make a
calm colouring project, a winter decoration, and a way into a famous piece
of physics — every page records the exact numbers it grew from, so it can
be grown again.

## History

Johannes Kepler asked why snowflakes are six-cornered in his New Year's
pamphlet *Strena seu de nive sexangula* (1611). Wilson Bentley photographed
thousands of snow crystals from 1885 on; *Snow Crystals* (Bentley and
Humphreys, 1931) collected over two thousand. Ukichiro Nakaya grew the
first artificial snow crystals in 1936 and mapped their form against
temperature and supersaturation (*Snow Crystals: Natural and Artificial*,
1954); Kenneth Libbrecht's modern morphology diagram (for example "The
physics of snow crystals", Reports on Progress in Physics, 2005) refines
it: plates near -2 C, columns and needles near -5 C, plates again from
about -10 to -22 C, with stellar dendrites near -15 C when the air is
very humid.

Norman Packard's lattice models of solidification (1986) grew "digital
snowflakes" by freezing a hexagonal cell when the right number of its
neighbours were ice; Janko Gravner and David Griffeath analysed them
rigorously ("Modeling snow crystal growth I: Rigorous results for Packard's
digital snowflakes", Experimental Mathematics, 2006) and built a richer
mesoscopic lattice model ("II: A mesoscopic lattice map with plausible
dynamics", Physica D, 2008). Clifford Reiter's "A local cellular model for
snow crystal growth" (Chaos, Solitons and Fractals 23, 2005) is the model
used here: real-valued cells, a background level beta, a constant gamma
added to receptive cells, and diffusion of the rest by a weighted average
with weight alpha. His beta-gamma diagram shows dendrites at low gamma and
low beta, plates at high gamma, and stellar and sector forms between. Being
two-dimensional, the model cannot grow true needles or columns; the
"needle star" here is its nearest 2-D form, six smooth spindle arms.

## This implementation

- **Spec knobs:** `habit` (auto, plate, sectored_plate, stellar_dendrite,
  fernlike_dendrite, needle_star; auto deals habits from a seeded deck, so
  a grid shows a spread), `layout` (single, grid), `count` (2–12, grid
  only), `style` (line, colour), `palette` (icy, glacier, aurora, lilac,
  midnight, sunrise; colour style only), `rings` (0–6 growth rings),
  `ridges` (none, arms, sectors), `detail` (grid radius 60–200 cells),
  `soften` (closing radius 0–3 cells), `alpha` (0.5–2), `beta`
  (0.05–0.95), `gamma` (0.00001–1) — 0 draws each from the habit — and
  `width`, `height` (144–2000 pt, Letter by default), `margin` (0–144 pt),
  `stroke` (0.75–4 pt). Out-of-range values are clamped and recorded as
  `requested_<field>`.
- **Generation:** each habit owns a box of (alpha, beta, gamma) read off a
  recomputed beta-gamma diagram at alpha near 1 (plate: beta 0.38–0.62,
  gamma 0.07–0.16; sectored plate: 0.45–0.62, 0.008–0.03; stellar
  dendrite: 0.42–0.52, 0.001–0.0035; fernlike: 0.30–0.40, 0–0.0006;
  needle star: 0.885–0.91, 0–0.0015). The seed draws a point in the box
  (rounded, so the meta reproduces it exactly). Reiter's rule runs until
  ice reaches 85% of the grid radius (at most 20,000 steps); cells beyond
  the radius are held at beta. The field is stored only on one twelfth of
  the grid (cube coordinates a >= b >= 0) and every neighbour outside it is
  read through the symmetry that maps it in, so the crystal is exactly
  D6-symmetric. The ice is optionally closed (grown and shrunk by `soften`
  cells) to fill one-cell slots between teeth. The outer boundary is traced
  along hexagon edges only from the 0 degree mirror to the 30 degree
  mirror, straightened, rounded by Chaikin corner cutting with mirrored
  ends, and reflected and rotated into the whole loop, in axial
  coordinates where every step is exact. Growth rings are the same tracing
  of the crystal at the steps when its tips reached 1/(n+1), 2/(n+1) ... of
  their final reach; the colour style shades twelve such bands.
- **Solving:** nothing to solve — a design to colour or display.
- **Guarantees:** exact six-fold symmetry (the field bit for bit, the loop
  exactly in axial coordinates, the page within 1e-9 pt — tested); one
  closed outline per crystal, rings nested inside it; all ink inside the
  margins; deterministic in the seed. Meta records alpha, beta, gamma,
  steps, whether the crystal reached full size, the ring steps, the fill
  fraction and a measured form (plate, sectored, branched) beside the
  requested habit, so a reading that disagrees is shown rather than
  relabelled. Line pages are checked with the adult colourability rules;
  the default page passes. Fernlike crystals have closely spaced teeth
  that make small spaces at the arm edges.
