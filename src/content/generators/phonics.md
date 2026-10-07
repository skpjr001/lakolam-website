---
title: "Phonics Patterns"
blurb: "Phonics patterns — digraphs, blends, magic e, vowel teams and bossy R: choose the chunk, sort and circle, every sound checked (American pronunciation)"
category: word
version: "1.0.0"
---
Spelling-pattern pages for early readers — digraphs, blends, magic e, vowel
teams and bossy R — where every word really makes the sound its letters
promise.

## What it is

Phonics teaches the letter patterns that spell English sounds. Each page
practises one family of patterns:

- **Digraphs:** two letters, one sound — SH, CH, TH, WH, PH, CK, NG.
- **Beginning blends:** two consonants at the start whose sounds you can
  still hear — BL, CR, ST, SW and more.
- **Ending blends:** the same at the end — ND, NK, MP, NT, FT, SK, ST, LK.
- **Magic e:** a silent E at the end makes the vowel say its name — CAP
  becomes CAPE, KIT becomes KITE.
- **Vowel teams:** two letters, one long vowel sound — AI, AY, EE, EA, OA,
  OW, IE, IGH, UE, EW, OO.
- **Bossy R:** an R after a vowel changes its sound — AR, OR, ER, IR, UR.

and comes in three kinds:

- **Fill:** each word has a box where some letters are missing. Circle the
  letters that make a word and write them in the box (only one choice
  works). On magic-e pages, add the E and write the new word.
- **Sort:** a word bank and a house for each pattern. Write every word in
  its house.
- **Circle:** each row starts with a pattern in a yellow box. Circle the one
  word in the row that has it.

## How to play

Read the letters on the page and say the sound they make together: SH says
"shh", AI says "ay", AR says "ar". On a **fill** page, try each choice in
the box, say the word it makes, and circle the one that is a real word;
write its letters in the box and read the whole word. On a magic-e page,
read the short word first (CAP), then add an E to the end and read the new
word — the vowel now says its name (CAPE). On a **sort** page, read each
word in the bank, find the pattern in it, and write it in the house with
that pattern on its roof; cross words off the bank as you go. On a
**circle** page, read the pattern in the yellow box, then look along the
row for the one word that has those letters, and circle it. Read every word
out loud — the pattern is in the spelling, and you should hear its sound
too.

## Purpose

These patterns are the core of first- and second-grade phonics: Common
Core RF.1.3a asks children to know "the spelling-sound correspondences for
common consonant digraphs", and RF.1.3c "final -e and common vowel team
conventions for representing long vowel sounds"; England's phonics
programmes teach the same patterns. Filling in, sorting and spotting a
pattern practise it from three directions — spelling, reading and
recognising — and the harder levels move from four-letter words to longer
ones.

## History

Teaching reading by letter-sound patterns goes back to the "blue-backed
speller" of Noah Webster (1783) and the phonic methods of the nineteenth
century. The terms used today — digraph, blend, the "magic" or "silent" e,
vowel teams and "bossy R" for r-controlled vowels — come from twentieth
century phonics programmes, and systematic phonics was confirmed as the
most effective way to start reading by the United States National Reading
Panel (2000) and England's Rose Review (2006).

## This implementation

- **Spec knobs:** `pattern` (`digraphs`, `blends`, `end_blends`,
  `silent_e`, `vowel_teams`, `r_controlled`), `kind` (`fill`, `sort`,
  `circle`), `difficulty`, `width`, `height`, `margin`, `name_line`.
- **Levels:** Kids — words of up to four letters, two choices or two
  houses, three words in a circle row. Easy — up to five letters, three
  choices or houses. Medium — up to six letters, three choices; on magic-e
  circle rows the short word sits beside its magic-e partner (CAP and
  CAPE). Hard — any length (MUSHROOM, PAMPHLET), four choices or houses.
  Expert is served as Hard. Meta records the band served and the band
  asked for.
- **Generation:** hand-written tables of about 700 everyday words in 50
  chunks, plus 38 magic-e pairs. Fill rows rotate through the family's
  chunks; the wrong choices are other chunks of the family that make no
  word in the 114,000-word dictionary. Sort pages pick chunks that do not
  contain one another; circle rows draw the wrong words from the family's
  other chunks.
- **Pronunciation:** American English, from the Carnegie Mellon Pronouncing
  Dictionary (CMUdict, BSD licence).
- **Guarantees:** every word shows its pattern in its spelling (once, at
  the right place — at the start for beginning blends) **and** in its
  sound, in every CMUdict pronunciation: a CH word has the CH sound (CHEF
  and CHORUS are rejected), a TH word has TH or the voiced TH, a PH word an
  F, a beginning blend both consonant sounds in order, an EA word long E
  (BREAD is rejected), OW and OO only as in SNOW and MOON, AR as in CAR, OR
  as in CORN, ER/IR/UR as in HER. A magic-e pair changes only the vowel,
  from short to long, in every pronunciation (HUG/HUGE, where the G
  changes, and FIN/FINE, which has a second pronunciation, are rejected).
  Every fill row has exactly one choice that makes a word in the large
  dictionary; every sorted word fits exactly one house; every circle row
  has exactly one word with the pattern, and the others have neither its
  letters nor its sound. Checked before the page is returned and re-checked
  in the tests from the raw phones and the dictionary; meta carries
  `answers_checked`.
- **Limits:** the sorts are spelling sorts — ER, IR and UR sound the same,
  and the page asks which letters a word has, not how it sounds. OW as in
  COW and OO as in BOOK (other sounds of the same teams) are left out of
  the vowel-team tables.
