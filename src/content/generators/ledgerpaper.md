---
title: "Ledger Paper"
blurb: "Ledger paper — accounting columnar sheets: date, description and 2-14 dollars-and-cents columns"
category: paper
version: "1.0.0"
---
Accounting columnar paper — a date column, a wide description column and
two to fourteen money columns ruled for dollars and cents.

## What it is

The bookkeeper's working sheet, as sold in columnar pads and analysis pads:
a ruled table with

- a narrow column of **line numbers** down the left;
- a **date** column, split by a fine line into month and day;
- a wide **description** column for the item, account or payee;
- **2 to 14 money columns**, each split by a fine line so the last two
  digit places hold the cents and the rest the dollars.

Across the top runs a row of blank boxes, one over each column, for the
column titles — Debit, Credit, Balance, a month, an account. A heavier
rule every fifth row (or every few rows of your choosing) keeps the eye on
the line. Faint digit rules can divide each money column into eight digit
places with the thousands place marked, so figures stay lined up. The
sheet can be pale green — the classic eye-ease ledger stock — buff, grey
or white, with green, blue, brown or grey ruling.

## How to use it

Print at actual size. Write a title in each box at the top: DEBIT and
CREDIT for a journal, the months of a quarter for a budget, one account in
each column for an analysis. Then enter one transaction a line: the date,
a short description, and the amount in the right column with the dollars
left of the fine line and the cents right of it. Keep digits in the same
places from line to line so the columns add straight down. Rule a single
line under the last figure before writing a total, and a double line under
the total when the column is closed.

## Purpose

Columnar paper keeps figures in columns so they can be added, checked and
cross-footed by hand: household budgets, expense claims, petty cash and
cash books, inventories, club treasurers' accounts, sales tallies and
students' bookkeeping exercises. Wide sheets with many columns carry
analysis work — spreading one set of transactions across several accounts
or months — the job the electronic spreadsheet took over.

## History

Ledgers are as old as double-entry bookkeeping, set down by Luca Pacioli in
his *Summa de arithmetica* of 1494; the word itself comes from a book that
"lay" open in one place in the counting house. Ruled account books and
columnar sheets became standard office stationery in the nineteenth and
twentieth centuries, and green or buff paper with green and brown ruling —
sold as "eye-ease" stock — became the familiar look of the accountant's
pad. A sheet of accounting paper that spread one set of figures across
many columns, often over two facing pages, was called a spread sheet; Dan
Bricklin and Bob Frankston's VisiCalc (1979) modelled the first electronic
spreadsheet on it.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `columns` (money columns,
  2–14, default 6); `row` (mm5, mm6, quarter_inch, mm7, mm8; default
  ¼ inch); `group` (a heavier rule every 0–10 rows, default 5, 0 = none);
  `date_column`, `line_numbers`, `digit_rules`, `labels`; `tint` (none,
  green, buff, gray; default green); `ink` for the ruled lines (default
  green), `column_ink` for column lines, frame and captions (default
  brown); `weight` (0.1–2 pt, default 0.4; column lines and the frame are
  twice as heavy).
- **Generation:** the frame runs just inside the margins. The line-number
  column is 8 mm and the date column 18 mm wide; the money columns share
  what is left after a 30 mm minimum description, at most 28 mm each, and
  the description takes the rest. If the sheet cannot give every money
  column 10 mm, it gets as many as fit and the request is recorded as
  `requested_columns`. The header is two rows deep; rows below it are
  exact, as many whole rows as fit, with the table centred top to bottom.
  The dollars-and-cents line sits at six eighths of each money column.
- **Solving:** nothing to solve — a page to keep accounts on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** every row is exactly the chosen height (recorded as
  `row_mm`, with `spacing_exact`); money columns are all one width between
  10 and 28 mm (`money_column_mm`) and the description at least 30 mm;
  captions and line numbers sit inside their cells without touching; and
  all ink — tint, rules, frame and text — stays inside the margins, checked
  on every page size, orientation, margin, row height and column count. A
  knob outside its range is clamped and recorded as `requested_<field>`.
