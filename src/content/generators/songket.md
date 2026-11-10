---
title: "Songket-Style Brocade"
blurb: "Brocade in the manner of Malay songket: gold supplementary-weft floats on silk, a kepala of interlocking pucuk rebung and a body of bunga tabur or lattice"
category: design
version: "1.0.0"
---
Gold on silk in the manner of Malay songket: a head panel of interlocking
bamboo-shoot triangles, borders at the ends and selvedges, and a body
scattered with small flowers — every shape built from short floats of
metal thread.

## What it is

A design in the manner of songket, the brocade of the Malay world. Songket
is woven on a silk or cotton ground, and between the ground threads the
weaver passes an extra thread of gold or silver. Before each pass she lifts a
chosen set of lengthwise threads: the metal thread rides over them as a short
horizontal float and dips under the rest, and row by row the floats build a
picture. The page lays out a whole cloth. Narrow borders run down both
edges. At the top and bottom ends stand rows of small *pucuk rebung* —
bamboo-shoot triangles. Across the middle (or near one end) is the head
panel, the *kepala*, where tall bamboo shoots rise from one edge and hang
from the other, fitting between each other without touching. The body, the
*badan*, is either scattered with small flowers, *bunga tabur*, set on
diagonals, or filled with an all-over lattice of diamonds with a flower in
each. The ground is maroon, red, purple or green silk; the thread is gold or
silver.

## How to use it

Look closely at any shape: it is made only of short horizontal strokes of
metal, each crossing a few threads of the silk before it dips under and
starts again. Then step back and the strokes merge into triangles, stars and
lattices. Trace the head panel's triangles and see how the rising and
hanging rows fit together. To colour it, choose the line-art palette; the
outlines show every gold shape, and the body's flowers and lattice make a
calm repeating field to fill.

## Purpose

A rich, ceremonial page that shows how a brocade is planned: a cloth divided
into head, body and borders, and every motif counted out on a grid of
threads.

## History

Songket is woven in Malaysia — notably in Terengganu and Kelantan on the
east coast of the peninsula — in Indonesia, especially among the Malay and
Minangkabau weavers of Sumatra (Palembang, West Sumatra) and on Bali and
Lombok, and in Brunei. The name is usually traced to the Malay *sungkit*, to
hook or pick out, for the way the weaver picks out the threads the metal
weft will cross. Long woven for royalty and nobility, songket is worn at
weddings, festivals and state ceremonies, as a sarong or as the *samping*
wrapped over trousers. Its motifs are drawn from nature and given names —
bamboo shoots (*pucuk rebung*), scattered flowers (*bunga tabur*), and many
more. In 2021 UNESCO inscribed *Songket*, nominated by Malaysia, on the
Representative List of the Intangible Cultural Heritage of Humanity. See
Norwani Mohd. Nawawi, *Malaysian Songket* (Dewan Bahasa dan Pustaka, 1989),
and Mattiebelle Gittinger, *Splendid Symbols: Textiles and Tradition in
Indonesia* (Textile Museum, 1979). This page invents its motifs from
songket's construction rules and does not reproduce any particular cloth or
named design.

## This implementation

- **Spec knobs:** `kepala` (middle, end), `field` (auto, bunga_tabur,
  lattice; auto picks by seed), `palette` (auto, maroon, red, purple, green,
  line_art; auto picks a silk by seed), `metal` (gold, silver), `max_float`
  (longest float, 3-12 warps; default 6), `cell` (one warp by one pick, 1.5-8
  points; default 2.4), `threads` (the silk warp lines), `stroke`, `width`,
  `height`, `margin`.
- **Generation:** the cloth is a grid of warps × picks filling the page's
  content area. It is divided into rectangles of whole cells: side borders
  (odd width, so they have an axis), two kaki end borders, the kepala and one
  or two body regions. Each region paints gold cells: the side borders a
  diamond chain or zigzag between framing lines; the kaki gold lines and a
  row of small pucuk rebung pointing toward the body; the kepala two edge
  bands (lines and a chain of tiny diamonds) and two rows of tall pucuk
  rebung, rising and hanging, half a pitch apart; the body flowers on a
  half-drop grid (two flowers alternating by row) or a lattice of stepped
  diagonals three cells thick with a flower in every whole diamond. Every row
  of gold is then cut into floats of at most `max_float` warps, as even as
  possible, with a tie-down between them. Line art outlines every gold area
  and the region edges.
- **Guarantees:** deterministic per seed; `verification:
  floats_within_max_warps_motifs_symmetric_regions_tile_the_cloth`. Tested:
  every float lies on one pick and crosses between 1 and `max_float` warps,
  and the floats alone rebuild the gold bitmap exactly; the regions cover
  every cell of the cloth exactly once; every stamped flower has the full
  symmetry of the square (quarter turn and both mirrors) on the cloth; every
  pucuk rebung is mirror symmetric about its axis on the cloth; the
  interlocking triangles never overlap or touch, even at a corner; all ink
  stays on the page for every option and extreme size; out-of-range values
  are reported as `requested_<field>`. Line art carries a colourability check
  (`colorable`); the default cell size is fine, and a larger `cell` gives
  larger areas to colour.
