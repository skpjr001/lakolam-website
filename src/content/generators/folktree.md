---
title: "Folk Tree of Life"
blurb: "Folk tree of life: a mirrored tree grown from a vase, with flowers sized to the space at every branch end"
category: design
version: "1.0.0"
---
A mirror-symmetric tree of life rising from a vase, every branch ending in a flower sized to the space around it.

## What it is

The tree of life growing out of a vase or a hill is one of the oldest motifs of
European folk art. It is painted on dowry chests and walls, embroidered on cloths and
cut from paper, and wherever it appears it follows the same rules: a central stem and
perfect mirror symmetry; branches that sweep outward and up; a flower at the end of
every branch — roses, tulips, the Hungarian "paprika" teardrop, pomegranates, buds —
leaves along the stems, and every remaining gap filled with buds on little stalks
(*horror vacui*, the fear of empty space).

This page grows a new tree by those rules. Palettes follow three traditions: vivid
reds, pinks, yellow and blue on black, in the manner of Matyó embroidery; clear blues,
pinks and greens on white, in the manner of Kalocsa painting; watercolour red, ochre,
green and blue on cream, in the manner of Pennsylvania German fraktur. A line-art
version is for colouring.

## How to use it

Frame it, or colour the line-art version. Folk painters colour symmetrically — a
flower and its mirror twin always match — and in a few strong, flat colours with a
second colour in the heart of each flower. Paint the stems one green and the vase a
single bold colour with its dots in another.

## Purpose

A cheerful, balanced wall picture and a classic colouring page, carrying a motif shared
by many peoples of Central Europe and their emigrant communities.

## History

The tree of life from a vase is found in the folk art of Hungary, Poland, Slovakia,
Ukraine, Romania and beyond, and travelled with German-speaking emigrants to
Pennsylvania, where it decorates fraktur — illuminated birth and baptism certificates
and house blessings — from the eighteenth century. The Matyó people of
Mezőkövesd in northern Hungary are known for dense, brightly coloured floral
embroidery (inscribed by UNESCO as intangible cultural heritage in 2012); the
painters ("pingáló asszonyok") of Kalocsa decorate walls and cloths with bright
flowers; the Kurpie region of Poland is famous for symmetrical paper-cut trees
(*leluja*). These are living traditions practised by their communities today. This
page is a geometric grammar in the manner of these traditions and copies no
particular work.

Sources: Edit Fél and Tamás Hofer, *Hungarian Folk Art* (Corvina, 1979);
Frederick S. Weiser, *The Gift Is Small, the Love Is Great: Pennsylvania German
Small Presentation Pieces* (1994); UNESCO, "Folk art of the Matyó, embroidery of a
traditional community" (2012); Adam Runions et al., "Modeling Trees with a Space
Colonization Algorithm" (2007), for the growth model.

## This implementation

**Spec knobs:** `frame` (auto, rect, oval, arch); `base` (auto, vase, mound);
`branches` (main branches per side, 2–10; 0 = 5–8 by the seed); `fill` (buds in the
gaps); `palette` (auto, matyo, kalocsa, fraktur, line_art); `stroke`; page `width`,
`height`, `margin`.

**Generation:** a straight trunk rises from the vase. Each main branch is grown by
space colonisation from its own point on the trunk toward a small cloud of
attractors — low branches reach out sideways, high ones upward — in the right half
only, then bowed upward into an arch; a branch that would cross or crowd one already
grown is regrown. The whole right half is then reflected exactly in the axis. Every
motif fits a circle: the crown flower on the trunk, then a flower beyond each branch
end, roomiest first, whose circle is the *free radius* there (the distance to the
nearest stem, motif, frame, vase or the axis — the axis keeps it off its own mirror
image); then leaves at alternate internodes; then buds and small flowers on short
stalks wherever a stem is the nearest thing. Each motif is drawn twice, the second
time smaller in an accent colour.

**Solving:** Nothing to solve.

**Guarantees:** the page is exactly mirror symmetric (the left half is drawn as the
reflection of the right; every motif, stem and the base has its mirror image); no
grown node crosses the axis; no two motifs overlap — every motif lies inside its
circle and no two circles intersect; all ink is on the page.
