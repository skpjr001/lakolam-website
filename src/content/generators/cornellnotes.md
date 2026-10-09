---
title: "Cornell Notes Paper"
blurb: "Cornell notes paper — header, cue column, ruled notes area and summary, in Pauk's proportions"
category: paper
version: "1.0.0"
---
Note-taking paper in the Cornell layout — a header for the topic and date,
a cue column, a ruled notes area and a summary box at the bottom.

## What it is

A ruled page divided into four parts, in the proportions Walter Pauk gave
for the Cornell system on a sheet of US Letter:

- a **header** strip across the top for the topic and the date;
- a **cue column** down the left, 2½ inches (63.5 mm) wide;
- the **notes** column, the rest of the width — about six inches on Letter;
- a **summary** area across the bottom, 2 inches (50.8 mm) high.

The notes and summary are ruled at 6, 7, 8 or 9 mm, or at US college
(9/32 inch) or wide (11/32 inch) ruling. Narrower and wider cue columns
and shorter and taller summary areas are offered too, and small labels
name each part.

## How to use it

Print at actual size, write the topic and date in the header, then:

1. **Record.** During the lecture or while reading, take notes in the wide
   notes column — short sentences, abbreviations, one idea per line, and
   space between topics.
2. **Question.** Soon afterwards, write cues in the left column beside
   each part of your notes: key words, questions the notes answer,
   things to remember.
3. **Recite.** Cover the notes column, read each cue and answer it aloud
   in your own words; uncover the notes to check.
4. **Reflect.** Ask what the material means and how it connects with what
   you already know.
5. **Review.** Go over your pages briefly every week.

Finish each page by writing a few sentences in the summary area at the
bottom: the main ideas of the page, in your own words.

## Purpose

Cornell paper turns note-taking into study: the cue column becomes a
self-test, and the summary forces the page into a few sentences. Students
use it for lectures, reading notes and revision; teachers hand it out for
guided note-taking, and many schools teach the method from middle school
on. In a book, Cornell pages make a study notebook or a class journal.

## History

Walter Pauk, a professor of education who directed the reading and study
center at Cornell University, devised the system for Cornell students and
set it out in his book *How to Study in College*, first published in 1962 and
revised through many editions. Study-skills handouts adapted from the book
give the page's measurements on Letter paper: a 2½-inch cue column, a
6-inch notes column, and a 2-inch summary strip at the bottom.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `ruling` (mm6, mm7, mm8,
  mm9, college, wide_ruled); `cue_width` (mm50, two_and_a_half_inch,
  mm75); `summary_height` (mm40, mm50, two_inch, mm65); `ink` for the
  ruling (default light gray) and `divider_ink` for the border and
  dividers (default charcoal); `weight` (0.1–2 pt, default 0.4) and
  `divider_weight` (0.25–3 pt, default 1.2); `labels` (TOPIC, DATE, CUES,
  NOTES, SUMMARY).
- **Generation:** the border runs just inside the margins. The header is
  16 mm deep, with the date field the last 50 mm of it. The cue column is
  measured from the border; if it would take more than 40% of the width
  (A5, wide margins) it steps down to the widest option that fits and the
  request is recorded as `requested_cue_width`. The summary is measured up
  from the bottom border and steps down the same way
  (`requested_summary_height`) if the notes area would be left with fewer
  than four ruled spaces. Rules run the full width at whole steps below the
  header line and below the summary line, stopping at least half a step
  short of the next divider.
- **Solving:** nothing to solve — a page to take notes on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** the cue column and summary area measure exactly what was
  asked (recorded as `cue_width_mm` and `summary_height_mm`) unless a
  `requested_` note says otherwise; every rule sits at an exact multiple of
  the ruling below its divider; and all ink — rules, dividers, border and
  labels — stays inside the margins, checked on every page size,
  orientation, margin, ruling and column size. A knob outside its range is
  clamped and recorded as `requested_<field>`.
