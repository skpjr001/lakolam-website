---
title: "Chord Chart"
blurb: "Chord and scale charts for guitar, ukulele, mandolin, banjo and bass in any tuning — a key's chords, chord libraries, fretboard scale maps, name-the-chord worksheets; every voicing found by search and checked"
category: design
version: "1.0.0"
---
Chord and scale charts for guitar, ukulele, mandolin, banjo and bass, in
any tuning — every shape worked out from the strings and checked.

## What it is

A chord diagram is a picture of the fretboard seen face on: the strings
run down the page, the frets across, and a dot shows where each finger
presses. An O over a string means play it open, an X means leave it out.
A number beside the top row ("5fr") says which fret the picture starts
at; without one, the thick line at the top is the nut.

Five kinds of page:

- **Key:** the seven chords of a key, as plain triads and as seventh
  chords, each with its Roman numeral (I, ii, iii, IV, V, vi, vii°), the
  key's scale and its home chord's notes along the whole neck, and a
  chord progression to try.
- **Library:** all twelve roots for up to four chord types (major, minor
  and seventh by default), the classic wall chart.
- **Scale:** a scale across the whole fretboard, then the arpeggios of the
  I, IV and V chords, so you can see the chord shapes inside the scale.
- **Worksheet:** "name the chord": diagrams with a line to write the name
  on, and an answer page.
- **Blank:** empty diagrams to copy your own chords into.

Instruments: guitar (standard, drop D, DADGAD, open G), ukulele (high G,
low G, baritone), mandolin, five-string banjo (open G) and bass (standard
or drop D), or any tuning you write out as note names.

## How to use it

Read a diagram as if the guitar is standing up in front of you with the
strings facing you: the lowest string is on the left. Put each finger
where its dot is; the number in the dot says which finger (1 index, 2
middle, 3 ring, 4 little). A long bar across several strings is a barre:
lay one finger flat across all of them. Strum only the strings without an
X. The coloured dots and circles are the chord's root, the note it is
named after (worksheet questions leave them black, so the root is not
given away).

On a key page, learn the chords in the top row first. The Roman numerals
tell you how the chords relate, so a song in one key moves to another by
keeping the numerals and changing the letters. Play the progression at
the bottom, then make up your own from the same seven chords.

On a scale map the neck lies on its side, lowest string at the bottom,
like tab. Every dot is a note of the scale; the filled dots are the root.
Play from root to root on neighbouring strings, then find the chord shapes
from the key page hiding among the dots.

For the worksheet, work out each chord's notes from the frets, find the
root and the type, and write the name on the line. The answer page has
every name.

## Purpose

Chord charts are among the most printed music pages: beginners tape them
to the wall, teachers hand them out, and players of any instrument in an
unusual tuning have to work out every shape themselves. Here the shapes
are computed for the tuning on the page, so a DADGAD guitar, a baritone
ukulele or a banjo gets real shapes rather than a guitar chart with a
note saying "adapt".

## History

Chord diagrams go back to guitar and ukulele tutors of the early twentieth
century; the ukulele craze of the 1920s put them into printed sheet music
above the melody, a habit that stuck for guitar. Roman-numeral analysis of
chords is older, from Gottfried Weber's harmony treatise of the 1810s, and
the Nashville number system used by session players is its practical
cousin. Open and altered tunings such as open G and DADGAD came from
folk, blues and Celtic players, and the five-string banjo's short drone
string is an inheritance from its African ancestors.

## This implementation

- **Spec knobs:** `kind` (`key` default, `library`, `scale`, `worksheet`,
  `blank`); `instrument` (`guitar` default, `ukulele`, `mandolin`,
  `banjo`, `bass`); `tuning` (`standard`, `drop_d` for guitar and bass,
  `dadgad` and `open_g` for guitar, `low_g` and `baritone` for ukulele; a
  preset that does not fit the instrument falls back to standard and meta
  `requested_tuning` says so); `custom_tuning` (note names low to high,
  3–8 strings, octave digits optional; unreadable text falls back and is
  echoed as `requested_custom_tuning`); `tonic` (`auto` lets the seed
  pick a common key) and `scale` (major, minor, harmonic minor, major and
  minor pentatonic, blues) for key and scale pages; `qualities` (18 chord
  types; library and worksheet) ; `count` (1–30 diagrams; worksheet and
  blank); `frets` (5–24 on scale maps); `labels` (note names, scale
  degrees or plain dots); `stretch` (five-fret span); `fingers`;
  `colour` (worksheet questions are always black); `page`; `margin`. Out-of-range numbers are clamped and
  recorded as `requested_<field>`.
- **Generation:** spelling is letter arithmetic: a note is a letter and an
  alteration, an interval a number of letter steps and semitones, so G
  major has F♯, F major B♭, and the third of D♯ is F𝄪 (printed Fx).
  Library roots use the usual chart spellings C, C♯, D, E♭, E, F, F♯, G,
  A♭, A, B♭, B; keys use their own spelling. Diatonic chords are read off
  the scale by stacking thirds; pentatonic and blues keys take the chords
  of their major or natural-minor parent. Voicings are found by a
  depth-first search over every string — muted, open, or stopped at any
  fret up to 15 whose note is a chord tone — pruned by the fret span. A
  fingering is assigned with fingers rising with the fret, one finger
  per fret from the lowest stopped fret; a barre is used when a flat
  barre runs to the top string, or when the shape needs more than four
  fingers without one. Survivors are ranked by low position, small span,
  few fingers, open strings, the root as lowest note (weighted heavily on
  guitar and bass, lightly on re-entrant ukulele and mandolin), and few
  muted strings, with the fret numbers breaking ties.
- **Solving:** nothing to solve on chart pages; the worksheet's answers
  are the chord names, on the answer page.
- **Guarantees:** every sounded string plays a chord tone; every required
  tone sounds (root and third or suspension always; the seventh, sixth or
  ninth that names the chord; the fifth only where it is altered or the
  chord is a plain triad or power chord — in sixth, seventh, ninth and
  add9 chords the perfect fifth may be left out); stopped frets span at
  most four frets (five with `stretch`); at most four fingers with each
  barre counted once; the sounded strings form one run with no muted
  string inside; muted strings are marked X; the root-position flag is
  true exactly when the lowest pitch is the root. On the worksheet, every
  diagram has exactly one name among the chord types on the sheet (so C6
  and Am7 never appear together as a guess). All of this is re-checked
  from the strings' pitches by an independent test, for every instrument,
  tuning, root and chord type; meta `voicings_checked` and
  `verification` record it.
- **Limits:** voicings are the search's best by a fixed score, not a
  teacher's pick, so an occasional shape differs from the most familiar
  one. The search prefers at least four sounding strings (three on bass)
  and gives up one string at a time only when nothing fits; such chords
  are listed in meta `fewer_strings`. A chord with no shape within the
  span is printed "out of reach" and listed in `unvoiced` — this does not
  happen in the preset tunings for the default chord types. The banjo's
  short fifth string is played open or left out, never stopped, and is
  drawn full length in chord diagrams (on scale maps it starts at the
  fifth fret). Mandolin courses are drawn as single strings.
