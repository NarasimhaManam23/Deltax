import os
import re
import json
from pathlib import Path

BASE_DIR = Path(r"c:\Users\naras\OneDrive\Desktop\DeltaX")
CONTENT_DIR = BASE_DIR / "DELTAX_PREPARATION"
OUT_DIRS = [
    BASE_DIR / "content",
    BASE_DIR / "backend" / "app" / "content",
    BASE_DIR / "frontend" / "src" / "data",
]

report = {
    "summary": {},
    "validation_errors": [],
    "warnings": []
}

# -------------------------------------------------------------
# 1. PARSE SUBJECT MCQS
# -------------------------------------------------------------
def parse_subject_mcqs():
    mcqs = []
    files = {
        "Programming": CONTENT_DIR / "01_ROUND_1_MCQ" / "programming_100_mcqs.md",
        "DSA": CONTENT_DIR / "01_ROUND_1_MCQ" / "dsa_100_mcqs.md",
        "Networks": CONTENT_DIR / "01_ROUND_1_MCQ" / "networks_50_mcqs.md",
        "Cybersecurity": CONTENT_DIR / "01_ROUND_1_MCQ" / "cybersecurity_50_mcqs.md",
        "Microprocessors": CONTENT_DIR / "01_ROUND_1_MCQ" / "microprocessors_50_mcqs.md",
        "OOP": CONTENT_DIR / "01_ROUND_1_MCQ" / "oop_50_mcqs.md",
        "DBMS": CONTENT_DIR / "01_ROUND_1_MCQ" / "dbms_50_mcqs.md",
        "OS": CONTENT_DIR / "01_ROUND_1_MCQ" / "os_50_mcqs.md",
    }

    q_block_pattern = re.compile(r"### Q(\d+)\s*\n(.*?)(?=\n### Q\d+|\Z)", re.DOTALL)

    for subject, file_path in files.items():
        if not file_path.exists():
            report["warnings"].append(f"Missing MCQ file: {file_path.name}")
            continue
        text = file_path.read_text(encoding="utf-8")
        matches = q_block_pattern.findall(text)
        
        for q_num, body in matches:
            body = body.strip()
            opt_a = re.search(r"[-*]\s*A\)\s*(.+)", body)
            opt_b = re.search(r"[-*]\s*B\)\s*(.+)", body)
            opt_c = re.search(r"[-*]\s*C\)\s*(.+)", body)
            opt_d = re.search(r"[-*]\s*D\)\s*(.+)", body)

            ans_match = re.search(r"\*\*Correct Answer\*\*:\s*([A-D])", body)
            exp_match = re.search(r"\*\*Explanation\*\*:\s*(.*?)(?=\n\*\*Topic\*\*|\n\*\*Difficulty\*\*|\Z)", body, re.DOTALL)
            topic_match = re.search(r"\*\*Topic\*\*:\s*(.+)", body)
            diff_match = re.search(r"\*\*Difficulty\*\*:\s*(.+)", body)
            src_match = re.search(r"\*\*Source Classification\*\*:\s*(.+)", body)

            q_text_match = re.split(r"[-*]\s*A\)", body, maxsplit=1)
            q_text = q_text_match[0].strip() if q_text_match else ""

            if not (opt_a and opt_b and opt_c and opt_d and ans_match):
                report["warnings"].append(f"Malformed MCQ in {subject} Q{q_num}")
                continue

            mcq_obj = {
                "id": f"mcq_{subject.lower()}_{q_num}",
                "q_number": int(q_num),
                "subject": subject,
                "topic": topic_match.group(1).strip() if topic_match else subject,
                "difficulty": diff_match.group(1).strip() if diff_match else "Medium",
                "source": src_match.group(1).strip() if src_match else "GENERAL CS TOPIC",
                "question": q_text,
                "options": {
                    "A": opt_a.group(1).strip(),
                    "B": opt_b.group(1).strip(),
                    "C": opt_c.group(1).strip(),
                    "D": opt_d.group(1).strip(),
                },
                "correct_answer": ans_match.group(1).strip(),
                "explanation": exp_match.group(1).strip() if exp_match else ""
            }
            mcqs.append(mcq_obj)

    return mcqs

