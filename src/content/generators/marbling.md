---
title: "Marbling"
blurb: "Marbled paper: ink drops, gel-git, nonpareil, chevron, bouquet and swirl from exact marbling maps"
category: design
version: "1.0.0"
---
Marbled paper in vector form: rings of ink dropped on a bath, then raked,
combed, waved and stirred into stone, gel-git, nonpareil, chevron, bouquet
and swirl patterns.

## What it is

A full panel of marbled paper. Coloured inks are dropped onto a bath; each
new drop spreads into a disc and pushes everything already floating out of
its way, so earlier colours become rings and veins. A stylus, rake or comb
is then drawn through the bath and drags the inks into the traditional
patterns:

- **Stone** — colour after colour sprinkled over the whole bath, each one
  squeezing the earlier ones into the veins between its cells.
- **Gel-git** ("come and go") — rings of colour dragged back and forth by a
  stylus, into rows of hearts and arrows.
- **Nonpareil** — gel-git, then a fine comb drawn through it, into rows of
  tiny teeth.
- **Chevron** — gel-git, then a coarse rake drawn alternately up and down,
  folding the colours into zigzags.
- **Bouquet** — nonpareil with a wavy stroke across it, curling the fine
  stripes into flame and tulip shapes.
- **Swirl** — rings of colour stirred round in circles.

Every page also comes as line art: the same marbling as black outlines on
white, gentler and with larger drops, to colour in.

## How to use it

Print the colour page as decorative paper: endpapers and covers for
hand-bound books, gift wrap, card fronts, box linings, scrapbook
backgrounds, or a frame of its own. Print it on heavier paper for covers.
For the line-art page, choose four to six colours and colour each band
whole — the outlines never cross, so every band is one closed shape that
runs from edge to edge or loops back on itself. Neighbouring bands in
contrasting colours give the strongest marbled look; a pale colour every
few bands keeps it light.

## Purpose

Marbling is one of the most beautiful accidents in the decorative arts,
and its patterns are not random: each is a fixed sequence of drops and
strokes. Reproduced as exact vector outlines, a marbled sheet prints
crisply at any size, can be recoloured, and becomes a colouring page whose
shapes are guaranteed sound.

## History

Paper marbling came to Europe from the Ottoman world, where it is called
ebru ("cloud art"); Persian and Turkish albums used it from at least the
fifteenth and sixteenth centuries, and the Japanese practised a related art,
suminagashi, centuries earlier. European binders adopted it in the
seventeenth century for endpapers and book covers, and named the classic
patterns — stone (Turkish *battal*), gel-git, nonpareil, chevron, bouquet —
that marblers still teach. In 2012 Aubrey Jaffer and colleagues showed
that the marbler's actions are exact mathematical maps of the plane: an
ink drop pushes every point straight out from its centre so that the disc
appears and all areas are kept, and a stroke shifts every point along the
stroke by an amount that fades with distance from the tine. Because each
map can be undone exactly, inks never cross: what looks like chaos is a
perfectly orderly folding.

## This implementation

- **Spec knobs:** `width`, `height` (144–4000 pt; default US Letter
  612 × 792), `margin`, `pattern` (stone, gelgit, nonpareil, chevron,
  bouquet, swirl), `palette` (ebru, ocean, autumn, pastel, ink),
  `drop_size` (8–120 pt radius), `rings` (1–6 colours per spot; stone: the
  number of colour passes less one), `comb_spacing` (6–120 pt), `strength`
  (0.2–3, how far and how wide strokes drag), `veins` (thin dark outlines
  on colour pages), `line_art`, `stroke` (0.75–4 pt).
- **Generation:** the page is a script of Jaffer's maps. Ink drop of radius
  `r` at `C`: `P → C + (P − C)·√(1 + r²/|P − C|²)`. Rake (stylus or comb):
  with stroke direction `M`, normal `N` and `n = (P − B)·N`,
  `P → P + M·Σ ±z·u^d(n − oᵢ)` over the tines, with `u^d` Jaffer's
  exponential fall-off and `d` the distance to the tine rounded over the
  tine's own radius. Wiggle: `P → P + M·S·sin(2πn/λ + Ω)`. Stir (circular
  tine track): turn `P` about `C` by `z·u^|h − r| / max(h, r)`, `h = |P − C|`.
  Ring patterns drop concentric rings at jittered hex-lattice spots in
  random order; stone sprinkles one colour per pass at random. Every drop's
  outline is its starting circle carried through every later map,
  evaluated afresh at each sample (no error builds up from step to step)
  and sampled adaptively until chords lie within 0.1 pt (0.06 pt for line
  art) of the curve; drops at the same spot compose exactly into one map
  (`√(r₁² + r₂²)`), which keeps evaluation fast. A conservative bounding
  disc carried through the maps skips outlines that provably miss the
  panel. Outlines are clipped to the panel and filled in drop order: each
  later drop lies wholly inside or wholly outside each earlier one.
  Line art scales drops by 1.5, combs by 2 and strokes by 0.7, and merges
  into the surrounding band any region that is under the colouring floor
  (40 mm²) or under 6 pt wide on average. A page that would exceed a fixed
  work budget, or whose filaments are too fine to measure, is marbled again
  with drops and comb 1.6 times larger (`attempts`, `drop_size`,
  `comb_spacing` and the `requested_*` values in the metadata say so); a
  big page with small drops is coarsened up front to about 200 spots and 700
  rings.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. Verification
  `laminar_and_area_preserving`: (1) *laminar* — no two drawn outlines,
  and no outline with itself, cross anywhere on the panel, checked
  segment against segment with a spatial hash; where sampled outlines
  meet, the segments are split at their parameter midpoints and checked
  again, until they part or both are shorter than 0.02 pt (a *hairline
  contact*: the true curves are then within 0.04 pt, invisible in print;
  counted in `hairline_contacts`); (2) *area-preserving* — every traced
  drop's visible ink (its outline's area less the outlines nested directly
  inside it, nesting found exactly by pulling the drop's centre back through
  the inverse maps) equals the disc it was dropped as to within 2%
  (`max_area_error`); (3) regions = drops + the bare bath, each one
  connected. Tested: every map inverts exactly and has Jacobian 1; composed
  ring drops equal drops applied one by one; at a grid of points the
  topmost drawn outline names the same ink as pulling the point back
  through the exact inverse maps (disagreements only within a hair of an
  outline); child outlines lie inside their parents'; every pattern ×
  palette, colour and line art, is laminar and area-preserving; line art is
  black only and passes the adult colourability check; every field at its
  bounds generates.
