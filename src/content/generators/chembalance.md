---
title: "Balancing Equations"
blurb: "Balancing chemical equations — real reactions with subscripts, coefficients proved unique, optional atom-count tables"
category: maths
version: "1.0.0"
---
Write the numbers that make both sides of a real chemical equation match — each answer proved to be the only one.

## What it is

A chemistry worksheet of unbalanced equations for real reactions met at
school: hydrogen burning to water, iron rusting, metals in acid, thermite,
precipitation reactions, and the burning of methane, octane and sugar.
Formulas are printed properly, with capital and small letters and lowered
numbers (Fe₂O₃, Ca(OH)₂). Before every formula there is a line for its
number. Easier pages add a table to count the atoms of each element on both
sides; an option also asks for the kind of reaction. The answer key gives
every number, the atom counts and the kinds.

## How to play

A balanced equation has the same number of atoms of every element on the
left as on the right. You may only change the big numbers in front of the
formulas, never the small lowered numbers inside them.

1. List the elements and count the atoms of each on both sides. A small
   number counts the atom just before it; a small number after a bracket
   counts everything inside the bracket.
2. Start with an element that appears in only one formula on each side,
   usually a metal or carbon. Put a number in front to match it.
3. Recount, then balance the next element. Leave hydrogen and oxygen until
   last, and oxygen gas (O2, written with a small lowered 2) right to the end, since changing it affects
   nothing else.
4. If you need half an O2, double every number.
5. Use the smallest whole numbers that work, and write 1 where no number is
   needed.

For a burning fuel: balance carbon with CO2, then hydrogen with H2O, then
oxygen with O2.

## Purpose

Balancing equations is how pupils meet the law of conservation of mass in
symbols. It is required in US middle school physical science (MS-PS1-5),
GCSE Chemistry and CBSE class 10 (Chemical Reactions and Equations), and it
underlies all later work on moles and reacting masses. Counting atoms
across a bracket also practises multiplication and careful bookkeeping.

## History

Antoine Lavoisier showed in the 1770s and 1780s that mass is conserved in
chemical reactions, weighing reactants and products in sealed vessels.
Jöns Jacob Berzelius introduced letter symbols for the elements in 1813,
and chemical equations with coefficients came into use during the
nineteenth century as atomic weights were settled. The arrow notation
became standard in the early twentieth century.

## This implementation

- **Spec knobs:** `difficulty`; `kind` (`mixed`, `synthesis`,
  `decomposition`, `single_replacement`, `double_replacement`,
  `combustion`); `atom_table` (`auto` — on at Kids and Easy — `on`, `off`);
  `classify` (also ask for the kind of reaction); `count` (0 = 8, or 5 with
  atom tables; at most 12, or 6 with tables; fewer when the list runs short,
  always reported as `requested_count`); `width`, `height`, `line`.
- **Generation:** a curated list of over 100 real reactions written for
  Lakolam, stored without coefficients. Each is balanced at generation time
  and rated by its largest coefficient: Easy at most 2, Medium 3–4, Hard
  5–8, Expert 9 or more (Kids serves the Easy band). Reactions whose
  balanced form is all ones are left out. When a kind has none at the asked
  difficulty (there are no Expert synthesis reactions, for example) the
  nearest band that has some is served and `requested_difficulty` records
  the request.
- **Solving:** the composition matrix (elements × formulas, products
  negated) is reduced by exact rational Gaussian elimination. A reaction is
  accepted only if exactly one column is free and the resulting vector has
  one sign throughout; it is scaled to the smallest whole numbers.
- **Guarantees:** `unique` and `answers_checked` in the meta. With a
  one-dimensional null space every balancing is a multiple of one vector,
  so the smallest whole-number coefficients are unique. An independent
  check recounts atoms on each side from a fresh parse, checks the
  coefficients share no factor, and recomputes the rank by fraction-free
  integer elimination; tests also brute-force all small coefficient
  vectors and find only multiples of the answer.
