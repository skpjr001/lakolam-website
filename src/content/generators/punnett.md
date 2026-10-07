---
title: "Punnett Squares"
blurb: "Punnett squares — monohybrid and dihybrid crosses, gametes, genotype and phenotype counts and chances, worked exactly"
category: maths
version: "1.0.0"
---
Fill the square, count the offspring, and see Mendel's ratios appear — every count worked out exactly.

## What it is

A genetics worksheet of Punnett squares. Each question names a real trait —
Mendel's seven pea characters (round or wrinkled seeds, yellow or green
seeds, tall or short stems and more), black or white fur and rough or smooth
coats in guinea pigs, red or yellow tomatoes — or, for incomplete dominance,
snapdragon and four o'clock flowers and Andalusian chickens. Alleles keep
their case, so Bb and BB look different on the page. Single-gene crosses use
a 2 × 2 square; two-gene (dihybrid) crosses a 4 × 4 square. Under each
square the page asks how many offspring have each genotype and each
phenotype, and the chance of one phenotype as a percentage. The answer key
fills in the gametes, every box of the square and every count.

## How to play

1. Work out each parent's genotype. A capital letter is the dominant allele
   and a small letter the recessive one. A parent that shows the recessive
   look must have two small letters (bb). "Heterozygous" means one of each
   (Bb); "homozygous" means two the same (BB or bb).
2. Write the gametes along the edges. Each gamete gets one letter for each
   gene. For one gene, split the pair: Bb gives B and b. For two genes, take
   one letter from each pair in every way: RrYy gives RY, Ry, rY and ry.
3. Fill each box with the letter from the top of its column and the letter
   from the start of its row. Write the capital letter first (Bb, not bB),
   and keep each gene's letters together (RrYy).
4. Count. Each box is one equally likely offspring: out of 4 for one gene,
   out of 16 for two. An offspring shows the dominant look if it has at
   least one capital letter. With incomplete dominance the mixed pair (such
   as RW) shows the in-between look, such as pink.
5. The chance of a look is its count divided by the total: 3 out of 4 is
   75%, 3 out of 16 is 18.75%.

## Purpose

Punnett squares are the standard way to teach inheritance: they appear in
US middle and high school life science (MS-LS3, HS-LS3), GCSE Biology
(inheritance, variation and evolution) and CBSE class 10 (heredity). They
turn a genetics idea into counting, link to probability and ratio, and lead
naturally from the 3 : 1 of a single gene to the 9 : 3 : 3 : 1 of two genes
on different chromosomes.

## History

Gregor Mendel crossed tens of thousands of pea plants in his monastery
garden in Brno and reported the 3 : 1 and 9 : 3 : 3 : 1 ratios in 1866; his
work was ignored until it was rediscovered in 1900. The British geneticist
Reginald Punnett, working with William Bateson at Cambridge, devised the
square diagram around 1905 to show all the ways the gametes can meet, and it
appeared in his book Mendelism. Incomplete dominance was described early in
the same period, with Carl Correns's work on four o'clock flowers.

## This implementation

- **Spec knobs:** `difficulty`; `cross` (`auto`, `monohybrid`, `dihybrid`);
  `dominance` (`complete`, `incomplete`, `mixed` — single-gene crosses only;
  ignored for dihybrid crosses, which the meta reports); `gametes` (`auto`,
  `given`, `blank`); `parents` (`auto`, `genotypes`, `words`); `count`
  (0 = 4 single-gene or 2 dihybrid crosses; up to 6 and 4, larger requests
  are reduced and reported as `requested_count`); `width`, `height`,
  `line` (clamped page sizes are reported as `requested_*`).
- **Generation:** traits come from a curated list (letters whose capital and
  small forms look alike, such as C, O, S, V, W, X, Z, are avoided). Parents
  are drawn so that every gene segregates; at Hard at least one parent is
  heterozygous for both genes. No cross repeats on a page. Kids: single
  gene, gametes given, phenotype counts. Easy: adds genotype counts. Medium:
  parents in words, gametes to write, chance of a phenotype. Hard: dihybrid
  with gametes given. Expert: dihybrid from a description in words. The
  dihybrid pages ask for phenotype counts and a chance, not the nine
  genotype counts.
- **Solving:** gametes are the parent's alleles, one per gene, in the usual
  FOIL order; the square is every pairing, and every count is a tally of the
  square's boxes. Percentages of quarters and sixteenths are exact (at most
  two decimal places).
- **Guarantees:** `answers_checked` in the meta. An independent check re-reads
  every box from its printed gametes, checks each allele appears in half of a
  parent's gametes, and re-derives every genotype and phenotype count by
  multiplying per-gene Mendelian probabilities (independent assortment),
  then checks the printed percentage against the reduced fraction.
  Difficulty is by cross type and scaffolding (`rating_basis`).
