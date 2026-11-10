---
title: "Lai Thai Flame Scrolls"
blurb: "Lai Thai flame-scroll ornament in the manner of Thai gold-on-lacquer work: kranok on curling stems, rosettes and corner pieces in a mirror-symmetric panel, medallion or border strips"
category: design
version: "1.0.0"
---
Thai-style kranok ornament: flame-leaf scrolls, rosettes and corner
pieces, gold on black or red lacquer, in a mirror-symmetric panel,
medallion or set of border strips.

## What it is

*Lai Thai* (ลายไทย, "Thai pattern") is the classical ornament of Thailand,
seen on temple shutters, manuscript cabinets, book covers and textiles.
Its signature motif is the *kranok* (กนก): a pointed, flame-like leaf whose
back edge breaks into curling tongues that lick toward its tip, the tip
itself curling over. Kranok grow from curling stems — the *kan khot*
(ก้านขด), "coiled stem" — and are combined with rosettes (*dok*, flowers),
upright flames and triangular corner pieces into dense patterns that are
mirror symmetric about a central axis. This page builds that ornament in
the manner of the tradition, from its rules, in three layouts: a tall panel
like a door or window shutter, with a running border, corner pieces and a
stack of rosettes on the axis; a square medallion; and a sheet of border
strips. Every motif is generated fresh — no named pattern or object is
copied — and no figure, deity or building is drawn.

## How to use it

The colour pages are prints in the classic look of gold leaf on black
lacquer, or gold on red. The line-art page is a colouring sheet: colour the
motifs gold or yellow and the ground black, dark blue or red for the
traditional effect, or give each family of motifs — scrolls, flames,
rosettes — its own colour. Because both halves mirror each other, colouring
the two sides alike keeps the balance; the border strips can be cut apart
and used as bookmarks, or framed as a band.

## Purpose

A faithful construction of the grammar of Lai Thai — flame-leaves on
coiled stems, mirrored about an axis, packed tight, framed by borders that
turn their corners cleanly — with the guarantees a print needs: exact
symmetry and motifs that never collide.

## History

The kranok family of motifs developed in Siamese art of the Ayutthaya
period (1351–1767) and was codified in the Rattanakosin (Bangkok) period
from 1782, when royal craftsmen's workshops (the *Chang Sip Mu*, "ten
crafts") taught it as a fixed vocabulary — the three-part *kranok sam tua*,
the long *kranok hang hong*, the slender *kranok plew* and their relatives —
learned by copying from masters' pattern books. Its most celebrated medium
is *lai rot nam* (ลายรดน้ำ, "water-rinsed design"), gilded black lacquer: the
craftsman coats wood with black *rak* lacquer (from the sap of the Burmese
lacquer tree), paints the parts that must stay black with a water-soluble
resist of gum and yellow pigment, lays gold leaf over the whole surface on a
thin tacky lacquer, and then washes the resist away so the gold remains
only where the pattern is. Late-Ayutthaya scripture cabinets (*tu phra
tham*) in the National Museum, Bangkok, and the Lacquer Pavilion at Suan
Pakkad Palace in Bangkok — an Ayutthaya-period building moved there in the
1950s by Prince and Princess Chumbhot of Nagara Svarga — are famous
examples. Red lacquer grounds and gilding on carved wood carry the same
ornament on temple doors and window shutters.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200–3000); `composition`
  (`panel` — a tall shutter panel, the default; `medallion`; `borders`);
  `style` (`black_lacquer`, `red_lacquer`, `lines`); `tiers` (rosette tiers
  on the panel's axis, 1–6, default 3); `tongues` (most tongues on one
  kranok, 2–5, default 4); `density` (how hard the filler packs the space
  left by the scrolls, 0–1, default 0.7); `stroke` (line weight multiplier,
  0.2–4).
- **Generation:** a kranok is a body along a spine whose heading is
  integrated — a slight counter-bend, then a tip curl — so the spine is an
  S-curve; the back edge carries two to five tongues (a profile rising
  slowly and dropping sharply, sheared toward the tip so each tongue leans
  forward), the inner edge is smooth and the base cut flat; tongues shorten
  toward the tip. Incised lines (a rib and a cut at each notch) are drawn in
  the ground colour. Stems are Euler spirals (curvature rising along them)
  drawn as tapering ribbons with a round end. The grammar grows scrolls from
  rosettes or flames on the axis: kranok sprout on the outer side of each
  stem, some joints branch into a smaller scroll curling the other way, and
  free kranok (rising up the panel, or radiating in the medallion) and small
  rosettes fill what is left, largest first. Placement is rejection on an
  ownership grid: each motif owns its cells and a one-gap halo; a new motif
  must land on free cells (a leaf may touch only the stem it grows from).
  Growth happens in a fundamental region — the right half of the panel, one
  eighth of the medallion's disc, one quarter of the medallion page outside
  the ring, the right half of a border unit — and is mapped by the
  composition's mirrors. The panel's running border has rosettes in square
  corner cells and an odd number of cells along each edge, kranok leaning
  toward a central flame from both ends; triangular corner pieces (a flame
  on the triangle's axis between two mirrored kranok, shrunk until they fit
  with a gap) fill the field's corners. The border sheet stacks flame
  teeth, a band of repeated scroll units, a band of up and down triangles,
  the scroll band mirrored, and the teeth again.
- **Guarantees:** deterministic per seed. Mirror symmetry is exact (to
  1e-6 pt): every shape's mirror image is another shape of the page, for the
  panel's and border sheet's vertical axis, both axes of the medallion page,
  and all eight symmetries of the square in the medallion's disc (tested).
  Every outline is a simple closed curve (checked when built, and tested
  independently with lako-geom's arrangement; `outlines_simple`). No two
  motifs overlap — the polygon intersection of every kranok, flame and
  rosette pair is empty (tested; stems are excluded, as kranok grow from
  them). Running borders close: their cells tile each band exactly, corners
  included (tested). All ink lies inside the page (tested), and the
  line-art page passes the adult colourability check (`colorable`, tested at
  the defaults). Clamped knobs are reported as `requested_<field>`.
  `verification: mirror_exact_outlines_simple_motifs_disjoint_borders_closed`.
