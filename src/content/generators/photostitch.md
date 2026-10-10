---
title: "Photo Cross-Stitch"
blurb: "A picture (an upload or a built-in coloured picture) as a counted cross-stitch chart: threads chosen from a built-in palette, symbols, a key with stitch counts and skeins, and a stitched preview"
category: design
version: "1.0.0"
---
Any picture as a counted cross-stitch chart: a few threads chosen to match
it, a symbol on every stitch, a key with stitch counts and skeins, and a
preview of the finished piece.

## What it is

A cross-stitch chart made from a picture: your own photo or drawing, or
one of the built-in coloured pictures. The picture is cut into a grid of
squares, one per stitch, between 40 and 250 stitches across, keeping its
shape. Its colours are reduced to a small set of threads (2 to 40) from a
built-in range of named thread colours, chosen so the stitched piece looks
as close to the picture as those threads allow. White and near-white areas
can be left as bare cloth.

Each square on the chart shows its thread as a coloured square with a
symbol on it, as black symbols only (for printing in black and white), or as
colour alone. Every tenth line is heavier, the lines are numbered along the
top and left, and arrows on all four sides mark the middle. The key lists
every thread with its symbol, number, name, stitch count and the skeins to
buy; the finished size on 14-count Aida is printed below it. A second page
shows the stitched piece.

## How to use it

Each square on the chart is one cross stitch. Find a thread in the key by
its symbol or colour; the key also tells you how many stitches it makes and
how many skeins to buy. Empty squares are bare cloth: leave them unstitched.

Find the middle of your cloth by folding it in half both ways, and start
there: the arrows on the edges of the chart point to the middle row and
column. Count in blocks of ten using the heavy lines. Work each stitch as
two diagonal stitches, with all the top stitches crossing in the same
direction, and use two strands of six-strand cotton on 14-count Aida.

The finished size is given for 14-count Aida. On finer cloth the piece is
smaller (on 18-count, about three quarters of the size). Allow at least
5 cm (2 inches) of extra cloth on every side for framing.

The thread numbers belong to this chart's own colour range, not to any
thread maker: hold your threads against the printed key and pick the
nearest colour you have. A picture with smooth shading looks smoother with
the mixing option on, at the cost of more single stitches in a colour.

## Purpose

Stitching a favourite photo, a pet or a child's drawing is one of the most
popular reasons to take up cross-stitch, and turning a picture into a chart
by hand is slow, fiddly counting. This generator does the counting: it
picks a small, affordable set of threads that suits the picture, gives
every thread a clear symbol, and totals the stitches and skeins, so a
stitcher can see before buying anything how big the piece will be and what
it needs. Fewer colours and fewer stitches make a quicker, bolder project;
more of both make a more lifelike one.

## History

Counted cross-stitch is worked over the countable threads of an even-weave
cloth, so any design on squared paper can be stitched square for square.
Printed charts on squared paper became widespread in the early nineteenth
century with Berlin woolwork, when publishers in Berlin sold hand-coloured
charts that needleworkers copied in wool onto canvas, one painted square
per stitch. Black-and-white symbol charts, cheaper to print than colour,
became the standard in twentieth-century pattern books and magazines, and
Aida, a cloth woven in blocks with clear holes for counting, became the
usual fabric for cross-stitch.

Turning a photograph into a chart rests on two ideas from computer
graphics. Colour quantisation picks a small palette for an image; the
k-means method used here is Lloyd's algorithm (Stuart Lloyd, Bell Labs,
1957, published 1982), named k-means by James MacQueen in 1967. Error
diffusion dithering, which suggests in-between shades by mixing nearby
stitches, is the method of Robert Floyd and Louis Steinberg (1976). Colour
differences are measured in Oklab, a perceptual colour space published by
Bjorn Ottosson in 2020. Computer programs that chart photos for
cross-stitch have been sold since the 1990s.

## This implementation

- **Spec knobs:** `image` (a PNG or JPEG as a data URL or base64; empty
  charts a built-in coloured picture chosen by the seed), `stitches` across
  (40-250; the stitches down follow the picture, at most 350), `colours` (at
  most this many threads, 2-40), `dither` (Floyd-Steinberg mixing),
  `style` (`colour_symbols`, `symbols`, `colour`), `skip_white` (leave
  white as bare cloth), `width`, `height` (page, 144-2000 pt), `margin`
  (0-144 pt). Numbers outside their ranges are clamped and the request is
  recorded as `requested_<field>` in the meta.
- **Generation:** a built-in picture is drawn in its flat colours and
  cropped to its subject; an upload is decoded at up to 800 pixels on its
  longer side. Each stitch takes the area-weighted average of the picture
  under it, in linear light, converted to Oklab. Stitches within 0.035 of
  white are bare cloth when `skip_white` is on. k-means (start: the colour
  nearest the mean, then farthest points; up to 12 Lloyd rounds) finds
  `colours` centres; each, biggest group first, is snapped to the nearest
  unused thread of the built-in 89-thread range, and the groups are
  re-formed round the threads (up to 4 rounds) until they settle. Each
  stitch then takes its nearest chosen thread, or with `dither` the nearest
  after serpentine Floyd-Steinberg error diffusion (bare cloth neither
  takes nor passes on error). Unused threads are dropped; the key lists
  threads by stitch count, most first, and the most-used threads get the
  boldest of 42 vector symbols. The chart, numbers, arrows and key are
  fitted to one page; below 2.5 pt per stitch only the tens lines are drawn.
  All colour arithmetic uses only addition, multiplication and division
  (roots by Newton's method), so results are identical on every platform.
- **Solving:** nothing to solve — a chart to stitch. The answer-key page is
  the stitched preview: every stitch a square of its thread's colour on the
  cloth.
- **Guarantees:** deterministic for a given picture, spec and seed. Tested:
  every cell names a chosen thread or bare cloth, the threads are distinct
  and all used, and the key's stitch counts equal the squares on the chart
  (`counts_match` in the meta); without dithering every stitch is its
  nearest chosen thread; a picture made of two of the range's colours is
  charted with exactly those two threads, square for square; the 42
  symbols differ from one another by at least 20 of 576 pixels at 24 x 24;
  thread names, numbers and colours are distinct; the chart and key fit
  inside the margins of one page for every page shape tested (`one_page`);
  the finished size is the stitch count over 14; skeins assume about 1,800
  full stitches per 8 m skein with two strands on 14-count. Meta records the
  picture source (built-in subject, or upload size and fingerprint), the
  threads with their colours, counts and skeins, bare-cloth squares, single
  stitches (`confetti`), the mean colour error, and `rating_basis: "none: a
  chart to stitch"`.
