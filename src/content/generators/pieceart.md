---
title: "Piece Art"
blurb: "Cut-and-glue polygon pictures: a numbered low-poly outline and sheets of matching coloured pieces to cut out or print as stickers"
category: design
version: "1.0.0"
---
Cut-and-glue polygon pictures: match every numbered piece to its numbered
space and a bold low-poly picture appears.

## What it is

A sticker-by-number picture in the faceted, low-poly style. The page is a
picture cut into numbered polygon spaces, drawn in outline. One or more
cutting sheets hold the same shapes in colour, each with its number — print
them on sticker paper, or on ordinary paper to cut out and glue. A last
page shows the finished picture. The subject is an animal or a plant on a
background of sunburst rays, rings or bands; young children get a few large
pieces, adults a few hundred small ones.

## How to use it

Print the outline page, then print the piece sheets on sticker paper (or on
paper or thin card if you will glue them). Cut each piece out along its
edge; there is a little space between pieces so the scissors can get in.
Find the space on the outline with the same number as the piece and stick
it down so its edges line up with the space — every piece fits its space
exactly, once you turn it the right way round (you never need to flip a
piece over). Working from one corner outwards keeps the pieces you have
not used yet easy to find. Check the finished picture page if you want to
see what you are making — or keep it as a surprise.

## Purpose

Matching numbers and shapes, turning pieces until they fit and cutting
carefully build fine-motor skills and spatial reasoning in children, and the
same activity at a few hundred pieces is a relaxing, absorbing pastime for
adults — the pleasure of a jigsaw and a colour-by-number together, with a
striking geometric picture at the end.

## History

Mosaics made of cut pieces of coloured stone and glass are thousands of
years old, and paint-by-number kits were a craze of the 1950s. Sticker
mosaic books that combine the two — numbered polygon outlines and sheets of
numbered stickers — became bestsellers in the 2010s, riding the popularity
of low-poly digital art, in which a picture is reduced to flat-coloured
triangles and polygons.

## This implementation

- **Spec knobs:** `pieces` (about how many, 20–400; the count served is
  reported as `pieces`, and the request as `requested_pieces` when it
  differs); `picture` (any icon from the shared set, or null for a seeded
  animal or plant); `background` (`rays`, `rings`, `bands`, `plain`);
  `palette` (`bright`, `pastel`, `night`); `shapes` (`mixed` polygons of
  three to six sides, or `triangles`); `gap` (space between pieces on the
  sheets, 2–24 pt); `width`, `height`; `line`.
- **Generation:** the subject is drawn over the frame and the background
  colours are the palette's first four that stand at least 70 apart (RGB)
  from every subject colour. A grid of vertices is jittered (undone where a
  cell would turn non-convex or a triangle thin) and vertices near the
  subject's outline are pulled onto it when every cell around stays convex
  with no triangle thinner than 0.22 of a cell. Each cell splits along the
  diagonal that keeps its two triangles most nearly one colour, and each
  triangle takes its majority colour over 15 sample points. In mixed mode,
  neighbouring pieces of one colour are joined, smallest union first, into
  convex polygons of up to six sides and six cells until the count reaches
  the target, so pieces stay small where colours change and grow where they
  do not. Slots are numbered in reading order. Pieces are turned to stand on
  their longest side (or half a turn more, or left as they sit) and
  shelf-packed tallest first, each slid left and floated up while it stays
  the gap from its neighbours; pieces left on the last sheet are then moved
  into any room left on earlier sheets.
- **Solving:** nothing to solve — a craft to make; the finished picture is
  shipped as the answer page.
- **Guarantees:** `pieces_checked` — the slots tile the frame exactly (their
  areas sum to it and no two overlap, separating-axis test); every piece is
  congruent to its slot by a rotation and a shift, never a reflection
  (sides, diagonals and signed area compared, and the recorded motion maps
  one onto the other); the numbers are one-to-one; the pieces on each sheet
  lie inside its cutting area and at least the gap apart; no piece is
  thinner than the minimum width (`thinnest_piece_mm`). The served count may
  exceed a small target when colour changes leave no more joins.
