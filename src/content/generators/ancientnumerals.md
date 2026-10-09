---
title: "Ancient Number Systems"
blurb: "Ancient number systems — Egyptian hieroglyphs, Mayan dots, bars and shells, and Babylonian cuneiform drawn as signs: read, write, add and compare, every numeral written and read back"
category: maths
version: "1.0.0"
---
Egyptian hieroglyphs, Mayan dots and bars, and Babylonian wedges: read
them, write them, add them and compare them.

## What it is

A worksheet with a NAME and DATE line, a strip showing every sign used on
the page and its value, numbered questions and an answer key. The numerals
are drawn as the signs themselves: Egyptian strokes, hobbles, coils of
rope, lotus plants, fingers, tadpoles and the kneeling god Heh; Mayan dots,
bars and shells stacked in levels; Babylonian upright and corner wedges.
Questions ask what number a numeral stands for, to write a number in the
old signs, to add two numerals and write the sum in the same signs, and
which of two numerals is larger (on a mixed page, one Egyptian against one
Mayan, say). The answer key writes every answer in red, drawing the
numerals where the answer is a numeral.

## How to play

Egyptian numbers are added up. A stroke is 1, a hobble (an upside-down U)
is 10, a coil of rope is 100, a lotus is 1000, a finger is 10,000, a
tadpole is 100,000 and the kneeling god Heh is 1,000,000. Count each kind
of sign and add: three coils, two hobbles and four strokes make 324. To
write a number, use as many of each sign as its digit says, biggest signs
first on the left.

Mayan numbers are written in levels, one above another. In each level a
dot is 1, a bar is 5 and a shell is 0, so a level holds 0 to 19 (three bars
and four dots is 19). The bottom level counts ones, the level above it
counts twenties, the next 400s (20 × 20) and the next 8000s. One dot on
the top level, over a dot and two bars on the bottom level, means
1 × 20 + 11 = 31.

Babylonian numbers use two wedges: an upright wedge for 1 and a corner
wedge (like <) for 10. A group of wedges makes a number from 1 to 59,
tens on the left. Groups are written left to right with a gap between
them; the rightmost group counts ones, the next sixties and the next
3600s (60 × 60). A corner wedge and two upright wedges, a gap, then three
upright wedges means 12 × 60 + 3 = 723. On the hardest pages two slanted
wedges mark an empty place, like our zero inside a number.

To add, change both numerals to our numbers, add, and write the sum back
in the same signs. To compare, read both numerals and pick the larger.

## Purpose

Number systems from other times show from the outside what place value
and zero do for us: the Egyptian system has neither, the Babylonian has
places but (for most of its history) no zero, and the Maya had both. The
pages suit upper-primary and middle-school enrichment, history-of-maths
lessons, and the "number systems" units beside Roman numerals and number
bases.

## History

Egyptian hieroglyphic numerals were in use by about 3000 BC; the same
additive signs appear on royal mace heads and temple walls, written in
either direction. Babylonian scribes wrote in base sixty on clay tablets
from about 2000 BC, and for most of that time left an empty place simply
as a gap, so 1 and 60 looked alike and context had to decide; a
placeholder of two slanted wedges appears in the Seleucid period (after
about 300 BC), though never at the end of a number. Sixty survives in our
minutes, seconds and degrees. The Maya counted in twenties with a shell
for zero, one of the earliest true zeros; their calendar count made the
third place 18 × 20 = 360 instead of 400, but ordinary counting stayed in
pure twenties, which is what these pages use.

## This implementation

- **Spec knobs:** `difficulty` (Easy: Egyptian 1-99, Mayan one level
  0-19, Babylonian 1-59, with read, write and compare; Medium: Egyptian to
  9999, two Mayan levels, two Babylonian places, and sums; Hard: Egyptian
  to 999,999 and three places each; Expert: Egyptian millions with Heh,
  four Mayan levels and Babylonian numbers with an empty middle place;
  Kids is served as Easy and recorded as `requested_difficulty`);
  `system` (`mixed`, `egyptian`, `mayan`, `babylonian`); `count` (4-12
  questions, clamped and recorded as `requested_count`); `legend` (the
  strip of signs and values); `width`, `height`, `line`.
- **Generation:** numbers are drawn place by place for the level (some
  zero digits so groups go missing or shells appear); sums are kept within
  the level's places; comparisons never tie, and on a mixed page compare
  two different systems. Each numeral is laid out as a list of placed
  signs, and the page draws exactly that list as vector paths (no font
  glyphs). Egyptian groups of five or more signs stack in two or three
  rows of smaller signs, as inscriptions do. Egyptian is written left to
  right, biggest first.
- **Solving:** a separate reader sees only the placed signs. It groups
  them into places by the gaps between them (sideways for Babylonian,
  up and down for Mayan), checks each place is well formed (at most nine
  of an Egyptian sign, bigger Egyptian signs left of smaller ones, at most
  four Mayan dots above at most three bars, a lone shell, at most five
  Babylonian tens left of at most nine ones, a placeholder only inside a
  number) and adds up the value. Every answer is recomputed from those
  readings.
- **Guarantees:** every numeral on the page reads back to exactly its
  number (`answers_checked`); the tests run the round trip for every
  Babylonian number to 215,999 and every Mayan number to 7999, Egyptian to
  99,999 and samples beyond, check the signs against the textbook
  definition, and check the reader refuses malformed numerals. Babylonian
  numerals are unambiguous by construction: none ends in an empty place,
  and an empty place inside a number appears only at Expert, with its
  placeholder. Difficulty is rated by number size and places
  (`rating_basis`).
