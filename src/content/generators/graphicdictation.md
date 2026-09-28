---
title: "Graphic Dictation"
blurb: "Graphic dictation - follow arrow moves or row counts on grid paper to draw a hidden picture"
category: puzzle
version: "1.0.0"
---
Follow the moves on grid paper and a hidden picture draws itself.

## What it is

A sheet of grid paper and a list of directions. In the arrow version, a dot
marks where to start, and each direction is a number and an arrow: 3 → means
"draw a line three squares to the right". Follow every direction in order
and the line comes back to the dot as the outline of a picture. In the row
version, each row of the grid has its own list: how many squares to leave
white and how many to shade, from left to right. Shade every row and the
picture appears.

## How to play

Arrow version: put your pencil on the dot. Read the first direction, count
that many squares along the grid lines in the arrow's direction, and draw
the line. From where you stopped, do the next direction, and so on. A
diagonal arrow crosses squares corner to corner: a 2 with an arrow pointing
up and to the right means go up and right through two squares. Count carefully, because one wrong step moves the rest
of the picture. If you followed every direction correctly, your last line
ends exactly on the dot.

Row version: work one row at a time, left to right. A number with a white
box means leave that many squares white; a number with a black box means
shade that many. The numbers in each row add up to the width of the grid,
which is a good way to check a row.

## Purpose

A classroom classic for building spatial skills, counting and careful
listening or reading: children practise left and right, up and down,
counting squares, and keeping their place in a sequence. It trains attention
without feeling like a test, because the reward is a picture. Teachers often
read the directions aloud as a real dictation; the printed list works for
independent practice too.

## History

*Graphic dictation* (графический диктант) is a standard exercise in Russian
and Eastern European primary schools and kindergartens, used for decades to
prepare young children for writing and to train attention: the teacher
dictates "two squares right, one up..." and the class draws. Run-length
shading, row by row, is the idea behind printed "grid drawing" and knitting
charts, and the same counting underlies the clues of nonograms.

## This implementation

- **Spec knobs:** `mode` (`path` arrows, `rows` run-length), `motif` (28
  pictures, or `auto`), `difficulty`, `mirror` (`auto` is a seeded coin
  flip), `diagonals` (`auto`: from Medium up, path mode only), `scale` (1–3;
  0 picks from the difficulty), `cell` (0 fits a letter page), `line`.
- **Generation:** a vendored library of 28 one-bit pixel pictures (animals,
  a castle, a rocket...). The picture is chosen (seeded, from those whose
  instruction count suits the difficulty), optionally mirrored and scaled.
  Path mode fills any holes and traces the silhouette's outline clockwise
  from the top-left corner of its first square, merging straight steps into
  moves; with diagonals on, runs of one-square staircases that form a real
  slope become diagonal moves, while single notches and battlements keep
  their square corners. Rows mode lists each row's white and shaded runs.
- **Difficulty:** by instruction count, recorded as
  `rating_basis: instruction_count`. Path: Kids up to 24 square moves (small
  pictures drawn at 2× where they fit), Easy 24–40 square moves, Medium up to
  20 moves with diagonals, Hard 21–28, Expert 29+. Rows: Kids up to 30 runs,
  Easy 26–40, Medium 34–50, Hard 44–70, Expert 60+ (small pictures drawn at
  2× from Hard up). If no picture falls in a band, the nearest one is used.
- **Solving:** nothing to deduce; the directions are followed in order. The
  answer key shows the finished picture with the directions beside it.
- **Guarantees:** deterministic per seed. Following the directions
  reproduces the key exactly: in path mode the moves return to the start
  dot, visit exactly the key outline's corners, never cross or touch
  themselves, and stay on the paper; in rows mode each row's runs add up to
  the grid width and shade exactly the key's squares. The tests replay the
  directions from scratch and compare, and check with an independent
  point-in-polygon test that the outline encloses exactly the picture's
  squares (apart from the squares a diagonal cuts).
