---
title: "Wagara"
blurb: "Wagara: traditional Japanese patterns (seigaiha, asanoha, kikko, shippo, sayagata and seven more) as exact seamless repeats in a page, tile, circle or fan, or a labelled sampler; colouring page or traditional colours"
category: design
version: "1.0.0"
---
Twelve traditional Japanese patterns, from seigaiha waves to the hemp-leaf
star, drawn as exact repeats to colour in or printed in traditional colours.

## What it is

Wagara (和柄, "Japanese patterns") are the repeating designs of Japanese
kimono cloth, paper, lacquer and wood. Each has a name, a meaning and a
strict geometry. This page draws twelve of them:

- **Seigaiha** (青海波, blue sea waves): fans of concentric arcs in
  overlapping rows, like waves to the horizon.
- **Asanoha** (麻の葉, hemp leaf): six-pointed stars of diamond leaves on a
  grid of triangles.
- **Kikko** (亀甲, tortoiseshell): hexagons, each with a hexagon inside.
- **Shippo** (七宝, seven treasures): overlapping circles, linked without end.
- **Uroko** (鱗, scales): rows of triangles.
- **Ichimatsu** (市松, checkerboard): alternating squares.
- **Yagasuri** (矢絣, arrow feathers): columns of chevron fletchings.
- **Sayagata** (紗綾形): manji crosses whose hooked arms lock into their
  neighbours, one unbroken key meander.
- **Kagome** (籠目, basket eyes): the woven-bamboo pattern of triangles and
  hexagons, with a six-pointed star at every hexagon.
- **Same komon** (鮫小紋, shark skin): fine dots laid on overlapping fans.
- **Tatewaku** (立涌, rising steam): wavy lines swelling apart and
  narrowing together, like steam rising.
- **Kanoko** (鹿の子, fawn spots): the diamond spots of tie-dye with a dot in
  each.

A page shows one pattern filling the page, a seamless repeat tile, a circle
or a folding fan, or a sampler of all twelve with their names.

## How to use it

To colour: print the black-and-white version. Every pattern is made of
closed shapes, so pick two or three colours and let the repeat do the work:
colour the bands of each wave fan alternately, the three kinds of leaf in
the hemp-leaf star in three shades (it turns into stacked cubes), the
lenses of the seven treasures in one colour and the stars between them in
another, or every other feather of the arrow pattern.

To display or craft: the colour version paints the same shapes in a
traditional colour set: indigo, safflower red, matcha green, cherry
blossom, wisteria, kerria gold or ink grey. The repeat tile is exactly a
whole number of repeats, so copies laid side by side join without a seam,
for wrapping paper, a scrapbook background or fabric. The fan and circle
make cards and wall pictures; the sampler is a reference sheet of the
patterns and their meanings.

## Purpose

A library of the classic wagara as real geometry, not clip art: each
pattern is built from the lattice it was always drawn on, so it can be
printed at any size, in any shape, and stays exact. It gives colourists
calm, regular pages and gives makers seamless tiles and swatches.

## History

Many wagara came to Japan from China and, through it, from further west
along the Silk Road; others were refined at the Heian court (794-1185) as
*yusoku monyo*, the patterns of court dress, among them tatewaku and kikko;
and many became popular in the Edo period (1603-1868), when stencil dyeing
(*katagami*), tie-dye and kabuki fashion spread them through city life.

