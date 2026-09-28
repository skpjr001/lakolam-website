---
title: "Telling Time"
blurb: "Telling time — read, draw and advance analogue clocks"
category: puzzle
version: "1.0.0"
---
A page of clock faces: read the hands, draw the hands, and work out what time
it will be later.

## What it is

A worksheet of analogue clocks, six to twelve to a page. Some clocks have
their hands drawn and a line underneath for the time; others print a time
under an empty face for the hands to be drawn in. At the higher levels the
last row asks about elapsed time: the clock shows a start time, a caption
says how much later ("1 HR 25 MIN LATER"), and the new time goes on the line.

## How to play

On a clock with hands, look at the short hand first: it points to the hour,
or just past it. Then look at the long hand: count by fives around the face,
one five for each number it has passed. Write the time as hours, a colon,
then minutes, such as 3:30.

On a clock without hands, draw the long minute hand to the minutes (to the
12 for o'clock, the 6 for half past, the 3 for quarter past, the 9 for
quarter to). Then draw the short hour hand. Remember that the hour hand
moves too: at half past three it sits halfway between the 3 and the 4.

For "later" questions, count on from the time shown: first the whole hours,
then the minutes, carrying into the next hour when you pass the 12.

## Purpose

Telling time on an analogue clock is a staple of early primary maths, and
the classic mistake is the hour hand: children draw it on the 3 at half past
three because the worksheets they practised on did. This page keeps the
hour hand honest at every level, so the picture a child learns from is the
real clock.

## History

Clock-face worksheets have been a classroom standard since analogue clocks
became the everyday way of keeping time; the progression of o'clock, half
past, quarter past and to, five minutes, then single minutes follows the
order most primary curricula teach it in.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`read`, `draw` or `mixed`); `count`
  (4-12 clocks); `elapsed` (turn the last row into "how much later" questions
  at Hard and Expert); page `width` and `height`; `line`.
- **Generation:** Kids uses o'clock times only, Easy adds half past, Medium
  quarter past and quarter to, Hard any five-minute time, Expert any minute.
  About seven in ten clocks use the minutes the level introduces. Times are
  drawn without replacement, so no time appears twice on a page — elapsed
  questions check both their start and their answer against every other time.
  Elapsed amounts run 10 minutes to 2 hours in fives at Hard and 7 minutes to
  almost 3 hours at Expert.
- **Solving:** each answer is the time shown, or the start time advanced by
  the stated minutes around the 12-hour dial; the answer key draws every hand
  pair (red where the child draws them) and writes every time in red.
- **Guarantees:** deterministic per seed. The hour hand turns half a degree
  per minute and the minute hand six; the tests read every one of the 720
  times back from the drawn hand tips, where the hour hand alone must give the
  full time and the minute hand must agree with it. Elapsed answers are
  recounted minute by minute. Difficulty is the minute precision asked
  (`rating_basis: minute_precision`), so every level produces its own band.
