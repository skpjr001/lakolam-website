---
title: "Genkō Yōshi"
blurb: "Genkō yōshi — Japanese manuscript paper: 400-character sheets with furigana gutters and a centre fold column"
category: paper
version: "1.0.0"
---
Japanese manuscript paper — the 400-character sheet of 20 columns of 20
squares, with furigana gutters and the central fold column.

## What it is

Genkō yōshi (原稿用紙, "manuscript paper") is ruled into columns of square
cells, one character or punctuation mark to a cell. Japanese on it is
written **top to bottom, in columns read from right to left**. Beside each
column, on its right, runs a narrow blank gutter for furigana — the small
kana that show how a kanji is read — and emphasis marks.

The standard sheet holds **400 characters**: 20 columns of 20. Down its
middle runs an unruled centre column with a small fish-tail mark (魚尾,
*gyobi*), a remnant of the fold of the old bound books — fold the sheet
there and each half is a page of 10 columns. The 200-character "half"
sheet (10 columns of 20) is used for film and television scripts, and
15 × 15 and 10 × 10 sheets with bigger cells suit beginners and children.

## How to use it

Print at actual size ("Actual size" or "100%", not "Fit to page"); the
400-character sheet is printed sideways.

Start in the rightmost column and write downward, one character per square,
then move to the next column on the left. Put the title in the first column
a few squares down, and your name in the next column toward the bottom.
Begin each paragraph one square down. Small kana (ゃ, っ) and punctuation
(、。) sit in their own square, in its upper-right corner; write furigana
small in the gutter to the right of the kanji. The faint cross in each
square helps centre characters while you are learning.

## Purpose

Japanese school compositions and essays, writing competitions, students of
Japanese practising kanji and kana, and writers who count length the
traditional way — in Japan a manuscript's length is still given in
400-character sheets. It works equally for Chinese and Korean written in
columns. In a book, manuscript pages make a composition notebook.

## History

Pages of 20 characters by 10 columns go back to woodblock printing: the
Ōbaku edition of the Buddhist canon published by the monk Tetsugen (largely
completed in 1681) set its text 20 characters to a column and 10 columns to
a page, ruled between the columns but not yet into cells. Gridded writing
sheets followed in the Edo period — the 400-character form is said to derive
from the printing blocks of Hanawa Hokiichi's *Gunsho Ruijū*, and Yoshida
Shōin wrote a letter of 1859 on a 20 × 20 sheet. In the Meiji period
manuscript paper close to the modern form became common, and the
400-character sheet became the standard unit of Japanese writing.

## This implementation

- **Spec knobs:** `page` (default a4) and `landscape` (default on);
  `margin_mm` (0–30, default 10); `layout` ("20x20" — 400 characters,
  "20x10" — 200, "15x15", "10x10"; characters per column × columns);
  `centre_column` (on; the 400-character sheet only); `ruby_pct`, the
  furigana gutter as a share of the cell (0–60, default 35); `ink` (default
  orange_brown) and `weight` (0.1–2 pt, default 0.5; the frame is twice as
  heavy); `centre_guide` (on) and `guide_ink` (default warm_gray).
- **Generation:** the cell size is the largest that lets the whole sheet —
  columns, gutters and centre column — fit the content box, rounded down to
  a whole 0.1 mm, and the sheet is centred. Columns are laid right to left,
  each with its gutter on its right; the centre column is as wide as a
  column and its gutter. Cell dividers stop at the gutters, which stay
  blank; the outer frame is heavier.
- **Solving:** nothing to solve — a page to write on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** exactly the layout's number of cells (400, 200, 225 or
  100), every one square and the same size; columns at an exact pitch; the
  centre column exactly in the middle; all ink inside the margins on every
  page size and orientation. A knob outside its range is clamped and
  recorded as `requested_<field>` in the meta.
