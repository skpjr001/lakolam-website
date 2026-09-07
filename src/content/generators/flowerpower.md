---
title: "Flower Power"
blurb: "Flower Power — a ring of five-letter petals sharing boundary letters"
category: word
version: "1.0.0"
---
A ring of petals around a hub, each petal a five-letter word — and where two
petals meet they share a letter, so the words chain all the way around.

## What it is

Eight (or so) five-letter words arranged in a circle. The last letter of each
petal is the first letter of the next, so the whole flower is one closed loop
of overlapping words. A few letters are printed to start; fill the rest so
every petal spells a word.

## How to play

Start where a shared letter and a given letter box a petal in. Because petals
overlap, solving one hands you the first letter of its neighbour — the
deductions run around the ring in both directions until it closes.

## Purpose

A radial cousin of the newspaper Flower Power, and the only ring-of-overlapping-
words structure in the word lane. Its guarantee is a real one: given the
printed letters, exactly one filling makes every petal a vocabulary word.

## History

Flower Power and its Petal Pushers relatives are flagship Penny Dell titles,
built on words read around a flower of petals.

## This implementation

- **Spec knobs:** `petals` (6–10), `difficulty`, `diameter`, `line`.
- **Generation:** a closed loop of five-letter words is chained by boundary
  letter (each word's last letter starting the next, the last closing back to
  the first) via backtracking over the vocabulary; then letters are trimmed
  from the full ring to a set that still forces the answer.
- **Guarantees:** deterministic per seed; every petal is a vocabulary word and
  neighbours share their boundary letter (checked); and a backtracking search
  petal by petal proves exactly one filling is consistent with the given
  letters. Vocabulary vendored, so the crate depends on no other generator.
