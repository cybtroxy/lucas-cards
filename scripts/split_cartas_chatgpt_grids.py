#!/usr/bin/env python3
"""
Divide hojas de cartas en `sources/cartas-chatgpt/` en una cuadrícula de recortes iguales.

El primer número del nombre (`N-cards-*.png`) fija el total de celdas y la rejilla:
  - Cuadrado perfecto (4, 9, 16, 25, …): rejilla √N × √N (ej. 4 → 2×2, 25 → 5×5).
  - 20: 5 columnas × 4 filas (20 celdas).

Solo se procesan archivos en la raíz de cartas-chatgpt (no subcarpetas).
Salida: `sources/cartas-chatgpt/single-cards/{stem}_{índice:02d}.png` (orden fila por fila, izquierda→derecha).

Los archivos fuente ya recortados se registran en `sources/cartas-chatgpt/split-grids-processed.json`
y se omiten en ejecuciones posteriores (salvo `--force`). `--dry-run` no modifica el manifiesto.
"""
from __future__ import annotations

import argparse
import json
import math
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "sources" / "cartas-chatgpt"
DEFAULT_OUT = ROOT / "single-cards"
MANIFEST_NAME = "split-grids-processed.json"

# p.ej. 4-cards-01.png, 25-cards-00.jpeg
NAME_RE = re.compile(
    r"^(\d+)-cards-.+\.(png|jpg|jpeg|webp)$",
    re.IGNORECASE,
)


def grid_columns_rows(n: int) -> tuple[int, int] | None:
    """
    Devuelve (columnas, filas) o None si N no está soportado.
    Orden de recorrido: fila por fila, izquierda→derecha (la dimensión horizontal es columnas).
    """
    if n == 20:
        return (5, 4)
    side = math.isqrt(n)
    if side * side == n:
        return (side, side)
    return None


def load_processed(manifest_path: Path) -> set[str]:
    if not manifest_path.is_file():
        return set()
    try:
        data = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError) as e:
        print(f"Aviso: no se pudo leer {manifest_path}: {e}", file=sys.stderr)
        return set()
    items = data.get("processed")
    if not isinstance(items, list):
        return set()
    return {str(x) for x in items}


def save_processed(manifest_path: Path, names: set[str]) -> None:
    payload = {
        "version": 1,
        "processed": sorted(names),
    }
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def split_sheet(path: Path, out_dir: Path, dry_run: bool) -> int:
    m = NAME_RE.match(path.name)
    if not m:
        return 0
    n = int(m.group(1))
    grid = grid_columns_rows(n)
    if grid is None:
        print(
            f"Omitido {path.name}: {n} no tiene rejilla definida "
            f"(cuadrado perfecto o 20 = 5×4).",
            file=sys.stderr,
        )
        return 0

    n_cols, n_rows = grid
    if n_cols * n_rows != n:
        print(f"Error interno: {path.name} columnas×filas no coincide con N.", file=sys.stderr)
        return 0

    if dry_run:
        print(f"[dry-run] {path.name} → {n_cols} columnas × {n_rows} filas = {n} tiles")
        return n

    im = Image.open(path)
    im = im.convert("RGBA") if im.mode in ("RGBA", "LA", "P") else im.convert("RGB")
    w, h = im.size

    def axis_splits(total: int, parts: int) -> list[tuple[int, int]]:
        """Intervalos [start, end) que cubren todo `total` con partes que difieren como máximo 1 px."""
        base = total // parts
        rem = total % parts
        edges = [0]
        for i in range(parts):
            d = base + (1 if i < rem else 0)
            edges.append(edges[-1] + d)
        return list(zip(edges[:-1], edges[1:]))

    col_edges = axis_splits(w, n_cols)
    row_edges = axis_splits(h, n_rows)

    out_dir.mkdir(parents=True, exist_ok=True)
    stem = path.stem
    count = 0
    idx = 0
    for row in range(n_rows):
        top, bottom = row_edges[row]
        for col in range(n_cols):
            left, right = col_edges[col]
            tile = im.crop((left, top, right, bottom))
            out_path = out_dir / f"{stem}_{idx:02d}.png"
            tile.save(out_path, "PNG")
            count += 1
            idx += 1
    print(f"{path.name} → {count} archivos en {out_dir}")
    return count


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Recorta grillas de cartas-chatgpt (cuadradas o 20 = 5×4).",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=ROOT,
        help=f"Carpeta con las hojas (por defecto: {ROOT})",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=DEFAULT_OUT,
        help=f"Salida (por defecto: {DEFAULT_OUT})",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Solo listar qué se procesaría.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Ignorar el manifiesto y procesar todas las hojas que coincidan.",
    )
    parser.add_argument(
        "--manifest",
        type=Path,
        default=None,
        help=f"JSON de hojas ya procesadas (por defecto: <root>/{MANIFEST_NAME})",
    )
    args = parser.parse_args()
    root: Path = args.root.resolve()
    out_dir: Path = args.out.resolve()
    manifest_path: Path = (args.manifest if args.manifest is not None else root / MANIFEST_NAME).resolve()

    if not root.is_dir():
        print(f"No existe la carpeta: {root}", file=sys.stderr)
        sys.exit(1)

    processed_known = load_processed(manifest_path)
    skip_names = set() if args.force else processed_known
    if processed_known and not args.force:
        print(f"Manifiesto: {manifest_path} ({len(processed_known)} hoja(s) ya registradas).")
    elif args.force and processed_known:
        print("--force: se reprocesan todas las hojas; el manifiesto se fusionará al final.")

    total_tiles = 0
    newly_done: set[str] = set()
    for path in sorted(root.iterdir()):
        if not path.is_file():
            continue
        if path.name == MANIFEST_NAME:
            continue
        if path.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
            continue
        if not NAME_RE.match(path.name):
            continue
        if path.name in skip_names:
            print(f"Omitido (ya procesado): {path.name}")
            continue
        tiles = split_sheet(path, out_dir, args.dry_run)
        total_tiles += tiles
        if not args.dry_run and tiles > 0:
            newly_done.add(path.name)

    if not args.dry_run and newly_done:
        merged = processed_known | newly_done
        save_processed(manifest_path, merged)
        print(f"Manifiesto actualizado: +{len(newly_done)} hoja(s) → {manifest_path}")

    if args.dry_run:
        print(f"Total celdas (estimado): {total_tiles}")
    else:
        print(f"Hecho. Celdas escritas en esta pasada: {total_tiles}")


if __name__ == "__main__":
    main()
