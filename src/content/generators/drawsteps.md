---
title: "How to Draw"
blurb: "How to draw, step by step — a picture built up in numbered panels, big shapes first, with room to practise"
category: design
version: "1.0.0"
---
Draw a cat, a car or a rocket one easy step at a time.

## What it is

A step-by-step drawing lesson for one picture — an animal, an object or
something from nature. Numbered panels build the picture up a few lines at
a time: the new lines in each step are black and everything drawn before
is grey, starting with the biggest shapes and ending with the small
details. The last step is the finished picture, and an extra panel can
show it coloured in. Below the steps is a big box to practise in, or there
can be an empty box beside every step.

## How to use it

Start at panel 1 and draw only the black lines, the same size and in the
same place as you see them; the faint guide lines help you judge where
things go. In each new panel, the grey lines show what you have already
drawn and the black lines show what to add next. Draw lightly in pencil at
first. When you have finished the last step, go over your lines in pen or
crayon and colour your picture in.

Draw it again in the big box — or in the box beside each step — until you
can draw it without looking.

## Purpose

Step-by-step drawing shows children that a picture is made of simple
shapes put together, which builds confidence as well as hand control and
observation. Copying the size and position of each part practises
proportion, and the steps model a real artist's habit: big shapes first,
details last.

## History

Drawing manuals that break figures into simple shapes go back at least to
the seventeenth century, and nineteenth-century school drawing courses
taught copying step by step. For children the form was made famous by Ed
Emberley's drawing books, from 1970, which built animals from circles,
dots and lines, and by Lee J. Ames's "Draw 50" series from 1974.
Step-by-step "how to draw" books remain some of the best-selling activity
books today.

## This implementation

- **Spec knobs:** `icon` (the picture, or a random one with at least four
  parts), `steps` (most steps, 2-9; a picture with fewer parts uses one step
  per part, and meta records both), `practice` (one big box, a box beside
  each step, or none), `guides` (faint 4 × 4 guide lines), `colour_final`
  (an extra coloured panel), `width`, `height`.
- **Generation:** a picture is a stack of parts — filled shapes, lines and
  dots — drawn back to front. A shape stacked on top of an earlier part
  hides some of it wherever the two overlap (found on a 96-pixel raster),
  so the step order puts every covering shape no later than what it
  covers: the front shapes come first and the parts behind are added
  around them, the way an artist draws only the bits that show. Among the
  parts free to come next, the biggest (by filled area; lines and dots
  count for little) goes first. Steps then merge neighbouring groups,
  lightest first, down to the requested number. Pictures with no mirror
  symmetry are mirrored at random.
- **Guarantees:** each step contains the last — every step, drawn alone in
  black on a 160-pixel raster, has at least the ink of the step before it,
  up to anti-aliasing at shared edges — and the last step's drawing is,
  item for item, the picture's own line drawing (`steps_nested_checked`,
  `final_equals_picture`, with the worst ink loss in meta). The tests
  re-check both on a different raster for every picture in the set, check
  that every covering shape comes no later than what it covers, and that
  every step adds ink. A one-part picture (a plain shape) is a one-step
  page.
