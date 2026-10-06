---
title: "Dendrites"
blurb: "Dendrites — diffusion-limited coral and frost, hyphae bubbles and lightning"
category: design
version: "1.0.0"
---
Branching growth from random motion: coral, frost and snowflakes, chains of
bubbles, and lightning.

## What it is

Many branching shapes in nature grow the same way. Something drifts at
random until it touches a growing shape and sticks. The tips stick out
furthest, so they catch the most, and the shape keeps splitting into finer
and finer branches. Frost on a window, mineral ferns on rock, coral and
lightning all grow like this. This generator grows three kinds:

- **Coral:** tiny particles wander at random and stick wherever they first
  touch. Every branch is drawn thickest at its base and thinnest at its
  tips. The thickness follows how much of the coral that branch carries.
- **Bubbles:** chains of circles that grow, curl and shrink as they go,
  like threads of mould or frog spawn. No two circles ever touch, so every
  circle is a space to colour.
- **Lightning:** an electric discharge that pushes out where the electric
  field is strongest, as a bolt to the ground, a Lichtenberg figure (the
  branching scar lightning burns into wood) or the filaments of a plasma
  globe.

## How to use it

- **Coral (the default):** a finished print in warm coral colours. Try the
  `ink` palette for black line art, or `moss` and `frost` for other moods.
- **Snowflakes:** coral with `symmetry` set to 6, some `anisotropy` (about
  0.5) and the `frost` palette. Every flake is different, and every flake is
  perfectly symmetric.
- **Seed shapes:** `point` grows out from the centre. `line` grows up from
  the ground into a coral reef or a frosted hedge, or makes a lightning bolt
  that strikes down from the sky. `ring` grows inward from a circle like
  frost on a porthole, or makes a plasma globe in lightning mode.
- **Bubbles:** a colouring page. Colour each circle on its own, or colour
  along the chains, from the big circles where growth began to the small
  ones at its tips.
- **Stickiness:** lower values let particles creep further in before they
  stick, which gives denser, furrier coral.

## Purpose

Wall art, colouring pages and plotter or laser drawings with an organic,
natural look. It also shows how simple random rules build complex shapes,
which makes it useful for a classroom talk on fractals, crystals or
electricity.

## History

Thomas Witten and Leonard Sander described diffusion-limited aggregation in
1981. It explained in one model the shapes of soot, mineral dendrites,
electrodeposits and viscous fingering, and it has a fractal dimension of
about 1.71. In 1984 Lucien Niemeyer, Luciano Pietronero and Hans Wiesmann
modelled electrical breakdown in the same spirit: the discharge grows where
the field is strongest. Their model draws the branching figures that Georg
Christoph Lichtenberg first saw in 1777, in dust settling on a charged plate.
Generative artists took up both models, and the bubble form comes from
hyphae and "circle growth" drawings in the plotter-art community.

## This implementation

- **Spec knobs:** `mode` (`coral` | `bubbles` | `lightning`, default
  `coral`); `seed_shape` (`point` | `line` | `ring`); `palette` (`auto` |
  `ink` | `coral` | `frost` | `moss` | `storm`; with `auto`, coral uses
  coral, bubbles use ink and lightning uses storm). Coral: `detail` (domain
  width in particle radii, 80–800, default 420), `particles` (cap,
  500–30000), `stickiness` (0.05–1; negative = seeded in 0.35–1), `arms`
  and `anisotropy` (bonds turned toward `arms` directions by this fraction),
  `symmetry` (point seed only: 2–12-fold dihedral growth, 0 = none).
  Lightning: `grid` (41–161 cells), `eta` (branching exponent 0.5–6, 0 =
  per shape: bolt 2, Lichtenberg 1, globe 2.5). Bubbles: `bubble` (first
  radius, pt). `size` (page side, pt); `stroke` (widest stroke, pt).
