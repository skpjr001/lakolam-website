---
title: "Tracing Lines"
blurb: "Tracing lines — pre-writing and scissor-skill paths that never cross"
category: design
version: "1.0.0"
---
Rows of dashed paths from a green dot to a little picture: trace them with a
pencil, or cut along them with scissors.

## What it is

A pre-writing and fine-motor page. Each row holds one dashed path that runs
from a start mark on the left to a picture on the right — a star, heart,
flower, sun or house. The paths are the strokes handwriting is built from:
straight lines, zigzags, waves, loops, arches, castle battlements, mountain
peaks and spirals. Harder pages make the shapes tighter and chain two or
three of them into one longer path. The cutting version draws thick black
cut lines with a pair of scissors at the start of each row.

## How to use it

Put your pencil on the green dot and follow the dashes all the way to the
picture without lifting, trying to stay on the line. Go slowly on the
corners of a zigzag or castle and keep the curves round on waves and loops.
On a spiral, keep turning until you reach the picture in the middle. For a
cutting page, start where the scissors are, cut along the thick dashed line
and turn the paper, not the scissors, as the line bends.

## Purpose

The first worksheet most children meet before letters, and a staple of
preschool activity books and occupational-therapy packs. Tracing builds the
pencil control that handwriting needs; cutting on a line builds the
two-handed coordination of holding paper and scissors.

## History

Guided line tracing goes back to the copy-books and slate drills of
nineteenth-century schooling, and Maria Montessori's metal insets and
sandpaper letters made "trace the shape before you write it" a principle of
early education. Dotted and dashed tracing sheets became a fixture of
preschool workbooks in the twentieth century, alongside scissor-skills pages.

## This implementation

- **Spec knobs:** `mode` (`trace` or `cut`), `pattern` (`auto`, one shape
  for every row — `straight`, `zigzag`, `waves`, `loops`, `arches`,
  `spirals`, `castle`, `mountains` — or `mixed`), `difficulty`, `rows`
  (0 = from the difficulty), `width`/`height`/`margin` (letter page, half-inch
  margins by default), `title`.
- **Generation:** the page is divided into horizontal lanes, one per row;
  each shape is drawn inside its lane, starting and ending on the lane floor
  so that shapes can be chained without a jump. Auto pages deal the shapes
  like a deck so a page shows variety before any shape repeats, and harder
  pages mix shapes within a row with a seeded probability. Difficulty sets
  the number of rows (5 to 9), the line weight (4.2 pt down to 2 pt) and
  the repeat length (160 pt down to 50 pt), so Kids pages are wide gentle
  curves with thick lines and Expert pages tight, mixed and longer. A spiral
  takes two rows' height on tighter pages so its coil has room to turn.
  Dashes are laid by walking the path's arc length.
- **Solving:** nothing to solve — this is a practice page; `rating_basis` is
  `path_complexity`.
- **Guarantees:** deterministic per seed. Every path, mark, picture and
  scissor glyph stays inside the page margins; each path keeps to its own
  lane with a clear gutter, so paths never cross each other (the minimum
  distance between rows is measured on the finished page and reported as
  `min_gap_pt`). The dash pattern starts exactly at the start mark with a
  full dash and alternates at the stated lengths to the end. Spiral coils
  keep their turns at least three line widths apart.
