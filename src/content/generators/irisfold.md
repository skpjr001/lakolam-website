---
title: "Iris Folding"
blurb: "Iris-folding card patterns — a true-size template of numbered strip lines spiralling into a circle, square, hexagon, oval, heart or star, with a coloured preview and strip list; every line a chord of the opening before it and the centre piece covering the last"
category: design
version: "1.0.0"
---
Iris-folding card patterns: a true-size template of numbered strip lines
spiralling into a shape, with a preview of the finished card.

## What it is

A template for iris folding, the card craft in which folded strips of paper
are laid round and round behind a hole in a card until they make a spiral
like the iris of a camera lens. The hole can be a circle, square, hexagon,
oval, heart or star. Inside it the template has a line for every strip,
numbered in the order the strips go down, each with a letter for its paper:
A, B, C and D take turns. A grey line in the middle shows the size to cut
the shiny centre piece. The sheet also shows the finished front of the card
in colour, how many strips of each paper you need, how wide and how long to
cut them, and a 20 mm square to check the page printed at true size.

## How to use it

Print the page at 100% and measure the test square. Cut the outer shape out
of the front of your card (or trace it onto the card and cut it out), then
lay the card face down over the template so the hole sits exactly over the
outline, and tape them together. Cut strips of each paper as the strip list
says and fold each one in half along its length, pattern side out. Now work
in number order: lay strip 1, folded edge first, exactly on line 1, with
the strip reaching outward over the edge of the hole, and tape both ends to
the card. Lay strip 2 on line 2 the same way, then 3, 4 and on round the
shape, using the paper whose letter is printed beside each number. Each new
strip lies over the ones before it. When every line is covered, tape the
centre piece over the small opening that is left, lift the card off the
template, and turn it over: the spiral is on the front. A plain sheet glued
inside the card hides the back.

## Purpose

An iris-folding pattern works only if every strip has something to hold on
to and nothing is left uncovered. Each line has to run right across the
opening that is still showing, the openings have to get smaller every time,
and the last one must be big enough to see the centre piece and small
enough for it to cover. Drawn by hand, a spiral easily drifts: lines stop
short, two lines cross inside the hole, or a gap opens at the edge. Here
every line is placed from the opening left by the strips before it, and the
whole spiral is checked again before the page is drawn.

## History

Iris folding began in the Netherlands, where crafters folded the brightly
patterned inner linings of envelopes into strips and laid them in spirals
behind cut-out shapes. The name comes from the way the strips close in like
the iris diaphragm of a camera. The craft spread through Dutch and English
craft books in the early 2000s and became a favourite for handmade
greetings cards, since it needs only paper scraps, tape and a printed
template. Patterns now range from simple circles and squares to hearts,
stars, animals and seasonal shapes.

## This implementation

- **Spec knobs:** `shape` (auto, circle, square, hexagon, oval, heart,
  star), `size_mm` (30–160, the longer side of the hole; on the sheet and
  template views also no more than fits the page at true size), `sides`
  (3–8 strips per turn of the spiral), `colours` (2–4 papers), `spacing_mm`
  (4–15, and at most an eighth of the size), `twist` (0–40° extra turn per
  strip), `centre_mm` (6–40, and at most two fifths of the size), `view`
  (sheet, template, preview), `palette` (auto, spring, ocean, autumn,
  berry, mono), `width`, `height` (144–3000 pt). Out-of-range values are
  clamped and reported as `requested_*`.
- **Generation:** the seed picks the starting direction, the turning sense
  and (on auto) the shape and palette. Strip `k` faces a direction that
  turns by a full circle divided by `sides`, plus the twist, each time. Its
  fold line sits `spacing_mm` inside the farthest point of the opening
  still showing in that direction, so the strip covers a band exactly that
  deep. The opening is clipped to the near side of the line, and the line
  drawn is the part of it inside the opening before (one piece for a convex
  shape, several for a heart or star). Strips stop when one more would
  leave an opening narrower than `centre_mm` in some direction; the centre
  piece is the hull of the last opening grown by an overlap of half the
  spacing (at least 3 mm). Papers cycle A, B, C, D by strip number. The
  front preview is the mirror image of the template, since the strips are
  laid from the back; what shows of each strip is the opening before it
  minus the opening after it.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed; true size on the sheet and
  template views (a 20 mm test square is drawn where the page has room).
  An independent re-check
  (`verification: strip_lines_are_chords_of_nested_shrinking_apertures_centre_covered`)
  confirms that every strip line lies on its fold line with its ends on the
  edge of the opening before it and its middle inside it; every opening
  lies inside the one before and is strictly smaller; the last opening is
  at least `centre_mm` wide in every direction (its minimum width by
  rotating calipers); the centre piece contains it with the overlap to
  spare; strips are numbered 1, 2, 3, … with papers cycling; and the folded
  strip width is more than the band each strip must cover. Tests break
  patterns by hand and see each check fail, show every option changes the
  page, and sweep every boundary value for a finite page inside its bounds.
