---
title: "Mini Book"
blurb: "One-sheet fold-and-cut mini books — an 8-page zine or a 16-page octavo of tiny mazes, word searches, dot-to-dots, tracing and colouring; page order and upright pages proven by simulating the folds"
category: puzzle
version: "1.0.0"
---
A one-sheet fold-and-cut activity book: eight tiny pages from one cut, or
sixteen from a sheet printed on both sides and folded three times.

## What it is

A little book small enough for a pocket, made from one sheet of paper.
The eight-page book is printed on one side of the sheet; one cut and a few
folds turn it into a booklet. The sixteen-page book is printed on both
sides and folded in half three times, then stapled and trimmed. Inside
there is a cover with a design and a line for the author's name, then a
tiny maze, a word search, a dot-to-dot, a row of lines to trace, a design
to colour, a box to draw in, tic-tac-toe in the longer book, and THE END on
the back. Themes are the ocean, space, the farm, the garden, Christmas and
Valentine's Day. A last page shows every page in order with the answers,
and the folding steps.

## How to play

To make the eight-page book: fold the sheet in half along its length,
then across into eighths, and open it out. Fold it in half across, cut the
solid line from the fold to the middle, and open it again. Fold it along
its length, push the two ends together so the middle opens into a cross,
and fold the pages round into a book with the cover on the front.

To make the sixteen-page book: print the second page on the back of the
sheet, flipping on the long edge. With page 1 at the bottom right, fold
the left half back behind the right, then the top half back, then the
left half back again. Staple twice along the left fold and trim the other
three folded edges.

Then do the pages: find the way through the maze, circle the hidden words,
join the dots in order, trace the lines from the dot to the picture,
colour the design, and draw your own picture in the box.

## Purpose

Making a book is part of the fun: children fold and cut their own, then
own it. Mini books are a classroom staple for early readers and for
quiet time, travel and waiting rooms, and one sheet makes a whole book
with a little of everything.

## History

The one-sheet folded book with a single cut was spread by the zine
makers of the 1970s and 1990s and by teachers, who call it a mini book or
a foldable. Folding a printed sheet three times into sixteen pages is the
octavo, the way printers have made the pages of small books since the
sixteenth century.

## This implementation

- **Spec knobs:** `kind` (eight_page, sixteen_page), `theme` (auto,
  ocean, space, farm, garden, christmas, valentines; a named theme is
  reported as `requested_theme`), `difficulty` (kids to expert: maze cells
  5 × 5 up to 9 × 9, word-search grid 6 × 6 with four words up to 8 × 8 with
  six in all directions, 10 to 26 dots) and `page` (letter, A4; always
  landscape).
- **Generation:** each activity page is another generator's own page —
  maze, word search, dot-to-dot, tracing, and a mandala, stained glass,
  apollonian or celtic design as line art — made with its own seed and
  scaled into its book page. Pages are imposed on the sheet by fixed
  tables: the zine's top row 5 4 3 2 upside down over 6 7 8 1; the
  octavo's front 5 12 9 8 upside down over 4 13 16 1 and back 7 10 11 6
  over 2 15 14 3. The second side (sixteen pages) is the second page; the
  answer page shows all pages in reading order with the puzzles' own
  answer keys.
- **Solving:** each puzzle is solved and proven by its own generator: the
  maze has one route, each word is hidden once, the dots join in one order.
- **Guarantees:** the impositions are proven by simulating the folds, not
  by trusting the tables. The octavo is folded layer by layer (each fold
  reflects the moving layers, turns them over and stacks them behind) and
  the stack must read 1 to 16 from the top, each leaf's two sides
  consecutive, every page upright, and every leaf held by the spine. The
  zine's panels form one loop of paper (the slit cuts the middle two
  columns apart); each panel is carried onto the cover by reflections
  across the creases between them, the reflections must agree all round
  the loop, every page must land on the cover upright with odd pages
  facing the reader and even pages facing back, the spreads 2–3, 4–5, 6–7
  and 8–1 must be joined at the spine and pages 1–2, 3–4, 5–6, 7–8 back to
  back. Tests check that swapping any two pages, or turning any one, makes
  the simulation fail. Each puzzle page's generator must report it unique.
  Difficulty is the size band asked for (`rating_basis`: activity sizes).
- **Where it lives:** in `lako-catalog`, beside colour cards, because it
  uses other generators' pages.
