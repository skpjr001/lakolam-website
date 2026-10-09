---
title: "Guitar Tab Paper"
blurb: "Guitar tab paper — blank tablature staves for 6- and 7-string guitar, bass and ukulele"
category: paper
version: "1.0.0"
---
Blank tablature for guitar, bass and ukulele — one line per string, a TAB
clef on every staff and the string names at the left.

## What it is

Tablature ("tab") writes music as fingering instead of pitch: each line of
the staff is a string of the instrument, and a number on a line says which
fret to press on that string. The page carries evenly spaced tab staves for:

- **Six-string guitar** in standard tuning — the lines are named
  **e B G D A E** from top to bottom. The top line is the thinnest,
  highest string; the small **e** tells it apart from the low **E** at the
  bottom.
- **Seven-string guitar** — the same six strings with a low **B** below:
  e B G D A E B.
- **Bass** (four strings) — **G D A E**, top to bottom.
- **Ukulele** (four strings, standard tuning G C E A) — **A E C G**, top to
  bottom: the A string, nearest the floor, is the top line.

Every staff opens with a barline and the **TAB** clef, the letters T, A and
B stacked down the staff, which is how printed music marks a tablature staff.

## How to use it

Print at actual size. Write a fret number on a string's line to play that
string at that fret; 0 means the open string. Numbers stacked straight up
and down are played together, as a chord; numbers read left to right are
played one after another. Draw a short vertical line across the staff to
mark the end of a bar. Above the staff there is room for chord names,
strumming arrows or rhythm marks.

The top line is always the highest-sounding string — the one nearest the
floor as you hold the instrument — so the staff looks like the strings as
you look down at them.

## Purpose

Tab is how most guitarists and bassists learn and share songs, riffs and
exercises: writing down a solo while it is fresh, transcribing a recording,
planning a lesson, or keeping a practice log. Teachers hand it out for
exercises; in a book, tab sections make a guitar songbook or a practice
journal.

## History

Tablature is older than the modern staff for plucked strings: lute and
vihuela players of the 15th and 16th centuries wrote Italian, Spanish,
French and German tablatures with letters or numbers on lines standing for
the courses of the instrument. Staff notation took over in the 18th century,
but tablature returned in the 20th century for guitar and bass — in
instruction books, in guitar magazines that printed songs in "notation and
tab", and, from the 1990s, as plain-text tabs shared over the internet,
which made it the most common way guitarists write music down.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `strings` (bass4, ukulele,
  guitar6, guitar7); `staves` per page (2–14, default 8); `ink` (default
  charcoal); `weight` in points (0.1–2, default 0.5); `labels` (the string
  names at the left); `tab_clef` (the stacked TAB clef).
- **Generation:** the height inside the margins is split into equal bands,
  one per staff, and each staff is centred in its band. Half of a band is
  shared among the gaps between strings; the result is held to 1.5–4.5 mm
  and rounded down to a tenth of a millimetre (a six-string staff on Letter
  with eight staves has strings 3.2 mm apart). If the page is so crowded
  that strings would sit closer than 1.5 mm, staves are dropped and
  `requested_staves` recorded. The string names are drawn in a mixed-case
  face, so the high e is a real lowercase letter, each centred on its line
  in a lighter tint of the ink; the TAB clef fills the staff's height in
  bold capitals.
- **Solving:** nothing to solve — a page to write music on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** every staff has one line per string at exactly the
  recorded `string_spacing_mm`; staves are evenly spaced and never touch;
  and all ink — lines, barlines, clefs and labels — stays inside the
  margins, checked on every page size, orientation, instrument and staff
  count. A knob outside its range is clamped and recorded as
  `requested_<field>`.
