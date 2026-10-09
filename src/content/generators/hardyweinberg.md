---
title: "Hardy-Weinberg"
blurb: "Hardy-Weinberg equilibrium — allele and genotype frequencies from phenotypes and counts, carriers of recessive conditions and chi-squared equilibrium tests, every answer exact"
category: maths
version: "1.0.0"
---
From the recessive trait to every genotype — allele frequencies, carriers and equilibrium tests, every answer exact.

## What it is

A biology worksheet of four to eight population-genetics problems. From the
number or share of a population showing a recessive trait, pupils find the
allele frequencies q and p and the genotype frequencies p² and 2pq; from
genotype counts they find p and q directly; from how often a recessive
condition appears they estimate how many carriers a town has; and from a
sample of genotypes they work out the numbers expected in equilibrium and
decide whether the population fits — exactly at the lower levels, with a
chi-squared test at Expert. The traits are real single-gene traits of pea
plants, moths, fruit flies, mice and guinea pigs.

## How to play

1. **p and q.** p is the frequency of the dominant allele A, q the
   frequency of the recessive allele a, and p + q = 1.
2. **The genotypes** in equilibrium are AA = p squared, Aa = 2pq and aa = q
   squared, and they add up to 1.
3. **Start from the recessive trait.** Only aa individuals show it, so its
   share is q squared: take the square root to get q, then p = 1 - q.
4. **From the dominant trait,** its share is 1 - q squared.
5. **From genotype counts,** p = (2 × number of AA + number of Aa) ÷ (2 ×
   total).
6. **Carriers** are the heterozygotes, Aa: their share is 2pq. Multiply by
   the population to count them.
7. **Is it in equilibrium?** Work out p from the counts, then the expected
   numbers (frequency × total) and compare with what was observed.
8. **Chi-squared:** add up (observed - expected) squared ÷ expected over the
   three genotypes. Below 3.84 the population fits equilibrium; above it,
   it does not.

## Purpose

The Hardy-Weinberg principle is the starting point of population genetics,
taught in AP Biology Unit 7, A-level Biology (AQA 7402 3.7.2) and
university introductions to evolution. The problems practise square roots,
rearranging, and the idea of a null model that evolution is measured
against — and they show why rare recessive conditions are carried by many
more people than have them.

## History

In 1908 the mathematician G. H. Hardy, answering a question from the
geneticist Reginald Punnett, showed that allele frequencies stay constant
from generation to generation without selection, migration, mutation or
chance; the German physician Wilhelm Weinberg had published the same result
a few weeks earlier. The chi-squared test was introduced by Karl Pearson in
1900, and Ronald Fisher fixed its degrees of freedom in 1922.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `frequencies`,
  `carriers`, `equilibrium`); `notation` (`decimal` or `percent`); `count`
  (4-8, clamped and recorded as `requested_count`); `width`, `height`,
  `line`.
- **Generation:** every question is built backwards from an exact allele
  frequency: q = k/20 at Easy and Medium, k/100 from Hard, or 1/K (K = 20,
  25, 40, 50, 100) for rare conditions. Populations are multiples of the
  denominator of q squared, so every count is whole. Samples out of
  equilibrium move the same number of individuals from Aa to each
  homozygote, so p is unchanged and the expected numbers stay whole.
  Carriers and equilibrium start at Medium and chi-squared at Expert; Kids
  is served at Easy.
- **Solving:** exact rational arithmetic throughout; chi-squared is given
  to 2 decimal places (exact ties refused) and is always more than 0.2 from
  the critical value 3.84 (one degree of freedom), so the verdict is never
  borderline.
- **Guarantees:** `answers_checked`. The tests recompute every answer in
  floating point from the numbers printed in the prompt, check that both
  verdicts occur for both kinds of equilibrium question, and catch a
  changed answer.
