# Notes App

A simple notes app built with HTML, CSS, and vanilla JavaScript. Styled like a notebook — lined paper background, sticky-tape cards, and a handwritten font. Notes are saved to localStorage so they persist after you close the browser.

## Files

```
notes/
├── index.html   — markup and structure
├── style.css    — all styling
├── index.js     — create, delete, and save logic
└── README.md    — this file
```

## How to run

Just open `index.html` in your browser. No build tools or installs needed.

## Features

- Create as many notes as you want
- Notes auto-save as you type (localStorage)
- Delete any note with the "delete" button
- Notes reload when you come back to the page
- Each note gets a unique color dot
- Cards have a slight tilt for a natural feel
- Press Enter to add new lines inside a note

## Notes

- Uses `document.execCommand("insertLineBreak")` to handle the Enter key — keeps line breaks clean inside `contenteditable` elements.
- The localStorage key is `my_notes_v2`. Clearing site data in your browser will erase all notes.
- No frameworks, no dependencies — just plain HTML/CSS/JS.
- Fonts used: [Caveat](https://fonts.google.com/specimen/Caveat) (headings) and [Karla](https://fonts.google.com/specimen/Karla) (body), both from Google Fonts.