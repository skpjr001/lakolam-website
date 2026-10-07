---
title: "Homophones"
blurb: "Homophones — match the sound-alikes, write the partner, or decide same or different (American pronunciation)"
category: word
version: "1.0.0"
---
Sea or see? Knight or night? Pages of sound-alike words: match the pairs,
write the partner, and tell same-sounding words from near misses.

## What it is

Homophones are words that sound exactly the same but are spelled
differently and mean different things: SEA and SEE, BEAR and BARE, RAIN,
REIGN and REIN. There are three kinds of page:

- **Match:** two columns of words. Draw a line from each word to the word
  that sounds the same.
- **Write:** each word has exactly one sound-alike partner. Write it on the
  line.
- **Same or different:** each row shows two words. Circle SAME if they sound
  exactly the same, DIFFERENT if they do not. The different pairs are near
  misses, spelled just one letter apart (BEAR and BEER, LINE and LONE).

## How to play

Say both words out loud and listen. Homophones sound exactly alike — the
only difference is the spelling (and the meaning). On a **match** page, say
a word on the left, then find the word on the right that sounds the same
and join them with a line. On a **write** page, say the word, think of
another word that sounds the same but is spelled differently, and write it
on the line — thinking of what each word means helps: "sun" in the sky,
"son" in a family. On a **same or different** page, say both words slowly;
if every sound is the same, circle SAME, and if even one sound changes,
circle DIFFERENT. Be careful: words that look alike can sound different,
and words that look different can sound the same.

## Purpose

Homophones are among the most common spelling mistakes at every age
(there, their; your, you're), and knowing them is part of the spelling
curriculum in both the United States and England, where the national
curriculum lists homophones to learn in Year 2 and Years 3–4 (here and
hear, knight and night, brake and break, peace and piece). Matching and
writing them builds the link between a word's spelling and its meaning;
the same-or-different pages train careful listening, which also helps
English learners.

## History

English has so many homophones because its spelling kept older and
borrowed spellings while the pronunciation moved on: the K in KNIGHT and
the GH in NIGHT were once said aloud, and pairs like REIGN (from French)
and RAIN (from Old English) met in sound but not in spelling. Spelling
books have listed "words alike in sound but different in spelling and
signification" since at least the eighteenth century, and homophone
match-ups and sound-alike exercises remain a standard of primary spelling
lessons.

## This implementation

- **Spec knobs:** `kind` (`match`, `write`, `same`), `difficulty`,
  `width`, `height`, `margin`, `name_line`.
- **Levels:** a hand-written table of about 150 family-friendly homophone
  sets in three levels — early grades (SEA/SEE, SON/SUN, KNIGHT/NIGHT),
  middle grades (BRAKE/BREAK, SCENE/SEEN, PEACE/PIECE), harder vocabulary
  (PRINCIPAL/PRINCIPLE, CEREAL/SERIAL, COLONEL/KERNEL). Kids uses the
  first level with shorter pages; Easy the first two; Medium the second;
  Hard the second and third. Expert is served as Hard. Meta records the
  band served, the band asked for and the levels used.
- **Pronunciation:** American English, from the Carnegie Mellon Pronouncing
  Dictionary (CMUdict, BSD licence).
- **Generation:** match pages draw one pair from each of several sets;
  write pages use only pairs whose partner is the one possible sound-alike;
  same-or-different pages are half sound-alike pairs and half near misses —
  an everyday word one letter away from a table word (a change, an extra or
  a missing letter), preferring one with the same first letter so the
  spelling tempts.
- **Guarantees:** under an honesty rule. Words are a sound-alike pair only
  if every CMUdict pronunciation of both is identical (stress aside), so
  pairs that depend on the speaker — FOR and FOUR (FOR is often said "fer"),
  ONE and WON, TO and TOO — are left out. A pair is "different" only if no
  pronunciations match even after folding the common American accent
  mergers (cot–caught, Mary–marry–merry, pin–pen, weak vowels, T-flapping),
  so PIN and PEN or METAL and MEDAL are never called different. On a match
  page every left word sounds like exactly one right word; every write
  prompt has exactly one sound-alike among the dictionary's 32,000 common
  words, even allowing for the mergers; every same-or-different answer is
  right. Checked before the page is returned and re-checked in the tests
  from the raw phones; meta carries `answers_checked`.
- **Limits:** British English has homophones American English does not
  (FORT and FOUGHT, SORT and SOUGHT) and the reverse; the pages follow
  American pronunciation. Words with apostrophes (THEY'RE, WHO'S) are not
  in the dictionary and do not appear.
