---
title: "Mural"
blurb: "Collaborative colouring posters — one mandala, stained glass or tiling split into numbered pages that tape into a wall mural; tiles partition the poster exactly, edges register, no page is blank"
category: design
version: "1.0.0"
---
A collaborative colouring poster: one big design split into numbered pages
that everyone colours, then tapes together into a wall mural.

## What it is

A mandala, a stained-glass window, a tiling or another design is drawn at
poster size and cut into a grid of pages, from 2 up to 36. Each page holds
one part of the picture in black outline, a dashed line to cut along, a
position code such as B3 (row B, column 3), and, in its margins, the codes
of the pages that join it on each side with small ticks to line them up.
A first page shows the whole poster in miniature with the grid and every
code on it, and the steps for putting it together. The poster can also be
printed in the design's own colours as ready-made wall art.

## How to use it

Print the guide page and the poster pages, and give one page to each
person or group. Colour your page right up to the dashed line, then cut it
out along the line. Lay the pages out by their codes, using the guide: the
letter is the row, the number the column. The codes in each margin name
the page that goes on that side, and the ticks on two neighbouring pages
line up when they are the right way round; check them before you cut.
Tape the pages together from the back and hang the poster up.

## Purpose

Collaborative posters are a favourite classroom activity for the start of
term, a theme week or the hundredth day of school, and they work just as
well for seniors' groups, libraries and community events: everyone colours
a small piece, and the finished poster belongs to the whole group. Any
number of people can join in, from a pair to a class of thirty-six.

## History

Group murals go back to the Mexican muralists of the 1920s and the public
art projects of the 1930s. Splitting a picture into a grid so many hands
can work on it is the old artists' method for enlarging a drawing square
by square; classroom colouring posters made this way became popular with
teacher-made printables in the 2010s.

## This implementation

- **Spec knobs:** `source` (auto, mandala, stained glass, voronoi,
  isohedral, tessellation, apollonian, zentangle, girih, celtic; a named
  source is reported as `requested_source`), `pieces` (2–36; the grid is
  the rows × columns with exactly that many pages whose poster is nearest
  square, and when every such grid is a strip longer than 2.5 : 1, as for
  most primes, the next count with a good grid is used and the request
  reported as `requested_pieces`), `index` (0 the guide, then the pages in
  reading order; wraps round), `coloured`, `page` (letter, A4) and
  `landscape`.
- **Generation:** the source design is generated, reduced to black line
  art (light fills become outlined spaces, dark fills and lines black;
  its captions dropped) and scaled to cover the poster inside a framing
  line. Each page's window shows its rectangle of the poster: every
  drawing operation is carried into the window and clipped exactly to it
  (a design's own clipping paths are intersected with the window), so
  nothing spills past the cut line. Line widths scale with the poster and
  are held between 0.75 and 4 pt. If any page would be nearly empty (a
  big empty circle of an apollonian gasket can swallow a page of a large
  poster), the design is repeated in a 2 × 2, then 3 × 3 … grid of framed
  copies until every page has some (`repeat` in the meta).
- **Solving:** nothing to solve; the pages are coloured and assembled.
- **Guarantees:** `obeys()` checks that the tiles partition the poster
  exactly (their areas sum to it, no two overlap, each lies inside it and
  is the size of the printed window), that every shared edge meets its
  neighbour along its whole length with identical registration ticks while
  poster edges carry none, that the codes are distinct, and, on a fresh
  raster of every page, that each window holds ink and every design line
  is at least 0.75 pt wide. A test pastes the rasterised windows together
  and compares them with the poster drawn in one piece. Meta reports
  `partition_checked`, `registration_checked`, `no_blank_tile` and
  `min_line_pt`.
- **Where it lives:** in `lako-catalog`, beside colour cards, because it
  uses other generators' designs.
