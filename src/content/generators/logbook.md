---
title: "Logbooks"
blurb: "Logbooks — password and address books with A-Z tabs, blood pressure, blood sugar, medication, reading, mileage, workout, garden and maintenance logs, every writing space true size"
category: design
version: "1.0.0"
---
Password books, address books and health, reading, mileage, workout, garden
and maintenance logs, with every writing space big enough to write in.

## What it is

A printable record-keeping page. There are two families:

- **Books with A–Z tabs.** A password book (website, username, password,
  notes) and an address book (name, two address lines, phone, email,
  birthday). Each page files one to four letters, with a tab down the edge
  that shows where those letters sit in the alphabet.
- **Table logs.** Blood pressure (date, time, systolic, diastolic, pulse),
  blood sugar (before and after meals and at bedtime), medication (with a
  tick box for each dose taken), a daily reading log (book, pages, minutes,
  a parent's initials), mileage, workouts, the garden and home or car
  maintenance. A few lines for a name, doctor, target or month sit above
  the table, and the page number below it.

There is a large-print setting with bigger type and taller spaces, and five
colour schemes, one of them greys only for black-and-white printing.

## How to use it

1. Print at 100 % ("actual size"), not "fit to page", so the spaces keep
   their size.
2. For a password or address book, print one page for each letter (or
   each group of letters) and keep them in order. The highlighted tab on
   the edge shows where the page belongs; trimmed or stacked, the tabs make
   a thumb index.
3. For a health log, fill in the lines at the top first: your name, your
   doctor and your target. Write one reading per row, with the date and
   time, and take the page to appointments.
4. Keep password books somewhere safe and private. Write passwords clearly
   and cross out old ones rather than erasing them.

## Purpose

Logbooks are among the most-used printed pages there are. People keep blood
pressure and medication records for their doctor, teachers send home reading
logs, and many people prefer a paper password book to an app. They are only
useful if the spaces are big enough for real handwriting, and for older
hands that means large print. Every space on these pages is at least 7 mm
tall (10 mm in large print), which is wider than college-ruled paper.

## History

Ship's logs, the ancestors of every logbook, were kept from the sixteenth
century. A "log" was the wooden float thrown overboard to measure speed,
and the book recorded its readings. Household account books, commonplace
books and address books followed. Home blood pressure monitoring became
common in the 1990s, and doctors began asking patients to keep a written
log. Password logbooks are a twenty-first-century addition: alphabetised
"internet address and password" books have been steady sellers since the
2010s.

## This implementation

- **Spec knobs:** `kind` (`password`, `address`, `blood_pressure`,
  `glucose`, `medication`, `reading`, `mileage`, `workout`, `garden`,
  `maintenance`); `large_print`; `rows` (rows or entries a page, 0 fills
  the page); `letters_per_page` (1–4, A–Z books only); `index` (page within
  a book section); `title`; `style` (`minimal`, `sage`, `blush`, `sky`,
  `sand`); `page`, `landscape`, `page_width`, `page_height`, `margin`
  (inches); `weight`.
- **Generation:** the page is laid out from the content box inwards. A–Z
  books share the page's entries between its letters and stretch the lines
  to use the height. Table logs size their columns by weight and wrap long
  column names onto two lines. On a narrow page, columns are dropped from
  the right until each is wide enough to write in (`columns_dropped` in the
  meta). In a book, page `index` files letters `index × letters_per_page`
  onwards, wrapping round the alphabet. The seed only picks the small
  ornament under the title.
- **Solving:** nothing to solve.
- **Guarantees:** `fields_checked`. Every write-in space is at least the
  handwriting minimum (7 mm, or 10 mm in large print) tall and wide at
  100 % print, lies inside the margins, and no two overlap. The check
  re-reads the list of spaces. A–Z books file every letter exactly once in
  each run of `alphabet_pages` pages (`letters_checked`). Rows are as
  asked; more rows than fit are reduced and the request is kept as
  `requested_rows`, and other clamps are recorded the same way. The reading
  log is a daily minutes log; a list of books read is the planner's reading
  log.