- **Generation:**
  - **Coral** is off-lattice DLA with radius-1 particles. Walkers launch just
    past the growth front: a circle for a point seed, a line above the
    tallest particle for a line seed, and uniform "rain" over the open disc,
    away from the cluster, for a ring seed (launching from the centre would
    favour whichever tip is nearest). The walk uses adaptive steps. Far
    from the front, a walker jumps by its distance to the front, which
    bounds its distance to every particle. Near the front, it jumps by its
    distance to the nearest particle, from a 4-unit spatial hash (searched
    to 10 units). Nothing can be stepped over, so the result has the same
    statistics as a unit-step walk. On contact (within 0.25 of touching),
    the walker sticks with probability `stickiness`, placed exactly touching
    the particle it hit. Its bond can be turned toward the nearest of `arms`
    directions unless that crowds a neighbour. If it does not stick, it
    steps away and walks on. Kill radius: twice the cluster radius (at
    least 40 beyond it), or 30% of the domain above a line front. A walker
    is also relaunched after 20,000 steps. With `symmetry`, each new
    particle is copied to all its rotated and mirrored images, each bonded
    to the image of its parent; images that land on an existing particle
    merge with it. Growth stops at the target extent: radius 0.46 of the
    domain, height 0.9, or for a ring a sixth of the disc filled. It also
    stops at the particle cap or a budget of 4,000 steps per allowed
    particle. Particles record their parent, and subtree sizes give each
    bond a weight `ln(size)/ln(max)`. Positions get two rounds of Laplacian
    smoothing along the heaviest chains. The forest is cut into chains,
    always following the heaviest child, and drawn as Catmull–Rom curves.
    Strokes fall into 16 width bins, from 0.6 pt to `stroke` (`w ∝ t^1.3`),
    each coloured between the palette's tip and trunk colours.
  - **Bubbles** start from root circles: around a centre circle, along the
    ground, or inside the ring. Each tip carries a heading and a drifting
    turn rate, so chains curl. Each step places a circle of radius `r·0.96`
    tangent to the last one, across a gap. If that spot is blocked, it
    tries nine turning offsets, and if all fail the tip dies. A tip
    branches with probability 0.25. When every tip has died, side shoots
    sprout from random circles at 0.4–0.9 of their size. Growth ends after
    300 failed sprouts in a row, or at 4,000 circles. A thin neck joins
    each circle to its parent. The necks form a tree, so they enclose no
    pockets.
  - **Lightning** is the dielectric breakdown model on an `n × n` grid. The
    discharge is held at φ = 0 and the far electrode at φ = 1: the ground
    row for a bolt, or a circle at 0.47 n for a Lichtenberg figure or
    globe. Laplace's equation is relaxed by SOR (ω = 1.9): 4n sweeps at the
    start, then 2 after every growth step. A new cell is chosen among the
    8-neighbours of the discharge with probability `∝ φ^η`. A bolt or a
    Lichtenberg figure stops at its first strike. A globe stops after
    seven, and after each strike it grounds the glass within 0.14 n of the
    strike, so that the filaments spread out. The cell budget is n²/3.
    Struck channels are drawn at full width with a slight taper, and other
    branches by subtree size. Cell centres get a seeded jitter, and the
    strokes stay straight and jagged, with a glow drawn underneath on dark
    palettes.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):**
  - Pages are deterministic per seed, and different seeds give different
    pages in every mode.
  - Coral and lightning are true forests. Every particle has exactly one
    parent grown before it, every particle reaches a seed, and the roots
    are exactly the seeds. The drawing draws every bond exactly once.
  - Every coral bond is exactly two radii long, so particles touch their
    parents.
  - Every seed shape reaches its target extent inside the budgets
    (`reached_extent`).
  - Anisotropy halves the mean angle of bonds off the arms or better.
  - Symmetric growth is symmetric: every particle's 60° rotation and mirror
    image are present (to within 0.3 of a radius).
  - Every lightning run strikes, its main channels are parent chains from
    the strike to the root, and tree neighbours are neighbouring cells.
  - No two bubbles overlap or come within one stroke width of each other
    (`non_overlapping`). Every bubble is at least as large as the 40 mm²
    adult colouring floor. Ink bubble pages pass the ADULT colourability
    gate (`colorable: true`), and a broken control (overlapping circles and
    a tiny circle) fails both checks.
  - The thinnest stroke is 0.6 pt, so every page passes vector preflight,
    and coral and lightning strokes taper by more than 4×.
  - A page takes well under 0.2 s in release builds.
- **Caveats:** coral and lightning are line art and wall art, not colouring
  pages. Their strokes are open, so `colorable` is `null`, and so it is for
  filled-colour bubble pages. The colourability check sees each circle as
  its own region. It does not model the space between circles, which is
  one connected background, because the necks form a tree. Symmetric images
  near the centre may overlap one another; they are strokes, so this only
  thickens the hub. Bubble pages are coarse by design, because the region
  floor sets the smallest circle at about 11 pt on any page size.
