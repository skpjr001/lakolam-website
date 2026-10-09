---
title: "Nuclear Equations"
blurb: "Nuclear equations — alpha, beta and gamma decay of real isotopes in nuclide notation, missing particles and parents, decay series and counting decays, every equation balanced in mass and atomic number"
category: maths
version: "1.0.0"
---
Alpha, beta and gamma in nuclide notation — complete the equations, find the missing particle and follow real decay series, with mass and atomic numbers balanced every time.

## What it is

A physics and chemistry worksheet of four to eight questions on
radioactive decay. Each equation is drawn in nuclide notation — the mass
number over the atomic number beside the symbol — with boxes to fill in:
the nucleus an isotope becomes, the particle it gives out, or the nucleus
it started as. Other questions name a decay from the change in mass and
atomic number, fill in a run of a real decay series (uranium-238,
thorium-232 or uranium-235), and count the alpha and beta decays between
two members of a series. Every isotope is real and decays the way the
question says. The answer key fills every box.

## How to play

1. **Top and bottom numbers.** The top number is the mass number (protons
   plus neutrons); the bottom number is the atomic number (protons), which
   tells you the element.
2. **Balance both rows.** The mass numbers on the left add up to the mass
   numbers on the right, and so do the atomic numbers.
3. **Alpha decay** gives out a helium nucleus (mass 4, atomic number 2):
   the mass number drops by 4 and the atomic number by 2.
4. **Beta-minus decay** gives out an electron (mass 0, atomic number -1):
   a neutron turns into a proton, so the atomic number goes up by 1.
5. **Beta-plus decay** gives out a positron (mass 0, atomic number +1), and
   in **electron capture** the nucleus takes in an electron: either way the
   atomic number goes down by 1.
6. **Gamma** rays have mass 0 and atomic number 0: an excited nucleus (such
   as technetium-99m) settles down and nothing else changes.
7. **Counting decays in a series:** divide the drop in mass number by 4 to
   get the alpha decays. Each alpha lowers the atomic number by 2; the
   betas make up the difference, each raising it by 1.

## Purpose

Nuclear equations are where pupils first meet conservation laws in nuclear
physics: GCSE Physics (AQA 8463 4.4.2), NGSS HS-PS1-8 and CBSE class 12
"Nuclei" all ask for them. Balancing the two rows is simple arithmetic, but
it ties the atomic number to the element's identity, and following a real
series from uranium to lead shows where radon in houses and the lead at the
end of the chain come from.

## History

Henri Becquerel found that uranium salts fog photographic plates in 1896.
Ernest Rutherford named alpha and beta rays in 1899, and Paul Villard found
gamma rays in 1900. Rutherford and Frederick Soddy showed in 1902 that
decay turns one element into another, and in 1913 Soddy and Kasimir Fajans
stated the displacement law: alpha moves an element two places down the
periodic table, beta one place up. The positron was found by Carl Anderson
in 1932, and electron capture by Luis Alvarez in 1937.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `equations`, `identify`,
  `series`); `particles` (`symbols`: He and e; or `greek`: α and β);
  `count` (4-8, clamped and recorded as `requested_count`); `width`,
  `height`, `line`.
- **Generation:** isotopes come from a curated list of 55 well-known
  nuclides with their main decay mode (NNDC / NUBASE): uranium, thorium,
  radium, radon, polonium, plutonium and americium alpha emitters; tritium,
  carbon-14, phosphorus-32, strontium-90, iodine-131, caesium-137 and
  cobalt-60 beta emitters; fluorine-18 and other positron emitters;
  beryllium-7 and other electron-capture nuclides; technetium-99m and
  barium-137m for gamma. Easy uses alpha and beta-minus; Medium adds gamma
  and missing particles; Hard adds beta-plus, electron capture, missing
  parents and three-step runs of a series; Expert has four-step runs and
  counting decays. The series follow each chain's main branch. Neutrinos
  are left out, as in GCSE equations. The series topic starts at Hard;
  Kids is served at Easy.
- **Solving:** the checker adds up the drawn mass and atomic numbers on
  each side of every arrow, checks each series arrow against its decay
  mode, and solves 4a = change in mass number, 2a - b = change in atomic
  number for the counts.
- **Guarantees:** `answers_checked` and `balanced`. The tests recount each
  equation from the printed numbers, check every symbol against its atomic
  number with a separately written symbol list, check the three series end
  on lead-206, lead-208 and lead-207 (U-238 → Pb-206 is 8 alpha and 6
  beta), walk the real series to verify every count, and catch a changed
  answer or an unbalanced equation.
