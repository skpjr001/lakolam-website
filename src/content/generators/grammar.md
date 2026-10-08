---
title: "Grammar Choices"
blurb: "Grammar choices — circle the word that fits: subject-verb agreement, a or an by sound, pronouns, past/present/future and comparatives"
category: word
version: "1.0.0"
---
Circle the word that makes the sentence right: is or are, a or an, he or
him, went or goes, bigger or biggest.

## What it is

A grammar page of short sentences, each with a choice in brackets — "The
dogs (run / runs) to the park every day." The reader circles the word that
fits. Five kinds of choice, on their own page or mixed together:

- **Subject and verb** — the verb agrees with who or what the sentence is
  about: is or are, runs or run, has or have, was or were, doesn't or
  don't, including "Sam and Mia", "one of the dogs", "each of the girls"
  and "everyone";
- **a or an** — chosen by the first *sound* of the next word, not its first
  letter: an hour, an honest answer, a unicorn, a one-way street;
- **Pronouns** — he or him, we or us, myself or yourself, and "Sam and I"
  or "Sam and me";
- **Past, present or future** — a time phrase such as "Yesterday", "Every
  day" or "Tomorrow" decides the verb, regular (walked) or irregular
  (went);
- **Comparing words** — "than" asks for bigger or more beautiful, "the ...
  of all" for biggest or most beautiful, and good, better, best.

## How to play

- Read the whole sentence first, then read it again with each word in the
  brackets.
- Circle the one word that makes the sentence correct.
- For **a or an**, say the next word out loud: use "an" when it starts with
  a vowel sound (an hour, an egg) and "a" when it starts with a consonant
  sound (a unicorn, a cat).
- For **subject and verb**, find who or what the sentence is about: one
  person or thing takes "is", "has" or "runs"; two or more take "are",
  "have" or "run". "Each", "every", "everyone" and "nobody" count as one.
- For **pronouns**, use I, he, she, we and they before the verb, and me,
  him, her, us and them after it. Try the sentence without the other
  person: "Sam and (I / me) went" — "I went", so "I".
- For **tense**, look for the time words: yesterday and last week mean the
  past, every day means now, tomorrow and next week mean the future.
- For **comparing words**, "than" compares two things (bigger), and "the
  ... of all" picks the most of a group (biggest).

## Purpose

These are the grammar points children are taught and tested on in the
early school years: subject–verb agreement and verb tenses (Common Core
L.1.1 to L.3.1), articles, pronouns and comparatives (UK Key Stage 1 and 2
grammar, and the Indian CBSE class 2 to 4 grammar books). Choosing between
two close forms, rather than writing from nothing, trains the ear for what
sounds right and makes the rule visible: the same sentence with the wrong
word in it is the clearest example of why the rule exists.

## History

"Choose the correct word" exercises appear in the earliest school grammars
— Lindley Murray's English Grammar of 1795, used for half a century on both
sides of the Atlantic, set pupils to correct "false syntax" sentence by
sentence. The circle-the-right-word format became the standard worksheet
of twentieth-century workbooks and is used today in national tests such as
the UK Key Stage 2 grammar, punctuation and spelling paper. The a/an rule
by sound, not spelling, has been in grammar books since the eighteenth
century, but children still meet it most often as "an before a vowel" —
which is why the tricky words (hour, unicorn) need practice.

## This implementation

- **Spec knobs:** `difficulty` (Kids: is/are with one or many, a/an before
  a plain noun; Easy: runs/run, a/an before a describing word, he/him,
  -er/-est, regular past/present/future; Medium: two subjects joined by
  "and", was/were, has/have, a/an by sound, reflexive pronouns, more/most,
  irregular past; Hard: doesn't/don't, "one of the...", "the box of...",
  "Sam and I / me", three forms to compare and good/better/best; Expert:
  each, every, everyone, nobody), `task` (`mixed`, `agreement`,
  `articles`, `pronouns`, `tense`, `comparatives`), `count` (4-14
  sentences, 0 for 10), `name_line`, `width`, `height`, `margin`.
- **Generation:** sentence frames written for Lakolam are filled from
  curated lists (names, animals, people, things, verbs with their forms,
  describing words with their comparatives — clever, quiet and narrow,
  which take either form, are left out). Half the sentences or more are at
  the requested band, the rest from easier ones; a frame already on the
  page is used again only when nothing new turns up. Each kind of choice
  reaches only its own bands (a/an: Kids to Medium; tense: Easy and Medium;
  pronouns and comparing words: Easy to Hard; agreement: Kids to Expert);
  another band is served as the nearest one and reported.
- **Solving:** the key circles the right word in each sentence.
- **Guarantees:** every choice carries the feature it expresses (one or
  many, subject or object, past, present or future, comparing two or the
  most, vowel or consonant sound), the sentence fixes the feature the gap
  needs, and exactly one choice has it (`answers_checked`). a/an is asked
  only of words whose every pronunciation in the Carnegie Mellon
  Pronouncing Dictionary agrees on the first sound (American English) —
  "herb", silent h in America and sounded in Britain, is never asked. Tests
  re-derive every answer independently: subject number from the words,
  verb and comparative forms from the spelling rules (doubling, y to i,
  dropping e), a/an from the spelling rule plus its listed exceptions. The
  page is rated by its hardest grammar point (`rating_basis`).
