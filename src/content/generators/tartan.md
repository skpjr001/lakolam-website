---
title: "Tartan"
blurb: "Tartan, houndstooth and glen check woven thread by thread as a 2/2 twill, and plain-woven gingham, from original setts"
category: design
version: "1.0.0"
---
Woven checks made the way a loom makes them — tartan, gingham, houndstooth
and glen check, thread by thread.

## What it is

A page of cloth. Every coloured stripe running down the page is a warp
thread or a band of them; every stripe running across is a weft. Where two
threads cross, one of them is on top, and the weave decides which. In a
twill the warp goes over two and under two, one step along on each row, so
the crossings line up in fine diagonals: where a red stripe crosses a blue
one you see neither red nor blue but a red-and-blue blend. The four styles
are tartan (broad grounds with fine guard lines, mirrored about two pivot
stripes), gingham (two colours in equal stripes, woven plain), houndstooth
(four dark threads, four light, both ways) and glen check (blocks of
four-and-four beside blocks of two-and-two, sometimes with a coloured
overcheck). The hound's teeth and the glen check's little crowns are not
drawn: they appear by themselves out of the weave.

## How to use it

Print the colour page as patterned paper — for card making, scrapbooking,
gift wrap, book covers or a background for labels. The tile version is
exactly one repeat of the cloth, so copies placed edge to edge join without
a seam. The colouring version is a chart: for tartan and gingham every
block is labelled with its colour letters (one letter is a solid colour,
two letters are where two stripes cross — colour those with a blend or a
mix of both), and the threadcount and colour key are printed underneath.
For houndstooth and glen check the chart outlines every tooth and crown;
colour alternate shapes dark and light to bring the cloth back.

## Purpose

Plaid and check papers are among the most used backgrounds in paper craft,
and most of them are drawn as flat overlapping stripes, which never looks
like cloth. Weaving the page instead gives the true texture: the blended
squares, the diagonal twill line and the colour-and-weave effects that a
real loom produces. The threadcount printed with the chart is the recipe a
weaver would use to make the same cloth.

## History

Checked and striped twills were woven across Europe long before they were
called tartan; a two-colour twill check found with a Roman-era coin hoard at
Falkirk dates from the third century. In the Scottish Highlands, setts
became linked with districts and later with clan names, a link that the
Victorian era formalised in pattern books; today new tartans are recorded
by the Scottish Register of Tartans, which writes each sett as a
threadcount such as `K/4 R24 K24 Y/4`, the slashes marking the pivots
where the sett mirrors itself. Houndstooth and the glen check are Scottish
Borders colour-and-weave cloths of the nineteenth century: the glen check
is named after Glen Urquhart, and with a coloured overcheck it became the
Prince of Wales check. Gingham, a plain-woven two-colour check, came into
English through Dutch from the Malay word *genggang*.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`, `style` (tartan, gingham,
  houndstooth, glen_check), `palette` (highland, heather, autumn, coastal),
  `scale` (thread size, 0.25–4 × the style's natural size), `texture`
  (weft floats a shade darker so the twill line shows), `output` (page or
  one-repeat square tile), `line_art`, `stroke`.
- **Generation:** a sett is drawn from the seed. Tartans have five to seven
  stripes alternating two dark grounds (16–36 threads) with guards (2–8
  threads, never the colour of either neighbour, at least one of them
  light), every count even, read out to the far pivot and back. Gingham is
  one dark and one light colour in equal stripes of 8–16 threads; houndstooth
  is four-and-four; glen check is two to four four-and-four pairs then three
  to six two-and-two pairs, with a coloured overcheck on a light pair three
  times in five. Warp and weft share the sett. Each cell shows the warp if
  the weave lifts it there (2/2 twill: `(x − y) mod 4 < 2`; plain:
  `(x + y)` even) and the weft otherwise. Colour pages draw each colour
  as one path of merged runs. The tartan and gingham chart draws one
  rectangle per stripe crossing, every stripe at least 20 pt wide; the
  houndstooth and glen check chart finds each colour shape once per repeat
  — on the torus of one repeat, walked out into the plane taking each repeat
  class once, which yields a connected tooth that tiles the plane — then
  outlines every copy on the page, merging any copy cut below the colouring
  floor by the page edge into its longest neighbour. Threads are at least
  6 pt in those charts.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed; setts are original (seeded, not
  copied from any registered tartan). Seamless repeat (`verification:
  seamless_repeat`): the repeat is `lcm(sett, weave period)` threads, and
  every page checks that shifting by it, across and down, leaves every cell
  of a window spanning whole periods of the sett and the weave unchanged —
  and tests check that no shorter divisor does. Tested: the twill is two up,
  two down, stepping one per row; tartan setts are symmetric about their
  pivots with no two neighbouring stripes alike; the threadcount reads back
  to the sett length; houndstooth's dark threads make one 32-cell tooth per
  8 × 8 repeat; line art is black only and passes the adult colourability
  check for every style.
