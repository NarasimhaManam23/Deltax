import uuid
import random
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from app.database import get_db
from app.models.models import Learner, Question, Quiz, QuizAttempt, TopicProgress
from app.schemas.schemas import (
    QuizStartRequest,
    QuizSubmitRequest,
    QuizResultResponse,
    QuestionResponse,
    QuestionResultItem,
)
from app.services.quiz_service import process_quiz_submission
from app.routers.deps import get_current_learner

router = APIRouter(prefix="/quiz", tags=["Quiz"])

@router.post("/start")
def start_quiz(
    request: QuizStartRequest,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    query = db.query(Question)

    # 1. Round 1 Mock Test
    if request.quiz_type == "mock_test":
        mock_id = request.mock_id or 1
        mock_prefix = f"mock_{mock_id}_"
        questions = query.filter(Question.id.startswith(mock_prefix)).order_by(Question.q_number.asc()).all()
        if not questions:
            # Fallback to random 50 questions
            questions = query.filter(Question.subject != "Mock Test").order_by(func.random()).limit(50).all()
        
        return {
            "quiz_id": str(uuid.uuid4()),
            "quiz_type": "mock_test",
            "title": f"DeltaX Round 1 Full Mock {mock_id}",
            "duration_minutes": 45,
            "total_questions": len(questions),
            "questions": [
                {
                    "id": q.id,
                    "q_number": q.q_number,
                    "subject": q.subject,
                    "topic": q.topic,
                    "difficulty": q.difficulty,
                    "source": q.source,
                    "question_text": q.question_text,
                    "option_a": q.option_a,
                    "option_b": q.option_b,
                    "option_c": q.option_c,
                    "option_d": q.option_d,
                    # Withhold correct answer during live quiz
                }
                for q in questions
            ]
        }

    # 2. Practice Weak Areas
    elif request.quiz_type == "weak_areas":
        weak_topics = db.query(TopicProgress.topic).filter(
            TopicProgress.learner_id == learner.id,
            TopicProgress.accuracy < 75.0
        ).all()
        weak_topic_names = [w[0] for w in weak_topics]
        if weak_topic_names:
            query = query.filter(Question.topic.in_(weak_topic_names))
        else:
            # Fallback to general
            query = query.filter(Question.subject != "Mock Test")
        
        questions = query.order_by(func.random()).limit(request.question_count).all()

    # 3. Practice Incorrect Questions
    elif request.quiz_type == "incorrect":
        subq = db.query(QuizAttempt.question_id).join(Quiz).filter(
            Quiz.learner_id == learner.id,
            QuizAttempt.is_correct == False
        ).distinct().subquery()
        questions = query.filter(Question.id.in_(subq)).order_by(func.random()).limit(request.question_count).all()
        if not questions:
            questions = query.filter(Question.subject != "Mock Test").order_by(func.random()).limit(request.question_count).all()

    # 4. Standard Topic / Subject Practice
    else:
        query = query.filter(Question.subject != "Mock Test")
        if request.subject:
            query = query.filter(Question.subject == request.subject)
        if request.topic:
            query = query.filter(Question.topic == request.topic)
        if request.difficulty and request.difficulty != "Mixed":
            query = query.filter(Question.difficulty == request.difficulty)

        questions = query.order_by(func.random()).limit(request.question_count).all()

    if not questions:
        # Fallback if specific filter yielded 0
        questions = db.query(Question).filter(Question.subject != "Mock Test").order_by(func.random()).limit(request.question_count).all()

    return {
        "quiz_id": str(uuid.uuid4()),
        "quiz_type": request.quiz_type,
        "title": f"{request.subject or 'DeltaX'} Practice Quiz",
        "duration_minutes": max(5, int(len(questions) * 0.9)), # ~54s per question
        "total_questions": len(questions),
        "questions": [
            {
                "id": q.id,
                "q_number": q.q_number,
                "subject": q.subject,
                "topic": q.topic,
                "difficulty": q.difficulty,
                "source": q.source,
                "question_text": q.question_text,
                "option_a": q.option_a,
                "option_b": q.option_b,
                "option_c": q.option_c,
                "option_d": q.option_d,
            }
            for q in questions
        ]
    }

@router.post("/submit", response_model=QuizResultResponse)
def submit_quiz(
    data: QuizSubmitRequest,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    return process_quiz_submission(db, learner, data)

@router.get("/{quiz_id}/result", response_model=QuizResultResponse)
def get_quiz_result(
    quiz_id: str,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id, Quiz.learner_id == learner.id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz result not found")

    attempts = db.query(QuizAttempt).filter(QuizAttempt.quiz_id == quiz.id).all()
    q_ids = [a.question_id for a in attempts]
    q_map = {q.id: q for q in db.query(Question).filter(Question.id.in_(q_ids)).all()}

    question_results = []
    topic_stats = {}
    for a in attempts:
        q = q_map.get(a.question_id)
        if not q:
            continue
        top = q.topic or q.subject
        if top not in topic_stats:
            topic_stats[top] = {"total": 0, "correct": 0, "accuracy": 0.0}
        topic_stats[top]["total"] += 1
        if a.is_correct:
            topic_stats[top]["correct"] += 1

        question_results.append(QuestionResultItem(
            question_id=q.id,
            question_text=q.question_text,
            option_a=q.option_a,
            option_b=q.option_b,
            option_c=q.option_c,
            option_d=q.option_d,
            selected_option=a.selected_option,
            correct_answer=a.correct_option,
            is_correct=a.is_correct,
            explanation=q.explanation or "",
            topic=top
        ))

    for top, stat in topic_stats.items():
        stat["accuracy"] = round((stat["correct"] / stat["total"] * 100.0), 1)

    return QuizResultResponse(
        quiz_id=quiz.id,
        quiz_type=quiz.quiz_type,
        title=quiz.title,
        subject=quiz.subject,
        topic=quiz.topic,
        total_questions=quiz.total_questions,
        score=quiz.score,
        accuracy=quiz.accuracy,
        time_taken_seconds=quiz.time_taken_seconds,
        completed_at=quiz.completed_at,
        questions=question_results,
        topic_breakdown=topic_stats
    )

@router.get("/history")
def get_quiz_history(
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    quizzes = db.query(Quiz).filter(Quiz.learner_id == learner.id).order_by(Quiz.completed_at.desc()).limit(20).all()
    return [
        {
            "id": q.id,
            "title": q.title,
            "quiz_type": q.quiz_type,
            "subject": q.subject,
            "score": q.score,
            "total_questions": q.total_questions,
            "accuracy": q.accuracy,
            "time_taken_seconds": q.time_taken_seconds,
            "completed_at": q.completed_at.isoformat()
        }
        for q in quizzes
    ]
