---
title: "Tonnetz"
blurb: "Tonnetz: chord progressions as glowing paths of triads on Euler's tone network and the circle of fifths"
category: design
version: "1.0.0"
---
Chord progressions drawn as glowing paths of triangles on Euler's tone
network, and again round the circle of fifths.

## What it is

The Tonnetz ("tone network") lays the twelve notes out on a triangular
lattice. Step to the right and you go up a perfect fifth (C, G, D, A …);
step up and to the right and you go up a major third (C, E, G#); the third
direction, down and to the right, is a minor third (C, Eb). Every small
triangle then holds three notes that make a chord: the upward-pointing
triangles are major chords, the downward ones minor. Two triangles that
share an edge share two notes, so moving from one to its neighbour changes
a single note by a step — the smoothest chord change there is.

Music theorists name those three edge-flips. **P** (parallel) keeps the
fifth and swaps major for minor (C to c). **R** (relative) keeps the major
third (C to a). **L** (leading-tone exchange) keeps the minor third (C to
e). Two longer moves keep just one note: **N** (Nebenverwandt, C to f) and
**S** (slide, C to c#). Because the twelve notes repeat, the lattice
repeats too: it is really a doughnut-shaped surface holding all 24 major and
minor chords, tiled across the page.

A page draws one progression on the lattice — a random walk, or a famous
pattern: the chain of alternating R and L moves in the second movement of
Beethoven's Ninth Symphony, the hexatonic cycle (P, L, P, L …), the
octatonic cycle (P, R, P, R …), ii–V–I in key after key, or the chords of
John Coltrane's "Giant Steps" — together with the same chords linked round
the circle of fifths, and a strip that spells the progression out.

## How to use it

Start at the white dot and follow the glowing line: each triangle it
passes through is a chord, and each bend flips across an edge. Play the
chords on a piano and listen to how little each change moves — usually one
finger by one step. Where a step leaves the window, the path jumps to
another copy of the same chord elsewhere on the lattice, marked by two
small rings; on the real doughnut-shaped Tonnetz it never jumps at all. The
faintly shaded triangles are every other copy of the chords the path
visits: notice how a cycle that returns to its first chord still drifts
across the lattice, because it has wound once round the doughnut. In the
circle of fifths below, major chords sit on the outer ring and each minor
chord inside its relative major; the strip lists the chords with the moves
between them (a word like "PRL" means three moves in turn). Colour the
chords by Scriabin's key colours, by place on the circle of fifths, or by
the move that reached them.

## Purpose

A picture of harmony that is true to how the chords relate: neighbours on
the page are chords a pianist can reach by moving one finger, and the
famous cycles show up as straight lines and hexagonal columns. It makes a
striking print for a music room and a working diagram for a theory lesson.

## History

Leonhard Euler drew the first such lattice, of fifths and major thirds, in
his *Tentamen novae theoriae musicae* (1739). Arthur von Oettingen (1866)
and Hugo Riemann (from the 1880s to his *Ideen zu einer "Lehre von den
Tonvorstellungen"*, 1914–15) built their theories of harmony on it, and
the name *Tonnetz* comes from that German tradition. In the 1980s and 90s
David Lewin (*Generalized Musical Intervals and Transformations*, 1987)
and Brian Hyer (dissertation 1989; "Reimag(in)ing Riemann", 1995) recast
Riemann's chord relations as the transformations P, L and R; Richard Cohn
(1996, 1997; *Audacious Euphony*, 2012) showed the hexatonic and octatonic
cycles and pointed to the long R–L chain in the second movement of
Beethoven's Ninth Symphony. The slide was named by Lewin; the
Nebenverwandt ("next related") is Riemann's term. The circle of fifths
goes back to Nikolay Diletsky's *Grammatika* (1679) and Johann David
Heinichen (1711, 1728). Alexander Scriabin associated keys with colours
and wrote a part for a colour organ (*luce*) into *Prometheus: The Poem of
Fire* (1910); the colours here follow the commonly reproduced reading of
his scheme. John Coltrane recorded "Giant Steps", with its tonal centres a
major third apart, in 1959.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200–3000); `progression`
  (`auto` picks per seed, `walk`, `beethoven`, `hexatonic`, `octatonic`,
  `two_five_one`, `giant_steps`); `key` (the first chord's root; `auto`
  picks per seed); `length` (chords, 3–48; the cycles repeat, ii–V–I and
  Giant Steps continue); `moves` (`plr` or `plrns`, for the walk only);
  `view` (`both`, `lattice`, `circle`); `colours` (`scriabin`, `fifths`,
  `transform`, `ink`); `scale` (triangle side on a 600-point page, 24–120);
  `labels`; `stroke`.
- **Generation:** lattice point `(a, b)` sits at `a·e₁ + b·e₂` with `e₁`
  a fifth to the right and `e₂` a major third up and right, and carries
  pitch class `7a + 4b mod 12`. Major triangle `(a,b),(a+1,b),(a,b+1)`,
  minor `(a+1,b),(a,b+1),(a+1,b+1)`; L, P and R are the three edge
  neighbours, N = P·L·R and S = L·P·R. Progressions given as chords
  (ii–V–I, Giant Steps) are joined by the shortest P/L/R word
  (breadth-first over the 24 triads, moves tried in the order P, L, R),
  and the passing triads are drawn on the path. The walk never undoes its
  last move. The path starts on the copy of the first chord nearest the
  window centre; a step whose triangle would leave the window continues on
  the nearest copy (shortest period vector, from the lattice of periods
  spanned by `(4, −1)` and `(0, 3)`) that lies inside, and both ends of
  the jump are marked. The glow is four strokes of falling width.
- **Guarantees:** deterministic per seed. Every step of the progression is
  the stated word of moves, re-checked by an independent model that knows
  only pitch-class sets (P keeps the fifth, R the major third, L the minor
  third, the result is the other consonant triad holding that pair) — and
  so is every step between drawn triangles; every drawn triangle holds
  exactly its chord's notes; every lattice label is `7a + 4b mod 12` and
  the three axes are +7, +4 and +3 (tested); shortest words are shortest
  (tested against brute force over all 24 × 24 pairs); the classic cycles
  spell the expected chords; the path stays inside the lattice area and all
  ink inside the page at every page size, scale and stroke (tested);
  every printed name is in the stroke font. `verification:
  steps_recomputed_labels_7a_plus_4b_path_on_page`. Clamped knobs are
  reported as `requested_<field>`.
