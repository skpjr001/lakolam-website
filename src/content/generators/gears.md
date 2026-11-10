---
title: "Gear Trains"
blurb: "Gear trains: meshing involute spur gears, planetary sets and clock trains, every tooth count exact"
category: design
version: "1.0.0"
---
Meshing involute spur gears drawn as engineering posters: trains, planetary
sets, clock movements and a dimensioned blueprint, every tooth count exact.

## What it is

A page of real gears. Every tooth has the involute profile that modern
gears are cut to, and every pair that touches is placed and turned so that
its teeth genuinely mesh: the same tooth size, the pitch circles touching,
a tooth of one sitting in a gap of the other. Four kinds of page:

- **Gear train** — a chain of gears grown across the page in two layers,
  with compound gears (a large and a small gear fixed on one shaft) that
  change the speed as the motion passes through.
- **Planetary set** — a sun gear in the middle, planet gears round it on a
  carrier, and a ring gear with its teeth on the inside, as in an
  automatic gearbox or a bicycle hub.
- **Clock train** — the gears of a clock movement: the going train that
  makes the seconds arbor turn sixty times for each turn of the minute
  hand, and the motion work behind the dial that turns the hour hand once
  for every twelve turns of the minute hand.
- **Blueprint** — one pinion and wheel as an engineering drawing: front
  view with centre lines and dimensions, an exploded section, a magnified
  tooth showing its tip, pitch, base and root circles, and a title block
  with the gear data.

It comes in polished brass and steel on a dark plate, white on blueprint
blue, or black outlines to colour.

## How to use it

Hang it, frame it, or use it to explain how gears work. Count the teeth:
when two gears mesh, the smaller one turns faster in the ratio of their
tooth counts, and the two turn opposite ways; gears on the same shaft turn
together. Follow the train from the first gear to the last and multiply the
ratios — the caption gives the answer to check against. On the planetary
page, hold the ring still and turn the sun: the carrier turns slower by
one plus ring teeth over sun teeth. The line-art page colours well with
metallic pencils: give each layer of gears its own metal, and shade the
lower layer darker so the upper one stands out.

## Purpose

To show machinery that is right, not just gear-shaped: true tooth profiles,
correct spacing and real ratios, so the poster can be read the way an
engineer or clockmaker would read it.

## History

Toothed wheels go back at least to the third century BC; the Antikythera
mechanism (second or first century BC) used dozens of small triangular-
toothed gears, including an epicyclic (planetary) stage. Su Song's
astronomical clock tower at Kaifeng (1088) drove its armillary sphere
through a long gear train, and European tower clocks from the fourteenth
century used the going train and motion work still found in clocks today.
The idea that teeth should be shaped so that gears turn smoothly at a
constant ratio was studied by Philippe de La Hire (1694) and Leonhard
Euler, who proposed the involute in the 1750s and 1760s. Robert Willis
(*Principles of Mechanism*, 1841) put tooth design on a systematic footing;
his odontograph used the 14.5° pressure angle that remained common into the
twentieth century, when 20° became the standard (ISO 53). Christian
Schiele's hobbing machine (1856) and Edwin R. Fellows's gear shaper (1897)
made accurate involute gears cheap to cut. The metric module (pitch
diameter over tooth count) is the basis of ISO and DIN gear standards.

## This implementation

- **Spec knobs:** `width`, `height` (points); `mode` (`train`, `planetary`,
  `clock`, `blueprint`; default `train`); `style` (`brass`, `blueprint`,
  `lines`; default `brass`); `gears` (2-40, default 24; train mode — the
  train stops early when the page is full); `module` (tooth size in points
  on a 600-point page, 2-30, default 5; train mode, the other modes scale
  to fit); `planets` (2-8, default 3; planetary mode); `pressure_angle`
  (14.5-30°, default 20); `web` (`auto`, `solid`, `spokes`, `holes`);
  `labels` (tooth counts and the caption); `stroke` (0.2-4).
- **Generation:** each flank is the involute of the base circle
  `r_b = r cos α`; at radius `ρ` a tooth spans `±ψ(ρ)` with
  `ψ = s/2r + inv α − inv(arccos(r_b/ρ))`, `inv φ = tan φ − φ`, `s` half
  the circular pitch less a 0.04-module backlash. Addendum one module,
  dedendum 1.25, root fillets as short arcs, a radial flank below the base
  circle; ring teeth are the spaces of a spur gear of the same count.
  Tooth counts never go below `2/sin²α` (no undercut). A meshing gear sits
  at centre distance `m(z₁+z₂)/2` (`m(z_r−z_p)/2` inside a ring) and is
  turned so that a feature `u` past the pitch point on one gear meets the
  feature `−(z₁/z₂)u` (inside a ring `+(z_r/z_p)u`) on the other, offset
  half a pitch into a gap. The train grows by seeded placement: a new gear
  meshes one existing gear, or rides on an existing shaft one layer up,
  and is kept only if it clears every other gear in its layer and no shaft
  runs through a gear in a layer it passes. The planetary set picks sun and
  planet counts until `(z_sun + z_ring)/n` is whole and the planets clear
  each other, with `z_ring = z_sun + 2z_planet`. The clock uses stages
  5 × 4 × 3 = 60 and motion work `5k/15k` and `4k/16k` (3 × 4 = 12, equal
  centre distances, a finer module), its shaft angles searched for the
  largest layout that fits.
- **Guarantees:** deterministic per seed. Every meshing pair has equal
  modules and centre distance `m(z₁±z₂)/2` to 1e-9 (`max_centre_error` in
  meta); closing the planetary ring re-derives every planet's phase from
  the ring to 1e-9 (`max_phase_error`). Tested independently by sampling:
  turning each pair through a tooth pitch in seven steps at the exact
  ratio, no point of either toothed outline enters the other gear, and the
  outlines stay within 0.12 module (the teeth interleave). Non-meshing gears
  in a layer never overlap; no shaft passes through a gear it does not
  carry; the ring is `z_sun + 2z_planet` and `(z_sun + z_ring)/n` is whole;
  the clock reports 60:1 and 1:12 from its own tooth counts; the train
  ratio is the exact product of tooth counts (`train_ratio`,
  driver:output). `verification: involute_mesh_checked`. The line-art page
  passes the adult colourability check. Clamped knobs are reported as
  `requested_<field>`.
