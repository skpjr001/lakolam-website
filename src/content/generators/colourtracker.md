---
title: "Colour-in trackers"
blurb: "Colour-in trackers — savings challenges whose amounts add up exactly to the goal, day counts, reading shelves and sticker charts"
category: design
version: "1.0.0"
---
Savings challenges, day counts, reading shelves and sticker charts: a picture
split into numbered spaces to colour in as you go.

## What it is

A page with a goal and a space for every step towards it:

- **Savings challenge.** Each space carries an amount. The classic
  100-envelope challenge numbers the spaces 1 to 100 (5,050 in all), and the
  52-week challenge 1 to 52. Or set your own goal, and it is split into
  amounts that add up to exactly that goal, in multiples of a unit you
  choose (5s or 10s, say).
- **Day challenge.** Spaces numbered 1 to N, for 30, 75 or 100 days of a
  habit.
- **Reading shelf.** A bookshelf with one spine for each book you mean to
  read.
- **Sticker chart.** A winding path of circles sized for real stickers,
  leading to a prize star.

Savings and day trackers come as coins in a jar, envelopes, bricks in a wall,
or a honeycomb. The spaces stay white for colouring, and the lines and title
come in a choice of soft colours or greys.

## How to use it

1. Print the page at 100 % (for sticker charts, so the circles match your
   stickers).
2. Savings: every time you put money aside, find a space with that amount
   and colour it in. It does not matter in which order. Write your running
   total on the line at the bottom. When every space is coloured, you have
   reached the goal.
3. Days: colour one space each day you keep your habit, in number order.
4. Reading: colour a spine, and write the title on it, for each book you
   finish.
5. Stickers: add a sticker to the next circle for each good deed or
   finished task. When the path reaches the star, it is prize time.

## Purpose

Colour-in trackers turn a long goal into many small, visible wins. Savings
challenges spread on social media, and teachers and parents have long used
sticker charts. A savings tracker is only honest if its amounts really add up
to the goal. Here the amounts are added up again from the printed numbers,
and every space is checked to be big enough to colour and label.

## History

Reward charts with stickers or gold stars have been a classroom fixture for
generations, and behaviour charts were popularised in the twentieth century
by teachers and child psychologists. The 52-week money challenge spread
online around 2013, and the 100-envelope challenge became a social-media
craze in 2023, with printable colour-in trackers sold alongside it.

## This implementation

- **Spec knobs:** `kind` (`savings`, `days`, `reading`, `stickers`);
  `layout` (`jar`, `envelopes`, `bricks`, `honeycomb`, for savings and days);
  `count` (spaces, 0 for the usual 100, 40 or 20); `goal` and `unit`
  (savings); `sticker_mm` (stickers); `title`; `style`; `page`,
  `landscape`; `margin` (inches).
- **Generation:** a classic challenge's amounts are 1 to N times the unit,
  shuffled into the spaces by the seed. A custom goal is first rounded to a
  multiple of the unit (`requested_goal`). It is then split into N amounts,
  each at least one unit: the spare units are shared out by seeded weights,
  and the rounding remainder is handed out one unit at a time, so the total
  is exact. Coins fill a jar from the bottom on a hexagonal lattice, with the
  radius found by bisection. Envelopes and bricks fill a grid and a
  running-bond wall shaped to their proportions. A honeycomb uses the
  largest cells that fit. Book widths and heights are seeded. Stickers
  follow a back-and-forth path at their true diameter. If labels would fall
  under 4 pt, or the page cannot hold the stickers, fewer spaces are drawn
  and the request is kept as `requested_count`. Day trackers and sticker
  charts do not use the seed.
- **Solving:** nothing to solve.
- **Guarantees:** `regions_checked` and, for savings, `sums_checked`,
  re-checked from the finished spaces and labels. Every space is a closed
  circle or convex polygon inside the drawing area. No two spaces overlap,
  checked with exact circle distances and separating axes. Every label is
  at least 4 pt and fits inside its space. Savings amounts add up exactly to
  the goal and are positive multiples of the unit. The other trackers number
  their spaces 1 to N once each. Stickers are their true diameter within
  0.2 mm.
