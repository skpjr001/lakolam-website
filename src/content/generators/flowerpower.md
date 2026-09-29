---
title: "Flower Power"
blurb: "Flower Power — a ring of five-letter petals sharing boundary letters"
category: word
version: "1.1.0"
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
deductions run around the ring in both directions until it closes. The
Bold & Easy version has six big petals, large letter circles and thick
lines, and once the words are found the flower is yours to colour.

## Purpose

A radial cousin of the newspaper Flower Power, and the only ring-of-overlapping-
words structure in the word lane. Its guarantee is a real one: given the
printed letters, exactly one filling makes every petal a vocabulary word.

## History

Flower Power and its Petal Pushers relatives are flagship Penny Dell titles,
built on words read around a flower of petals.

## This implementation

- **Spec knobs:** `petals` (6–10), `difficulty`, `diameter`, `line`, `bold`.
- **Bold & Easy (`bold: true`):** six petals (the fewest), the diameter
  raised to at least 520 Pt, letter circles that touch in a closed ring (so no
  guide line cuts through them and the paper inside is enclosed), six big
  petal shapes from the hub, each ending on its word's middle letter, one
  stroke weight of 2.8 x `line` (4.5 pt by default, 4 to 8), letters and
  numbers drawn as thick as the lines, no grey tints and no hub caption. The
  puzzle is built and proven exactly as before. The line art (letters
  excluded: the counter of an A is not a region) passes the bold check:
  lako-validate's **kids** profile plus every stroke >= 3 pt plus a flood
  fill of the rendered page measuring every enclosed region against 200 mm².
  Meta carries `bold: true`, `colorable` and a `validation` block;
  measured smallest region ~460 mm² (37 regions).
- **Generation:** a closed loop of five-letter words is chained by boundary
  letter (each word's last letter starting the next, the last closing back to
  the first) via backtracking over the vocabulary; then letters are trimmed
  from the full ring to a set that still forces the answer.
- **Guarantees:** deterministic per seed; every petal is a vocabulary word and
  neighbours share their boundary letter (checked); and a backtracking search
  petal by petal proves exactly one filling is consistent with the given
  letters. Vocabulary vendored, so the crate depends on no other generator.
