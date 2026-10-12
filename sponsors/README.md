# Sponsor slots

The live sponsor list is `sponsors.json` in the R2 bucket **lakolam-sponsors**.
The website Worker reads it as pages are served (cached for a minute), so a
change shows on www.lakolam.com within about a minute — no rebuild, no deploy.
Browsers may hold a page for up to five minutes more.

This folder is a working copy; the bucket is what counts.

## sponsors.json

```json
{
  "slots": [
    { "name": "Acme", "url": "https://acme.com/", "logo": "acme.png" },
    null, null, null,
    null, null, null, null
  ],
  "tiers": [
    { "first": 1, "last": 4, "price": 49, "label": "First row" },
    { "first": 5, "last": 8, "price": 29, "label": "Second row" }
  ]
}
```

- `slots`: exactly 8 entries in reading order (1–4 the first row, 5–8 the
  second). `null` is an open slot ("Your logo here").
- `name` (1–40 characters) is shown under the logo; `url` is the link
  (`?ref=lakolam` is added).
- `logo` — any one of:
  - a file you uploaded to the bucket's `logos/` folder, e.g. `"acme.png"`
    (served at `https://www.lakolam.com/sponsors/logos/acme.png`);
  - a full image URL, e.g. `"https://acme.com/logo.svg"`;
  - a data URL, e.g. `"data:image/png;base64,iVBORw0KGgo…"`;
  - bare base64 of a PNG, JPEG, WebP, GIF or SVG, e.g. `"iVBORw0KGgo…"`
    (the type is read from its first bytes). Base64 logos are capped at
    200,000 characters (~150 KB) because they are inlined into every page;
    use a `logos/` file for anything bigger.

  Leave it out for a tile showing the brand's first letter. Square PNG, SVG
  or WebP, about 128 px, looks best.
- `tiers` (optional): monthly prices per row, shown on /sponsor/.

If the file is invalid, the site ignores it and shows every slot open; the
Worker logs why (`npx wrangler tail lakolam-www`). Check a file before
uploading with `npm run sponsors:check`.

## Changing it

From this repo (signed in to wrangler):

```sh
npm run sponsors:check                         # validate sponsors/sponsors.json
npm run sponsors:push                          # upload it to R2
npx wrangler r2 object put lakolam-sponsors/logos/acme.png --file sponsors/logos/acme.png --remote
npm run sponsors:pull                          # download the live file to sponsors/
```

Or in the Cloudflare dashboard: **R2 → lakolam-sponsors**, upload a new
`sponsors.json`, and logos into `logos/`.
