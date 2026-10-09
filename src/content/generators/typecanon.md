---
title: "Type Canon"
blurb: "Page-layout canons — Van de Graaf, Villard, Rosarivo ninths, Tschichold and golden-section text blocks constructed on a book spread"
category: paper
version: "1.0.0"
---
The classical page-layout canons drawn out by construction — Van de Graaf,
Villard, Rosarivo's ninths, Tschichold's golden canon — on a two-page spread,
with the text block they give outlined.

## What it is

A diagram sheet for book designers, calligraphers and anyone laying out a
page by hand. It shows a two-page spread (or a single right-hand page) at a
chosen page proportion — 2:3, 1:1.414 (the ISO A-series), 3:4, the golden
section 1:1.618, 5:8, 5:9, 1:1.732, 1:2 or the proportion of the sheet
itself — and draws the construction of a classical canon on it:

- **Van de Graaf canon** — the diagonals of the spread and of each page, a
  vertical from their crossing to the head, and a line across to the other
  page. Where the lines cross gives the corners of the text block: margins
  of one ninth (inner and top) and two ninths (outer and bottom) of the page,
  and a block of the same proportion as the page. On a 2:3 page the margins
  run 2:3:4:6 (inner, top, outer, bottom) and the block's height equals the
  page's width.
- **Villard's figure** — the chain of lines from the medieval sketchbook of
  Villard de Honnecourt that cuts a side into halves, thirds, quarters and
  so on. Run to ninths, it finds the same block as Van de Graaf.
- **Rosarivo's ninths** — the page divided into nine by nine; the block
  takes one ninth inside and at the head, two outside and at the foot.
- **Twelfths** — the same scheme in twelfths, for a larger block (three
  quarters of the page).
- **Tschichold's golden canon** — the text block's height is the page's
  width (swung down the spine with an arc), its corners on the page
  diagonal, margins inner to outer and head to foot 1 to 2.
- **Golden-section block** — a block 1/1.618 of the page each way on the
  diagonal, with the margins split 1 to 1.618.

The text block is tinted and outlined heavier than the construction. A
baseline grid can be ruled inside it, and a caption names the canon, the
page proportion, the block's share of the page and the margin ratio.

## How to use it

Use the sheet to study a canon or to plan the pages of a book. Pick the
proportion of your book's page, and the diagram shows where the text belongs
and how wide each margin is: measure the drawn margins and scale them up to
your page, or work in the stated fractions (for Van de Graaf, one ninth of
the page width inside, two ninths outside; one ninth of the height at the
top, two ninths at the foot).

To construct the canon yourself, follow the drawn lines in order: the long
diagonals, the crossing points, the vertical to the head, the line across to
the other page. The heavy rectangle is where every line meets. Calligraphers
can rule the baseline grid lightly in pencil and write inside the block.

Turn the construction lines off for a clean set of page and text-block
outlines, or draw a single page when only a right-hand page is needed.

## Purpose

Canons of page construction were how scribes and early printers placed text
on a page before anyone measured in points: the margins grow from the spine
outward and from the head down, so the two text blocks of a spread sit
together as one shape, with the most space at the foot where hands hold the
book. Designers use these figures to set up book and journal grids, to
analyse old manuscripts and printed books, and to teach proportion.
Calligraphers use them to lay out manuscript books and broadsides.

## History

The canons were rediscovered in the twentieth century by measuring old books.
J. A. van de Graaf published his construction in 1946. The Argentine printer
Raúl Rosarivo, in *Divina proporción tipográfica* (first published 1947),
concluded that Gutenberg, Peter Schöffer, Nicolaus Jenson and their
contemporaries built their pages on a 2:3 page divided into ninths. Jan
Tschichold drew these strands together in his essays collected in *The Form
of the Book*, describing a "golden canon" in which page and text block are
both 2:3 and the block's height equals the page's width, and showing that
the Van de Graaf construction, Rosarivo's division and the ninths found with
Villard de Honnecourt's thirteenth-century figure give the same block. He
listed the page proportions he thought clear and intentional — the golden
section, 1:1.414, 1:1.732, 1:2, 2:3, 5:8, 5:9 among them — and the Van de
Graaf and Rosarivo constructions work on any of them. Robert Bringhurst's
*The Elements of Typographic Style* surveys the same proportions for
modern books. A variant in twelfths, giving a larger block, is described by
later writers on the canons.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape` (default on, so a spread fills the sheet); `margin_mm` (0–30,
  default 10); `proportion` (two_three, root_two, three_four, golden,
  five_eight, five_nine, root_three, one_two, sheet); `canon` (van_de_graaf,
  villard, rosarivo, twelfths, tschichold, golden_section); `spread` (two
  pages, or one recto); `construction` (draw the construction lines);
  `fill_block` (tint the text block); `baseline_lines` (0–80 lines dividing
  each block's height evenly, 0 for none); `labels` (the caption); `ink`
  (named paper colours, default dark red); `weight` in points (0.1–2) for
  construction lines — page outlines draw at twice it and text blocks at
  three times.
- **Generation:** the pages are the largest of the chosen proportion that
  fit the content box above the caption, centred. Van de Graaf is
  constructed by intersecting the lines it draws: the page diagonal (spine
  head to outer foot) meets the spread diagonal; a vertical rises to the
  head; the line from there to the crossing on the facing page meets the
  page diagonal at the block's top-inner corner; across to the spread
  diagonal and down to the page diagonal give the other corners. A single
  page keeps its unseen facing page so the same lines can be drawn and cut
  to the recto. Villard's figure starts from the crossing of the page's two
  diagonals (one half) and steps the head mark to 1/3, 1/4 … 1/9 by lines
  to the spine foot corner, each crossing the diagonal at the next fraction;
  the block runs from that ninth to seven ninths along the diagonal.
  Rosarivo and twelfths rule the divisions and take the block from the grid;
  Tschichold's canon swings the page width down the spine with an arc and
  places a block of that height on the diagonal with margins 1:2; the
  golden-section block is 1/φ of the page on the diagonal with margins
  1:φ.
- **Solving:** nothing to solve — a reference sheet to study and measure.
  The seed is unused: every seed gives the same sheet.
- **Guarantees:** the constructed blocks match the canon's arithmetic to
  1e-9 pt (tested): on a 2:3 page the Van de Graaf block is 2/3 of the page
  each way, with inner, top, outer and bottom margins of 1, 1, 2 and 2
  ninths of the page side — 2:3:4:6 in length — and its height equals the
  page width; Van de Graaf and Villard give ninths on every proportion; the
  Tschichold block's height equals the page width; the golden block is 1/φ
  of the page. Both pages are the same size at exactly the chosen
  proportion and mirror across the spine; baselines divide the block
  exactly; all ink — strokes, arcs and caption — stays inside the margins on
  every sheet, orientation, canon and proportion. A knob outside its range
  is clamped and recorded as `requested_<field>` in the meta.
