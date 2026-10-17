"""
FirstLabs Prep — FED-2026 Mock Test Suite Generator
Generates realistic timed mock tests:
1. Round 1: Online Screening Mock 1 (Full 45-min screening: JS, DOM, Web Standards, Analytical)
2. Round 1: JavaScript & DOM Deep Diagnostic Mock 2 (Tricky output prediction, closures, event propagation)
3. Round 2: Coding & SQL Mixed Assessment Mock 3 (60-min timed code & query evaluation)
4. Round 2: SQL Data Querying & Aggregate Mastery Mock 4
5. FED-2026 Comprehensive Pre-Drive Simulation Mock 5
"""

import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
CONTENT_DIRS = [
    BASE_DIR / "content",
    BASE_DIR / "backend" / "app" / "content",
    BASE_DIR / "frontend" / "src" / "data",
]

# Read mcqs.json to construct mock test questions
with open(BASE_DIR / "content" / "mcqs.json", "r", encoding="utf-8") as f:
    mcqs = json.load(f)

def build_mock(mock_id: int, title: str, duration_minutes: int, round_type: str, selected_ids: list, description: str):
    q_map = {q["id"]: q for q in mcqs}
    mock_questions = []
    for idx, qid in enumerate(selected_ids, start=1):
        orig = q_map.get(qid, mcqs[idx % len(mcqs)])
        mock_q = dict(orig)
        mock_q["id"] = f"mock_{mock_id}_{idx}"
        mock_q["q_number"] = idx
        mock_q["source"] = f"Mock {mock_id}: {title}"
        mock_questions.append(mock_q)

    return {
        "mock_id": mock_id,
        "title": title,
        "round_type": round_type,
        "duration_minutes": duration_minutes,
        "total_questions": len(mock_questions),
        "description": description,
        "questions": mock_questions
    }

mocks = [
    build_mock(
        mock_id=1,
        title="Round 1: Screening Diagnostic Mock",
        duration_minutes=45,
        round_type="Round 1 — Screening",
        selected_ids=["fl_js_01", "fl_js_02", "fl_js_03", "fl_js_04", "fl_js_05", "fl_dom_01", "fl_dom_02", "fl_dom_03", "fl_web_01", "fl_web_02", "fl_web_03", "fl_ana_01", "fl_ana_02", "fl_ana_03", "fl_ana_04"],
        description="Comprehensive 45-minute timed screening mock covering core JavaScript, DOM mechanics, CSS specificity, and analytical problem-solving."
    ),
    build_mock(
        mock_id=2,
        title="Round 1: Advanced JS & DOM Output Mock",
        duration_minutes=40,
        round_type="Round 1 — Screening",
        selected_ids=["fl_js_06", "fl_js_07", "fl_js_08", "fl_js_09", "fl_js_10", "fl_js_11", "fl_js_12", "fl_dom_04", "fl_dom_05", "fl_dom_06", "fl_web_04", "fl_web_05", "fl_web_06", "fl_ana_05", "fl_ana_06"],
        description="Focused assessment targeting tricky asynchronous event loop queues, closures, prototype chaining, and DOM event delegation."
    ),
    build_mock(
        mock_id=3,
        title="Round 2: Coding & SQL Fast Assessment",
        duration_minutes=50,
        round_type="Round 2 — Coding & SQL",
        selected_ids=["fl_js_01", "fl_js_06", "fl_js_08", "fl_js_10", "fl_web_01", "fl_web_05", "fl_ana_01", "fl_ana_05"],
        description="Fast assessment simulating Round 2 technical MCQs and algorithm checks aligned with the candidate recruitment email."
    ),
    build_mock(
        mock_id=4,
        title="Web Standards & Browser Performance Mock",
        duration_minutes=35,
        round_type="Round 1 — Screening",
        selected_ids=["fl_web_01", "fl_web_02", "fl_web_03", "fl_web_04", "fl_web_05", "fl_web_06", "fl_web_07", "fl_web_08", "fl_web_09", "fl_dom_01"],
        description="Targeted test on HTTP status codes, caching headers, Core Web Vitals (INP/LCP/CLS), accessibility, and critical rendering path."
    ),
    build_mock(
        mock_id=5,
        title="FED-2026 Full Pre-Drive Final Simulation",
        duration_minutes=60,
        round_type="Full Comprehensive Simulation",
        selected_ids=["fl_js_02", "fl_js_04", "fl_js_06", "fl_js_07", "fl_js_10", "fl_dom_02", "fl_dom_04", "fl_dom_05", "fl_web_01", "fl_web_04", "fl_web_06", "fl_web_08", "fl_ana_01", "fl_ana_03", "fl_ana_05"],
        description="The ultimate benchmark mock test before the real First Labs assessment. Tests full breadth under tight time constraints."
    )
]

def save_json(filename: str, data):
    for d in CONTENT_DIRS:
        target = d / filename
        with open(target, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved {filename} ({len(data)} mocks) to all targets.")

save_json("mock_tests.json", mocks)
