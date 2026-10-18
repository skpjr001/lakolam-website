---
title: "Word Search"
blurb: "Themed word searches with distribution-matched filler and answer keys"
category: word
version: "1.3.0"
---
Find the listed words hidden in a grid of letters — across, down, and
diagonally, forwards or backwards.

## What it is

A rectangular grid of letters with a themed word list beside it. Every listed
word appears in the grid as a straight line of consecutive letters in one of
up to eight directions. The unused cells are filled with decoy letters.

## How to play

Scan for a word's rarest letter — a Q or a Z narrows candidates instantly.
Sweep each row and column with the word's first two letters in mind, then
check both diagonals. Circle finds and cross them off the list. On the harder settings, leftover letters can spell a hidden message once
every word is found.

Some lists show only part of each word: its first and last letters with a
dash for every letter between (B – – – N), or just a dash per letter. Work
out what the word could be from its length and letters, then hunt for it;
starting with the longest words leaves the fewest choices.

**One word.** Some pages hide a single word, and every letter in the grid is
one of that word's letters — so no odd letter stands out to start from. The
word appears exactly once, in a straight line in any of the eight
directions, forwards or backwards. Pick one letter of the word (the rarest
in the grid is best), and at each place it appears check every direction
for the next letter, then the next. Most tries fail after two or three
letters: keep going until one runs the whole length.

## Purpose

The most accessible puzzle in the catalogue — no rules to learn, playable by
early readers — and the volume seller of printed collections. Product quality
lives in the themed wordlists more than the algorithm, and the crate treats
the fill as a craft problem: decoys are drawn from the placed words' own
letter distribution, because a uniform fill makes real words pop out.

## History

Invented by **Norman E. Gibat**, published in the *Selenby Digest* of Norman,
Oklahoma, in March 1968 (Spanish-language *sopa de letras* by Pedro Ocón de
Oro is a contemporaneous independent claim). Teachers spread it; by the
1970s it was a fixture of every puzzle magazine.

## This implementation

- **Spec knobs:** `rows`, `cols`, your own `words` or a `theme`, `directions`
  (kids mode restricts to left-to-right and top-to-bottom), `difficulty`,
  `filler` (`matched` or `uniform`), `hidden_message`, `word_list`,
  `list_style` (`full`, the default; `masked`, first and last letters with
  a dash for each letter between, `B – – – N`; or `hidden`, a dash per
  letter, shortest words first — the answer key lists the words in full in
  the same places, and a page with the full list is unchanged by the knob).
  `theme` is `starter` (a fifteen-word space list, the default) or any of
  the sixty-odd themed lists of the shared lexicon: holidays and faith
  (`christmas`, `easter`, `hanukkah`, `diwali`, `eid`, `lunar_new_year`,
  `bible_names`, `virtues`, ...), seasons, decades (`the_60s` to `the_90s`),
  sports, hobbies, animals, nature, places (`us_states`, `world_capitals`,
  `national_parks`) and more. `language` (`en` default; `es`, `fr`, `de`,
  `it`, `pt`, `nl`) picks the list in that language (ten themes each:
  animals, food, colours, family, home, nature, school, body, travel,
  christmas). A theme with no list in the chosen language (the default
  `starter` among them) uses the nearest of those ten instead — `animals`
  for creature themes, `food`, `school`, `travel`, `home`, otherwise
  `nature` — and the metadata names it (`theme`, `requested_theme`);
  before v1.3 that was an error, so a page whose only change from the
  defaults was the language would not generate. `accents`: `fold` (default for theme lists: E for É, N for Ñ,
  AE/OE/UE for German umlauts) or `keep` (accented capitals in the grid);
  unset leaves your own words cleaned as before (A-Z only). `count` (0 =
  all of your words, or for a theme a random selection of about one word
  per thirteen cells).
- **One-word mode:** `mode` (`words`, the default — everything above; or
  `one_word`) and `word` (empty picks one by the seed from a
  family-friendly list per band: Kids three-letter words with two or three
  different letters such as SUN or MOM, Easy four letters, Medium five, Hard
  six, Expert seven or eight; or give your own, cleaned to A–Z). The band
  also sets the grid — Kids 6×6, Easy 8×8, Medium 10×10, Hard 12×12, Expert
  15×15 — unless `rows`/`cols` are changed from 14×14, and the direction
  ladder (or `directions`) sets the way the word runs: Kids reads across or
  down, Expert any of the eight. The grid is filled only with the word's own
  letters, in proportion. A word shorter than three letters, one made of a
  single repeated letter (AAA would appear everywhere) or one too long for
  the grid is refused as an invalid spec. The page says "Find the word WORD
  — it appears exactly once" (`word_list: false` leaves the line off); the
  key draws the line through it. `theme`, `count`, `filler`,
  `hidden_message` and `list_style` do not apply; `word` is ignored in
  `words` mode.
- **Generation:** backtracking placement with controlled overlap density;
  fill letters sampled from the placed words' distribution, or, for a
  list in a language other than English, from that language's letter
  frequencies (with its accented capitals when they are kept); word list
  and answer key rendered from the same placement, so they cannot disagree.
  A theme list is a pool: the words for a page are drawn from it on their
  own seed stream, so pages without a theme are unchanged.
- **Guarantees:** every listed word is findable and its occurrences are
  located by scanning the finished grid (the answer key is drawn from that
  scan, so key and grid cannot disagree); words the filler accidentally
  duplicates are counted and reported as ambiguous_words in the metadata.
- **One-word guarantee:** exactly one occurrence. An occurrence is a
  straight line of cells, in any of the eight directions, that reads the
  word forwards or backwards; each distinct set of cells counts once, so a
  palindrome (NAN, LEVEL) read both ways along the same cells is one, and a
  word that overlaps itself (ABAB inside ABABAB) is two. After placing the
  word and filling the rest from its letters, the generator repairs every
  other occurrence (min-conflicts: one of its free cells takes the letter
  that leaves the fewest spellings through that cell), then scans every
  cell and direction of the finished grid and refuses anything but the one
  placement; tests recount with an independent scan over every pair of
  cells on a line. Meta: `mode: "one_word"`, `word`, `word_source`
  (`list` or `custom`), `unique: true`, `occurrences: 1`, `letters` (how
  many different letters), `answer_reversed`, `rating_basis`
  (`grid_size_word_length_and_directions`). Pages in `words` mode are
  unchanged by the new options.
- **Difficulty:** grid size, direction set, word length distribution and fill
  entropy, banded.
