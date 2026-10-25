---
title: "Sea-Urchin Tests"
blurb: "Sea-urchin tests plate by plate — ambulacra with pore pairs, tubercles, apical disc and madreporite — as regular urchins, sand dollars and heart urchins"
category: design
version: "1.0.0"
---
The shell of a sea urchin seen from above, plate by plate: twenty columns
of plates, the pores of the tube feet, the spine bases and the five-fold
star of the apical disc.

## What it is

Under its spines a sea urchin has a shell, the test, made of small
interlocking plates. They run in twenty columns from the top of the animal
to its mouth underneath, paired into ten double columns: five narrow
*ambulacra*, whose plates are pierced by pairs of pores for the tube feet,
and five wider *interambulacra* carrying the big knobs (tubercles) on which
the spines swivel. The two columns of each pair are offset by half a plate,
so the seam between them zig-zags. New plates are added at the top, at the
apical disc, and every plate keeps growing as younger ones push it down, so
plates get bigger from the top to the rim. The apical disc has five genital
plates, each with a pore for releasing eggs or sperm, five tiny ocular
plates, and in one genital plate a sieve, the madreporite, through which
water enters the animal — the only part that breaks the five-fold symmetry.

A **regular** urchin is round with big tubercles. A **sand dollar** is a
flat disc whose pores form a five-petalled flower, with five slots
(lunules) right through it. A **heart urchin** is drawn out into a heart,
with four petals and a groove in front.

## How to use it

- **Frame it.** The dark-ground versions look like museum specimens; the
  sand dollar is a seaside classic.
- **Count by fives.** How many ambulacra? How many pore rows? How many
  genital pores? Then find the one plate that is different.
- **Follow a column.** Trace one column of plates from the centre out: do
  the plates get bigger or smaller? Where are the youngest plates?
- **Colour it.** The black-and-white version is a mandala-like colouring
  page: colour the ambulacra one colour and the interambulacra another.

## Purpose

A sea-urchin test is a clear case of how growth makes form: one simple rule
— add plates at the top, let every plate grow — explains the whole shell.
The page shows that rule and the animal's five-fold body plan together.

## History

Ernst Haeckel drew echinoderms in *Kunstformen der Natur* (1899–1904) and
D'Arcy Thompson discussed the test in *On Growth and Form* (1917). David
Raup ("Theoretical morphology of echinoid growth", Journal of
Paleontology, 1968) showed how plate addition at the apex and plate growth
build the test, and the shape of the sand dollar's lunules and petals has
been studied by Telford, Mooi and others since the 1980s.

## This implementation

- **Spec knobs:** `form` (`regular` default, `sand_dollar`, `heart`,
  `auto`), `plates` (plates per interambulacral column, 4-40; ambulacral
  columns get 1.6 times as many), `tubercles` (spine bases and granules),
  `palette` (`auto` default, `lilac`, `green`, `rose`, `sand`, `ink`),
  `line`, `width`, `height`, `margin`.
- **Generation:** each column's plate boundaries run from the apical disc
  to the ambitus with heights growing geometrically outward (a seeded rate
  of 4-10% per plate); the second column of each area is offset by half a
  plate (its last plate merged so heights still rise). Plates are polygons
  in polar coordinates: arcs top and bottom, a straight adradial edge, and
  the zig-zag median suture whose vertices lean alternately into each
  column. Regular urchins get a primary tubercle (boss, mamelon, areole)
  and a few secondary tubercles on every interambulacral plate, and a pore
  pair by the outer edge of every ambulacral plate. Sand dollars and heart
  urchins get lens-shaped petals lined with conjugate pore pairs, a
  scattering of tiny granules, and (sand dollar) five lunules beyond the
  petals. One fifth of the test is built and turned by 72° four times; the
  apical disc gets five pentagonal genital plates with gonopores, five
  ocular plates and ten periproct platelets; one genital plate, chosen by
  the seed, is the madreporite with its sieve pores. The heart urchin is a
  warp of this layout — longer than wide, notched in front, the apex
  forward — with the front petal removed and its ambulacrum shaded as a
  groove, and shorter hind petals.
- **Solving:** Nothing to solve.
- **Guarantees:** regular urchins and sand dollars are exactly five-fold
  symmetric apart from the madreporite's sieve (every point turned by 72°
  lands on a point of the test); pore pairs lie only in the ambulacra;
  plate heights never shrink outward in any of the twenty columns; heart
  urchins have exactly four petals; deterministic per seed; all ink inside
  the page. `verification: plates_grow_outward`. Clamped `plates` and
  `line` are reported as `requested_*`.
