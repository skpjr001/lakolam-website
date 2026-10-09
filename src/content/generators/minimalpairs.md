---
title: "Minimal Pairs"
blurb: "Minimal pairs — listen-and-circle, sort and odd-sound-out sheets for ESL and speech practice, every pair one sound apart (American pronunciation)"
category: word
version: "1.1.0"
---
Ship or sheep? Light or right? Listening, sorting and odd-one-out sheets for words one sound apart.

## What it is

Practice sheets built on minimal pairs — two words that differ in just
one sound, such as SHIP and SHEEP, RED and WED, THINK and SINK. Each sheet
practises one contrast (or a mix): short I against long E, L against R,
TH against S, and the sound swaps speech therapists work on, such as K
for T (fronting), T for S (stopping) and W for R (gliding). Pronunciations
are American.

## How to play

**Listen and circle:** the teacher or parent reads one word from each row
aloud — the answer page says which — and the child circles the word they
hear. **Sort by sound:** say each word in the word bank and write it
under the sound it has. **Odd sound out:** say the four words in each
row; three share a sound and one has the other sound — circle the odd one.
Saying the words aloud, and watching the mouth in a mirror, helps.

## Purpose

Minimal pairs are the standard tool for teaching the sounds a learner
mixes up. English learners whose first language does not separate L and
R, or I and EE, hear and practise the difference in otherwise identical
words; speech therapists use the same pairs to show a child that
swapping one sound changes the word. Listening comes first, then sorting
and saying.

## History

The minimal pair is a founding idea of twentieth-century phonology: two
sounds are distinct in a language exactly when swapping them can change
one word into another. Language teachers took up minimal-pair drills in
the 1940s and 1950s, and speech-language pathologists built the
"minimal pair approach" to phonological disorders on them from the
1970s.

## This implementation

- **Spec knobs:** `difficulty`; `contrast` (`ship_sheep`, `bat_bet`,
  `cut_cot`, `b_v`, `p_b`, `f_v`, `l_r`, `th_s`, `s_sh`, `ch_sh`, `k_t`,
  `s_t`, `r_w`, `mixed` — a different contrast on each row; a sort page
  with `mixed` picks one contrast and reports `requested_contrast`);
  `task` (`listen`, `sort`, `odd`); `rows` (4–20; 0 = the level's count;
  out-of-range values are clamped, and a contrast with too few pairs
  prints what it has — both reported as `requested_rows`); `name_line`;
  `width` (360–3000 pt), `height` (480–3000 pt), `margin` (0–20% of the
  shorter side).
- **Levels:** Kids — everyday words of 2–4 sounds, 8 rows; Easy —
  everyday words up to 5 sounds, 10 rows; Medium — common words up to 6
  sounds, 12 rows; Hard — common words up to 9 sounds, 14 rows; Expert —
  common words of 4 or more sounds, 16 rows. The level is the word tier,
  the word length in sounds and the row count (`rating_basis`).
- **Generation:** pairs come from Lakolam's American pronunciation data
  (a subset of the Carnegie Mellon Pronouncing Dictionary): for every
  word, each of its contrast sounds is swapped for the other and the
  result looked up among the level's family-friendly words. Rows are
  drawn at random with no word repeated; listen pages choose the word to
  read at random.
- **Checks — the honesty rule:** a pair is used only when every
  pronunciation the dictionary lists for each word is one and the same,
  the two words have the same number of sounds, exactly one sound differs,
  that sound is the contrast (with the same stress), and no common
  American accent merger (cot–caught, pin–pen, Mary–merry and others)
  could make the two words sound alike. Sort and odd-one-out words hold
  exactly one of the two contrast sounds, once.
- **Guarantees:** deterministic per seed; every pair differs in exactly
  the stated sound and every answer is right (`answers_checked`,
  `every_pair_minimal`). The tests re-check every pair from the raw
  ARPAbet strings of every pronunciation variant.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
