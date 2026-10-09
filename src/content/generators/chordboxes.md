---
title: "Chord Boxes"
blurb: "Blank chord boxes and fretboards — guitar, bass, ukulele, mandolin and banjo diagrams to fill in"
category: paper
version: "1.0.0"
---
Blank chord boxes and fretboards for guitar, bass, ukulele, mandolin and
banjo — empty diagrams to collect your own chords and scales.

## What it is

A chord box is a picture of the fretboard seen face on and upright. The
vertical lines are the strings, lowest string on the left; the horizontal
lines are the frets; the heavy bar across the top is the nut. Each box on
the sheet has a line above it for the chord's name, a little space above
the nut for O (play the string open) and X (leave it out), a small box
beside the first fret for a fret number when the shape is further up the
neck, and if you like the open-string names under the strings
(E A D G B e on a guitar — the small e is the high string).

The sheet holds 4, 9, 12, 20 or 30 boxes with 3 to 7 frets each, for
six- or seven-string guitar, four-string bass, ukulele, mandolin (its
pairs of strings drawn as four) and five-string banjo.

The other diagram is the whole neck turned on its side, as scale charts
draw it: the high string at the top as in tablature, the nut at the left
and 12 to 24 frets spaced just as on a real instrument — each fret a little
closer to the next than the one before — with the position dots of the
instrument (on a guitar at 3, 5, 7, 9, a double dot at 12, and so on). On
the banjo the short fifth string starts at the fifth fret, as it does on
the instrument.

## How to use it

Print at actual size. For each chord, write its name on the line, then put
a dot on a string between two frets wherever a finger presses, with the
finger number (1 index, 2 middle, 3 ring, 4 little) inside it if you like.
Mark strings played open with O and strings left out with X above the nut.
For a shape higher up the neck, write the fret number of the top row in the
small box beside it (for example 5 for a barre chord at the fifth fret);
for a barre, draw a curved line across the strings the finger holds.

On the neck diagrams, dot in a scale or arpeggio across the whole
fretboard, circling the root notes, and write its name on the line above.
The dots and fret numbers help you find your place quickly.

## Purpose

For guitar, bass, ukulele, mandolin and banjo players and teachers:
collecting the chords of a song, building a personal chord dictionary,
writing out chords for students, and mapping scales and arpeggios across
the neck. In a book, these pages make a musician's chord and scale
notebook.

## History

Fretted instruments have long been written in tablature, which shows where
to put the fingers rather than which notes sound. The upright grid chord
diagram became common in the early 20th century, when popular sheet music
printed small ukulele and later guitar chord boxes above the melody, and it
is now the standard way chords are shown in songbooks and method books.
Fret positions follow the twelve-tone equal temperament used on modern
fretted instruments: each fret shortens the string to the twelfth root of
one half of the length before it, so the twelfth fret sits exactly half
way along the string, an octave up.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `instrument` (guitar,
  guitar7, bass, ukulele, mandolin, banjo); `diagram` (chord or neck);
  `layout` (two_by_two, three_by_three, three_by_four, four_by_five,
  five_by_six — across × down; chord boxes); `frets` (3–7, default 5;
  chord boxes); `neck_frets` (12–24, default 15) and `necks` (2–12,
  default 6) for necks; `nut` (heavy nut line); `fret_numbers` (the
  position box beside a chord box's first fret, or numbers under a neck's
  dotted frets); `name_line`; `string_names`; `ink` (default charcoal) and
  `weight` (0.25–2 pt, default 0.6; the nut is four times that).
- **Generation:** chord boxes: the content box is split into equal cells
  with 4 mm gutters; in each a box with frets 1.3 times the string spacing
  is centred, the spacing being the largest the cell allows (at most
  14 mm) with room for the name line, the O/X band, the position box and
  the string names. Necks: equal bands down the page, each neck taking at
  most half its band, the string spacing at most 5 mm and at least 2 mm
  (necks are dropped and `requested_necks` recorded to keep it); fret k of
  n sits at (1 − 2^(−k/12)) / (1 − 2^(−n/12)) of the neck's length from the
  nut. Dots: guitar, seven-string and bass 3, 5, 7, 9, 15, 17, 19, 21 with
  doubles at 12 and 24; ukulele 5, 7, 10, 15, 17, 19 and 12; mandolin and
  banjo 3, 5, 7, 10, 15, 17, 19, 22 and 12.
- **Solving:** nothing to solve — a page to fill in. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** in every chord box the strings are exactly equally
  spaced and the frets exactly 1.3 times that, and each box lies in its own
  cell; on every neck each fret gap is exactly 2^(−1/12) of the one before
  (to 1e-9), so fret 12 halves the string; and all ink — lines, nut,
  boxes, dots and labels — stays inside the margins, checked on every page
  size, orientation, instrument, layout and fret count. A knob outside its
  range is clamped and recorded as `requested_<field>`.
