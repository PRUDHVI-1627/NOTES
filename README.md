# NOTES

A simple notes app built with HTML, CSS, and vanilla JavaScript. Notes are saved to localStorage so they persist after you close the browser.

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
- Delete any note with the 🗑 button
- Notes reload when you come back to the page
- Press Enter to add new lines inside a note

## Notes

- Uses `document.execCommand("insertLineBreak")` to handle the Enter key — this keeps line breaks clean inside `contenteditable` elements.
- The localStorage key is `my_notes`. Clearing site data in your browser will erase all notes.
- No frameworks, no dependencies — just plain HTML/CSS/JS.