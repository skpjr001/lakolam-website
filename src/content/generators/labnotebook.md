---
title: "Lab Notebook Page"
blurb: "Laboratory notebook page — title, project and page boxes, a 5 mm grid, signed and witnessed footer"
category: paper
version: "1.0.0"
---
A laboratory notebook page — boxes for the title, project, notebook and
page number, a 5 mm grid, and lines to sign, date and witness the work.

## What it is

The page scientists and engineers keep their records on, laid out the way
bound research notebooks are:

- a **header** with boxes for the TITLE of the experiment, the NOTEBOOK NO.,
  the PAGE NO. (printed, counting up through a book), the PROJECT, and the
  page the work was CONTINUED FROM;
- a **body** ruled in squares — 5 mm, 4 mm, five to the inch or four to
  the inch — or with dots at the grid points, or lines only;
- a **footer** where the author SIGNS and DATES the page, notes the page
  the work is CONTINUED TO, and a witness signs that the page was
  WITNESSED AND UNDERSTOOD, with the date.

Every box edge lies on a grid line and the grid is whole squares, so
tables and sketches can use the full page.

## How to use it

Print at actual size, or make a book of numbered pages. Fill in the header
before you start: the title of the experiment, the project, the notebook
number. Then record the work as you do it, in ink, in order: the aim, the
materials and quantities, the method, every observation and measurement,
and your conclusions. Draw tables and graphs straight onto the grid. Never
erase or tear out a page: strike a mistake through with a single line so
it can still be read, and initial and date the correction. Tape printouts
in place and sign across their edges. When the work runs onto another
page, write that page number in CONTINUED TO PAGE, and on the new page the
old one in CONTINUED FROM PAGE. Draw a line through any space left blank,
sign and date the page at the end of the day, and have a colleague who can
follow the work — but did not do it — read it and sign as witness.

## Purpose

A lab notebook is the permanent, dated record of what was done and what
was found: it lets the work be repeated, checked and built on, and it is
the evidence when results are audited or a discovery is disputed. The
same page serves students' practical write-ups, engineering logbooks,
inventors' records, field and workshop notes.

## History

Scientists have kept dated laboratory records for centuries — Michael
Faraday's laboratory diaries of the 1820s to 1860s, numbered paragraph by
paragraph, are a famous example. The signed and witnessed page grew up
with patent law: under the United States' first-to-invent system an
inventor proved the date of an invention with notebook pages signed by
witnesses who understood them, and the signature and "witnessed and
understood" lines became standard in research notebooks. The US moved to
first-inventor-to-file in 2013, but the practice continues because the
same records satisfy auditors and regulators: Good Laboratory Practice
rules — the US FDA's 21 CFR Part 58 from 1978 and the OECD Principles of
GLP from 1981 — require raw data to be recorded promptly, legibly and
indelibly, dated and signed, with every change traceable.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `body` (grid, dots, lined);
  `spacing` (mm4, mm5, fifth_inch, quarter_inch; default 5 mm); `witness`
  (the witness row), `continuation` (the continued from / to boxes),
  `numbered` and `index` (page `index + 1` is printed, 0–9998; a book
  advances it one a page); `ink` for the ruling (default light blue),
  `frame_ink` for boxes, frame and captions (default dark blue); `weight`
  (0.1–2 pt, default 0.3; the frame is three times as heavy, at least
  0.8 pt).
- **Generation:** the frame is as many whole squares wide as fit inside
  the margins, centred. Header and footer rows are each the fewest whole
  squares that make at least 9 mm; the body is the whole squares left
  between them. Box divisions fall on grid lines at about 50, 60, 70 and
  80% of the width. Captions sit in the top-left corner of each box, made
  smaller only when a box is too narrow for them; the page number sits in
  the bottom-right of its box.
- **Solving:** nothing to solve — a page to record work on. The seed is
  unused: every seed gives the same page.
- **Guarantees:** the ruling is exactly the chosen spacing (`spacing_mm`,
  `spacing_exact`) and whole squares each way (`squares`); every box edge
  lies on a grid line; every caption and the page number lie inside their
  boxes without touching; and all ink stays inside the margins, checked on
  every page size, orientation, margin, spacing and body. The fields
  printed are listed in `fields`. A knob outside its range is clamped and
  recorded as `requested_<field>`.
