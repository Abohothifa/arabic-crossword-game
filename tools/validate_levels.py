# -*- coding: utf-8 -*-
"""Independent validator for web/levels.json.
Checks: grid size, every word's letters match the grid, every crossing
matches, every word intersects >=1 other word, no duplicate answers,
no duplicate clues, totals per difficulty/category.
Exit 0 only if everything passes.
"""
import json, os, sys
from collections import Counter

here = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(here, "..", "web", "levels.json")
with open(path, encoding="utf-8") as f:
    data = json.load(f)

errors = []
puzzles = data["puzzles"]
all_answers, all_clues = [], []
for p in puzzles:
    pid = p["id"]
    if p["rows"] != len(p["grid"]) or any(len(r) != p["cols"] for r in p["grid"]):
        errors.append(f"{pid}: grid dimensions mismatch")
    # word letters vs grid
    occ = {}  # (r,c) -> list of (word idx, letter)
    for wi, w in enumerate(p["words"]):
        ans = w["answer"]
        for i, ch in enumerate(ans):
            r = w["row"] + (1 if w["dir"] == "v" else 0) * i
            c = w["col"] + (1 if w["dir"] == "h" else 0) * i
            if not (0 <= r < p["rows"] and 0 <= c < p["cols"]):
                errors.append(f"{pid}: word {ans} out of bounds")
                continue
            if p["grid"][r][c] != ch:
                errors.append(f"{pid}: word {ans} letter {ch} != grid {p['grid'][r][c]} at ({r},{c})")
            occ.setdefault((r, c), []).append((wi, ch))
        all_answers.append(ans)
        all_clues.append(w["clue"])
    # every cell in grid that is a letter must belong to a word
    covered = set(occ.keys())
    for r, row in enumerate(p["grid"]):
        for c, ch in enumerate(row):
            if ch != "#" and (r, c) not in covered:
                errors.append(f"{pid}: grid letter {ch} at ({r},{c}) not covered by any word")
    # every word intersects another
    for wi, w in enumerate(p["words"]):
        shared = False
        for i in range(len(w["answer"])):
            r = w["row"] + (1 if w["dir"] == "v" else 0) * i
            c = w["col"] + (1 if w["dir"] == "h" else 0) * i
            if len(occ.get((r, c), [])) > 1:
                shared = True
        if not shared:
            errors.append(f"{pid}: word {w['answer']} is isolated (no intersection)")
    # crossings match (implied by grid check + occ letters equal)
    for (r, c), lst in occ.items():
        if len(set(ch for _, ch in lst)) != 1:
            errors.append(f"{pid}: crossing mismatch at ({r},{c})")

for ans, n in Counter(all_answers).items():
    if n > 1:
        errors.append(f"duplicate answer: {ans} x{n}")
for clue, n in Counter(all_clues).items():
    if n > 1:
        errors.append(f"duplicate clue: {clue} x{n}")

total = sum(len(p["words"]) for p in puzzles)
print(f"puzzles={len(puzzles)} words={total}")
print("difficulty:", dict(Counter(p["difficulty"] for p in puzzles)))
print("category:", dict(Counter(p["category"] for p in puzzles)))
print("words per puzzle:", sorted(len(p["words"]) for p in puzzles))
if errors:
    print(f"FAILED with {len(errors)} errors:")
    for e in errors[:30]:
        print(" -", e)
    sys.exit(1)
print("VALIDATION PASSED: all intersections match, every word intersects, no duplicates")
