---
title: "Venation"
blurb: "Leaf veins, trees, roots and sea fans grown by space colonisation, with closed areoles to colour"
category: design
version: "1.0.0"
---
Leaf veins, trees, roots and sea fans that grow themselves, branch by
branch, into the space around them.

## What it is

Hold a leaf up to the light and you see its veins: a thick midrib, side
veins that branch and branch again, and the finest veinlets joining up into
a net of tiny closed cells. Trees, roots, rivers and sea fans branch the same
way, because they all solve the same problem: reach every part of a space
with as little material as possible. Each page here is grown, not drawn. The
veins start at the stalk and creep outward, step by step, toward the parts of
the leaf that still have no vein nearby, until every part is reached. A vein
that feeds many smaller veins grows as thick as all of them together.

## How to use it

- **Leaf (the default):** a coloured print of a single leaf, its veins pale
  against the blade and its cells shaded like real autumn or summer
  colour. Six leaf outlines: ovate, lanceolate, obovate, oak, heart and
  maple.
- **Colouring page (ink, closed):** the veins join into a net of closed
  cells, each big enough for a coloured pencil. Colour cell by cell like
  stained glass, or shade the big regions between the main veins.
- **Open veins:** the branching skeleton alone, with no loops. A good
  drawing study and a clean print.
- **Skeleton palette:** pale lace on a dark ground, like a leaf skeleton
  left after the soft tissue has gone.
- **Tree, root and sea fan:** a winter tree on the horizon, a root system
  spreading under the soil, or a sea fan whose branches join into a net.
- **Detail** sets how fine the veins are; **thickness** sets how heavy the
  main vein or trunk is.

## Purpose

Wall art and colouring pages that look hand-observed but come from a few
simple rules, and a way to see one of biology's quiet ideas: branching
systems are built by competition for space, not from a blueprint. In a
classroom it pairs with a real leaf, a magnifier and a pencil.

## History

Leonardo da Vinci noticed that when a tree branches, the thickness of the
branches together equals that of the trunk below. Shinozaki and colleagues
put this into the "pipe model" of plant form in 1964, and it is still how
foresters relate trunks to leaves. In 2005 Adam Runions and colleagues at
the University of Calgary, working with Przemyslaw Prusinkiewicz, showed
that leaf vein patterns can be reproduced by letting veins grow toward
points of the leaf that still lack them, as the leaf itself grows. That
work was inspired by the auxin "canalization" theory of how real leaves form
veins. In 2007 Runions, Lane and Prusinkiewicz used the same idea, called
space colonisation, to grow whole trees. It has since become a standard
tool for generative artists.

## This implementation

- **Spec knobs:** `subject` (`leaf` | `tree` | `root` | `coral`, default
  `leaf`); `leaf` (`auto` | `ovate` | `lanceolate` | `obovate` | `oak` |
  `heart` | `maple`); `venation` (`auto` | `open` | `closed`; auto is closed
  for leaves and sea fans, open for trees and roots); `style` (`colour` |
  `ink`, default `colour`); `palette` (`auto` | `green` | `autumn` |
  `skeleton`; auto picks green or autumn for leaves); `detail` (1–5, step
  length = page / (60 + 22·detail)); `gamma` (pipe exponent 1.5–4, default
  2.5); `thickness` (main vein / trunk multiplier 0.3–3); `size` (page side,
  pt); `stroke` (thinnest line, 0.75–4 pt).
- **Generation:** space colonisation (Runions et al.). Each live attractor
  pulls its nearest vein node within the influence radius. A pulled node
  grows one step along the normalised mean pull, blended with its own
  heading (inertia) and a small seeded wobble. Attractors die within the
  kill distance of a new node, and attractors that pull for 30 steps without
  being reached are retired. *Leaves* follow the 2005 open model with
  uniform blade growth. The blade grows from 14% to full size over 130 steps
  about its base, and veins and attractors scale with it. Each step 30
  attractors are dart-thrown into the blade, each at least a birth distance
  from other attractors and from the veins. The apex and lobe tips (local
  maxima of distance from the base) are persistent attractors with
  unlimited reach while the blade grows, so the midrib and the primary veins
  of palmate leaves run to the tips. Ovate, lanceolate, obovate and oak
  outlines are two mirrored cubic Bézier sides, with seeded asymmetry,
  optional marginal teeth, and lobes for oak. Heart and maple are polar
  curves about a centre above the base, with the petiole in the notch.
  *Trees, roots and sea fans* follow the 2007 static model. Attractors are
  dart-thrown into a crown blob (dense at the rim, sparse underneath),
  a soil volume (density falling with depth) or a fan, and while none are in
  range the leader grows toward their centroid (the trunk or stalk). Every
  new node is checked before it is added: inside the blade, at least 0.45
  steps from other nodes and 0.3 steps from other veins, and crossing no
  vein or margin edge. So the vein tree is planar by construction. Twigs of
  a single segment are pruned. Widths follow the pipe model: tips are 1 and
  `w^γ = Σ w_child^γ`. They are scaled so the main vein or trunk has its set
  width, and floored at `stroke`. Veins are drawn as Catmull-Rom curves
  through each unbranched run, which continue smoothly into the parent and
  the main child, and grouped by width. Iterations (420 or 600) and nodes
  (14,000) have fixed caps, with no time limit, so output is the same in
  WebAssembly.
- **Closed venation:** this is a post-pass, not Runions' 2005
  relative-neighbourhood model. Each vein tip (85% of them for leaves, all
  for sea fans) tries up to 10 nearby vertices ahead of it, at least 8 tree
  edges away, or a margin vertex. It joins the first one by a straight
  veinlet that crosses nothing, passes no other node and does not overlap
  an edge at its ends. The graph stays planar, and its faces are traced by a
  half-edge walk (turn to the next edge clockwise at each vertex). The faces
  other than the outer one are the areoles. A cell whose visible area (area
  minus the half-widths of its bounding veins) is under the floor is merged
  into its smallest neighbour by deleting one of its added veinlets, never a
  grown vein or the margin. Merging only grows faces, so this ends. The
  floor is 40 mm² for ink pages (the adult colouring floor) and 6 mm² for
  colour prints.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and different seeds give
  different pages. The grown veins form one tree: every node's parent comes
  before it, and no two veins cross. Every leaf node lies inside the blade.
  Raw widths satisfy `w^γ = Σ w_child^γ` exactly (to 1e-9), with tips 1.
  Drawn widths never fall under the floor and never exceed the vein that
  feeds them. In closed leaves no two edges of the vein graph cross, and the
  areoles tile the blade exactly: their areas sum to the outline's area
  (to 1e-6). Every areole clears the floor (`areoles_above_floor`,
  `smallest_areole_mm2`). Closed line-art leaves pass the ADULT
  colourability gate across seeds (`colorable`). Sea-fan nets are planar
  too. Every leaf outline grows a full vein system. A page takes well under
  a second in release builds (about 0.5 s for a tree, 0.05 s for a leaf).
- **Caveats:** the closed pattern joins tips after growth, so it does not
  model how areoles form in a real leaf, only what they look like. Leaf
  venation is open (reticulate-looking) rather than strictly pinnate:
  secondary veins wander as they do in the simulation papers, not in
  ruler-straight pairs. The colourability gate measures closed paths. The
  areole floor is the generator's own face-area check, because areoles are
  drawn by veins rather than as closed outlines. Tree and root pages are
  silhouettes, not colouring pages.
