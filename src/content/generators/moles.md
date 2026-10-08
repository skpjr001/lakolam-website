---
title: "Mole Calculations"
blurb: "Mole calculations — relative formula mass, moles and mass, particles, percentage by mass, gas volumes, reacting masses, yield and concentration"
category: maths
version: "1.0.0"
---
Formula masses, moles, particles, gas volumes, reacting masses and concentrations — every answer exact.

## What it is

A chemistry worksheet of four to twelve calculation questions on the
mole. A data panel under the title gives the relative atomic mass of
every element the page uses (and the Avogadro constant, the volume of a
mole of gas and the litre conversion when the page needs them). Each
question ends with one or two answer lines such as MASS = ____ g. Formulas
are printed properly, with small letters and subscripts — Ca(OH)₂, Na₂CO₃
— and the answer key fills in every line.

## How to play

Use the relative atomic masses in the box at the top of the page.

- **Relative formula mass (Mr):** add up the masses of all the atoms in
  the formula. A small number after a symbol multiplies that atom; a small
  number after a bracket multiplies everything inside it. For Ca(OH)2 (calcium hydroxide):
  40 + 2 × (16 + 1) = 74.
- **Moles from mass:** moles = mass ÷ Mr. 22 g of CO2 is 22 ÷ 44 = 0.5 mol.
- **Mass from moles:** mass = moles × Mr.
- **Particles:** number of particles = moles × 6.02 × 10 to the power 23 (the Avogadro
  constant). To go back, divide by it.
- **Percentage by mass:** (mass of that element in the formula ÷ Mr) ×
  100. In Fe2O3 the iron is 2 × 56 = 112 out of 160, which is 70%.
- **Gas volumes:** one mole of any gas takes up 24 dm3 (cubic decimetres) at room temperature
  and pressure (or 22.4 L at STP, when the page says so). Volume = moles ×
  24.
- **Reacting masses:** turn the mass you are given into moles, use the
  numbers in front of the formulas in the balanced equation to find the
  moles of the substance you want, then turn those moles back into a mass
  (or a gas volume).
- **Percentage yield:** work out the theoretical yield (the most you
  could make), then percentage yield = actual mass ÷ theoretical mass ×
  100.
- **Concentration:** concentration in mol per dm3 = moles ÷ volume in dm3.
  Divide cm3 by 1000 to get dm3.

Every answer on these pages comes out exactly, so you never need to round.

## Purpose

The mole is the bridge between the masses chemists weigh and the numbers
of particles that react, and mole calculations are the quantitative core
of school chemistry: relative formula mass, moles, reacting masses, gas
volumes and concentration in GCSE Chemistry (England's "Quantitative
chemistry" topic), the "Atoms and Molecules" chapter of India's CBSE class
9 (molecular and formula unit mass, the mole concept, the Avogadro
constant) and US high-school chemistry (molar mass, stoichiometry, molar
volume at STP, molarity). Each step is short, but students need many
repetitions before the "mass → moles → ratio → moles → mass" routine is
automatic; exact answers keep the practice on the method rather than on
rounding.

## History

John Dalton published the first table of relative atomic weights in 1805,
with hydrogen as 1. Amedeo Avogadro proposed in 1811 that equal volumes of
gases at the same temperature and pressure hold equal numbers of
molecules, an idea Stanislao Cannizzaro used at the 1860 Karlsruhe
congress to settle the atomic weights chemists still argued over. Wilhelm
Ostwald coined the word "Mol" (from "Molekül") around 1894; Jean Perrin
measured the number of particles in a mole in 1909 and named it after
Avogadro. Since 2019 the mole has been defined by fixing that constant at
exactly 6.022 140 76 × 10²³; school data sheets round it to 6.02 × 10²³.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `formula_mass`, `moles`,
  `gases`, `reacting`, `solutions`); `standard` (`rtp`: relative formula
  mass Mr, 24 dm³ per mole of gas at room temperature and pressure, cm³
  and mol/dm³ — the GCSE convention; `stp`: molar mass in g/mol, 22.4 L
  per mole at STP, mL and mol/L — the CBSE and US convention); `count`
  (4-12, clamped and recorded as `requested_count`); `width`, `height`,
  `line`.
- **Generation:** Easy asks formula masses of formulas without brackets
  and whole numbers of moles, with whole-number answers. Medium adds
  brackets, fractions of a mole, numbers of particles, percentage by mass
  and gas volumes. Hard adds particles and gas volumes from a mass,
  reacting masses (from a reactant to a product) and concentrations.
  Expert asks about any pair of substances in an equation, gas volumes
  made in a reaction, percentage yield and the mass needed to make up a
  solution. Kids is served at Easy; `gases` starts at Medium and
  `reacting` and `solutions` at Hard (meta `requested_difficulty` records
  a lower request). Substances come from a curated list of 72 elements and
  compounds with school names; reactions from 28 well-known balanced
  equations (burning magnesium, thermal decomposition of calcium
  carbonate, metals with acids, neutralisation, the Haber process,
  fermentation…). Amounts are drawn from a list of friendly mole values
  until every number printed and every answer terminates within three
  decimal places; no question repeats on a page.
- **Solving:** answers are computed in exact fractions from the atom
  counts of each formula and the school Ar values (whole numbers, with
  chlorine 35.5 and copper 63.5).
- **Guarantees:** `answers_checked` — every answer is recomputed from the
  question's numbers by the textbook formula, finding each formula mass by
  a second, independent scan of the formula, and must match exactly; every
  equation printed is checked to be balanced. The tests go further: they
  re-solve the questions from the printed words alone, check that the two
  formula-mass routes agree on every substance and that every reaction
  conserves both atoms and mass, that the data panel lists exactly the
  elements a page needs, that the key writes every answer in red and the
  page none, and that every character printed is in the font.