# -------------------------------------------------------------
# 2. PARSE ROUND 1 MOCKS
# -------------------------------------------------------------
def parse_mock_tests():
    ans_file = CONTENT_DIR / "01_ROUND_1_MCQ" / "mock_tests" / "answer_keys_and_scoring.md"
    ans_text = ans_file.read_text(encoding="utf-8") if ans_file.exists() else ""
    
    mock_keys = {1: {}, 2: {}, 3: {}, 4: {}, 5: {}}
    for m in range(1, 6):
        pattern = re.compile(rf"### Mock Test {m} Answer Key.*?\n(.*?)(?=\n### Mock Test|\n# PART 2|\Z)", re.DOTALL)
        match = pattern.search(ans_text)
        if match:
            table_lines = match.group(1).strip().splitlines()
            for line in table_lines:
                if not line.startswith("|") or "---" in line or "Ans" in line:
                    continue
                cells = [c.strip() for c in line.split("|")[1:-1]]
                for i in range(0, len(cells), 3):
                    if i + 2 < len(cells):
                        q_str = re.sub(r"[^\d]", "", cells[i])
                        ans = cells[i+1].strip()
                        top = cells[i+2].strip()
                        if q_str.isdigit():
                            mock_keys[m][int(q_str)] = {"ans": ans, "topic": top}

    mocks = []
    for m in range(1, 6):
        mock_file = CONTENT_DIR / "01_ROUND_1_MCQ" / "mock_tests" / f"mock_{m}.md"
        if not mock_file.exists():
            continue
        text = mock_file.read_text(encoding="utf-8")
        
        q_matches = re.findall(r"\*\*Q(\d+)\*\*:\s*(.*?)(?=\n\*\*Q\d+\*\*:|\Z)", text, re.DOTALL)
        questions = []
        for q_num_str, body in q_matches:
            q_num = int(q_num_str)
            opt_a = re.search(r"[-*]\s*A\)\s*(.+)", body)
            opt_b = re.search(r"[-*]\s*B\)\s*(.+)", body)
            opt_c = re.search(r"[-*]\s*C\)\s*(.+)", body)
            opt_d = re.search(r"[-*]\s*D\)\s*(.+)", body)
            
            q_text_match = re.split(r"[-*]\s*A\)", body, maxsplit=1)
            q_text = q_text_match[0].strip() if q_text_match else ""
            
            ans_info = mock_keys[m].get(q_num, {"ans": "A", "topic": "General"})
            
            questions.append({
                "id": f"mock_{m}_q_{q_num}",
                "q_number": q_num,
                "question": q_text,
                "options": {
                    "A": opt_a.group(1).strip() if opt_a else "",
                    "B": opt_b.group(1).strip() if opt_b else "",
                    "C": opt_c.group(1).strip() if opt_c else "",
                    "D": opt_d.group(1).strip() if opt_d else "",
                },
                "correct_answer": ans_info["ans"],
                "topic": ans_info["topic"],
                "explanation": f"Official Mock {m} question testing {ans_info['topic']}."
            })
        
        mocks.append({
            "mock_id": m,
            "title": f"DeltaX Round 1 Full Mock {m}",
            "duration_minutes": 45,
            "total_questions": len(questions),
            "instructions": "45 Minutes strict timer (54 seconds per question). 50 Questions covering Programming, DSA, Networks, Microprocessors, Cybersecurity, DBMS, OS, OOP.",
            "questions": questions
        })

    return mocks

