---
title: "Beginning Sounds"
blurb: "Beginning, middle and ending sounds — circle, write, sort or colour pictures by sound, checked against pronunciation, not spelling"
category: puzzle
version: "1.0.0"
---
Say the picture's name and listen: which letter makes the first sound, the last sound, or the one in the middle?

## What it is

A phonics page of pictures for young readers. Each picture asks for one of
its sounds — the beginning sound, the ending sound, or the short vowel in
the middle of a little word — and the child finds the letter that makes it.
There are four kinds of page: circle the right letter beside each picture;
write the letter in a box; cut the pictures out and sort them under two to
four letters; or colour every picture that has the "letter of the week"
sound. A row of three small boxes under a picture shows which sound to
listen for: the shaded (or bold) box is the beginning, the middle or the
end. Middle-sound pictures show their word with the vowel left out.

## How to play

Say the name of each picture out loud, slowly. Stretch it out: "sss-uuu-nnn".

- **Look at the little boxes** under the picture. If the first box is
  shaded, listen to the very first sound. If the last box is shaded, listen
  to the very last sound. If the word is written with a gap, say the word
  and listen for the sound in the middle.
- **Circle:** circle the letter that makes that sound.
- **Write:** write the letter in the bold box.
- **Sort:** cut out the pictures along the dashed lines. Glue each one under
  the letter that makes its sound.
- **Colour:** colour every picture that has the sound of the big letter at
  the top. Leave the others white.

Listen for the sound, not just the spelling: a word you know may start with
a letter you do not hear. Only one letter on the page fits each picture.

## Purpose

Hearing the separate sounds in a spoken word — phonemic awareness — is the
best early predictor of learning to read. Matching the first, last and
middle sounds to letters is the step from listening to phonics: it is
Common Core standard RF.K.2d (isolate and pronounce the initial, medial
vowel and final sounds in three-phoneme words) and RF.K.3a/b (letter-sound
correspondences, short vowels), and the heart of Phase 2 and 3 phonics in
England. Beginning sounds come first, then ending sounds; medial short
vowels are the hardest, because vowels sound alike. The page suits ages
four to six, and older children who need practice.

## History

Picture-to-letter pages are as old as the illustrated primer: the New
England Primer's "In Adam's Fall, we sinned all" (1690) paired each letter
with a picture, and alphabet books did the same through the nineteenth
century. The listening-first approach grew from twentieth-century research
into phonemic awareness (Isabelle Liberman's work in the 1970s, the
National Reading Panel in 2000), which showed that children who can pull
the sounds out of words learn to read more easily. "Beginning sounds"
cut-and-sort and letter-of-the-week colouring sheets became kindergarten
staples from the 1980s and are now among the most printed classroom
worksheets.

## This implementation

- **Spec knobs:** `difficulty`, `task` (`circle`, `write`, `sort`,
  `colour`), `sound` (`auto` — beginning for Kids and Easy, ending for
  Medium, middle for Hard, mixed for Expert — `beginning`, `middle`,
  `ending`, `mixed`), `choices` (letters to circle from, or sort columns,
  2-4; 0 lets the difficulty choose; ignored for write and colour),
  `items` (pictures, 0 = the task's own: 10, 12, 9, 12), `letter` (a
  focus letter: the colour target, a sort column, or the answer of at least
  a third of the pictures), `case` (`lower`, `upper`, `both`), `theme` (a
  seasonal picture pack, used first), `colour` (pictures in colour or line
  art; colour pages are always line art), `name_line`, `width`, `height`.
  Out-of-range values are clamped and reported (`requested_choices`,
  `requested_items`, `requested_letter`, `requested_sound`,
  `requested_width`, `requested_height`).
- **Generation:** every picture of the shared `lako-icons` set (classic and
  seasonal, plain shapes left out) is analysed at each position from its
  pronunciation, against every name a child might give it (the picture's
  label, its seasonal "also called" names and a curated list here — RABBIT,
  BUNNY, HARE; CUP, MUG). Pictures are drawn, theme first, keeping any one
  letter to about a third of the page; wrong letters are drawn from letters
  none of the picture's names could make (consonants against consonants,
  vowels against vowels). Mixed pages cycle through the three positions.
  Sort and colour pages cannot mix positions and use the middle sound
  instead (`requested_sound`).
- **Solving:** say the name; the letter is fixed by its sound.
- **Guarantees:** `answers_checked: true`, by sound, not spelling, using
  American pronunciation (a subset of the CMU Pronouncing Dictionary). A
  picture's beginning letter is its first letter *and* that letter's
  regular sound (hard C and G, short vowels, QU) in every pronunciation, so
  KNIFE, SHIP, CHICK, OWL, ACORN and ICE CREAM never ask a beginning sound.
  An ending letter is its last letter and its last sound (KITE, ending in a
  silent E, never asks one; R is never asked, as many accents drop it).
  A middle sound is the only vowel letter of a one-syllable word, inside
  the word, not before R, saying its short sound; short O accepts both the
  "hot" and the "dog" vowel. For each picture the page knows every letter
  any of its names could be heard as (CAT → C or K; RABBIT → R, B or H),
  and never offers a second such letter — not as a wrong choice, a sort
  column or a colour target — so exactly one letter fits whatever the child
  calls it. Write boxes only ask pictures whose every name gives one single
  letter. Tests re-derive every page independently from the raw ARPAbet.
- **Difficulty:** rated from the page (`rating_basis`): the position
  (beginning 0, ending 1, middle 2, mixed 3) plus the letters to tell apart
  (circle choices or sort columns minus two; write counts 1, colour 0).
  Circle pages reach every band. Write pages start at Easy, and colour
  pages top out at Medium; a request they cannot reach is served at the
  nearest band and reported as `requested_difficulty`.
- **Limits:** the picture set is small, so Q, X, Y, Z and V rarely or never
  appear, and only about fifteen pictures have a middle sound to ask. The
  pronunciations are American: in other accents a word or two may sound
  different (the middle of DOG, for example).
