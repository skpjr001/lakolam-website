---
title: "Chronology"
blurb: "Chronology — BC and AD dates, centuries and decades, years between dates across the missing year zero, putting dates in order, and reading and marking timelines, every answer recomputed by counting"
category: maths
version: "1.0.0"
---
BC and AD, centuries and timelines — the arithmetic of dates, with no year zero, every answer counted out year by year.

## What it is

A history-skills worksheet of four to ten questions about dates. Century
questions ask which century or decade a year is in and the first and last
years of a century. Interval questions ask how many years apart two dates
are (also across the BC/AD boundary), how many years ago something
happened, which year was a number of years before or after a date, and
which year is exactly halfway between two dates. Ordering questions give
four to six dates, BC and AD mixed, to put in order. Timeline questions
draw a timeline with labelled and small marks: read the years the arrows
point to, or draw arrows for given dates. The dates are forty-eight
well-attested events from world history — the founding of Rome by
tradition, Caesar's death, the Battle of Hastings, the Moon landing — or
made-up events in a made-up town. A box at the top gives the current year
and the rules. The answer key writes every answer and draws the arrows in
red.

## How to play

1. **BC and AD:** BC years count down towards year 1 and AD years count
   up from it. There is no year 0: the year after 1 BC is AD 1. (BCE and
   CE mean the same as BC and AD.)
2. **Centuries:** the 1st century AD is the years 1 to 100, the 2nd is 101
   to 200, so a century is named one more than its hundreds: 1066 is in
   the 11th century, and 1900 is still in the 19th. BC centuries work the
   same way counting down: the 1st century BC is 100 BC to 1 BC.
3. **Decades:** the 1980s are the years 1980 to 1989.
4. **Years between dates:** in the same era, take the smaller number from
   the bigger. From a BC date to an AD date, add the two numbers and take
   away 1, because there is no year 0: from 55 BC to AD 43 is 97 years.
5. **Before and after:** count on or back, remembering to step straight
   from 1 BC to AD 1.
6. **Ordering:** BC dates come first, and the bigger the BC number, the
   earlier it is: 120 BC is before 90 BC. Then AD dates, smallest first.
7. **Timelines:** find the labelled mark just before the arrow and count
   on in small marks. On a BC timeline the numbers get smaller from left
   to right.

## Purpose

England's National Curriculum asks pupils to develop "a chronologically
secure knowledge" of history, and BC and AD, centuries and timelines are
taught from Year 3; India's CBSE introduces BC and AD (and BCE and CE)
in Class 6 history, and the same skills run through US social
studies. The missing year zero trips up adults as well as children — the
argument over whether the millennium began in 2000 or 2001 is the same
sum — so the boundary questions are the heart of the page.

## History

The monk Dionysius Exiguus numbered years from the birth of Jesus
("Anno Domini") in AD 525, and the Venerable Bede spread the system in his
history of the English church in 731, where he also counted years "before
the time of the Lord". Roman numerals had no zero, so no year 0 was ever
made: 1 BC is followed by AD 1. Astronomers, starting with Jacques
Cassini in 1740, count a year 0 (1 BC) to make their sums simple — the
trick this generator uses internally. BCE and CE ("Before Common Era",
"Common Era") are used for the same years without the religious names.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `centuries`,
  `intervals`, `ordering`, `timelines`); `era` (`bc_ad` or `bce_ce`);
  `events` (`historical` dates or `invented` events at random years;
  questions that name no event, like ordering years and reading a
  timeline, are the same either way); `this_year` (1900-2100, printed in
  the box and used for "years ago"; clamped, recorded as
  `requested_this_year`); `count` (4-10, clamped, recorded as
  `requested_count`); `width`, `height`, `line`.
- **Generation:** each level has its own question kinds. Easy uses AD
  years only: which century and decade, years between and years ago,
  four dates to order, and marking dates on a timeline of decades.
  Medium adds BC dates, a century's first and last years, intervals within
  one era, five mixed dates and reading AD timelines marked every 10
  years. Hard asks intervals across the BC/AD boundary, years before and
  after a date, six close dates (120 BC against 90 BC) and BC timelines
  that count down to AD 1. Expert adds the year halfway between a BC and
  an AD date, BC centuries' first and last years and timelines read to
  the nearest 5 years. Kids is served at Easy (meta
  `requested_difficulty`). A page shows every kind of its level before
  repeating one. AD years below 1000 carry their era ("AD 43"); a
  question that mixes eras writes it on every year.
- **Solving:** the generator works in astronomical numbering (1 BC = 0).
  The checker never does: it counts calendar years one at a time,
  stepping from 1 BC straight to AD 1; finds a century by searching for
  the hundred years that hold the year; scans every year of a century for
  its first and last; orders dates with a calendar comparison (BC first,
  larger BC numbers earlier); and reads each timeline arrow back from its
  position along the axis. Arrows never sit on labelled marks and are at
  least two small marks apart.
- **Guarantees:** `answers_checked`. The tests check textbook values (55
  BC to AD 43 is 97 years; 1900 is in the 19th century and 1901 in the
  20th; the 1st century BC is 100 BC to 1 BC; halfway between 120 BC and
  AD 81 is 20 BC), that counting agrees with astronomical numbering for
  every pair of years around the boundary, that the year-zero mistake (98
  for 97) is caught, that the drawn arrows sit in the same order and
  proportion as their years, that marking questions draw arrows only on
  the key, and that the history list is in order with no repeats.
