---
title: "Advent calendars"
blurb: "Advent and countdown calendars — numbered doors in a tree, house or pile of presents, with a back page registered for double-sided printing"
category: design
version: "1.0.0"
---
Printable advent and countdown calendars: a Christmas tree, a house or a pile
of presents, with numbered doors to cut and open, one a day.

## What it is

A picture with doors numbered 1 to 24, or any count from 1 to 31 for other
countdowns, in a shuffled order. Each door is cut on three sides and folds
open along the fourth, which is drawn as a dashed line. The second page has a
window for each door, numbered, with lines to write or draw a surprise: a
joke, a task, a treat, a memory.

The second page can be printed two ways. **Double-sided:** it goes on the
back of the same sheet, and each window lands on the back of its own door,
so the message is read when the door opens. **Backing sheet:** it is printed
on a second sheet and glued behind the first, so each window shows through
its open door. Pages come in colour, or as outlines to colour in.

## How to use it

1. Print the picture page. For a double-sided calendar, put the sheet back
   in the printer and print the window page on its back, flipping on the
   long edge (most printers call this "long-edge binding"). For a backing
   sheet, print the window page on a second sheet.
2. Write or draw something in each numbered window: a riddle, an activity,
   a small drawing. Do this before cutting.
3. Cut each door along its three solid sides with a craft knife on a
   cutting mat. Do not cut the dashed side: fold along it so the door
   opens.
4. For a backing sheet, spread glue around the edges of the backing sheet
   and between the windows, never inside them. Lay the picture on top with
   the edges lined up.
5. Open one door a day, starting with door 1.

## Purpose

Advent calendars turn waiting into a game. A printed one can be made at
home, and its surprises chosen by the family. It only works if the doors and
their surprises line up. On a double-sided print, the back is flipped, so
every window has to be mirrored to sit under its door, and the doors must not
touch or overlap. These calendars are laid out and checked so that each
window falls exactly under its door.

## History

The custom of counting down the days of Advent began in nineteenth-century
Germany: families chalked lines on doors or lit a candle a day. The first
printed advent calendar is usually credited to Gerhard Lang of Munich, who
sold one with little coloured pictures to stick on in 1908, and later
calendars with doors to open. They spread across Europe and America after
the Second World War, and countdown calendars now mark birthdays, holidays
and the last days of school.

## This implementation

- **Spec knobs:** `picture` (`tree`, `house`, `gifts`); `doors` (1–31);
  `back` (`duplex`, `backing`); `look` (`colour`, `outline`); `title`;
  `page`, `landscape`; `margin` (inches).
- **Generation:** the picture is cut into horizontal bands (inside the
  triangle of the tree, the house front plus an attic row in the gable, or
  the whole page for presents). The doors are shared between the bands in
  proportion to their width. Within a band, door widths and heights vary by
  the seed, and each door is at least 10 mm a side with 3 mm gaps. If a band
  cannot hold its share, the band count is changed and the layout tried
  again. Numbers 1 to N are shuffled onto the doors, and each door hinges on
  a seeded side. The window page is the doors mapped through the printing
  transform: a left-right mirror about the page's centre for double-sided
  printing, the identity for a backing sheet. It is shipped as the second
  (`hint_block`) page.
- **Solving:** nothing to solve.
- **Guarantees:** `numbers_checked`, `doors_disjoint` and
  `registration_checked`, re-checked from the finished doors. The doors
  carry 1 to N once each. They are at least 10 mm a side, at least 3 mm
  apart and inside the picture. Each is cut on three sides, and its hinge is
  never a cut edge. Every door mapped through the printing transform is
  exactly its window. Printers can shift a double-sided print by a
  millimetre or two, so windows are drawn to the door's full size and the
  writing kept away from their edges.
