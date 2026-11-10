---
title: "Dragonfly Wings"
blurb: "Insect wings: dragonfly and damselfly venation, cell by cell"
category: design
version: "1.0.0"
---
Dragonfly and damselfly wings drawn cell by cell: strong veins, the nodus,
the dark pterostigma near the tip, and the fine mesh of cells between.

## What it is

A dragonfly's wing is a sheet of membrane held in a frame of veins. A few
strong veins run the length of the wing — the costa along the leading edge,
the subcosta that ends in a notch called the nodus, the radius and its
branches, the media, the cubitus and the anal veins — and between them a
dense net of small crossveins divides the membrane into hundreds of little
polygonal cells, a ladder of rectangles where two veins run close and a
honeycomb where they spread apart, finer toward the tip and the trailing
edge. Near the tip of the leading edge sits the pterostigma, a dark,
thickened cell that steadies the wing in flight. Dragonflies have narrow
forewings and much broader hindwings; damselflies have four alike, narrow
wings on slender stalks.

A page shows a whole insect from above with its four wings spread, a study
plate of one fore- and one hindwing with every part named, or a sampler of
six different wing pairs.

## How to use it

The iridescent style is a print: soft colour washes in every cell, the way
light catches a real wing. The naturalist style is sepia ink on paper, like
an old engraved plate — the labelled plate in this style is a ready-made
nature-study sheet. The line-art style is a colouring page with larger
cells; the tiny cells along the leading edge are inked solid, as the veins
there are in life. Try the patterned wings — an amber wash at the base, a
dark band at the nodus, dark tips, or smoky damselfly wings — and more or
fewer cells.

## Purpose

To show how a living structure is built: a few strong, ordered veins that
carry the load, and between them a mesh that is close to the pattern of
nearest neighbours — the same rule that shapes giraffe patches and dried
mud cracks. It is a natural-history plate and a piece of geometry at once.

## History

Odonata are among the oldest flying insects; their giant relatives, the
griffinflies (Meganisoptera), flew in the Carboniferous about 300 million
years ago. The names of the veins come from the Comstock–Needham system
(John Henry Comstock and James G. Needham, 1898–1899), whose homologies for
dragonfly wings were revised by F. C. Fraser and later by Riek and
Kukalová-Peck (1984); the nodus, arculus and pterostigma are standard terms
of odonate morphology. The pterostigma's role as a passive inertial
regulator of wing pitch was shown by R. Åke Norberg (1972). That the cells
between veins closely follow a Voronoi pattern of points was examined by
Hoffmann, Donoughe, Li, Salcedo and Rycroft (*PNAS*, 2018). Hand-coloured
plates of dragonflies fill the natural-history books of the eighteenth and
nineteenth centuries, from Moses Harris's *Exposition of English Insects*
(1776–1782) to Edmond de Sélys Longchamps's monographs on the Odonata.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `layout` (`insect`
  default, `plate`, `sampler`); `kind` (`auto` default, `dragonfly`,
  `damselfly`; auto picks per seed, per variant in a sampler); `style`
  (`iridescent` default, `naturalist`, `lines`); `markings` (`auto`
  default, `clear`, `amber`, `banded`, `tips`, `smoky`; auto picks per seed;
  not drawn in line art); `density` (0.5-2, default 1; line art uses less
  than half of it so cells can be coloured); `stroke` (0.2-4 pt, default
  0.7).
- **Generation:** a wing is built in its own frame with the base at the
  origin. Its outline gives the leading and trailing edges at every station
  along the wing (a seeded chord profile per suborder and wing — broad-based
  for a dragonfly's hindwing, stalked for a damselfly — rounded at the tip).
  Each longitudinal vein is a smooth curve across the chord, from a
  fraction at the base curving back to meet the trailing margin; a branch
  follows its parent to its origin (the arculus or the nodus) and then
  eases away, the subcosta runs into the costa at the nodus, and the list
  is made monotone so veins can meet but never cross. Panels between
  neighbouring veins are cut at the nodus, the arculus and the ends of the
  pterostigma; each piece is filled with Poisson-disk sites whose spacing
  shrinks toward the tip and the trailing margin and is cut into the
  Voronoi cells of its sites (bisector clipping, then intersection with the
  piece). The insect's right wings are placed at the thorax and mirrored to
  the left; the body has eyes, face, thorax and ten abdominal segments with
  appendages. Plates label the veins, nodus, arculus and pterostigma in
  rows above and below each wing, leaders in left-to-right order.
- **Guarantees:** deterministic per seed. Cells partition each wing: the
  pieces' areas and the cells' areas each add up to the area inside the
  wing's outline, measured independently (tested to 10⁻⁶). Veins do not
  cross except where they meet at defined junctions (tested pairwise,
  segment by segment). Left and right wings mirror exactly (tested
  coordinate for coordinate). All ink is inside the page (every path, half
  its stroke added, and every label, tested over layouts and page shapes).
  Cells get finer toward the tip and with density (tested). The line-art
  page passes the adult colourability check (tested). `verification:
  cells_partition_wings_veins_do_not_cross_mirror_exact_ink_inside`.
  Clamped knobs are reported as `requested_<field>`.
