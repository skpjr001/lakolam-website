---
title: "Leaf Chart"
blurb: "Botanical leaf charts — shapes, margins and venation, simple and compound leaves, labelled"
category: design
version: "1.0.0"
---
A botanist's chart of leaves: their shapes, their edges and the pattern of
their veins, each one named.

## What it is

Every leaf can be described in a few words: its overall shape (ovate,
lanceolate, cordate...), the form of its base and its tip, its edge or
*margin* (smooth, toothed like a saw, scalloped, wavy, lobed) and the way
its veins run. Field guides use these words to tell trees apart. These
pages draw a sheet of leaves, each labelled with its shape, margin and
venation, or one large leaf with its parts named: apex, base, margin,
midrib, side veins and stalk.

The leaves are drawn from rules, not traced: an outline whose width rises
and falls along the midrib, teeth cut into its edge, and veins laid inside.
Simple leaves sit beside compound ones - leaflets in pairs along a stalk,
twice-divided fronds of tiny leaflets, five or seven leaflets spread like a
hand, and the three leaflets of a clover or strawberry.

## How to use it

- **Learn the words.** Each leaf is labelled with its shape and margin,
  and below that its vein pattern: *craspedodromous* (side veins run
  straight out to the teeth), *brochidodromous* (side veins loop and join
  before they reach the edge), *actinodromous* (main veins spread from the
  base like fingers) and *parallel*.
- **Take it outdoors.** Collect leaves and match them to the chart. Which
  ones have teeth? Do their side veins end in a tooth, or loop?
- **Name the parts.** The single-leaf page points out the apex, base,
  margin, midrib, side veins and stalk; the line-art version makes a good
  worksheet to label by hand.
- **Colour it.** The colouring version keeps the veins as lines that
  divide each leaf into spaces to colour - in summer greens, or in autumn
  reds and golds.
- **Frame it.** The coloured sheets, in summer, spring, autumn or pressed
  herbarium tones, make a calm botanical print.

## Purpose

Leaf shape and margin are among the first clues used to identify a plant,
and the vein pattern is how botanists and palaeobotanists classify leaves
(even fossil ones). A chart that puts the terms beside clear examples makes
them easy to learn and to use - and the regular geometry of a leaf, drawn
carefully, is beautiful in itself.

## History

Naming leaf shapes goes back to Linnaeus, whose *Philosophia Botanica*
(1751) set out terms such as ovate, lanceolate and cordate that are still in
use. Nineteenth-century textbooks and wall charts drew rows of outlines for
students to learn, and herbarium sheets - pressed specimens on paper - have
been the botanist's record since the sixteenth century. The vein
vocabulary used here (craspedodromous, brochidodromous, actinodromous) was
systematised by Leo Hickey (1973, *American Journal of Botany* 60:17-33)
and is set out in the *Manual of Leaf Architecture* (Ellis, Daly, Hickey et
al., 2009). The idea that leaf margins can be described as a smooth shape
with teeth cut into it follows the same manual's treatment of teeth as
features of the margin, each with its own vein running to it.

## This implementation

- **Spec knobs:** `layout` (`sheet` default, `single`); `leaves` (6-16, a
  sheet; default 12); `leaf` (`auto` default - a varied set - or one kind
  for every leaf: `ovate`, `elliptic`, `lanceolate`, `obovate`, `cordate`,
  `orbicular`, `linear`, `oblanceolate`, `deltoid`, `reniform`, `oblong`,
  `doubly_serrate`, `pinnately_lobed`, `palmately_lobed`, `pinnate`,
  `bipinnate`, `palmate_compound`, `trifoliate`); `set` (`mixed` default,
  `simple`, `compound`; used when `leaf` is `auto`); `leaf_margin` (`auto`
  default - each leaf its own - `entire`, `serrate`, `dentate`, `crenate`,
  `doubly_serrate`, `sinuate`); `venation` (`auto` default,
  `craspedodromous`, `brochidodromous`, `palmate`, `parallel`);
  `tertiaries` (the ladder-like fine veins, default on); `teeth` (teeth per
  side of a typical simple leaf, 4-80, default 24); `palette` (`auto`,
  `summer`, `spring`, `autumn`, `herbarium`; colour style only); `style`
  (`colour` default, `ink`, `colouring`); `labels`; `title` (empty for
  none); `line` (0.2-3); `width`, `height`, `margin`.
- **Generation:** a pinnate blade's half-width along the midrib is
  `w(s) = W·s^α·(1 − s)^β`, normalised to peak at `W` (at `s = α/(α+β)`);
  a cordate base folds auricles back past the petiole, an attenuate base
  multiplies `w` by a smoothstep taper, an acuminate apex pinches into a
  drip tip, and pinnate lobes are a smooth low-frequency modulation of `w`.
  Palmate blades (maple-like, orbicular, reniform) are a polar outline
  about the petiole junction with pointed crests and rounded sinuses. Each
  side has its own slight asymmetry. The margin is cut by arc length: each
  tooth spans one pitch and pushes the curve inward by `depth·(1 − f(φ))`,
  where the tooth profile `f` is 1 only at the tip (serrate: leaning toward
  the apex; dentate: symmetric; crenate: rounded; doubly serrate: small
  teeth on the flanks of large ones; sinuate: shallow waves). The pitch is
  the side's length over `teeth` times the margin's own factor, the count
  is the toothed length over the pitch, rounded, and lobe crests are
  anchors so a tooth tip sits on every lobe point. A tooth is shrunk as a
  whole where the curve bends too sharply or the lobe is too narrow; if
  the outline is still not simple, every tooth's depth is reduced until it
  is. Craspedodromous secondaries are quadratic curves from the midrib
  that end on a chosen tooth tip; brochidodromous ones stop at 84% and are
  joined by loops; actinodromous blades send primaries from the base to the
  lobe tips (or to points around an unlobed blade) and branch secondaries
  off them at about 42°; percurrent tertiaries are rungs at equal fractions
  between neighbouring secondaries. Compound leaves place small blades
  along a rachis, on pinnae, fanned from the petiole tip, or in a three.
  Leaves are fitted tip-up into their cells with a slight seeded tilt; the
  seed also picks the set of leaves, their proportions and colours.
- **Solving:** Nothing to solve.
- **Guarantees:** every blade outline is a simple polygon (no edge
  touches any but its neighbours; checked exactly, `outlines_simple` in
  meta); every craspedodromous or actinodromous vein that reaches the
  margin ends exactly on a tooth tip (or, on an untoothed leaf, a vertex of
  the outline) - `verification: craspedodromous_veins_end_at_tooth_tips`;
  every tooth tip is a vertex of the outline; the number of teeth on a
  side is its toothed length over the pitch, rounded, so doubling `teeth`
  doubles it; deterministic per seed; ink inside the page. Clamped
  `leaves`, `teeth` and `line` are reported as `requested_*`.
