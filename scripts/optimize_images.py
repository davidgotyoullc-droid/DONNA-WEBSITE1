"""Convert all generated PNGs to sized WebP for fast loading. Run once."""
import os

from PIL import Image

ROOT = "/app/frontend/public/images"

for dirpath, _, files in os.walk(ROOT):
    for f in sorted(files):
        if not f.endswith(".png"):
            continue
        src = os.path.join(dirpath, f)
        dst = src[:-4] + ".webp"
        im = Image.open(src).convert("RGB")
        maxdim = 1000 if "/hero" in dirpath else 800
        im.thumbnail((maxdim, maxdim), Image.LANCZOS)
        im.save(dst, "WEBP", quality=80, method=6)
        old_kb = os.path.getsize(src) // 1024
        new_kb = os.path.getsize(dst) // 1024
        os.remove(src)
        print(f"{f}: {old_kb}KB -> {new_kb}KB")