# -------------------------------------------------------------
# 3. PARSE CODING PATTERNS & PROBLEMS
# -------------------------------------------------------------
def parse_coding_data():
    patterns = []
    pattern_files = sorted((CONTENT_DIR / "03_ROUND_3_CODING" / "patterns").glob("*.md"))
    
    for pf in pattern_files:
        content = pf.read_text(encoding="utf-8")
        # Matches: # PATTERN 1 & 2: ... or # PATTERN 3: ...
        sections = re.split(r"\n#+\s*PATTERN\s+([\d\s&]+):\s*(.+)", content, flags=re.IGNORECASE)
        if len(sections) > 1:
            for i in range(1, len(sections), 3):
                p_num_raw = sections[i].strip()
                p_title = sections[i+1].strip()
                p_body = sections[i+2].strip() if i+2 < len(sections) else ""
                
                clues = re.search(r"###\s*\d*\.?\s*Recognition Clues\s*\n(.*?)(?=###|\Z)", p_body, re.DOTALL)
                complexity = re.search(r"###\s*\d*\.?\s*Complexity\s*\n(.*?)(?=###|\Z)", p_body, re.DOTALL)
                java_code = re.search(r"```java\s*\n(.*?)```", p_body, re.DOTALL)
                python_code = re.search(r"```python\s*\n(.*?)```", p_body, re.DOTALL)
                mistakes = re.search(r"###\s*\d*\.?\s*Common Mistakes.*?Traps\s*\n(.*?)(?=###|\Z)", p_body, re.DOTALL)
                
                clean_num = p_num_raw.replace("&", "_").replace(" ", "")
                patterns.append({
                    "id": f"pattern_{clean_num}",
                    "number_label": p_num_raw,
                    "title": p_title,
                    "category": pf.stem.replace("0", "").replace("_", " ").title(),
                    "clues": clues.group(1).strip() if clues else "",
                    "complexity": complexity.group(1).strip() if complexity else "",
                    "java_code": java_code.group(1).strip() if java_code else "",
                    "python_code": python_code.group(1).strip() if python_code else "",
                    "mistakes": mistakes.group(1).strip() if mistakes else "",
                    "full_markdown": f"# PATTERN {p_num_raw}: {p_title}\n\n" + p_body
                })

    # Practice Problems
    practice_problems = []
    bank_files = [
        ("Easy", CONTENT_DIR / "03_ROUND_3_CODING" / "practice" / "question_bank_easy_to_medium.md"),
        ("Medium to Hard", CONTENT_DIR / "03_ROUND_3_CODING" / "practice" / "question_bank_medium_to_hard.md"),
        ("Application", CONTENT_DIR / "03_ROUND_3_CODING" / "practice" / "question_bank_application.md"),
    ]
    
    for default_tier, bf in bank_files:
        if not bf.exists():
            continue
        text = bf.read_text(encoding="utf-8")
        # Matches: ### Problem E01: Target Difference Pair
        # or ### Problem EM01: ...
        matches = re.findall(r"###\s*Problem\s+([A-Z0-9]+):\s*(.+?)\n(.*?)(?=\n###\s*Problem|\Z)", text, re.DOTALL)
        for code_id, title, body in matches:
            body = body.strip()
            stmt = re.search(r"[-*]\s*\*\*Statement\*\*:\s*(.+?)(?=[-*]\s*\*\*Input|[-*]\s*\*\*Constraints|\Z)", body, re.DOTALL)
            inp = re.search(r"[-*]\s*\*\*Input.*?\*\*:\s*(.+?)(?=[-*]\s*\*\*Output|[-*]\s*\*\*Constraints|\Z)", body, re.DOTALL)
            out = re.search(r"[-*]\s*\*\*Output.*?\*\*:\s*(.+?)(?=[-*]\s*\*\*Constraints|[-*]\s*\*\*Edge|\Z)", body, re.DOTALL)
            const = re.search(r"[-*]\s*\*\*Constraints\*\*:\s*(.+?)(?=[-*]\s*\*\*Edge|[-*]\s*\*\*Optimal|\Z)", body, re.DOTALL)
            edge = re.search(r"[-*]\s*\*\*Edge Cases\*\*:\s*(.+?)(?=[-*]\s*\*\*Optimal|\Z)", body, re.DOTALL)
            opt = re.search(r"[-*]\s*\*\*Optimal Approach\*\*:\s*(.+)", body)

            # Determine difficulty tier
            tier = "Easy"
            if code_id.startswith("EM"):
                tier = "Easy-Medium"
            elif code_id.startswith("E"):
                tier = "Easy"
            elif code_id.startswith("MH"):
                tier = "Medium-Hard"
            elif code_id.startswith("M"):
                tier = "Medium"
            elif code_id.startswith("A"):
                tier = "Application"
            else:
                tier = default_tier

            clean_slug = re.sub(r"[^a-z0-9]+", "_", title.lower()).strip("_")
            practice_problems.append({
                "id": f"code_{code_id.lower()}_{clean_slug}",
                "code_id": code_id,
                "title": title.strip(),
                "tier": tier,
                "difficulty": tier,
                "category": "AdTech & Application" if tier == "Application" else "Core DSA",
                "statement": stmt.group(1).strip() if stmt else body[:200],
                "input_format": inp.group(1).strip() if inp else "",
                "output_format": out.group(1).strip() if out else "",
                "constraints": const.group(1).strip() if const else "",
                "edge_cases": edge.group(1).strip() if edge else "",
                "approach": opt.group(1).strip() if opt else "",
                "body_markdown": body,
                "starter_code_java": f"// Solution for: {title.strip()}\n// Difficulty: {tier}\nimport java.util.*;\n\npublic class Solution {{\n    public static void main(String[] args) {{\n        Scanner sc = new Scanner(System.in);\n        // Write your solution here\n    }}\n}}\n",
                "starter_code_python": f"# Solution for: {title.strip()}\n# Difficulty: {tier}\ndef solve():\n    # Write your solution here\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
            })

    # Speed Mocks (30 mins)
    speed_mocks_file = CONTENT_DIR / "03_ROUND_3_CODING" / "current_30_min_mocks" / "mocks_1_to_10.md"
    speed_sols_file = CONTENT_DIR / "03_ROUND_3_CODING" / "current_30_min_mocks" / "solutions.md"
    speed_mocks = []
    if speed_mocks_file.exists():
        sm_text = speed_mocks_file.read_text(encoding="utf-8")
        sol_text = speed_sols_file.read_text(encoding="utf-8") if speed_sols_file.exists() else ""
        mock_blocks = re.split(r"\n##\s+Mock\s+(\d+)\s*\((.*?)\)", sm_text)
        for i in range(1, len(mock_blocks), 3):
            m_num = mock_blocks[i]
            m_fmt = mock_blocks[i+1]
            m_content = mock_blocks[i+2]
            
            speed_mocks.append({
                "mock_id": int(m_num),
                "title": f"Current Drive Speed Mock {m_num}",
                "format": m_fmt.strip(),
                "duration_minutes": 30,
                "content_markdown": m_content.strip(),
                "solutions_markdown": sol_text
            })

    # Historical Mocks (120 mins)
    hist_mocks_file = CONTENT_DIR / "03_ROUND_3_CODING" / "historical_mocks" / "mocks_1_to_10.md"
    hist_sols_file = CONTENT_DIR / "03_ROUND_3_CODING" / "historical_mocks" / "solutions.md"
    hist_mocks = []
    if hist_mocks_file.exists():
        hm_text = hist_mocks_file.read_text(encoding="utf-8")
        hsol_text = hist_sols_file.read_text(encoding="utf-8") if hist_sols_file.exists() else ""
        mock_blocks = re.split(r"\n##\s+Mock\s+Test\s+(\d+)\s*\((.*?)\)", hm_text)
        for i in range(1, len(mock_blocks), 3):
            m_num = mock_blocks[i]
            m_fmt = mock_blocks[i+1]
            m_content = mock_blocks[i+2]
            
            hist_mocks.append({
                "mock_id": int(m_num),
                "title": f"Historical DeltaX Mock {m_num}",
                "format": m_fmt.strip(),
                "duration_minutes": 120,
                "criteria": "Strict 55%+ per question cutoff requirement",
                "content_markdown": m_content.strip(),
                "solutions_markdown": hsol_text
            })

    return {
        "patterns": patterns,
        "practice_problems": practice_problems,
        "speed_mocks": speed_mocks,
        "historical_mocks": hist_mocks
    }

