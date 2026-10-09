---
title: "Drum Staff Paper"
blurb: "Drum staff paper — percussion manuscript with neutral clefs, five-line or one-line staves, and a drum-kit key"
category: paper
version: "1.0.0"
---
Percussion manuscript paper — five-line drum-kit staves opened by the
neutral clef, or one-line staves for a single instrument, with a drum key.

## What it is

A page of blank staves for writing drum and percussion parts. Drum-kit
music uses the ordinary five-line staff, but its lines and spaces name
instruments instead of pitches, so each staff opens with the **neutral
clef** (also called the percussion clef): two thick vertical bars across
the middle of the staff. A part for one instrument — snare drum,
tambourine, cowbell — is often written on a **one-line staff** instead,
with notes on, above or below the single line.

The optional key at the top shows where each part of the kit is written,
following the widely used convention recommended by the Percussive Arts
Society:

| instrument | where it is written | note head |
|---|---|---|
| crash cymbal | first ledger line above the staff | x |
| hi-hat (played with sticks) | space above the staff | x |
| ride cymbal | top line | x |
| high tom | fourth space | oval |
| middle tom | fourth line | oval |
| snare drum | third space | oval |
| floor tom | second space | oval |
| bass drum | first space | oval |
| hi-hat with the foot | space below the staff | x |

Staves can be divided into equal bars in advance — four to a line is the
usual layout for grooves and fills.

## How to use it

Print at actual size ("100%", not "Fit to page"). Write each sound on its
line or space as the key shows: oval note heads for drums, x note heads for
cymbals and the hi-hat. Put the hands' notes with stems up and the feet's
notes (bass drum, hi-hat pedal) with stems down, so a groove reads as two
layers. Add a time signature after the clef on the first staff.

The key is a common convention, not a law: arrangers vary, so if you place
an instrument differently, write your own key at the top of the part. Use
the one-line staves for snare exercises, rudiments, rhythm reading and
single percussion instruments.

## Purpose

For drummers transcribing grooves and fills by ear, teachers writing
exercises and rudiment drills, students copying patterns from lessons,
arrangers writing drum and percussion parts for bands, and rhythm-reading
practice in class. In a book, drum staff pages make a drum practice
journal or a percussion workbook companion.

## History

For centuries drum parts were written on a bass-clef staff or a single
line, and each publisher placed the drum kit in its own way as the kit
took shape in the early 20th century. The neutral clef — two vertical
bars, showing that the staff carries no pitches — came into wide use in
the second half of the century and is now preferred over the bass clef for
unpitched percussion. To end the confusion between publishers, the
Percussive Arts Society published Norman Weinberg's *Guide to Standardized
Drumset Notation*, whose recommendations — bass drum low, snare in the
third space, cymbals with x note heads at the top — underlie the drum keys
in most method books today.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `staff` (five_line or
  one_line); `staves` per page (2–16, default 10); `staff_size` (auto,
  extra_large 16 mm, large 12 mm, rastral0 9.2 mm … rastral8 3.7 mm);
  `clef` (the neutral clef on every staff); `bars` per staff (0–8, default
  4; 0 leaves the staves open); `legend` (the drum key, five-line staves
  only); `ink` (default charcoal); `weight` in points (0.1–2, default 0.4).
- **Generation:** the key, when shown, is a framed box across the top of
  the page: a short five-line staff at rastral 3 (1.75 mm spaces) with the
  neutral clef and nine note heads at their positions, each named below in
  small capitals sized to fit its column. The height left below it is
  split into equal bands, one staff centred in each. Auto takes the largest
  size no taller than 40% of a band; a chosen size taller than 75% of a
  band steps down to the largest that fits and is recorded as
  `requested_staff_size`. If even rastral 8 would not fit, the staff count
  drops and `requested_staves` is recorded. The neutral clef is two filled
  bars a third of a space wide, from the second line to the fourth (on a
  one-line staff, a space above and below the line); barlines divide each
  staff into equal bars and are a quarter heavier than the staff lines.
- **Solving:** nothing to solve — a page to write music on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** five-line staves have their lines exactly a quarter of
  the staff height apart, at exactly the chosen rastral or beginner size
  (`staff_height_mm`, `space_mm`); staves are evenly spaced and never
  touch; bars are exactly equal; the key sits wholly above the first staff
  with no two labels overlapping, and its positions are recorded in `key`;
  all ink — lines, clefs, key and labels — stays inside the margins,
  checked on every page size, orientation, staff kind and staff count. Any
  knob outside its range is clamped and recorded as `requested_<field>`;
  asking for the key on one-line staves records `legend_shown: false`.
