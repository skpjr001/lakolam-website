---
title: "Colour Nonogram"
blurb: "Colour nonogram — coloured run clues reveal a pixel picture, proven solvable by colour-aware line reasoning alone"
category: puzzle
version: "1.0.0"
---
Coloured numbers around the grid tell you how to fill it in, and a pixel picture appears.

## What it is

A nonogram in colour. Each number beside a row or above a column sits on a
coloured square. It means a run of that many cells of that colour, and the
runs come in the order shown, from left to right or from top to bottom. Every
other cell stays empty. Fill the grid and a small pixel picture appears: an
owl, a parrot, a house, a snowman. Line by line reasoning is always enough,
and there is exactly one picture.

## How to play

Colour the cells so every row and column matches its clues.

- Runs of the **same** colour always have at least one empty cell between
  them.
- Runs of **different** colours may touch, with no gap needed.
- A run longer than half the line must cover the middle cells, wherever it
  starts. Colour those first.
- When a cell can only be one colour, or only empty, in every way the row
  could be laid out, mark it. Then use it in its column.

It helps to put a small dot in cells you know are empty. Work back and forth
between rows and columns until the picture is complete.

## Purpose

The colour line of picture logic (Conceptis Pic-a-Pix Color, CrossMe Color,
the colour section of Griddlers) beside the catalogue's black-and-white
`nonogram`. Colour changes the reasoning: two runs may touch when their
colours differ, so a line can hold more runs than it could in black and
white. It is a friendly, rewarding page for kids and casual solvers.

## History

Nonograms were invented in Japan in 1987, independently by Non Ishida and
Tetsuya Nishio, and spread in the 1990s as Griddlers, Paint by Numbers and
Hanjie. Colour versions followed soon after. Conceptis published coloured
Pic-a-Pix puzzles, and Griddlers.net keeps a large colour archive. Today
colour picture logic is one of the most popular puzzle categories in the app
stores.

## This implementation

- **Spec knobs:** `difficulty`, `picture` (`auto`, or one of 22 pictures from
  the pixel-art library), `double` (draw each pixel as a 2×2 block; null lets
  `auto` take either size), `cell`, `line`.
- **Generation:** the picture's background and white cells become empty,
  since white would not print. Every other colour becomes a clue colour. The
  picture may be mirrored, depending on the seed. With `picture: auto`, the
  seed picks among the pictures, single or doubled, whose line solve lands
  in the requested band. If none does, it picks among the nearest.
- **Solving:** a colour-aware line solver. A line's arrangements are paths
  through a small graph. A node records how many cells have been read, how
  many runs have been placed, and whether the last cell ended a run. An edge
  either reads one empty cell or lays a whole run, and a run may start right
  after a run of a different colour. A forward sweep and a backward sweep
  keep the edges that lie on a complete path. They give each cell exactly
  the values it takes in some arrangement, so every deduction is forced. Rows
  and then columns are swept until nothing changes.
- **Guarantees:** deterministic per seed. The clues describe the picture,
  and line reasoning alone recovers it, which proves it is the only solution.
  The car, sun, cherries, butterfly, balloon and penguin need more than line
  reasoning, so they are left out of the list. Tests check that the line
  solver equals the union of all arrangements on random lines. They also
  check every single-size picture for uniqueness by brute force (rows taken
  from their arrangements, columns checked as they grow). Rated by line-solve
  sweeps, one band harder on a grid of 20 or more (`rating_basis:
  line_solve_passes`). Kids, easy and medium are reachable. Hard and expert
  are not: these pictures are finished in at most three sweeps, even when
  doubled. They are served as medium, the nearest band, and the request is
  reported as `requested_difficulty`. Colour clues need colour printing;
  there is no black-and-white mode.