# -------------------------------------------------------------
# 4. PARSE INTERVIEW QUESTIONS (ALL FILES)
# -------------------------------------------------------------
def parse_interview_questions():
    interview_qs = []
    
    def extract_qa_file(fpath, round_num, category_prefix):
        if not fpath.exists():
            return
        text = fpath.read_text(encoding="utf-8")
        matches = re.findall(r"###\s*Q(\d+):\s*(.+?)\n(.*?)(?=\n###\s*Q\d+:|\Z)", text, re.DOTALL)
        for q_id, q_text, q_body in matches:
            intent = re.search(r"[-*]\s*\*\*Likely Intent\*\*:\s*(.+)", q_body)
            fw = re.search(r"[-*]\s*\*\*Answer Framework\*\*:\s*(.+)", q_body)
            sample = re.search(r"[-*]\s*\*\*Sample Answer\*\*:\s*(.+?)(?=[-*]\s*\*\*Bad|\Z)", q_body, re.DOTALL)
            bad = re.search(r"[-*]\s*\*\*Bad Answer\*\*:\s*(.+?)(?=[-*]\s*\*\*Possible|\Z)", q_body, re.DOTALL)
            followup = re.search(r"[-*]\s*\*\*Possible Follow-up\*\*:\s*(.+)", q_body)
            
            # Or Round 4 format: Definition, Deep Technical Detail, Trap
            idef = re.search(r"[-*]\s*\*\*Interview Definition\*\*:\s*(.+)", q_body)
            detail = re.search(r"[-*]\s*\*\*Deep Technical Detail\*\*:\s*(.+?)(?=[-*]\s*\*\*Interviewer|\Z)", q_body, re.DOTALL)
            trap = re.search(r"[-*]\s*\*\*Interviewer Trap\*\*:\s*(.+)", q_body)

            clean_q = q_text.strip().strip('"')
            interview_qs.append({
                "id": f"iq_r{round_num}_{category_prefix.lower()}_{q_id}",
                "round": round_num,
                "category": category_prefix,
                "question": clean_q,
                "intent": intent.group(1).strip() if intent else "",
                "framework": fw.group(1).strip() if fw else "",
                "sample_answer": sample.group(1).strip() if sample else (idef.group(1).strip() if idef else ""),
                "bad_answer": bad.group(1).strip() if bad else "",
                "follow_up": followup.group(1).strip() if followup else "",
                "definition": idef.group(1).strip() if idef else "",
                "deep_detail": detail.group(1).strip() if detail else "",
                "trap": trap.group(1).strip() if trap else "",
                "body_markdown": q_body.strip()
            })

    # Extract all Round 2 files
    extract_qa_file(CONTENT_DIR / "02_ROUND_2_AI" / "intro_and_company_questions.md", 2, "Intro & Company")
    extract_qa_file(CONTENT_DIR / "02_ROUND_2_AI" / "project_questions_adam1.md", 2, "Project: ADAM-1")
    extract_qa_file(CONTENT_DIR / "02_ROUND_2_AI" / "project_questions_simha_loan_akki.md", 2, "Projects: Simha/Loan/Akki")
    extract_qa_file(CONTENT_DIR / "02_ROUND_2_AI" / "technical_and_cs_questions.md", 2, "Technical & CS Rapid-Fire")
    extract_qa_file(CONTENT_DIR / "02_ROUND_2_AI" / "behavioral_and_comm_questions.md", 2, "Behavioral & Communication")

    # Extract Round 4 files
    extract_qa_file(CONTENT_DIR / "04_ROUND_4_INTERVIEW" / "100_technical_questions.md", 4, "100 Core Technical")

    # Parse 4 Projects Deep Dive
    proj_file = CONTENT_DIR / "04_ROUND_4_INTERVIEW" / "projects_deep_dive.md"
    projects_data = {}
    if proj_file.exists():
        p_text = proj_file.read_text(encoding="utf-8")
        for p_name in ["ADAM-1 Enhanced", "Simha AI", "Smart Loan Approval System", "Akki AI Assistant"]:
            m = re.search(rf"# PROJECT \d+:\s*{re.escape(p_name)}(.*?)(?=# PROJECT|\Z)", p_text, re.DOTALL)
            if m:
                projects_data[p_name] = m.group(1).strip()

    return {
        "questions": interview_qs,
        "projects_overview": projects_data
    }

