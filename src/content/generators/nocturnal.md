---
title: "Nocturnal Star Clock"
blurb: "Nocturnal: a print-and-make star clock — set the date, sight the pole, lay the arm on the pointer stars and read the time"
category: design
version: "1.0.0"
---
Print, cut and pin together a star clock: set tonight's date, sight the Pole
Star, line up the pointers and read the time.

## What it is

A nocturnal is a hand instrument for telling the time at night. The stars
near the celestial pole turn round it once a day like the hand of a giant
clock, and the Plough's two pointer stars (or Kochab in the Little Bear, or
the Southern Cross in the southern sky) are that hand. The page holds three
parts to cut out and stack on one pivot: a base with a handle and a ring of
dates, an hour disc with a midnight tooth, and a long arm. Turn the tooth to
the date, look at the pole through the hole in the middle, swing the arm onto
the pointer stars, and the arm's edge shows the time on the hour disc.

## How to use it

1. Glue the page to thin card and cut out the base, the hour disc and the
   arm.
2. Make a hole at each cross and join the three parts, base at the back and
   arm on top, with an eyelet or a short piece of drinking straw, so you can
   see through the middle and the parts still turn.
3. Turn the hour disc until its MIDNIGHT tooth points at tonight's date — the
   date of the evening, even after midnight.
4. Go out on a clear night. Hold the handle straight down and, in the north,
   look at Polaris through the hole (in the south, at the south celestial
   pole: follow the long bar of the Southern Cross from Gacrux to Acrux and
   go on about four and a half times its length).
5. Hold the instrument square to your line of sight, swing the arm until its
   edge lies on the pointer stars, and read the time where the edge crosses
   the hour disc. The disc is ticked every ten minutes. Add an hour when
   clocks are on summer time.

## Purpose

A working scientific instrument made from paper, and a way to feel the
sky's rotation: the stars keep sidereal time, four minutes a day faster than
the clock, which is exactly why the date ring is needed. It connects a
night-sky walk with timekeeping, angles and the calendar.

## History

Nocturnals were made from the 13th century, described by Ramon Llull, and
were common navigators' tools in the 16th–18th centuries, usually in brass or
boxwood; Michiel Coignet and others published designs, and surviving
examples are in the National Maritime Museum, Greenwich, and the Museum of
the History of Science, Oxford. Most were cut for the Plough's guards or for
Kochab and Pherkad. The sidereal-time formula is Meeus, *Astronomical
Algorithms* (2nd ed., 1998), ch. 12; star positions are from the Yale Bright
Star Catalogue (5th ed., public domain), precessed with Meeus ch. 21.

## This implementation

- **Spec knobs:** `pointer` (dubhe_merak, kochab, crux); `year` the date ring
  is made for (1900–2100); `longitude` (east positive) and `utc_offset`
  (hours) so it reads your zone's clock time (both 0 reads UTC); `palette`
  (auto, brass, midnight, verdigris, parchment, ink); `page`; `margin_mm`.
- **Generation:** with the instrument square to the polar axis, the arm's
  angle from "up" is the pointer star's hour angle H = LST − α★
  (anticlockwise facing north, clockwise facing south). At clock time T hours
  from the midnight ending date d, H = GMST(0h UT of d+1) + λ − α★ +
  R·(T − offset) with R = 360.98564736629° per 24 h. So the date ring puts
  date d at GMST(0h of d+1) + λ − α★ − R·offset, one mark per day of the
  chosen year, and the hour disc puts T at R·T past its tooth: hours are
  spaced at the sidereal rate (15.041° an hour), not 15°, so the reading is
  exact all night, and the 1° overlap falls at noon, when no stars are seen.
  The star's position is moved by proper motion and precessed to the middle
  of the year. The seed varies only decoration: palette (when `auto`), the
  border pattern, the rose on the hour disc and the motto on the handle.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; `verification: time_readback_exact` — for
  200 random dates and clock times per configuration, the hour angle computed
  independently from local sidereal time at that instant, set on the drawn
  instrument, reads back the clock time to within half the smallest tick
  (5 minutes); off the tick grid the continuous reading is exact to under half
  a second; the date ring holds every day of the year once, in order; the
  three parts fit inside the margins without overlapping on every page size;
  clamped knobs are reported (`requested_<field>`); the ink palette is grey
  only. Polaris lies about 0.65° from the true pole; sighting it instead of
  the pole adds a small error that varies through the night.
