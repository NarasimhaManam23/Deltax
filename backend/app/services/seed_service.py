import json
import logging
from pathlib import Path
from sqlalchemy.orm import Session
from app.models.models import Question, CodingProblem, InterviewQuestion, ResearchSource, CandidateExperience

logger = logging.getLogger(__name__)

CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"

def seed_database(db: Session):
    try:
        # 1. Seed Questions (MCQs)
        js_count = db.query(Question).filter(Question.subject.in_(["JavaScript", "DOM Concepts", "Web Standards"])).count()
        if js_count == 0:
            mcqs_file = CONTENT_DIR / "mcqs.json"
            if mcqs_file.exists():
                with open(mcqs_file, "r", encoding="utf-8") as f:
                    mcq_data = json.load(f)
                
                question_objs = []
                for q in mcq_data:
                    # Check if already exists
                    existing = db.query(Question).filter(Question.id == q["id"]).first()
                    if existing:
                        continue
                    question_objs.append(Question(
                        id=q["id"],
                        q_number=q.get("q_number"),
                        subject=q["subject"],
                        topic=q["topic"],
                        difficulty=q.get("difficulty", "Medium"),
                        source=q.get("source", "FirstLabs Prep FED-2026"),
                        question_text=q["question"],
                        option_a=q["options"]["A"],
                        option_b=q["options"]["B"],
                        option_c=q["options"]["C"],
                        option_d=q["options"]["D"],
                        correct_answer=q["correct_answer"],
                        explanation=q.get("explanation", ""),
                        evidence_category=q.get("evidence_category", "Original practice question"),
                        confidence_label=q.get("confidence_label", "Original Practice"),
                        source_url=q.get("source_url"),
                        source_title=q.get("source_title"),
                        question_type=q.get("question_type", "mcq")
                    ))
                if question_objs:
                    db.bulk_save_objects(question_objs)
                    db.commit()
                    logger.info(f"Seeded {len(question_objs)} questions successfully.")

            # Also seed questions from mock_tests.json if not present
            mock_file = CONTENT_DIR / "mock_tests.json"
            if mock_file.exists():
                with open(mock_file, "r", encoding="utf-8") as f:
                    mock_data = json.load(f)
                mock_q_objs = []
                for m in mock_data:
                    for mq in m.get("questions", []):
                        if not db.query(Question).filter(Question.id == mq["id"]).first():
                            mock_q_objs.append(Question(
                                id=mq["id"],
                                q_number=mq.get("q_number"),
                                subject=mq.get("subject", "Mock Test"),
                                topic=mq.get("topic", "Comprehensive"),
                                difficulty=mq.get("difficulty", "Medium"),
                                source=f"Round 1 Mock {m['mock_id']}",
                                question_text=mq["question"],
                                option_a=mq["options"]["A"],
                                option_b=mq["options"]["B"],
                                option_c=mq["options"]["C"],
                                option_d=mq["options"]["D"],
                                correct_answer=mq["correct_answer"],
                                explanation=mq.get("explanation", ""),
                                evidence_category=mq.get("evidence_category", "Original practice question"),
                                confidence_label=mq.get("confidence_label", "Original Practice"),
                                question_type=mq.get("question_type", "mcq")
                            ))
                if mock_q_objs:
                    db.bulk_save_objects(mock_q_objs)
                    db.commit()
                    logger.info(f"Seeded {len(mock_q_objs)} mock test questions.")

        # 2. Seed Coding Problems
        sql_count = db.query(CodingProblem).filter(CodingProblem.category.in_(["JavaScript", "SQL"])).count()
        if sql_count == 0:
            code_file = CONTENT_DIR / "coding_problems.json"
            if code_file.exists():
                with open(code_file, "r", encoding="utf-8") as f:
                    code_data = json.load(f)
                
                prob_objs = []
                for p in code_data:
                    if db.query(CodingProblem).filter(CodingProblem.id == p["id"]).first():
                        continue
                    prob_objs.append(CodingProblem(
                        id=p["id"],
                        code_id=p.get("code_id"),
                        title=p["title"],
                        tier=p.get("tier"),
                        difficulty=p.get("difficulty"),
                        category=p.get("category"),
                        statement=p.get("statement", ""),
                        input_format=p.get("input_format"),
                        output_format=p.get("output_format"),
                        constraints=p.get("constraints"),
                        edge_cases=p.get("edge_cases"),
                        approach=p.get("approach"),
                        starter_code_java=p.get("starter_code_java"),
                        starter_code_python=p.get("starter_code_python"),
                        starter_code_javascript=p.get("starter_code_javascript"),
                        starter_code_sql=p.get("starter_code_sql"),
                        test_cases=p.get("test_cases"),
                        sample_data=p.get("sample_data"),
                        hints=p.get("hints"),
                        evidence_category=p.get("evidence_category", "Original practice question"),
                        confidence_label=p.get("confidence_label", "Original Practice")
                    ))
                if prob_objs:
                    db.bulk_save_objects(prob_objs)
                    db.commit()
                    logger.info(f"Seeded {len(prob_objs)} JavaScript & SQL coding practice problems.")

        # 3. Seed Interview Questions
        react_count = db.query(InterviewQuestion).filter(InterviewQuestion.category.in_(["React & Components", "Frontend Architecture", "Core Web Vitals"])).count()
        if react_count == 0:
            iq_file = CONTENT_DIR / "interview_questions.json"
            if iq_file.exists():
                with open(iq_file, "r", encoding="utf-8") as f:
                    iq_data = json.load(f)
                
                iq_objs = []
                for iq in iq_data:
                    if db.query(InterviewQuestion).filter(InterviewQuestion.id == iq["id"]).first():
                        continue
                    iq_objs.append(InterviewQuestion(
                        id=iq["id"],
                        round=iq.get("round", 3),
                        category=iq.get("category", "General"),
                        question=iq["question"],
                        intent=iq.get("intent"),
                        framework=iq.get("framework"),
                        sample_answer=iq.get("sample_answer"),
                        bad_answer=iq.get("bad_answer"),
                        follow_up=iq.get("follow_up"),
                        definition=iq.get("definition"),
                        deep_detail=iq.get("deep_detail"),
                        trap=iq.get("trap"),
                        body_markdown=iq.get("body_markdown")
                    ))
                if iq_objs:
                    db.bulk_save_objects(iq_objs)
                    db.commit()
                    logger.info(f"Seeded {len(iq_objs)} interview questions.")

        # 4. Seed Research Sources & Candidate Experiences
        rs_count = db.query(ResearchSource).count()
        if rs_count == 0:
            res_file = CONTENT_DIR / "research.json"
            if res_file.exists():
                with open(res_file, "r", encoding="utf-8") as f:
                    res_data = json.load(f)
                
                sources = res_data.get("sources", [])
                source_objs = []
                for s in sources:
                    source_objs.append(ResearchSource(
                        id=s["id"],
                        title=s["title"],
                        url=s["url"],
                        source_type=s.get("source_type", "Web Resource"),
                        date_accessed=s.get("date_accessed", "2026-10-17"),
                        reliability=s.get("reliability", "High"),
                        findings=s.get("findings", ""),
                        evidence_category=s.get("evidence_category", "Officially documented"),
                        confidence_label=s.get("confidence_label", "Verified Source")
                    ))
                if source_objs:
                    db.bulk_save_objects(source_objs)
                    db.commit()

                experiences = res_data.get("candidate_experiences", [])
                exp_objs = []
                for exp in experiences:
                    exp_objs.append(CandidateExperience(
                        id=exp["id"],
                        source_platform=exp.get("source_platform", "Forum"),
                        source_url=exp.get("source_url"),
                        date_reported=exp.get("date_reported", "2026-09"),
                        role=exp.get("role", "Associate Frontend Developer"),
                        summary=exp.get("summary", ""),
                        topics_mentioned=exp.get("topics_mentioned", []),
                        difficulty_rating=exp.get("difficulty_rating", "Medium"),
                        verdict_notes=exp.get("verdict_notes", ""),
                        evidence_category=exp.get("evidence_category", "Candidate-reported, publicly accessible")
                    ))
                if exp_objs:
                    db.bulk_save_objects(exp_objs)
                    db.commit()
                logger.info(f"Seeded {len(source_objs)} research sources and {len(exp_objs)} candidate experiences.")

    except Exception as e:
        logger.error(f"Error seeding database: {str(e)}", exc_info=True)
        db.rollback()
