---
title: "Bunting"
blurb: "Bunting — pennant banners that spell a message, one letter per flag, matching flags with hanging holes"
category: design
version: "1.0.0"
---
Pennant banners that spell a message, one big letter per flag, ready to cut
out and string up.

## What it is

A set of matching flags, one for each letter of a message such as "HAPPY
BIRTHDAY", a name or "WELCOME". Each letter sits in a white circle on a
patterned flag: plain, stripes, dots, gingham or chevrons, or a mix chosen
for you. Spaces between words become flags with a star. The flags can be
triangles, swallowtail banners, banners with a round bottom, or banners with
a scalloped edge. They print one to four to a page, in colour, or as
outlines with hollow letters to colour in. Every flag has two holes punched
at the same place, so the banner hangs level.

## How to use it

1. Print every page of the banner. Each page says "PAGE 1 OF 7" and so on,
   and the flags run in reading order from the first page to the last.
2. If you chose outlines, colour the letters and patterns.
3. Cut out each flag along its outline, and punch or snip out the two small
   circles at the top.
4. Lay the flags out in order. Thread a ribbon or string in through the
   left hole of each flag from the front, and out through the right hole
   from the back.
5. Space the flags evenly along the string and hang the banner up.

## Purpose

Banners are the quickest way to decorate a room for a birthday, a classroom
or a party. Bought banners rarely spell the name you want. A banner made from
flags of different sizes, or with holes in different places, hangs unevenly.
Here every flag is cut from the same outline, with its holes in the same
place, and the letters always sit inside their circles.

## History

Bunting takes its name from a light woollen cloth used for flags, and strings
of signal flags have decorated ships since at least the eighteenth century.
In Britain, triangular bunting has hung over streets for coronations and
jubilees since Victorian times. Pennant letter banners became a party staple
with home printing.

## This implementation

- **Spec knobs:** `message` (up to 40 characters); `shape` (`triangle`,
  `swallowtail`, `rounded`, `scallop`); `pattern` (`auto`, `plain`,
  `stripes`, `dots`, `gingham`, `chevron`); `look` (`colour`, `outline`);
  `per_page` (1–4); `index` (which page); `page`, `landscape`; `margin`
  (inches).
- **Generation:** the message is cleaned to the characters the lettering can
  draw (others are dropped and listed in the meta). Flags are 3 wide to 4
  tall and as large as the page allows. The letter badge is placed in the
  flag's safe area (for a triangle, its incircle) and shrunk until it clears
  the outline by 2 mm. Letters are drawn heavy, and in outline mode hollow,
  inside the badge. The seed picks each flag's colour (never the same as its
  neighbour) and, with `auto`, its pattern.
- **Solving:** nothing to solve.
- **Guarantees:** `outlines_checked` and `spelling_checked`, re-checked from
  the finished flags. Every flag's outline and holes are identical once the
  flag's position is taken away, compared point by point. Every badge and
  hole lies inside its flag with a 2 mm margin, and every letter lies inside
  its badge. The flags, in page order, spell the message; the meta lists
  every flag with its page.
