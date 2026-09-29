---
title: "Factors and Multiples"
blurb: "Factors and multiples — factor trees, prime or composite, the sieve, HCF/GCF and LCM with Venn diagrams"
category: maths
version: "1.0.0"
---
Factor trees, factor lists, primes, the sieve of Eratosthenes, and the
highest common factor and lowest common multiple, with Venn diagrams of
prime factors for older students.

## What it is

A worksheet with a NAME and DATE line and up to three titled sections, or
a whole page of one kind of question. Factor trees start from a number with
its first two branches (or, for beginners, the whole tree outline) and a
line underneath for the prime factorisation. Other sections ask for every
factor of a number, its factor pairs, its first few multiples, whether it
is prime or composite, or the greatest (highest) common factor and least
(lowest) common multiple of two numbers. At the upper levels the common
factor questions come with two overlapping circles to sort the prime
factors into. The sieve page is a 1 to 100 grid with the steps printed
above it. The answer key fills in one complete factor tree for each number
with the primes shaded, lists every answer in red, puts each prime factor
in its place in the Venn diagram, and on the sieve rings the primes and
strikes out the rest.

## How to use it

**Factor trees.** Split the number at the top into two factors, neither
of them 1, and write them in the circles below it. Keep splitting every
number that is not prime. A branch stops when it reaches a prime. Then
write the number as the product of all the primes at the ends of the
branches, smallest first: 72 = 2 x 2 x 2 x 3 x 3, or with powers, 2 cubed x 3 squared.
Different trees for the same number are all correct, and they always end
in the same primes; the answer key shows just one of them.

**Factors and factor pairs.** Test each whole number from 1 upwards: when
it divides exactly, it and its partner are both factors. Stop once the
numbers meet in the middle.

**Multiples.** Count on in steps of the number: 7, 14, 21, 28.

**Prime or composite.** A prime has exactly two factors, 1 and itself. A
composite number has more. Try dividing by 2, 3, 5, 7 and so on, up to the
number whose square is bigger than the number you are testing.

**Common factors and multiples.** The greatest common factor (called the
highest common factor, HCF, in the UK and India) is the biggest number
that divides both. The least common multiple is the smallest number both
divide into. With a Venn diagram, write each number's prime factors in its
circle, putting the primes the two numbers share in the middle. The common
factor is the product of the middle; the common multiple is the product of
every prime in the diagram.

**The sieve.** Cross out 1. Ring 2 and cross out every other multiple of
2. Ring 3 and cross out its multiples, then do the same for 5 and 7. Every
number still standing is prime; ring them all and count them.

## Purpose

Factors and multiples sit under almost everything that comes later:
simplifying fractions, finding common denominators, ratio, algebraic
factorising. Factor trees make prime factorisation visual and show that
however you split a number the primes at the bottom are always the same,
which is the fundamental theorem of arithmetic in a form a ten-year-old
can check. The Venn diagram method turns common factors and multiples from
guesswork into a procedure.

## History

Euclid proved that there are infinitely many primes and described the
greatest common divisor algorithm around 300 BCE. Eratosthenes of Cyrene,
librarian at Alexandria in the third century BCE, gave the sieve that
bears his name. That every whole number has exactly one factorisation into
primes was used for two thousand years but first proved carefully by Gauss
in 1801. The factor tree diagram is a twentieth-century classroom
invention; the Venn diagram method for HCF and LCM became common in
British and Indian textbooks in the 1990s.

## This implementation

- **Spec knobs:** `difficulty`; `task` (`mixed`, `trees`, `factors`,
  `pairs`, `multiples`, `primes`, `hcf_lcm`, `venn`, `sieve`); `problems`
  for a single-task page (1-40; 0 = the task's usual number: 8 trees, 6 at
  Hard and Expert, 12 factor lists, 10 pairs, 10 multiples, 30 prime
  questions, 12 HCF/LCM, 4 Venn diagrams); `exponent_form` (write
  factorisations with powers; default from Medium up); `locale` (`us`:
  GCF and "exponents"; `uk`: HCF and "indices"; `in`: HCF and
  "exponents"); page `width`, `height`, `line`.
- **Difficulty (grade):** Kids (grade 4) = trees for 8-30 with the whole
  outline and first split given, multiples of 2-12, primes to 40; Easy
  (grade 4-5) = trees for 12-60 with the outline, factor lists to 60,
  primes to 50; Medium (grade 5-6) = trees for 24-100 from the first
  branches only, factor lists to 100, GCF/LCM of numbers 10-100 (common
  factor at least 3, LCM at most 800); Hard (grade 6-7) = trees for 60-300
  with 4-5 prime factors, Venn diagrams for numbers to 150, primes 50-200
  where no composite is even or ends in 5; Expert (grade 7-8) = trees for
  120-1000 with 5-6 prime factors, Venn diagrams and HCF/LCM for numbers
  to 400 (LCM at most 4000). A mixed page has three sections: Kids trees,
  multiples, prime or composite; Easy trees, factor lists, prime or
  composite; Medium trees, factor lists, GCF and LCM; Hard trees, Venn
  diagrams, prime or composite; Expert trees, Venn diagrams, HCF and LCM.
  The sieve page is the same 1-100 grid at every level.
- **Generation:** numbers are chosen without repeats from the level's
  range, filtered by their prime-factor count (trees), number of factors
  (4 to 8-16 for lists and pairs), or common factor and LCM size (pairs;
  one never divides the other above Kids, and every Venn region holds 1 to
  4 primes). Prime questions are half primes (as many as the range has).
  Each key tree splits every composite into a randomly chosen factor pair.
  Pages that would not fit, or that ask for more different numbers than
  the level has, are refused with a clear message.
- **Solving:** answers come from exact integer arithmetic: a sieve of
  Eratosthenes for primality, trial division for factorisations, divisor
  pairs up to the square root for factor lists, Euclid's algorithm for the
  common factor, and a / HCF x b for the common multiple.
- **Guarantees:** deterministic per seed. Every answer is re-derived by a
  different method and checked before the page is drawn: each tree's
  splits multiply back, its leaves are primes by trial division and their
  product is the number (so the printed factorisation, which is unique, is
  right whichever tree the student draws); factor lists and pairs equal a
  full scan of 1 to n; prime marks and the sieve's primes match trial
  division; the common factor equals a brute-force search for the largest
  common divisor, the common multiple equals the first multiple of one
  number that the other divides, and HCF x LCM = a x b; the Venn regions
  multiply to each number, to the HCF and to the LCM. No number repeats
  within a section. Tests prove these across every task and level. Meta
  records `answers_checked`, `no_duplicates`, the grade and
  `rating_basis: number_size_and_skill`, and every question with its
  answer. A page takes a few milliseconds.
