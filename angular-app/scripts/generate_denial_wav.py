#!/usr/bin/env python3
"""Genera public/sounds/denial.wav — tono corto de “negación” (dos fases + bajada de pitch)."""

from __future__ import annotations

import math
import struct
import wave
from pathlib import Path

SR = 22050
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "sounds" / "denial.wav"


def env(i: int, n: int, attack: int = 50, release: int = 200) -> float:
    a = min(1.0, i / attack) if attack else 1.0
    r = min(1.0, (n - 1 - i) / release) if release else 1.0
    return a * r


def main() -> None:
    d1 = int(0.055 * SR)
    gap = int(0.028 * SR)
    d2 = int(0.11 * SR)
    samples: list[int] = []

    f1 = 440.0
    ph = 0.0
    for i in range(d1):
        ph += 2 * math.pi * f1 / SR
        s = math.sin(ph) * 0.42 * env(i, d1, 35, max(1, d1 - 25))
        samples.append(int(max(-32768, min(32767, s * 32767))))

    samples.extend([0] * gap)

    f_hi, f_lo = 320.0, 120.0
    ph = 0.0
    for i in range(d2):
        t = i / max(1, d2 - 1)
        f = f_hi * (f_lo / f_hi) ** t
        ph += 2 * math.pi * f / SR
        s = math.sin(ph) * 0.4 * env(i, d2, 25, max(1, d2 - 35))
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
