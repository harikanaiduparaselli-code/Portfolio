# Harika Naidu Paraselli — Portfolio

A responsive, dark-navy personal portfolio built with plain HTML, CSS and JavaScript. No build step needed.

## Run it

Open `index.html` in a browser, or serve the folder locally:

```bash
cd portfolio
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Files

```
portfolio/
├── index.html      # all content and structure
├── style.css       # design tokens (colours, fonts) are at the top in :root
├── script.js       # navigation, animations, form, and a small CONFIG block
├── assets/
│   ├── profile.jpg # YOU ADD THIS (see below)
│   └── projects/   # project screenshots go here
└── README.md
```

## What to replace (nothing personal was invented)

| Item | Where | What to do |
|---|---|---|
| Profile photo | `assets/profile.jpg` | Add a square photo (600×600 or larger). Until then, an "HN" monogram shows. |
| Resume | `assets/Harika_Naidu_Paraselli_Resume.pdf` | Add your PDF with this name, or change `resumePath` in `script.js`. |
| Email | `index.html` (Contact section) and `CONFIG.email` in `script.js` | Replace `your.email@example.com`. Setting `CONFIG.email` also makes the contact form open a pre-filled email. |
| LinkedIn | `index.html` (Contact section) | Replace `your-linkedin-username` in the link and its text. |
| GitHub | `index.html` (Contact section) | Replace `your-github-username` in the link and its text. |
| Site URL | `<link rel="canonical">` in `index.html` | Set to your real address once hosted. |

## Adding a project

In the Projects section of `index.html`, each card is an `<article class="project-card is-placeholder">`. For a real project:

1. Put a screenshot in `assets/projects/` (e.g. `my-project.jpg`).
2. Replace the `media-placeholder` div with `<img src="assets/projects/my-project.jpg" alt="Screenshot of My Project" loading="lazy" width="640" height="400">`.
3. Update the title, description and technology list.
4. Set the GitHub and Live Demo `href`s (remove `data-placeholder-link`), or delete a link you don't need.
5. Remove `is-placeholder` from the `<article>` class and delete the `ph-tag` span.

## Contact form note

This is a static site, so the form cannot send email by itself. With `CONFIG.email` set it opens the visitor's email app with the message filled in. For direct delivery you can later connect a service such as Formspree or Netlify Forms.

## Hosting for free

GitHub Pages, Netlify or Vercel can all host this folder as is.

## Credits

Icons: [Lucide](https://lucide.dev). Fonts: Fraunces, Inter and JetBrains Mono via Google Fonts.
