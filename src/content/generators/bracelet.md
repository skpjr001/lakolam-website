---
title: "Friendship Bracelets"
blurb: "Friendship-bracelet patterns — normal chevron, diamond and zigzag knot diagrams worked out by moving every string through every knot, and alpha patterns with names and motifs"
category: design
version: "1.0.0"
---
Friendship-bracelet patterns: chevrons, diamonds and zigzags knotted on the
diagonal, and alpha bands with names and pictures. Every knot's colour is
worked out by following the strings.

## What it is

A pattern sheet in the form bracelet makers use.

- **Normal patterns** show the strings across the top, labelled with
  letters, and every knot as a circle in the colour it will show. An arrow
  in each circle gives the knot to tie. Thin lines trace each string from
  knot to knot, and a picture of the finished band runs alongside. The
  families are chevrons, diamonds, zigzags, candy stripes and arrowheads,
  with an optional border that keeps one colour down both edges.
- **Alpha patterns** are a grid of knots that forms a picture: a name or
  short word in a small block alphabet, or hearts, diamonds, waves or
  checks.

A colour key lists each thread, how many strings to cut and how many knots
each colour ties in one repeat. The black-and-white version prints letters
instead of colours.

## How to use it

**Normal patterns.** Cut each string about 1 m (40 in) long. Knot them
together at the top and lay them out in the order shown. Work from the top,
one row at a time. Odd rows knot every pair of strings: 1 and 2, 3 and 4,
and so on. Even rows knot the pairs in between, and the two edge strings
rest. Every knot is two half hitches:

- **Forward (arrow down to the right):** the left string ties twice around the right string
  and ends up on the right.
- **Backward (arrow down to the left):** the right string ties twice around the left
  string and ends up on the left.
- **Forward-backward (> arrow):** the left string ties once forward, then
  once backward, and stays on the left.
- **Backward-forward (< arrow):** the right string ties once backward, then
  once forward, and stays on the right.

The knot shows the colour of the string that tied it, which is the colour
of the circle. When you reach the last row, start again at row 1. Every
string is back where it began, so the pattern carries on without a join.

**Alpha patterns.** The base strings hang straight down and are hidden.
Each colour has one long leading string, and all the leading strings start
on the left. On odd rows, tie forward knots from left to right; on even
rows, tie backward knots from right to left. Each knot is tied by the
leading string of its colour, and the other leading strings are carried
inside the knot. For a word, turn the page a quarter turn anticlockwise to
read it.

## Purpose

Friendship bracelets are often the first thing a child learns to make with
string, and pattern charts are how makers share them. A chart is only useful
if it is right. Drawing the coloured circles by hand is where mistakes get
in: one wrong colour halfway down sends every string after it to the wrong
place. Here the circles are worked out by moving each string through each
knot.

## History

Knotted cords of this kind come from a long line of macramé and
half-hitch work. The modern bracelet is closely linked with the woven and
knotted bands of Central and South America. Friendship bracelets became
popular in the United States in the 1970s and 1980s, given as a token of
friendship and traditionally worn until they fall off. Online pattern
libraries since the 2000s have collected huge numbers of patterns in a shared diagram language: circles for knots, arrows for the knot type,
letters for colours, and "alpha" grids for pictures and names.

## This implementation

- **Spec knobs:** `kind` (normal, alpha); for normal patterns `family`
  (auto, chevron, diamonds, zigzag, candy_stripe, arrowhead), `strings`
  (4–24, even), `colours` (2–6, at most half the strings) and `border`; for
  alpha patterns `alpha_motif` (text, hearts, diamonds, waves, checks),
  `text` (A–Z, digits, spaces and `*` for a heart, up to 16), `alpha_width`
  (7–20 base strings) and `alpha_rows` (8–80); `output` (diagram, preview),
  `threads` (auto, rainbow, pastel, ocean, sunset, forest, berry),
  `line_art`, `width`, `height`.
- **Generation:** normal colours are laid out across the left half in
  blocks or in rotation, then mirrored. The knot field comes from the
  family:
  - a chevron is forward on the left and backward on the right;
  - diamonds alternate chevron and inverted-chevron blocks;
  - a zigzag alternates all-forward and all-backward blocks;
  - arrowheads turn every other pair of rows back with forward-backward
    and backward-forward knots;
  - the border ties forward-backward and backward-forward knots on the
    edge pairs, so the edge strings never move.

  The rows are worked until every colour is back in its starting place on
  a whole cycle of the field; that is the repeat. If no repeat closes
  within 96 rows, a chevron is used instead. Alpha text is set in a 3×5
  block alphabet, turned a quarter turn so it reads along the band. Wide
  bands get a border stripe in a third colour.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. The knot colours are produced by
  moving every string through every knot (`verification` in the metadata).
  They are re-checked by a second simulation that carries colours instead
  of strings, and by a third in the tests written from the knotter's rules.
  Every repeat returns every colour to its starting place, so it joins
  without a seam (`repeat_seamless`). Chevron, diamond and arrowhead
  patterns are mirror-symmetric. Border strings never leave the edges. An
  alpha pattern is worked row by row with its leading strings: each knot
  belongs to a leading string, the bundle ends where it started, and the
  knot counts match the key. Tests also read the alpha text back off the
  grid, catch a wrong knot colour, and sweep every option and boundary.
