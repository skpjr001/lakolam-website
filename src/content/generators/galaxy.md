---
title: "Galaxies"
blurb: "Galaxies from the density-wave construction: spiral arms where nested, twisted ellipses crowd; barred spirals, ellipticals and deep fields, as line art to colour or starry colour"
category: design
version: "1.0.0"
---
Spiral arms that nobody drew: nested ellipses, each turned a little more
than the one inside, crowd together into the arms of a galaxy.

## What it is

Each page is a galaxy built the way astronomers explain spiral arms. Stars
in a disk travel round the centre on slightly oval paths. Draw those paths
as a family of nested ellipses, turn each one a little further than the one
inside it, and the ellipses bunch up along two curving lanes. Those lanes are
the spiral arms: places where paths crowd together, not a fixed band of
stars.

The galaxy can be any of the classic types:

- **Sa, Sb, Sc** - spirals, from tightly wound arms round a big bright
  bulge (Sa) to loose, open arms round a small one (Sc).
- **SBa, SBb, SBc** - barred spirals. The inner paths stay lined up and
  stretched into a bar, and the arms only start to wind beyond it.
- **E** - an elliptical galaxy: smooth nested ovals, closer together near
  the bright centre, with a slight twist from inside to out.

A page can also be a deep field: several galaxies of mixed types, tilted at
different angles, among scattered background stars.

In the line style the nested paths are the whole picture, in black on
white. In the colour style the same paths are filled with stars, a golden
core fading to a blue rim, blue young stars and pink star-forming knots
along the arms, and brown dust lanes on their inner edges, on white paper or
a night sky.

## How to use it

Colour the line pages. Every oval is a closed loop and no two ever cross, so
each ring between two neighbours is one shape to fill. Try colouring the
rings from the centre outward, warm gold to cool blue: the arms appear
where the rings pinch thin. Or colour only the pinched parts of each ring
and watch the spiral stand out on its own.

Print the colour pages as posters or cards; the night sky style looks best
on a screen or glossy paper. Lay an Sa, an Sb and an Sc side by side to see
Hubble's sequence, or print a deep field and name each galaxy's type.

## Purpose

Spiral arms puzzle everyone who first thinks about them: if the inner disk
turns faster than the outer, why do the arms not wind up tight in a few
turns? The answer, that the arms are a pattern of crowding rather than a
fixed set of stars, is easiest to see in this construction. Here it is not
an illustration beside the art; it is the art, and a colouring page that
explains a piece of astronomy.

## History

Edwin Hubble sorted galaxies into ellipticals, spirals and barred spirals
in 1926, and drew the sequence as his tuning fork in The Realm of the
Nebulae (1936); Gerard de Vaucouleurs extended it in 1959. Bertil Lindblad
argued from the 1920s to the 1960s that arms were a wave in the disk, and
C. C. Lin and Frank Shu made this the density-wave theory in 1964. Agris
Kalnajs showed in 1973 how such a wave looks: a family of nested,
progressively rotated ellipses whose crowding traces two arms - the figure
this generator draws. Alar Toomre's 1977 review popularised it. The way
ellipticals fade from the centre follows de Vaucouleurs's 1948 law, in
which brightness falls with the fourth root of the radius. Dust lanes on
the inner edges of arms, where gas is squeezed and new stars are born, were
described by Lynds and by Roberts in the 1960s and 1970s.

## This implementation

- **Spec knobs:** `layout` (`single` default, `field`), `hubble` (`auto`
  default: the seed picks, spirals favoured; `elliptical`, `sa`, `sb`, `sc`,
  `sba`, `sbb`, `sbc`; in a field it sets the largest galaxy), `style`
  (`line` default, `colour`), `background` (`white` default, `night`;
  colour style), `arms` (1-4, default 2), `orbits` (8-60, default 30: nested
  orbits in the largest galaxy, ellipticals draw 60% as many isophotes),
  `stars` (500-20000, default 6000, colour style), `galaxies` (2-12,
  default 7, field layout), `width`/`height` (144-2000 pt, default
  612 x 792), `margin` (0-144 pt, default 36), `stroke` (0.5-4 pt, default
  1). Clamped values are reported as `requested_<field>`; when the page
  cannot space the requested orbits `MIN_GAP_PT` (2.8 pt) apart across
  their short axes, fewer are drawn and `requested_orbits` is recorded.
- **Generation:** orbit `a` (semi-major axis, unit) has axis ratio `q(a)`
  and rotation `phi(a) = phase + K ln(max(a, core)/core)`, so the twist is
  `K` radians per e-fold of radius and the arms are logarithmic spirals of
  pitch `atan(1/K)`. Two arms use true ellipses; `m` arms use ovals
  `r = a((1+q)/2 + (1-q)/2 cos(m psi))`, the orbits that close after `m`
  lobes in a frame turning at Omega - kappa/m. `K` is set by type (Sa 5.2,
  Sb 3.2, Sc 2.0, SBa 4.4, SBb 3.0, SBc 2.0, each times 0.9-1.1 by seed) and
  `q` is then solved so that `K` times the orbit's steepest log-radius slope
  equals `KAPPA = 0.86`: below 1 neighbours never cross, near 1 they almost
  touch, which draws the arms. Inside the core (bulge 0.30/0.19/0.10 for
  Sa/Sb/Sc, bar 0.42/0.36/0.30 for SB types) orbits do not turn; bulge
  orbits round off to circles at the centre, bar orbits are elongated
  (axis ratio 0.30-0.38) and widen into the disk ratio at the bar's end.
  Orbits are evenly spaced in `a` from an innermost one large enough to
  enclose 420 square points on the page. Ellipticals are E1-E6
  (`q = 1 - n/10`), with an isophote twist up to 0.6 rad per e-fold and
  isophotes evenly spaced in `a^(1/4)` (equal steps of de Vaucouleurs
  surface brightness). Fields place up to `galaxies` galaxies without
  overlap (largest first, radius 27% of the short side; others 32-72% of that radius;
  inclinations to 70 degrees for spirals), then scatter background stars
  away from them. Colour pages: each orbit is filled from the outermost in
  as a glow (gold core to blue rim); stars are sampled along the orbits
  evenly in each orbit's own angle from an exponential disk (old stars) or
  accepted in proportion to the local crowding (young blue stars, 60% of
  draws; pink knots where crowding is high); bulge stars are exponential
  about the centre; ellipticals sample a de Vaucouleurs profile. Dust lanes
  follow each arm's crowding crest, 3.5% inside it, as broken strokes. The
  meta records each galaxy's type, arms, orbit axes, axis ratio, twist
  (signed by winding), pitch, phase, core, bar, inclination, position
  angle, placement and the construction formula.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and six seeds give at
  least five different pages in both styles and layouts. Every type, layout,
  style, background and arm count changes the page. The construction turns
  monotonically: measured from the drawn outlines, each orbit beyond the
  core is turned further than the one inside (and by the expected total);
  none turns inside the core. Counting the crests of orbit crowding round a
  circle at half and three-quarters radius finds exactly `arms` arms for
  every spiral type, and there is one dust lane per arm. Neighbouring orbits
  never cross (checked at 720 directions), so every ring is one closed
  region. Elliptical isophotes are evenly spaced in `a^(1/4)`. Young stars
  pile up on the arms. All ink lies inside the margins. Every line page
  tested (each type, both layouts, several seeds) passes the adult
  colourability check with no findings and is black only; colour pages
  report `colorable: false` (a finished picture). Extreme and non-finite
  specs are clamped, never a panic.
