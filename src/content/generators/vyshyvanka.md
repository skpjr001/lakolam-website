---
title: "Vyshyvanka-Style Embroidery"
blurb: "Vyshyvanka-style cross-stitch: eight-pointed stars, hooked rhombuses, rosettes, meanders and wolf's teeth in bands on a shirt, a rushnyk towel or a sampler, every cross on one stitch grid"
category: design
version: "1.0.0"
---
Red-and-black cross-stitch bands in the manner of Ukrainian embroidery —
eight-pointed stars, hooked rhombuses and meanders — on a long towel, a
shirt or a sampler.

## What it is

A design in the manner of Ukrainian folk embroidery, worked in cross stitch
on linen. The towel (rushnyk) is a long strip of linen with a panel of bands
at each end, one the mirror of the other, and a fringe. On the shirt
(vyshyvanka), a tunic laid flat with tapered sleeves, the embroidery sits
where it always has: a trim following the round neckline, upright panels
either side of the chest opening, bands across the sleeves at the shoulder
and the cuff, and broad bands at the hem. The
sampler stacks many different bands inside a stitched frame. The motifs are
geometric and stylised floral: eight-pointed stars made of rhombus petals,
rhombuses with hooked points, nested diamonds, four-petal rosettes, a
climbing plant meander, the endless chain of lozenges and wolf's-teeth
triangles. Every design is newly composed from those shapes.

## How to use it

Enjoy the colour pages as prints, or as a pattern guide: every cross sits on
one square of the grid, so you can count a motif straight off the page and
stitch it. Each band repeats a whole number of times and reads the same from
either end, so you can start from its middle stitch. Choose red and black for
the classic look, the multicolour threads for a brighter cloth, or white on
white for the subtle style where the pattern shows only as texture. The
line-art page draws every cross as an outline: colour the crosses band by
band, keeping to two or three colours as embroiderers do.

## Purpose

To show how a whole garment or cloth is composed from a few small counted
motifs: one grid, a handful of symmetric figures, and bands that close
exactly on whole repeats.

## History

Embroidered shirts and towels are among the best-known Ukrainian folk arts.
Shirts were sewn from straight-woven linen, and the embroidery placed on
the collar, the chest panel (*pazukha*), the shoulder band of the sleeve
(*ustavka*), the cuffs and the hem; towels (*rushnyky*) were embroidered at
their ends and used at weddings, to welcome guests with bread and salt and
to decorate the home. Older counted-thread techniques such as *nyzynka*
and *nabiruvannia* were joined by cross stitch, which spread widely in the
nineteenth century. Each region has its own style: the white-on-white
embroidery of Poltava, the red-and-black of many central and western areas,
the dense multicolour work of the Hutsul Carpathians and Bukovyna. Olena
Pchilka published one of the first collections of Ukrainian embroidery
patterns, *Ukrainian Folk Ornament* (1876); Tetiana Kara-Vasylieva's
histories of Ukrainian embroidery survey the regions and techniques. Since
2006, when students in Chernivtsi began it, Vyshyvanka Day is celebrated
each May. The designs here are geometric and floral compositions in the
manner of the tradition; they copy no particular garment or towel, and
they leave out symbolic figures with religious or ritual meaning.

## This implementation

- **Spec knobs:** `width`, `height` (200-3000 pt); `margin` (0-144, default
  24); `stitch` (cell size, 2-24 pt, default 4.5); `layout` (`rushnyk`
  default, `shirt`, `sampler`); `motif` (the main motif: `auto`, `star`,
  `hooked_rhombus`, `nested_diamond`, `rosette`, `tall_rhombus`);
  `colourway` (`red_black`, `multicolour`, `white_on_white`, `line_art`).
- **Generation:** the page is a grid of square cells with an odd number of
  columns, so it has a middle column. A motif is a function of the folded
  offsets from its centre cell — `(|x|, |y|)` for the two-fold tall rhombus,
  sorted `(max, min)` for the four-fold motifs — so its mirror symmetries
  hold by construction. The eight-pointed star is eight rhomboid petals,
  rows shifted one stitch each, split by bare lines on the axes and
  diagonals; the rosette's petals are outlined with a vein. Motif bands
  place `n` motifs of odd width `m` with odd gaps `g` and a one-stitch end
  margin, `2 + n·m + (n−1)·g` stitches long, with border lines and a small
  filler in each gap; two motifs alternate with `n` odd, so the band starts
  and ends on the same one. Running borders (meander, endless lozenge chain,
  wolf's teeth) have period `2a` and length `2 + n·2a + 1`. The shirt is one
  tunic outline in grid units, symmetric about the middle column: a round
  neckline, shoulders sloping into sleeves that droop and taper to the
  cuff, dropped-shoulder seams, a body flaring to the hem, and a slit
  below the neck. A three-ring trim (black, red, black) of stitches
  follows the neckline, rasterised from offset ellipses centred on the
  middle column. Sleeve bands are rebuilt until their length fits the
  sleeve's height at their outer column, so the taper never cuts them.
  Vertical bands on the left are mirrored to the right, flipped across
  their width. The towel's top panel is mirrored to the bottom. Every
  layout drops a band that would not fit rather than squeezing it. Each
  cross is drawn as an under-stitch, a top stitch and a short highlight.
- **Guarantees:** deterministic per seed; `verification:
  stitches_on_grid_whole_repeats_mirror_symmetric`. Tested: every motif
  equals its mirror images (and its transpose when four-fold) at every size;
  every band is odd in length and reads the same from either end; motif
  bands hold whole motifs at whole periods and running borders repeat with
  their period from end to end; every stitch is one grid cell on the cloth,
  never two in a cell; the page's stitches are mirror-symmetric left to
  right (and top to bottom on the towel); every drawn stitch stroke is
  centred on a cell. Clamped knobs are reported as `requested_<field>`; the
  line-art page reports its colourability.