# -------------------------------------------------------------
# 5. PARSE CHEAT SHEETS, STUDY NOTES & 4-DAY PLAN
# -------------------------------------------------------------
def parse_additional_content():
    cs_files = [
        ("Programming & DSA", CONTENT_DIR / "05_CHEAT_SHEETS" / "programming_and_dsa_cheatsheets.md"),
        ("CS Fundamentals", CONTENT_DIR / "05_CHEAT_SHEETS" / "cs_fundamentals_cheatsheets.md"),
        ("Interview Execution", CONTENT_DIR / "05_CHEAT_SHEETS" / "interview_and_project_cheatsheets.md"),
    ]
    cheatsheets = []
    for title, f in cs_files:
        if f.exists():
            cheatsheets.append({
                "id": f.stem,
                "category": title,
                "content_markdown": f.read_text(encoding="utf-8")
            })

    study_files = [
        ("Programming & DSA Core", CONTENT_DIR / "01_ROUND_1_MCQ" / "study_notes_programming_dsa.md"),
        ("Networks & Cybersecurity", CONTENT_DIR / "01_ROUND_1_MCQ" / "study_notes_networks_cybersecurity.md"),
        ("Microprocessors & Architecture", CONTENT_DIR / "01_ROUND_1_MCQ" / "study_notes_microprocessors_arch.md"),
        ("OOP, DBMS & Operating Systems", CONTENT_DIR / "01_ROUND_1_MCQ" / "study_notes_oop_dbms_os.md"),
        ("Coding Defense Strategy", CONTENT_DIR / "04_ROUND_4_INTERVIEW" / "coding_defense_strategy.md"),
        ("Resume & Tech Stack Deep Dive", CONTENT_DIR / "04_ROUND_4_INTERVIEW" / "resume_tech_stack_deep_dive.md"),
    ]
    study_notes = []
    for title, f in study_files:
        if f.exists():
            study_notes.append({
                "slug": f.stem,
                "title": title,
                "content_markdown": f.read_text(encoding="utf-8")
            })

    plan_file = CONTENT_DIR / "06_4_DAY_PLAN" / "final_plan.md"
    plan_text = plan_file.read_text(encoding="utf-8") if plan_file.exists() else ""
    
    plan_tasks = []
    curr_day = "Day 0: 25 Sept 2026"
    for line in plan_text.splitlines():
        if line.startswith("## DAY"):
            curr_day = line.replace("##", "").strip()
        elif line.startswith("| **") and not "Time Window" in line:
            parts = [p.strip() for p in line.split("|")[1:-1]]
            if len(parts) >= 4:
                plan_tasks.append({
                    "id": f"task_{len(plan_tasks)+1}",
                    "day": curr_day,
                    "time_window": parts[0].replace("**", ""),
                    "focus_area": parts[1].replace("**", ""),
                    "action": parts[2],
                    "deliverable": parts[3]
                })

    research = {
        "previous_drives": (CONTENT_DIR / "00_RESEARCH" / "previous_drives.md").read_text(encoding="utf-8") if (CONTENT_DIR / "00_RESEARCH" / "previous_drives.md").exists() else "",
        "evidence_map": (CONTENT_DIR / "00_RESEARCH" / "evidence_map.md").read_text(encoding="utf-8") if (CONTENT_DIR / "00_RESEARCH" / "evidence_map.md").exists() else "",
        "source_links": (CONTENT_DIR / "00_RESEARCH" / "source_links.md").read_text(encoding="utf-8") if (CONTENT_DIR / "00_RESEARCH" / "source_links.md").exists() else "",
        "drive_metadata": {
            "company": "DeltaX",
            "role": "Associate Product Engineer",
            "batch": "2027",
            "ctc": "₹7 LPA",
            "locations": ["Bangalore", "Hyderabad", "Pune"],
            "college": "RVR & JC College of Engineering",
            "drive_date": "2026-09-29",
            "rounds": [
                {"round": 1, "title": "Technical MCQ", "time": "10:00 AM – 10:45 AM", "duration": "45 Mins", "questions": 50, "format": "Online Technical Assessment"},
                {"round": 2, "title": "AI Telephonic Interview", "time": "Starts 12:30 PM", "duration": "15–20 Mins", "format": "Elimination Screening Filter"},
                {"round": 3, "title": "Online Coding Assessment", "time": "Starts 4:00 PM", "duration": "30 Mins (Official 2026 Email)", "format": "Coding Test (Historical: 5 Qs / 120 Mins / 55% criteria)"},
                {"round": 4, "title": "One-to-One Technical Interview", "time": "Starts 5:00 PM", "duration": "45 Mins", "format": "Deep Architecture, Live Notepad Coding & Defense"}
            ]
        }
    }

    return {
        "cheatsheets": cheatsheets,
        "study_notes": study_notes,
        "plan_tasks": plan_tasks,
        "research": research
    }

