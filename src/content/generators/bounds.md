---
title: "Error Intervals and Bounds"
blurb: "Error intervals and bounds — rounding and truncation error intervals, upper and lower bounds of calculations"
category: maths
version: "1.0.0"
---
Error intervals for rounded and truncated values, and the upper and lower bounds of calculations — every bound exact.

## What it is

A worksheet of four to sixteen questions on the accuracy of measurements
(the GCSE topic of error intervals and bounds). A value has been rounded
to a number of decimal places, significant figures or the nearest 10,
100 or 5 — write the error interval as an inequality, such as
14.55 ≤ x < 14.65. A value has been truncated — write its error
interval. A count of people has been rounded — write the interval of
whole numbers it could be. Two rounded measurements are added, taken
away, multiplied or divided (a total length, a perimeter, an area, an
average speed) — find the lower and upper bounds of the result. The
answer key writes every bound in red.

## How to play

- **Rounding:** a value rounded to the nearest unit could be up to half a
  unit either side. 14.6 to 1 decimal place lies between 14.55 and 14.65:
  the error interval is 14.55 <= x < 14.65. The lower bound is included
  (it rounds up to 14.6); the upper bound is not (it would round to 14.7).
- **Significant figures:** find the place value of the last significant
  figure, then go half of it either way. 6.1 to 2 significant figures:
  6.05 <= x < 6.15. 0.00485 to 3 significant figures: the last figure is
  in the hundred-thousandths, so 0.004845 <= x < 0.004855.
- **Truncation:** truncating chops digits off without rounding, so the
  true value is at least the shown value and less than one more unit.
  x truncated to 1 decimal place is 11.4: 11.4 <= x < 11.5.
- **Counting:** a whole number of people, 820 to the nearest 10, is from
  815 up to 824 — both ends are included, as whole numbers.
- **Calculations:** to find the largest possible result, take the upper
  bounds of what is added or multiplied and the lower bound of what is
  taken away or divided by. For the smallest result, do the opposite.
  Upper bound of a – b = upper of a – lower of b; upper bound of a ÷ b =
  upper of a ÷ lower of b.
- When the answer is not exact, give it to 3 significant figures, as the
  question says.

## Purpose

No measurement is exact, and knowing how far off it might be matters in
science, engineering and everyday estimates. Error intervals are part of
GCSE Mathematics in England (Foundation tier: intervals for rounding and
truncation; Higher tier: upper and lower bounds of calculations), and the
same ideas appear as "limits of accuracy" in other syllabuses and as
measurement error in science courses.

## History

Rounding is as old as tables of numbers; the Babylonians already worked
with values truncated to a few sexagesimal places. Thinking explicitly
about the error in a computed result grew with astronomy and surveying:
Roger Cotes (1722) and Thomas Simpson (1755) analysed how errors combine,
and interval arithmetic — computing with an upper and a lower bound at
every step, exactly as this page does — was formalised by Ramon Moore in
1966 for computers that must guarantee their answers.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `rounding`,
  `truncation`, `calculations`); `locale` (`uk` and `in` metric units,
  `in` titled "limits of accuracy"; `us` customary units: inches, feet,
  miles); `count` (4-16); `width` (300-2000 Pt) and `height` (300-3000
  Pt). Out-of-range values are clamped and reported in meta as
  `requested_*`.
- **Generation:** Easy: whole numbers to the nearest 1 or 10. Medium: one
  decimal place, the nearest 100 or 5, truncation to a whole number or one
  decimal place, bounds of sums and perimeters. Hard: two decimal places
  and significant figures, differences and areas. Expert: small decimals
  to 3 significant figures, whole-number counts, average speeds, and
  measurements with different accuracies. No question repeats on a page.
- **Solving:** exact rational arithmetic. A bound that is not a short exact
  decimal is rounded to 3 significant figures (half up), and the question
  says so.
- **Guarantees:** every interval is checked by rounding (or truncating)
  its ends and points a millionth of a unit inside and outside them; a
  count's ends are checked one either side. A calculation's bounds are
  checked against the largest and smallest results over all four
  combinations of the measurements' own bounds — not the rule the answer
  used. Truncation and calculations start at Medium; a lower request is
  served at Medium and the meta records `requested_difficulty`. Meta:
  `answers_checked`, `unique`, `difficulty`, `rating_basis`
  (`question_forms_by_level`).
