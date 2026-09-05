---
title: "Drop Quote"
blurb: "Drop quote — fallen phrases, proven to reassemble one way"
category: word
version: "1.0.0"
---
A quotation's letters have fallen out of their grid; each column's letters
hang above it in alphabetical order. Drop them back so the rows read the
quote.

## What it is

Also known as Fallen Phrases: a quote laid into a fixed-width grid, spaces
blacked out, words never split across rows, and every column's letters
extracted and sorted. The deeper a column's pool, the harder the choice.

## How to play

Start with one-letter pools — they place themselves — and short words next to
black cells. Every placement removes a letter from its pool, narrowing the
columns it shares with other words. The quote emerges middle-out.

## Why it is in the catalogue

A newspaper classic that reuses the quote corpus discipline the cryptogram
established (public-domain lines with attribution), and a puzzle whose
failure mode — two valid reconstructions from the same pools — is exactly the
kind of thing this workspace insists on proving absent rather than assuming.

## The implementation's guarantees

- **Uniqueness is proved, not hoped**: the crate's solver counts
  reconstructions in which every horizontal run spells a word from the
  quote's own bank and every column consumes exactly its pool. A quote is
  published only at a width where that count is one; the width search nudges
  the wrap (±4 columns) because the wrap decides whether two same-length
  words share columns.
- The ambiguity is real, not theoretical: curating the corpus caught two
  quotes ("WELL DONE IS BETTER THAN WELL SAID" — DONE and SAID swap; a
  Franklin replacement fell the same way) whose pools genuinely permit two
  fillings at every tried width. They were replaced, and the curation is a
  test: every corpus entry must find an unambiguous width.
- Identical words swapping positions produce the identical grid — the solver
  deduplicates them, which an earlier test learned the hard way.
- Rating basis: `deepest_column_pool` (2 Easy, 3 Medium, more Hard). The
  answer key ships the filled grid.
