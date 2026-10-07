---
title: "Tablet Weaving"
blurb: "Tablet weaving drafts — threading, turning sequence and drawdown for threaded-in diamonds, lines and ram's horns, the band re-woven by turning every card and the twist kept within a limit"
category: design
version: "1.0.0"
---
Tablet (card) weaving drafts for threaded-in bands: threading, turning and a
drawdown re-woven card by card.

## What it is

A complete draft for a woven band made on square cards with four holes. The
threading diagram shows the colour in each card's holes A, B, C and D, which
hole starts at the near top, and whether each card is threaded S or Z. The
turning sequence runs down the side, F for forward and B for backward. The
drawdown shows the band that results, every pick of every card drawn as a
slanted float in its colour. The designs are diamonds, zigzag lines and
diamond outlines, ram's horns and seeded threaded-in patterns, framed by
solid border cards and mirrored about the centre. A second view draws the
finished band across the page, in as many strips as show it largest.

## How to use it

Thread each card as shown, looking at it from the same side every time. Put
the coloured threads through holes A, B, C and D, passing them through from
the front for S and from the back for Z, as your tablet-weaving book or
teacher shows. Turn each card so the hole marked with a dot sits at the near
top corner. Then weave: turn every card together a quarter turn, forward or
backward as the sequence says, and pass the weft. Each block of forward
turns is followed by the same number of backward turns, so the twist that
builds up behind the cards always unwinds again and never goes past the
limit printed at the foot of the draft. Beat firmly and keep the weft tension
even, and the band will match the drawdown.

## Purpose

A threaded-in draft has to get three things to agree: the threading, the
turning and the picture. A single card set up a hole out, or threaded the
wrong way, turns a diamond into a smear. A turning plan that keeps going one
way twists the warp into a rope. Every band here is woven twice: once for
the drawing, and once more by a model of each card with its four threads
moving round its four corners. The two must match pick for pick, in colour
and in slant, and the twist on every card must stay within the limit.

## History

Tablet weaving is one of the oldest ways to weave a band. Tablets and
tablet-woven bands survive from the Iron Age, from the Hallstatt salt mines
to the Viking ship burial at Oseberg. The Oseberg grave held a loom with 52
cards still threaded. Tablet weaving was used across Europe, the Middle East
and Asia for belts, garters, trim and straps. The 20th century brought it
back through the work of Margarethe Hald, Peter Collingwood (*The
Techniques of Tablet Weaving*, 1982) and a lively community of historical
and modern weavers. Threaded-in designs, made only by how the cards are
threaded and set up, are the classic place to start.

## This implementation

- **Spec knobs:** `motif` (auto, diamonds, lines, rams_horns, random),
  `cards` (4–60 pattern cards, rounded up to even), `border` (0–6 solid
  cards a side), `colours` (2–4), `turns` (1–16 turns each way, never more
  than the twist limit), `twist_limit` (1–32 quarter turns), `picks`
  (8–240), `view` (draft, band), `palette` (auto, madder, forest, royal,
  earth, mono), `width`, `height` (144–3000 pt). Out-of-range values are
  clamped and reported as `requested_*`.
- **Generation:** the left half of the pattern cards is threaded and set
  up, and the right half is its mirror image with Z threading in place of
  S. Diamonds put two dark and two light threads in each card. Lines put
  one dark thread in each card. Ram's horns use two pattern colours and a
  doubled step. All of them start the cards in a V, with each card one hole
  further round than its neighbour, and the colour changes every four cards
  when more colours are used. The random motif seeds every hole. The
  turning sequence is blocks of n forward and n backward turns. The model
  card follows the textbook mechanics. Turned forward, holes A, B, C, D reach
  the near top corner in turn, and the thread that passed over the top shows
  on the face. An S-threaded card turned forward makes a Z float (/) and
  turned backward an S float (\); Z-threaded cards the opposite.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. The band is re-woven by turning a
  model of every card, its four threads moving round four corners
  (`verification: band_rewoven_by_turning_cards_twist_bounded`). Every
  float's colour and slant must match the drawdown, the twist recorded after
  each pick must agree, and no card's twist may pass `twist_limit` (the most
  twist is printed and given as `max_twist`). The threading must mirror
  about the centre. Tests check the textbook mechanics directly (four
  forward turns show A, B, C, D, and turning back shows the last thread
  again), refuse hand-broken drafts and runaway turning, show every option
  changes the page, and sweep every boundary value for a finite page inside
  its bounds.
