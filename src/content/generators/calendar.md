---
title: "Calendar"
blurb: "Calendar maths worksheet — days of the week, dates before and after, days and weeks between dates, leap years"
category: maths
version: "1.0.0"
---
Read a month, count on and back, and find the days and weeks between dates.

## What it is

A worksheet with one month's calendar printed at the top — any month of
any year from 1900 to 2099 — and four to twelve questions underneath:
what day of the week a date falls on, the date of the third Tuesday, how
many Mondays the month has, the date a number of days before or after
another, how many days a month has, how many days (or weeks and days) lie
between two dates, whether a year is a leap year, and what day of the week
a date in another month or the next year will be. Each question has an
answer line; the answer key fills them in.

## How to play

- **Reading the calendar:** each column is one day of the week. Find the
  date, then look up to the top of its column. To find "the third
  Tuesday", go down the Tuesday column to its third date.
- **Days after and before:** count on (or back) from the date. When you
  reach the end of the month, carry on from the 1st of the next month. A
  week on is 7 days on — the same day of the week.
- **Days from one date to another:** count the days you move on, not the
  day you start on: from the 3rd to the 5th is 2 days. Across months, count
  to the end of the first month, then add the days in the next.
- **Weeks and days:** find the number of days, then share it into weeks of
  7: 24 days is 3 weeks and 3 days.
- **Days in each month:** April, June, September and November have 30
  days; February has 28, or 29 in a leap year; all the rest have 31. (On
  your knuckles: every knuckle month has 31 days.)
- **Leap years:** a year is a leap year if it divides by 4 — except years
  that divide by 100, which are not, unless they also divide by 400. So
  2024 and 2000 are leap years, but 1900 and 2100 are not.
- **A date in another month or year:** count the days from a date you know
  and divide by 7; the remainder is how many days of the week to move on.
  Next year, the same date moves on 1 day of the week (2 if a 29 February
  comes in between).

## Purpose

Reading a calendar is a first-grade measurement skill in the US Common
Core and part of Year 2 and Year 3 "time" in England, and counting days
across months and years is everyday arithmetic — holidays, birthdays,
deadlines. The questions move from reading the printed grid, through
counting on and back across a month boundary (which needs the month
lengths by heart), to sharing days into weeks and the leap-year rule, and
finally to working out days of the week by remainders when division by 7
replaces counting.

## History

The Gregorian calendar used here was introduced by Pope Gregory XIII in
1582 to correct the drift of the Julian calendar, which had a leap year
every four years without exception and had slipped ten days against the
seasons. The new rule drops three leap years every four centuries (1700,
1800 and 1900 were not leap years; 2000 was). Britain and its colonies
switched in 1752, skipping from 2 to 14 September. The seven-day week is
far older, reaching back to Babylonian and Jewish practice; the rhyme
"Thirty days hath September" is recorded in English from the 1400s, and
in 1882 Christian Zeller published the congruence that finds the day of
the week of any date by arithmetic alone.

## This implementation

- **Spec knobs:** `difficulty`; `locale` (`us`: the week starts on
  Sunday and dates read MARCH 25; `uk` and `in`: the week starts on Monday
  and dates read 25 MARCH); `year` (1900-2099, 0 = from the seed); `month`
  (1-12, 0 = from the seed); `count` (4-12); `width`, `height`, `line`.
- **Generation:** Kids reads the printed month — the day of the week of a
  date, the nth (or last) weekday, how many of a weekday, and counting on
  up to a week. Easy adds counting back and days between dates, all inside
  the month. Medium crosses into the next or previous month and asks how
  many days a month has. Hard asks for days between any two dates of the
  year, weeks and days, leap years (with the century years 1900, 2000 and
  2100 among them) and the day of the week of a date in another month.
  Expert counts on 50 to 200 days, measures gaps across a new year, and
  asks for days of the week in the next year. No question repeats, and
  answers differ where the level allows. Years are written in a date only
  when it is not the printed year.
- **Solving:** dates are turned into day numbers with a days-from-civil
  formula (proleptic Gregorian calendar), so a date after, a gap or a day
  of the week is one subtraction or remainder; month lengths follow the
  leap-year rule.
- **Guarantees:** `answers_checked` — every answer is worked out a second,
  independent way: days of the week by Zeller's congruence, dates and gaps
  by walking one day at a time over a table of month lengths, month lengths
  and leap years by counting the days walked through the month. The tests
  check the two methods agree on every day from 1899 to 2101 and on known
  dates, read the printed month back from the page (each day number's
  column must be its weekday by Zeller), check the key writes exactly the
  answers in red, and that every printed character is in the font.
