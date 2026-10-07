---
title: "Rhythm"
blurb: "Rhythm — count the beats of notes and rests, complete the bar, draw the bar lines; exact fraction answers"
category: maths
version: "1.1.0"
---
Count the beats of notes and rests, complete the bar, draw the bar lines — every answer an exact fraction.

## What it is

A page of rhythm questions, every note and rest drawn as shapes. Counting
questions add up a few notes and rests (a quarter note plus an eighth note
is one and a half beats) and ask for the total. Bar questions show a bar in
2/4, 3/4 or 4/4 time with one note hidden by a box, to be filled with the
single note that makes the bar add up. Bar-line questions show a rhythm
several bars long with its bar lines left out. Kids pages use whole, half
and quarter notes; harder pages bring in eighths, rests, dotted notes,
sixteenths and syncopation. The answer key writes the totals, draws the
missing notes in their boxes and draws the bar lines in.

## How to play

A quarter note is one beat. A half note is 2 beats, a whole note 4, an
eighth note half a beat and a sixteenth note a quarter of a beat. A dot
after a note adds half its value again: a dotted half note is 3 beats, a
dotted quarter 1 and a half. Each rest lasts as long as the note of the
same name.

- **How many beats?** Add up the notes and rests. Write fractions as halves
  and quarters: 2 and a half, 3 and three quarters.
- **Complete the bar:** the top number of the time signature is the number
  of beats in a bar. Add up what is there, take it away from the bar, and
  draw the one note that fills the gap.
- **Draw the bar lines:** count along from the start; each time you reach
  the top number of the time signature, draw a bar line.

## Purpose

Rhythm is the arithmetic of music: note values are fractions, and a bar is
an addition sum that must come out exactly. Counting beats, completing bars
and placing bar lines are the core rhythm drills of beginning instrumental
and classroom music and of the first theory grades, and they reinforce
fractions — halves, quarters, adding mixed numbers — at the same time.

## History

Medieval chant had no fixed rhythm; around 1260 Franco of Cologne gave each
note shape a duration, and fourteenth-century Ars Nova theorists divided
long notes into two or three shorter ones. The note shapes became round in
the fifteenth century, bar lines became regular in the seventeenth, and
time signatures took their modern form of one number over another by the
eighteenth. The American names (whole, half, quarter) translate the German
ones; British English keeps the older semibreve, minim and crotchet.

## This implementation

- **Spec knobs:** `difficulty` (Kids: whole, half and quarter notes in
  4/4; Easy: eighth notes, quarter and half rests, 3/4; Medium: dotted half
  notes, eighth and whole rests, 2/4; Hard: sixteenths and dotted quarters;
  Expert: dotted eighths and syncopation); `task` (`mixed`, `count_beats`,
  `complete_bar`, `bar_lines`); `count` (4-12); page `width`, `height` and
  `line`.
- **Since 1.1.0:** `line` scales every rule and diagram stroke on the
  page and its key (it was accepted but changed nothing before); a
  `count` outside its range is clamped and recorded as `requested_count`.
- **Generation:** bars are filled beat-group by beat-group from the level's
  rhythm cells (a quarter, two beamed eighths, four sixteenths, a dotted
  quarter and eighth…), so beams always cover exactly one beat and nothing
  straddles a bar line. Counting questions draw two to four notes and
  rests; Medium and above prefer totals with a fraction. Lengths are summed
  as exact fractions.
- **Solving:** the missing note's length is the bar less the notes shown;
  bar lines fall where the running count reaches a whole bar.
- **Guarantees:** every answer is re-checked in whole sixteenth notes from
  a separate table (`answers_checked`); a missing note is the only note
  value of the level with the missing length (note values all differ in
  length; dotted values appear only on levels that teach them); every beam
  group is one beat inside one bar; questions on a page never repeat.
