# Ctrl + Create Studio — Portfolio

A portfolio that opens like a Mac desktop. Visitors browse our work in Finder-style windows, flip through brochure pages in Quick Look, watch the reels and send a message from a Mail-style window.

**Live site:** https://ctrl-create-3673.github.io/ctrl-create-studio/

## What's inside

- **Intro.** A condensed, in-browser version of the Ctrl + Create logo reveal, built from the real logo vectors. A pen draws the first C, Ctrl+C / Ctrl+V creates the second, a click presses play, and a typing caret turns into the +. It plays once per visit, can be skipped, never plays with reduced motion turned on, and can be replayed from the CC menu.
- **Desktop.** A menu bar with a live clock, folders for Logos, Print, Websites, Motion and Our Brand, draggable windows (close / minimise / zoom) and a magnifying dock.
- **Finder.** Folder sidebar, search, and a thumbnail for every project.
- **Quick Look.** Page-by-page galleries with arrow keys, swipe and a thumbnail strip, plus project info and live links.
- **Contact.** A Mail-style compose window (opens your email app), WhatsApp and phone.
- **Phones.** Windows open full screen, the desktop becomes a home screen, and everything opens with a tap.
- **Brand guides.** Each of the 9 client logos has a 4-page guide (logo versions, clear space, minimum size, colour palette with HEX / RGB / CMYK, typography, don'ts). It's in the Brand Guides folder and after each logo's artwork in Quick Look, with a PDF download (`assets/guides/`).
- **Shareable links.** `…/#bemcon-steel` opens that project directly.

## Files

| Path | What it is |
|---|---|
| `index.html` | Page markup and the inline intro SVG |
| `css/style.css` | All styling, including phone layouts |
| `js/data.js` | **Projects and contact details. Edit this to add or change work.** |
| `js/loader.js` | The intro animation timeline |
| `js/desktop.js` | Windows, Finder, Quick Look, dock, menus |
| `assets/work/<project>/` | `01.webp`, `02.webp`… (large) and `01-thumb.webp`… (thumbnails) |
| `assets/video/` | Web versions of the reels and their poster frames |
| `assets/brand/` | Logos, favicon, social share image |

## Adding a project

1. Export the pages as images into `assets/work/my-project/` named `01.webp`, `02.webp`… plus `01-thumb.webp` (about 520 px).
2. Add an entry to `projects` in `js/data.js`:

```js
{ id: 'my-project', folder: 'logos', title: 'Client Name', kind: 'Logo', ext: 'ai', pages: 2, modified: 'Jan 2027',
  text: 'One or two sentences about the project.', tags: ['Logo design'] }
```

`folder` is one of `logos`, `print`, `web`, `motion` or `brand`. For a website, add `url: 'https://…'`. For a video, add `video`, `poster` and `thumb` paths instead of `pages`.

## Run locally

No build step. Serve the folder with any static server, for example:

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765.

## Contact

ctrlpluscreate3673@gmail.com · +91 95376 25252
