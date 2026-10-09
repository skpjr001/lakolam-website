---
title: "Staff and Tab Paper"
blurb: "Staff + tab paper — guitar or bass systems: a notation staff with a drawn clef bracketed above a TAB staff"
category: paper
version: "1.0.0"
---
Guitar and bass manuscript paper — each system a five-line staff with its
clef, bracketed above a tablature staff with the TAB letters.

## What it is

The layout guitar and bass music is published in: every system pairs a
**notation staff** on top — pitch and rhythm in ordinary notes — with a
**tablature (TAB) staff** below it, one line per string with the highest
string at the top, where fret numbers show exactly where each note is
played. The two are joined at the left by a system line and a square
bracket, and read together.

The notation staff opens with the instrument's clef: the treble clef for
guitar and the bass clef for bass guitar, by default with a small 8
underneath, because both instruments sound an octave lower than written.
The TAB staff opens with the letters T, A, B stacked down the lines. Pages
come for six- and seven-string guitar and four- and five-string bass, with
the staves optionally divided into equal bars.

## How to use it

Print at actual size ("100%", not "Fit to page"). Write the notes on the
upper staff and the matching fret numbers on the TAB lines directly below
them, so each note lines up with its fingering: a 0 is the open string, a
3 on the second line from the top means the B string at the third fret.
On a guitar page the top TAB line is the high e string and the bottom line
the low E; on a bass page the top line is the G string.

Use the gap between the two staves for low notes on ledger lines and for
fingering, and the space above each system for chord names and high
notes. Write rhythm on the notation staff — TAB alone does not show it.

## Purpose

For guitarists and bassists transcribing songs and solos by ear, teachers
writing exercises, scales and riffs with both the notes and the
fingering, students working through notation alongside TAB, and songwriters
sketching parts. In a book, staff-and-tab pages make a guitar or bass
practice journal or a lesson workbook.

## History

Tablature is older than the five-line staff for many instruments: lute and
vihuela music of the 15th to 17th centuries was written in tablatures with
letters or numbers on lines standing for the courses of strings. Standard
notation took over in the following centuries, but tablature returned in
the 20th century with the popularity of the guitar, and modern guitar
publishers settled on printing the two together — notation above, TAB
below — so a player gets rhythm and pitch from the staff and the exact
string and fret from the tablature. Guitar music is written an octave
higher than it sounds so it fits the treble staff; the treble clef with a
small 8 below makes that octave explicit, and the same holds for the bass
guitar in the bass clef.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `strings` (guitar6,
  guitar7, bass4, bass5); `systems` per page (4–7, default 6);
  `staff_size` (auto, rastral0 9.2 mm … rastral8 3.7 mm — the notation
  staff's height); `clef` (octave: with the 8 below, plain, or none);
  `tab_clef` (the stacked TAB letters); `string_names` (open-string names
  beside the TAB lines, "e B G D A E" for guitar); `bracket`; `measures`
  per system (0–8, default 4; 0 leaves the systems open); `barlines_through`
  (barlines cross the gap between staff and TAB instead of stopping at each
  staff); `ink` (default charcoal); `weight` in points (0.1–2, default 0.4).
- **Generation:** the page is split into equal bands, one system centred
  in each. A system is the five-line staff, a gap of 4.5 staff spaces, and
  the TAB staff with its lines 1.5 staff spaces apart; 3.2 spaces are kept
  above for the treble clef's loop and one below for the bracket's horn.
  Auto takes the largest rastral size whose system fills at most 82% of a
  band (rastral 3 for six systems of guitar on Letter); a chosen size
  filling more than 95% steps down and is recorded as
  `requested_staff_size`, and if even rastral 8 would not fit, the system
  count drops and `requested_systems` is recorded. The stroke font has no
  clef glyph, so the treble and bass clefs are drawn as filled
  calligraphic shapes: a smooth curve through hand-placed points, its pen
  width varying along the stroke, with round ends and dots — the treble
  clef's spiral ends on the second line (G), the bass clef's head sits on
  the fourth line (F) between its two dots. The bracket is a thick bar
  with curved horns; the system line and barlines are half again as heavy
  as the staff lines.
- **Solving:** nothing to solve — a page to write music on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** notation lines are exactly one staff space apart at
  exactly the chosen rastral size; TAB lines are exactly 1.5 spaces apart,
  one per string; the gap between staff and TAB is exactly 4.5 spaces
  (all recorded: `space_mm`, `tab_spacing_mm`, `staff_tab_gap_mm`);
  systems are evenly spaced and never touch; bars are exactly equal;
  string names clear the bracket; and all ink — lines, clefs, letters,
  names and brackets — stays inside the margins, checked on every page
  size, orientation, instrument and system count. Any knob outside its
  range is clamped and recorded as `requested_<field>`.
