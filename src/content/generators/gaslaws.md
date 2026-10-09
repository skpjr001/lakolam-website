---
title: "Gas Laws"
blurb: "Gas laws — Boyle, Charles, Gay-Lussac, combined and ideal gas laws, partial pressures and unit conversions, every answer exact and substituted back"
category: maths
version: "1.0.0"
---
Squeeze it, heat it, seal it: Boyle, Charles, Gay-Lussac, the combined and ideal gas laws — every answer exact and substituted back.

## What it is

A chemistry and physics worksheet of four to twelve gas questions. A
sample of gas changes from one state to another and pupils find the
missing pressure, volume or temperature; they use pV = nRT to find a
pressure, volume, amount or temperature, and from Hard a mass or a molar
mass; they find partial pressures in a mixture, convert between units, and
name the law an everyday situation obeys. A box at the top lists the laws
the page uses and the conversions it needs. Every answer is an exact
decimal, so no rounding rules are needed, and the answer key fills in each
one.

## How to play

1. **Temperatures go in kelvin.** Add 273 to a Celsius temperature:
   27 °C is 300 K. Give a °C answer by taking 273 off again.
2. **Boyle's law** (constant temperature): p₁V₁ = p₂V₂. Halve the
   volume and the pressure doubles.
3. **Charles's law** (constant pressure): V₁/T₁ = V₂/T₂. **Gay-Lussac's
   law** (constant volume): p₁/T₁ = p₂/T₂.
4. **Combined law** (a fixed amount of gas): p₁V₁/T₁ = p₂V₂/T₂. Cover
   up whatever stays the same and it becomes one of the three laws above.
5. **Ideal gas law:** pV = nRT. Use the value of R in the box and the
   units it goes with: kPa and dm³ with R = 8.314, or atm and litres with
   R = 0.0821. The amount n is the mass divided by the molar mass.
6. **Partial pressures:** the pressures of the gases in a mixture add up to
   the total. A gas's share of the total is its share of the moles (its
   mole fraction).
7. If the two states use different units, change one to match the other
   first: 1 atm = 101.325 kPa = 760 mmHg, 1 dm³ = 1000 cm³, 1 L = 1000 mL.

## Purpose

The gas laws are the first quantitative model of matter most pupils meet,
and a staple of US high-school chemistry, India's CBSE class 11 "States of
Matter" and GCSE Physics (pV = constant). The questions practise
rearranging a proportion, converting units before substituting, and the
habit of working in kelvin. The "which law?" questions connect the
algebra to syringes, tyres, balloons and pressure cookers.

## History

Robert Boyle published the pressure–volume law in 1662, from experiments
with a J-shaped tube of mercury built with Robert Hooke; Edme Mariotte
found it independently in 1676, so in France it is Mariotte's law. Jacques
Charles found around 1787 that gases expand equally when heated, but did
not publish; Joseph Louis Gay-Lussac did in 1802, crediting Charles, and
also studied pressure and temperature at fixed volume (a law Guillaume
Amontons had glimpsed in 1702). John Dalton stated the law of partial
pressures in 1801. Émile Clapeyron combined the laws into the ideal gas
equation in 1834, and Lord Kelvin's absolute temperature scale (1848) set
the zero the laws need.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `boyle`, `charles`,
  `gay_lussac`, `combined`, `ideal`, `dalton`, `units`, `identify`);
  `units` (`kpa`: kPa and dm³ with R = 8.314 J/(mol·K); `atm`: atm and
  litres with R = 0.0821 L·atm/(mol·K)); `count` (4-12, clamped and
  recorded as `requested_count`); `width`, `height`, `line`.
- **Generation:** each question is built forwards from round values. For
  a change of state, every quantity but one is drawn from a round set in
  its printed unit, the last follows from pV/T staying constant, and the
  question is kept only if that value terminates within two decimal
  places (three from Hard), every value is physically plausible (150-900
  K, 5-3000 kPa) and each quantity changes by a factor between 1.1 and 4.
  Any of the quantities may then be the unknown (only a final-state one at
  Easy). For pV = nRT the amount, volume and temperature are round and the
  pressure follows, so the hidden quantity may be any of the four. Easy
  keeps kelvin and one unit; Medium brings °C, the combined law, pV = nRT
  for p or V and mole fractions; Hard adds millilitres or cm³ in one state,
  any unknown in pV = nRT, masses and °C answers; Expert puts the final
  pressure in another unit (kPa, atm or mmHg), uses Pa, m³ and mmHg in
  pV = nRT, and asks for molar masses (the gas is one of ten common gases).
  Kelvin is T(°C) + 273, as most school syllabuses use. The combined and
  ideal topics start at Medium and Kids is served at Easy (meta
  `requested_difficulty`). No question repeats on a page. "Which law?"
  draws from 26 written situations, each tagged with the quantities that
  change.
- **Solving:** the checker converts every printed quantity — givens and
  answers — to kPa, litres and kelvin with its own unit table, then
  checks the law multiplied out exactly in rational arithmetic: p₁V₁T₂ =
  p₂V₂T₁, pV = nRT (n = m/M where a mass is given), partial pressures that
  sum to the total or equal the mole fraction times it, and conversions
  that agree in base units. It also requires each given to be printed in
  the question, and each answer to be asked for but not printed. "Which
  law?" answers follow from the set of quantities that change.
- **Guarantees:** `answers_checked` and `unique`: each question has one
  exact answer, a terminating decimal printed in full. The tests solve
  every question a second way, with the textbook rearrangement in
  floating point from SI units, check textbook examples (Boyle, Charles
  in °C, 1 mol at 300 K, 380 mmHg = 0.5 atm), catch a changed answer, a
  wrong law and a dropped given, and keep every printed character inside
  the font.
