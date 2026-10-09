---
title: "Index Cards"
blurb: "Index cards — 3×5, 4×6, A7, A6 and business-card sizes to cut out, blank, lined, grid or dot"
category: paper
version: "1.0.0"
---
Printable index and flash cards at their real sizes — 3 × 5 in, 4 × 6 in,
5 × 8 in, A7, A6 and business cards — with cut lines, crop marks and the
ruling of a bought card.

## What it is

A sheet of cards to cut out. Each card is drawn at the exact size of the
card it copies:

- **3 × 5 in** (76.2 × 127 mm) — the classic index card, three to a Letter
  sheet;
- **4 × 6 in** and **5 × 8 in** — recipe, study and planning cards;
- **A7** (74 × 105 mm) and **A6** (105 × 148 mm) — the ISO card sizes used
  outside North America;
- **business cards** — US 3.5 × 2 in, or European 85 × 55 mm.

Inside each card: **lined** like a ruled index card, with a red headline
leaving a band for a heading and blue rules below it; a square **grid**; a
**dot** grid; or **blank**. Cards can lie flat or stand upright, share their
cut lines or sit apart with a gap between them.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog, never
"Fit to page") on card stock if your printer takes it. Cut along the dashed
lines; the short crop marks outside the block show where each cut starts,
so a guillotine or craft trimmer lines up even after the dashes are gone.

Write the topic or question on the red headline and the notes below it. For
flash cards, print a sheet, write a question on one card and its answer on
the back, and shuffle. Use grid cards for small diagrams and formulas, dot
cards for sketches, and blank cards for pictures or name cards.

## Purpose

Study and revision flash cards, recipe cards, speech and presentation notes,
research notes and citations, vocabulary cards, place cards and simple
business or contact cards — whenever a stack of cards is wanted now and the
right pack is not to hand. In a book, a few sheets make a cut-out set of
study cards to go with a workbook.

## History

Keeping one note to a slip of paper, so that notes can be shuffled and
re-sorted, goes back at least to the 17th century: Thomas Harrison designed
a cabinet of slips, the "ark of studies", in the 1640s, and Vincent Placcius
described it in 1689. Carl Linnaeus is often credited with the index card
itself, writing his botanical records on slips of card in the 1760s,
although the claim is disputed. Libraries turned to card catalogues from the
late 18th century, and in the 1870s Melvil Dewey standardised the library
catalogue card — 3 by 5 inches, or 75 by 125 mm — which is still the most
common index card in North America and the UK. Card catalogues guided
readers until libraries put them on computers from the 1980s; the cards
themselves stayed in use for recipes, notes, speeches and flash cards. The
ruled card, with blue lines under a red headline, is the form most shops
sell.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `card` (three_by_five,
  four_by_six, five_by_eight, a7, a6, business_us, business_eu);
  `card_portrait` (stand cards upright); `gutter_mm` (0–20, the space
  between cards; 0 shares cut lines); `ruling` (blank, lined, grid, dot);
  `spacing` (mm4, mm5, quarter_inch, college, mm7, mm8) for rules, grid
  lines and dots; `headline` (the top rule red); `ink` and `weight` (0.1–2
  pt) for the ruling; `cut_lines` and `crop_marks`.
- **Generation:** as many whole cards as fit the content box (less a band
  for the crop marks) are tiled in a block centred on the sheet. A card
  that does not fit the asked way round is turned (recorded as
  `requested_card_portrait`); one that fits neither way is replaced by the
  largest smaller size that does (recorded as `requested_card`). Lined
  cards have their first rule two spacings below the top edge (red when
  `headline` is on) and a rule every spacing down to half a spacing above
  the foot — on a 3 × 5 card at ¼ inch, a red headline at ½ inch and nine
  blue rules. Grid lines are a centred lattice spanning the card edge to
  edge; dots are a centred lattice at least a spacing in from each edge.
  Cut lines are dashed in grey with square ends; crop marks are 4 mm long,
  1.5 mm outside the block, in line with every card edge.
- **Solving:** nothing to solve — cards to cut out and write on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** every card measures exactly its nominal size; cards are
  exactly a gutter apart and never overlap; rules, grid lines and dots are at
  exact spacing and stay on their card; all ink — strokes, dots and marks —
  stays inside the margins (tested on every page size, orientation, card,
  ruling and spacing). A knob outside its range is clamped and the request
  recorded as `requested_<field>` in the meta.