Seigaiha takes its name from the gagaku court dance *Seigaiha*, whose
dancers wore the wave pattern; in the Genroku era (1688-1704) the lacquerer
Seigai Kanshichi is said to have invented *seigaiha-nuri*, a combed lacquer
technique for drawing the waves, later revived by Shibata Zeshin. The waves
stand for calm seas and lasting good fortune. Asanoha, the hemp leaf, is
named for a plant that grows fast and straight, so it was dyed into babies'
clothes as a wish for healthy growth. Kikko, the tortoise shell, means long
life. Shippo's endlessly linked circles stand for harmony and lasting
bonds; the name is the Buddhist "seven treasures". Uroko, scales, was worn
for protection, and appears on Noh costumes for serpent and demon roles.
Ichimatsu was called *ishidatami* (paving stones) until the kabuki actor
Sanogawa Ichimatsu wore it in the 1740s and made it famous; it returned to
fame in the emblem of the Tokyo 2020 Olympics. Yagasuri imitates arrow
fletching woven in *kasuri* (ikat); because an arrow does not come back, it
was given to brides, and it was the schoolgirls' kimono of the Meiji and
Taisho eras. Sayagata is named after *saya*, a figured silk imported from
Ming China in the late sixteenth century whose woven ground carried the
pattern of linked manji (an ancient Buddhist sign of good fortune).
Kagome, the eyes of a woven basket, was thought to ward off evil. Same
komon is one of the classic Edo *komon* (fine stencil patterns) worn on
samurai formal dress, its dots too small to see from a distance. Kanoko
copies *kanoko shibori*, tie-dye so laborious that Edo sumptuary laws
restricted cloth covered in it.

## This implementation

- **Spec knobs:** `pattern` (`auto`, the default, lets the seed choose one
  of the twelve); `layout` (`single`, or `sampler`: all twelve in a grid,
  in a seed-shuffled order, labelled, each motif at 60 percent of `scale`); `frame` (`full` page, `tile` of whole
  repeats, `circle`, `fan`); `style` (`line`, the default, or `colour`);
  `palette` (`ai`, `beni`, `matcha`, `sakura`, `fuji`, `yamabuki`, `sumi`;
  colour style only); `scale` (motif size, 6-40 mm, default 14); `stroke`
  (0.75-3 pt); `width`/`height` (144-2000 pt); `margin` (0-144 pt, at most a
  quarter of the shorter side); `caption` (the name and meaning under each
  pattern; on a tile, also the number of repeats).
- **Generation:** each pattern is a function of a unit length, a lattice
  origin and a window. Seigaiha fans (radius R) sit on rows R/2 apart, each
  row shifted by R; every ring is drawn only on the angular intervals
  outside the discs of the fans in front, found in closed form (the arc
  leaves a disc where cos(theta - phi) = (r^2 + d^2 - R^2) / 2rd), and the
  colour fills are painted back to front. Shippo puts circles of radius
  a/sqrt 2 on a square lattice of side a, so neighbours overlap in quarter
  lenses. Asanoha joins every corner of a triangle grid to its centroid;
  uroko and kagome use the same grid (kagome joins edge midpoints, which
  makes the trihexagonal tiling). Kikko is a hexagon tiling, three-coloured
  by axial coordinates. Sayagata places manji (arms two units, hooks one)
  on the lattice spanned by (3, 1) and (-1, 3), where every hook ends on the
  middle of a neighbour's arm. Tatewaku draws lines x = k w +- A sin(2 pi y
  / h) in antiphase. The seed picks the pattern (when `auto`), the
  lattice's phase, the sampler order and the number of rings on seigaiha
  (3-5) and same komon (4-6). Lines are clipped to the frame. The meta
  records the pattern, its kanji and meaning, the unit and period in
  millimetres, the phase and (for a tile) the repeat count.
- **Solving:** nothing to solve; a design to colour or display.
- **Guarantees:** deterministic per seed; every pattern, colours included,
  repeats exactly with its recorded period (tested by matching each line
  to its translate), so a tile is seamless; seigaiha arcs never run inside
  a fan in front of them; asanoha stars have twelve lines at each point,
  kagome vertices exactly four, and no sayagata line has a loose end; all
  ink stays on the page. Every line page at the default scale passes the
  adult colourability check (strokes at least 0.75 pt, regions at least
  40 square millimetres, ink under 55 percent); meta `colorable` reports
  the check for the page actually made (small scales or the sampler can
  fall below it). The colour page is not checked.
