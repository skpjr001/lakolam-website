---
title: "Dichotomous Key"
blurb: "Dichotomous keys — name invented creatures with a yes/no key, complete a key, or write your own; the key is proven to separate every creature"
category: puzzle
version: "1.0.0"
---
Name the made-up creatures with a yes/no key — or finish the key, or write your own.

## What it is

A science worksheet with four to eight invented creatures, each drawn with
a different mix of features: wings or none, antennae, a curly tail, spots,
a long or round body, two, four or six legs and one, two or three eyes.
Below them is a dichotomous key — a chain of yes/no questions — printed as
numbered couplets or as a branching tree. Depending on the page you use
the key to name each lettered creature, fill in the missing questions and
names in a partly printed key, or write a key of your own. The answer page
fills everything in.

## How to play

A dichotomous key sorts things by asking one yes/no question at a time.

- **Couplets:** each number has two statements, A and B. Exactly one is
  true for your creature. Start at 1, pick the true statement, and follow
  it: "GO TO 4" sends you to couplet 4; a name tells you what the creature
  is.
- **Tree:** start at the top box. Answer the question and follow the YES or
  NO line down to the next box, until you reach a name.
- Start again from the top for every creature, and look closely: count the
  legs and eyes, and check for wings, antennae, a tail and spots.
- **Complete the key:** the creatures are named. For each gap, work out
  which creatures reach that point and what question splits them the way
  the key goes on. Only one question fits each gap.
- **Make your own key:** pick a feature that splits the creatures into two
  groups, then keep splitting each group until every creature is on its
  own. Many keys work — the answer page shows one of them.

## Purpose

Classification keys are part of primary and middle-school science: the
English National Curriculum asks Year 4 pupils to "use classification keys
to help group, identify and name a variety of living things" and Year 6 to
classify by observable characteristics, and US middle-school life science
uses dichotomous keys to teach observation and classification. Invented
creatures keep the focus on careful looking and logical sorting rather
than on knowing real species, and writing a key trains the same yes/no
thinking used in decision trees and in the 20-questions game.

## History

The dichotomous key goes back to the French naturalist Jean-Baptiste
Lamarck, whose *Flore françoise* (1778) let readers identify plants by a
series of paired choices instead of memorising a classification. Keys of
this kind became the standard tool of field guides and floras in the 19th
and 20th centuries, and "make a key to these aliens" exercises have been a
classroom staple for decades.

## This implementation

- **Spec knobs:** `difficulty`; `task` (`identify`, `complete`, `build`);
  `layout` (`auto` — a tree at Kids, couplets otherwise; `couplets`;
  `tree`); `count` (4-8 creatures, clamped, `requested_count`); `width`,
  `height`, `line`.
- **Generation:** creatures are drawn with random features; they must differ
  in what the level's key may ask about. Kids keys ask only about wings,
  antennae, tails and spots, Easy adds body shape, and Medium and above also
  count legs and eyes (the pictures always show legs and eyes). Kids to
  Medium keys split each group as evenly as possible; Hard and Expert make
  near look-alikes (each new creature is a copy of an earlier one with one
  or two features changed) and split unevenly, so keys run deeper; Expert
  favours leg and eye counts. Names are invented from syllables, each
  starting with a different letter. On "complete" pages, one to three
  questions (by level) and two names are blanked.
- **Solving:** the key is built by splitting the group of creatures with a
  question that sends some one way and some the other, until each creature
  is alone.
- **Guarantees:** `key_separates_every_creature` and `answers_checked` —
  every creature is run through the key by its drawn features and must end
  at its own name; each name ends exactly one branch; every question splits
  the creatures that reach it; and all creatures' features differ. A
  question is blanked only when exactly one question, worded either way
  round, splits the creatures reaching it as the key does, so every gap
  has one answer (`unique`; "make your own key" pages have many right
  answers and report `unique: false`). The tests re-walk every key with
  hand-written feature rules, recount each gap's possible answers by brute
  force, and rasterise a creature with each feature switched to prove
  every asked feature is visible in the picture.
