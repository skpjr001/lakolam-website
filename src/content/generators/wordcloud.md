---
title: "Word Cloud"
blurb: "Word cloud in a shape: your words or a themed list, sized by weight and packed into a heart, circle, star or picture without touching"
category: design
version: "1.0.0"
---
Words big and small packed into a heart, a circle, a star or the outline of
a picture — never touching, the heaviest words largest.

## What it is

A word cloud: a set of words drawn at sizes that show how much each one
matters, packed tightly together so that the whole cluster takes a shape.
The words are your own (a word given several times weighs more, or write
`WORD:5` to set its weight) or come from a themed list — Valentine's Day,
the ocean, space, animals and many more. Words run level or upright (or at a
slant), and once every word has its place, smaller copies fill the gaps so
the shape reads clearly from across a room.

## How to use it

Print it as a poster or card: a heart of the names of a family, a circle of
everything a class learned this term, a star of a team's players. Give the
most important words the biggest weights. Short words pack best; a very long
word may be drawn smaller than its weight asks. The black-ink version can be
coloured in with fine pens, word by word.

## Purpose

A warm, personal design anyone can make from their own words, and a gentle
picture of a list's proportions: what is big is what matters most.

## History

Weighted lists of words ("tag clouds") spread on the web in the early 2000s;
Jonathan Feinberg's Wordle (2008) made the packed, mixed-orientation word
cloud popular, placing words largest first along a spiral until each found a
free spot. Jason Davies's d3-cloud (2012) described the sprite-and-bitmask
version of the same search used here. Shaped clouds — words filling a heart
or a silhouette — followed in tools such as Tagxedo (2010).

## This implementation

- **Spec knobs:** `text` (your words; `WORD:N` sets a weight), `theme` (an
  English themed list used when `text` is empty; an unknown theme falls back
  to animals and is recorded as `requested_theme`), `shape` (heart, circle,
  star, picture), `image` (for the picture shape: an uploaded PNG or JPEG;
  empty uses a built-in silhouette chosen by the seed), `rotation` (none,
  ninety, mixed), `max_words` (5–200), `largest` and `smallest` (letter
  heights, pt), `fill`, `gap`, `weight` (stroke weight), `palette` (auto,
  valentine, ocean, forest, sunset, ink), `outline`, `width`, `height`,
  `margin`.
- **Generation:** each word is drawn in the stroke font, turned, and
  rasterised onto a 1.5 pt grid dilated by half its stroke plus half the
  gap. One bit grid starts with everything outside the shape taken; words go
  largest first, each searching outward along an Archimedean spiral (one
  cell of arc per step) from a seeded start near the shape's centre until
  its sprite misses every set bit, tested a 64-bit row word at a time. A word
  that finds no room retries at 0.75× size (never below `smallest`) and is
  otherwise dropped and listed in meta. With `fill`, the words are then
  cycled at shrinking sizes until the shape is packed. Theme lists are
  shuffled by the seed and weighted 1/(rank + 1.5)^0.75. The heaviest
  word is capped at about a sixth of the shape's size (`requested_largest`
  when that bites), and a word wider than the shape is shrunk to fit.
  Words the font cannot draw are refused and listed as `undrawable`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; `verification: words_never_touch`.
  Tested: no grid cell is claimed by two words, and — checked independently
  on the drawn paths — the ink of any two words stays at least the gap
  apart; every word lies inside the shape (to within a grid cell); placed
  plus dropped words equal the words given; a total ceiling on search steps
  bounds the time. All ink stays inside the page. Meta reports words placed,
  repeats, dropped and undrawable words and the share of the shape covered.
