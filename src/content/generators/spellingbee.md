---
title: "Spelling Bee"
blurb: "Spelling Bee — words from seven letters, always using the centre, with a pangram"
category: word
version: "1.0.0"
---
Seven letters in a honeycomb — make as many words as you can, and every one
must use the letter in the middle.

## What it is

A hive of seven hexagons, each holding a different letter, with one in the
centre. Make words of four or more letters from the hive. Every word must
contain the centre letter; letters may be used more than once. A word that
uses all seven letters is a **pangram** — every hive has at least one. The page
says how many words and points there are to find, and gives a line for each.

## How to play

Start from the centre letter and try common endings and beginnings around it.
Look for the pangram early: it is usually the longest word, and finding it
shows which letters combine. Points: a four-letter word scores 1, longer words
score one per letter, and a pangram earns 7 more.

## Purpose

The New York Times' Spelling Bee is among the most-played word puzzles in the
world (hundreds of millions of plays a year), and a clue-free format that
suits every age: the hive is the whole puzzle. It pairs naturally with
`wordwheel`, which uses nine letters and at most one of each.

## History

Created by Frank Longo for The New York Times Magazine, where it ran in print
from 2014; the digital version launched in 2018. Letter-hive word games of the
same shape are much older staples of puzzle magazines.

## This implementation

- **Spec knobs:** `difficulty`, `cell`.
- **Dictionary:** a vendored list of about 3,800 common English words of four
  to eight letters (the union of the workspace's curated lists).
- **Generation:** hives are the letter sets of seven-distinct-letter words in
  the dictionary, so a pangram always exists; S is excluded, as in the
  newspaper, so plurals do not flood the list. Hives and centre letters are
  tried in seeded order until the word count lands in the requested band.
- **Guarantees:** deterministic per seed; the answer key is the complete list
  of dictionary words the hive makes — found by a bitmask scan and re-checked
  letter by letter in the tests — with pangrams underlined. Rated by how many
  words there are to find (Kids up to 11, Easy up to 17, Medium up to 27, Hard
  up to 41, Expert beyond). A word missing from the list is still a real word
  a solver may find; the count is of words in the list.
