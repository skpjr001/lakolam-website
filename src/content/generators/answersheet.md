---
title: "Bubble Answer Sheet"
blurb: "Bubble answer sheet — 10-100 numbered questions with A-C, A-D, A-E or T/F bubbles and an optional student-ID grid"
category: paper
version: "1.0.0"
---
A multiple-choice answer sheet — numbered rows of lettered bubbles to
fill in, with NAME, DATE and SCORE, and a student-ID grid if you want one.

## What it is

The familiar test answer sheet, ready to print:

- a header with lines for the NAME, the DATE and the SCORE (out of the
  number of questions);
- a line of instructions with a marked example;
- **10 to 100 questions**, numbered down each column, in one to four
  columns, each with a row of circles lettered **A–C**, **A–D**, **A–E**,
  or **T** and **F** for true-or-false;
- a faint rule after every five questions (or every few of your
  choosing) to help keep your place;
- if you want one, a **student-ID grid**: a box for each digit of the
  number, with a column of bubbles 0 to 9 beneath it.

The letters can be printed inside the bubbles, or once at the head of
each column with plain bubbles below. The sheet prints in a single
colour — red by default, like many printed test forms.

## How to use it

Print one sheet per student. Write your name, the date and, if there is
an ID grid, your number in the boxes — one digit to a box — then fill in
the bubble for each digit underneath. For every question, choose one
answer and fill its circle completely and darkly, like the example. Fill
in only one circle per question; to change an answer, erase the old mark
completely. Check now and then that the question number on the sheet
matches the question you are answering.

To mark the test by hand, fill in the correct answers on a spare sheet,
punch out the right bubbles, and lay it over each student's sheet: an
answer is right when the mark shows through the hole.

## Purpose

Separate answer sheets let one printed test booklet be used again and
again, and make marking fast and fair: a teacher can check fifty answers
at a glance with an overlay key. Teachers use them for quizzes, exams,
practice tests and surveys; students use them to rehearse for
standardised tests that use bubble sheets; quiz nights, clubs and
trainers use them for scored rounds.

## History

Answer sheets marked in pencil and read by machine began with Reynold B.
Johnson, a Michigan schoolteacher who in the early 1930s devised a way to
score tests by sensing the electrical conductivity of pencil marks. IBM
bought the idea and sold it as the IBM 805 Test Scoring Machine from the
late 1930s, and "mark sense" pencils were made for it. Optical scanners,
which read a mark because it reflects less light than the paper around
it, replaced electrical sensing from the 1950s and 1960s, and the
fill-in-the-bubble sheet became the standard form of school and
admissions testing. Machine-read forms are printed in a "drop-out" ink
the scanner does not see, so only the student's pencil marks count.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `questions` (10–100,
  default 50); `choices` (a_c, a_d, a_e, true_false; default a_d);
  `columns` (1–4, default 2); `id_digits` (0–10, default 0 — no ID grid);
  `letters_in_bubbles` (default on); `group` (a faint rule every 0–10
  questions, default 5); `instructions` (default on); `ink` (default
  red); `weight` (bubble outline, 0.2–2 pt, default 0.6).
- **Generation:** the header takes two lines (NAME; DATE and SCORE / N)
  and the instructions two more; the ID grid sits in the top-right
  corner, at most 45% of the page's height. The questions fill the rest:
  rows are at most 9 mm apart and bubbles at most 8 mm apart and 6 mm
  across, each item block centred in its column. When rows would be closer
  than 4.5 mm, more columns are used (up to four) and the request is
  recorded as `requested_columns`.
- **Solving:** nothing to solve — a sheet to answer a test on. The seed
  is unused: every seed gives the same sheet.
- **Guarantees:** one bubble per choice per question, numbered 1 to N down
  the columns; bubbles never touch one another (a gap of at least their
  outline's width); every number sits left of its own row; the ID grid
  has ten bubbles per digit; and all ink stays inside the margins, checked
  on every page size, orientation, margin, choice set, column count and
  ID size. A knob outside its range is clamped and recorded as
  `requested_<field>`.
