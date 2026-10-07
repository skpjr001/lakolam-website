---
title: "Syllables"
blurb: "Syllables — clap, count, sort and odd-one-out pages by number of syllables (American pronunciation)"
category: word
version: "1.0.0"
---
Clap it, count it, sort it: syllable pages for early readers, with every
count checked against how the word is really said.

## What it is

A syllable is a beat in a word — a part with one vowel sound. CAT has one,
TI-GER has two, BUT-TER-FLY has three. Each page asks children to hear the
beats in everyday words. There are four kinds of page:

- **Clap:** each word has a row of circles. Say the word, clap the parts,
  and colour one circle for each clap.
- **Count:** say and clap each word, then write how many syllables it has
  in the box.
- **Sort:** a word bank and a house for each number of claps. Write every
  word in the house for its number of syllables.
- **Odd one out:** each row has four words. Three have the same number of
  syllables; cross out the one that is different.

## How to play

Say the word out loud, slowly, and clap once for each part you hear:
"but – ter – fly" is three claps. Another way to feel the beats is to put
your hand under your chin: your chin drops once for every syllable. On a
**clap** page, colour one circle for each clap, starting from the left. On
a **count** page, write the number of claps in the box. On a **sort** page,
clap each word in the bank and write it in the house with that number of
claps on its roof; cross words off the bank as you go. On an **odd one
out** page, clap all four words in a row — three have the same number of
claps, so cross out the one that does not. Listen to the word rather than
looking at it: long words can have few syllables, and short words can have
more than you think.

## Purpose

Hearing syllables is an early step in phonological awareness — noticing
the sound parts of spoken words — and it helps children read and spell
longer words one chunk at a time. It is a kindergarten standard in the
United States (Common Core RF.K.2b, "count, pronounce, blend, and segment
syllables in spoken words") and part of decoding two-syllable words in
first grade (RF.1.3d). The harder levels, with four- and five-syllable
words, suit older children working on spelling and pronunciation, and
English learners.

## History

Clapping out the beats of words and names is a traditional classroom and
playground game, older than any reading scheme, and it is close kin to
the rhythm of nursery rhymes and songs. Research on phonological awareness
from the 1970s on (Isabelle Liberman and colleagues showed in 1974 that
young children could count syllables well before they could count single
sounds) made syllable counting a standard first step in early reading
programmes, and syllable sorts are now among the most common phonics
worksheets.

## This implementation

- **Spec knobs:** `kind` (`clap`, `count`, `sort`, `oddone`),
  `difficulty`, `width`, `height`, `margin`, `name_line`.
- **Levels:** Kids — one- and two-syllable words. Easy — one to three.
  Medium — one to four. Hard — two to five. Expert is served as Hard. Meta
  records the band served (`difficulty`), the band asked for
  (`requested_difficulty`) and the range of counts used (`syllables`).
- **Pronunciation:** American English, from the Carnegie Mellon Pronouncing
  Dictionary (CMUdict, BSD licence). A word's syllable count is the number
  of vowel sounds in its pronunciation.
- **Generation:** a hand-picked list of about 300 everyday, family-friendly
  words (animals, foods, things at home and school, and some longer words
  for the hard level). The counts come from the pronunciation data, never
  from the list. Clap and count pages draw words round-robin over the
  band's counts, so every count appears on every page; sort pages give each
  count its own house; odd-one-out rows pick three words of one count and
  an odd word of another count close to them in length, so the number of
  letters gives nothing away.
- **Guarantees:** under an honesty rule. A word is used only if every
  CMUdict pronunciation gives it the same count, and never if the count
  depends on the speaker: two vowels that many people run together (FIRE,
  HOUR, FLOWER, DIAL, PIANO) or words often said with a vowel dropped
  (FAMILY, CAMERA, CHOCOLATE, EVERY). Every count on the key is that agreed
  count; every sorted word fits exactly one house; in every odd-one-out row
  the three words agree and the odd word differs. Checked before the page
  is returned and re-checked in the tests by recounting the vowel sounds
  of every pronunciation; meta carries `answers_checked`.
- **Limits:** counts follow American pronunciation; a few words are said
  with a different number of beats elsewhere, and the honesty rule leaves
  out the common ones rather than guess.
