---
title: "Kōwhaiwhai-Style Rafter Patterns"
blurb: "Kōwhaiwhai-style rafter patterns: koru, kape and rauru in red, black and white, in exact frieze symmetry"
category: design
version: "1.0.0"
---
Long painted rafter boards in the manner of Māori kōwhaiwhai: koru, kape and
rauru in red, black and white, flowing along each board in exact symmetry.

## What it is

A page of designs in the manner of kōwhaiwhai, the painted scroll patterns
of Māori meeting houses. Each board is divided by one flowing line, painted
as a band in the third colour. Everything on one side of the line is one
colour and everything on the other side the other, so the shapes of each
colour lock into the shapes of the other: figure and ground trade places
along the whole board. The line keeps leaving the stem to make three kinds
of shape. The **koru** is a stalk that curls over like an unfurling fern
frond and swells into a round bulb with a painted eye. The **kape** is a
crescent with a row of circles along its edge. The **rauru** is a double
spiral in which the two colours wind into each other. The pattern repeats
along the board with mirror, glide or half-turn symmetry, and wherever a
glide or half-turn carries red onto black, it carries black onto red.

The designs are invented in the kōwhaiwhai manner. They do not reproduce
the named patterns of any iwi or any whare, and they carry none of the
meanings those patterns hold.

## How to use it

Follow one board from end to end and find the unit that repeats. Then look
for how it repeats: is the next copy reflected across the board, flipped
over the stem and slid along (a glide), or turned upside down (a half-turn)?
Each board names its own symmetry among the seven possible ways a border can
repeat. Notice that a glide or a half-turn swaps the colours, so the red
shapes and the black shapes are the same shape. To colour one in, choose the
line-art page: the painted line is drawn as a double outline, the two sides
of it are the large shapes to fill, and the eyes and circles are already
inked. Give the two sides two strong colours and leave the line pale, as
the painters did with red ochre, black and white.

## Purpose

A page that shows how a long, living pattern is built from a few elements,
one line and a rule of repetition, and an introduction to frieze symmetry
and counterchange through an art form that has used them for centuries.

## History

Kōwhaiwhai are painted on the heke (rafters), the tāhuhu (ridge pole) and
other boards of the wharenui (meeting house), whose structure is understood
as the body of an ancestor, the heke being its ribs; painted sequences can
record whakapapa (genealogy) and stories, and their meanings belong to the
iwi and hapū whose houses they are. The koru, taken from the pītau, the
young fern frond, is the predominant element; kape (the crescent, likened
to an eyebrow) and rauru (the spiral, shared with carving) recur. The
traditional colours are kōkōwai (red ochre, mixed with oil), black and
white. Painters drew on symmetry, rotation and reflection with great
precision, and the art flourished in the carved and painted meeting houses
of the nineteenth century. Kōwhaiwhai
are taonga (treasures) with their own meanings; this page borrows only the
construction of the form, and none of its named patterns. Sources: Te Ara —
the Encyclopedia of New Zealand, "Māori architecture – whare Māori"
(ancestral stories; the heke as ribs) and the 1966 *Encyclopaedia of New
Zealand* entry on Māori art, painted designs (the koru as the predominant
rafter element); Augustus Hamilton, *The Art Workmanship of the Maori Race
in New Zealand* (1896–1901); Roger Neich, *Painted Histories: Early Maori
Figurative Painting* (Auckland University Press, 1993); D. K. Washburn and
D. W. Crowe, *Symmetries of Culture* (1988), on frieze groups.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200–3000; default 600 × 800);
  `layout` (`rafters` side by side, `bands` stacked, or one `single` panel;
  default `rafters`); `rafters` (2–8 boards, default 4); `symmetry` (`auto`
  gives each board a different group, or one of `p1`, `p11g`, `p1m1`, `p2`,
  `p2mg`, `p11m`, `p2mm`); `motifs` (`mixed`, `koru`, `kape`, `rauru`);
  `palette` (`red_black` with white lines, `red_white` with black lines,
  `black_white` with red lines, `line_art`); `line` (weight of the painted
  line, 0.5–1.6, default 1); `stroke` (outline weight, 0.2–4, default 1).
- **Generation:** each board is a band of half-height 1. A *unit* leaves the
  stem along a G1 Hermite clothoid, rises as a finger whose sides are exact
  parallel offsets of its centreline and returns to the stem the same way.
  A koru's centreline curls with radius of curvature falling linearly in the
  turning angle (κ = 1/√(R₀² + 2cs)) and its width swells smoothly into a
  bulb closed by a circular cap, with an eye at the centre; a kape is a
  constant-curvature crescent with circles along its inner edge; a rauru is
  a double spiral of semicircles about two alternating centres (radii e, 3e,
  5e), so its stalk and both colours wind in and out with equal spacing.
  Units are tightened (less curl, shorter stalk) until they fit the band
  and keep clear of the stem. A *cell* of one or two units is resampled once
  and copied by the group's isometries — glide (u + L, −v), half-turn
  (2L − u, −v) and mirror (2L − u, v), walked backwards where they reverse
  the line — then repeated by whole periods; `p11m` and `p2mm` use two
  half-size lines mirrored about the board's centre. Stem gaps start at the
  overhang of fingers meeting their own mirror image and grow until the
  repeated line keeps clear of itself; the stem is then lengthened by up to
  a quarter period so whole periods fill the board, otherwise the pattern
  runs off the end. The colours are the regions to the left and right of the
  line offset by its half-width.
- **Guarantees:** deterministic per seed; `verification:
  frieze_symmetry_exact_regions_partition_proper_colouring_g1`. Tested for
  every group and motif set: the line's sample points map onto the line
  under the period and every generator of the stated frieze group (to
  10⁻⁷), glides and half-turns swap the two colours and mirrors keep them,
  and a `p1` board fails the glide and half-turn (the group is not larger
  than stated); the colour regions never overlap and every point of the
  board is either a colour at least the half-width from the line or the
  painted line within the half-width, so red, black and white form a proper
  colouring (the two sides of every stretch of line differ); the line is
  tangent-continuous with radius of curvature never below its half-width
  and keeps at least two half-widths plus a minimum colour width from every
  part of itself that is not its neighbour; circles lie inside one colour,
  clear of its edge, and never touch. The line-art page passes the adult
  colourability check. Clamped knobs are reported as `requested_<field>`.
