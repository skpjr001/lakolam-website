---
title: "Shweshwe-Style Print"
blurb: "Shweshwe-style discharge print: a tiny geometric roller repeat — diamonds, starbursts, dot rosettes, scallops, crosshatch, zigzag stripes — in white on indigo, brown or red, tiled exactly with an optional half-drop"
category: design
version: "1.0.0"
---
Tiny, crisp white figures on deep indigo: a discharge-printed cloth in the
manner of South African shweshwe, repeated as exactly as an engraved roller.

## What it is

A length of printed cotton in the manner of shweshwe (isishweshwe,
seshoeshoe), the indigo cloth worn across South Africa. The cloth is dyed
first; the pattern is then taken *out* of the dye, so every figure is the
pale colour of the bleached cotton against the dark ground. The designs are
small and dense: dots, diamonds, stars, florets, rings, crosshatching and
zigzag stripes, built into one small rectangular repeat that runs over the
whole cloth without a break. Indigo is the classic colour; brown and red
cloths are made the same way, and some cloths carry two discharge colours,
white and a paler blue. All the designs here are new, put together from a
grammar of those small figures.

## How to use it

Use the colour pages as printed fabric: wrapping paper, a background, a
pattern swatch, or the cloth of a dress design. Look closely at one repeat —
a centre figure, small joining figures on its corners and edges, and dots
in between — and then step back to see how it builds the all-over pattern;
with the half-drop on, every other column is shifted down by half a repeat,
which turns the grid into a diagonal lattice. The line-art page draws each
discharged figure as an outline to colour: try a dark ground with pale
figures, the way the cloth is printed.

## Purpose

A celebration of a printed cloth whose beauty is in precision: a pattern
that is only a few centimetres across, repeated by machine, but designed so
that the repeats lock together into something larger.

## History

Indigo cloth printed with white figures came to southern Africa in the
nineteenth century through trade and through German and other European
settlers, who knew it as *Blaudruck* ("blue print"); in isiXhosa it is still
called *ujamani* ("German"). The Sesotho name *seshoeshoe* is popularly
linked to Moshoeshoe I, founder of the Basotho nation, who is said to have
been given indigo cloth by French missionaries in the 1840s. Cloth was long
imported from English mills; production moved to South Africa, and Da Gama
Textiles at Zwelitsha in the Eastern Cape became its main maker, acquiring
the engraved copper rollers and the best-known trademark from the English
manufacturer in the 1990s. The process is discharge printing: indigo-dyed
cotton passes through rollers that print a weak acid paste, which bleaches
the dye from the figures. The new cloth is stiff with starch and has a
faint sheen until it is first washed. Shweshwe is part of the dress of
Basotho, Xhosa, Tswana and other communities — worn at weddings, by young
married women and at ceremonies — and has become a fabric of South African
fashion design. See Juliette Leeb-du Toit, *isiShweshwe: A History of the
Indigenisation of Blueprint in Southern Africa* (University of KwaZulu-Natal
Press, 2017). The pages here are invented designs in the manner of the
cloth; they reproduce no maker's pattern or mark.

## This implementation

- **Spec knobs:** `width`, `height` (200-3000 pt); `margin` (0-144, default
  0: cloth to the page edge); `unit` (repeat width, 24-240 pt, default 64;
  line art draws it at least 96); `symmetry` (`auto`, `d4` square unit, `d2`
  unit 1.25 times taller); `motif` (`auto`, `concentric_diamond`,
  `starburst`, `dot_rosette`, `scalloped_circle`, `crosshatch`, `floret`,
  `zigzag_stripes`); `half_drop` (default on); `fillers` (satellites and pin
  dots, default on); `sheen` (faint diagonal starch sheen, default on);
  `colourway` (`indigo`, `brown`, `red`, `two_tone`, `lines`).
- **Generation:** the repeat unit is built in normalised coordinates on
  `[-1, 1]²`: a centre medallion from the motif grammar (ring counts, ray
  counts, hatch counts and dot counts drawn by the seed), a join motif
  centred on the unit's corner (four dots, a four-point star, a ringed dot
  or a cross), a small join at the left and top edge midpoints, satellites
  half-way along the diagonals and pin dots on the axes. Every figure is
  built with the eight symmetries of the square and the unit is stretched
  to its size, so a square unit keeps all eight and a tall one the four of
  the rectangle. Zigzag stripes sit a quarter of a unit above and below the
  centre, so they still meet across a half-drop, and a whole odd number of
  their periods fits the unit width. The lattice puts unit `(i, j)` at
  `(i·W, j·H)`, plus `H/2` on odd columns with the half-drop, centred on the
  cloth; the cloth edge clips it.
- **Guarantees:** deterministic per seed; `verification:
  exact_lattice_repeat_symmetric_motifs_clear_borders`. Tested: every unit
  on the page is the repeat unit translated to its lattice point, path for
  path, and the units cover the cloth; the interior of the unit is invariant
  under both mirrors (D2) and, for a square unit, the diagonal mirror too
  (D4), and so is each join motif about its centre; medallion and fillers
  keep a clear margin from the unit border, join motifs are centred exactly
  on a corner or edge midpoint, and stripes leave the unit at the height and
  phase they enter it. Zigzag stripes run one way, so their unit is always
  D2 (a `d4` request is then reported as `requested_symmetry`). Clamped
  knobs are reported as `requested_<field>`; the line-art page reports its
  colourability.
