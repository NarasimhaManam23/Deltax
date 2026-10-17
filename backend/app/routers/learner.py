from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from app.database import get_db
from app.models.models import Learner, Quiz, QuizAttempt, Question
from app.schemas.schemas import LearnerResponse, MistakeItemResponse
from app.routers.deps import get_current_learner

router = APIRouter(prefix="/learner", tags=["Learner"])

@router.get("/me", response_model=LearnerResponse)
def get_learner_profile(learner: Learner = Depends(get_current_learner)):
    return learner

@router.get("/mistakes", response_model=List[MistakeItemResponse])
def get_learner_mistakes(
    subject: Optional[str] = None,
    topic: Optional[str] = None,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    query = db.query(
        QuizAttempt.question_id,
        func.count(QuizAttempt.id).label("mistake_count"),
        func.max(QuizAttempt.time_spent_seconds).label("max_time"),
        func.max(Quiz.completed_at).label("last_attempted_at"),
        QuizAttempt.selected_option
    ).join(Quiz, QuizAttempt.quiz_id == Quiz.id)\
     .filter(Quiz.learner_id == learner.id, QuizAttempt.is_correct == False)

    query = query.group_by(QuizAttempt.question_id)
    raw_results = query.order_by(desc("last_attempted_at")).all()

    if not raw_results:
        return []

    q_ids = [r[0] for r in raw_results]
    questions_query = db.query(Question).filter(Question.id.in_(q_ids))
    if subject:
        questions_query = questions_query.filter(Question.subject == subject)
    if topic:
        questions_query = questions_query.filter(Question.topic == topic)

    q_map = {q.id: q for q in questions_query.all()}

    mistakes = []
    for r in raw_results:
        qid = r[0]
        q = q_map.get(qid)
        if not q:
            continue
        mistakes.append(MistakeItemResponse(
            question_id=q.id,
            question_text=q.question_text,
            subject=q.subject,
            topic=q.topic,
            difficulty=q.difficulty,
            option_a=q.option_a,
            option_b=q.option_b,
            option_c=q.option_c,
            option_d=q.option_d,
            selected_option=r[4],
            correct_option=q.correct_answer,
            explanation=q.explanation or "No explanation available.",
            mistake_count=r[1],
            last_attempted_at=r[3]
        ))

    return mistakes
