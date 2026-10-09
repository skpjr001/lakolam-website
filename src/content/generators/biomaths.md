---
title: "Biology Maths"
blurb: "Biology maths — magnification and scale bars, capture-recapture, quadrats and percentage cover, osmosis, energy transfer on a pyramid and Simpson's index, every answer exact"
category: maths
version: "1.0.0"
---
Magnify it, sample it, weigh it, pass it up the food chain — the maths skills of school biology, every answer exact.

## What it is

A biology worksheet of four to eight calculations drawn from the maths
every biology course asks for: magnification and real size under light and
electron microscopes, scale bars, capture–recapture estimates of a
population, quadrat sampling (the mean per quadrat, the number per square
metre and an estimate for a whole field), percentage cover read off a drawn
quadrat, percentage change in mass in osmosis experiments and the
concentration where the mass would not change, the efficiency of energy
transfer on a drawn pyramid of energy, and Simpson's index of diversity.
The answer key gives every answer with its units.

## How to play

1. **Magnification** = image size ÷ real size, with both in the same
   units. 1 mm = 1000 micrometres and 1 micrometre = 1000 nanometres. Rearrange to find the image
   size (real size × magnification) or the real size (image ÷
   magnification).
2. **Scale bars:** measure the bar, put it in the same units as its label,
   and divide.
3. **Capture–recapture:** population = number marked first × number caught
   second ÷ number of marked animals in the second catch.
4. **Quadrats:** find the mean per quadrat, divide by the area of one
   quadrat to get the number per square metre, then multiply by the area of
   the field.
5. **Percentage cover:** count the shaded squares and turn the count into a
   percentage of all the squares.
6. **Osmosis:** percentage change = (end mass - start mass) ÷ start mass ×
   100; write + for a gain and - for a loss. Where the change goes from + to
   -, the solution matches the cells: join the two points either side of
   zero with a straight line to find where it crosses.
7. **Energy transfer:** efficiency = energy passed to the next level ÷
   energy in the level below × 100. The rest is not passed on.
8. **Simpson's index:** D = 1 - (the sum of n(n - 1) for each species) ÷
   N(N - 1), where n is each species' count and N the total. Give D to 2
   decimal places; a higher D means a more diverse habitat.

## Purpose

Exam boards list these as the mathematical requirements of biology (AQA
GCSE 8461 and A-level 7402), and US courses meet them in microscopy, field
ecology and energy pyramids (NGSS MS-LS2-3). They are short, but each
hides a trap: units in magnification, the order of operations in the
Lincoln index, area units in quadrats, and the sign of a percentage change.

## History

Antonie van Leeuwenhoek measured "animalcules" against grains of sand in the
1670s; Ernst Ruska's electron microscope passed the light microscope's
magnification in 1933. Carl Petersen estimated fish populations by marking
plaice in the 1890s and Frederick Lincoln used the same idea for ducks in
1930. Frederic Clements and Roscoe Pound used square quadrats on the
Nebraska prairie in 1898. Raymond Lindeman's 1942 study of a Minnesota lake
founded the measurement of energy flow between trophic levels, and Edward
Simpson published his index of diversity in 1949.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `magnification`,
  `sampling`, `osmosis`, `energy`, `diversity`); `count` (4-8, clamped and
  recorded as `requested_count`); `width`, `height`, `line`.
- **Generation:** inputs are chosen backwards from exact answers: cell and
  organelle sizes from textbook values times round magnifications;
  capture–recapture counts whose estimate is whole; quadrat counts, sides
  and fields that give an exact density and a whole estimate; potato masses
  whose percentage change has at most one decimal place; osmosis tables
  whose zero crossing is exact; pyramids whose levels are 5–20 % of the
  level below. Easy finds the magnification and uses a 10 × 10 quadrat;
  Hard adds nanometres, scale bars, a 5 × 5 quadrat, the zero-change
  concentration, energy passed on and Simpson's index; Expert compares two
  sites. Diversity starts at Hard and osmosis at Medium; Kids is served at
  Easy.
- **Solving:** every answer is recomputed in exact rational arithmetic.
  Only Simpson's index is rounded (2 decimal places); a value exactly on a
  half is refused and regenerated.
- **Guarantees:** `answers_checked`. The tests recompute every answer from
  the numbers printed in the prompt in floating point, count the shaded
  squares actually drawn for percentage cover, check the more diverse site,
  and catch a changed answer.
