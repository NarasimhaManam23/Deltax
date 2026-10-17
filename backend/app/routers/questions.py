from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from app.database import get_db
from app.models.models import Question
from app.schemas.schemas import QuestionResponse

router = APIRouter(prefix="/questions", tags=["Questions"])

@router.get("/topics")
def get_topics_inventory(db: Session = Depends(get_db)):
    results = db.query(
        Question.subject,
        Question.topic,
        func.count(Question.id).label("count")
    ).filter(Question.subject != "Mock Test").group_by(Question.subject, Question.topic).all()

    subject_map = {}
    for r in results:
        if r.subject not in subject_map:
            subject_map[r.subject] = {"subject": r.subject, "total_questions": 0, "topics": []}
        subject_map[r.subject]["total_questions"] += r.count
        subject_map[r.subject]["topics"].append({"topic": r.topic, "count": r.count})

    return list(subject_map.values())

@router.get("", response_model=List[QuestionResponse])
def get_questions(
    subject: Optional[str] = None,
    topic: Optional[str] = None,
    difficulty: Optional[str] = None,
    evidence_category: Optional[str] = None,
    question_type: Optional[str] = None,
    limit: int = Query(50, le=100),
    offset: int = 0,
    db: Session = Depends(get_db)
):
    query = db.query(Question)
    if subject:
        query = query.filter(Question.subject == subject)
    if topic:
        query = query.filter(Question.topic == topic)
    if difficulty and difficulty != "Mixed":
        query = query.filter(Question.difficulty == difficulty)
    if evidence_category and evidence_category != "All":
        query = query.filter(Question.evidence_category == evidence_category)
    if question_type and question_type != "All":
        query = query.filter(Question.question_type == question_type)

    return query.offset(offset).limit(limit).all()

@router.get("/{question_id}", response_model=QuestionResponse)
def get_question_by_id(question_id: str, db: Session = Depends(get_db)):
    q = db.query(Question).filter(Question.id == question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    return q
