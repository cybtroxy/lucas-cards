#!/usr/bin/env python3
"""Genera public/sounds/shop-pick.wav — confirmación breve al añadir carta desde la tienda."""

from __future__ import annotations

import math
import struct
import wave
from pathlib import Path

SR = 22050
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "sounds" / "shop-pick.wav"


def env(i: int, n: int, attack: int = 40, release: int = 180) -> float:
    a = min(1.0, i / attack) if attack else 1.0
    r = min(1.0, (n - 1 - i) / release) if release else 1.0
    return a * r


def main() -> None:
    d1 = int(0.048 * SR)
    gap = int(0.014 * SR)
    d2 = int(0.092 * SR)
    samples: list[int] = []

    f1 = 523.25
    ph = 0.0
    for i in range(d1):
        ph += 2 * math.pi * f1 / SR
        s = math.sin(ph) * 0.38 * env(i, d1, 30, max(1, d1 - 20))
        samples.append(int(max(-32768, min(32767, s * 32767))))

    samples.extend([0] * gap)

    f2 = 659.25
    ph = 0.0
    for i in range(d2):
        ph += 2 * math.pi * f2 / SR
        s = math.sin(ph) * 0.36 * env(i, d2, 25, max(1, d2 - 40))
        samples.append(int(max(-32768, min(32767, s * 32767))))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(OUT), "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(b"".join(struct.pack("<h", x) for x in samples))

    print("Wrote", OUT, "duration_ms=", round(1000 * len(samples) / SR, 1))


if __name__ == "__main__":
    main()
