---
title: "Crease Pattern"
blurb: "Origami tessellation crease patterns: twists, Miura-ori and Yoshimura, every vertex proven to fold flat"
category: design
version: "1.0.0"
---
Origami tessellation crease patterns (twist tilings, Miura-ori and
Yoshimura) with every fold marked mountain or valley, ready to fold.

## What it is

A square of paper with every crease of an origami tessellation drawn on it.
Mountain folds are dash-dot lines, and valley folds are dashed lines. In colour,
mountains are also red and valleys blue. There are five patterns. In square,
hexagon and triangle twists, small polygons turn as the paper folds, with
pleats running between them. Miura-ori is the zigzag fold used to pack solar
panels and maps. Yoshimura is the diamond pattern that forms when a
paper tube buckles.

## How to use it

Print the page and cut out the square along its solid outline. Thin paper folds
best: 60–80 gsm copy paper or origami paper. Score every crease first with a
dry ballpoint pen and a ruler. Next, pre-fold each crease the way it is marked.
A **valley** fold (dashed) folds towards you, making a V. A **mountain** fold
(dash-dot) folds away from you, making a ridge. Turn the paper over to fold
mountains as valleys if you find that easier. Then collapse the whole sheet
together, working from the middle outwards and coaxing each twist or pleat
into place. Twists turn as they flatten, and Miura-ori and Yoshimura
concertina into a tight stack. If you turn on the faint grey guide lines, they
show the tiling the twists come from and are not folded. Hold the folded piece
up to a window to see the twists as a pattern of light and shade.

## Purpose

Crease patterns are how origami designers write their work down, and
tessellations are the purest example: one small rule repeated across a sheet.
A correct pattern saves hours of measuring. Folding one shows how a flat
sheet holds a hidden third dimension. Miura-ori and Yoshimura are also real
engineering patterns, used in deployable panels, stents and crash structures.

## History

Paper folding is centuries old, but the modern study of flat folds is recent.
Jun Maekawa and Toshikazu Kawasaki found their vertex theorems in the 1980s:
mountains and valleys at a vertex differ by two, and the alternate angles round
it sum to a straight line. Thomas Hull, Jacques Justin, Marshall Bern and
Barry Hayes added the conditions a mountain–valley assignment itself must meet.
Shuzo Fujimoto folded twist tessellations in the 1960s and 70s. Chris Palmer,
Eric Gjerde and many others developed them into an art form. Alex Bateman's
"shrink and rotate" construction turns any tiling into a twist tessellation. Koryo Miura developed his
fold for spacecraft solar arrays (flown on Japan's Space Flyer Unit in 1995),
and Yoshimura Yoshimaru described the diamond buckling of thin cylinders in
the 1950s.

## This implementation

- **Spec knobs:** `width`, `height`, `margin` (Letter 612 × 792 pt by
  default; the paper square also fits A4), `family` (square_twists,
  hexagon_twists, triangle_twists, miura, yoshimura), `tiles` (repeats
  across the paper, 2–12; Miura and Yoshimura draw two units per repeat),
  `angle` (0 lets the seed choose; twist angle 5–40°, Miura lean 30–85°,
  Yoshimura base angle 25–60°), `colour`, `guides`, `legend`, `title`,
  `centred`, `stroke`.
- **Generation:** Miura-ori: rows of parallelograms with side 1, offset by the
  lean every other row. Zigzag columns keep one sense and alternate column to
  column, and horizontal lines alternate at every vertex. Yoshimura: rows of
  isosceles triangles, with horizontals valley and diagonals mountain. Twists use Bateman's
  shrink-rotate on the {4,4}, {6,3} and {3,6} tilings. Each tile is turned by
  the twist angle α and scaled by 0.5–0.68 × cos α, which keeps pleats open. The two copies of
  each shared edge form a pleat, and the copies of each tiling vertex form a
  small twist polygon. Tile edges take a sense per tile: a checkerboard for
  squares, up and down for triangles, and alternating by edge direction round each
  hexagon. In every case the two sides of a pleat are a mountain–valley pair. Each twist
  polygon's edges are then found by trying all 2^q assignments and keeping
  the first under which every corner passes the vertex check. The pattern is
  centred on the paper (a twist or a lattice vertex at the middle), or set at a
  seeded offset, and clipped to the square. The seed also chooses the angle and scale, and
  whether the paper is turned over (every sense swapped).
- **Solving:** nothing to solve. This is a design to fold.
- **Guarantees:** every vertex strictly inside the paper is proven locally
  flat-foldable, to a 1e-9 radian tolerance:
  - **Kawasaki:** the alternating sum of the sector angles is zero.
  - **Maekawa:** |M − V| = 2.
  - **Hull's crimp test:** repeatedly folding away a smallest sector whose
    two creases disagree reduces the vertex to one straight fold. This is a
    necessary and sufficient condition for a single vertex's mountain–valley
    assignment.

  Creases are proven to meet only at shared end points (no crossings,
  touches or overlaps), and no vertex sits on the paper's edge. A candidate
  that fails is discarded and another angle or offset tried. A tested
  fallback always exists. The metadata records
  `verification: kawasaki_maekawa_crimp`, the vertex counts and the largest
  Kawasaki error. Tests re-check every pattern independently: reflections in
  the crease lines compose to the identity, Maekawa is checked by counting,
  and the generalised big-little-big lemma holds on every run of smallest
  sectors. One flipped crease or one moved vertex is shown to be caught.
  **Not checked:** global flat-foldability, meaning that the layers of the
  whole sheet never pass through each other (`global_flat_foldability:
  not_checked`). That problem is NP-hard in general. These families are the
  classic, folded-in-practice ones, but the page does not claim a proof.
  Limits: hexagon and triangle twists need a twist of about 15–20° or more at the
  default scale. With a smaller twist, the pleat's sector stops being the
  smallest, the crimp test fails, and a requested angle is replaced and
  reported in `requested_angle_deg`. Yoshimura above a 60° base angle fails
  the crimp test the same way, so it is capped at 60°.
