---
title: "Shell Patterns"
blurb: "Sea-shell pigment patterns grown by Meinhardt's reaction-diffusion along the shell's edge — triangles, zig-zags, dots, bands — on cone and olive shells"
category: design
version: "1.0.0"
---
Sea shells painted by chemistry: pigment patterns grown cell by cell along
the shell's edge, the way a living mollusc lays them down.

## What it is

A sea shell grows only at its rim. As the animal adds each thin new edge,
the cells along it decide whether to lay down pigment, so the pattern on a
shell is a record in time: each growth line is one moment of the edge. The
cells influence their neighbours with substances that spread and decay,
and from that simple rule come zig-zags, triangles, dots, stripes and
bands.

These pages run that process and wrap the result onto a shell: a cone
shell, with its stepped spire and broad shoulder, or an olive shell, long
and smooth. The pattern continues up the spire, smaller on each older
whorl. Seven patterns: textile-cone triangles, crossing zig-zags, lone
zig-zags, flame chevrons, dots, bands and stripes. A page shows one large
shell or a specimen plate of several, each named, or the patterns as flat
panels, the way scientists draw them.

## How to use it

- **Frame it.** The colour shells are made to hang, singly or as a plate.
- **Read the pattern as time.** Each line drawn from the top of the shell
  to its tip is one moment of the growing edge. Follow a zig-zag around
  the shell: it is a wave of pigment running along the edge as the shell
  grew.
- **Compare the flat panels with the shells.** The flat panels show the
  same patterns before they are wrapped round: the edge across, time down.
  Find each one's shell on a plate.
- **Colour it.** The outline version keeps every pigment region as a shape
  to fill. Try two browns, or invent a shell no beach has seen.
- **Look at real shells.** Cone, olive and volute shells show these very
  patterns; a shell guide or a museum drawer is the best companion.

## Purpose

The pattern on a shell looks painted, but no painter is there: only cells,
their neighbours and a few chemicals. Watching such patterns grow from a
simple rule is a striking way to meet the idea of self-organisation, and
the shells make beautiful prints.

## History

Alan Turing (1952) showed that two substances diffusing at different rates
can make stable patterns from a uniform start. Alfred Gierer and Hans
Meinhardt (1972) turned the idea into activator–inhibitor and
activator–substrate models, and Meinhardt spent decades matching them to
sea shells: in *The Algorithmic Beauty of Sea Shells* (with Przemyslaw
Prusinkiewicz and Deborah Fowler; 1995, 4th ed. 2009) he showed how
stationary peaks give stripes, synchronous oscillations give bands,
travelling waves give oblique lines and triangles, and how a hormone
spread through the whole animal starts new waves, as on *Oliva
porphyria*. Ermentrout, Campbell and Oster (1986) offered a neural model
of the same patterns. The textile cone, *Conus textile*, is the classic
example.

## This implementation

- **Spec knobs:** `pattern` (`auto` default — triangles, crossing,
  zigzag, flames or dots — or any of `triangles`, `crossing`, `zigzag`,
  `flames`, `dots`, `bands`, `stripes`), `shell` (`auto` default — cone or
  olive — `cone`, `olive`, `flat`), `layout` (`single` default, `plate`),
  `shells` (2-12, plate only; a plate shows a different pattern on each
  shell), `palette` (`auto` default, `chestnut`, `amber`, `rose`,
  `porphyry`, `ink`, `colouring`), `detail` (40-240 cells along the edge,
  default 200), `diffusion` (0.25-4, default 1), `labels` (plate only),
  `line`, `width`, `height`, `margin`.
- **Generation:** each shell runs Meinhardt's equations (the
  activator–inhibitor, activator–substrate, or activator–substrate with a
  global hormone; see `lako_morpho::rd`) on a line of `detail` cells with
  zero-flux ends, explicit Euler, recording one row every few steps after a
  warm-up. The seven presets are ours: constants tuned by eye on this grid
  for each look, not Meinhardt's published tables. The triangles read the
  substrate (pigment where it is full, white where a wave has just used it
  up); the rest read the activator. Values are normalised by their 99.5th
  percentile and cut at two levels chosen by area share (dark and mid
  pigment), traced as closed regions with marching squares (the field
  padded with a low border so every region closes), smoothed by one round
  of corner cutting, and mapped onto the shell: the edge runs from shoulder
  to tip, time runs around the last half turn (`x = h(s)·sin φ`, seen from
  a little above so `y` gains `ε·h·cos φ`), and each spire whorl shows the
  shoulder end of the edge, mirrored on alternate whorls. Rows are chosen
  so cells are about square where the face is widest. Fine growth lines
  crowd towards the shaded side. `diffusion` scales both diffusion
  constants; whenever that would break stability the time step is halved
  (and the steps per row doubled, keeping the same model time per row).
- **Solving:** Nothing to solve.
- **Guarantees:** every simulation satisfies the explicit-Euler stability
  bound (diffusion number `D·dt < 0.4` and every `rate·dt < 1`) at every
  allowed `diffusion` — tested for every preset, and the integrator itself
  refuses an unstable step. Every preset is patterned, not uniform (dark
  pigment covers 4-70% of the shell, at least six regions, structure across
  rows or along the edge; tested on several seeds). The face map never
  folds (its Jacobian keeps one sign); every pigment region is a closed
  loop; deterministic per seed; ink inside the page.
  `verification: explicit_euler_stable`. Clamped `shells`, `detail` and
  `diffusion` are reported as `requested_*`.
