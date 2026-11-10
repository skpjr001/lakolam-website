---
title: "Sadu-Style Weaving"
blurb: "Woven strips in the manner of Bedouin al-sadu: warp-faced stripes and warp-substitution bands of triangles, eyes, teeth and trees, sewn edge to edge"
category: design
version: "1.0.0"
---
Woven strips in the manner of Bedouin al-sadu: warp-faced stripes in black,
madder red, white and camel, with narrow bands of triangles, eyes, teeth and
trees, sewn edge to edge into one cloth.

## What it is

A design in the manner of al-sadu, the weaving of Bedouin women of the
Arabian Peninsula. Sadu is woven on a ground loom pegged out on the earth,
as long narrow strips; the warp is packed so tightly that it hides the
weft, so every colour you see is a lengthwise thread. Plain stripes run the
whole length of a strip. Where two colours alternate thread by thread they
show as rows of tiny cross-bars. And in the pattern bands two contrasting
threads run side by side: at every pass of the weft the weaver chooses which
of the two comes to the surface, so the motif is drawn cell by cell, in small
vertical floats of thread. The page shows several strips side by side, each
mirrored about its centre line and stitched to its neighbours, with the cut
warp ends at the top and bottom. The motifs — stacked triangles, nested
diamonds, diamond "eyes" with a centre dot, trees with stepping branches,
combs of teeth, chevrons, dots and open lattices — are composed fresh for
every page.

## How to use it

Look closely and you will see that nothing is drawn with a line: every mark
is a short upright float of one thread. Follow a pattern band down the strip
and notice how the motif changes every so often, divided by a line of dots.
Then look across: each strip is the same on its left and right, and the
strips mirror across the whole cloth, as a tent divider sewn from matching
strips does. To colour it, choose the line-art palette and give each band
its two colours — sadu is read in the contrast of dark and light.

## Purpose

A warm, rhythmic page that shows how much a weaver can say with stripes, two
colours and a grid: a way into one of the great textile traditions of
Arabia, and a strong graphic print.

## History

Al-sadu is the weaving of Bedouin women across the Arabian Peninsula: wool
from their sheep, camel hair and goat hair spun on a hand spindle, dyed and
woven on a horizontal ground loom into the long strips that are sewn into
tent walls, the decorated tent divider (*qata'*), rugs, cushions and camel
trappings. The natural colours of the fibres — black and brown goat hair,
white and beige wool, tawny camel hair — are joined by dyed reds and
oranges. Pattern bands are made by warp substitution, and the small motifs
have names taken from desert life; patterns are learned by eye from mother
to daughter rather than from written drafts. As settled life has changed
the place of the tent, sadu has become a symbol of heritage and is kept
alive by cooperatives and museums, among them Al Sadu House in Kuwait City,
opened in 1980 by the Al Sadu Society, whose founders were led by Sheikha
Altaf Salem Al-Ali Al-Sabah, and the Al Sadu Weaving Cooperative Society,
owned by its weavers, set up in 1991. UNESCO inscribed *Al Sadu, traditional weaving
skills in the United Arab Emirates* on its Urgent Safeguarding List in 2011,
and *Traditional weaving of Al Sadu* (Kuwait and Saudi Arabia) on the
Representative List of the Intangible Cultural Heritage of Humanity in 2020;
in December 2025 that inscription was extended to include Qatar. See Joy
Totah Hilden, *Bedouin Weaving of Saudi Arabia and its Neighbours* (2010),
and UNESCO's nomination file for the element. This page invents its own compositions in the manner
of the tradition and does not reproduce any particular piece or named
design.

## This implementation

- **Spec knobs:** `strips` (2-8; 0 = three to five by seed), `warps` per
  strip (25-151, odd; 0 = about one warp per 2.6 points), `bands` per strip
  (1-3; 0 = one to three, varying strip to strip), `float_len` (longest float
  in a pattern band, 1-6 picks; default 3), `palette` (traditional, modern,
  line_art), `seams` (whip stitches over the joins), `fringe` (warp ends),
  `stroke`, `width`, `height`, `margin`.
- **Generation:** each strip is a list of warp columns from the selvedge to
  the centre warp — a dark edge, plain stripes, two-colour bar stripes and
  pattern bands framed by dark warps — then its mirror image. A strip has one
  centre band, a mirrored pair of side bands, or both. A band is a sequence of
  motif sections, each opened by a divider of dots; every motif is a function
  of the distance from the band's centre warp and the pick, so it is
  symmetric by construction. The colour grid (warps × picks) is turned into
  floats: plain and bar columns interlace as plain weave (two-pick floats,
  staggered between neighbouring warps); pattern columns float for as long
  as a colour lasts, cut into floats of at most `float_len` picks. Two or
  three strip designs are mirrored across the cloth. Line art draws the
  boundaries between colour areas (bar stripes count as one area).
- **Guarantees:** deterministic per seed; `verification:
  floats_on_warp_grid_strips_mirror_symmetric_and_tile_the_cloth`. Tested:
  the floats alone rebuild every strip's colour grid, covering every warp ×
  pick cell exactly once, each float on a single warp with its centre on the
  warp's centre line, pattern floats no longer than `float_len` and plain
  floats no longer than two picks; every strip's colour grid equals its
  mirror image about the centre warp, and the strip designs mirror across
  the cloth; strips of equal width abut with no gap and together span the
  page's content width exactly; all ink stays on the page for every option
  and extreme size; out-of-range values are reported as `requested_<field>`.
  Line art carries a colourability check (`colorable`), which fine bands at
  the default warp count usually fail; fewer warps give larger shapes.
