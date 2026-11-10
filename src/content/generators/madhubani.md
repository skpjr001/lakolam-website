---
title: "Madhubani Kachni Painting"
blurb: "Madhubani: Mithila-style kachni painting — paired fish, peacocks or a sun, every region filled with fine black-and-red hatching, inside double-line motif borders"
category: design
version: "1.0.0"
---
Paintings in the manner of Madhubani (Mithila) art: paired fish, peacocks or a
sun drawn in fine black and red lines, every region filled with hatching,
dots and scales, inside wide borders of repeated motifs.

## What it is

A painting in the manner of the *kachni* ("line") style of Madhubani, the
painting tradition of the Mithila region of Bihar, India. Kachni work is
drawn in ink, mostly black and red. Every shape has a double outline, and
nothing is left empty: each region is filled with fine parallel lines,
cross-hatching, rows of dots, fish scales, waves or zigzags, and
neighbouring regions use different fills. Wide borders of repeated motifs
frame the picture, and the gaps between the figures are filled with small
flowers.

This page invents its own compositions on favourite Madhubani subjects. It
may show two fish arching round a lotus, two peacocks at the foot of a tree
of life under a small sun, or a large sun in a ring of lotus petals with two
fish below. The picture is mirror-symmetric about its centre line. Round it
run one to three bands of lotus petals, fish scales, interlocked triangles,
a leaf chain or a double zigzag, with a rosette in every corner. Besides
kachni, the page can be painted in flat bright colours in the manner of
*bharni* ("filled") work, or left as outlines to colour.

## How to use it

Look at one fish or peacock and follow its regions: the head, each band of
the body, the fins, the tail. Each one has its own pattern of lines, and
their directions change from one region to the next. Fold the page down the
middle, or hold a mirror to the centre line, and the two halves match line
for line. Then follow a border all the way round. Each side holds a whole
number of motifs, and every corner holds a whole rosette.

To colour the line-art page, fill the regions with flat colour in the
bharni manner: deep yellow, red, pink, green and indigo are traditional. You
can also fill the regions yourself with fine lines and dots, in the kachni
manner.

## Purpose

A celebration of one of India's best-known folk painting traditions and of
its rules: double outlines, every space filled, patterns that change from
region to region, and symmetric compositions with motif borders. Made for
looking, copying and colouring.

## History

Mithila painting comes from the Mithila region, on both sides of the
India–Nepal border, around towns such as Madhubani, Darbhanga and Janakpur.
For generations women painted it on the freshly plastered mud walls and
floors of their homes for weddings, festivals and other family occasions.
The richest paintings decorated the *kohbar*, the room prepared for a
newly married couple. Outsiders took notice after the Bihar earthquake of
1934, when the British colonial officer William G. Archer saw paintings on
the exposed inner walls of damaged houses. He later wrote about them in the
art magazine *Marg* (1949). During the drought of the late 1960s, the All
India Handicrafts Board encouraged women of the region to paint on paper for
sale. The artist Bhaskar Kulkarni was among those sent to work with them.
Painting on paper and cloth became an important source of income, and the
art became known everywhere by the name of the Madhubani district.

Several styles grew up within the tradition. *Bharni* fills shapes with
bright, flat colour. *Kachni* builds everything from fine lines and
hatching, often in black and red only. *Godna* takes its patterns from
tattoo designs. Fish (often in pairs, for fertility and good fortune),
peacocks and other birds, the sun and moon, trees, the lotus and bamboo are
among the best-loved subjects. Many paintings also show gods and goddesses
and scenes from epics. This page leaves all sacred figures out and keeps to
fish, birds, trees, the sun and flowers. Celebrated artists include
Jagdamba Devi, Sita Devi, Ganga Devi (known for her kachni line work),
Mahasundari Devi and Baua Devi, several of whom received the Padma Shri,
one of India's highest civilian honours. This page invents its own
compositions from the grammar of kachni painting. It does not reproduce any
painting or any artist's work.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000; default 600 × 800);
  `margin` (0-200 pt, default 16). `subject` is `auto` (default, picked by
  the seed), `fish`, `peacocks` or `sun`. `borders` (0-3, default 2) is the
  number of motif bands. `style` is `kachni` (default: black and red line
  fills on cream paper), `bharni` (flat colours inside black-and-red double
  outlines) or `lines` (black outlines on white, to colour). `density`
  (0.5-2, default 1; higher is denser) sets how closely the fill lines are
  packed. `stroke` (0.3-3, default 1) is the line and dot weight. `flowers`
  (default on) fills the empty ground with small flowers.
- **Generation:** each figure is built from invented parametric
  silhouettes. A fish follows a circular spine: a width profile gives its
  outline, bowed gill and scale lines cut the body into four bands, and
  fins, a forked tail and an eye are added. A peacock has a body, wing,
  neck tube, crested head, legs and a sweeping tail with feather eyes. The
  tree of life is a tapering trunk and a fan of split leaves. The sun and
  the lotus are rings of pointed petals and rays. Every region is a polygon
  with its double outline: the region's edge and an inset copy of it (a
  polygon offset). Inside the inset copy, each region gets a texture:
  parallel lines, cross-hatching, a dot lattice, fish-scale arcs, waves,
  zigzags or concentric rings. Each line is cut exactly at the region's
  edge, and dots must fit wholly inside it. Textures are dealt from a
  shuffled cycle, so neighbouring regions differ. Each region is either
  wholly left of the centre line, and is drawn again mirrored, or it
  straddles the line, and its ink is cut at the line with the left half
  mirrored. Leaf halves hatched at opposite angles give herringbone
  chevrons. Ground flowers sit on a lattice that is symmetric about the
  centre line, wherever they clear every region. A border band is the ring
  between two double-lined rectangles. Its corners are squares holding a
  rosette, and each side holds `round(side / wanted pitch)` motif cells at
  pitch side / count. The motifs on one page are all different, picked by
  the seed.
- **Guarantees:** every texture line (its points and the midpoints of its
  segments) lies inside its region's inner outline, and every texture dot
  lies wholly inside it, checked by an independent ray-casting test on all
  subjects. The field's ink is exactly mirror-symmetric: every line point
  and dot, mirrored in the centre line, lands on a point or dot of the
  field (to 10⁻⁹ of the page size), in every style. Borders close at the
  corners with whole motifs: count × pitch equals each side, every side
  motif stays inside its band and clear of the corner squares, and each
  corner holds one whole rosette. All ink is inside the page, for every
  subject, style and page shape tested.
  `verification: fills_inside_regions_borders_whole_motifs_mirror_exact`.
  The line-art page reports the adult colourability check as `colorable`.
  Clamped knobs are reported as `requested_<field>`.
