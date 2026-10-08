---
title: "Alphabet Pages"
blurb: "Alphabet pages — match capitals to small letters, circle the match among look-alikes (b d p q), missing letters, before and after, letter hunts"
category: puzzle
version: "1.0.0"
---
Big letters and small letters: match them, find them, fill the gaps.

## What it is

A letter-recognition worksheet for the years when children are learning to
know every letter on sight, in both its capital and its small form. A page
holds one task or a sampler of four:

- **Match** - draw a line from each capital to its small letter.
- **Circle** - circle the small letter that matches the capital in the box
  (or the capital that matches a small letter).
- **Missing letters** - write the letters missing from a stretch of the
  alphabet.
- **Before, after, between** - write the letter that comes just before,
  just after or in between.
- **Letter hunt** - colour every copy of one letter in a grid, then count
  them.

Small letters are real small letters, with tall stems and tails, so b, d,
p and q really are mirror images and turns of one another, the way children
meet them in books.

## How to play

Say each letter's name out loud as you work.

- **Match:** start at the top of the left column. Find the same letter in
  the other column and draw a line between the two dots. Every letter has
  exactly one partner, and it is never straight across.
- **Circle:** look at the letter in the grey box. Exactly one letter in its
  row is the same letter in the other size - circle it. Watch out for
  letters that are flipped or turned, like b and d.
- **Missing letters:** sing or say the alphabet from the first letter you
  see. Write each missing letter in its empty box.
- **Before, after, between:** the grey boxes show the letters you know.
  Write the letter that belongs in each empty box, in alphabet order from
  left to right.
- **Letter hunt:** colour every box that holds the letter shown at the top
  (both its capital and its small form when both are asked for). Count the
  coloured boxes and write the number in the box at the bottom.

## Purpose

Naming and matching all capital and small letters is one of the first
reading goals in school (in the US Common Core it is standard RF.K.1d).
Matching trains the link between the two forms; circling among look-alikes
trains careful looking at direction and detail, the root of b/d mix-ups;
missing letters and before/after build alphabet order, needed later for
dictionaries and indexes; the hunt adds scanning and counting. Pages suit
ages three to six.

## History

Alphabet books have taught letters since the hornbooks and primers of the
sixteenth and seventeenth centuries, and capital-and-small letter pairing
was a fixture of nineteenth-century readers. Letter-matching, letter-hunt
and "what comes next" alphabet pages became staples of reading-readiness
workbooks in the twentieth century and remain among the most printed
kindergarten worksheets.

## This implementation

- **Spec knobs:** `task` (`mixed` - match, circle, missing letters and a
  hunt on one page - or `match`, `circle`, `missing`, `neighbours`,
  `hunt`), `difficulty`, `case` (`small`: runs and hunts in small letters,
  capitals prompt the match and circle; `capital`: the reverse; `both`:
  runs alternate, circle rows alternate direction, and the hunt mixes both
  forms), `letter` (a letter of the week: the hunt looks for it and every
  other section includes it; text with no A-Z letter is ignored and
  reported as `requested_letter`), `items` (3-12 per section: pairs, rows,
  runs, steps or hidden letters; 0 uses the level's own; clamps reported as
  `requested_items`, and a hunt that can hide fewer - at most a third of
  its grid - as `requested_hidden`), `name_line`, `width`, `height`
  (clamped, reported as `requested_width`/`requested_height`).
- **Generation:** each section is built for the requested band and rated
  from what it shows. Match letters are drawn from those whose small form
  is the capital made smaller (c k o p s u v w x z) and those that change
  shape; the right column is a random derangement. Circle rows take a
  partner, a set number of its look-alikes and other letters. Runs pick a
  stretch of the alphabet and hide letters in it. Hunt grids hide the exact
  number of targets among fillers, a set share of them look-alikes, and are
  reshuffled until no row or column spells a word the family-friendly
  filter blocks.
- **Solving:** every answer is fixed by the alphabet: a partner is the same
  letter in the other case; a missing letter is the one alphabet order puts
  there; a hunt's answer is the count of target boxes.
- **Difficulty:** Kids - shape-keeping letters, three choices, one gap,
  "after" steps, a 5x5 hunt with no look-alikes. Easy - some letters
  change shape, four choices, two gaps, "before" steps, a 6x6 hunt. Medium
  - half change shape, one look-alike among the choices, three gaps,
  `_ M _`, under a quarter of hunt fillers look-alikes. Hard - all change
  shape (no small look-alike pair), two look-alikes, four gaps, two letters
  between, a quarter to a half look-alikes. Expert - look-alike pairs in
  the match column, three or more look-alikes among five choices, five
  gaps, two letters before, a hunt mostly of look-alikes. The page takes
  its hardest section's band (`rating_basis`). With the level's own counts
  every band is reached by every task and case; a request it cannot meet
  (twelve shape-keeping letters do not exist, a letter of the week with no
  look-alikes) is served as the nearest band and reported as
  `requested_difficulty`.
- **Guarantees** (`answers_checked: true`, re-checked independently in
  tests): matching columns are a permutation with one partner per letter
  and none level with its partner; each circle row has exactly one choice
  of the prompt's letter and its choices are different letters of one
  case; runs are consecutive letters, so exactly one alphabet window fits
  the shown letters; the hunt count is exact and every filler is a
  different letter. The 52 glyphs are 52 different pictures (raster
  similarity below 0.95 for every pair), and every same-case pair that is
  close on pixels (0.78 or more, such as a and o) is a listed look-alike,
  so ratings miss no near-twin.
