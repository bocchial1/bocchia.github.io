# Alessandro Bocchi — Portfolio

A single-page portfolio/resume site with a dark, glassmorphism aesthetic. Built as one
self-contained `index.html` (no build step, no dependencies) so it can be served directly
by GitHub Pages.

## Hosting on GitHub Pages

1. Open this repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Select the `main` branch and the `/ (root)` folder, then click **Save**.
4. After a minute or two, the site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Local preview

Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).
