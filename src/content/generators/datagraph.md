---
title: "Data and Graphs"
blurb: "Data handling — tally charts, pictographs, bar graphs and line plots to read and draw"
category: maths
version: "1.0.0"
---
A page of real-looking class data, shown as a tally chart, a pictograph, a bar
graph or a line plot, with questions to answer from it.

## What it is

A data-handling worksheet. Each page has one small data set: the class's
favourite fruit, pets, sports or ice cream, the weather over a month, books
read or apples picked by each child, cups of lemonade sold each day, or (for
line plots) pets at home, letters in names, goals per game, hours of sleep and
siblings. The data is drawn as a chart and followed by questions: how many,
which was most or least, how many more or fewer, how many altogether, and at
the top level the mean, median, mode and range.

In *draw* mode the numbers are printed in a table (or a list, for a line
plot) and the chart is left empty for the child to draw: tally marks, pictures,
bars or Xs. The answer key draws the finished chart in red and writes every
answer.

## How to play

Read the chart's title and labels first, so you know what is being counted.

- **Tally chart:** each stick is one; a bundle of four sticks with a line
  across is five. Count the fives, then the ones.
- **Pictograph:** look at the key. If each picture stands for 2, count the
  pictures and double; half a picture stands for half as many.
- **Bar graph:** follow the top of each bar across to the scale. A bar that
  stops halfway between two lines is halfway between their numbers.
- **Line plot:** each X is one child (or one game). Count the Xs above a
  number to find how many.

For "how many more", find both numbers and take the smaller from the larger.
For "altogether", add. The mean is the total shared out equally: add all the
numbers and divide by how many there are. The median is the middle number
once they are in order; the mode is the number that appears most often; the
range is the largest take away the smallest.

When drawing a chart, work from the table one row at a time and check each
row against its number before moving on.

## Purpose

Reading and making charts is how children first meet statistics, and every
curriculum builds it up the same way: tally charts and pictures that count one
each, then pictures and scales that count in twos, fives and tens, then bar
graphs and line plots, then averages. These pages follow that ladder and give
teachers and parents an endless supply of fresh data at each step, with the
answer key already worked.

## History

Tally marks are among the oldest written records of counting. William
Playfair drew the first bar charts in 1786; Otto Neurath's Isotype movement of
the 1920s and 30s made picture charts, with one symbol standing for a fixed
number, a tool of public education, and they have been in school textbooks
ever since. Line plots (dot plots) became a staple of US elementary maths with
the Common Core standards of 2010.

## This implementation

- **Spec knobs:** `difficulty`; `chart` (`auto`, `tally`, `pictograph`, `bar`,
  `bar_horizontal`, `line_plot`); `mode` (`read` or `draw`); `theme` (`auto`
  or one of the named data sets; a theme that does not fit the chart is
  replaced by one that does); `locale` (`us`, `uk`, `in`); `colour` (coloured
  pictures and bars, or white to colour in); `questions` (2-8, 0 = the level's
  usual number); page `width` and `height`; `line`.
- **Generation:** difficulty maps to grade. Kids (grade 1): four categories up
  to 8 or 9, one picture = 1, bar scale of 1. Easy (grade 2): pictures worth 2
  (whole pictures only), bar scales of 1 or 2. Medium (grade 3): pictures
  worth 2 with half pictures, bar scales of 2 (bars may end between lines) or
  5. Hard (grade 4): pictures worth 4 or 10 with halves, bar scales of 5 or
  10, line plots. Expert (grades 5-6): bar scales of 10 or 20, line plots, and
  the mean, median, mode and range. `auto` picks tally or pictograph for the
  youngest, pictographs and bar graphs in the middle, bar graphs and line
  plots at the top. Values are random multiples of the level's step; line-plot
  data is drawn in a lump around a centre with a few strays, like real class
  data. Locale changes the words (pictograph / pictogram, bar graph / bar
  chart, line plot / dot plot, favorite / favourite, soccer / football,
  baseball / cricket with its own ball picture). The pictures (fruit, weather,
  animal faces, balls, ice-cream cones, books, cups) are drawn as paths.
- **Solving:** every answer is computed from the same list of numbers the
  chart and table are drawn from, and re-worked independently (by ranking,
  counting observations, striking off the ends for the median, tallying
  frequencies for the mode).
- **Guarantees:** deterministic per seed. The chart equals the data: the
  renderer logs what it draws and the tests read it back, so every bar's
  length divided by the scale's unit is its value, whole plus half pictures
  times the key is the count, the tally strokes number the count, and the Xs
  over each number match the raw list. Every value fits the chart (a multiple
  of the picture value or half of it; a bar ends on a line or halfway). A
  question only appears when it has one answer: "most" and "least" need a
  single largest or smallest count, "how many more" a strictly larger first
  number, and the mean and median must come out whole and the mode be a
  single value that appears at least twice (Expert data is regenerated until
  all three hold). No question repeats, and no pair of categories is asked
  about twice in different words. Meta carries `answers_checked` and
  `rating_basis: grade_skills`.
