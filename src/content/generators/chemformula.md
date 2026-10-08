---
title: "Ionic Formulae"
blurb: "Ionic formulae — formulae from ions and names by the criss-cross rule, names with Roman numerals, ion charges and atom counts, every answer re-parsed and checked for neutrality"
category: maths
version: "1.0.0"
---
Write the formula, name the compound, find the charge, count the atoms — every answer checked by reading the formula back.

## What it is

A chemistry worksheet of four to sixteen questions on ionic compounds,
built from a table of 34 common ions: simple ions such as Na⁺, Mg²⁺, Cl⁻
and O²⁻, group ions such as OH⁻, NO₃⁻, SO₄²⁻, CO₃²⁻, NH₄⁺ and PO₄³⁻, and
metals with more than one charge, such as iron(II) and iron(III). Pupils
write the formula of the compound two ions make, write a formula from a
name, name a compound from its formula, work out the charge on a metal ion
from a formula, and count the atoms in a formula unit. A box at the top
gives the rule and, from Medium up, the table of ions on the page. The
answer key fills in every answer.

## How to play

1. A compound has no overall charge: the positive and negative charges
   must cancel.
2. **Formula from ions:** take enough of each ion to cancel the charges,
   using the smallest whole numbers. Mg (charge 2+) and Cl (charge 1-) need two chlorides:
   MgCl₂. Al (charge 3+) and O (charge 2-) need two aluminiums and three oxides: Al₂O₃ (the
   "criss-cross" trick: each ion's charge becomes the other's number,
   then cancel down).
3. Write the metal first. Write a small number after an ion when there is
   more than one of it, and put brackets round a group ion (one made of
   several atoms, such as OH or SO₄) when there is more than one of it:
   Ca(OH)₂, Al₂(SO₄)₃.
4. **Names:** the metal's name, then the negative ion's name (chloride,
   oxide, sulfate…). For a metal that can have different charges, a Roman
   numeral gives the charge: iron(III) oxide is Fe₂O₃.
5. **Charge from a formula:** add up the negative charges and share them
   among the metal ions. In Fe₂(SO₄)₃ three sulfates give 6−, so each iron
   is 3+.
6. **Counting atoms:** a small number counts the atom or bracket just
   before it. Ca(OH)₂ has 1 calcium, 2 oxygens and 2 hydrogens: 5 atoms.

## Purpose

Writing ionic formulae is a gateway skill of school chemistry: India's
CBSE class 9 "Atoms and Molecules" teaches it with a valency table,
England's GCSE Chemistry and Combined Science expect it from the ions'
charges, and US high-school chemistry drills it before equations and the
mole. Pupils who can turn a name into a formula and back can balance
equations, calculate formula masses and read labels. The page varies the
direction and the question so the rule — charges cancel in lowest terms —
is understood rather than memorised pair by pair.

## History

John Dalton wrote the first chemical formulae with circle symbols in
1808, and Jöns Jacob Berzelius introduced letter symbols in 1813 (with
superscript numbers; the subscripts used today came later). Svante
Arrhenius proposed in 1884 that salts split into charged ions in water,
an idea first ridiculed and then rewarded with the 1903 Nobel Prize.
Alfred Stock proposed the Roman-numeral names for metals with more than
one charge in 1919; IUPAC adopted them, alongside the older -ous and -ic
names (ferrous, ferric) that some books still use.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `formulae`, `naming`,
  `charges`, `atoms`); `count` (4-16, clamped and recorded as
  `requested_count`); `width`, `height`, `line`.
- **Generation:** each question picks a positive and a negative ion from
  the table up to the level. Easy uses simple ions (Li, Na, K, Mg, Ca, Ba,
  Al with F, Cl, Br, I, O, S) and gives charges in the question; Medium
  adds silver, zinc and the group ions hydroxide, nitrate, sulfate and
  carbonate, printed in an ion table, and asks for brackets; Hard adds
  copper(I)/(II), iron(II)/(III), lead(II) and chromium(III) with Roman
  numerals both ways, and the charge on a metal from a formula; Expert
  adds ammonium, lead(IV), tin(II), manganese(II), nitride, phosphate,
  hydrogencarbonate, sulfite and nitrite. Atom questions above Easy
  always need brackets or subscripts. The `charges` topic needs metals
  with two charges, so it is served at Hard or above (meta
  `requested_difficulty`); Kids is served at Easy. Names use IUPAC (UK)
  spelling — aluminium, sulfate — and the ion table carries no
  third-party data. No question repeats on a page.
- **Solving:** the checker reads the printed formula back with its own
  parser (longest ion symbol first, brackets, subscript digits), finds the
  metal's charge from neutrality, and requires the charges to cancel, the
  numbers to be in lowest terms, brackets exactly round a group ion used
  more than once, and the name to match. Atom counts come from a separate
  element-by-element parser.
- **Guarantees:** `answers_checked` and `unique`: every one of the 285
  cation–anion pairs gives a different formula that reads back to exactly
  its two ions and its name, so formula and name determine each other.
  The tests check fifteen textbook formulae and their atom counts (Ca(OH)₂
  5, Al₂(SO₄)₃ 17, (NH₄)₃PO₄ 20), reject formulae with wrong numbers,
  missing or needless brackets or unbalanced charges, catch a changed
  answer, and keep every printed character inside the font.
