import json
import logging
from pathlib import Path
from sqlalchemy.orm import Session
from app.models.models import Question, CodingProblem, InterviewQuestion

logger = logging.getLogger(__name__)

CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"

def seed_database(db: Session):
    try:
        # 1. Seed Questions (MCQs)
        q_count = db.query(Question).count()
        if q_count == 0:
            mcqs_file = CONTENT_DIR / "mcqs.json"
            if mcqs_file.exists():
                with open(mcqs_file, "r", encoding="utf-8") as f:
                    mcq_data = json.load(f)
                
                question_objs = []
                for q in mcq_data:
                    question_objs.append(Question(
                        id=q["id"],
                        q_number=q.get("q_number"),
                        subject=q["subject"],
                        topic=q["topic"],
                        difficulty=q.get("difficulty", "Medium"),
                        source=q.get("source", "GENERAL CS TOPIC"),
                        question_text=q["question"],
                        option_a=q["options"]["A"],
                        option_b=q["options"]["B"],
                        option_c=q["options"]["C"],
                        option_d=q["options"]["D"],
                        correct_answer=q["correct_answer"],
                        explanation=q.get("explanation", "")
                    ))
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
                                subject="Mock Test",
                                topic=mq.get("topic", "Comprehensive"),
                                difficulty="Exam",
                                source=f"Round 1 Mock {m['mock_id']}",
                                question_text=mq["question"],
                                option_a=mq["options"]["A"],
                                option_b=mq["options"]["B"],
                                option_c=mq["options"]["C"],
                                option_d=mq["options"]["D"],
                                correct_answer=mq["correct_answer"],
                                explanation=mq.get("explanation", "")
                            ))
                if mock_q_objs:
                    db.bulk_save_objects(mock_q_objs)
                    db.commit()
                    logger.info(f"Seeded {len(mock_q_objs)} mock test questions.")

        # 2. Seed Coding Problems
        c_count = db.query(CodingProblem).count()
        if c_count == 0:
            code_file = CONTENT_DIR / "coding_problems.json"
            if code_file.exists():
                with open(code_file, "r", encoding="utf-8") as f:
                    code_data = json.load(f)
                
                prob_objs = []
                for p in code_data:
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
                        starter_code_python=p.get("starter_code_python")
                    ))
                db.bulk_save_objects(prob_objs)
                db.commit()
                logger.info(f"Seeded {len(prob_objs)} coding practice problems.")

        # 3. Seed Interview Questions
        i_count = db.query(InterviewQuestion).count()
        if i_count == 0:
            iq_file = CONTENT_DIR / "interview_questions.json"
            if iq_file.exists():
                with open(iq_file, "r", encoding="utf-8") as f:
                    iq_data = json.load(f)
                
                iq_objs = []
                for iq in iq_data:
                    iq_objs.append(InterviewQuestion(
                        id=iq["id"],
                        round=iq.get("round", 2),
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
                db.bulk_save_objects(iq_objs)
                db.commit()
                logger.info(f"Seeded {len(iq_objs)} interview questions.")

    except Exception as e:
        logger.error(f"Error seeding database: {str(e)}", exc_info=True)
        db.rollback()
