# Duaa Reader App

A first-version swipe-card reader for Morning and Evening adhkar using your exported Coda CSV data.

## How to use

Open `index.html` in a browser.

## Files

- `index.html` — app structure
- `styles.css` — pretty backgrounds and card design
- `app.js` — navigation and swipe behavior
- `data.js` — duaa data from your CSV

## Current scope

This version is intentionally simple:
- Home page
- Morning and Evening sections
- Intro/splash page
- Swipe cards
- Arabic, English, count, and virtues when available
- No tracking yet

## Later upgrades

- Done button per duaa
- Daily reset
- Progress tracking
- Favorites
- Font size controls
- Installable mobile app/PWA


Version 4: Fixed end-of-set card so it only appears after advancing past the final duaa.


Version 5 notes:
- Removed the slide/bounce animation when moving between cards.
- Card changes now feel steady and fixed in place.
- Kept keyboard arrow navigation, side arrows, and end-of-set behavior.

## Version 6

Morning and evening Arabic/English text has been broken into numbered phrase lines where available.


Version 7 notes:
- Reworked the card header so long generated titles do not get cut off.
- Uses a clean Duaa number/title plus a subtitle preview instead of showing chopped titles with ellipses.
- Keeps the card size consistent and preserves the inner scroll area.


Version 8 notes:
- Card titles are now consistently shown as Duaa 1, Duaa 2, etc.
- Numbered English lines stay in the body only, not in the title/header.
- The subtitle preview is cleaned so it does not start with a line number.


Version 9 changes:
- Restored ellipses on the preview line so it clearly reads as a partial title/preview.
- Removed the Back to last duaa button from the end screen.


Version 10 notes
- Added broader soft sage/lilac/cream colors.
- Added light emoji/icon accents.
- Added support for an optional `transliteration` field in data.js. If a duaa has transliteration, the app will show a Transliteration section between Arabic and Meaning. If it is blank/missing, that section stays hidden.
- Titles remain consistent as Duaa 1, Duaa 2, etc., with a partial preview line underneath.


Version 11 notes
- Added transliteration text for the current Morning/Evening duaa cards.
- Transliteration is stored as a separate field, so Arabic and English remain unchanged.
- Transliteration follows a simple readable style intended for family use; review/correction can be done later without changing the app layout.
