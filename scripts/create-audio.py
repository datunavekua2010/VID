#!/usr/bin/env python3
"""Create the film's original, deterministic instrumental and foley mix."""

import math
import random
import struct
import wave
from array import array
from pathlib import Path

RATE = 44100
DURATION = 30
samples = array("f", [0.0]) * (RATE * DURATION)
rng = random.Random(82024)


def add_tone(start, duration, frequency, volume, kind="piano"):
    first = max(0, int(start * RATE))
    count = min(int(duration * RATE), len(samples) - first)
    for i in range(count):
        t = i / RATE
        attack = min(1.0, t / (0.025 if kind == "piano" else 0.12))
        release = min(1.0, (duration - t) / (0.35 if kind == "piano" else 0.6))
        if kind == "piano":
            envelope = attack * release * math.exp(-2.1 * t / duration)
            value = (math.sin(2 * math.pi * frequency * t)
                     + 0.24 * math.sin(2 * math.pi * frequency * 2.01 * t)
                     + 0.08 * math.sin(2 * math.pi * frequency * 3.02 * t))
        else:
            envelope = attack * release
            value = (math.sin(2 * math.pi * frequency * t)
                     + 0.12 * math.sin(2 * math.pi * frequency * 2 * t))
        samples[first + i] += volume * envelope * value


def note(midi):
    return 440 * 2 ** ((midi - 69) / 12)


def add_noise(start, duration, volume, smooth=0.8):
    first = int(start * RATE)
    count = min(int(duration * RATE), len(samples) - first)
    value = 0.0
    for i in range(count):
        t = i / RATE
        value = smooth * value + (1 - smooth) * rng.uniform(-1, 1)
        envelope = min(1, t / 0.045) * min(1, (duration - t) / 0.16)
        samples[first + i] += volume * value * envelope


# A simple, original repeating piano figure, gradually opening into major chords.
chords = [
    (0, [57, 60, 64, 67]),
    (4, [53, 57, 60, 64]),
    (8, [48, 55, 60, 64]),
    (12, [55, 59, 62, 67]),
    (16, [53, 57, 60, 65]),
    (20, [48, 55, 60, 64]),
    (24, [53, 57, 60, 65]),
    (27, [48, 55, 60, 64]),
]
for start, chord in chords:
    span = 3 if start == 24 else (3 if start == 27 else 4)
    for index in range(int(span * 2)):
        pitch = chord[index % len(chord)] + (12 if index % 4 == 3 else 0)
        add_tone(start + index * 0.5, 1.6, note(pitch), 0.045 if start < 12 else 0.052)
    for pitch in chord[:3]:
        add_tone(start, span + 0.5 if start < 27 else 2.8, note(pitch - 12), 0.009, "pad")

for start, pitch in [(11.2, 72), (12.1, 76), (13.2, 79), (15.6, 76),
                     (16.4, 74), (18.3, 76), (19.2, 79), (20.1, 81),
                     (23.2, 79), (24, 76), (25.0, 72),
                     (27.4, 72), (27.9, 76), (28.4, 79), (29.0, 84)]:
    add_tone(start, 1.35, note(pitch), 0.035)

# Quiet room, paper, walking, breeze, screen wake-up and small confirmations.
add_noise(0.0, 4.8, 0.014, 0.993)
for start in [0.65, 2.9, 9.35, 21.45, 22.35]:
    add_noise(start, 0.32, 0.045, 0.65)
add_noise(5.0, 3.9, 0.025, 0.995)
for index in range(7):
    start = 5.25 + index * 0.51
    add_noise(start, 0.13, 0.035, 0.91)
    add_tone(start, 0.11, 105, 0.025)
for start, pitch in [(10.65, 76), (10.8, 83), (11.0, 88), (12.2, 91),
                     (13.0, 88), (14.0, 95), (19.5, 84), (19.72, 88),
                     (23.15, 84), (23.35, 91)]:
    add_tone(start, 0.8, note(pitch), 0.025)
for index in range(12):
    add_noise(15.2 + index * 0.48, 0.07, 0.016, 0.7)

# Leave real headroom and end on a clean fade, without an abrupt cutoff.
peak = max(abs(value) for value in samples)
gain = 0.65 / peak if peak else 1.0
output = Path("public/audio/second-chance-original.wav")
output.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(output), "wb") as target:
    target.setnchannels(1)
    target.setsampwidth(2)
    target.setframerate(RATE)
    data = bytearray()
    for index, value in enumerate(samples):
        fade_in = min(1.0, index / (RATE * 0.5))
        fade_out = min(1.0, (len(samples) - 1 - index) / (RATE * 1.1))
        data.extend(struct.pack("<h", int(max(-1, min(1, value * gain * fade_in * fade_out)) * 32767)))
    target.writeframes(data)
print(f"Wrote {output}: {DURATION}s, peak {peak * gain:.3f}")