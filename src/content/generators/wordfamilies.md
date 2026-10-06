---
title: "Word Families"
blurb: "Word families — phonics pages: build words from a rime, sort words into family houses, or find the odd one out"
category: word
version: "1.0.0"
---
Phonics pages for early readers: build words from a family's ending, sort
words into family houses, and spot the word that does not belong.

## What it is

A word family is a group of words that end the same way — the same vowel and
the letters after it, called the *rime*: c**at**, h**at**, fl**at**. Each
page shows families as little houses with the rime on the roof. There are
three kinds of page:

- **Build:** letter tiles sit inside each house. Put each letter in front of
  the rime on the roof and write the word it makes.
- **Sort:** a word bank at the top mixes words from three or four families.
  Write each word in its family's house.
- **Odd one out:** each row has four words. Three belong to one family;
  cross out the one that does not.

## How to play

Read the ending on the roof out loud: "-at". On a **build** page, say the
sound of the letter on the tile, then the ending, and blend them together:
"c … at … cat!" Write the word on the line. On a **sort** page, look at the
end of each word in the bank, find the house with that ending on its roof,
and write the word inside; cross words off the bank as you go. On an **odd
one out** page, read all four words in a row, listen for the three that
rhyme and end with the same letters, and cross out the one that is
different.

## Purpose

Word families are one of the first ways children learn to decode: once a
child can read "at", every new letter in front of it makes a new word, so a
handful of patterns unlocks dozens of words. Building, sorting and spotting
the odd one out practise the same pattern from three directions — blending,
reading and listening — for PreK to Grade 2 classrooms and home learning.

## History

Teaching reading through "phonograms" or word families goes back to
nineteenth-century spellers and was popular in American readers by the early
twentieth century. Research on onset and rime in the 1980s and 1990s
(Usha Goswami and Peter Bryant among others) showed that young children
hear rimes before single sounds, and word-family work became a standard part
of phonics teaching; Wylie and Durrell's 1970 list of 37 common rimes, said
to build about 500 primary-grade words, is still quoted on teaching sites.

## This implementation

- **Spec knobs:** `kind` (`build`, `sort`, `oddone`), `difficulty`, `width`,
  `height`, `margin`, `name_line`.
- **Levels:** Kids — short-vowel families (-at, -ig, -op, -ug …) with
  one-letter onsets. Easy — adds blends and digraphs (fl-, sh-, tr-) and
  families such as -ack, -ell, -ill, -ump. Medium — longer and long-vowel
  families (-ake, -ain, -ight, -ow, -ing, -ink …). Hard and Expert are not
  offered (this is an early-reader page) and are served as Medium.
- **Generation:** a hand-written table of 51 families, each a spelling-based
  rime and its everyday member words. Families are drawn per page so that no
  rime ends another (-at and -eat never share a page). Build pages pick
  onsets from a family's members; sort pages pool members into a shuffled
  bank; odd-one-out rows take three members and a distractor from another
  family, preferring one with the same vowel or the same onset as a member.
- **Guarantees:** every word built or shown as a family member is on the
  family table, ends in the rime after a non-empty onset, and is a real word
  of the workspace dictionary's common tier (`Tier::Common`, SCOWL ≤ 35;
  the everyday tier misses phonics staples such as HEN, RUG and HUG, so the
  hand-picked table is the age filter); every bank word fits exactly one
  house on the page; every odd one out does not end in its row's rime, and
  taking out any other word does not leave three words sharing an ending.
  Checked before the page is returned and re-checked in the tests; meta
  carries `answers_checked`, the band and the families used. The answer key
  fills in every word (build, sort) or crosses out each odd word.
