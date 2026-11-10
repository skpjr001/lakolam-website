---
title: "Inkblots"
blurb: "Inkblots: mirror-symmetric Rorschach-style blots, folded and pressed, with splatter, drips and holes"
category: design
version: "1.0.0"
---
Mirror-symmetric inkblots, as if ink were dropped on a sheet, folded and
pressed: bodies, wings, splatter, drips and holes.

## What it is

Drop a few splashes of ink on one half of a card, fold it, press, and open
it again: the ink has spread into a single shape that is perfectly
symmetric about the fold, with feathered edges where it crept into the
paper, a spray of droplets, drips that ran before it dried, and pale holes
where the ink never reached. This page makes such blots. The classic is
black ink on a white card; there is red splashed under black, three soft
pastel colours, a single ink in watercolour-soft washes from pale to deep,
and an outline version for colouring in. The sheet can be folded down the
middle (left mirrors right), across (top mirrors bottom), or twice, into
four mirrored quarters.

## How to use it

Look at a blot and say what you see — a moth, two dancers, a mask, a
lantern — then turn the page upside down and look again; it is an old
parlour game and a good way to start a story or a drawing. Use the colour
blots as prints or cards, the soft ones as quiet art, and the outline
page as a colouring sheet: colour the rings from the outside in, dark to
light or the other way, and keep both halves the same or make them
different on purpose. A blot is a picture, not a test: it means whatever
you see in it.

## Purpose

To make something that invites imagination: shapes that are organic and
accidental-looking, yet exactly symmetric, so the eye reads faces and
creatures into them.

## History

The German physician and poet Justinus Kerner (1786–1862) made inkblots by
folding paper and wrote verses to the figures he saw in them; his
*Kleksographien* were published in 1890, after his death. In the 1890s
"Blotto" became a parlour game, and Ruth McEnery Stuart and Albert Bigelow
Paine published a book of blots and rhymes, *Gobolinks* (1896); the
psychologist Alfred Binet also tried inkblots as a test of imagination.
The Swiss psychiatrist Hermann Rorschach (1884–1922) published
*Psychodiagnostik* in 1921 with ten blots: five in black and grey, two in
black and red, and three in several colours. Andy Warhol made large
Rorschach paintings in 1984. These blots are invented fresh from a seed;
none copies any card or published blot, and nothing here is a
psychological test.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `fold`
  (`vertical`, `horizontal`, `four`); `style` (`classic`, `red_black`,
  `pastel`, `soft`, `lines`; default `red_black`); `coverage` (share of the
  page inked, 0.12-0.4, default 0.24); `splatter` (0-1, droplet count);
  `spread` (0-1, how far the ink creeps and feathers); `drips`, `holes`,
  `crease` (on by default; the crease is not drawn on the outline page);
  `stroke` (0.2-4, outline and crease width).
- **Generation:** each ink is a density field of anisotropic Gaussian
  splotches dropped in a canonical half: a body against the fold, wings,
  small lobes, droplets thrown 1.6-3 σ off the big splotches, drips as
  chains of shrinking kernels running down the page, and negative kernels
  (dry spots) that open holes. Red-and-black puts the red at the top and
  bottom; pastel gives each of three inks its own band along the fold. The
  field is summed over every image of the fold group and read through an
  equivariant domain warp `w(p) = Σ_g g·W(g·p)/|G|` (two octaves of value
  noise) and a symmetrised fine multiplicative crinkle, faded to zero near
  the page margin. Only the fundamental half or quarter of the grid (about
  560 nodes on the long side) is evaluated; the rest is copied. Each ink's
  threshold is a quantile of its field, then all are rescaled together
  (up to four rounds) until the union of the inks covers the requested
  share; the threshold is nudged so it never equals a node value. Levels
  are traced by oriented marching squares (holes wind the other way, so the
  nonzero rule fills them as holes); extra levels at fixed multiples of the
  threshold give the pooled darker ink, the soft washes (six) and the inner
  outlines (three). On the outline page, islands under 40 mm² are dropped.
  Meta counts, per ink, islands, holes, droplets, drips and dry spots.
- **Guarantees:** exact mirror symmetry: the paths are drawn in fold
  coordinates, node coordinates are integer multiples of the spacing, and
  each crossing is interpolated from the endpoint nearer the fold, so the
  mirror image of every path is the same path, bit for bit (tested for
  every fold × style by reflecting every loop and matching canonical
  forms). Shapes are closed, simple and never cross: no point repeats and
  no two non-adjacent segments of a level intersect (tested). Ink coverage,
  measured independently by sampling the drawn loops, lies in 10-45% of the
  page and within 6 points of the target (tested at both ends of the
  range and for every style). All ink lies inside the page; the outline
  page passes the adult colourability check (tested).
  `verification: mirror_exact_closed_simple_coverage_band`. Clamped knobs
  are reported as `requested_<field>`.
