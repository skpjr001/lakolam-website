---
title: "The Periodic Table"
blurb: "Periodic table worksheets — a drawn table to complete, symbol, name, number, group and period quizzes, protons, neutrons and electrons"
category: maths
version: "1.0.0"
---
Complete the periodic table, match names to symbols, numbers, groups and periods, and count protons, neutrons and electrons.

## What it is

A periodic table worksheet. The drawn table shows all 118 elements in the
usual layout — 18 groups, 7 periods and the two separate rows of
lanthanoids and actinoids — shaded by block, with some boxes left empty
for the missing symbols (and, on harder pages, atomic numbers). Beneath it a
quiz table gives one clue per row — an element's name, its symbol, its
atomic number, or on the hardest pages just its group and period — and asks
for the rest. An atomic structure page lists real isotopes, such as
chlorine-37 or carbon-14, and asks for their protons, neutrons and
electrons. Symbols are printed with their proper capital and small letters
(He, Na, Fe). The answer key fills in everything.

## How to play

- **Symbols:** every symbol starts with a capital letter; a second letter
  is always small: cobalt is a capital C with a small o, while a capital C
  followed by a capital O means carbon and oxygen together. Some come from Latin
  names: Na sodium, K potassium, Fe iron, Cu copper, Ag silver, Sn tin,
  Au gold, Hg mercury, Pb lead.
- **Atomic number:** the number of protons. Elements are placed in order of
  atomic number, left to right and row by row.
- **Group and period:** the group is the column (1 to 18) and the period is
  the row (1 to 7). The two separate rows at the bottom belong in periods 6
  and 7.
- **Protons, neutrons, electrons:** protons = atomic number. In a neutral
  atom, electrons = protons. Neutrons = mass number − atomic number, so
  chlorine-37 has 17 protons, 17 electrons and 37 − 17 = 20 neutrons. In
  nuclide notation the mass number is written above the atomic number, to
  the left of the symbol.

## Purpose

Reading the periodic table is a core skill in US middle school physical
science (MS-PS1-1), GCSE Chemistry (atomic structure and the periodic
table) and CBSE classes 9 and 10. Learning the symbols, the layout by
groups and periods, and the link between atomic number and particles
prepares pupils for bonding, formulas and equations.

## History

Dmitri Mendeleev published his periodic table in 1869, arranging the 63
known elements by atomic weight and leaving gaps for elements not yet found;
gallium, scandium and germanium soon filled them as he predicted. Henry
Moseley showed in 1913 that the true order is by atomic number. Glenn
Seaborg moved the actinoids into their own row in the 1940s, giving the
familiar shape, and the seventh period was completed when nihonium,
moscovium, tennessine and oganesson were named in 2016.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed` — table and quiz —
  `table`, `quiz`, `atoms`); `count` (0 = 12 table blanks or 10 rows; table
  4–40, quiz and atoms 4–16; in mixed mode the quiz has at most 8 rows;
  values outside the range, or more than the elements in play, are reduced
  and reported as `requested_count`); `spelling` (`international` —
  aluminium, caesium — or `us` — aluminum, cesium; only these two names
  differ); `shade` (`blocks` or `none`; ignored without a drawn table);
  `width`, `height`, `line`.
- **Generation:** the data is a 118-row table written for Lakolam (atomic
  number, symbol, IUPAC name, group, period) and a list of real isotopes.
  Kids uses elements 1–10 with names and symbols; Easy 1–20 and adds atomic
  numbers; Medium 1–36 and adds groups and periods; Hard 1–86 without the
  lanthanoids, hides some table numbers too and shows isotopes in nuclide
  notation; Expert uses all 118, gives some quiz clues as a group and period
  alone, and some atoms rows give the particles and ask for the isotope.
  The lanthanoids and actinoids are never asked for a group, because where
  group 3 ends is still debated.
- **Solving:** every answer is a lookup in the table.
- **Guarantees:** `unique` and `answers_checked` in the meta. An independent
  check re-finds each quiz element from the clues the page prints by
  scanning all 118 rows and requires exactly one match; checks that each
  empty table box sits at a position only one element occupies; and checks
  each isotope is in the list. Tests check the table against the shape of
  the periodic law (period lengths 2, 8, 8, 18, 18, 32, 32 and the order of
  groups). Difficulty is by element range and clue type (`rating_basis`).
