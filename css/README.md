# Anusri Aditya S — Portfolio

A static, single-page portfolio. Plain HTML, CSS, and JavaScript — no build
step required.

```
├── index.html
├── css/style.css
├── js/script.js
└── assets/resume.pdf   ← placeholder, replace with your real resume
```

## Preview locally

Just open `index.html` in a browser — everything is plain HTML/CSS/JS, so
there's nothing to install or build. For live-reload while editing, you can
optionally run a tiny local server:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Customize

- **Text & sections:** edit directly in `index.html` — it's organized into
  clearly commented sections (Nav, Hero, About, Skills, Projects, etc).
- **Colors/fonts/spacing:** all in `css/style.css`, driven by CSS variables
  at the top of the file (`:root { --bg, --primary, --accent, ... }`).
- **Skill levels:** each skill bar has a `data-level="NN"` attribute (0–100)
  in `index.html` — change the number to adjust the bar and label together.
- **Projects:** duplicate a `<article class="project-card">` block and swap
  the title, description, badges, and links. Replace the inline SVG icon
  with a real screenshot if you'd like (swap `<div class="project-thumb">`
  contents for an `<img>`).
- **Resume:** replace `assets/resume.pdf` with your real resume, keeping the
  same filename — the Download Resume button already points to it.
- **Contact form:** it's currently client-side only (no server to receive
  submissions). Wire it up to one of:
  - [Formspree](https://formspree.io) — add `action="https://formspree.io/f/yourID"` to the `<form>`, no JS changes needed
  - [EmailJS](https://www.emailjs.com) — sends straight from the browser
  - Your own backend — POST the form fields to an API endpoint

## Deploy

Any static host works. Easiest options:

- **Netlify / Vercel:** drag-and-drop this folder, or connect a GitHub repo
- **GitHub Pages:** push to a repo, enable Pages on the `main` branch

No environment variables or backend needed — it's fully static.
