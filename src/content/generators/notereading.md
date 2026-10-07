---
title: "Note Reading"
blurb: "Note reading — name the notes on treble and bass staves, from lines and spaces to ledger lines, sharps and flats, or spell words in notes"
category: maths
version: "1.0.0"
---
Name the notes on treble and bass staves — from the lines and spaces to ledger lines, sharps, flats and words spelt in notes.

## What it is

A page of five-line staves, each with a treble or bass clef and a row of
quarter notes, and an empty box under every note. The easiest pages keep
the notes on the staff's lines and spaces; harder pages add the spaces just
outside it, then notes on one, two or three ledger lines above and below,
and at the top level sharps and flats. A second kind of page hides words:
the notes in each bar spell a word such as CABBAGE, BADGE or FACE. The
clef, the staff, the notes and every sharp and flat are drawn as shapes, and
the answer key writes each note's name in its box.

## How to play

Music uses seven letter names, A B C D E F G, then starts again at A. Each
line and each space of the staff is one step up the alphabet.

- **Treble clef:** the curl of the clef wraps round the second line from
  the bottom, which is G. The lines from the bottom up are E G B D F
  ("Every Good Boy Deserves Fruit") and the spaces spell F A C E.
- **Bass clef:** the two dots sit either side of the fourth line, which is
  F. The lines from the bottom up are G B D F A ("Good Boys Do Fine
  Always") and the spaces are A C E G ("All Cows Eat Grass").
- **Ledger lines:** short extra lines carry the staff on above or below.
  Keep counting line, space, line, space. One ledger line below the treble
  staff, and one above the bass staff, is middle C.
- **Sharps and flats:** a sharp (a sign like a hash) before a note raises
  it; a flat (a sign like a small b) lowers it. Write the letter and the
  sign, as in F sharp or B flat.

Write the letter name in the box under each note. On word pages, read the
letters of each bar to find the word.

## Purpose

Reading pitch is the first skill of reading music, taught in every
beginning piano, recorder, band and choir class, and in the music curricula
of the US National Core Arts Standards, England's Key Stage 2 and 3 music
programme and the ABRSM and Trinity theory grades. Fluent note naming comes
from many short, varied drills: these pages climb from the staff alone to
ledger lines and accidentals, and the word pages turn the drill into a
game.

## History

The staff grew out of the single red line that ninth-century scribes drew
through chant notation to fix one pitch. Around 1025 Guido of Arezzo set out
the system of lines and spaces a third apart, with letters at the start of
lines to name them; the treble and bass clefs are those letters — a G and
an F — worn by centuries of handwriting into today's shapes. Ledger lines
appear in print in the sixteenth century, and the mnemonics "Every Good Boy
Deserves Fruit" and "FACE" were teaching staples by the late nineteenth.

## This implementation

- **Spec knobs:** `difficulty` (Kids: lines and spaces; Easy: and the
  spaces just outside the staff; Medium: one ledger line; Hard: up to three
  ledger lines; Expert: Hard plus sharps and flats); `clef` (`treble`,
  `bass`, `mixed` — half of each, shuffled); `task` (`name_notes`,
  `spell_words`); `staves` (3-10); `notes` per staff (4-12; word staves hold
  up to seven letters); page `width`, `height` and `line`.
- **Generation:** each note is a staff position (0 = bottom line) drawn
  from the level's range, leaning towards ledger notes on the levels that
  teach them and never repeating the previous note. Word staves draw from a
  hand-picked list of 42 everyday words spelt only with A-G, each checked
  against the common tier of the shared dictionary and the family filter;
  each letter goes on a random position with that name. Expert word pages
  are served at Hard (words carry no sharps or flats), recorded as
  `requested_difficulty`. Expert never writes E sharp, B sharp, C flat or
  F flat.
- **Solving:** a note's name is read up the diatonic scale from the clef's
  bottom line (E4 treble, G2 bass); the check re-derives every name by
  counting the alphabet out from the clef's own landmark line (G for the
  treble curl, F for the bass dots).
- **Guarantees:** every answer is re-derived independently before the page
  is drawn (`answers_checked` in meta, with the names and scientific
  pitches of every note); each note has exactly one name, so the answers
  are unique; notes and boxes stay on the page at every size.
