---
title: "Gantt Chart"
blurb: "Gantt chart template — task list beside a timeline of days, weeks, months or quarters"
category: paper
version: "1.0.0"
---
A blank Gantt chart — a list of tasks beside a timeline of days, weeks,
months or quarters, ready to plan a project by hand.

## What it is

A project schedule template:

- a **title block** for the PROJECT, the MANAGER and the START DATE;
- a **task list** down the left: a row number, the TASK, and if you want
  them an OWNER, START and END date columns and a narrow milestone column
  headed by a diamond;
- a **timeline** across the right, in one of four scales — **days** 1–31
  grouped into weeks, **weeks** 1–52 grouped into quarters of thirteen,
  **months** January to December grouped into quarters, or **eight
  quarters** grouped into two years — under a two-tier header, with a
  heavier line at each week, quarter or year;
- 10 to 40 rows, every other one lightly shaded so a bar can be followed
  across the page.

On the weeks scale, lighter lines mark the months of each quarter on the
4-4-5 pattern used in business calendars: four weeks, four weeks, five
weeks.

## How to use it

Print it, sideways for the widest timeline. Write the project's name and
start date at the top, and number the timeline's columns if they are not
already the dates you need. List the tasks in order, one to a row, with
who owns each one and its start and end dates. Then draw each task's bar
along its row, from the column where it starts to the column where it
ends. Mark a milestone — a deadline, a review, a delivery — with a
diamond on its date, and a tick in the milestone column. Draw arrows from
the end of one bar to the start of another where a task cannot begin
until another has finished. As work goes on, shade each bar as far as it
has got and draw a line down the chart at today's date: bars that stop
short of the line are behind.

## Purpose

A Gantt chart shows a whole plan at a glance: what has to be done, in
what order, by whom, what overlaps, and when it all finishes. It is used
for building projects, product launches, school and university
assignments, events and weddings, research plans, house moves and
renovations — anything with several tasks running against a calendar. A
paper chart on the wall is still the quickest to sketch and the easiest
for a whole team to see.

## History

The bar chart of tasks against time was first set out by the Polish
engineer Karol Adamiecki, who devised his "harmonogram" in 1896 but
published it only in Polish and Russian, years later. The American
mechanical engineer Henry L. Gantt, a colleague of Frederick Taylor in
scientific management, developed his own charts in the 1910s, and their
use to schedule production in the First World War made them known across
the industrial world; they took his name. Drawn by hand on paper and
wallboards for most of the century, Gantt charts planned great public
works such as the Hoover Dam before project-management software made
them a standard screen.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape` (default on); `margin_mm` (0–30, default 10); `scale`
  (days, weeks, months, quarters; default days); `rows` (10–40, default
  20); `numbered`, `owner`, `dates`, `milestone`, `shading`,
  `title_block`; `ink` for the grid lines and shading (default light
  gray), `frame_ink` for the frame, heavier lines and text (default
  charcoal); `weight` (0.1–2 pt, default 0.4; the frame and group lines
  are 2.5 times as heavy, at least 0.8 pt).
- **Generation:** the frame runs inside the margins. The number column is
  8 mm, owner 24 mm, start and end 16 mm each, milestone 7 mm; the task
  column is a quarter of the width (30–70 mm), narrowed when the timeline
  would get less than 2 mm a unit, and the timeline shares the rest
  evenly among its units. The header's two tiers are 5 and 6 mm; rows
  share the height left, at most 10 mm and at least 5 mm each — when the
  sheet cannot give every row 5 mm it takes as many as fit and records
  `requested_rows`. Unit labels are all one size; when they do not fit
  every unit they label every second, third … unit in steps that never
  cross a group line, and the unit lines then stop below the header.
- **Solving:** nothing to solve — a chart to plan on. The seed is unused:
  every seed gives the same chart.
- **Guarantees:** rows are all one height (`row_mm`) and timeline units
  all one width (`unit_mm`); the task list and timeline exactly fill the
  frame; captions, row numbers and labels sit inside their cells without
  touching; and all ink stays inside the margins, checked on every page
  size, orientation, margin, scale and column set. A knob outside its
  range is clamped and recorded as `requested_<field>`.
