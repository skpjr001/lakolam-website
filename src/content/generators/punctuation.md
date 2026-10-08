---
title: "Capitals and Punctuation"
blurb: "Capitals and punctuation — fix the sentence, circle the capitals, add end marks, commas, apostrophes or speech marks, in real lower case"
category: word
version: "1.0.0"
---
Mend the sentence: put back the capital letters, full stops, question marks,
commas, apostrophes and speech marks.

## What it is

A writing-conventions page printed in real lower-case letters, so a missing
capital or apostrophe can actually be seen. Each sentence has lost some of
its marks, and the reader puts them back. There are six kinds of page:

- **Fix the sentences** — every capital, end mark, comma and apostrophe is
  gone; write the sentence again correctly (the classic "daily oral
  language" exercise);
- **Capital letters** — circle every word that needs a capital;
- **End marks** — write a full stop, question mark or exclamation mark in
  the box;
- **Commas** — in lists, and after an opening phrase such as "After lunch";
- **Apostrophes** — in short forms (don't, I'm) and to show an owner (Ben's
  hat, the girls' coats, the children's coats);
- **Speech marks** — around the words someone says.

The rules each page uses are printed in a box at the top.

## How to play

- Read the rules in the box at the top of the page.
- Read each sentence slowly, out loud if you like.
- On a **fix**, **commas**, **apostrophes** or **speech marks** page, write
  the sentence again on the line below with the missing marks in place.
- On a **capital letters** page, circle every word that should start with a
  capital: the first word, the word I, and the names of people, places,
  days and months.
- On an **end marks** page, write the mark the sentence needs in the box:
  a full stop for a telling sentence, a question mark for an asking
  sentence, and an exclamation mark for a "What a..." or "How..." sentence
  that shows surprise.
- Each sentence has exactly one correct answer under the rules in the box.

## Purpose

Capital letters and punctuation are the first writing conventions children
are tested on: the UK National Curriculum grammar, punctuation and spelling
tests in Years 2 and 6, and the Common Core language standards L.1.2 to
L.4.2 in the United States. Short, frequent practice — spotting what is
missing in a sentence and writing it correctly — builds the habit of
proofreading. Seeing real lower-case letters matters: a capital letter
only stands out next to small ones.

## History

Correcting faulty sentences is one of the oldest school exercises; grammar
books of the nineteenth century already printed "false syntax" for pupils
to mend. In American classrooms it became the "Daily Oral Language" warm-up
of the 1980s, with two sentences on the board each morning, and British
schools practise the same skills for the statutory SPaG tests introduced in
2013. Conventions differ a little between countries — the comma before the
last "and" of a list, and the names "full stop" and "period" — so the page
follows one convention and says which.

## This implementation

- **Spec knobs:** `difficulty` (Kids: capitals for the first word, I and
  names, full stops and question marks; Easy: days, months and places,
  exclamation marks, short forms; Medium: list commas, one owner's
  apostrophe, speech with "said" first; Hard: commas after opening
  phrases, many owners' apostrophes, speech with "said" after; Expert:
  speech sentences on fix pages), `task` (`fix`, `capitals`, `end_marks`,
  `commas`, `apostrophes`, `speech`), `style` (`uk`: no comma before the
  last "and", "full stop", "speech marks"; `us`: the serial comma,
  "period", "quotation marks"), `count` (3-12 sentences, 0 for the task's
  own), `rules` (print the rules box), `name_line`, `width`, `height`,
  `margin`.
- **Generation:** about seventy sentence templates written for Lakolam
  carry every capital and mark as a tag (the capital a name needs, the
  comma a list needs, the apostrophe a short form needs). Slots are filled
  from curated lists — first names, days, months, places, animals, things,
  foods, school things, counted owners. At least half the sentences are at
  the requested band; the rest come from easier ones. Tasks reach only the
  bands their rules belong to (capitals and end marks: Kids and Easy;
  commas and speech: Medium and Hard; apostrophes: Easy to Hard; fix: Kids
  to Expert); another band is served as the nearest one and reported.
- **Solving:** the answer key is the canonical sentence, with the mended
  letters and marks in red (circles on a capitals page, the mark in the box
  on an end-marks page).
- **Guarantees:** every printed sentence is its canonical sentence with
  exactly the task's tagged marks removed (`answers_checked`). One answer
  only: names, months and places that are also everyday words (Lily, May,
  Turkey) are left out; no short form whose apostrophe-free spelling is a
  word (its, were, well, cant); no exclamations on fix pages, where a
  statement could take either mark; many owners always follow a number
  ("the three girls' coats"), so the plural is never in doubt; the serial
  comma is fixed by `style`. The tests re-check every sentence from its
  text alone against the written rules. The page is rated by the hardest
  rule it asks for (`rating_basis`).
