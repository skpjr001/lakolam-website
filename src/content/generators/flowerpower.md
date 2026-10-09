---
title: "Flower Power"
blurb: "Flower Power — a ring of five-letter petals sharing boundary letters"
category: word
version: "1.2.0"
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

- **Spec knobs:** `petals` (6–10), `difficulty` (default hard), `diameter`,
  `line`, `bold`.
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
  from the full ring, each removal kept only while the answer stays forced,
  until their share reaches the requested band's (kids ≥ 75 %, easy ≥ 60 %,
  medium ≥ 45 %), or to a minimal forcing set for hard. Since 1.1.0 the
  chaining search is bounded: at most 1,000,000 steps per starting word and
  4,000,000 per attempt (about a second or three), after which the next
  start, then the next attempt, is tried. Before, a start whose ring could
  not close — few words end in its first letter — searched every branch,
  which took minutes for about one seed in ten at 8–10 petals (the default
  spec at seed 1 took five). Flowers the old search found within those
  bounds are byte-identical; the slow seeds now get a different flower.
- **Guarantees:** deterministic per seed; every petal is a vocabulary word and
  neighbours share their boundary letter (checked); and a backtracking search
  petal by petal proves exactly one filling is consistent with the given
  letters. Vocabulary vendored, so the crate depends on no other generator.
  Rated by the share of letters given (`rating_basis: given_ratio`).
- **Reachable bands:** kids, easy, medium and hard. There is no expert rung —
  a minimal forcing set is the hardest the given count can make — so expert
  is served as hard with `requested_difficulty` (bold pages included).
- **Version 1.2:** `difficulty` now steers the trim, and a kids rung (≥ 75 %
  of letters given) was added. Before, every flower was trimmed to a minimal
  set and came out hard whatever was asked. Hard (the new default) and expert
  requests, and so the default page, are byte-identical to 1.1; bold pages now
  report `requested_difficulty` when the band differs.
