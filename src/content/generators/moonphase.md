---
title: "Moon Phases"
blurb: "Moon phases — a year of the Moon, one drawn disc per day, with the times of every new, quarter and full moon"
category: design
version: "1.0.0"
---
A whole year of the Moon on one page: a drawn moon for every day, with the
date and time of every new, quarter and full moon.

## What it is

A lunar calendar for any year from 1900 to 2100. Each day of the year gets a
small disc showing how much of the Moon is lit that day, so the waxing and
waning sweep across the page month after month. The days of the four main
phases — new moon, first quarter, full moon and last quarter — are ringed
and carry their time, in the time zone you choose. Three layouts (months in
columns, months in rows, or twelve little month calendars) and three looks
(a night sky, black ink on white, or outlines to colour in).

## How to use it

Print it as a poster for a wall, a fridge or a classroom. Find today's date:
its disc shows the Moon you can see tonight. The ringed days are the main
phases, and the small time beside the ring is when that phase happens. The
heading says which time zone the times are in.

Things to look for:

- The Moon takes about 29½ days to go from new to new, so each month's
  pattern starts a day or two earlier than the month before.
- A month with two full moons has a "blue moon" — look for a month whose
  column shows two ringed full discs.
- The lit side grows from one edge (waxing) and shrinks from the other
  (waning). The northern view lights the waxing Moon on the right; south of
  the equator it is lit on the left, so choose your hemisphere.

The colouring version leaves the shadowed part of every disc blank: shade it
in with a dark pencil and the phases appear.

## Purpose

Watching the Moon is the oldest calendar there is, and a year laid out at a
glance shows its rhythm better than any explanation: the steady 29½-day beat
sliding against the uneven months. It is a handsome wall print, a science
project to check against the real sky night by night, and a calm colouring
page.

## History

Lunar calendars are older than writing — notched bones from the Ice Age have
been read as moon tallies — and the Babylonian, Hebrew, Chinese and Islamic
calendars all count months by the Moon. Predicting phases precisely was one
of the great problems of astronomy, from Hipparchus through Newton to the
lunar theories of the 1800s that sailors needed to find longitude. Jean
Meeus's *Astronomical Algorithms* (1991, 2nd ed. 1998) distilled modern
theory into short formulas a pocket calculator could run; his phase formula
is still the standard way to print a moon calendar. Designed moon-phase
calendars — rows of white discs on black — became a poster classic in the
2000s.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`; `year` (1900–2100);
  `utc_offset` (hours, −12 to 14, rounded to the quarter hour);
  `hemisphere` (`north`, `south`); `layout` (`columns`, `rows`,
  `calendar`); `style` (`night`, `ink`, `colouring`); `week_start`
  (`monday`, `sunday`, for the calendar layout); `times` (print phase
  times); `labels` (title and legend).
- **Generation:** phase instants come from Meeus's *Astronomical
  Algorithms* ch. 49 (mean lunation plus the periodic and planetary
  corrections), converted from dynamical time to UT with the
  Espenak–Meeus ΔT polynomials and then to local time, rounded to the
  minute. Each day's disc is drawn from the Moon's elongation from the Sun
  at local noon, computed from the truncated lunar theory of ch. 47 (the
  main 30 longitude terms) and the solar theory of ch. 25; the lit part is
  a half-disc and a half-ellipse terminator whose area is the illuminated
  fraction (1 − cos E)/2. The seed scatters the night sky's stars and the
  title sparkles.
- **Solving:** nothing to solve — a design to read and enjoy.
- **Guarantees:** every page passes `phases_cross_checked`: at each phase
  instant from ch. 49 the independent ch. 47 elongation is recomputed and
  must sit on 0°, 90°, 180° or 270° to within ten minutes of motion
  (typically under two). Tests check Meeus's worked examples 49.a and
  49.b exactly and every primary phase of 2026, plus samples from 1950 and
  2090, against the US Naval Observatory's published table: all within
  three minutes, and on the same date. Every day of the year appears once,
  every phase is ringed on its own local date, and the phases run in
  order. Times assume the zone stays fixed all year (no daylight saving).
