# bocchia.github.io

A cute Y2K / Windows XP–styled GitHub Pages site showing the agenda for
**Alex & Sky's 5th Anniversary Date** 💙💗

- Blue theme for **Alex**, pink theme for **Sky**, with bubbly 2000s lettering.
- Live timeline of the day's itinerary (pottery class, dinner, dessert & more).
- Floating hearts, a faux XP window + taskbar, and a live clock for the full nostalgic vibe.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure & content |
| `styles.css` | Y2K / XP theming |
| `script.js` | Builds the itinerary, clocks, and playful interactions |

## "Request a Change" notifications

There's a 💌 **Request a Change** button (in the hero and as a floating button)
that opens a cute dialog where Sky (or anyone) can ask Alex to tweak the plan.

Choose how Alex gets notified by editing `NOTIFY_CONFIG` at the top of `script.js`:

| Option | Setup | Result |
| --- | --- | --- |
| **Web3Forms** (recommended) | Get a free Access Key at [web3forms.com](https://web3forms.com) and set `web3formsKey` | Request is emailed to your inbox instantly, no email app needed |
| **Formspree** | Create a form at [formspree.io](https://formspree.io) and set `formspreeId` | Same, via Formspree |
| **Email fallback** (zero setup) | Set `notifyEmail` to your address | Clicking *Send* opens the visitor's email app with the message pre-filled |

If a Web3Forms/Formspree send fails, it automatically falls back to the email method.

> ⚠️ By default `notifyEmail` is `alex@example.com` — change it to your real
> email (or add a Web3Forms key) so requests actually reach you.

## Photo carousel ("Us Through the Years")

The page shows a swipeable, auto-playing photo carousel.

### ✨ Just drop photos in the `photos/` folder

**You don't need to edit any code.** Add image files to the [`photos/`](photos/)
folder (commit/push them, or upload via GitHub's **Add file → Upload files**),
and they appear in the carousel automatically. On the live GitHub Pages site
the page reads the folder contents through the GitHub API, so whatever is in
`photos/` shows up, ordered by filename.

- Prefix filenames with numbers (`01-...`, `02-...`) to control order.
- Captions are auto-generated from filenames (`our-trip.jpg` → "Our trip").
- Files starting with `_` are treated as placeholders and hidden once you add
  real photos — delete the `_placeholder-*.svg` samples whenever you like.

See [`photos/README.md`](photos/README.md) for full details.

How photos are loaded:

1. Images found in the `photos/` folder (auto-detected on the live site) —
   **merged with** `photos/manifest.json`, which lets you set custom captions
   and ordering for specific photos (manifest photos come first).
2. If the folder listing isn't available, `photos/manifest.json` alone.
3. The `PHOTOS` fallback array in `script.js` (CSS-only sample slides).

It auto-plays, supports prev/next buttons, dots, swipe on mobile, and pauses
on hover. If an image fails to load, it shows a friendly message.

### Why not embed a Google Photos album directly?

Google **deprecated** the simple shared-album embed, and the Google Photos
Library API requires OAuth plus a server — which a static GitHub Pages site
can't provide. Reading your own `photos/` folder is fast, reliable, lives in
your repo, and never breaks when Google changes things.

## Viewing locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Published via GitHub Pages at the repository's root.
