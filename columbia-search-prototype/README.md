# Columbia University — Search Prototype

A static prototype of the Columbia University search landing page, built from
`Columbia University Search animated.mp4`. It recreates the scene as live HTML,
with:

- the Low Library illustrated background
- a Columbia wordmark in the top-left
- a centered pill search bar
- birds flying across the sky and slow-drifting clouds
- a looping type-and-suggest animation that cycles through "Admissions",
  "Requirements", "Research", and "Recents"
- a footer with site links and social icons

## Files

- `index.html` — page structure
- `styles.css` — layout, styling, and the cloud / bird CSS animations
- `script.js` — typing and autocomplete dropdown animation loop
- `assets/low-library.png` — illustrated background

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
cd columbia-search-prototype
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy to GitHub Pages

See the step-by-step in the chat, or the short version:

1. `git init` inside this folder, commit, push to a new GitHub repo.
2. In the repo, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
4. Wait ~30s — your site will be live at
   `https://<your-username>.github.io/<repo-name>/`.
