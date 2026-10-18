---
title: "Hangman"
blurb: "Hangman — name the word from the letters found and the letters missed"
category: word
version: "1.0.0"
---
Name the word from the letters already found and the letters that missed.

## What it is

Each row is a game of hangman in progress. The letters guessed so far that are in the word stand in
their places; the letters guessed that are not in the word are listed as misses, and the drawing
shows how many there have been. Only one word can fit. Name it.

## How to play

1. Count the blanks: the word has that many letters.
2. A letter that has been found shows in every place it stands, so a blank never holds a letter
   that is already showing.
3. A blank never holds a missed letter either.
4. Use the theme beside the row (when shown) and think of words that fit the pattern. Only one
   English word fits each row. Write it in.

Playing the game: one player thinks of a word, the other guesses one letter at a time. A right
guess shows the letter everywhere it stands; a wrong guess adds a part to the drawing. Find the
word before seven misses complete it.

## Purpose

Spelling patterns, letter frequency and vocabulary. The printed rows turn the game into pure
deduction: every miss rules words out, and the reader must find the one word left.

## History

Hangman is a pencil-and-paper guessing game from Victorian times, recorded under that name since
the 1890s and played in classrooms everywhere since.

## This implementation

**Spec knobs:** `difficulty` (how many different letters are still hidden in each word: Kids 1,
with short everyday words; Easy 2; Medium 3; Hard 4; Expert 5), `count` (rows, 1–12), `theme` (12
themes or `mixed`), `show_theme`, `letter` (size, 10–40 pt).

**Generation:** answers come from a curated, family-friendly list of about 250 themed words, each
with a hint (all in the common dictionary tier). For each word the chosen number of different
letters is hidden; the rest count as found. Every other large-dictionary word that still fits is a
rival, and misses are added one at a time — always the letter outside the word that rules out the
most rivals — until none is left (at most six misses, so the game is still on). A word whose rivals
cannot all be ruled out is skipped. When a theme runs short for a band, other themes top it up
(`theme_topped_up`).

**Solving:** a word fits a row when it has the same length, the found letters in the same places,
and no guessed letter (found or missed) in any blank.

**Guarantees:** `unique` — exactly one word of the large dictionary (`Tier::Large`, about 114,000
words) fits each row. `rating_basis: hidden_letters`. Tests re-check every row against the whole
dictionary independently. The app game (`play`): words by band (Kids 3–5 basic letters, Easy 4–6,
Medium 6–8, Hard 8–10, Expert 9 and up) and theme with a hint each, seven misses, and a hint that
names the hidden letter leaving the fewest dictionary words fitting (`narrows`), or a hidden vowel
once only the answer fits (`vowel`).
