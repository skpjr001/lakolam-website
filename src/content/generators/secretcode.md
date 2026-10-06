---
title: "Secret Code"
blurb: "Secret code — decode a joke with a printed key: pigpen, symbols, numbers, phone keypad, Caesar wheel or mirror writing"
category: word
version: "1.0.0"
---
A joke with its punchline in code — and the code key printed right there.
Crack each letter and find out the answer.

## What it is

A kids' code-breaking page. At the top is a code key; below it are riddles
and jokes whose answers are written in secret code, with a box under each
code symbol for the real letter (mirror writing has a line to write on
instead). Six codes:

- **Pigpen** — letters written as the shape of their pen in two grids and
  two X's; the second grid and X add a dot.
- **Symbols** — every letter is a little shape: a circle, square, triangle
  or diamond, plain, filled, shaded or marked.
- **Numbers** — A is 1, B is 2, all the way to Z = 26.
- **Phone keypad** — the number of the phone key the letter is on, with dots
  for which letter on the key it is.
- **Caesar wheel** — every letter moved along the alphabet by the same
  amount; the wheel shows which code letter stands for which real letter.
- **Mirror writing** — the answer written backwards, as it looks in a
  mirror.

## How to play

Read the joke's question first and guess the answer if you like. Then take
the code one symbol at a time: find the symbol in the code key and write the
letter it stands for in the box underneath. Spaces and punctuation are
printed as they are, so you can see where each word starts and ends.

- **Pigpen:** look at the shape around the letter in the key — the lines
  of its pen — and whether it has a dot.
- **Phone keypad:** find the key with that number; one dot means the first
  letter on the key, two dots the second, and so on.
- **Caesar wheel:** find the code letter on the inner ring; the real letter
  is just outside it.
- **Mirror writing:** hold the page up to a mirror, or read the letters from
  right to left and flip each one round in your head. Write the answer the
  right way round on the line.

## Purpose

Secret codes are a favourite with children, and decoding one is real
reading and matching practice: each symbol must be looked up, each letter
written, and the words only make sense at the end — which is what makes the
punchline worth it. The six codes step from counting (numbers) through
visual matching (pigpen, symbols, keypad) to the idea of a shift, the first
step towards real cryptography. With a `message` of your own, it becomes a
treasure-hunt clue, a party invitation or a classroom secret.

## History

The Caesar shift is named after Julius Caesar, who according to Suetonius
wrote to friends with every letter moved three places along. The pigpen
cipher was used by Freemasons in the eighteenth century and is often
called the Masonic cipher. Letter-numbering (A1Z26) and symbol alphabets are
staples of children's code books, and Leonardo da Vinci kept his notebooks
in mirror writing. The phone keypad code borrows the letters printed on
telephone keys since the mid twentieth century, now standardised as ITU
E.161 — the same keys once used to type text messages.

## This implementation

- **Spec knobs:** `kind` (`pigpen`, `symbols`, `numbers`, `keypad`,
  `caesar`, `mirror`), `message` (your own text: letters, spaces and
  . , ! ? — up to 160 characters), `jokes` per page when no message is given
  (1–4), `shift` (Caesar, 1–25; 0 lets the seed choose), `width`, `height`,
  `margin`, `name_line`.
- **Messages:** thirty short jokes and riddles written for this crate,
  kid-safe; the question is printed plainly and the answer is encoded.
  The seed picks which ones appear.
- **Glyphs:** pigpen grids, X's and dots, and the 28 geometric symbols
  (four shapes × seven fills and marks, 26 assigned per seed) are drawn as
  vector line art; numbers, keypad digits and shifted letters use the stroke
  font; mirror writing flips the font's letters with a transform. Cell size
  shrinks until every message fits the page.
- **Guarantees:** deterministic per seed; the key maps the 26 letters to 26
  distinct glyphs (and the drawn pictures of the drawn codes are distinct);
  every letter of every message appears in the key; decoding each encoded
  message with the printed key gives back the message exactly. Checked
  before the page is returned and re-checked in the tests with an
  independent reverse table. Meta carries `answers_checked`, the code, the
  shift, the messages and a difficulty by code: numbers and mirror writing
  Kids, pigpen, symbols and keypad Easy, the Caesar wheel Medium. The answer
  key fills in every box and writes out mirror answers.
