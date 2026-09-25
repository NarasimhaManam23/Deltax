from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Dict, Any
from app.database import get_db
from app.models.models import Question, CodingProblem, InterviewQuestion

router = APIRouter(prefix="/search", tags=["Global Search"])

@router.get("")
def global_search(
    q: str = Query(..., min_length=2),
    db: Session = Depends(get_db)
):
    query_str = f"%{q.strip()}%"
    
    # 1. Search MCQs
    questions = db.query(Question).filter(
        or_(
            Question.question_text.ilike(query_str),
            Question.topic.ilike(query_str),
            Question.subject.ilike(query_str)
        )
    ).limit(8).all()

    # 2. Search Coding Problems
    coding = db.query(CodingProblem).filter(
        or_(
            CodingProblem.title.ilike(query_str),
            CodingProblem.statement.ilike(query_str),
            CodingProblem.tier.ilike(query_str)
        )
    ).limit(8).all()

    # 3. Search Interview Questions
    interview = db.query(InterviewQuestion).filter(
        or_(
            InterviewQuestion.question.ilike(query_str),
            InterviewQuestion.category.ilike(query_str),
            InterviewQuestion.definition.ilike(query_str)
        )
    ).limit(8).all()

    results: List[Dict[str, Any]] = []

    for item in questions:
        results.append({
            "type": "question",
            "id": item.id,
            "title": f"[{item.subject}] {item.topic}",
            "snippet": item.question_text[:120] + "...",
            "link": f"/round-1?subject={item.subject}"
        })

    for item in coding:
        results.append({
            "type": "coding",
            "id": item.id,
            "title": f"[{item.tier}] {item.title}",
            "snippet": item.statement[:120] + "...",
            "link": f"/coding/{item.id}"
        })

    for item in interview:
        results.append({
            "type": "interview",
            "id": item.id,
            "title": f"[Round {item.round} {item.category}] {item.question[:60]}...",
            "snippet": (item.definition or item.sample_answer or "")[:120] + "...",
            "link": f"/round-{item.round}"
        })

    return {
        "query": q,
        "count": len(results),
        "results": results
    }
