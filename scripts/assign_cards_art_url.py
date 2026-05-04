#!/usr/bin/env python3
"""
Assign art_url (filename only) from angular-app/public/cards-art/{1-common..5-legendary}
to cards in cards.json by matching card level (1..5) to folder.
Samples 20 random PNGs per folder and pairs them with the 20 cards of that level.
"""
from __future__ import annotations

import json
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CARDS_JSON = ROOT / "angular-app/src/app/core/data/cards.json"
PUBLIC_ART = ROOT / "angular-app/public/cards-art"

FOLDERS = {
    1: "1-common",
    2: "2-uncommon",
    3: "3-rare",
    4: "4-epic",
    5: "5-legendary",
}


def main() -> None:
    data: list[dict] = json.loads(CARDS_JSON.read_text(encoding="utf-8"))

    for level, folder in FOLDERS.items():
        dir_path = PUBLIC_ART / folder
        if not dir_path.is_dir():
            raise SystemExit(f"Missing folder: {dir_path}")

        pngs = sorted(dir_path.glob("*.png"))
        if len(pngs) < 20:
            raise SystemExit(f"{dir_path}: need at least 20 PNG files, found {len(pngs)}")

        picked = random.sample(pngs, 20)
        names = [p.name for p in picked]

        bucket = [c for c in data if c.get("level") == level]
        if len(bucket) != 20:
            raise SystemExit(f"Expected 20 cards at level {level}, got {len(bucket)}")
        random.shuffle(bucket)
        for card, fname in zip(bucket, names, strict=True):
            card["art_url"] = fname

    CARDS_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {CARDS_JSON.relative_to(ROOT)} (art_url set by level)")


if __name__ == "__main__":
    main()
