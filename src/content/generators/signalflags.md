---
title: "Signal Flags"
blurb: "Signal flags — names and messages in maritime signal flags, semaphore, Morse and braille cells, as wall prints, alphabet posters, colouring pages and decode worksheets, every drawing read back to its text"
category: design
version: "1.0.0"
---
A name or message spelled in maritime signal flags, semaphore, Morse code or
braille: wall art, a code poster, a colouring page or a secret message to
crack.

## What it is

Pages that turn letters into signals. Four codes are drawn:

- **Signal flags:** the 26 letter flags and 10 numeral pennants of the
  International Code of Signals, flown by ships the world over, in their
  five colours: red, yellow, blue, black and white.
- **Semaphore:** a signaller holding two red-and-yellow flags, one arm
  position pair for each letter.
- **Morse code:** dots and dashes, with a dash three times the length of a
  dot.
- **Braille:** the six-dot cells read by touch, shown here as a printed
  chart.

There are four kinds of page: a name print for the wall, with the letter
and its spelling word (ALFA, BRAVO …) under each signal; the whole alphabet
as a poster; a colouring page where each part of a flag carries a colour
letter; and a decode worksheet, where a hidden message waits under a row of
signals and a code chart at the foot of the page gives the key.

## How to use it

1. **Name print:** print it, trim it and frame it. Ships "dress" in signal
   flags for celebrations, so a name in flags suits a nursery, a cabin or a
   boat.
2. **Alphabet poster:** pin it up beside a name print or use it to send
   messages to a friend.
3. **Colouring page:** colour each region by its letter: R red, Y yellow,
   B blue, K black. Leave blank regions white.
4. **Decode worksheet:** look up each signal in the code chart and write its
   letter in the box underneath. In semaphore, the "#" signal means the
   letters A–I and K that follow stand for the digits 1–9 and 0, until a J
   switches back to letters. In braille, "#" before a–j makes the digits 1–0
   until the next space; "ABC" switches back to letters.
5. Braille here is ink on paper and cannot be read by touch. The small strip
   at the foot of a braille page shows the cells at their true size, with
   dots 2.5 mm apart.

## Purpose

Signal codes are a favourite with children: a secret alphabet that grown-ups
really use. Nautical flag name prints are a popular nursery and beach-house
decoration, and code posters and decode sheets are a staple of scout badges
and classroom units on communication. Every page here is checked by reading
the drawing back, so a print never carries a wrong flag or a misplaced dot.

## History

Ships signalled with flags for centuries before Captain Frederick Marryat
published a widely used code in 1817. The International Code of Signals of
1857, revised in 1932 and 1965, gave each letter a flag and a meaning of its
own: A for "diver down", O for "man overboard". The Chappe brothers' tower
telegraph of the 1790s led to hand-flag semaphore, used by navies and scouts.
Samuel Morse and Alfred Vail's code of the 1830s became, in international
form, the language of telegraph and radio. Louis Braille published his
six-dot system in 1829, adapted from a night-writing code for soldiers.

## This implementation

- **Spec knobs:** `text` (letters, digits and spaces; up to 24 characters,
  48 on decode pages; empty lets the seed choose a seaside word or a
  message; ignored on alphabet pages); `kind` (`name`, `alphabet`,
  `colouring`, `decode`); `code` (`flags`, `semaphore`, `morse`, `braille`);
  `letters` and `words` (print the letter and its spelling word under each
  signal; ignored on decode pages); `page`, `landscape`.
- **Generation:** the text is cleaned: accents are removed (Ë becomes E),
  other characters are dropped and listed in the meta, and long text is cut
  with the request kept as `requested_text`. Each letter becomes a symbol;
  semaphore and braille insert their numerals and letters signs. Symbols are
  laid out in rows at the largest size that fits, keeping words whole when
  possible (a run-on mark shows a split). Flags follow the IMO drawings:
  swallowtails notched a quarter deep, pennants tapering to half height,
  saltires, crosses and stripes in the drawn proportions. Semaphore follows
  the standard table, as seen by the reader facing the signaller. Morse uses
  1:3:1 dot, dash and gap units. Braille is Unified English Braille grade 1,
  without capital signs. The seed picks the border (rope, waves, bunting or
  double rule) and, when no text is given, the word or message.
- **Solving:** decode pages ship an answer key with each letter in its box;
  colouring pages ship the coloured version as their key.
- **Guarantees:** `decoded_checked`. Every symbol is read back from the drawn
  shapes alone by a reader that shares no tables with the drawing code. Flag
  colours are sampled on an 8 × 8 grid and matched against each flag's
  blazon, and each flag must match exactly one. Semaphore arm angles are
  measured, snapped to 45 degrees and looked up in the seven "circles" of
  the alphabet. Morse marks are measured as dots or dashes and walked down
  the Morse tree; digits are read by counting dots and dashes. Braille dots
  are located in the cell and read by decade. The reading, with the
  numerals and letters signs applied, must equal the text; on alphabet and
  decode pages the chart must read as the alphabet. Flag cloth uses only the
  five signal colours. The braille true-size strip has 2.5 mm dot pitch and
  6.2 mm cell pitch. On colouring pages every code letter lies on cloth of
  the colour it names, and every coloured region that shows has one. Symbols
  never overlap and stay on the page.
