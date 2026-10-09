---
title: "Chess Diagram Sheets"
blurb: "Chess diagram sheets — blank 8x8 boards with coordinates, side-to-move boxes and captions, or a game score sheet"
category: paper
version: "1.0.0"
---
Blank chess boards to record positions, with a–h and 1–8 around the edge,
side-to-move boxes and caption lines — or a tournament-style score sheet.

## What it is

A page of empty 8 × 8 chess boards drawn the way chess books print their
diagrams: light squares white, dark squares a pale tint (or the typesetters'
diagonal hatching, running from bottom-left to top-right), and a light
square in each player's right-hand corner. Files **a** to **h** run along
the bottom and ranks **1** to **8** up the side; turn the board round and
Black sits at the bottom, with the coordinates reversed to match.

- **1, 2, 4, 6 or 9 boards** to a page, laid out as large as the sheet
  allows, each numbered at its top-left corner.
- **To move** — two tick boxes under each board, "white to move" and
  "black to move".
- **Caption lines** — up to three ruled lines under each board for the
  source, the players, or the solution.
- **Score sheet** — numbered move rows (1–60 by default) in White and Black
  columns, split into side-by-side blocks like a tournament score sheet,
  under a header for event, date, players, round, board, opening and
  result. It can sit beside the boards or fill the page on its own.

## How to use it

Print at actual size. Draw the pieces into the squares with a pencil — a
letter (K, Q, R, B, N, P) works well, circled for Black — or use small
stickers or stamps. Tick the box for the side to move, and write where the
position came from on the caption line.

To keep the record of a game, use the score sheet: write each move in
algebraic notation, White's move then Black's on the same numbered row.
On the combined page, sketch the critical positions on the boards beside
the moves and number them in the score so you can find them later.

Coaches can print a sheet of six or nine boards as a puzzle handout: set up
a position on each board, tick who is to move, and leave the caption line
for the solution.

## Purpose

For chess players, coaches and clubs: recording positions from games and
lessons, writing up puzzles and endgame studies, preparing homework sheets
and opening notes, and keeping the score of a game played over the board.
In a book, the sheets make a chess notebook or a companion workbook for a
course.

## History

Printed chess diagrams are as old as printed chess books: Lucena's
treatise of 1497 already set out positions on diagrams. Typeset
diagrams settled on the convention still used today, with the board seen
from White's side and the dark squares marked by diagonal hatching that
almost always runs from bottom-left to top-right. The rule that each
player has a light square at the right-hand corner is written into the
FIDE Laws of Chess. Algebraic notation, naming squares by file letter and
rank number, replaced descriptive notation in most countries during the
20th century and became FIDE's only recognised notation in 1981. Players
in rated games must write down the moves as they play, which is why
tournament score sheets — numbered rows in White and Black columns, with
a header for the players, round and result — are handed out at every
board.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `mode` (diagrams,
  diagrams_with_score, score_sheet); `boards` (one, two, four, six, nine);
  `squares` (shaded, hatched, outline); `dark_ink` (default pale grey);
  `ink` (frames, labels and rulings, default charcoal); `weight` (frame
  weight 0.25–3 pt); `coordinates`; `flipped` (Black at the bottom);
  `numbers`; `to_move`; `caption_lines` (0–3); `header`; `moves` (10–100
  numbered rows, default 60).
- **Generation:** of the grids that hold exactly the asked number of
  boards (2 × 3, 3 × 2, 1 × 6 … for six), the one giving the largest board
  wins; the square is the largest whose board, coordinates, tick boxes and
  caption lines fit the cell, floored to a whole half millimetre, and each
  board block is centred in its cell. Coordinate size follows the square
  (cap height never more than 0.8 of a square); files are drawn in real
  lowercase. When boards are too small for their extras, the tick boxes,
  captions, numbers and coordinates are dropped in that order and listed
  in `dropped_for_space`. Hatching is 45° lines from bottom-left to
  top-right at about seven to a square, continuous across the board. The
  score uses the fewest side-by-side blocks (at least 42 mm wide) whose
  rows are at least 4.5 mm tall, at most 7 mm; if even the most blocks
  cannot hold every move, the rows that fit are numbered and the request is
  recorded as `requested_moves`.
- **Solving:** nothing to solve — a page to write and draw on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** every board is eight exactly equal squares each way with
  a dark square at the bottom-left and a light one at the bottom-right
  (a1 dark, h1 light; h8 dark when flipped); boards never overlap and no
  label overlaps another label or a board; the score numbers 1 to the last
  move once each, in order; all ink — strokes and text included — stays
  inside the margins, checked on every page size, orientation, mode and
  board count. A knob outside its range is clamped and the request recorded
  as `requested_<field>` in the meta.
