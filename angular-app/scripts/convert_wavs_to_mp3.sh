#!/usr/bin/env bash
# Genera .mp3 junto a cada .wav en public/sounds (ffmpeg).
# Uso: desde raíz del repo o desde angular-app:
#   bash angular-app/scripts/convert_wavs_to_mp3.sh
#
# Requiere ffmpeg instalado (brew install ffmpeg).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SND="$ROOT/public/sounds"

if [[ ! -d "$SND" ]]; then
  echo "No existe $SND — ejecuta desde el proyecto angular-app." >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Instala ffmpeg (p. ej. brew install ffmpeg)." >&2
  exit 1
fi

while IFS= read -r -d '' wav; do
  mp3="${wav%.wav}.mp3"
  if [[ -f "$mp3" ]]; then
    echo "Ya existe: $mp3"
    continue
  fi
  echo "encode: $wav -> $mp3"
  ffmpeg -y -nostdin -loglevel error -i "$wav" -codec:a libmp3lame -qscale:a 4 "$mp3"
done < <(find "$SND" -type f -name '*.wav' -print0)

echo "Listo. Activa MP3 en la app: preferMp3Assets / setPreferMp3Assets(true) o build flag."
