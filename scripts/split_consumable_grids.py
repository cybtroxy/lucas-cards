#!/usr/bin/env python3
"""
Split 2x2 grid images in sources/consumables into four PNGs each (A=TL, B=TR, C=BL, D=BR).
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

CONSUMABLES = Path(__file__).resolve().parents[1] / "sources" / "consumables"
OUT = CONSUMABLES / "split"

# UUID fragment unique per source file -> [A, B, C, D] base names (English, max 4 underscore-separated words)
NAMES: dict[str, list[str]] = {
    "9ccc47d9-1a99-4855-9466-ab438cca8ca8": [
        "health_potion_glass",
        "red_apple",
        "carrot",
        "metal_ingot",
    ],
    "c8fdfefe-a94d-421e-86d6-824effdc8897": [
        "erlenmeyer_flask",
        "copper_coil",
        "short_sword",
        "wooden_shield",
    ],
    "35670750-58be-4218-8697-968ada271e2a": [
        "gas_cylinder",
        "fuel_canister",
        "metal_sheet",
        "salt_crystals",
    ],
    "a92fd4bc-dc8d-42f8-87c5-df6f25fc47b9": [
        "crystal_heart",
        "energy_orb",
        "smooth_stone",
        "oak_leaf",
    ],
    "7b227114-4840-4f59-8b6e-f81623071124": [
        "round_health_potion",
        "ripe_apple",
        "carrot_root",
        "steel_ingot",
    ],
    "8b025ec3-6d91-4ba5-b14a-52edd5e982eb": [
        "cresting_wave",
        "soft_cloud",
        "erupting_volcano",
        "wind_spiral",
    ],
    "62c08d22-2da1-4781-b913-a2d3bd6a014c": [
        "field_mouse",
        "coiled_snake",
        "garden_snail",
        "eagle_head",
    ],
    "a7bdf124-0ba9-4585-ac02-5350d3b56b92": [
        "bear_portrait",
        "striped_fish",
        "armored_mermaid",
        "triceratops_skull",
    ],
    "48be038a-34bb-4f94-96d3-ddb726fe47e7": [
        "cracked_earth",
        "flaming_meteor",
        "lightning_bolt",
        "water_droplet",
    ],
    "51898646-f949-408a-8e09-bbec671d8185": [
        "sparkling_mana_flask",
        "amber_liquid_bottle",
        "bubbling_test_tube",
        "leather_waterskin",
    ],
    "1aea0d0f-12ce-446e-bcfe-c90fcb653219": [
        "grapes",
        "lemon",
        "broccoli",
        "button_mushroom",
    ],
}


def find_source_files() -> dict[str, Path]:
    out: dict[str, Path] = {}
    for uid in NAMES:
        matches = [p for p in CONSUMABLES.glob("*.jpg") if uid in p.name]
        if len(matches) != 1:
            raise FileNotFoundError(f"Expected one jpg for {uid}, got {matches!r}")
        out[uid] = matches[0]
    return out


def split_grid(im: Image.Image) -> tuple[Image.Image, Image.Image, Image.Image, Image.Image]:
    w, h = im.size
    hw, hh = w // 2, h // 2
    a = im.crop((0, 0, hw, hh))
    b = im.crop((hw, 0, w, hh))
    c = im.crop((0, hh, hw, h))
    d = im.crop((hw, hh, w, h))
    return a, b, c, d


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    used_names: set[str] = set()
    sources = find_source_files()

    for uid, base_names in NAMES.items():
        path = sources[uid]
        im = Image.open(path).convert("RGBA")
        parts = split_grid(im)
        labels = ("A", "B", "C", "D")
        for label, part, base in zip(labels, parts, base_names, strict=True):
            words = base.split("_")
            if len(words) > 4:
                raise ValueError(f"{base!r} has more than 4 words")
            fname = f"{base}.png"
            if fname in used_names:
                raise ValueError(f"Duplicate output name {fname} (uid {uid})")
            used_names.add(fname)
            out_path = OUT / fname
            part.save(out_path, "PNG")
            print(f"{path.name} [{label}] -> {out_path.relative_to(OUT.parents[1])}")


if __name__ == "__main__":
    main()
