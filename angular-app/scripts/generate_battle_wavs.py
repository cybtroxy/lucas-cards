#!/usr/bin/env python3
"""Genera public/sounds/battle/*.wav — tonos suaves, pentatónica mayor de Do, niños 8–10 años.

Requisitos: numpy, scipy. Sample rate 44100 Hz mono. Export con scipy.io.wavfile.

Notas permitidas (Hz): C4, D4, E4, G4, A4, C5, D5, E5, G5; A5 solo en fanfarria final (880 Hz).
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
from scipy.io import wavfile

# --- Constantes de audio -----------------------------------------------------

SR = 44100
ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "sounds" / "battle"

# C major pentatonic (Hz)
C4, D4, E4, G4, A4 = 261.63, 293.66, 329.63, 392.00, 440.00
C5, D5, E5, G5 = 523.25, 587.33, 659.25, 783.99
A5 = 880.00  # fanfarria; misma fila pentatónica (2× A4)

# ADSR global (segundos / nivel)
ATTACK = 0.01
DECAY = 0.1
SUSTAIN_LEVEL = 0.6
RELEASE = 0.2

MAX_AMP = 0.4

# A3 drone (~220 Hz) — por encima de 150 Hz
A3 = 220.00


def ns(sec: float) -> int:
    return max(1, int(round(sec * SR)))


def triangle_wave(phase_rad: np.ndarray) -> np.ndarray:
    """Triangle from sine phase; suave, sin dientes duros."""
    x = (phase_rad / (2 * np.pi)) % 1.0
    return 2.0 * np.abs(2.0 * x - 1.0) - 1.0


def osc(freq_hz: float, n: int, sr: int, shape: str = "sine") -> np.ndarray:
    """Oscilador seno o triángulo, frecuencia constante."""
    t = np.arange(n, dtype=np.float64) / sr
    phase = 2.0 * np.pi * freq_hz * t
    if shape == "triangle":
        return triangle_wave(phase)
    return np.sin(phase)


def adsr_envelope(n: int, sr: int, attack: float, decay: float, sustain: float, release: float) -> np.ndarray:
    """ADSR suave; si la nota es corta, escala A/D/R para caber sin cortes abruptos."""
    T = n / sr
    a, d, r = attack, decay, release
    need = a + d + r
    if need > T:
        scale = (T / need) * 0.995
        a, d, r = a * scale, d * scale, r * scale

    t = np.arange(n, dtype=np.float64) / sr
    env = np.zeros(n, dtype=np.float64)

    t_attack_end = a
    t_decay_end = a + d
    t_release_start = max(t_decay_end, T - r)

    # Attack: 0 → 1
    mask_a = t < t_attack_end
    if a > 1e-9:
        env[mask_a] = t[mask_a] / a
    else:
        env[mask_a] = 1.0

    # Decay: 1 → sustain
    mask_d = (t >= t_attack_end) & (t < t_decay_end)
    if d > 1e-9:
        u = (t[mask_d] - t_attack_end) / d
        env[mask_d] = 1.0 - u * (1.0 - sustain)
    else:
        env[mask_d] = sustain

    # Sustain
    mask_s = (t >= t_decay_end) & (t < t_release_start)
    env[mask_s] = sustain

    # Release: sustain → 0
    mask_r = t >= t_release_start
    if r > 1e-9:
        u = np.clip((t[mask_r] - t_release_start) / r, 0.0, 1.0)
        env[mask_r] = sustain * (1.0 - u)
    else:
        env[mask_r] = 0.0

    # Fade-out final implícito (nunca corte seco)
    tail = max(1, int(0.002 * sr))
    if n > tail:
        fade = np.linspace(1.0, 0.0, tail) ** 1.5
        env[-tail:] *= fade

    return np.clip(env, 0.0, 1.0)


def tone_note(freq: float, duration_sec: float, sr: int, peak_amp: float, shape: str = "sine") -> np.ndarray:
    """Una nota con envolvente ADSR y amplitud máxima peak_amp."""
    n = ns(duration_sec)
    env = adsr_envelope(n, sr, ATTACK, DECAY, SUSTAIN_LEVEL, RELEASE)
    body = osc(freq, n, sr, shape=shape)
    return (body * env * peak_amp).astype(np.float64)


def mix_sequence(
    segments: list[tuple[float, float, float] | tuple[float, float, float, str]],
    total_duration: float,
    sr: int,
    peak_per_note: float,
    shape: str = "sine",
) -> np.ndarray:
    """segments: (freq, t_start, dur_sec) o con cuarto elemento: 'sine' | 'triangle'."""
    out = np.zeros(ns(total_duration), dtype=np.float64)
    for item in segments:
        freq = item[0]
        t0 = item[1]
        d = item[2]
        sh = item[3] if len(item) > 3 else shape
        seg = tone_note(freq, d, sr, peak_per_note, shape=sh)
        i0 = int(round(t0 * sr))
        end = min(len(out), i0 + len(seg))
        seg_len = end - i0
        if seg_len > 0:
            out[i0:end] += seg[:seg_len]
    return soft_limit(out, MAX_AMP)


def soft_limit(x: np.ndarray, ceiling: float) -> np.ndarray:
    """Normaliza sin clipping duro; mantiave picos bajo `ceiling`."""
    peak = float(np.max(np.abs(x))) if x.size else 0.0
    if peak < 1e-12:
        return x
    return x * (ceiling / peak)


def to_int16_mono(x: np.ndarray, ceiling: float = MAX_AMP) -> np.ndarray:
    x = soft_limit(x.astype(np.float64), ceiling)
    return np.clip(np.round(x * 32767.0), -32768, 32767).astype(np.int16)


def write_wav(name: str, samples: np.ndarray) -> None:
    path = OUT_DIR / name
    path.parent.mkdir(parents=True, exist_ok=True)
    wavfile.write(str(path), SR, samples)
    dur_ms = 1000.0 * len(samples) / SR
    print(f"Wrote {name}  duration_ms={dur_ms:.1f}")


# --- Generadores por cue -----------------------------------------------------

def gen_hit_enemy() -> np.ndarray:
    """E5 → D5, 0.3 s, descendente breve."""
    total = 0.3
    half = total * 0.5
    segments = [
        (E5, 0.0, half, "sine"),
        (D5, half * 0.92, half + 0.02, "sine"),  # leve solape para transición suave
    ]
    raw = mix_sequence(segments, total, SR, peak_per_note=0.32, shape="sine")
    return to_int16_mono(raw.astype(np.float64))


def gen_hit_player() -> np.ndarray:
    """C4 + G4 simultáneos, 0.3 s — quinta justa suave."""
    n = ns(0.3)
    env = adsr_envelope(n, SR, ATTACK, DECAY, SUSTAIN_LEVEL, RELEASE)
    t = np.arange(n) / SR
    ph_c = 2 * np.pi * C4 * t
    ph_g = 2 * np.pi * G4 * t
    # Senos mezclados; amplitud por canal para que la suma no supere MAX_AMP
    sig = 0.22 * np.sin(ph_c) + 0.22 * np.sin(ph_g)
    out = sig * env
    return to_int16_mono(out)


def gen_heal() -> np.ndarray:
    """C5 → D5 → E5 → G5, 0.5 s."""
    total = 0.5
    step = total / 4.0
    overlap = step * 0.15
    segments = [
        (C5, 0.0, step + overlap, "sine"),
        (D5, step - overlap * 0.5, step + overlap, "sine"),
        (E5, 2 * step - overlap * 0.5, step + overlap, "sine"),
        (G5, 3 * step - overlap * 0.5, step + overlap, "sine"),
    ]
    raw = mix_sequence(segments, total, SR, peak_per_note=0.28, shape="sine")
    return to_int16_mono(raw.astype(np.float64))


def gen_death_single() -> np.ndarray:
    """E4 → C4, 0.5 s."""
    total = 0.5
    segments = [
        (E4, 0.0, total * 0.52, "sine"),
        (C4, total * 0.42, total * 0.55, "sine"),
    ]
    raw = mix_sequence(segments, total, SR, peak_per_note=0.3, shape="sine")
    return to_int16_mono(raw.astype(np.float64))


def gen_death_double() -> np.ndarray:
    """Capa G4→E4 y D4→C4 a la vez, 0.5 s."""
    total = 0.5
    half = total * 0.48

    def layer_float(segments: list[tuple[float, float, float, str]], peak: float) -> np.ndarray:
        out = np.zeros(ns(total), dtype=np.float64)
        for freq, t0, d, sh in segments:
            seg = tone_note(freq, d, SR, peak, shape=sh)
            i0 = int(round(t0 * SR))
            end = min(len(out), i0 + len(seg))
            if end > i0:
                out[i0:end] += seg[: end - i0]
        return out

    seg_a = [(G4, 0.0, half, "triangle"), (E4, half * 0.9, half + 0.03, "triangle")]
    seg_b = [(D4, 0.0, half, "triangle"), (C4, half * 0.9, half + 0.03, "triangle")]
    return to_int16_mono(layer_float(seg_a, 0.22) + layer_float(seg_b, 0.22))


def gen_round_win() -> np.ndarray:
    """C5 → E5 → G5, 0.7 s."""
    total = 0.7
    step = total / 3.0
    ov = step * 0.12
    segments = [
        (C5, 0.0, step + ov, "sine"),
        (E5, step - ov * 0.5, step + ov, "sine"),
        (G5, 2 * step - ov * 0.5, step + ov, "sine"),
    ]
    raw = mix_sequence(segments, total, SR, peak_per_note=0.32, shape="sine")
    return to_int16_mono(raw.astype(np.float64))


def gen_round_lose() -> np.ndarray:
    """E4 → D4 → C4, 0.7 s."""
    total = 0.7
    step = total / 3.0
    ov = step * 0.12
    segments = [
        (E4, 0.0, step + ov, "sine"),
        (D4, step - ov * 0.5, step + ov, "sine"),
        (C4, 2 * step - ov * 0.5, step + ov, "sine"),
    ]
    raw = mix_sequence(segments, total, SR, peak_per_note=0.3, shape="sine")
    return to_int16_mono(raw.astype(np.float64))


def gen_match_lose() -> np.ndarray:
    """2 s: drone A3 muy suave + melodía C4 → D4 → C4."""
    total = 2.0
    n = ns(total)
    t = np.arange(n, dtype=np.float64) / SR
    # Drone con envolvente global muy suave (sin golpes)
    env_drone = 0.08 * (np.sin(np.pi * t / total) ** 1.5)
    ph_a = 2 * np.pi * A3 * t
    drone = env_drone * np.sin(ph_a)

    mel = np.zeros(n, dtype=np.float64)
    # tres notas repartidas
    ranges = [(0.15, 0.55), (0.75, 1.15), (1.35, 1.85)]
    notes_hz = [C4, D4, C4]
    for (t0, t1), fq in zip(ranges, notes_hz, strict=True):
        d = t1 - t0
        seg = tone_note(fq, d, SR, 0.22, shape="sine")
        i0 = int(round(t0 * SR))
        mel[i0 : i0 + len(seg)] += seg[: n - i0]

    out = soft_limit(drone + mel, MAX_AMP)
    return to_int16_mono(out)


def gen_match_win() -> np.ndarray:
    """3 s: C5 → E5 → G5 → A5 → G5 fanfarria suave."""
    total = 3.0
    # reparto temporal aproximado (intervalos pequeños)
    segments = [
        (C5, 0.05, 0.45, "sine"),
        (E5, 0.45, 0.45, "sine"),
        (G5, 0.95, 0.5, "sine"),
        (A5, 1.55, 0.45, "sine"),
        (G5, 2.15, 0.7, "sine"),
    ]
    raw = mix_sequence(segments, total, SR, peak_per_note=0.28, shape="sine")
    return to_int16_mono(raw.astype(np.float64))


def main() -> None:
    writers = [
        ("hit-enemy.wav", gen_hit_enemy),
        ("hit-player.wav", gen_hit_player),
        ("heal.wav", gen_heal),
        ("death-single.wav", gen_death_single),
        ("death-double.wav", gen_death_double),
        ("round-win.wav", gen_round_win),
        ("round-lose.wav", gen_round_lose),
        ("match-lose.wav", gen_match_lose),
        ("match-win.wav", gen_match_win),
    ]
    for name, fn in writers:
        write_wav(name, fn())


if __name__ == "__main__":
    main()
