---
title: "Folded book art"
blurb: "Folded-book art patterns — a word, heart, star, paw or tree standing out of a book's page edges, as a measure-mark-fold or cut-and-fold table re-folded to prove it makes the shape"
category: design
version: "1.0.0"
---
A word, heart, star, paw print or tree that stands out of a book's page
edges once every page is folded at the measurements in the table.

## What it is

A pattern for folded book art: an old hardback whose pages are folded, one
after another, so that the edges left standing spell a word or draw a
shape when the book is stood open. The pattern is a table with one row per
page: the page number and where to fold it, measured from the top of the
page. A picture at the top shows the finished book, worked out from the
table itself.

Two methods are offered. **Measure, mark and fold** folds two corners of
each page and leaves one band of page edge showing; where a letter needs
two or three bands in one place (the top and bottom of an O), they are
shown on alternate pages. **Cut and fold** cuts into the page edge at
every mark and folds alternate tabs in, so one page can show several
bands and letters come out crisper. **Inverted** folds the shape away
instead, leaving it recessed into a block of page edges; it reads best
with cut and fold.

## How to use it

1. Find a hardback at least as tall as the pattern's book height with at
   least the number of pages shown. Only the odd (right-hand) page numbers
   are listed; every page between them goes with its neighbour.
2. Measure and mark: on each listed page, measure from the top of the page
   down the outer edge and make a small pencil mark at each measurement.
3. Measure, mark and fold: fold the top corner of the page down so the fold
   runs from the first mark, and the bottom corner up so the fold runs from
   the second mark, both tucked in towards the spine. Fold at about 45°,
   more steeply for marks far down the page, so the corner stays clear of
   the spine. Where both marks are the same, fold both corners to it.
4. Cut and fold: cut straight in from the edge, 1.5 cm deep, at every mark.
   Leave the listed bands standing and fold every other tab (including the
   top and bottom ones) in towards the spine. FOLD IN means fold the whole
   edge in.
5. Work through the pages in order, then stand the book open and fan the
   pages out so the shape shows.

## Purpose

Book folding is a popular gift and home craft that turns a worn-out book
into a sculpture, and patterns are sold by the thousand. A pattern is only
as good as its table: a band in the wrong place, a stroke too thin to read
across the page edges, or a mark too close to the top of the page spoils
the piece. Here the table is folded again, page by page, before it is
printed, and the result must match the shape.

## History

Folded book art grew out of paper sculpture and altered-book art in the
2000s, when craft sellers began to share and sell folding patterns for
names, initials, hearts and animals. Measure, mark and fold is the
classic method; cut and fold came later for sharper lettering, and
inverted designs fold the shape into the book instead of out of it.

## This implementation

- **Spec knobs:** `motif` (`text`, `heart`, `star`, `paw`, `tree`);
  `text` (up to 10 characters, used for `text`); `method`
  (`measure_mark_fold`, `cut_and_fold`); `inverted`; `book_height_cm`
  (12–35); `page_width_cm` (8–25); `book_pages` (100–2000);
  `size_pct` (30–85, the shape's height against the page); `index`
  (which page of the table); `page`; `margin` (inches).
- **Generation:** the shape is a union of discs — the stroke font's centre
  lines (or a core polygon for a silhouette) grown by a radius that is
  never less than 3 leaves and 2.5 mm, so every stroke is at least 6
  leaves wide. Leaves are spaced 0.6 per millimetre of shape width. Each
  leaf's column through the shape is cut exactly (circles, capsules and
  polygons met by a vertical line), rounded to the millimetre, with gaps
  under 3 mm bridged and slivers under 3 mm dropped (both counted in the
  meta). Measure-mark-fold shows run `j mod k` of a column's `k` runs on
  leaf `j`; empty leaves are folded shut at the shape's middle. Cut and
  fold keeps at most six bands per leaf. The pattern is centred in the
  book with ten spare leaves at each end; a book too thin is raised to
  the pages needed and recorded as `requested_book_pages`. Out-of-range
  numbers are clamped and recorded as `requested_*`; text the font cannot
  draw is dropped and recorded as `requested_text` (empty text uses
  LOVE). The seed picks the ink colour and small variations of the
  silhouettes (star points, tree tiers, heart width, toe spread).
- **Solving:** nothing to solve.
- **Guarantees:** `folds_checked`. Every printed row is read back; each
  leaf is folded again as a polygon, its corners (or tabs) reflected
  across their creases. All folded paper stays inside the page (never past
  the spine); the paper still reaching the fore-edge lies within 2 mm of
  the shape (or of the frame minus the shape, inverted); every run of the
  shape at least 7 mm tall shows on its leaf (or, measure-mark-fold, on a
  neighbour in its alternation); marks keep 5 mm from head and tail; bands
  and gaps are at least 3 mm; pages are consecutive odd numbers inside the
  book. A raster check confirms every pixel of the shape lies within two
  leaves and 2 mm of a block 3 leaves wide and 2.5 mm tall wholly inside
  the shape.
