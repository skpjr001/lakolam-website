---
title: "Where Is It? Position Words"
blurb: "Position words — pictures on shelves; circle what is above, below, next to, between, left or right of a named picture"
category: puzzle
version: "1.0.0"
---
Pictures on a set of shelves. What is above the cat? What is between the cup
and the bell?

## What it is

A page for learning the words that say where things are: above, below, next
to, between, left and right. Each scene is a set of shelves with one picture
in every cubby — an apple, a bell, a rabbit. Beside it are questions, each
with a few small pictures to choose from. Easy pages have two short shelves
and ask only "above" and "below"; harder pages have more shelves and add
"next to", "between", "left" and "right", and on the hardest pages
two-step questions such as "What is above the thing next to the clock?"

## How to play

- Read the question (a grown-up can read it aloud).
- Find the picture it names on the shelves and put your finger on it.
- Look **above** (on the shelf just over it), **below** (on the shelf just
  under it), **next to** it (beside it on the same shelf), or to its
  **left** or **right**. Left and right are your own left and right as you
  look at the page.
- For **between**, find both pictures: the answer sits in the middle.
- For a two-step question, do the second part first: find "the thing next
  to the clock", then look above that.
- Circle the matching picture under the question.

## Purpose

Position words are part of early maths and language: children use them to
describe where things are, follow directions and, later, read maps, graphs
and diagrams. Naming positions on a shelf trains the vertical words first
(above, below), then the side words, which come later because left and
right are the hardest to tell apart. Two-step questions add working memory.
The page suits ages three to seven and matches kindergarten goals such as
describing the relative positions of objects (Common Core K.G.1) and the
"positional language" of early-years curricula.

## History

Teaching position words with pictures and real objects is a long-standing
part of early-childhood education, from Froebel's kindergarten gifts in the
nineteenth century to the "prepositions" picture cards of modern
classrooms. Worksheets of "above / below / beside / between" scenes have
been a staple of pre-school workbooks for decades; early-years curricula
name the skill "positional language".

## This implementation

- **Spec knobs:** `difficulty` (Kids: two shelves of three, above and below;
  Easy: three by three, adds next to and between; Medium: adds left and
  right; Hard: three shelves of four, adds two-step questions; Expert: four
  shelves of four, two two-step questions per scene), `scenes` (1-3),
  `questions` per scene (2-5), `choices` per question (2-4), `colour`,
  `width`, `height`.
- **Generation:** each scene fills every cubby with a different picture (no
  plain shapes), each clearly different from the others on pixels. Every
  scene asks the level's hardest kind of question at least once; the rest
  cycle through the level's kinds. A question is drawn at random and kept
  only if it checks out (below); wrong choices are drawn from the pictures
  that fail every reading, and the right answer's position among the
  choices is spread evenly. If the requested number of choices cannot be
  filled for a question after many tries, it gets fewer (never fewer than
  two).
- **Solving:** find the named picture and look the way the word says.
- **Guarantees:** `answers_checked: true`, `unique: true`. Position words
  can be read loosely, so each is checked under three readings: the
  neighbouring cubby only; anywhere further that way along the same shelf
  or column; and anywhere further that way on the whole page ("next to"
  then including the diagonal neighbours, "between" anywhere in the band
  between the two). In the whole scene, the strict reading picks out
  exactly one picture, the answer; among the choices, every reading picks
  out that same picture and no other. Two-step questions combine the
  readings step by step, never go back to where they started, and never
  offer the in-between picture as a wrong choice. Tests re-derive every
  answer from the printed positions of the pictures. The page is rated by
  its hardest idea — above/below, then next to and between, then left and
  right, then two steps — and by the size of the shelves
  (`rating_basis: hardest_position_idea_and_shelf_size`).
