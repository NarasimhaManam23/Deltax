import json
import uuid
from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.database import get_db
from app.models.models import Learner, InterviewQuestion, InterviewProgress, Activity
from app.schemas.schemas import InterviewQuestionResponse, InterviewProgressUpdateRequest
from app.routers.deps import get_current_learner

router = APIRouter(prefix="/interview", tags=["Interview"])
CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"

@router.get("/questions", response_model=List[InterviewQuestionResponse])
def get_interview_questions(
    round: Optional[int] = None,
    category: Optional[str] = None,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    query = db.query(InterviewQuestion)
    if round:
        query = query.filter(InterviewQuestion.round == round)
    if category and category != "All":
        query = query.filter(InterviewQuestion.category == category)

    questions = query.all()
    
    # Get learner's progress map
    progress_map = {
        ip.interview_question_id: ip.status
        for ip in db.query(InterviewProgress).filter(InterviewProgress.learner_id == learner.id).all()
    }

    results = []
    for q in questions:
        q_dict = {
            "id": q.id,
            "round": q.round,
            "category": q.category,
            "question": q.question,
            "intent": q.intent,
            "framework": q.framework,
            "sample_answer": q.sample_answer,
            "bad_answer": q.bad_answer,
            "follow_up": q.follow_up,
            "definition": q.definition,
            "deep_detail": q.deep_detail,
            "trap": q.trap,
            "body_markdown": q.body_markdown,
            "status": progress_map.get(q.id, "not_started")
        }
        results.append(InterviewQuestionResponse(**q_dict))

    return results

@router.post("/progress")
def update_interview_progress(
    data: InterviewProgressUpdateRequest,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    q = db.query(InterviewQuestion).filter(InterviewQuestion.id == data.question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Interview question not found")

    ip = db.query(InterviewProgress).filter(
        InterviewProgress.learner_id == learner.id,
        InterviewProgress.interview_question_id == data.question_id
    ).first()

    is_new = False
    if not ip:
        is_new = True
        ip = InterviewProgress(
            id=str(uuid.uuid4()),
            learner_id=learner.id,
            interview_question_id=data.question_id,
            status=data.status,
            user_notes=data.notes,
            updated_at=datetime.utcnow()
        )
        db.add(ip)
    else:
        ip.status = data.status
        if data.notes is not None:
            ip.user_notes = data.notes
        ip.updated_at = datetime.utcnow()

    if data.status in ["practicing", "confident"]:
        learner.total_interview_practiced += 1
        act = Activity(
            id=str(uuid.uuid4()),
            learner_id=learner.id,
            activity_type="interview_practiced",
            title=f"Practiced: {q.question[:60]}...",
            details=f"Status: {data.status.capitalize()} | Category: {q.category}"
        )
        db.add(act)

    db.commit()
    return {"status": "success", "question_id": data.question_id, "new_status": data.status}

@router.get("/projects")
def get_projects_overview():
    p_file = CONTENT_DIR / "projects_overview.json"
    if p_file.exists():
        with open(p_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}
