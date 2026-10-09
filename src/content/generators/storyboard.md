---
title: "Storyboard"
blurb: "Storyboard sheets — frames at exact 16:9, 4:3, scope, square or vertical ratios, with note lines"
category: paper
version: "1.0.0"
---
Storyboard sheets — numbered frames at an exact screen shape, with lines
beneath each one for dialogue, action and camera notes.

## What it is

A page of empty picture frames laid out in a grid — 2 × 2, 2 × 3, 2 × 4,
3 × 3 or a single column of three — every frame drawn at the exact shape of
the screen the film will play on:

- **16:9** — HD television and online video (the default);
- **4:3** — classic television;
- **2.39:1** — anamorphic widescreen cinema, "scope";
- **1:1** — square, for social media posts;
- **9:16** — vertical video for phones.

Each frame is as large as its place on the page allows, with two to six
ruled lines beneath it (or none), a small shot number above it, and if you
like, faint dashed guides: a centre cross, or rule-of-thirds lines.

## How to use it

Print at actual size. Work through the script one shot at a time: sketch
what the camera sees in a frame — stick figures are fine — and write the
dialogue, the action and the camera direction on the lines below (CLOSE-UP,
PAN LEFT, CUT TO …). Arrows drawn inside a frame show movement of the
characters or the camera. Read the frames in order, left to right and top
to bottom, to check that the story flows before anything is filmed or
animated.

Pick the frame shape of your finished film so every composition is
planned for the real screen; the thirds guides help place the horizon and
the subject's eyes.

## Purpose

Storyboards are how film, television, animation, advertising and games
plan a sequence before it is made: directors, cinematographers and
animators use them to agree on shots, and they are just as useful for
school video projects, comics planning, presentations and user-interface
walkthroughs. In a book, storyboard pages make a filmmaker's or animator's
sketchbook.

## History

Storyboarding grew up at the Walt Disney studio in the early 1930s, where
story sketches pinned up in sequence on boards let the story team see a
whole cartoon at once and rearrange it; the 1933 short *Three Little Pigs*
is often named as the first film storyboarded complete. Other animation
studios adopted the method within a few years, and live-action films
followed — *Gone with the Wind* (1939) was among the first. The frame
shapes follow the screens: 4:3 is the shape of early cinema and of
television until the 2000s, 2.39:1 the modern anamorphic "scope" ratio,
16:9 the HD standard, and 9:16 the phone held upright.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `layout` (two_by_two,
  two_by_three, two_by_four, three_by_three, one_by_three — across × down);
  `aspect` (widescreen 16:9, standard 4:3, scope 2.39:1, square,
  vertical 9:16); `note_lines` under each frame (0–6, default 3); `ink`
  for the frame borders (default charcoal) and `weight` (0.25–3 pt,
  default 1); `note_ink` (default pale gray); `numbers` (shot numbers);
  `guides` (none, centre, thirds).
- **Generation:** the content box is split into equal cells with 8 mm
  gutters across and 6 mm down. In each cell the frame takes the largest
  size of the exact ratio that leaves a 5 mm band above it for the number
  and 6.5 mm per note line below it; the frame, its number and its notes
  are centred in the cell as one block. If the note lines would leave a
  frame less than 35% of its cell's height, lines are dropped and
  `requested_note_lines` recorded.
- **Solving:** nothing to solve — a page to draw on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every frame has exactly the chosen aspect ratio (to
  1e-9) and fills either its cell's width or the height left for it; the
  note lines sit at an exact 6.5 mm pitch under each frame; frames are
  numbered in reading order; and all ink — borders, lines, guides and
  numbers — stays inside the margins, checked on every page size,
  orientation, layout, ratio and note count. A knob outside its range is
  clamped and recorded as `requested_<field>`.
