---
title: "Devanagari Writing Paper"
blurb: "Devanagari writing paper — Hindi practice rows with a heavy headline (shirorekha) and matra zones above and below, or square letter boxes"
category: paper
version: "1.0.0"
---
Hindi handwriting practice paper — a heavy headline for the letters to hang
from, the body zone below it and the vowel-sign zones above and below, in
rows or in square letter boxes.

## What it is

Devanagari, the script of Hindi, Marathi, Nepali and Sanskrit, is written
hanging from a line: most letters carry a horizontal stroke along their
top, and in a word these join into one continuous headline, the
*shirorekha*. Practice paper rules that headline heavier than the other
lines and in its own colour (red on blue here), with three zones around it:

- the **body zone**, from the headline down to the baseline, where the
  letters themselves sit;
- the **upper zone**, above the headline, for the vowel signs (matras) and
  marks written over a letter, such as the tails of i and ee, e and ai, and
  the dot of anusvara;
- the **lower zone**, below the baseline, for the vowel signs written
  under a letter (u, oo, ri) and the halant stroke.

Indian school notebooks are ruled with two, three, four or five lines a row
— the conventions differ between publishers. Here the **two-line** ruling is
the headline and baseline only; **three-line** adds the upper line;
**four-line** (the default) adds the lower line as well; **five-line** adds
a dashed line through the middle of the body for the waists and loops of
the letters. Rows can also be divided into **square practice boxes**, one
letter to a box, for learning the alphabet letter by letter.

## How to use it

Print at actual size ("Actual size" or "100%", not "Fit to page").

Write each letter so its top touches the heavy headline and its foot sits
on the baseline below it; draw the headline stroke along the ruled line.
Vowel signs that go above the letter reach up toward the top line; those
that go below reach down toward the bottom line. In a word, keep the
headline unbroken from the first letter to the last, and lift the pen
between words. With practice boxes, write one letter in each box, copying a
model letter from the first box along the row. Move to the two-line ruling
once the letter shapes are steady.

## Purpose

Hindi handwriting in primary school, children learning Hindi at home or
abroad, adults learning Devanagari for Hindi, Marathi, Nepali or Sanskrit,
and calligraphy practice. Teachers print class sets for the alphabet
(varnamala) and for copying words and sentences; in a book the pages make a
Hindi writing workbook.

## History

Devanagari grew from the Brahmi script through the Gupta and Nagari scripts
of the first millennium; the continuous headline that gives it its look
became settled in the later Nagari forms. Hindi became an official language
of India in 1950 and is taught in schools across the country, and school
stationery grew rulings of its own for it: Indian notebook makers sell
"Hindi two-line" and "five-line" copies alongside the English four-line
copy, printed in red and blue.

## This implementation

- **Spec knobs:** `page` (default a4) and `landscape`; `margin_mm` (0–30,
  default 10); `ruling` (two_line, three_line, four_line, five_line;
  default four_line); `body_mm`, headline to baseline (5–25, default 10);
  `upper_pct` and `lower_pct`, the matra zones as a share of the body
  (25–100 %, default 50 each); `gap_mm` between rows (0–30, default 4);
  `boxes` (off) for square practice boxes; `ink` (default blue),
  `headline_ink` (default red) and `weight` (0.1–2 pt, default 0.5; the
  headline is twice as heavy).
- **Generation:** a row is the ruling's lines at the asked zone heights;
  as many whole rows as fit are laid at an exact pitch (row + gap) and
  centred down the page. In box mode the row is cut into squares exactly as
  wide as the row is tall, as many as fit, centred across. The matra lines
  are a lighter tint, the dashed middle line lighter still, and the
  headline is drawn last, over everything. No Devanagari letters are
  printed: the page is the ruling only.
- **Solving:** nothing to solve — a page to write on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every row has exactly its ruling's number of lines, the
  headline exactly the body height above the baseline and the matra lines
  exactly their zone away (checked to 1e-9 pt on every page size,
  orientation and ruling); boxes are exactly square; rows are centred; all
  ink stays inside the margins. A knob outside its range is clamped and
  recorded as `requested_<field>` in the meta.
