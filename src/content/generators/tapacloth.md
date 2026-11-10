---
title: "Tapa Cloth"
blurb: "Tapa-style bark cloth: rubbed kupesi-style motifs in measured panels, as in Tongan ngatu, Samoan siapo and Fijian masi"
category: design
version: "1.0.0"
---
A bark cloth in the manner of Pacific tapa: rubbed motifs in measured
sections, bold dark borders and stencilled bands, as in Tongan ngatu,
Samoan siapo and Fijian masi.

## What it is

A design in the manner of tapa, the bark cloth of the Pacific. The cloth is
cream, the colour of beaten bark, and is laid out in a grid of sections with
strong dark borders. In the **ngatu** style each section carries a motif
rubbed into the cloth in red-brown, soft and uneven where the dye took more
or less, as if the cloth had been rubbed over a design tablet, and the
motif and borders are then gone over with bold dark lines. The **siapo**
style paints large sections freehand in flat red-brown with fine dark
lines. The **masi** style stacks crisp black stencilled bands and fields
with red-brown accents. The motifs are stars, leaf rosettes, vines,
fishbone ribs, triangles, zigzags and rows of diamonds; every motif here is
invented from these shapes and none copies a named design.

## How to use it

Look along the border strips and then across the sections: the same motif
returns in every section of its kind, the way one design tablet prints the
same pattern into every part of the cloth laid over it, while the rubbing
is different every time. Each motif is symmetric: fold a square section
along either axis or either diagonal and the halves match. To colour it,
choose the line-art page: the small marks are already inked, and the
traditional palette is a few browns, a red-brown and black on cream.

## Purpose

A page that celebrates one of the great textile arts of the Pacific and
shows how its designs are built: a measured grid, a small set of shapes,
and the symmetry that makes them sit firmly in their sections.

## History

Tapa is made across Polynesia and into Fiji from the inner bark of the
paper mulberry (*Broussonetia papyrifera*), a plant carried across the
Pacific by its first voyagers. The bark is stripped, soaked and beaten out
with wooden beaters on a wooden anvil into thin sheets, which are joined
into large cloths. In Tonga, women make **ngatu** together: the beaten
sheets are pasted in layers over design tablets (kupesi) fixed to a long
curved bench, rubbed with red-brown dye from the bark of the koka tree
(*Bischofia javanica*) so that the raised design shows through, and the
rubbed patterns and the lines dividing the cloth into its measured sections
are then overpainted by hand in darker dye. In Samoa, **siapo** is either
rubbed over carved boards (upeti) or painted freehand (siapo mamanu), in
red-brown from the bark of the same tree and black from candlenut soot. In
Fiji, **masi** is decorated by rubbing and, in the Lau islands especially,
by stencilling bold black geometric patterns through stencils once cut from
leaves. Bark cloth is women's wealth (koloa in Tonga), given and displayed
at births, weddings, funerals and the installation of chiefs, and many of
its motifs have names and meanings of their own; this page borrows only
the construction of the art. See Simon Kooijman, *Tapa in Polynesia*
(Bernice P. Bishop Museum Bulletin 234, 1972) and *Tapa on Moce Island,
Fiji* (1977); and Roger Neich and Mick Pendergrast, *Pacific Tapa*
(Auckland Museum and David Bateman, 1997).

## This implementation

- **Spec knobs:** `width`, `height` (points, 200–3000; default 600 × 800);
  `style` (`ngatu` rubbed and overpainted, the default; `siapo` painted
  freehand; `masi` stencilled; `line_art`); `motifs` (`mixed`, `stars`,
  `plants`, `geometric`); `columns` (sections across, 2–6, default 3; siapo
  uses one fewer, masi stacks this many fields); `border` (strips and corner
  blocks round the sections, default on); `rubbing` (how heavily the ngatu
  motifs are rubbed in, 0–1, default 0.75); `stroke` (line weight, 0.2–4,
  default 1).
- **Generation:** the cloth is cut by shared grid lines into a border of
  strips and corner blocks round near-square sections (ngatu, siapo), or
  into stencilled bands between fields with side strips (masi). Motifs are
  built from stars, leaf lenses, diamonds, stepped crosses, triangles, ribs
  and zigzags, then closed under the panel's symmetry group: D4 (both
  mirrors, both diagonals, the turns) in a centred square for sections, D2
  (both mirrors) for strips, bands and fields, with band motifs built along
  the long side and turned for upright strips. One board per kind of panel
  is drawn from the seed and reused, as a tablet rubs the same design into
  every section. Ngatu rubbing samples short dabs inside each motif and a
  light haze over the panel; a seeded value noise decides where the dye
  took and how dark, and dabs reaching past the panel are dropped. The
  borders are a heavy line on every grid line with thin lines either side
  (ngatu), heavy black lines (masi) or firm lines (siapo); faint bark
  fibres streak the cloth.
- **Guarantees:** deterministic per seed; `verification:
  panels_tile_cloth_motifs_symmetric_rubbing_in_panel`. Tested for every
  style, motif family, border setting and several page shapes: the panels'
  areas sum to the cloth and no two overlap, so they tile it exactly; every
  image of every motif shape under its panel's group is again a shape of
  that panel (to 10⁻⁶ pt), and every shape lies inside its panel; every
  rubbing dab, with half its width, lies inside its own panel; bark fibres
  stay on the cloth and the cloth on the page. The rubbing itself is
  deliberately not symmetric. The line-art page passes the adult
  colourability check (marks too small to colour are inked solid, mirror
  images alike). Clamped knobs are reported as `requested_<field>`.
