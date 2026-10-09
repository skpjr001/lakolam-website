---
title: "Electrons and Bonding"
blurb: "Electron shells and bonding — Bohr diagrams, configurations, ions, Lewis symbols and dot-and-cross diagrams, every diagram checked electron by electron for full outer shells"
category: maths
version: "1.0.0"
---
Fill the shells, find the ions, share the pairs — Bohr diagrams, configurations and dot-and-cross diagrams, every one checked electron by electron.

## What it is

A chemistry worksheet of four to eight questions on where electrons go.
Pupils draw the electrons on a Bohr (shell) diagram of an element from
hydrogen to calcium, write electron configurations as shell numbers
(2,8,1) or, from Hard, as sub-shells (1s² 2s² 2p⁶ 3s¹, up to krypton at
Expert), count an atom's outer electrons and name the ion it forms, draw
Lewis dot symbols, and complete dot-and-cross diagrams: ionic compounds
such as sodium chloride, magnesium oxide and calcium chloride, and covalent
molecules such as hydrogen, chlorine, water, ammonia, methane, oxygen,
carbon dioxide and nitrogen. The page prints the empty template — the
nucleus and its rings, the symbol, or the overlapping atom circles — and
the answer key draws every electron, the brackets and the charges.

## How to play

1. **Shells.** Electrons fill shells from the centre: up to 2 in the
   first shell, then 8, then 8, then 2 (for elements up to calcium).
   Sodium (11 electrons) is 2,8,1.
2. **Sub-shells** (Hard and Expert): fill 1s 2s 2p 3s 3p 4s 3d 4p in that
   order; an s sub-shell holds 2, p holds 6 and d holds 10. Chromium and
   copper move one 4s electron into 3d.
3. **Ions.** The outer shell decides the ion. Metals with 1, 2 or 3 outer
   electrons lose them and become positive ions (Na+, Mg 2+, Al 3+).
   Non-metals with 5, 6 or 7 gain electrons to make 8 and become negative
   ions (N 3-, O 2-, Cl-).
4. **Lewis symbols.** Write the symbol and put one dot for each outer
   electron round it, one on each side before any pair up.
5. **Ionic dot and cross.** Show outer shells only. Use crosses for the
   metal's electrons and dots for the non-metal's. The metal's outer
   electrons move to the non-metal, so the metal ion's shell is left empty
   and the non-metal ion has 8. Put each ion in square brackets with its
   charge.
6. **Covalent dot and cross.** Each atom gives its outer electrons as dots
   or crosses (one kind per atom). Shared pairs sit where the circles
   overlap — one pair for a single bond, two for a double, three for a
   triple — and the other electrons sit in pairs (lone pairs). Every atom
   must end with a full outer shell: 2 for hydrogen, 8 for the others.
   Count the shared pairs and the lone pairs in the whole molecule.

## Purpose

How electrons are arranged explains the periodic table and every kind of
bond, and the diagrams are among the most drawn things in school
chemistry: Bohr models in US middle-school science (NGSS MS-PS1-1), the
Bohr-Bury shell rules in India's CBSE class 9 "Structure of the Atom",
and dot-and-cross diagrams of ionic and covalent bonding in England's
GCSE Chemistry. Drawing each electron makes the octet rule something
pupils can count, and the shared and lone pairs prepare them for molecular
shapes.

## History

Niels Bohr put electrons in fixed orbits round the nucleus in 1913, and
Charles Bury proposed in 1921 the shell capacities of 2, 8, 18 used in
schools. Gilbert Lewis drew outer electrons as dots at the corners of a
cube in 1916 and explained the covalent bond as a shared pair; Irving
Langmuir popularised his ideas as the octet rule in 1919, while Walther
Kossel explained ionic bonding by the transfer of electrons the same year.
The s, p, d labels come from the "sharp", "principal" and "diffuse" lines
of atomic spectra, and the filling order was stated as the n + l rule by
Erwin Madelung in 1936.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `shells`, `ions`,
  `ionic`, `covalent`); `count` (4-8, clamped and recorded as
  `requested_count`); `width`, `height`, `line`.
- **Generation:** elements come from a table of the first 36. Easy asks
  for Bohr diagrams and shell configurations of elements 1-20; Medium adds
  outer electrons and ions (for elements that form a simple ion — not
  hydrogen, helium, beryllium, boron, carbon, silicon or the noble gases),
  Lewis symbols, 1:1 ionic compounds and single-bonded molecules; Hard
  writes configurations in sub-shells and adds 1:2 and 2:1 compounds
  (CaCl₂, Na₂O…), hydrogen sulfide, phosphine, silane, oxygen and carbon
  dioxide; Expert extends sub-shells to krypton and adds nitrogen's triple
  bond and tetrachloromethane. Compounds come from curated tables of 19
  ionic compounds and 15 molecules. Each diagram is laid out on a fixed
  template: a molecule's outer atoms left, right, below and above its
  central atom, shared pairs stacked across each overlap, lone pairs on
  the free sides; ions in a row in brackets. The ions, ionic and covalent
  topics start at Medium and Kids is served at Easy (meta
  `requested_difficulty`). No question repeats on a page; when every
  compound of a kind is already on it, a configuration question takes the
  place.
- **Solving:** the checker counts the drawn electrons, not the tables:
  electrons on each Bohr ring (inner shells full, total Z); the marks
  inside each atom's circle (a full shell of 8, or 2 for hydrogen), the
  marks each atom owns (its outer electrons), marks inside two circles
  (shared pairs) and one (lone pairs); for ions, an empty metal shell, 8
  round each non-metal with exactly as many crosses as its charge, every
  metal electron transferred and charges that cancel. Sub-shell
  configurations are re-derived by the Madelung n + l rule.
- **Guarantees:** `answers_checked`, `shells_checked` and `unique`. The
  tests check textbook configurations (sodium, iron, chromium, copper,
  bromine), full shells and electron ownership for every molecule and
  compound in the tables, lone pairs of water (2), ammonia (1), carbon
  dioxide (4) and nitrogen (2), catch a missing or misplaced electron and
  a changed answer, keep every diagram inside its box and every printed
  character inside the font.
