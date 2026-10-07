---
title: "Simon Says"
blurb: "Simon Says — follow letter instructions in order on a scrambled string to reveal a saying"
category: word
version: "1.0.0"
---
Follow the instructions, letter by letter, and a jumble turns into a saying.

## What it is

A following-directions word puzzle. A row of scrambled letters is printed
in boxes, followed by a numbered list of instructions: change every X to
O, cross out the 3rd and 7th letters, move the last four letters to the
front, reverse the order of the 2nd to 6th letters. Carry them out in
order, exactly as written, and the letters left at the end spell a
well-known saying.

## How to play

Start with the letters in the START row. Do each instruction in order,
one at a time, and write the new row of letters in the boxes under it
(there is one box for each letter you should have). Then go on to the
next instruction, using the row you just wrote.

- Count positions from the left of the row as it is *before* the
  instruction: the 1st letter is the leftmost one.
- "Cross out the 2nd and 5th letters" means both, counted before
  crossing out either.
- "Write TH after the 3rd letter" puts T and H between the 3rd and 4th
  letters.
- "Move the last 3 letters to the front" keeps those three letters in
  their order.
- "Cross out every letter that appears in the word JUG" removes every J,
  U and G.

When you have finished, write the last row in the answer boxes: the
spaces show where each word ends.

## Purpose

Simon Says pages practise reading carefully and doing exactly what the
words say — the "following directions" skill teachers set as a warm-up —
along with counting positions, ordinal numbers (1st, 2nd, 3rd …) and
spelling. A slip shows up at once, because the saying will not appear.

## History

Letter-manipulation puzzles of this kind have run for decades in
variety-puzzle magazines under names like "Simon Says", and the same idea
is a staple of classroom "follow the directions" worksheets. The title
borrows the old children's game in which you obey only instructions that
begin "Simon says".

## This implementation

- **Spec knobs:** `difficulty`, `steps` (3–16; 0 = the level's range),
  `work_space` (a row of boxes under each instruction), `word_lengths`
  (answer boxes grouped by word), `name_line`, `width`, `height`,
  `margin`.
- **Levels:** Kids — 4–5 instructions on a short classroom saying (up to
  13 letters): change every letter, cross out every letter, write letters
  at the start or end. Easy — 5–7, sayings up to 18 letters, adds
  crossing out by position and writing letters in the middle. Medium —
  7–9, up to 22 letters, adds moving letters to the front or end and
  swapping two letters. Hard — 9–12, up to 26 letters, adds reversing
  part or all of the row. Expert — 12–15, up to 30 letters, adds "cross
  out every letter in the word …". Every page above Kids uses its level's
  newest kind of instruction at least once (`hardest_family` in meta);
  the level is the instruction count and the kinds in play
  (`rating_basis`).
- **Generation:** works backwards from the saying. Each step picks a kind
  of instruction and builds the row it must have been applied to (to undo
  "cross out every Q", Qs are scattered into the row; to undo "change
  every X to Y", every Y becomes an X, where X is a letter not yet in the
  row), so the forward instruction turns that row into the next one. Two
  instructions of the same kind never follow each other. The sayings are
  family-friendly proverbs and short classroom sayings written for
  Lakolam.
- **Solving / checks:** every instruction is valid where it stands — the
  letter it names is in the row, the letter it changes to is not, every
  position is in range, and no instruction leaves the row unchanged.
  Before a page ships, the instructions are replayed from the start and
  must spell the saying.
- **Guarantees:** deterministic per seed; replaying the printed
  instructions from the start gives exactly the saying (`answers_checked`)
  — the tests replay them again with an independent interpreter that
  reads the printed instruction text. The key fills in every intermediate
  row.
