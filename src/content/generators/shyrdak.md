---
title: "Shyrdak Felt Mosaic"
blurb: "A felt mosaic in the manner of the Kyrgyz shyrdak: two felts cut along one line into ram's-horn scrolls, swapped into two counterchanged carpets, every seam corded"
category: design
version: "1.0.0"
---
Two felt carpets from one cut, in the manner of the Kyrgyz shyrdak:
ram's-horn scrolls in red and blue that fit into each other exactly, every
seam sewn over with a twisted cord.

## What it is

A design in the manner of the shyrdak, the mosaic felt carpet of Kyrgyzstan.
Two sheets of felt in contrasting colours are laid one on the other and cut
through together along a single drawn line. Every piece cut from the top
sheet fits exactly into the hole it leaves in the bottom one, so the pieces
are swapped and sewn back in: one carpet gets red shapes on a blue ground,
the other blue shapes on a red ground. A cord of a third colour covers every
seam. The page shows the pair side by side (or one above the other), or a
single carpet. Medallions of curled ram's horns, S-scrolls, arms and teeth
fill a field mirrored about both its axes, inside a border band whose
colours are swapped against the field.

## How to use it

Look at the two carpets together: wherever one is red, the other is blue —
put a finger on any point of one and find the same point on the other. Then
follow the cord: every line on the page is part of the one cut. Each
medallion is the same in all four quarters, and the whole field is mirrored
top to bottom and side to side. To colour it, choose the line-art palette and
colour one carpet in two colours, then the other the opposite way round.

## Purpose

A bold, warm page about a clever idea: nothing is wasted, because the shape
and the space around it are cut by the same line. It shows counterchange,
mirror symmetry and the traditional ram's-horn ornament of Central Asian
felt.

## History

Felt has been made by the herding peoples of Central Asia for thousands of
years. Kyrgyz women make two kinds of felt carpet: the *ala-kiyiz*, whose
pattern is pressed into the wool as it is felted, and the *shyrdak*, the
mosaic carpet made by cutting, swapping and sewing as described above, then
quilting the mosaic onto a backing felt. The making is a shared task, often
done by groups of women, and a shyrdak was part of a bride's household. Its
ornament comes from nature and herding life; the most common element is the
*kochkor muyuz*, the ram's horn, a curled scroll repeated, paired and
mirrored. In 2012 UNESCO inscribed "Traditional knowledge and skills in
making Kyrgyz felt carpets" on its List of Intangible Cultural Heritage in
Need of Urgent Safeguarding. Kazakh *syrmak* carpets are made in a closely
related way. This page draws its own motifs from the construction rules; it
does not copy any carpet. See Stephanie Bunn, *Nomadic Felts* (British
Museum Press, 2010).

## This implementation

- **Spec knobs:** `carpets` (pair, one), `medallions` (across the carpet's
  short side, 1–5; 0 = one to three by seed; the long side takes as many as
  fit), `symmetry` (auto, four_fold, mirror), `palette` (auto, red_navy,
  red_cream, blue_cream, ochre_brown, line_art), `border` (a counterchanged
  band round the field), `cord` (cord width in points, 0.5–8), `width`,
  `height`, `margin`. A pair stands side by side on a wide page and one above
  the other on a tall one.
- **Generation:** one field `f` over the carpet decides the felts (`f > 0`
  is felt A). It is evaluated on `(|x|, |y|)`, so the carpet is mirrored
  about both axes exactly. The field is a grid of square medallion cells
  with a band round it; each cell folds onto a triangle (four-fold) or a
  quarter (mirror) and is the union of thick strokes along a skeleton: a
  centre boss, arms on the fold lines ending in ram's horns, and S-scrolls.
  A horn is an Archimedean spiral whose turns are spaced two stroke widths
  plus a gap apart, so it never touches itself; every new stroke must stay
  clear of the fold lines, the cell edge and the strokes already placed, or
  it is regrown smaller or replaced by a diamond. Two medallion designs
  alternate in a mirror-symmetric checkerboard; lattice discs and diamonds
  join neighbouring cells. The band (felt A ground, felt B motifs: horn
  units standing alternately in and out, or a zigzag with diamonds) and the
  corner squares are counterchanged against the field, sometimes with teeth
  along the inner edge. The cut is the zero level of `f`, traced by marching
  squares on a grid symmetric about the centre and turned so felt A lies on
  its left; carpet one fills it with A on a B ground, carpet two with B on an
  A ground.
- **Guarantees:** deterministic per seed; `verification:
  pair_exact_complements_cut_closed_simple_mirror_symmetric`. Tested: read
  back from the drawn scene, every probe point is felt A on one carpet and
  felt B on the other, and agrees with the field; every cut loop is closed
  and no two pieces of the cut cross or meet; the drawn felt is the same at a
  point and its three mirror images, and four-fold medallions are also
  symmetric about their diagonals; horn spirals never touch themselves; all
  ink stays on the page for every option and extreme size; the line-art page
  passes the colourability check. Meta records the cut's loops and length,
  felt A's share of the carpet, the horns grown per medallion and any clamped
  value as `requested_<field>`.
