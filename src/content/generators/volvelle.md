---
title: "Volvelles"
blurb: "Volvelles to cut and pin — a perpetual calendar, a Caesar cipher wheel and a times-table wheel, every setting checked"
category: design
version: "1.0.0"
---
Paper wheels to cut out and pin together: a perpetual calendar, a secret
code wheel and a times-table wheel.

## What it is

A volvelle is a set of paper discs that turn on a pin through their
centres. Three are offered:

- **A perpetual calendar** that finds the day of the week for any date in a
  span of years (1900 to 2099 unless you choose otherwise). A table gives
  each year a letter, the small wheel turns that letter to the month, and
  every date's column then points at its weekday.
- **A Caesar cipher wheel**: the alphabet round the big wheel and again
  round the small one, with shift numbers, for writing and reading secret
  messages with any of 26 keys.
- **A times-table wheel**: a window in the small wheel shows one
  multiplication table at a time, up to 12 × 12.

Each prints in colour, or as line art to colour in.

## How to use it

1. Print at 100 % ("actual size"). Card or heavy paper works best.
2. Cut out the big wheel and the small wheel along their outer circles.
   For the times-table wheel, also cut out the window in the small wheel.
3. Lay the small wheel on top of the big one and push a paper fastener
   (split pin) through both centres, marked with a cross. A drawing pin
   into a cork board or an eraser also works.
4. **Calendar:** find the year in the table and note its letter. A star
   means a leap year. Turn the small wheel until that letter sits next to
   the month on the big wheel. In a leap year use JAN* and FEB* for January
   and February. Now find the date on the small wheel: its column points to
   the day of the week on the rim.
5. **Cipher:** choose a key letter and turn the small wheel until it sits
   under the A of the outer ring. The number under it is the shift. To
   write in code, swap each outer letter for the inner letter under it. To
   read a message, set the same key and swap each inner letter back for the
   outer one.
6. **Times table:** turn the arrow to a number on the rim. The window shows
   that number times each number printed beside it.

## Purpose

Volvelles are a hands-on way into calendars, codes and multiplication.
Turning a wheel shows why a calendar repeats, how a shift cipher works and
how a times table grows, and a finished wheel is a tool children keep and
use. The answers come from the paper itself, so they must be right: every
setting of every wheel here is checked.

## History

Volvelles go back to medieval astronomy and astrology. Ramon Llull used
turning paper wheels in the 13th century, and printed books from the 1500s,
such as Peter Apian's *Astronomicum Caesareum* (1540), carried elaborate
working wheels. Leon Battista Alberti described the cipher disc in about
1467, the first polyalphabetic cipher device, and the shift cipher itself
is named after Julius Caesar, who used a shift of three. Perpetual
calendars in wheel, slide and table form have been sold since the
eighteenth century, and code wheels became a favourite cereal-box and
comic-book premium in the twentieth.

## This implementation

- **Spec knobs:** `kind` (`calendar`, `cipher`, `times`); `from_year`
  (1600–2400, rounded down to a decade) and `decades` (1–25), calendar
  only; `table_max` (2–12), times only; `look` (`colour`, `outline`);
  `diameter_cm` (6–40, 0 for the largest that fits); `page`, `landscape`;
  `margin` (inches, 0.1–1). Values out of range are clamped and recorded as
  `requested_*`. A diameter that does not fit the page is shrunk to fit and
  recorded the same way.
- **Generation:** each wheel is built as data, every label with its angle,
  and drawn from that data. The calendar uses weekday = date + month code +
  year code (mod 7), working in sevenths of a turn. The months sit on the
  big wheel at their codes (days before the month in a common year, less
  one for January and February in a leap year). The weekdays sit on the
  rim. The year letters and the date columns (dates that differ by a week
  share a column) sit on the small wheel. The year letter comes from the
  weekday of 1 January by Gauss's formula. The cipher has two 26-letter
  rings, and the times wheel has products in rings under a one-column
  window. The seed picks the colours, the rim decoration and the centre
  rosette.
- **Solving:** nothing to solve.
- **Guarantees:** `wheel_checked`, by turning the wheel as a reader would,
  using only the printed labels' angles. **Calendar:** every date of every
  year in range (73,049 dates for 1900–2099) is read off the wheel. The
  year's letter comes from the table, the letter is turned to the month,
  and the weekday the date points to must equal the one found by counting
  days from Saturday 1 January 1600. The tests compare that count with
  Zeller's congruence for every date from 1600 to 2649. **Cipher:** for
  each of the 26 keys, every outer letter sits over the letter shifted by
  the key, one to one. **Times:** for every rim number, the window shows
  exactly one product beside each row label, and it is the right one.
  `cases_checked` gives the count.
