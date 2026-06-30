# photos

Drop your photos in **this folder** and they'll automatically appear in the
website carousel — no code editing required.

## How to add photos

1. Add image files here (`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.avif`, `.svg`).
2. Commit & push them (or upload via the GitHub website: **Add file -> Upload files**).
3. Refresh the site — your photos show up in **"Us Through the Years"**.

That's it! The page reads this folder through the GitHub API on the live site,
so whatever you put here appears in order by filename.

## Tips

- **Ordering:** prefix filenames with numbers to control the order, e.g.
  `01-first-date.jpg`, `02-trip.jpg`, `03-anniversary.jpg`.
- **Captions:** the caption is generated from the filename. `our-beach-day.jpg`
  becomes "Our beach day". The leading number prefix is ignored.
- **Custom captions/order:** use `manifest.json` (below).
- **Size:** large photos load slower. Resizing to ~1600px wide is plenty.

## manifest.json — custom captions & order

A `manifest.json` lives here for photos that need a **specific caption** or a
**specific position**. It is merged with the automatic folder listing:

- Photos listed in the manifest appear **first**, in the order you list them,
  using the captions you write.
- Any other images you drop in the folder still appear **after**, with
  captions auto-generated from their filenames.

Current `manifest.json`:

```json
[
  { "src": "dinner-italy.jpg", "caption": "I hope this meal reminds us of the beautiful time we spent together in Italy" }
]
```

### To add the Italy dinner photo

1. Name your photo **`dinner-italy.jpg`** and drop it in this folder
   (or change the `"src"` value in `manifest.json` to match your filename).
2. Commit/upload it. Done — it shows first in the carousel with that caption.

You can add more entries the same way:

```json
[
  { "src": "dinner-italy.jpg", "caption": "Our beautiful time in Italy" },
  { "src": "first-date.jpg",   "caption": "Where it all began" }
]
```

Each entry's `src` can be a filename in this folder or a full `https://` image URL.
