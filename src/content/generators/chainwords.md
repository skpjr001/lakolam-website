---
title: "Chain Words"
blurb: "Chain Words — order letter chunks along a chain so each box joined to the next makes a word"
category: word
version: "1.0.0"
---
Put the letter chunks in order along the chain, so each box joined to the
next makes a word.

## What it is

A chain of boxes snakes across the page, and the first box is already
filled in. The other chunks of letters are listed below the chain, in
alphabetical order. Each chunk belongs in exactly one box, and when they are
all in place, every box joined to the box after it spells a word: RAIN and
DROP make RAINDROP, DROP and OUT make DROPOUT, OUT and DOOR make OUTDOOR. In
the easier puzzles every chunk is a word in its own right; in the harder
ones some chunks are only pieces of words.

## How to play

Start at the filled box. Look through the list for a chunk that joins on to
the end of it to make a word, and write it in the next box. Then do the same
with the chunk you have just written, following the chain from box to box.
Each chunk is used exactly once, and the order of the words matters: the
chunk in a box comes first, the chunk in the next box comes second. If two
chunks seem to fit, think ahead: only one of them leaves a way to use up
every chunk by the end of the chain. Cross chunks off the list as you place
them.

## Purpose

A word-building puzzle that rewards seeing words inside words. Following the
chain trains spelling and an eye for compound words and word endings, and
the need to use every chunk adds a little planning. Short chains of whole
words suit younger solvers; long chains with word pieces make a proper
challenge.

## History

Chains in which each word overlaps the next are among the oldest word games,
from the parlour game of word links to the "word ladder" and "word chain"
pages of puzzle magazines. The form with chunks that join into words is
familiar from newspaper puzzle pages and television word games, where a
chain of words has to be rebuilt link by link.

## This implementation

- **Spec knobs:** `difficulty`, `cell` (box height; boxes are wide enough
  for five letters), `line`.
- **Generation:** a graph of chunks is built from common, family-friendly
  dictionary words that are not inflections (no plurals or past tenses):
  an edge from chunk A to chunk B whenever A + B is such a word, with every
  chunk three to five letters long. Kids, Easy and Medium use only chunks
  that are common words themselves (TURN, OUT, CAST); Hard and Expert allow
  word pieces (MIND, FUL, FIL, LET). A seeded walk through the graph finds a
  chain of distinct chunks whose words all differ. Kids chains have 6 chunks
  with words of up to 7 letters, Easy 8 chunks (words up to 8 letters),
  Medium 10, Hard 12, Expert 14.
- **Solving:** the chunks are joined in every possible way, with an edge
  wherever the join is a word in a large dictionary of about 114,000 words,
  and the orderings that start in the first box and use every chunk once are
  counted, stopping at two. While there is a second ordering, a chunk where
  the two differ is printed in its box; printed chunks are then removed
  again wherever the chain stays unique without them.
- **Guarantees:** deterministic per seed; exactly one ordering fits, proven
  against the large dictionary and re-checked in the tests by growing every
  ordering box by box with direct dictionary lookups; every chain word is a
  common dictionary word and every chunk and word passes the family-friendly
  filter. Rated by how many chunks the solver must place (`rating_basis`:
  `chunks_to_place`): up to 5 is Kids, 6 to 7 Easy, 8 to 9 Medium, 10 to 11
  Hard, 12 or more Expert. When printed chunks drop a puzzle below the
  requested band, the nearest band is returned and labelled honestly.
