---
title: "Measurement Conversions"
blurb: "Measurement Conversions — metric and customary units, time, 24-hour clock and a bus timetable"
category: maths
version: "1.0.0"
---
Change units, read the 24-hour clock and answer questions from a bus
timetable.

## What it is

A practice page for the measurement strand of school maths. Each line
gives an amount in one unit and asks for it in another - centimetres to
millimetres, kilograms to grams, litres to millilitres, minutes to hours,
feet to inches, cups to gallons. Clock questions turn 12-hour times into
24-hour times and back. At the foot of the page a bus timetable comes with
questions to answer by reading it.

## How to play

- Fill in each blank so that both sides are the same amount.
- To change a big unit into a smaller one, multiply: 1 M = 100 CM, so
  3.5 M = 350 CM. To change a small unit into a bigger one, divide.
- Some lines use two units at once: 3 M 45 CM = 345 CM, and
  345 CM = 3 M 45 CM.
- Metric facts: 10 MM = 1 CM, 100 CM = 1 M, 1000 M = 1 KM; 1000 MG = 1 G,
  1000 G = 1 KG; 1000 ML = 1 L.
- US customary facts: 12 IN = 1 FT, 3 FT = 1 YD, 1760 YD = 1 MI;
  16 OZ = 1 LB; 8 FL OZ = 1 CUP, 2 CUPS = 1 PINT, 2 PINTS = 1 QUART,
  4 QUARTS = 1 GALLON.
- Time facts: 60 SECONDS = 1 MINUTE, 60 MINUTES = 1 HOUR, 24 HOURS =
  1 DAY, 7 DAYS = 1 WEEK.
- 24-hour times run from 00:00 (midnight, 12:00 AM) to 23:59
  (11:59 PM). Afternoon hours add 12: 3:45 PM is 15:45. Noon is 12:00
  PM, or 12:00.
- In the timetable each column is one bus and each row a stop. Read down a
  column to follow a bus along its route.

## Purpose

Fluency with the units children meet in measurement, money-free decimal
practice in context, and the life skill of reading the 24-hour clock and a
timetable. Suits classrooms, homework and activity books in the US (with
customary units), the UK and India (metric).

## History

The metric system was adopted in France in the 1790s and is now used for
everyday measurement almost everywhere; the United States still uses its
customary units alongside it, so American pupils learn both. The 24-hour
clock is the standard in timetables, in the armed forces and across much
of the world, which is why converting between the two clock styles is part
of school curricula.

## This implementation

**Spec knobs:** `difficulty`; `system` (`metric`, `customary` - US units,
including the US pint and gallon - or `both`, alternating); `topics` (any of
`length`, `mass`, `capacity`, `time`, `clock`, `timetable`); `count` (4-30
conversion problems; the timetable comes in addition); `locale` (`us`,
`uk`, `in`: numbers of five digits or more are grouped in the local style,
1,000,000 or 10,00,000); page `width`/`height`; `line`.

**Levels:** Kids - whole numbers, a big unit into the next smaller one,
clock times on the hour, no timetable. Easy - both directions, whole
answers, neighbouring units, clock times at quarter hours, a short
timetable with two questions. Medium - one decimal place, five-minute
clock times, a four-stop timetable with a "latest bus" question. Hard -
two decimal places, units up to two steps apart (millimetres to metres),
mixed units such as 3 M 45 CM, any minute on the clock, a timetable whose
buses do not keep a regular pattern and a 12-hour reading question.
Expert - three decimal places, units up to three steps apart, more
midnight and noon times. Time and customary units always use whole
numbers. Milligrams appear from Hard. Difficulty is the requested level
(`rating_basis`: `decimal_places_and_unit_steps`).

**Generation:** each problem picks two units of one kind and a value with
the level's decimal places. Every unit is a whole number of its kind's
base unit (1 KM = 1,000,000 MM; 1 GALLON = 128 FL OZ), so conversions are
exact scaled-decimal arithmetic; a problem is kept only when its answer
terminates within the level's places. Going from a small unit to a big
one, the answer is chosen first and the question computed from it. Blanks
are all the same width, so none gives its answer's length away, and no
problem repeats. The timetable has three or four stops and runs, legs of 5
to 30 minutes, and questions whose answers are read back from the table.

**Solving:** one step per problem - multiply by the unit factor going to
a smaller unit, divide going to a bigger one; timetable questions are read
straight from the table. The answer is a single exact value, with no more
decimal places than the level allows.

**Guarantees:** deterministic per seed; both sides of every conversion are
the same quantity, checked in exact arithmetic in the generator and
re-checked in tests from the printed text with an independent table of
unit sizes; every clock answer is the same minute of the day as its
question; every timetable answer is recomputed from the table, times
increase along each run and from bus to bus, and the "latest bus" deadline
falls between two arrivals so exactly one departure is right
(`answers_checked` in meta).
