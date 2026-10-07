---
title: "Rhyme Time"
blurb: "Rhyme time — match, circle, sort and odd-one-out rhyming pages judged by sound (American pronunciation), with spelling traps"
category: word
version: "1.0.0"
---
Rhyming pages that listen to the sound, not the spelling: match the
rhymes, circle the rhyme, sort words into rhyme houses, find the word that
does not rhyme, or write a rhyme of your own.

## What it is

Two words rhyme when they end with the same sound from their last strong
vowel on: c**at** and h**at**, b**ear** and h**air**, b**unny** and
h**oney**. Every page is about hearing that sound. There are five kinds of
page:

- **Match:** two columns of words. Draw a line from each word to the word
  that rhymes with it.
- **Circle:** each row starts with a word in a yellow box. Circle the one
  choice that rhymes with it.
- **Odd one out:** each row has four words. Three of them rhyme; cross out
  the one that does not.
- **Sort:** a word bank and three or four houses, each with a word on its
  roof. Write every bank word in the house of the word it rhymes with.
- **Write:** write a word that rhymes with each word. Any rhyme is right;
  the answer key gives a few examples.

The easiest pages use short words whose rhymes are also spelled alike. The
harder ones set spelling traps: SNOW and COW look alike but do not rhyme,
while BEAR and HAIR are spelled differently but do.

## How to play

Say each word out loud — rhyming is about how words sound, so always listen
rather than look. Two words rhyme if they sound the same at the end, from
the last vowel sound on: cat, hat and flat all end in "-at". On a **match**
page, say a word from the left column, then say the words on the right
until you hear one that rhymes, and join them with a line. On a **circle**
page, say the word in the yellow box, then each choice, and circle the one
that rhymes. On an **odd one out** page, read the four words in a row; three
of them rhyme, so cross out the one that sounds different at the end. On a
**sort** page, say each word in the bank, find the house whose roof word
rhymes with it, and write it inside; cross words off the bank as you go. On
a **write** page, think of any word that rhymes and write it on the line.
Watch out for the tricky ones: words that end with the same letters do not
always rhyme, and words that rhyme are not always spelled the same way.

## Purpose

Hearing and making rhymes is one of the first steps in phonological
awareness — noticing the sounds inside words — and a strong predictor of
early reading. It is a kindergarten standard in the United States (Common
Core RF.K.2a, "recognize and produce rhyming words") and part of the early
years phonics work in UK classrooms. The spelling-trap levels carry the same
skill up into spelling: children learn that the same sound can be spelled
in different ways and the same letters can make different sounds. The
two-syllable level suits older readers, poets and songwriters in training.

## History

Rhyme is as old as poetry: nursery rhymes, skipping songs and riddles have
taught children to hear rhyme for centuries, and Mother Goose collections
have been printed since the 1700s. In the 1980s psychologists Lynette
Bradley and Peter Bryant showed that young children's skill at spotting
rhymes and the odd one out predicted how well they later learned to read,
and that practising it helped; their "odd one out" listening task became a
classroom staple. Rhyme sorts, match-ups and odd-one-out rows are now among
the most common early literacy worksheets.

## This implementation

- **Spec knobs:** `kind` (`match`, `circle`, `oddone`, `sort`, `write`),
  `difficulty`, `width`, `height`, `margin`, `name_line`.
- **Levels:** Kids — short everyday one-syllable words (up to four letters)
  whose rhymes are spelled alike, and no look-alike non-rhymes. Easy — more
  everyday one-syllable words; rhymes may be spelled differently. Medium —
  spelling traps: rhymes spelled differently (EIGHT and PLATE, WORD and
  BIRD) and look-alikes that do not rhyme (WORD and CORD, COW and SNOW)
  are put side by side on purpose. Hard — two-syllable words (BUNNY,
  HONEY, MONEY; TICKLE, NICKEL) with the same traps. Expert is served as
  Hard. Meta records the band served (`difficulty`), the band asked for
  (`requested_difficulty`) and how many spelling traps the page sets.
- **Pronunciation:** American English, from the Carnegie Mellon Pronouncing
  Dictionary (CMUdict, BSD licence). Two words rhyme when the sounds from
  the last stressed vowel to the end are the same.
- **Generation:** the words come from three hand-picked lists (about 480
  everyday one-syllable words, 140 more for the trap level, 140
  two-syllable words), grouped into rhyme classes by sound. Pairs, rows and
  houses are drawn from different classes; wrong choices are picked to be
  tempting — on trap levels, words spelled like the target; otherwise words
  sharing its first letter or vowel letter. A word never appears twice on a
  page, and a rhyming pair is never a word and its own ending (AT and CAT)
  or two words that sound exactly the same.
- **Guarantees:** under an honesty rule. A word is used only if all of its
  CMUdict pronunciations agree on its rhyme (READ, with two vowels, is never
  used). A pair shown as rhyming rhymes in every pronunciation of both
  words. A pair shown as not rhyming rhymes in none — even after folding the
  common American accent mergers (cot–caught, Mary–marry–merry, pin–pen,
  horse–hoarse, weak vowels, T-flapping), so a pair like DOG and FROG,
  which rhymes for some Americans and not for others, is never used either
  way. On a match page every left word rhymes with exactly one right word;
  in a circle row exactly one choice rhymes; in an odd-one-out row the three
  rhyme with each other and the odd word rhymes with none of them; on a
  sort page every bank word rhymes with exactly one roof word. Checked
  before the page is returned and re-checked in the tests from the raw
  phones; meta carries `answers_checked`.
- **Limits:** British and other accents differ in places (non-rhotic
  speakers rhyme FARMER with LLAMA, for instance); the pages follow
  American pronunciation and say so in the meta (`pronunciation`).
