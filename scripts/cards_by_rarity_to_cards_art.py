#!/usr/bin/env python3
"""
Resize JPGs from sources/cards-by-rarity to 25% dimensions, save as PNG under
sources/cards-art preserving subfolders (1-common, …).

Output basename: last 12 characters of the original filename stem (before .jpg).
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "sources" / "cards-by-rarity"
DST = ROOT / "sources" / "cards-art"
SCALE = 0.25


def stem_suffix_12(stem: str) -> str:
    if len(stem) >= 12:
        return stem[-12:]
    return stem


def main() -> None:
    if not SRC.is_dir():
        raise SystemExit(f"Missing source dir: {SRC}")

    count = 0
    for path in sorted(SRC.rglob("*")):
        if not path.is_file():
            continue
        if path.suffix.lower() not in {".jpg", ".jpeg"}:
            continue

        rel_parent = path.parent.relative_to(SRC)
        out_dir = DST / rel_parent
        out_dir.mkdir(parents=True, exist_ok=True)

        key = stem_suffix_12(path.stem)
        out_path = out_dir / f"{key}.png"

        im = Image.open(path).convert("RGBA")
        w, h = im.size
        nw = max(1, int(round(w * SCALE)))
        nh = max(1, int(round(h * SCALE)))
        resized = im.resize((nw, nh), Image.Resampling.LANCZOS)
        resized.save(out_path, "PNG", optimize=True)
        count += 1
        if count <= 3 or count % 40 == 0:
            print(f"{path.relative_to(ROOT)} -> {out_path.relative_to(ROOT)}")

    print(f"Done: {count} PNG files -> {DST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
