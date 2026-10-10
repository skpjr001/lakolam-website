#!/usr/bin/env python3
"""Website art in a generator's colour style.

Most generators' website art is their default page at seed 0xa11ce. A few
default to black-and-white line art for printing and colouring, which reads
as faint grey at thumbnail size; their thumbnail and OG image are rendered
from the colour style listed here instead — the same engine, seed and
generator, one documented spec change.

    LAKO_BIN=/path/to/lako python3 scripts/showcase-art.py
    # then: node scripts/sync-content.mjs (copies assets-src into the site)
"""

import json
import os
import subprocess
import tempfile

SHOWCASE = {
    "parametric": {"style": "colour", "palette": "sunset"},
    "photoparametric": {"style": "colour", "palette": "ocean", "mode": "spiral"},
    "quasicrystal": {"style": "colour"},
    "complexart": {"style": "colour"},
    "snowflake": {"style": "colour"},
    "wagara": {"style": "colour"},
    "damask": {"style": "colour"},
    "walldrawing": {"style": "colour"},
}

lako = os.environ.get("LAKO_BIN", "lako")
here = os.path.join(os.path.dirname(__file__), "..", "assets-src")

with tempfile.TemporaryDirectory() as tmp:
    for gid, spec in SHOWCASE.items():
        path = os.path.join(tmp, f"{gid}.json")
        with open(path, "w") as f:
            json.dump(spec, f)
        for profile, folder in (("thumbnail", "thumbs"), ("og_image", "og")):
            subprocess.run(
                [lako, "preview", "-g", gid, "--seed", "0xa11ce", "--spec", path,
                 "--profile", profile, "-o", os.path.join(here, folder, f"{gid}.png")],
                check=True,
                capture_output=True,
            )
        print("showcase:", gid, spec)
