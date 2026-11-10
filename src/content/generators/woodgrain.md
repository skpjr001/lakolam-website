---
title: "Wood Grain"
blurb: "Wood grain: planks sawn from a modelled log — flat-sawn cathedral arches, quarter-sawn ray fleck, rift grain, knots and book-matched boards"
category: design
version: "1.0.0"
---
Planks sawn from a growing log: flat-sawn cathedral arches, quarter-sawn
ray fleck, straight rift grain and knots the rings flow round.

## What it is

The face of sawn timber, board by board. Every year a tree lays down a new
layer of wood over the whole stem: pale, open *earlywood* in spring, then
dense, darker *latewood* in summer. Those layers are long, slender cones
nested one inside the next, and the grain on a plank is simply where the
saw cut through them. Saw along the log near its edge (*flat-sawn*) and the
blade runs out through one cone after another, leaving the tall arches and
"cathedrals" of a pine shelf or an oak tabletop. Saw towards the heart
(*quarter-sawn*) and the rings come out as straight, close stripes, and in
oak the thin plates of the *medullary rays*, which run outward from the
heart, show as lustrous flecks. *Rift-sawn* boards, cut in between, have
fine straight grain. Where a branch grew, the trunk wrapped around it and
left a *knot*: a dark oval with rings of its own, the grain swirling past.
A page shows one plank or a board of planks glued edge to edge, each cut
from a different part of the same log, optionally *book-matched* — two
leaves opened like a book so the pattern mirrors across the joint.

## How to use it

The colour pages are timber you could almost touch: oak, walnut, maple,
cherry or pine, with walnut and cherry showing their pale sapwood where a
board was cut near the bark. Use them as backgrounds, endpapers, game
boards or craft paper. Book-matched boards make striking symmetric panels.
The line-art page is a colouring sheet: every growth ring is a band to
colour. Real wood alternates a wide light band with a narrow darker one;
try two or three shades of one brown, darken the knots and give each plank
its own tone so the joints stand out. Wavy figure makes the stripes ripple
like curly maple.

## Purpose

To show where wood grain comes from. Nothing on the page is drawn as a
picture of grain: a log is grown, then sliced, and every arch, stripe and
knot is the honest trace of that cut — so the page doubles as a lesson in
how sawing changes what a board looks like.

## History

Earlywood and latewood, rays and knots were first described in the founding
works of plant anatomy, Marcello Malpighi's *Anatome Plantarum* (1675-79)
and Nehemiah Grew's *The Anatomy of Plants* (1682). Quarter-sawn "wainscot"
oak, prized for its stability and its ray figure, was imported from the
Baltic into England from the fourteenth to the seventeenth century, and
quarter-sawn oak became the signature of the American Arts and Crafts
furniture of Gustav Stickley around 1900. Veneers cut and matched for
figure go back to ancient Egypt; book- and slip-matching were standard in
eighteenth-century cabinetmaking. Wood was one of the first *solid
textures* in computer graphics: Darwyn Peachey and Ken Perlin both
presented rings as a 3D field sampled at the surface at SIGGRAPH 1985.
Maria Larsson and co-authors ("Procedural Texturing of Solid Wood with
Knots", *ACM Transactions on Graphics* 41, 2022) modelled knots as cones
from the pith with the rings deflected around them — the approach followed
here.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `layout` (`single`
  plank — with `book_match` a panel of two leaves — or `board`, the
  default); `planks` (2-8, board only); `book_match` (pairs of planks are
  one leaf reflected about the glue line); `cut` (`auto` mixes cuts plank
  by plank, `flat`, `rift`, `quarter`); `species` (`auto`, `oak`,
  `walnut`, `maple`, `cherry`, `pine`); `style` (`colour`, `lines`);
  `knots` (branches in the log, 0-12); `ring_width` (multiplier, 0.5-3);
  `taper` (mm of radius per metre of height, 0-40); `wavy` (wavy figure,
  0-1); `stroke` (0.2-4).
- **Generation:** a log is a 3D ring field
  `ρ = r·(1 + Σ_{j=1..4} a_j cos(jθ + φ_j)) + T·z + W − Σ collars` about a
  gently wandering pith: the first harmonic puts the pith off-centre, `T·z`
  is the taper (each year is a cone), `W` an optional wave along the stem,
  and each branch adds a smooth collar that pushes the rings outward over
  it. Ring widths follow an age trend times a persistent climate index;
  each ring splits into earlywood and latewood at a seeded fraction typical
  of the species (oak and pine strongly, maple faintly), with a transition
  band in colour. Branches are cones with their apex on the pith, each
  aimed through a point on one of the planks. A plank face is a plane
  through the log: flat-sawn faces meet the rings at under 12°, rift at
  35-55°, quarter-sawn at 75-90°, each tilted very slightly against the
  stem. The field is sampled on the plane at about half a millimetre and
  every ring and season boundary is traced as closed nested band loops by
  marching squares; knots are the level sets of the cone field (rim and
  the branch's own rings), oak's rays thin radial ellipsoid plates on a
  hashed lattice whose sections give the fleck. Walnut and cherry show
  pale sapwood beyond a seeded radius.
- **Guarantees:** deterministic per seed. Every grain line is a level set
  of the one 3D field: points of the traced lines, mapped back to 3D and
  evaluated afresh, lie within 0.6 grid cells' worth of their level
  (tested on flat, rift and quarter cuts), and no two lines of different
  levels cross inside a plank (tested segment by segment), so bands nest
  and never cross. Book-matched pairs mirror exactly about the glue line
  (tested on every point). Knots occur exactly where branch cones cross a
  plank: every knot rim point is on its cone, and every branch shows a knot
  round the point it was aimed through (tested). All ink is clipped to the
  planks inside the page margin. The line-art page passes the adult
  colourability check (tested). `verification:
  level_sets_nested_book_match_mirrored_knots_on_cones`. Clamped knobs are
  reported as `requested_<field>`.
