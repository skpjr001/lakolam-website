---
title: "Planner"
blurb: "Planner pages — year and month calendars, weekly and daily planners, habit and mood trackers, reading log, meal planner, budget, gratitude and goal pages"
category: design
version: "1.1.0"
---
Printable planner and tracker pages: a year at a glance, monthly and weekly
calendars, daily schedules, habit and mood trackers, a reading log, a meal
planner, a monthly budget, gratitude journal pages and a goal planner.

## What it is

The pages inside a paper planner or journal, one kind to a page:

- **Year at a glance** — all twelve months of a year on one page.
- **Month** — the month as a grid of weeks, with space for goals and notes.
- **Week** — seven days, each with lines to write on, and a notes box.
- **Day** — an hour-by-hour schedule, your top three priorities, a to-do
  list and notes.
- **Habit tracker** — habits down the side, the days of the month across,
  a circle to fill in for each day you kept the habit.
- **Mood tracker** — a "year in pixels": one square for every day of the
  year, coloured by how the day felt, with a colour key.
- **Reading log** — title, author, when you started and finished each book,
  and a five-star rating.
- **Meal planner** — breakfast, lunch, dinner and snacks for a week, and a
  grocery list.
- **Budget** — income and expense tables with totals, and a summary of
  income, expenses and balance.
- **Gratitude** — three things you are grateful for, a question to think
  about, space to write, an affirmation and how the day felt.
- **Goal** — the goal, why it matters, dated action steps, a progress bar,
  obstacles and how to overcome them, and a reward.

## How to use it

Print the pages at actual size, or bind many into a planner. Dated pages
already show the right days: every month starts under the right weekday and
holds exactly its days, 29 in February of a leap year. Weeks can start on
Monday or Sunday. Undated pages leave the dates blank so the planner can be
started at any time: write the month, week or date in the space at the top.
Colour the circles of the habit tracker on the days you keep each habit, and
the squares of the mood tracker in the colour you chose for how each day
felt. Light grey lines keep your own writing in front; the soft colour
styles add a gentle accent, and the minimal style prints in greys only.

## Purpose

Planners, habit trackers and gratitude journals are among the best-selling
low-content books. In a book, planner sections turn the builder into a
planner maker: a dated twelve-month planner (a year at a glance, then twelve
month pages, then weekly pages), a 90-day habit journal, a reading journal
or a budget book — alone, or mixed with puzzle and notebook sections.

## History

Printed almanacs with a page for each month go back to the 15th century;
the pocket diary with ruled space for each day became common in the 19th.
Day-by-day time management planners spread in offices in the 1980s. The
Bullet Journal (2013) popularised hand-drawn habit trackers and the "year in
pixels", and gratitude journaling grew with research on positive psychology
in the 2000s.

## This implementation

- **Spec knobs:** `kind` (year_calendar, month, week, day, habit_tracker,
  mood_tracker, reading_log, meal_planner, budget, gratitude, goal, or auto
  — one kind chosen by the seed); the date: `year`, `month`, `day` (the first
  day of a daily section, and the week holding it for weekly and meal
  pages), `start_day` (monday or sunday); `index` — the page's position in a
  book section, from 0 — with `sequence` (on: the index advances the date by
  years for the year calendar and mood tracker, months for month, habit
  tracker and budget, weeks for week and meal planner, days for day and
  gratitude; undated daily pages are titled DAY 1, DAY 2... and reading-log
  rows number on); `dated` (off: undated pages with spaces to write dates);
  `style` (minimal, sage, blush, sky, sand); `rows` for habit tracker,
  reading log and budget (0 fills the page); `days` for an undated habit
  tracker (days per page, numbered on from `index * days + 1`; 0 prints 1 to
  31); `day_start` and `day_end` hours and `clock` (h12 or h24) for the
  schedule; `prompt` (1-based into 48 built-in gratitude prompts, advanced by
  the index; 0 picks one from the seed); `title` to replace the page title;
  and page size as for paper: `page` (letter, legal, a4, a5, six_by_nine,
  seven_by_ten, square), `landscape`, or an explicit `page_width` /
  `page_height` in points, `margin` in `unit` (in, mm, pt), and the rule
  `weight`.
- **Generation:** dates come from a day count on the proleptic Gregorian
  calendar (Hinnant's days-from-civil, exact for every year; 1970-01-01 was
  a Thursday), so weekdays, month lengths and leap years are computed, not
  looked up. Type and spacing scale with the content area, so the same
  layout fills a letter page or a 6 x 9 in book page; the book builder asks
  for a page exactly the size of its content area. Habit trackers with 31
  columns are roomiest on letter-size or landscape pages.
- **Solving:** nothing to solve — a page for planning and writing. The seed
  only chooses the kind under `auto` and the gratitude prompt when `prompt`
  is 0; everything else is the same for every seed.
- **Guarantees:** deterministic; dates are exact (tests check every day from
  1582 to 2500 against Zeller's congruence, and known dates such as 1
  January 2026, a Thursday, and 1 March 2100, a Monday); a month grid holds
  exactly the month's days, each under the heading of its own weekday, a
  year calendar and a mood tracker exactly 365 or 366 days, a habit tracker
  one column per day of the month, a week seven consecutive days from the
  start day; all ink stays inside the margins on every page size, portrait
  and landscape, dated and undated; no two labels overlap; every printed
  character exists in the font; the minimal style uses greys only.
- **Out-of-range knobs (1.1.0+):** a page the knobs used to refuse is now
  drawn with each knob brought into range, and meta lists the moved knobs in
  `adjusted`: `year` 1–9999, `month` 1–12, `day` to the month's last,
  `index` at most 100000, `day_start`/`day_end` held to 0–23 and swapped
  when reversed (equal hours are opened to one hour), `rows` at most 60,
  `days` at most 62, `weight` 0.1–3 pt, a page side given alone takes the
  other from `page`, sides 200–5000 pt, a `margin` that would leave less
  than 200 pt of content is reduced, and a `title` is cut to 40 characters.

