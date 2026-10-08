---
title: "Equations of Motion"
blurb: "Equations of motion — the SUVAT equations, free fall and velocity–time graphs, every answer exact and proven the only one"
category: maths
version: "1.0.0"
---
The SUVAT equations, free fall and velocity–time graphs — every answer exact, and the only one.

## What it is

A physics worksheet of four to twelve questions on motion in a straight
line with constant acceleration. Some give three of the five quantities —
displacement s, initial velocity u, final velocity v, acceleration a and
time t — and ask for another; some drop or throw a stone and ask how far
it falls, how fast it lands or how high it rises; some show a
velocity–time graph on a grid and ask for an acceleration, a distance or
an average speed. A panel at the top lists the five letters, the four
equations, and g when objects fall. The answer key fills in every line.

## How to play

Every object moves in a straight line, speeds up or slows down steadily,
and never turns round.

1. Write down the five letters s, u, v, a and t, fill in the three you
   are given, and mark the one you want.
2. Choose the equation that uses your three knowns and your unknown and
   leaves out the fifth letter:
   - v = u + at (no s)
   - s = ut + (a × t squared) ÷ 2 (no v)
   - v squared = u squared + 2as (no t)
   - s = (u + v) × t ÷ 2 (no a)
3. Put the numbers in and solve. A negative acceleration means the object
   is slowing down; a deceleration is written as a positive number.
4. **Free fall:** an object dropped "from rest" has u = 0 and speeds up at
   g = 9.8 m/s per second (or 10 when the page says so). An object thrown
   straight up slows down at g until v = 0 at the top.
5. **Velocity–time graphs:** the acceleration in a stage is the gradient
   (change in velocity ÷ time taken). The distance travelled is the area
   under the line — split it into rectangles and triangles. Average speed
   = total distance ÷ total time.
6. **Speeds in km/h:** divide by 3.6 to get m/s.

Every answer comes out exactly, so you never need to round.

## Purpose

The "suvat" equations are the core of kinematics in England's GCSE Physics
and A-level Maths and Physics, of the "Motion" chapter of India's CBSE
class 9 (the three equations of motion, derived from velocity–time graphs)
and of US high-school physics (the kinematic equations, often written
with x and v0). Pupils find the method hard less for the algebra than for
choosing the right equation, so the page varies which three quantities are
given and which is asked, and the panel keeps the equations in view.
Velocity–time graphs tie the equations to their meaning: gradient is
acceleration, area is distance.

## History

Medieval scholars at Merton College, Oxford, proved in the 1330s the "mean
speed theorem": a body accelerating uniformly covers the same distance as
one moving steadily at its average speed — the equation s = (u + v)t/2.
Nicole Oresme proved it with a picture, the first velocity–time graph,
whose area is the distance. Galileo Galilei rolled balls down inclined
planes and in his *Two New Sciences* (1638) showed that distance from rest
grows as the square of the time, s = at²/2, and that every body falls with
the same acceleration when air resistance can be ignored. Isaac Newton's
laws (1687) explained why. The letters s, u, v, a and t are a British
school convention of the twentieth century.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `equations`,
  `free_fall`, `graphs`); `gravity` (`"9.8"` or `"10"` m/s², ignored on
  pages with no free-fall question); `count` (4-12, at most 8 on an
  all-graph page so each graph stays readable; clamped and recorded as
  `requested_count`); `width`, `height`, `line`.
- **Generation:** each question is built forwards from a motion — u, a and
  t drawn for the level, v and s worked out — until every number printed
  and every answer terminates within three decimal places. Easy uses only
  v = u + at with whole numbers, free fall "dropped from rest" for speed or
  time, and two-stage graphs (speed up, then steady). Medium uses all four
  equations with positive acceleration and halves, avoids times that need
  a quadratic, and asks how far a dropped object falls or how long it takes
  to land; its graphs have two or three stages and ask for total distance.
  Hard adds slowing down, times from the quadratic s = ut + at²/2, objects
  thrown upwards and graphs that end at rest (asking a deceleration).
  Expert asks for two unknowns at once, gives a braking vehicle's speed in
  km/h, throws objects down from a cliff and asks graphs' average speed.
  Kids is served at Easy (meta `requested_difficulty`). No question repeats
  on a page.
- **Solving:** an independent solver takes the three known quantities of
  each question and solves for the two unknowns by the algebra for that
  pair, keeping both roots of every square root and quadratic, then checks
  each candidate against v = u + at and s = (u + v)t/2 exactly.
- **Guarantees:** `answers_checked` and `unique_solution` — every equation
  and free-fall question has exactly one solution in which the object
  moves forwards without turning round (t > 0, u ≥ 0, v ≥ 0), and the key
  matches it; this is why the panel states that rule (without it, a
  slowing object's time from a quadratic would have two answers). Graph
  answers are recomputed stage by stage with the equations of motion and
  must match the trapezium areas the generator used. The tests go further:
  they solve every two-unknown case of a known motion, check every
  question's solution against all four equations, recompute graph areas
  as rectangles plus triangles, check that a corrupted answer or a removed
  given is caught, that `gravity` changes free-fall pages and nothing
  else, and that prompts, graphs and answer lines never overlap.
