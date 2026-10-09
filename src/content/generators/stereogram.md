---
title: "Stereogram"
blurb: "Stereogram — a repeating tile pattern that hides a 3D shape, stack, pyramid or word, with the hidden picture as the key"
category: design
version: "1.0.0"
---
A page of repeating coloured tiles that hides a picture in 3D — relax
your eyes and a shape, a stepped pyramid or a word floats out of it.

## What it is

An autostereogram: a single image that, viewed with the eyes focused
beyond the page, shows a three-dimensional picture. The page is a
wallpaper of small coloured tiles (mosaic squares, bricks or a woven
pattern) that repeats across the page about every 25 millimetres. Where
the repeat is a little shorter, that part of the picture seems nearer.
The hidden picture is one raised shape, a stack of two or three shapes at
different depths, a four-tier stepped pyramid or cone, or a word. Two dots
above the picture help you find the focus, and the answer page shows the
hidden picture with nearer parts darker.

## How to use it

Hold the page close to your face, so it is blurred, and look through it
as if at something far away. Slowly move the page away while keeping
your eyes relaxed. The two dots above the picture will double into four;
when the middle two merge into three, your eyes are set: lower your gaze
to the pattern and wait. The hidden picture will appear in depth, and the
longer you look the sharper it gets.

The cross-eyed version is viewed the other way: cross your eyes slightly
in front of the page until the dots make three.

Not everyone can see stereograms. People with a weak or lazy eye, or
little depth vision, may never see the picture, and that is nothing to
worry about. Take a break if your eyes feel tired.

## Purpose

The hidden-picture book format that sold in millions in the 1990s, for
puzzle books, seniors' vision-exercise books and classroom science (how
two eyes judge depth). Every page is checked: the picture is really
there and readable from the colours alone.

## History

Charles Wheatstone described stereoscopic depth in 1838 with paired
drawings. Béla Julesz's random-dot stereograms (1959) showed that the
brain finds depth with no other clue. Christopher Tyler and Maureen Clarke
made the first single-image random-dot autostereogram in 1979, and
Thimbleby, Inglis and Witten (1994) gave the standard algorithm with
hidden-surface removal. Colour wallpaper stereograms became a craze in
books, posters and newspaper features in the early 1990s.

## This implementation

- **Spec knobs:** `picture` (auto, shape, stack, steps, word), `text` (a
  word of 1–8 letters or digits; with picture auto it makes a word
  picture), `pattern` (mosaic, bricks, weave), `palette` (auto, jewel,
  ocean, forest, sunset, mono), `viewing` (parallel, cross), `separation`
  (the background repeat, 18–40 mm), `guides`, `width`, `height` (page,
  144–3000 pt). A page too narrow for two and a half repeats takes a
  smaller repeat; a very large page keeps the picture to a 1200 × 700 grid.
  Clamps are reported as `requested_*`; text with characters that cannot
  be drawn is cleaned and reported.
- **Generation:** the picture is a depth map of four levels above the
  background on a grid of 96 columns per repeat (rows twice as tall).
  Each row is linked by the Thimbleby–Inglis–Witten algorithm (depth of
  field one third, eye separation two repeats) with hidden-surface
  removal; each column takes a coordinate in a repeating tile pattern —
  its own, or the one it is linked to — and its colour from the tile
  there. Runs of one colour merge into rectangles, so a page is a few
  thousand to some tens of thousands of shapes. Cross-eyed pages invert
  the depth.
- **Solving:** nothing to solve; the answer page shows the hidden
  picture.
- **Guarantees:** deterministic per seed.
  `verification: every_linked_pair_equal_and_depth_decoded_from_colours`.
  Every linked pair of positions has the same colour, and an independent
  decoder that reads only the colours finds, at sampled points, the one
  depth level whose repeat makes a 40-column window repeat exactly; where
  the true depth is flat around the window it must agree (at least 99.5%,
  in practice 100%), or the page is refused. Tests also rasterise the
  printed page, read the colours back from the pixels and decode them,
  check that noise decodes to nothing, and sweep every option.
