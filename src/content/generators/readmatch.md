---
title: "Read and Circle"
blurb: "Read and circle — read a short sentence and circle the one picture it describes (or answer yes or no), every other picture proven wrong"
category: puzzle
version: "1.0.0"
---
Read a short sentence, then circle the one picture that matches it.

## What it is

A reading page for young readers. Each row has one short sentence ("I see
two cats.", "The dog is little.", "The ball is in the box.") and a few
pictures. Only one picture shows what the sentence says; each of the others
gets one detail wrong: a different animal or thing, a different number, the
wrong size, the wrong colour, or the wrong place. A second kind of page shows
one picture and asks a question ("Is the cat on the box?") to answer yes or
no. Easy pages name only the thing and how many. Harder pages add big and
little and colour words, then places (in, on, under, next to), and the
hardest pages put two details in one sentence ("Two dogs are in the box.").

## How to play

- Read the sentence. A grown-up can help with new words.
- Look at every picture in the row before you choose.
- Check each word: Is it the right thing? The right number? Big or little?
  The right colour? In the right place?
- Circle the one picture that matches every word.
- On a yes-or-no page, read the question, look at the picture, and circle
  yes or no.

## Purpose

Reading a sentence and checking it against a picture asks a child to read
every word, not just guess from the first one. "Two" and "three", "in" and
"on", "big" and "little" all change the answer. The page practises sight
words (I, see, the, is, are, a, big, little, red, blue, yellow, two…) together
with short, decodable nouns, and builds reading for meaning. It suits
kindergarten and first grade (about ages 4 to 7) and matches goals such as
reading emergent-reader texts with purpose and understanding (Common Core
RF.K.4 and RF.1.4).

## History

"Read and match" and "read the sentence, circle the picture" pages have been
part of early-reading workbooks for as long as there have been sight-word
lists. Dolch published his list of service words in 1936, and the
Dick-and-Jane readers of the same era paired every short sentence with a
picture. Picture-choice reading checks are still a standard format in
kindergarten worksheets and early reading assessments.

## This implementation

**Spec knobs:** `difficulty` (Kids: the thing and how many; Easy: adds big
and little, and colour words on colour pages; Medium: adds in, on, under and
next to a box or a table; Hard: two details in each sentence; Expert is
served as Hard, since no harder sentences exist at this reading level, and
reported as `requested_difficulty`), `task` (`circle` or `yes_no`), `rows`
(2-8, 0 = the level's own: 4 for Kids, 5 otherwise), `choices` (pictures
per row, 2-4; ignored by `yes_no`), `colour` (colour pictures and colour
words; off for line art to colour in, which never uses colour words),
`name_line`, `width` and `height`. Out-of-range values are clamped and
reported as `requested_<field>`.

**Generation:** every picture is a record: a noun (16 short words with
`lako-icons` pictures: cat, dog, fish, bird, bee, cake, apple, ball, cup,
car, bell, book, key, boat, flag, kite), a count of 1-5, big or little, an
optional colour (red, blue, yellow, green; objects only), and an optional
place next to a box (in, on, next to) or a table (on, under, next to). A row
picks the attributes its sentence names from the band's schedule. The answer
picture is the sentence's record; each distractor changes one named
attribute (round robin over the sentence's attributes, then the noun),
sometimes two. Attributes the sentence does not name are left plain (one,
big, own colours, no prop) in every picture, so they cannot decide the
match. Yes/no rows are half yes, half no; a "no" picture changes a named
attribute, and keeps the noun when the question says "the dog".

**Solving:** read the sentence; compare each named word with each picture.

**Guarantees:** `unique` — in every row exactly one picture satisfies the
sentence and every other picture breaks at least one named attribute;
pictures in a row are pairwise different records; the noun pictures are
pairwise visibly distinct in outline and silhouette (checked with
`lako-icons` compare over the whole list). The tests read each printed
sentence back word by word, independently of how it was made, and re-check
every picture against it. Difficulty is the hardest kind of sentence on
the page (`rating_basis`). Sentences are written in lower case with a
capital first letter and a full stop or question mark.
