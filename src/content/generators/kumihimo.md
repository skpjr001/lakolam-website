---
title: "Kumihimo"
blurb: "Kumihimo disk braids — kongo gumi on 8, 12 or 16 strands: a numbered loading chart, colour key with strand lengths, and an unrolled and side-view braid preview made by simulating every move, with the pattern repeat found and checked"
category: design
version: "1.0.0"
---
Kongo gumi round braids for the foam kumihimo disk, on 8, 12 or 16
strands, with a loading chart and a preview made by working every move.

## What it is

A complete pattern for a round kongo gumi braid. The loading chart shows the
32-slot foam disk from above with every strand in its slot, lettered by
colour. Beside it are the colour key with how many strands of each colour to
cut and how long, the slot list starting from the top, and the move. Below,
the braid preview shows the surface of the cord unrolled, one row per move,
each strand drawn as a stitch from where it lands, with marks at every
repeat of the pattern. A side view wraps the same stitches round a twisting
cord.

The colourways come in families. A spiral has both strands of a pair in one
colour and opposite pairs alike, so each colour winds down the cord in an
unbroken stripe. Bands load every pair alike with one strand of each of two
colours, giving rings round the cord. Spots set a few single accent strands
in a ground colour. Mixed fills the slots with seeded colours.

## How to use it

Cut the strands to the length given (one and a half times the finished
braid, plus 8 inches for knots and tails), tie them together at one end and
push the knot through the hole from the front. Seat each strand in the slot
the chart shows, starting at the top and working clockwise. The dots on the
disk mark slots 8, 16, 24 and 32.

Each move has three steps. Take the strand on the right of the top pair down
to the bottom and seat it to the right of the bottom pair. Take the strand
on the left of the bottom pair up to the top and seat it to the left of the
top pair. Turn the disk clockwise by one pair, so the next pair is at the
top. Repeat with even tension and the braid forms in the hole. The pairs
creep slowly round the disk as you work; that is normal. Always work the
pair that is at the top.

The unrolled preview reads from the top, one row per move. The side marks
show where the pattern starts again. The foot of the key gives the length
of one pattern repeat in moves, and how many moves it takes for every strand
to come back to its starting slot.

## Purpose

A kumihimo colourway is hard to predict from the disk. The moves shuffle the
strands round the pairs, and a loading that looks random can make a clean
spiral, while one that looks orderly can make an uneven mess. Every preview
here is made by working the moves, not by drawing a picture. A second,
independent model of the disk then works the same moves slot by slot. It
seats each strand in a numbered slot, decides left and right from where the
strand sits seen from above, and lets the pairs creep round as they do on a
real disk. Every move of the two models must agree. The pattern repeat is
found by searching for the shortest one, and every strand must surface once
in each turn of the disk.

## History

Kumihimo, "gathered threads", is the Japanese art of braiding. It goes back
more than a thousand years. Braids tied armour and sword hilts, closed
scrolls and decorated temple objects, and later held the obi of the kimono.
The traditional stand is the marudai, a round mirror-topped stool with the
strands weighted on bobbins. Kongo gumi, the "braid as strong as metal",
is the classic round marudai braid and is usually worked on 16 strands. In
the 1990s the braider Makiko Tada introduced the notched foam disk, which
made the same braids portable and cheap, and kongo gumi became the braid
most beginners learn first. Its colour patterns have been catalogued by
Rosalie Neilson, whose count of the two-colour 16-strand patterns was later
checked and completed by Joshua Holden using de Bruijn's enumeration
theorem.

## This implementation

- **Spec knobs:** `strands` (8, 12 or 16; other values snap to the
  nearest), `family` (auto, spiral, bands, spots, mixed), `colours` (2–4; a
  spiral uses at most half the pair count, bands use 2, spots 2 or 3),
  `length` (finished braid, 2–60 in), `moves` (moves drawn, 8–96),
  `palette` (auto, nautical, lagoon, meadow, mono, berry), `width`,
  `height` (page, 144–3000 pt). Values that are clamped or reduced are
  reported as `requested_*`.
- **Generation:** pairs are spaced evenly round a 32-slot disk, starting
  at slots 32 and 1. The seed chooses the family (when `auto`) and its
  colourway: stripe order for spirals, ground and accent placement for
  spots, and free colours for mixed (every colour used). The moves are
  simulated with the pairs as ordered [left, right] lists. The top-right
  strand joins the bottom pair on its right, the bottom-left strand joins
  the top pair on its left, and the next pair round comes to the top. Each
  move lays two stitches on the surface, in the columns of the pairs the
  strands joined. A stitch is drawn spanning the moves until its column is
  worked again, so the stitches lean and tile. The side view wraps the
  unrolled surface round a cord with a fixed, illustrative twist.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. `verification:
  moves_resimulated_preview_matches_repeat_and_counts_checked`. Every move
  and stitch of the preview is re-simulated from the loading. The printed
  repeat must hold over three full cycles, and no shorter repeat may
  (repeats are whole turns of the disk). The colour counts must add up to
  the loading. Every strand must surface exactly once per turn of the
  disk. The family's property must hold: spiral columns are one colour,
  band moves lay one colour and change, and spot accents never touch. Tests
  replay every braid on an independent slot-by-slot model of the disk.
  They check known loadings: north/south against east/west in two colours
  gives one-colour columns, a light and a dark strand in every pair gives
  rings alternating every two moves, and one odd strand in 16 surfaces once
  per turn. They also find the repeat by brute force, refuse hand-broken
  braids, check that every option changes the page, and sweep every
  boundary for a finite page inside its bounds.
