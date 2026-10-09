---
title: "Colour Calendar"
blurb: "Colouring calendars — a cover and twelve large-print month pages, each under its own mandala, stained glass or tiling to colour; every weekday checked by Zeller's congruence, Easter by Gauss"
category: design
version: "1.0.0"
---
A colouring wall calendar: a cover and twelve large-print months, each
under its own design to colour.

## What it is

Thirteen pages: a cover with the year in big letters under a design, then
one page for every month. Each month page has a mandala, a stained-glass
window, a tiling or another pattern in black outline on its top half, and
the month below it as a clear grid of large numbers, with the weekday
names across the top and a few holidays written into their days: New
Year's Day, Valentine's Day, St Patrick's Day, Good Friday, Easter Sunday,
Halloween, Christmas Eve, Christmas Day and New Year's Eve. The week can
start on Sunday or Monday, the calendar can start in any month (September
for a school year), and a desk layout puts the design beside the month on
a sideways page.

## How to use it

Print the thirteen pages, colour the designs (before or as each month
comes round), and staple or punch the pages at the top to hang them on the
wall. For a desk calendar, print the desk layout and stand the pages in a
holder or clip them to a board. Write birthdays and appointments into the
date boxes.

## Purpose

Colouring calendars are a popular gift, especially for older relatives and
seniors' groups: they give a calm activity every month and a calendar that
is large and easy to read. Printing your own means any year, any starting
month and as many copies as you need.

## History

Wall calendars with a picture for each month became common in the late
19th century as advertising gifts from shops and companies. Calendars to
colour followed the adult colouring boom of the 2010s, and publishers now
bring out new ones every year.

## This implementation

- **Spec knobs:** `year` (1900–2200, clamped and reported as
  `requested_year`), `start_month` (1–12, reported as
  `requested_start_month` when clamped), `index` (0 the cover, 1–12 the
  months from the start month; wraps round), `week_start` (sunday,
  monday), `layout` (wall, desk), `source` (auto gives each month a
  different design in a seeded order; or mandala, stained glass, voronoi,
  isohedral, tessellation, apollonian, zentangle, girih, celtic for all
  months), `holidays` and `page` (letter, A4). The year is always the spec
  field, never the clock.
- **Generation:** dates are laid out with a day count from the civil
  calendar (days since 1 January 1970, Hinnant's algorithm), Easter by the
  Meeus–Jones–Butcher algorithm and Good Friday two days earlier. The
  printed page's design is generated with its own seed, reduced to black
  line art (captions dropped) and scaled whole into its half of the page,
  never cropped, so every space it closes stays closed.
- **Solving:** nothing to solve.
- **Guarantees:** `obeys()` checks all twelve months, not just the printed
  one, by other methods: each date's weekday is found afresh by Zeller's
  congruence and the heading printed over its column must name it; every
  day of each month appears once in reading order, with month lengths from
  a closed-form rule rather than the layout's table; the months run on
  consecutively across the year end; and every holiday is on its date,
  Easter by Gauss's algorithm (with its two exceptions) and on a Sunday,
  Good Friday on a Friday. Tests compare three weekday methods on every
  day of seven years including 1900, 2000 and 2100, and Easter by both
  algorithms for every year from 1900 to 2200. Meta reports
  `weekdays_checked` and `holidays_checked`.
- **Where it lives:** in `lako-catalog`, beside colour cards, because it
  uses other generators' designs.
