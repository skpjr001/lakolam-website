---
title: "Phulkari Embroidery"
blurb: "Phulkari-style embroidery in the manner of Punjab: geometric darning-stitch motifs in silk floss on khaddar, each facet stitched its own way to catch the light"
category: design
version: "1.0.0"
---
Embroidery in the manner of Punjabi phulkari: geometric silk flowers darned
thread by thread into coarse cotton, each facet stitched its own way so the
light catches it.

## What it is

A design in the manner of *phulkari*, "flower work", the embroidery of
Punjab. It is worked on *khaddar*, a coarse handwoven cotton, usually dyed
red or a deep reddish brown. It is stitched from the back in soft untwisted
silk floss called *pat*, in golden yellow, orange, white and crimson. The
stitch is a long darning stitch that runs along the weave, counted thread
by thread. Each part of a motif is stitched in its own direction. Some
stitches run across, some up and down, some on the slant. Because floss
shines, each facet catches the light differently, and the motif seems to
glow and shift as you move. This page draws such a cloth stitch by stitch.
It offers three layouts. A *bagh* ("garden") covers the whole field with
diamonds, hexagonal flowers or zigzags. A scattered phulkari sets motifs on
bare cloth. A chope-style page has wide geometric borders round a large
medallion. Every motif is geometric.

## How to use it

Look along the short stitches. Inside one facet they all run the same way,
and the next facet turns them. That turn is what changes the colour, even
though the thread is the same. Each stitch breaks every few threads, where
the needle picked up a single thread of the cloth, and the breaks step
from row to row like brickwork. Turn the page upside down: every motif
looks the same, stitch for stitch, and hexagons and chevrons are mirror
images too. The line-art palette draws only the facets. That makes a
colouring page: give each facet a lighter or darker shade of the same
colour, and you will see why the stitch direction matters.

## Purpose

A celebration of a living women's craft, and a page about how much
direction alone can do: one colour of silk, laid four ways, makes four
shades. For looking at, for counting out on squared paper, and for
colouring.

## History

Phulkari was made across Punjab, in what is now India and Pakistan, by
women for their own families. The cloths were worn as shawls and head
coverings and were embroidered for weddings and births. A bagh could take
years to finish, and some were begun for a girl at her birth. Waris
Shah's 18th-century poem *Heer* is often cited for its list of phulkaris
in a bride's trousseau. The ground was khaddar spun and woven at home,
often joined from two or three loom widths. The silk floss came from
traders and is often said to have been brought from Kashmir, Afghanistan
and Bengal. Work was done from the back of the cloth, counting threads,
usually without any drawn pattern.

The tradition has many forms. A *bagh* covers the cloth so densely that
almost no ground shows. A *phulkari* proper leaves the cloth bare between
motifs. The *chope*, given to a bride by her maternal grandmother, is
worked along the edges in a double running stitch that looks the same on
both sides. The *thirma* is on white khaddar. The *sainchi*, from the
Malwa region, is figurative: it shows people, animals and village scenes.
This page leaves figurative work aside and keeps to geometry. Partition in
1947 broke up many embroidering households, and home production declined.
Since then cooperatives, designers and museums have revived and
documented the craft. Phulkari from Punjab, Haryana and Rajasthan was
registered as a geographical indication in India in 2011. See Darielle
Mason (ed.), *Phulkari: The Embroidered Textiles of Punjab from the Jill
and Sheldon Bonovitz Collection* (Philadelphia Museum of Art, 2017). This
page invents its motifs from the tradition's geometric grammar. It does
not copy any particular cloth.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000; default 600 × 800);
  `margin` (0-200 pt and at most a fifth of the short side; default 20).
  `count` (1.5-8 pt, default 3) is the thread spacing of the khaddar.
  `layout` is `bagh` (default), `scattered` or `chope`. `motif` is `auto`
  (default, picked by the seed), `diamond`, `hexagon`, `chevron` or
  `flower`. `size` (4-30 threads, default 10) is the motif's half-width.
  `spacing` (1-3, default 1.5) is the gap between scattered motifs; a bagh
  has no gaps, so it ignores it. `stitch` (2-12 threads, default 6) is the
  longest stitch on the front. `sheen` (0-1, default 0.7) is how much the
  stitch direction shades the silk. `border` (default on) adds a border of
  diamonds to the bagh and scattered layouts; chope always has its
  borders. `palette` is `red` (default), `maroon`, `white`, `line_art` or
  `auto` (one of the three colour palettes, picked by the seed). `weave`
  (default on) draws the coarse weave of the khaddar.
- **Generation:** everything is measured in threads, on the cloth's
  grid. Each motif is a polygon with its centre and vertices on grid
  points, cut into convex facets, and each facet has its own stitch
  direction. A diamond is cut into quarters (stitched across and down in
  turn), nested quarters, or eighths. A hexagon with vertices (±2a, 0),
  (±a, ±b) is cut into six triangles, stitched on the slant, across and on
  the other slant. A flower has four rhombus petals, each cut along its
  length, with small quartered diamonds between them. A chevron has two
  arms, each cut into a slanting half and a level half. A bagh is a
  lattice tiling, centred on the field and cut at its edge. Diamonds
  alternate between two sublattices with different cuts and silks, and
  hexagons take three colours by half-row so no two neighbours match.
  Golden yellow leads, orange comes next, and the other silks are
  picked by the seed. Borders are strips of whole diamonds alternating
  with half diamonds. Chope adds an inner band of triangles and a
  medallion, with small motifs in a half-drop round it. The scattered
  layout is a centred half-drop of two motifs. The stitches of a facet
  follow its direction's count lines, measured from the motif's centre:
  horizontal or vertical lines through cell centres, or diagonals
  x − y = m or x + y = m. Each line is clipped to the facet, inset by a
  fifth of a thread. It is broken every `stitch` threads (twice that in
  diagonal steps), with the breaks offset by half a stitch on alternate
  lines. The offset depends only on the distance from the centre, so a
  half turn or a mirror maps the breaks onto breaks. The silk is mixed
  lighter for vertical and rising stitches and darker for falling ones,
  in proportion to `sheen`. Stitches are drawn with butt ends over the
  khaddar's warp and weft, which have a few thicker slub threads.
- **Guarantees:** every stitch lies on a count line of its direction
  through cell centres. It runs along that line, sits inside a facet of
  its own direction and silk (inset), and is no longer than `stitch`
  threads (`stitch` diagonal steps on the slant). Motif centres and facet
  vertices sit on the thread grid inside the cloth. Every whole motif is
  exactly symmetric stitch by stitch under the symmetries it claims: a
  half turn for all, a quarter turn for quartered diamonds and flowers,
  and a mirror for hexagons and chevrons. Every image of a stitch is a
  stitch, and every image of a facet is a facet. The facets tile each
  motif: their areas sum to the motif's area, computed from its
  parameters, and no sample point lies in two facets. A bagh of
  diamonds, hexagons or chevrons covers its field edge to edge, with no
  gaps and no overlaps (a flower bagh leaves bare cloth between flowers
  and is reported as `field_tiled: false`). Every whole motif uses at
  least two stitch directions. All ink stays on the page for every option
  and extreme size. `verification:
  stitches_on_count_lines_motif_symmetry_exact_facets_tile_motifs`. The
  line-art page reports the adult colourability check as `colorable`.
  Clamped knobs are reported as `requested_<field>`. A page so large that
  the cloth would pass 250,000 threads uses a coarser count and reports
  `requested_count`.
