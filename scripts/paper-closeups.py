#!/usr/bin/env python3
"""Close-up art for the fine-ruled papers of the paper lane.

A whole Letter page of 5 mm graph paper shrunk to a 400 px thumbnail is a
blank square: 0.3 pt rulings fall far below a pixel. For these generators the
thumbnail and OG image are instead a 300-dpi close-up of the top-left corner
of the *default* page (the same page the studio opens), so the ruling is
visible at its true weight.

    LAKO_BIN=/path/to/lako python3 scripts/paper-closeups.py
    # then: node scripts/sync-content.mjs (copies assets-src into the site)
"""

import os
import subprocess
import tempfile

from PIL import Image, ImageOps

CLOSEUPS = (
    "graphpaper dotgrid isogrid isodot hexgrid trigrid crossgrid "
    "diamondgrid brickgrid octagongrid beadgrid dotlined hexdot circlegrid axonometric"
).split()

lako = os.environ.get("LAKO_BIN", "lako")
here = os.path.join(os.path.dirname(__file__), "..", "assets-src")

with tempfile.TemporaryDirectory() as tmp:
    for gid in CLOSEUPS:
        png = os.path.join(tmp, f"{gid}.png")
        subprocess.run(
            [lako, "preview", "-g", gid, "--seed", "0xa11ce", "--profile", "kdp_square_85", "-o", png],
            check=True,
            capture_output=True,
        )
        im = Image.open(png).convert("RGB")
        x0, y0, _, _ = ImageOps.invert(im).getbbox()  # the ink's top-left corner
        x0, y0 = x0 - 45, y0 - 45  # with a sliver of margin
        im.crop((x0, y0, x0 + 600, y0 + 600)).resize((400, 400), Image.LANCZOS).save(
            os.path.join(here, "thumbs", f"{gid}.png")
        )
        im.crop((x0, y0, x0 + 1200, y0 + 630)).save(os.path.join(here, "og", f"{gid}.png"))
        print("close-up:", gid)
