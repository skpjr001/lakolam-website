---
title: "Cloud Scrolls and Thunder Meanders"
blurb: "Cloud scrolls and thunder meanders in the manner of Chinese ornament: xiangyun spiral-lobed clouds in a leiwen square-spiral frame, a roundel or a thunder lattice"
category: design
version: "1.0.0"
---
Chinese-style ornament of auspicious clouds and the square "thunder"
spiral: a cloud panel framed in thunder pattern, a cloud roundel, or a
thunder lattice.

## What it is

Two of the oldest ornaments in Chinese art, drawn in their manner. The
*xiangyun* (祥云, auspicious cloud) is a cloud made of curls: two to five
round lobes, each holding a spiral, gathered into one soft body with a
streaming tail. The first two lobes curl toward each other like the head
of a ruyi sceptre, the cloud shape this ornament shares its name with. The
*leiwen* (雷纹, thunder pattern) is a square spiral: here the double
spiral 回, two lines winding inward side by side and meeting in the middle,
linked unit to unit into continuous bands. A page is a panel of drifting
clouds inside a thunder frame, a round medallion of clouds ringed by
thunder spirals, or a field of thunder pattern edge to edge.

## How to use it

Print it as a picture or a background: blue-and-white is the palette of
Jingdezhen porcelain, and red lacquer with gold and a black-lacquer frame
is the palette of carved and painted lacquerware. The line-art version is
a colouring page. Colour the cloud bodies one soft colour and the spirals a
darker one, or shade each cloud from its head to its tail; in the thunder
frame, colour the channels between the lines in two alternating colours to
see how each spiral pair links to the next. The roundel makes a good card
or coaster design, and the lattice a wrapping or endpaper.

## Purpose

An honest construction of both ornaments: the clouds are built from real
spirals, and the thunder pattern from lattice walks that can be checked
exactly — one line per unit, never touching itself or its neighbours.

## History

Square spirals cover the ritual bronzes of the Shang and Western Zhou
dynasties (c. 1600–771 BC), where the fine *leiwen* fills the ground around
the larger *taotie* masks; the name "thunder pattern" was given by later
antiquarians, who saw in the spiral the ancient form of the character for
thunder, and the pattern is catalogued in the Song-dynasty *Xuanhe Bogu
Tu* (c. 1123). Cloud scrolls developed in the Warring States and Han
periods (5th century BC–AD 220) as the flowing *yunqi* ("cloud vapour")
patterns on lacquer, silk and bronze inlay, and settled into the lobed
*ruyi* cloud of later centuries. Both ran on through every medium: cloud
collars and borders on Yuan and Ming blue-and-white porcelain from
Jingdezhen, carved cinnabar lacquer, palace architecture and textiles.
Jessica Rawson's *Chinese Ornament: The Lotus and the Dragon* (British
Museum, 1984) traces these motifs. No dragon, deity or written character
is drawn here; every cloud and spiral is generated from the construction
rules.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200–3000); `composition`
  (`panel` — clouds in a thunder frame, the default; `roundel`; `lattice`);
  `style` (`porcelain`, `lacquer`, `lines`); `spiral` (`logarithmic`,
  `archimedean`: the law of the cloud spirals); `clouds` (clouds across the
  panel field, 1–8, default 3); `max_lobes` (2–5, default 4); `leiwen_turns`
  (turns of each thunder spiral, 1–6, default 3); `frame_units` (thunder
  units across the frame or lattice, corners included, 4–40, default 10);
  `stroke` (line weight multiplier, 0.2–4).
- **Generation:** a cloud is two to five lobes — discs from a template
  (the ruyi pair, a crown, two head lobes) with seeded jitter — united with
  a tail ribbon and closed by growing and shrinking the union by the same
  round offset, which turns the notches between lobes into smooth fillets.
  The tail's centreline is drawn by integrating its heading (a wave, then an
  upward hook), so it is smooth by construction; two streaks run along it
  where it leaves the lobes. Each lobe holds a spiral of about 1.3–2 turns from
  its lower side inward to 13% of its radius, logarithmic or Archimedean,
  drawn as a tapering ribbon; the spiral radius is capped so the spirals of
  one cloud stay apart. Panel clouds sit in a half-drop grid, each scaled
  into its own cell, alternate columns facing alternate ways; roundel
  clouds form a whorl round a central cloud, with corner clouds where the
  page leaves room. The thunder unit is the double square spiral: two arms,
  each the other turned half a turn, wind inward in step on an `s × s`
  lattice (`s = 2·turns + 2`) and meet in the middle, so the unit is one walk
  through every lattice point of its square. A band alternates the unit with
  its mirror run backwards, so each unit ends one step from the next one's
  start: the band is one continuous line. The frame is four such bands
  between four corner units, cells counted so the band fills the ring
  exactly; the lattice is rows of bands (seeded flips) or a checker of
  quarter-turned units; the roundel spaces units round the ring by the
  angle their inner corners need.
- **Guarantees:** deterministic per seed. Every thunder line is a simple
  lattice walk and no two share a lattice point, so none touches itself or
  another (tested exactly in integers, and reported as `leiwen_simple`);
  each edge band is one continuous walk, and the frame's walks cover every
  lattice point of the band ring, so the band closes at all four corners
  with whole units (tested); roundel units do not overlap and lie between
  the rails (tested). Cloud spirals and tails are smooth — no turn sharper
  than 0.25 rad between samples (tested) — and each spiral stays in its own
  lobe disc, the discs of a cloud disjoint (tested); panel clouds stay in
  their cells (tested). All ink lies inside the page. The line-art page
  passes the adult colourability check (`colorable`). Clamped knobs are
  reported as `requested_<field>`. `verification:
  leiwen_walks_simple_disjoint_bands_closed_spirals_g1`.
