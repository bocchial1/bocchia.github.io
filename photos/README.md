# ?? photos

Drop your photos in **this folder** and they'll automatically appear in the
website carousel — no code editing required.

## How to add photos

1. Add image files here (`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.avif`, `.svg`).
2. Commit & push them (or upload via the GitHub website: **Add file ? Upload files**).
3. Refresh the site — your photos show up in **"Us Through the Years"**. ?

That's it! The page reads this folder through the GitHub API on the live site,
so whatever you put here appears in order by filename.

## Tips

- **Ordering:** prefix filenames with numbers to control the order, e.g.
  `01-first-date.jpg`, `02-trip.jpg`, `03-anniversary.jpg`.
- **Captions:** the caption is generated from the filename. `our-beach-day.jpg`
  becomes "Our beach day". The leading number prefix is ignored.
- **Placeholders:** files starting with `_` (like `_placeholder-1.svg`) are
  treated as samples and hidden as soon as you add real photos. Feel free to
  delete the `_placeholder-*.svg` files once you've added your own.
- **Size:** large photos load slower. Resizing to ~1600px wide is plenty.

## Optional: manifest.json

If you'd rather list photos explicitly (e.g. for custom captions), create a
`manifest.json` here:

```json
[
  { "src": "01-first-date.jpg", "caption": "Our very first date ??" },
  { "src": "02-trip.jpg",       "caption": "That trip we loved ??" }
]
```

This is only used as a fallback if the automatic folder listing isn't available.
