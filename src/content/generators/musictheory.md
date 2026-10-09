---
title: "Music Theory"
blurb: "Music theory — key signatures, scales, intervals, triads and scale degrees on the staff, graded like the ABRSM exams, every note spelled and checked twice"
category: maths
version: "1.0.0"
---
Key signatures, scales, intervals, triads and scale degrees on the staff, graded like the music theory exams — every note spelled correctly and checked twice.

## What it is

A music theory worksheet of four to ten questions, each with its own
staff in the treble, bass or alto clef. Key questions show a key
signature to name (and, from Grade 3, its relative minor) or ask for the
signature of a named key to be written. Scale questions give the tonic
and ask for one octave going up — major, and natural, harmonic or melodic
minor — written with accidentals. Interval questions show two notes to
name, by number at first and then by quality and number, up to augmented,
diminished and compound intervals. Triad questions ask for the tonic,
subdominant or dominant triad of a key whose signature is drawn, or show
a triad whose root and type are to be named. Degree questions show a note
in a key to name as tonic, supertonic and so on. The answer key writes
every note and signature in red on its staff and fills in every name.

The five levels follow the ABRSM theory grades: Grade 1 (C, G, D and F
major) to Grade 5 (keys up to six sharps or flats, compound intervals,
diminished and augmented triads).

## How to play

1. **Key signatures:** sharps are added in the order F C G D A E B, flats
   in the order B E A D G C F, each on its own line or space. For sharps,
   the major key is one step above the last sharp; for flats, it is the
   second-to-last flat (one flat is F major). The relative minor is three
   semitones below the major key, on the sixth note of its scale.
2. **Scales:** use each letter once, in order. A major scale goes tone,
   tone, semitone, tone, tone, tone, semitone. A natural minor scale goes
   tone, semitone, tone, tone, semitone, tone, tone; the harmonic minor
   raises the 7th note a semitone; the melodic minor going up raises the
   6th and 7th.
3. **Intervals:** count the letters from the lower note to the upper one,
   both included, for the number (C up to E is a 3rd). For the quality,
   compare the upper note with the major scale of the lower note: in the
   scale it is major (2nd, 3rd, 6th, 7th) or perfect (unison, 4th, 5th,
   octave); a semitone smaller is minor, or diminished for a perfect
   interval; a semitone bigger than major or perfect is augmented, and a
   semitone smaller than minor is diminished. Beyond an octave, 9th =
   octave + 2nd, 10th = octave + 3rd, and so on.
4. **Triads:** a triad is three notes stacked in thirds — line, line,
   line or space, space, space. The tonic triad is built on the 1st note
   of the scale, the subdominant on the 4th and the dominant on the 5th;
   in a minor key the dominant triad uses the raised 7th. A major triad
   has a major 3rd then a minor 3rd; minor, minor then major; diminished,
   two minor 3rds; augmented, two major 3rds.
5. **Degrees:** the notes of a scale are the tonic, supertonic, mediant,
   subdominant, dominant, submediant and leading note (1 to 7).

## Purpose

These are the core written skills of ABRSM Music Theory Grades 1 to 5
and of school music in the US and India: knowing every key signature,
spelling scales and chords correctly, and naming intervals. Spelling is
where pupils go wrong (G sharp, not A flat, in A major), so every page
practises reading and writing notes on the staff, not just naming them.

## History

The staff grew from Guido of Arezzo's lines and spaces around 1025. Key
signatures settled into their modern order of sharps and flats during
the seventeenth and eighteenth centuries, as major and minor keys
replaced the church modes, and the circle of fifths that orders them was
drawn by Johann David Heinichen in 1711. Graded theory exams began with
the Associated Board of the Royal Schools of Music, founded in 1889; its
theory grades are now taken in over 90 countries.

## This implementation

**Spec knobs.** `difficulty` (Kids = Grade 1 … Expert = Grade 5); `topic`
(`mixed`, `keys`, `scales`, `intervals`, `triads`, `degrees`; at Kids the
`keys` page also writes its keys' tonic triads and scales, because Grade
1 has only four keys); `clef` (`treble`, `bass`, `alto`, or `mixed`:
treble and bass, with alto too from Hard); `count` (4-10, clamped and
recorded as `requested_count`); page `width`, `height` and `line`.

**Generation.** Notes are spelled by letter arithmetic on the circle of
fifths: a key `k` fifths from C has its tonic `4k` letters and `7k`
semitones up, its signature is the first `k` letters of the order of
sharps or flats, and a scale walks consecutive letters taking each
letter's alteration from the signature (raising the 7th, and for melodic
minor the 6th). Key-signature accidentals are placed by the conventional
pattern (treble sharps from F5 down a fourth or up a fifth, flats from B4
alternately up a fourth and down a fifth; bass two steps lower, alto
one). Intervals at Grades 1-3 are above the tonic of a key in the grade;
from Grade 4 any interval, its quality chosen first and the upper note
spelled from it. Questions are deduplicated on the page.

**Solving.** Every answer is re-derived a second way, by semitone
counting on MIDI numbers: scales are rebuilt from their tone/semitone
pattern one letter at a time; a key is identified by trying every
possible tonic for the single one whose major (or natural minor) scale
carries exactly the drawn accidentals; an interval's quality is read
against the major scale on its lower note; a triad's from the sizes of
its two thirds; a degree from the note's place in the rebuilt scale.

**Guarantees.** Every answer and written note agrees with the second
route (meta `answers_checked`); each drawn key signature has exactly one
major and one relative minor key; every accidental sits on the line or
space of the letter it alters (tested against a textbook table for all
three clefs); a note shows an accidental exactly when it differs from
the key signature (so the dominant of C minor shows B natural). Notes
stay within three ledger lines. Difficulty is the ABRSM grade's
syllabus (`rating_basis: abrsm_grade_syllabus`, meta `grade`).
