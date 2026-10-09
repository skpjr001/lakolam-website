---
title: "Energy Changes"
blurb: "Energy changes — reaction profiles, calorimetry with Q = mcΔT, bond-energy calculations and Hess's law, with the page's own data table and every answer exact"
category: maths
version: "1.0.0"
---
Exothermic or endothermic? Read the profile, heat the water, break the bonds and close the Hess cycle — every answer exact against the page's own data.

## What it is

A chemistry worksheet of four to eight questions on the energy of
reactions. Pupils read the activation energy and enthalpy change off drawn
energy profiles (with a dashed catalysed path and the reverse reaction at
the higher levels); work out the heat taken in by water from Q = mcΔT and
the enthalpy change per mole of a burned fuel or of water formed in
neutralisation; calculate ΔH from average bond energies; and use Hess's law
with enthalpies of formation or of combustion. A box at the top prints
every bond energy and enthalpy the page uses.

## How to play

1. **Energy profiles.** The activation energy is the climb from the
   reactants to the peak. The enthalpy change is products minus reactants:
   negative means exothermic (energy given out), positive means
   endothermic. A catalyst lowers the peak but not the two ends.
2. **Heat:** Q = m × c × dT (dT, the temperature change), with m the mass of water (or solution) in
   grams, c = 4.18 J per gram per degree, and dT the temperature rise.
3. **Per mole:** dH (the enthalpy change, written delta-H on the page) = -Q ÷ moles, with Q in kJ. For a fuel, moles = mass
   burned ÷ Mr.
4. **Bond energies:** add up the energy of every bond in the reactants
   (bonds broken) and every bond in the products (bonds made). dH = bonds
   broken - bonds made. Count each molecule as many times as the equation
   says.
5. **Hess's law with formation data:** dH = (sum for the products) - (sum
   for the reactants), multiplying each value by its number in the
   equation. Elements count as 0.
6. **With combustion data:** dH = (sum for the reactants) - (sum for the
   products).

## Purpose

Energy changes appear in every chemistry course: GCSE Chemistry (AQA 8462
4.5, bond energies for higher tier), CBSE class 11 "Thermodynamics", and US
high-school and AP Chemistry. The calculations practise sign conventions
and multi-step arithmetic, and the profiles connect the numbers to what a
catalyst actually does.

## History

Joseph Black distinguished heat from temperature and measured latent heats
in the 1760s, and Antoine Lavoisier and Pierre-Simon Laplace built an ice
calorimeter in 1782. Germain Hess stated in 1840 that the heat of a
reaction does not depend on the route taken. Svante Arrhenius introduced
activation energy in 1889, and Linus Pauling's tables of bond energies
(1932) made average bond energies a standard estimating tool.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `profiles`,
  `calorimetry`, `bonds`, `hess`); `count` (4-8, clamped and recorded as
  `requested_count`); `width`, `height`, `line`.
- **Generation:** profile levels sit on the gridlines of the drawn axis.
  Calorimetry uses 50-250 g of water and temperatures to 0.1 °C, with fuel
  amounts chosen so ΔH is an exact decimal; the Hard "temperature rise"
  question works backwards from the heat. Bond-energy questions come from
  23 balanced gas reactions (hydrogen with the halogens, the Haber process,
  combustions, hydrogenation, halogenation, hydration and their reverses);
  at Medium they list each molecule's bonds and use molecules with one kind
  of bond, at Hard pupils count the bonds themselves. Hess questions come
  from 15 formation and 8 combustion reactions. Bond energies and
  enthalpies are the commonly quoted data-book values, rounded to whole kJ
  per mole; because textbooks differ slightly, the page prints its own
  table and every answer is exact against it. Bond energies start at
  Medium and Hess's law at Hard; Kids is served at Easy.
- **Solving:** answers are recomputed from the reaction: atoms balanced by
  parsing each formula, bond totals summed molecule by molecule, Hess sums
  taken from the tables, calorimetry in exact rational arithmetic.
- **Guarantees:** `answers_checked` and `atoms_balanced`. The tests check
  every molecule's bonds against the valences of its atoms, balance every
  reaction with a separate formula reader, recompute every answer from the
  printed data box and prompt (profiles read back from the drawn levels),
  check textbook values (H₂ + Cl₂ is -185 kJ/mol, the Haber process -93),
  and catch a changed answer.
