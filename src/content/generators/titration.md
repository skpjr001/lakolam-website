---
title: "Titration"
blurb: "Titration — read drawn burettes, complete results tables, pick concordant titres and calculate concentrations from balanced equations, every answer recomputed exactly"
category: maths
version: "1.0.0"
---
Read the burette, find the concordant titres, work out the concentration — titration results and calculations, every answer recomputed exactly.

## What it is

A chemistry worksheet of four to eight questions on acid–alkali
titrations. Pupils read drawn burettes before and after a titration and
find the titre; complete a results table of a rough run and three accurate
runs, choose the concordant titres and find their mean; and use the
balanced equation to calculate an unknown concentration in mol/dm³, from
Hard also in g/dm³, or predict the titre a known solution should need. At
Expert they go straight from a results table to the concentration.

## How to play

1. **Reading a burette.** The scale reads downwards from 0.00. Read the
   bottom of the curved surface (the meniscus) to the nearest 0.05 cm³ and
   always write two decimal places (23.40, not 23.4).
2. **Titre** = final reading - initial reading.
3. **Concordant titres** agree within 0.10 cm³ of each other. Leave out the
   rough titre and any run that does not agree, and take the mean of the
   concordant ones.
4. **Moles** of the solution you know = concentration × volume in dm³
   (cm³ ÷ 1000).
5. **Use the equation's ratio.** In H₂SO₄ + 2NaOH, one mole of acid reacts
   with two of alkali.
6. **Concentration** of the unknown = its moles ÷ its volume in dm³. Give
   it to 3 significant figures. For g/dm³, multiply by the Mr.

## Purpose

Titration is the classic quantitative practical in chemistry: a required
practical in GCSE (AQA 8462 4.4.2.5) and A-level Chemistry, and a staple of
US and Indian school labs. Reading the scale, judging concordance and
carrying moles through a ratio are separate skills, and the worksheet
practises each before putting them together.

## History

François-Antoine-Henri Descroizilles built an early burette in the 1790s
for testing bleach, and Joseph Louis Gay-Lussac refined the method and
coined the words "burette" and "titrer" in the 1820s and 1830s. Karl
Friedrich Mohr's 1855 textbook made volumetric analysis routine, and his
burette with a pinch clip, and later the glass stopcock, gave the
instrument its modern form.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `readings`, `results`,
  `calculations`); `count` (4-8, clamped and recorded as `requested_count`);
  `width`, `height`, `line`.
- **Generation:** every reading is a multiple of 0.05 cm³ and titres run
  from 15.00 to 28.00 cm³. Results tables have either three titres within
  0.10 cm³ or two within 0.10 cm³ and one at least 0.25 cm³ away, so there
  is exactly one largest concordant set, and the mean is exact to two
  decimal places. Reactions: hydrochloric, nitric, ethanoic and sulfuric
  acids with sodium and potassium hydroxide, and hydrochloric acid with
  sodium carbonate; 1:2 and 2:1 ratios start at Hard. Known concentrations
  are 0.0500-0.250 mol/dm³ and aliquots 10.00, 20.00 or 25.00 cm³.
  Calculations start at Medium; Kids is served at Easy.
- **Solving:** answers are computed in exact rational arithmetic and
  rounded to 3 significant figures (an exact tie is refused); the equation's
  atoms are balanced by parsing the formulas, and the concordant set is
  found by checking every subset of runs.
- **Guarantees:** `answers_checked` and `one_concordant_set`. The tests
  read each burette back from its drawn marks and meniscus, recompute
  titres, concordance (pair by pair) and means from the readings, and
  concentrations from the printed numbers and the printed equation's
  ratio, and catch a changed answer.
