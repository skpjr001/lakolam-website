---
title: "Speed, Distance and Time"
blurb: "Speed, distance and time worksheet — the triangle, km/h and m/s, average speed, density, pressure and distance–time graphs"
category: maths
version: "1.0.0"
---
Find the speed, the distance or the time — then density, pressure and distance–time graphs.

## What it is

A worksheet of four to twelve questions on compound measures. Most are
short journeys — a cyclist, a bus or a train covers a distance in a time —
where one of speed, distance and time is missing. Others convert speeds
between km/h and m/s, find the average speed of a journey in two parts,
use density (mass and volume) and pressure (force and area), or read a
distance–time graph printed at the top of the page: how far from home at a
time, how long a stop lasted, the speed of each part of the journey, the
whole distance and the time of getting home. Each question has an answer
line with its unit; the answer key fills them in.

## How to play

The three quantities are linked:

    speed = distance ÷ time    distance = speed × time    time = distance ÷ speed

A triangle helps: put DISTANCE on top and SPEED and TIME underneath; cover
the one you want and the other two show how to work it out.

- **Units must match.** A speed in km/h needs a distance in km and a time
  in hours. 30 minutes is 0.5 hours, 15 minutes is 0.25 hours, 12 minutes
  is 0.2 hours. If the distance is in metres and the speed is wanted in
  km/h, change the metres to kilometres first (divide by 1000).
- **Times as hours and minutes:** 2.75 hours is 2 hours and 0.75 × 60 = 45
  minutes. Write it as 2 H 45 MIN.
- **km/h and m/s:** 1 m/s = 3.6 km/h. Multiply m/s by 3.6 to get km/h;
  divide km/h by 3.6 to get m/s (36 km/h = 10 m/s).
- **Average speed** is the total distance ÷ the total time. Do not just
  average the two speeds — find the time for each part first.
- **Density** = mass ÷ volume (grams per cubic centimetre); **pressure** =
  force ÷ area (newtons per square metre). They work exactly like speed:
  mass = density × volume, force = pressure × area.
- **Distance–time graphs:** time runs along the bottom and distance from
  home up the side. A flat line means stopped. A steeper line means
  faster: the speed of a part is the distance it climbs (or falls) ÷ the
  time it takes. A line coming down means heading back home. Every corner
  of the line sits on a grid crossing — read it off carefully.

## Purpose

Speed, distance and time is the classic "compound measure": a rate that
combines two quantities. It is taught as unit rates in grade 6 of the US
Common Core and as compound measures in Key Stage 3 and GCSE in England,
where density and pressure follow the same pattern, and in the "Time and
Distance" chapters of Indian middle-school mathematics. Working with mixed
units, average speeds and graphs builds proportional reasoning and the
habit of checking units — and distance–time graphs are many students'
first meeting with gradient as a rate of change.

## History

Galileo Galilei was the first to treat speed as a quantity to be measured,
timing balls rolling down slopes in the early 1600s; he still described it
in words, as a distance covered in a time. Expressing speed as a single
number with a combined unit — miles per hour, metres per second — came
with the railways in the 1800s, when timetables and speed limits needed
it. The idea of density is far older: Archimedes is said to have found
whether a crown was pure gold by measuring its volume in water, around 250
BC. Graphs of motion against time go back to Nicole Oresme in the 1300s,
who drew changing speeds as shapes.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `speed`, `units`,
  `average`, `density`, `graphs`); `locale` (`us` measures journeys in
  miles and mph and writes METERS and 12-hour times; `uk` and `in` use km,
  km/h and 24-hour times; m/s, density and pressure are metric
  everywhere); `count` (4-12); `width`, `height`, `line`.
- **Generation:** Easy uses whole hours and round speeds; Medium uses
  hours and minutes (quarter hours), km/h ↔ m/s with whole answers,
  average speed over two parts, and on mixed pages one distance–time graph
  with two or three questions; Hard adds times in tenths of an hour,
  metres per second over seconds, half-unit conversions, density, journeys
  with two outward parts and the average speed from a graph; Expert mixes
  units (metres and minutes to km/h, or miles and minutes to mph) and adds
  pressure. The travellers suit the speeds (a walker is never given 40
  km/h). A graph journey starts from home, goes out, stops once, and comes
  back; every corner sits on a grid crossing (half hours across, the
  distance step up) and every part's speed is between 4 and 60 per hour.
  The `graphs` topic prints two journeys side by side; a page that runs
  out of different graph questions tops up with speed questions. Topics
  are served at an honest level: speed from Easy, units, average and
  graphs from Medium, density from Hard (Kids requests are served at the
  lowest level and meta reports `requested_difficulty`).
- **Solving:** each question is built from a consistent triple (amount =
  rate × base) with exact decimals, and the missing one is the answer;
  graph answers come from the journey's corners.
- **Guarantees:** `answers_checked` — every printed quantity is converted
  to SI units (metres, seconds, m/s, with exact factors such as 1 mile =
  1609.344 m) as an exact fraction, and the answer is recomputed and must
  match exactly, be positive and have at most two decimal places. The tests
  also check every triangle in floating point with textbook conversion
  factors (÷ 3.6 for km/h), read each shown answer back to its exact value
  (including "2 H 45 MIN" and clock times), read each journey's corners
  back from the drawn line through the logged axes and answer every graph
  question again from what was read, check that the key writes exactly the
  answers in red and that every printed character is in the font.