def main():
    print("Extracting full DeltaX preparation repository...")
    mcqs = parse_subject_mcqs()
    mocks = parse_mock_tests()
    coding_data = parse_coding_data()
    interview_data = parse_interview_questions()
    additional = parse_additional_content()

    datasets = {
        "mcqs.json": mcqs,
        "mock_tests.json": mocks,
        "coding_patterns.json": coding_data["patterns"],
        "coding_problems.json": coding_data["practice_problems"],
        "coding_speed_mocks.json": coding_data["speed_mocks"],
        "coding_historical_mocks.json": coding_data["historical_mocks"],
        "interview_questions.json": interview_data["questions"],
        "projects_overview.json": interview_data["projects_overview"],
        "cheatsheets.json": additional["cheatsheets"],
        "study_notes.json": additional["study_notes"],
        "plan_tasks.json": additional["plan_tasks"],
        "research.json": additional["research"],
    }

    for filename, data in datasets.items():
        for out_dir in OUT_DIRS:
            out_dir.mkdir(parents=True, exist_ok=True)
            target_path = out_dir / filename
            with open(target_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)

    report["summary"] = {
        "total_mcqs": len(mcqs),
        "total_round1_mocks": len(mocks),
        "total_coding_patterns": len(coding_data["patterns"]),
        "total_coding_problems": len(coding_data["practice_problems"]),
        "total_speed_mocks": len(coding_data["speed_mocks"]),
        "total_historical_mocks": len(coding_data["historical_mocks"]),
        "total_interview_questions": len(interview_data["questions"]),
        "total_cheat_sheets": len(additional["cheatsheets"]),
        "total_study_notes": len(additional["study_notes"]),
        "total_plan_tasks": len(additional["plan_tasks"]),
    }

    report_path = BASE_DIR / "content_validation_report.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    print("Success! Content extraction report:")
    print(json.dumps(report["summary"], indent=2))

if __name__ == "__main__":
    main()
