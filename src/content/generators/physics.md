---
title: "Physics Equations"
blurb: "Physics equations — energy, waves, forces, moments, pressure and half-life, every answer exact and re-solved from the printed givens"
category: maths
version: "1.0.0"
---
Energy, waves, forces, moments, pressure and half-life — every answer exact, and the only one the givens allow.

## What it is

A physics worksheet of four to twelve calculation questions from the
equation sheet that school physics courses ask pupils to learn: kinetic
and gravitational potential energy, specific heat capacity, power, work
done and efficiency; wave speed, period and echoes; weight, F = ma,
Hooke's law and momentum; moments and balanced beams drawn on a pivot;
pressure on a surface and in a liquid; and radioactive half-life from
numbers or from a decay graph. A grey panel at the top prints, as word
equations, every equation the page needs, the value of g and any unit
conversions. The answer key fills in every answer line.

## How to play

1. Read the question and write down each quantity you are given, with its
   unit.
2. Convert to the standard units first: kilograms (1 kg = 1000 g), metres
   (1 m = 100 cm), joules (1 kJ = 1000 J), watts, seconds (1 minute =
   60 s), hertz and square metres (1 m² = 10 000 cm²). The panel lists the
   conversions the page uses.
3. Find the word equation in the panel that links what you know to what
   you want. If the unknown is not on its own, rearrange first: for
   example, from wave speed = frequency × wavelength, wavelength = wave
   speed ÷ frequency. For a speed from kinetic energy, speed squared =
   2 × kinetic energy ÷ mass, then take the square root.
4. Some questions need two equations: work out the first quantity (the
   energy from a heater, the weight of a hanging mass) and use it in the
   second.
5. **Moments:** a force's moment is the force × its distance from the
   pivot. On a balanced beam the moments turning it one way add up to the
   moments turning it the other way.
6. **Half-life:** after each half-life the amount (or count rate) halves.
   Count the halvings: 800, 400, 200, 100 is three half-lives. On a decay
   graph, find the time it takes to fall from the start to half of it.
7. Write the answer with its unit. Every answer comes out exactly, so you
   never need to round.

## Purpose

England's GCSE Physics gives pupils a sheet of equations, most of which
they must also recall, and asks for substitution, rearrangement and unit
conversion in almost every paper; India's CBSE class 9 covers work and
energy, sound (wave speed and echoes), force and gravitation; US physical
science and high-school physics practise the same relationships. The
skills are the same everywhere: pick the right equation, convert units,
rearrange, substitute. The page varies which quantity is unknown and how
the givens are dressed, keeps the equations in view so practice goes into
method rather than recall, and adds the two diagram skills examiners love:
balancing a beam and reading a half-life from a curve.

## History

Archimedes stated the law of the lever in the third century BC: weights
balance at distances inversely proportional to them. Galileo and Newton
built mechanics (force, mass and acceleration, 1687), Robert Hooke
hid his spring law in the anagram "ceiiinosssttuv" in 1676 and solved it
in 1678 (*ut tensio, sic vis* — as the extension, so the force), and Blaise Pascal
showed that pressure in a liquid grows with depth. Joseph Black measured
specific heats in the 1760s, James Joule found the mechanical equivalent
of heat in the 1840s, and "kinetic energy" was named by William Thomson
and Peter Tait. In 1900 Ernest Rutherford found that the activity of a
radioactive gas halves in a fixed time, its half-life.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `energy`, `waves`,
  `forces`, `moments`, `pressure`, `half_life`); `gravity` (`"9.8"` or
  `"10"` N/kg, ignored on pages with no question that uses g — topics
  `waves`, `moments` and `half_life`); `count` (4-12, at most 8 for
  `moments` and `half_life`, whose diagrams need room; clamped and
  recorded as `requested_count`); `width`, `height`, `line`.
- **Generation:** each question is built forwards from a consistent set of
  quantities drawn for its level (masses plausible for the object named),
  then one is asked and the rest printed. Easy asks the equation's subject
  with every given in standard units. Medium adds halves and asks any
  quantity that sits on the top line of a rearrangement, and introduces
  the decay graph and beams asked for a distance. Hard asks any quantity —
  including a speed from kinetic energy — and prints one given in another
  unit (g, cm, cm², kJ, kW, kHz, kPa, minutes) when it reads naturally;
  beams may carry two loads on one side, and the decay graph also asks the
  time to fall to an eighth. Expert chains two equations (a dropped
  object's landing speed or height, a heater's specific heat capacity or
  temperature rise, a motor's efficiency, a hanging mass's spring
  constant, a block's pressure from its mass, wave speed from the period),
  converts up to two givens and asks a half-life sample's starting amount.
  Kids is served at Easy (meta `requested_difficulty`). Isotopes are
  invented (Isotope A, X…) because real ones have fixed half-lives. No
  question repeats on a page.
- **Solving:** each question carries the equations its quantities obey —
  a product of powers (`E = 0.5 × m × v²`), a balance of moments, or a
  whole number of halvings. The checker converts every printed given to SI
  from the unit's own table, then repeatedly solves any equation with
  exactly one unknown; every equation is strictly monotonic in each
  positive quantity, so that unknown has exactly one positive value.
- **Guarantees:** `answers_checked` and `unique_solution` — every answer is
  forced by the printed givens and equals the key, every number printed
  terminates within three decimal places, and a decay graph's curve passes
  through grid crossings at every half-life. The tests recompute every
  answer a third way, with the textbook formula for that unknown and units
  read from their printed text; check that a corrupted answer, a removed
  given or a decay curve that stops halving is caught; that `gravity`
  changes exactly the pages that use g; and that prompts, diagrams and
  answer lines never overlap or leave the page.
