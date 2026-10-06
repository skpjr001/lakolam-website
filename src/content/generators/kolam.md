---
title: "Kolam"
blurb: "Sikku and pulli kolam: continuous loops woven around a dot lattice"
category: design
version: "1.2.0"
---
Continuous loops woven around a lattice of dots — the South Indian threshold
art, and this workspace's namesake.

## What it is

A dot lattice (square, diamond or triangular) with smooth curves weaving
diagonally around the dots. In the **sikku** ("knot") style the curves are
closed loops that enclose every dot; the prestige form is a single unbroken
line around the entire lattice. **Pulli** style connects the dots directly.
The `curve` knob sweeps from angular to fully rounded weave.

Two further styles draw **mirror curves** on a rectangular (or diamond)
grid of dots, in the manner of the *sona* sand drawings of the Chokwe of
Angola. Picture the border of the grid as a mirror and a ray of light
running diagonally between the dots: it bounces off the border, and off
small two-sided mirrors set between some pairs of dots, until it comes back
to where it began. The **sona** style draws that line round the dots,
crossing itself wherever there is no mirror. The **Lunda** style shows the
black-and-white pattern Paulus Gerdes found hidden in such a curve: cut each
dot's square into four, walk along the curve, and colour the small squares
it passes through black, white, black, white in turn.

## How to use

As line art for colouring or tracing. Tracing pages follow the loop with a
finger or pencil in one continuous motion — the single-loop kolams exist for
exactly that. As colouring pages, the weave's over-alternating regions take
alternating colours naturally. For crayons, markers, young children or tired
eyes, choose the Bold & Easy version: a small grid of dots drawn big, one
thick line, and every cell roomy enough to fill easily.

The sona-style pages are for tracing too: follow the line from any point
and it visits every part of the drawing before it returns. The Lunda pages
are prints, or puzzles to look at: every row and every column of small
squares is exactly half black.

## Purpose

The namesake crate. Kolam is also a satisfying algorithmic object: loops
emerge from local crossing decisions on the dual edge graph, and merging
along a spanning tree walks the design from many small loops down to one —
the same spanning-tree trick masyu uses for its Hamiltonian cycle.

## History

Kolam is a daily practice in Tamil Nadu: women draw the design in rice flour
at the threshold before dawn, an act of welcome and impermanence — walked
away by the day, redrawn the next. The sikku tradition encodes real
mathematics (array grammars and knot theory both study it), and specific
family patterns pass down generations. Related forms: rangoli (North
India), muggu (Andhra Pradesh).

Across the Indian Ocean, Chokwe storytellers in north-east Angola drew
*sona* (singular *lusona*) in the sand: a grid of dots, then one or more
lines drawn round them in a single movement, each drawing tied to a
proverb, fable or riddle it illustrated. The mathematician Paulus Gerdes
showed in the 1980s–90s that many sona are *mirror curves* — the path of a
light ray bouncing between mirrors on a dot grid — and from them defined the
black-and-white *Lunda designs* (named for the Lunda-Chokwe region), with
their own theorems. The pages here are mirror curves made in that manner,
from a seeded mirror layout; they are not traditional sona, which are
particular drawings bound to particular stories.

## This implementation

- **Spec knobs:** `lattice` (square/diamond/triangular), `style`
  (sikku/pulli/sona/lunda), `loops` (1 = single continuous line), `curve`,
  `spacing`, `show_dots`, `bold`, `mirrors` (sona and lunda only: the share
  of gates, 0–1, offered a mirror; default 0.35; ignored by sikku and
  pulli).
- **Sona and Lunda (`style: sona` / `style: lunda`):** each dot owns a unit
  cell; the outline's border is a mirror. Between two neighbouring dots a
  *gate* is a crossing (no mirror), a *wall* (a mirror on the cell edge,
  between the dots) or a *bar* (a mirror along the line joining them). The
  ray runs diagonally from edge midpoint to edge midpoint, one stroke per
  quarter of a cell. This is the kolam weave from the other side: kolam's
  "separate" is a wall, its "merge" a bar. With no mirrors an m by n grid
  has gcd(m, n) curves (tested). Generation shuffles the gates and offers
  each, with chance `mirrors`, a wall or a bar, kept only if it does not
  split a curve; then seeded re-pairings steer to exactly `loops` curves —
  changing the mirror at a gate whose two strands lie on different curves
  always joins them. Sona pages draw each curve through the midpoints,
  straight across crossings and turning a sixth of a spacing short of each
  mirror, so two strands bouncing off one mirror never touch. Lunda pages
  fill the quarter squares black and white alternately along each curve and
  frame the outline. `bold` still draws the sikku page. Meta: `style`,
  `loops`, `gates`, `crossings`, `walls`, `bars`, `mirrors`, and for Lunda
  `black_squares` and `squares`.
- **Bold & Easy (`bold: true`):** the lattice is capped at 5 dots a side
  (diamond at half 2), spacing is raised so the page is about a letter page
  wide at native size (so the Pt measured are the Pt printed), one stroke of
  2 x `stroke` (4.8 pt by default, never under 4.5), dots drawn fat, and the
  page is always the sikku weave — pulli line art is a spanning tree and
  encloses nothing to colour. Where two diamonds stay separate their curves
  kiss; drawn thick the kiss closes and the page becomes a lattice of big
  cells, one round the dot and one between every four dots. Gated by the bold
  check: lako-validate's **kids** profile plus every stroke >= 3 pt plus a
  flood fill of the rendered page measuring every enclosed cell against
  200 mm² (lako-validate alone measures only closed subpaths, and a sikku
  kolam is one self-crossing loop). Meta carries `bold: true`, `colorable`
  and a `validation` block. Measured: 5x5 pages have 41 cells, smallest
  ~234-324 mm².
- **Generation:** every dot starts as its own diamond loop; a union-find
  merge along randomly-ordered adjacent pairs fuses loops until the target
  count remains; the weave is traced through gate pairings and rendered as
  smoothed beziers.
- **Guarantees:** every dot enclosed, loop count reported honestly
  (`loops_found` vs `loops_requested`), all arcs used — each checked, not
  assumed. Sona and Lunda pages: the requested number of curves, every
  quarter square crossed by exactly one stroke (checked on every page; a
  failure is an error, never a page); each curve has even length, so the
  Lunda colouring alternates all the way round; and, tested over many
  seeds, every row and column of a Lunda design is half black (Gerdes's
  first theorem). On rendered sona pages a flood fill of the paper shows
  every dot in its own patch except dots joined by bars, exactly as the
  mirrors predict.
