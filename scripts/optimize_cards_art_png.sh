#!/usr/bin/env bash
# Lossy palette quantization (TinyPNG-like) + optional lossless recompress.
# Requires: brew install pngquant oxipng
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)/angular-app/public/cards-art"
if [[ ! -d "$ROOT" ]]; then
  echo "Not found: $ROOT" >&2
  exit 1
fi
command -v pngquant >/dev/null || { echo "Install pngquant: brew install pngquant" >&2; exit 1; }
command -v oxipng >/dev/null || { echo "Install oxipng: brew install oxipng" >&2; exit 1; }

before=$(find "$ROOT" -name "*.png" -print0 | xargs -0 stat -f%z 2>/dev/null | awk '{s+=$1} END {print s+0}')

while IFS= read -r -d '' f; do
  tmp="${f}.opt.tmp$$.png"
  if pngquant --quality=70-95 --speed 1 --strip --skip-if-larger --force -o "$tmp" "$f"; then
    if [[ -f "$tmp" ]]; then
      mv "$tmp" "$f"
    fi
  else
    rm -f "$tmp"
  fi
  oxipng -o 4 -q --strip all "$f" 2>/dev/null || true
done < <(find "$ROOT" -name "*.png" -print0)

after=$(find "$ROOT" -name "*.png" -print0 | xargs -0 stat -f%z 2>/dev/null | awk '{s+=$1} END {print s+0}')
echo "Total bytes: $before -> $after (saved: $((before - after)))"
