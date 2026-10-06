---
title: "Weave"
blurb: "Weaving drafts — overshot stars, roses and tables and point, broken, rosepath and M's & W's twills, with threading, tie-up, treadling and drawdown, floats capped"
category: design
version: "1.0.0"
---
Weaving drafts for overshot coverlets and twills: threading, tie-up,
treadling and drawdown, ready to dress a loom — or a woven pattern to hang
or colour.

## What it is

A weaving draft is the weaver's sheet music. Four small charts work
together. The **threading** across the top shows, for every warp thread, the
shaft its heddle hangs on. The **tie-up** in the corner shows which shafts
each treadle lifts. The **treadling** down the side shows which treadle to
press for each pass of the weft. The **drawdown** — the big grid — is what
the cloth will look like: a square shows the warp where that thread's shaft
is lifted by that row's treadle, and the weft everywhere else.

Two families are drafted here. **Overshot** is the classic coverlet weave: a
thick, coloured pattern weft floats over a fine plain-weave ground in
blocks that grow and shrink into stars, roses and tables. The **twills** —
point twill, broken twill, rosepath and M's and W's — make diamonds,
zigzags and small all-over figures on four or eight shafts.

## How to use it

- **As a draft (the default).** Thread the warp from the threading chart,
  reading the end numbers from the right; tie the treadles as the tie-up
  shows (a black square means the treadle lifts that shaft — a rising
  shed); then weave row by row down the treadling. For overshot, weave a
  plain-weave (tabby) pick with treadles 5 and 6 alternately after every
  pattern pick, in a fine thread close to the warp; the drawdown leaves the
  tabby out so the pattern is easy to read, or switch on `show_tabby` to see
  every pick. The colour key gives warp and weft.
- **As a drawdown page.** The woven pattern alone, repeated to fill the
  page in two colours — a striking graphic print or a reference for a
  finished piece.
- **As a colouring page.** The pattern's warp and weft patches outlined as
  closed shapes, large enough to colour. Colour it as the cloth (two
  colours) or freely.

## Purpose

Weavers buy drafts by the book: a good overshot or twill draft is hours of
design and checking, and the most common fault in a home-made one is a
float — a thread that skips over too many others and will snag. This
generator designs fresh drafts in the traditional structures, checks every
float in the woven cloth against a limit, and shows the result before a
single thread is wound.

## History

Overshot was the great coverlet weave of 18th- and 19th-century North
America, woven on four-shaft home looms in wool over cotton or linen, with
drafts handed on as written notes and given names by their weavers. Its
roots are in the block weaves of Scandinavia and Britain. Twills are far
older — the diagonal weave appears in prehistoric European textiles — and
point twills, broken twills and rosepath (a Scandinavian favourite for rugs
and bands) are among the oldest variations on it. M's and W's is a
twill-based weave named for the letter shapes its threading makes. The
draft notation used here — threading above, tie-up to the right, treadling
down the side — is the standard American layout.

## This implementation

- **Spec knobs:** `output` (`draft`, `drawdown`, `colouring`),
  `structure` (`overshot` — the default — `point_twill`, `broken_twill`,
  `rosepath`, `m_and_w`, or `auto`), `motif` for overshot (`auto`, `star`,
  `rose`, `table`), `shafts` (4 or 8, for the point and broken twills;
  overshot, rosepath and M's & W's are four-shaft weaves), `max_float`
  (3-15, default 9), `ends` (16-200, rounded to whole repeats plus a
  balancing end or block), `picks` (0 squares the draft, or fills the page
  for the drawdown and colouring outputs), `show_tabby`, `palette` (`auto`,
  `indigo`, `madder`, `walnut`, `moss`, `plum`, `saffron`), page
  `width`/`height`, `stroke`.
- **Generation:** overshot designs a half profile — a walk once round the
  blocks A (shafts 1-2), B (2-3), C (3-4), D (4-1), each block moving to a
  neighbour — with seeded block sizes shaped by the motif (growing to the
  centre for a star, large outer petals round a small centre for a rose,
  one large block framed by small ones for a table), and mirrors it into a
  repeat. Each block is threaded as alternating ends on its two shafts,
  starting on whichever keeps odd and even shafts alternating across the
  whole warp, so tabby always weaves. The tie-up is a 2/2 twill (block A's
  treadle lifts shafts 3-4 so the pattern weft floats over block A) plus two
  tabby treadles; the treadling is *as drawn in* (tromp as writ), each block
  woven for as many picks as it has ends. Twills draw a seeded twill tie-up
  (2/2, 3/1, 1/3 on four shafts; eight-shaft twills such as 3/1/1/3 and
  2/2/1/3) and a threading — point twill as a mirrored walk of seeded legs,
  broken twill as 1-2-4-3 (and 5-6-8-7), rosepath 1-2-3-4-1-4-3-2, M's & W's
  as a point twill whose points oscillate — treadled as drawn in. The
  drawdown is computed by the rule above. The colouring page shows a
  centred window of the drawdown, cropped until every patch away from its
  edge is large enough to colour exactly as woven; slivers cut off at the
  edge are merged into a neighbour.
- **Solving:** nothing to solve; the checks are the guarantees below.
- **Guarantees:** no float in the woven cloth — overshot with its tabby
  picks included — is longer than `max_float` threads, scanning every row
  and column (`floats_within_cap`, `max_float_rows`, `max_float_columns`);
  drafts that exceed it are redesigned with smaller blocks or another
  tie-up. Some structures cannot weave below a floor, and their cap is
  raised to it and reported as `max_float_cap`: overshot 4, M's & W's 5
  (its oscillating points always make a 5-float), other twills 3. No
  treadle lifts every shaft or none (`tieup_ok`). Overshot threadings
  alternate odd and even shafts, so the tabby is true plain weave. The
  drawdown obeys warp-up ⇔ `tieup[threading[end]][treadling[pick]]`,
  re-checked independently in tests. Colouring pages are checked against
  the adult colourability rules (`colorable`; `interior_as_woven` says
  whether the window's interior needed no merging). Motifs are named for
  their shape (star, rose, table); no draft claims to be a specific named
  historic pattern.
