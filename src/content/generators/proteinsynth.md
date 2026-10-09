---
title: "Protein Synthesis"
blurb: "Protein synthesis — transcribe DNA to mRNA, translate codons to amino acids with a printed codon chart, find start codons and classify mutations, every answer re-derived from the genetic code"
category: maths
version: "1.0.0"
---
DNA to mRNA to protein — transcribe, translate with a printed codon chart, find the start codon and name the mutation, every answer re-derived from the genetic code.

## What it is

A biology worksheet of four to eight questions on how a gene becomes a
protein. Pupils write the other DNA strand and the mRNA a gene is copied
into, the tRNA anticodons, and the chain of amino acids read from the start
codon to the first stop codon. Harder pages hide the start codon inside a
longer message, show a gene before and after a mutation and ask whether the
change is silent, missense, nonsense or a frameshift, and work backwards
from a short protein to the codons that could code for it. The full codon
chart — all 64 codons with their amino acids — is printed on the page, and
the answer key fills in every strand and chain.

## How to play

1. **Pair the bases.** In DNA, A pairs with T and C pairs with G. RNA has U
   instead of T, so an A in DNA pairs with U in RNA.
2. **Transcription.** The mRNA is built against the template strand, base
   by base: template TAC GGA becomes mRNA AUG CCU. If you are given the
   coding strand instead, the mRNA has the same bases with U in place of T.
3. **tRNA anticodons** pair with the mRNA codons: codon AUG has anticodon
   UAC.
4. **Translation.** Start at the first AUG (which codes for methionine,
   MET). Read the mRNA three bases at a time and look each codon up in the
   chart: the first base down the side, the second across the top, the
   third inside the box. A stop codon (UAA, UAG, UGA) ends the chain and
   adds no amino acid.
5. **Mutations.** Translate both versions and compare. Silent: the chain is
   the same. Missense: one amino acid changes. Nonsense: a stop codon
   appears early and the chain is cut short. Frameshift: a base added or
   lost moves every codon after it.
6. **Working backwards.** Most amino acids have several codons. The number
   of messages that code for a protein is the number of codons for each
   amino acid multiplied together, times 3 for the stop codon.

## Purpose

Transcription and translation are the heart of molecular biology and the
most set worksheet in high-school biology (NGSS HS-LS1-1, India's CBSE
class 12 "Molecular Basis of Inheritance", GCSE and A-level Biology).
Working the code by hand makes the base-pairing rules, the triplet code and
its redundancy concrete, and the mutation questions show why one changed
base can matter — or not matter at all.

## History

Francis Crick proposed in 1958 that information flows from DNA to RNA to
protein, and with Sydney Brenner showed in 1961, using frameshift mutations
in a virus, that the code is read in triplets. The same year Marshall
Nirenberg and Heinrich Matthaei found that the RNA UUU makes
phenylalanine; by 1966 the whole table had been read by Nirenberg, Har
Gobind Khorana and others, and Robert Holley worked out the structure of a
tRNA. Nirenberg, Khorana and Holley shared the 1968 Nobel Prize.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `transcription`,
  `translation`, `mutations`, `reverse`); `strand` (`template`, written 3'
  to 5', or `coding`, written 5' to 3'); `codes` (`three`-letter or
  `one`-letter amino acids); `count` (4-8, clamped and recorded as
  `requested_count`); `width`, `height`, `line`.
- **Generation:** each gene is AUG, two to five random sense codons and a
  stop codon. Easy transcribes and translates short genes; Medium adds tRNA
  anticodons and reverse questions; Hard hides the start codon after two to
  five leading bases (with no earlier AUG) and asks about substitutions,
  chosen to be silent, missense or nonsense; Expert adds one-base
  insertions and deletions. Mutations start at Hard and reverse questions
  at Medium; Kids is served at Easy (meta `requested_difficulty`). No
  question repeats on a page.
- **Solving:** every answer comes from base pairing and the standard
  genetic code, written into the crate as amino acid → codons. The type of
  a mutation is decided by translating both genes and comparing the chains.
- **Guarantees:** `answers_checked`. The tests read every strand back off
  the printed prompt and re-derive each answer with a separately written
  codon table (NCBI's translation table 1 as one string), check that the
  crate's table has all 64 codons and agrees with it, that all four
  mutation types occur, that a changed answer is caught, and that every
  printed character is in the font.
