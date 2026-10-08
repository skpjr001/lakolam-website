---
title: "Map Pages"
blurb: "Map pages — states and countries visited trackers, label-the-map quizzes with keys and map colouring for the US, Canada, Australia, Europe and the world, from public-domain Natural Earth outlines"
category: design
version: "1.0.0"
---
Real outline maps of the United States, Canada, Australia, Europe and the
world: places-visited trackers, label-the-map quizzes with answer keys, and
patterned map colouring.

## What it is

Outline maps drawn from real borders, in three kinds of page:

- A **tracker** ("States I've visited"). Every state, province or country is
  an empty space to colour in, with its name inside it or on a line to it. A
  place too small to colour gets a round colour-in dot beside it. A colour
  key, a "____ OF 50" count and a tick list of every place come with it.
- A **quiz**. The places are numbered on the map, and a table beside it has a
  line for each number, plus one for the capital if you ask for capitals.
  The answer key fills in the table.
- A **colouring page**. Every place is filled with its own line pattern,
  such as stripes, dots, waves or scales, and no two neighbours share one.

The maps cover the 50 United States (with Alaska and Hawaii in boxes), the 13
provinces and territories of Canada, the 8 states and territories of
Australia, the 46 countries of Europe, and 176 countries of the world.

## How to use it

1. **Tracker:** colour each place you have been. Use the colour key if you
   like, one colour for places you visited, one for where you lived, and one
   for where you want to go. Tick the place in the list and add up your count
   at the top. Small places, such as Rhode Island or Luxembourg, are coloured
   in the round dot at the end of their line.
2. **Quiz:** look at each number on the map and write the name of that place
   on the matching line of the table. With capitals, a star marks each
   capital city, and the second line is for its name. Check your work against
   the answer key.
3. **Colouring:** colour the patterns, each place in its own colours.
4. On the world map, some small countries in crowded corners have no label.
   They are all in the tick list on the second page.

Grey land around the edge of the Europe map is outside the countries
listed. Hatched areas are places whose border is in dispute; the map shows
the line where control lies today.

## Purpose

"States I've visited" maps are a popular keepsake for road trippers and
families, and label-the-map quizzes are a classroom staple from the early
grades on: US states in grades 3 to 5, and the countries of Europe and the
world later on. Bought maps rarely come in the size, list or style you want,
and blank quiz maps often come without a key. Here every map is drawn from
real borders, the labels never collide, and the quiz always comes with its
answer key.

## History

Outline maps for colouring and naming have been school exercises since the
nineteenth century, when cheap lithographed blank maps spread through
classrooms. "Scratch-off" and colour-in travel maps became popular gifts in
the 2010s. The borders here come from Natural Earth, a public-domain map
dataset begun in 2009 by the cartographers Nathaniel Vaughn Kelso and Tom
Patterson for anyone to use freely.

## This implementation

- **Spec knobs:** `map` (`usa`, `canada`, `australia`, `europe`, `world`);
  `kind` (`tracker`, `quiz`, `colouring`); `labels` (`names`, `codes`,
  `none`; tracker and colouring only); `capitals` (stars, and a capital
  column on a quiz); `checklist` (the tick list; tracker and colouring only,
  moved to a second page past 60 places); `order` (`auto`: alphabetical
  list, shuffled quiz; `alphabetical`, `shuffled`, `geographic`);
  `questions` (quiz only, 1–60; null numbers every place up to 60, a seeded
  60 of the world's 176 countries, larger ones first); `title` (null for
  the default, empty for none, 60 characters at most); `page` (`letter`,
  `a4`); `landscape`; `line` (border weight, 0.3–3 pt). Clamped values are
  reported as `requested_line`, `requested_questions` and `requested_title`;
  dropped title characters as `dropped_characters`.
- **Data:** Natural Earth 1:50m admin-0 countries and admin-1 states and
  provinces, its breakaway-and-disputed-areas layer, and 1:10m populated
  places for capitals. All public domain. Offline, each map was projected
  (Albers USA with insets; Lambert conformal conic for Canada; Albers for
  Australia; Lambert azimuthal equal-area for Europe; Equal Earth for the
  world, without Antarctica), simplified as a topology so that neighbours
  share one border line, cleared of tiny islands, and quantised. The
  quantisation grid was nudged until no two border segments cross. All
  five maps embed in about 95 KB. Washington, D.C. is merged into Maryland
  (it is the national-capital star), Jervis Bay Territory into New South
  Wales, and Åland into Finland. Borders are Natural Earth's default de
  facto lines, and its disputed areas are hatched. There are no
  country-specific political variants. The world map has no capital star
  for Western Sahara, Northern Cyprus or the French Southern and Antarctic
  Lands, which have none in the data.
- **Generation:** the map is fitted to the page, with the list under it or
  down the side, whichever leaves the map larger. Each label first tries to
  sit inside its place, at the pole of inaccessibility and then at other
  interior spots, from the largest size down. Names split onto two lines,
  and fall back to the postal or ISO code. A label that does not fit
  becomes a callout. The callout search tries candidates cheapest first:
  short leaders, open sea, pointing away from the middle of the map. A
  callout over land gets a white backing and may not cover a small place
  or another place's middle, and leaders keep clear of other places'
  middles. A greedy pass that leaves a place out is retried with that place
  first. A quiz place with no room for its number leaves the quiz and the
  rest are renumbered (`questions_without_room`). On the world map, labels
  that find no room within a short leader are left off and listed as
  `unlabelled`. Colouring patterns are chosen in a seeded order so that no
  place shares a pattern with a neighbour. The seed also picks the
  tracker's key colours and the quiz order.
- **Solving:** the quiz's answers are the place names in the key.
- **Guarantees:** `map_checked`, re-derived from the model:
  - Every border arc is used by at most two places, and by two only in
    opposite directions, so neighbours share a line and there are no gaps or
    overlaps. Every ring closes.
  - Every listed place has exactly one label or number, inside it or at the
    end of a leader. The world map reports its `unlabelled` places instead.
  - Labels never overlap each other or a capital star, and leaders never
    cross each other or pass through a label.
  - Quiz numbers are a bijection with the numbered places and the key
    (`answers_checked`).
  - Neighbours on a colouring page have different patterns
    (`patterns_differ`).
  - A place smaller than 12 mm² (5 mm² on the world map) has a colour-in
    dot at least that large.

  The tests re-check these by other methods: label boxes are sampled
  against each place by winding number, overlaps and leaders are tested by
  point sampling, and the embedded outlines are checked for crossing
  segments with a grid sweep.
