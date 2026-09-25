#!/usr/bin/env python3
"""
scripts/validate_content.py
Validates all normalized content files to verify:
- No duplicate questions or IDs
- Valid options (A, B, C, D) and presence of correct_answer
- No missing explanations or statements
- Proper coding starter templates
- Valid interview questions and categories
Generates content_validation_report.json
"""

import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
CONTENT_DIR = BASE_DIR / "content"
REPORT_FILE = BASE_DIR / "content_validation_report.json"

def validate_all():
    report = {
        "status": "PASSED",
        "mcqs": {"total": 0, "duplicates": 0, "missing_options": 0, "missing_answers": 0, "missing_explanations": 0},
        "coding_problems": {"total": 0, "duplicates": 0, "missing_starter_code": 0, "missing_statements": 0},
        "interview_questions": {"total": 0, "duplicates": 0, "missing_answers": 0},
        "mock_tests": {"total_tests": 0, "total_questions": 0, "missing_answers": 0},
        "errors": []
    }

    # 1. Validate MCQs
    mcq_path = CONTENT_DIR / "mcqs.json"
    if mcq_path.exists():
        with open(mcq_path, "r", encoding="utf-8") as f:
            mcqs = json.load(f)
        report["mcqs"]["total"] = len(mcqs)
        seen_ids = set()
        for q in mcqs:
            qid = q.get("id")
            if qid in seen_ids:
                report["mcqs"]["duplicates"] += 1
                report["errors"].append(f"Duplicate MCQ ID: {qid}")
            seen_ids.add(qid)

            options = q.get("options", {})
            for opt in ["A", "B", "C", "D"]:
                if opt not in options or not options[opt]:
                    report["mcqs"]["missing_options"] += 1
                    report["errors"].append(f"MCQ {qid} missing option {opt}")
                    break

            if not q.get("correct_answer") or q["correct_answer"] not in ["A", "B", "C", "D"]:
                report["mcqs"]["missing_answers"] += 1
                report["errors"].append(f"MCQ {qid} invalid or missing correct_answer")

            if not q.get("explanation"):
                report["mcqs"]["missing_explanations"] += 1

    # 2. Validate Coding Problems
    coding_path = CONTENT_DIR / "coding_problems.json"
    if coding_path.exists():
        with open(coding_path, "r", encoding="utf-8") as f:
            problems = json.load(f)
        report["coding_problems"]["total"] = len(problems)
        seen_cids = set()
        for p in problems:
            cid = p.get("id")
            if cid in seen_cids:
                report["coding_problems"]["duplicates"] += 1
                report["errors"].append(f"Duplicate coding problem ID: {cid}")
            seen_cids.add(cid)

            if not p.get("statement"):
                report["coding_problems"]["missing_statements"] += 1
            if not p.get("starter_code_python") or not p.get("starter_code_java"):
                report["coding_problems"]["missing_starter_code"] += 1

    # 3. Validate Interview Questions
    interview_path = CONTENT_DIR / "interview_questions.json"
    if interview_path.exists():
        with open(interview_path, "r", encoding="utf-8") as f:
            iqs = json.load(f)
        report["interview_questions"]["total"] = len(iqs)
        seen_iqs = set()
        for iq in iqs:
            iqid = iq.get("id")
            if iqid in seen_iqs:
                report["interview_questions"]["duplicates"] += 1
            seen_iqs.add(iqid)
            if not iq.get("question") or not iq.get("sample_answer"):
                report["interview_questions"]["missing_answers"] += 1

    # 4. Validate Mocks
    mock_path = CONTENT_DIR / "mock_tests.json"
    if mock_path.exists():
        with open(mock_path, "r", encoding="utf-8") as f:
            mocks = json.load(f)
        report["mock_tests"]["total_tests"] = len(mocks)
        for m in mocks:
            report["mock_tests"]["total_questions"] += len(m.get("questions", []))
            for mq in m.get("questions", []):
                if not mq.get("correct_answer"):
                    report["mock_tests"]["missing_answers"] += 1

    if report["errors"]:
        report["status"] = "WARNINGS"

    with open(REPORT_FILE, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    print(f"Validation finished with status: {report['status']}")
    print(f"MCQs validated: {report['mcqs']['total']}")
    print(f"Coding problems validated: {report['coding_problems']['total']}")
    print(f"Interview questions validated: {report['interview_questions']['total']}")
    print(f"Mock test questions validated: {report['mock_tests']['total_questions']}")
    print(f"Total error count: {len(report['errors'])}")
    print(f"Report saved to: {REPORT_FILE}")

if __name__ == "__main__":
    validate_all()
