---
title: "Jamdani Muslin"
blurb: "Jamdani-style muslin in the manner of Bengal: extra-weft butis floating on a sheer ground, in half-drop or tercha lines, with mirrored borders and an end panel"
category: design
version: "1.0.0"
---
A sheer cloth in the manner of Bengal jamdani: small woven flowers, stars
and paisleys float on fine muslin, between mirrored borders and a rich end
panel.

## What it is

A design in the manner of *jamdani*, the figured muslin of Bengal. Jamdani
is woven by hand in very fine cotton. Its motifs are not printed or
embroidered on afterwards. The weaver lays them in during weaving: a
separate little spool of extra thread is passed over and under the warp,
pick by pick, for each motif only. So every flower floats on a ground so
thin you can almost see through it. This page draws such a cloth thread by
thread. The field is scattered with small motifs called *butis*: flower
sprigs, eight-pointed stars, stepped diamonds and *kalka* paisleys. They
stand in staggered columns or along slanting *tercha* lines joined by a
stepped stem. Down both long edges runs a woven border, the *paar*. At the
foot is the wide end panel, the *anchal*: solid lines, rows of little
triangles, a band of large motifs and a band of small ones. The loose warp
ends hang below it as a fringe.

## How to use it

Look closely and you will see that every motif is built from short
horizontal dashes. Each dash is one pass of the extra thread over a few warp
threads, and no dash is longer than the weaver allows. Follow one column of
butis down the field, then the next: every second column is dropped by half
a step. Fold the page down its middle in your mind: the two borders and the
whole end panel match like mirror images. The deep palettes put gold and
white on navy, black, maroon or bottle green. The pastel palettes put white
on soft blues, greens and pinks. The white palette is the classic
white-on-white. The line-art palette is a colouring page with a stepped
outline round every motif.

## Purpose

A celebration of a weaving tradition, and of how much can be drawn with
nothing but a grid of threads: a lesson in pixel art that is centuries
older than the pixel. For looking at, for designing your own butis on
squared paper, and for colouring.

## History

Jamdani is woven around Dhaka in Bangladesh. Its heartland is the villages
along the Shitalakshya river in Narayanganj district, such as Rupganj and
Sonargaon, and Demra on Dhaka's edge. It descends from the fine muslins
for which Dhaka was famous for centuries, and it flourished under Mughal
patronage in the 17th and 18th centuries. The name is often explained from
Persian. Under the East India Company and in the 19th century, the trade
declined sharply, undercut by machine-made cloth, but the craft survived
in a few weaving families and has been revived since. In 2013 UNESCO
inscribed the *Traditional art of Jamdani weaving*, nominated by
Bangladesh, on its Representative List of the Intangible Cultural
Heritage of Humanity. In 2016 the jamdani sari became Bangladesh's first
registered geographical indication. Jamdani-style weaving is also done in
West Bengal, for example around Phulia, Shantipur and Dhaniakhali, and in
other parts of India.

Jamdani is woven on a pit loom, often by a master weaver and an
apprentice side by side. The weavers frequently work from memory, and the
craft is handed down from master to pupil. The patterns have names. A
cloth sprinkled with butis is *butidar*, diagonal lines are *tercha*, and
an all-over net is *jaal*. A sari has its *paar* along the edges and its
*anchal* at the end that falls over the shoulder. Many grounds are white
or pale, with white or coloured extra weft, and gold and silver thread
are used too. This page invents its own motifs from that grammar. It does
not copy any named design or any particular cloth.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000; default 600 × 800);
  `margin` (0-200 pt and at most a fifth of the short side; default 20).
  `cell` (2-12 pt, default 4) is one weave cell, one pick of extra weft
  over one warp. `layout` is `half_drop` (default) or `tercha`. `buti` is
  `auto` (default: two different motifs picked by the seed), `flower`,
  `star`, `kalka` or `diamond`. `buti_size` (3-12 cells, default 6) is the
  field motif's half-width. `spacing` (1-3, default 1.25) is the gap between
  motifs as a multiple of their size. `paar` and `anchal` (both on by
  default) turn the borders and the end panel on or off. `float_max` (2-16
  cells, default 7) is the longest float of extra weft. `palette` is
  `deep_gold` (default; the ground shade is picked by the seed), `pastel`,
  `white_on_white`, `line_art` or `auto` (one of the three colour palettes,
  picked by the seed). `threads` (default on) draws the ground's warp and
  weft. `fringe` (default on) draws the warp ends.
- **Generation:** the cloth is a grid of cells, with an odd number of
  columns so it has a centre column. Each cell holds ground, main extra
  weft or accent extra weft. Motifs are bitmaps on this grid. The
  symmetric ones (flower, star, diamond) are sampled on the folded
  coordinate |dx|, so they are their own mirror images. The flower has 4,
  5, 6 or 8 rounded petals round an eye, and may have a stem and leaves.
  The star is a square and a diamond together. The diamond is nested
  stepped rings round a checked heart. The kalka is a round body with a
  tapering tail that bends over. The left paar (two lines framing a strip
  of small diamonds, stars, flowers or a zigzag, repeated a whole number
  of times) is copied, mirrored, to the right. The anchal is built
  across the full width, with large motifs placed at an odd gap so the row
  is centred. Paisleys on the right are mirrored, and a symmetric motif
  takes the middle place. Then the left half is mirrored onto the right.
  Half-drop slots sit at (x0 + i·px, y0 + k·py/2) with k of the same
  parity as i. Even columns hold the large motif and odd columns the
  small one, and the spacing grows if neighbours could touch. Tercha
  motifs sit at (x0 + a·s + b·l, y0 + a·s), joined by a stem one cell wide
  with a small leaf halfway. Finally, every row is read as runs of equal
  weft. Each run is split into floats no longer than `float_max`, with
  lengths that read the same forwards and backwards, so a mirrored run
  splits into mirrored floats. Each float is drawn as a rounded dash
  slightly shorter and thinner than its cells, over the fine warp and weft
  lines of the sheer ground (a few thicker slub threads, as handspun
  yarn has), between denser selvedges.
- **Guarantees:** every float lies on one weft row, starts and ends on
  cell boundaries and is 1 to `float_max` cells long. The floats rebuild
  the weave grid exactly, with no overlap. The half-drop placements,
  read back, satisfy the lattice equations exactly. No two motifs
  overlap, every motif lies inside the field and is woven in full, and
  tercha motifs sit exactly on their slanting lattice. Every float of
  the paar and the anchal, mirrored about the centre line, is found again
  among the floats (an independent check of the border symmetry). The
  flower, star and diamond motifs are mirror symmetric at every size.
  All ink stays on the page for every option and extreme size.
  `verification: floats_on_weft_grid_within_bounds_lattice_exact_borders_mirrored`.
  The line-art page reports the adult colourability check as `colorable`.
  Clamped knobs are reported as `requested_<field>`. A page so large that
  the grid would pass 600,000 cells uses bigger cells and reports
  `requested_cell`.
