---
title: "Music Staff Paper"
blurb: "Music staff paper — blank five-line staves at rastral sizes, single or braced piano systems"
category: paper
version: "1.0.0"
---
Blank manuscript paper — five-line staves at the traditional engravers'
sizes, single or paired into braced piano systems.

## What it is

A page of empty five-line staves for writing music by hand. The staves are
spread evenly down the sheet, and their size follows the **rastral sizes**
music engravers have used since the days of the rastrum, the five-nibbed
pen that ruled staves onto blank paper. A staff is measured from its bottom
line to its top line:

| size | staff height | typical use |
|---|---|---|
| rastral 0 | 9.2 mm | large, very clear manuscript |
| rastral 1 | 7.9 mm | |
| rastral 2 | 7.4 mm | piano and solo music |
| rastral 3 | 7.0 mm | single instrumental parts |
| rastral 4 | 6.5 mm | |
| rastral 5 | 6.0 mm | choral music |
| rastral 6 | 5.5 mm | |
| rastral 7 | 4.8 mm | pocket scores, cue staves |
| rastral 8 | 3.7 mm | miniature scores |

Two beginner sizes, 12 mm and 16 mm, give young children room for big
note heads. Left on automatic, the page picks the largest size that leaves
comfortable room between the staves: 16 mm on six staves, 12 mm on eight,
rastral 0 on ten, rastral 1 on twelve and rastral 2 on fourteen.

For keyboard music the staves pair up into **piano systems**: two staves
sit closer together, joined at the left by a system line and a curly
brace, with more room between one system and the next.

## How to use it

Print at actual size ("100%", not "Fit to page"). Write the clef, key and
time signature at the start of each staff, then the notes: note heads sit
on the lines or in the spaces between them, and ledger lines extend the
staff above and below — the space between staves is there for them, and
for dynamics, lyrics and fingering.

Choose fewer, larger staves for young learners and for dictation in class,
and twelve or fourteen staves for composing and copying parts. Use piano
systems for anything played with two hands — treble clef on the top staff,
bass clef on the bottom.

## Purpose

Manuscript paper is the composer's sketchbook and the music student's
exercise book: for composing and arranging, transcribing by ear, theory
and harmony exercises, dictation in aural training, and copying out parts.
In a book, staff paper sections make a music notebook or a theory workbook
companion.

## History

The staff grew out of the horizontal lines medieval scribes drew to fix
the pitch of neumes; Guido of Arezzo's teaching in the 11th century used
lines a third apart, and the five-line staff became the norm for most music
by the 16th and 17th centuries. Copyists ruled their own paper with a
rastrum (Latin for "rake"), a pen with five nibs, and rastra were in wide
use in Europe until printed staff paper became cheap and common in the 19th
century — differences in rastrum ruling still help scholars date and place
old manuscripts. Engravers' punches, dry-transfer sheets and printed paper
came in fixed staff sizes, numbered from 0 (largest) to 8 (smallest), and
music software still offers those rastral sizes today.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `staves` per page (2–16,
  default 10); `staff_size` (auto, extra_large 16 mm, large 12 mm, rastral0
  9.2 mm … rastral8 3.7 mm); `grouping` (none, or piano: pairs joined by a
  system line and a brace); `ink` (default charcoal); `weight` in points
  (0.1–2, default 0.4); `staff_ends` (a thin vertical line closing both
  ends of every staff).
- **Generation:** the height inside the margins is split into equal bands,
  one per staff, and each staff is centred in its band. Auto takes the
  largest size no taller than 40% of a band; a chosen size taller than 75%
  of a band steps down to the largest that fits, and the request is recorded
  as `requested_staff_size`. In piano mode each pair of bands holds one
  system: the gap inside the system is 70% of the even gap, and the space
  saved goes between systems. The brace is a filled shape — thin tips that
  turn outward, a swelling body and a point at the middle — 8% of the
  system's height wide, set just left of a system line twice the staff-line
  weight.
- **Solving:** nothing to solve — a page to write music on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** every staff has five lines exactly a quarter of the staff
  height apart; the staff height is exactly the chosen rastral or beginner
  size (recorded as `staff_height_mm` and `space_mm`); single staves are
  evenly spaced; staves never touch; and all ink — strokes and braces —
  stays inside the margins, checked on every page size, orientation, staff
  count and grouping. Piano mode rounds an odd staff count down and records
  `requested_staves`; any knob outside its range is clamped and recorded as
  `requested_<field>`.
