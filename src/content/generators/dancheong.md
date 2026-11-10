---
title: "Dancheong-Style Painted Beams"
blurb: "Dancheong-style painted beams in the manner of Korean temple and palace architecture: mirror-symmetric panels, gradated colour steps and blossom rosettes"
category: design
version: "1.0.0"
---
Painted beams in the manner of Korean dancheong: blossom rosettes at both
ends, colour stepping from white to deep, and a framed panel in the middle,
all on a green ground.

## What it is

A design in the manner of dancheong, the painting that covers the timber of
Korean temples and palace halls. Each beam is read from both ends to the
middle. At each end sits a cluster of blossoms: a half-rosette cut by the
beam's end, a full rosette, and on long beams a smaller rosette between two
half-rosettes on the edges, all set off by bands of stripes. Every petal is
painted in steps of one colour — white, pale, middle, deep — so the flowers
seem to glow from inside, and the stripes step through a colour the same
way. In the middle is a framed panel with a geometric fill: a diagonal
brocade of diamonds, stacked waves, or a tortoiseshell lattice of hexagons.
Every panel is exactly mirror-symmetric about its centre line. A page shows
an eaves elevation (square and round rafter ends above a stack of beams),
tiers of rafter ends between narrow patterned bands, or a pattern sheet with
a beam, the three fills, a row of rafter ends and the colour steps.

## How to use it

The colour pages are prints: bright and new, or softened like old paint.
The line-art page is a colouring sheet. Colour it the way the painters do:
give the ground a strong green, and paint each petal from the outside in,
deepest colour at the rim and lighter towards the heart, with a white step
last. Use blue, red, yellow, white and black first, and keep the two ends of
each beam the same — the left half is the mirror image of the right. The
colour chart on the pattern sheet shows the steps for each colour.

## Purpose

A page about order and colour: a symmetric composition, read from the ends
to the middle, and the painter's way of making a flat colour shine by laying
it down in steps from light to dark.

## History

Dancheong (단청, literally "red and blue-green") is applied to wooden
buildings to protect the timber from weather and insects and to mark the
rank and purpose of a building; palace halls usually carry more restrained
schemes, Buddhist temples the richest. Painted architecture already appears
in the Goguryeo tomb murals (4th-7th centuries), and buildings of the Goryeo
period such as the main hall of Sudeoksa (1308) keep early painted
decoration. Work proceeds from a green base coat (noerok); the designs are
pounced through pricked paper patterns and painted colour by colour, each
gradation laid as separate bands. The palette grows from the five
directional colours, obangsaek — blue, red, yellow, white and black — of the
yin-yang and five-phase tradition. The motifs at the beam ends are called
meori-cho, the central panels byeolji, and the all-over patterns geummun
(brocade patterns). The craft was traditionally carried by monk painters in
the temples, and dancheongjang, the art of the dancheong master, was
designated an Important Intangible Cultural Property of Korea (No. 48) in
1972. See Im Young-ju, *Dancheong* (Daewonsa, 1991). The compositions on
these pages are invented in the manner of dancheong from its construction
rules — mirror symmetry, rosettes of stepped petals, gradated bands and
framed central panels — and copy no building's painting.

## This implementation

- **Spec knobs:** `layout` (`beam`, `rafters`, `sheet`); `interlace` (the
  central fills: `auto`, `brocade`, `wave`, `tortoiseshell`; auto is chosen
  by the seed for each panel, and the sheet then shows all three);
  `palette` (`obangsaek`, `weathered`, `line_art`); `rings` (petal rings in
  a rosette, 2-5, default 3); `steps` (colour steps in every gradation, 3-5,
  default 4); `rafters` (rafter ends across a row, 3-12, default 8);
  `stroke` (outline weight, 0.2-4 points, default 0.6); `width`, `height`
  (144-2400 points); `margin`.
- **Generation:** every gradation is a run of steps from one of five
  hue ramps (blue, red, green, yellow, purple), white first; `steps` picks
  3, 4 or all 5 of the ramp's steps. A rosette is concentric rings of
  round-tipped petals (16, then 12, then 8 per ring), each ring rotated half
  a petal from the last and starting from straight up, each petal drawn as
  nested petals from the deep step outside to the white one inside, round a
  core of stepped discs and a ring of seeds. A beam panel is measured in
  units of its depth: half-rosette on the end, a gradated divider, a full
  rosette, a second divider, then (if the beam is long enough) the
  three-rosette cluster, and a byeolji frame of nested gradated borders
  round an interlace fill. Both ends are built by the same code from x and
  w − x, and every fill is laid on a lattice centred on the panel's middle,
  so the panel mirrors exactly. Rafter ends are gradated circles round a
  rosette, or gradated squares round a four-and-four-petal flower. The page
  stacks rows measured for a unit width and scales them to fit; the hue
  order of each panel and the auto fills come from the seed. Line art draws
  the outer and inner petal steps only, starting on their ring.
- **Guarantees:** deterministic per seed; `verification:
  panels_mirror_exact_gradations_strictly_darkening_motifs_disjoint`.
  Tested: every panel's control points, grouped by colour and style, map
  onto themselves under reflection in the panel's centre line (and every
  clip is centred), for every layout and palette; every gradation painted
  has exactly `steps` steps, each clearly darker (lower luma) than the last;
  the motif footprints in a panel — rosette discs, divider stripes, frames,
  rafter ends — are pairwise disjoint, and panels never overlap and lie on
  the page; all ink stays on the page for every option and extreme size.
  The line-art page reports the adult colourability check as `colorable`
  (dense rosettes usually fail its smallest-region rule, and the report
  says so). Clamped knobs are reported as `requested_<field>`.
