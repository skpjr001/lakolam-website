---
title: "Tournament"
blurb: "Tournament sheets — pickleball and tennis partner mixers, round robins, single and double elimination brackets and bunco movement, every schedule re-checked from the page"
category: design
version: "1.0.0"
---
Brackets and rotation sheets for club nights: partner mixers, round
robins, knockout and double-elimination draws, and bunco tables.

## What it is

Five kinds of printed tournament sheet.

- **Mixer:** a doubles social. Everyone has a new partner each round, and
  the page lists who plays with whom on each court, who sits out, and a
  roster with a points box for each player.
- **Round robin:** everyone plays everyone once, round by round, court by
  court, with a results grid.
- **Single elimination:** a knockout bracket.
- **Double elimination:** a winners' bracket, a losers' bracket and a
  grand final. You are out after two losses.
- **Bunco:** the first-round seating, the rules for moving between
  tables, and score cards.

The sport names the sheet and where games are played. Pickleball, tennis
and badminton use courts, table tennis and cards use tables, chess uses
boards. A chess mixer is bughouse and a cards mixer is a partner drive.

## How to use it

Print the sheet and pin it up where everyone can see it. Write the
players' names on the roster, or type them in before printing.

**Mixer:** in each round, find your number on a court and play with the
partner shown. Write the score in the small boxes, then add up your
points on the roster at the end. With 4, 5, 8, 9, 12 or 13 players
(any number that leaves 0 or 1 over when divided by 4), you partner every
other player exactly once and face each of them exactly twice. With other numbers no schedule can do that.
6 players, for example, make 15 possible partnerships, an odd number,
but every game uses two. The sheet says so, and shows the pair who sit
out together each round.

**Round robin:** each round, play the opponent shown. The first named
is home, serves first, or plays White. When there is an odd number of
players, one rests each round (the bye column). Fill in the results grid
as you go.

**Brackets:** write the players next to their seed numbers, with seed 1
the strongest. Write each winner on the line the bracket leads to. Byes
go to the top seeds. In double elimination a first loss sends you to the
losers' bracket, to the line marked with your match number.

**Bunco:** sit as shown for round one, partners facing. After each round,
move as the sheet says: winners at the head table stay, its losers go
to the last table, and everywhere else winners move up a table.

## Purpose

Organisers lose time at the start of every social night working out who
plays whom, and hand-made rotations often pair the same people twice or
leave someone sitting out three times. These sheets are worked out in
advance, checked, and printed large enough to read across a hall.

## History

Round robins go back to the "all-play-all" chess tournaments of the
nineteenth century. The rotating-circle method of drawing one up was
described by Thomas Kirkman in 1847. Johann Berger's tables of it are
still used for chess pairings. Duplicate whist players of the 1890s
wanted schedules in which everyone partners everyone once and meets
every opponent equally often. Mathematicians, starting with E. H. Moore,
have studied these "whist tournaments" ever since. Knockout brackets
with seeds placed so the best meet last were used at Wimbledon by the
1920s. Double elimination is the classic format for bowling, softball
and esports. Bunco was a nineteenth-century parlour dice game and came
back in the 1980s as a neighbourhood social.

## This implementation

- **Spec knobs:**
  - `kind`: `mixer` (default), `round_robin`, `single`, `double` or
    `bunco`.
  - `entrants`: the number of players or teams. Mixer takes 4-24, round
    robin 3-24, single 2-64, double 3-32, and bunco 8-24 in fours. Other
    counts are clamped and reported.
  - `rounds`: 0 prints the whole schedule. A smaller number prints only
    the first rounds (mixer and round robin).
  - `sport`: pickleball, tennis, badminton, table tennis, chess, cards
    or generic.
  - `seeding`: `auto`, `standard` or `random_draw`. Auto means standard
    seeding for brackets and a random draw for the rest.
  - `grand_final_reset`: double elimination only.
  - `names`: up to 64. Letters the print font lacks are dropped and
    reported.
  - `title`, `page` and `large_print`.
- **Generation:**
  - **Round robin:** the circle method. One player stays fixed while
    the others rotate. The first listed of each pair is home, except
    the fixed player, who alternates.
  - **Mixer:** for 4, 5, 8, 9, 12, 13, 16, 17, 20, 21 and 24 players
    the schedule is a whist tournament. Each round is a base round of
    tables shifted by one element of a cyclic group (Z3 × Z3 for 9
    players). The base rounds were found by computer search and are
    re-tallied from the games every time. For 7, 11, 15, 19 and 23
    players, the whist schedule for one more player is used with that
    player removed: their game sits out each round. For 6, 10, 14, 18
    and 22 players, the circle method's rounds of pairs are read as
    partnerships, so nobody partners twice. One pair sits out together
    each round, and a seeded local search groups the rest into games to
    even out opponents and sit-outs.
  - **Brackets:** standard seeding order (1 v 16, 8 v 9, ...), with
    byes placed where the missing lowest seeds would be. A random draw
    shuffles the players but keeps the byes spread. In the losers'
    bracket, first-round losers play each other. Each later winners'
    round drops its losers in (in reversed order on alternate rounds,
    to put off rematches), and the survivors play each other between
    drops.
  - **Bunco:** the seed draws the round-one seating.
  - The default seeding gives a different draw for each seed, except
    standard brackets, which are the same for every seed.
- **Solving:** nothing to solve; this is a design.
- **Guarantees:** every page's schedule is checked before it is drawn,
  and the tests check again by independent recounts.
  - **Mixer:** every player appears once per round, and no two players
    partner twice. When the number of players leaves 0 or 1 over when
    divided by 4, everyone partners everyone exactly once and faces
    everyone exactly twice (a whist schedule, checked for every such
    size). Otherwise the number of unplayed partnerships equals the
    proven minimum: each round seats at most 4 × ⌊n/4⌋ players.
    Opponent counts and sit-outs are recounted and printed. With 3 over
    a multiple of 4, everyone sits out exactly three times. Elsewhere,
    sit-outs are within one of each other for every size from 4 to 24.
  - **Round robin:** every pair meets exactly once and nobody plays
    twice in a round. Home and away counts are within one for every
    player, and exactly equal when the field is odd. This is checked
    for every size from 3 to 24.
  - **Brackets:** the bracket is played through every outcome when it
    has at most 15 real matches. Larger brackets are played with
    favourites winning, underdogs winning, and 1,500 random outcome
    patterns. Each time there must be one champion, and everyone else
    must be out after exactly one loss (two in double elimination with
    the reset). No result is sent to two places. With standard
    seeding, each block of the draw holds exactly one of the top 2, 4,
    8 ... seeds. Byes number exactly the bracket size minus the field,
    go to the top seeds, and never meet each other.
  - **Bunco:** from the printed seating, all 2^tables ways a round can
    end are moved on. Each leaves four at every table, everyone seated
    once, the head-table winners in place, and no partnership repeated.
    Because the check holds from any valid seating, it holds for the
    whole night.
- **Caveats:**
  - Mixers with 2 over a multiple of 4 balance opponents only as well
    as the local search manages. With 6 players, one game per round
    cannot balance them at all. The page states the range achieved.
  - Without a reset, the winners' bracket champion can go out after one
    loss in the final, and the page says so.
  - Brackets are one page, so 64-player knockouts and 32-player double
    eliminations use small type.
