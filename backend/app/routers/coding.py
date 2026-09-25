import json
import uuid
from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.database import get_db
from app.models.models import Learner, CodingProblem, CodingAttempt, Activity
from app.schemas.schemas import CodingProblemResponse, CodingSubmitRequest, CodingAttemptResponse
from app.routers.deps import get_current_learner

router = APIRouter(prefix="/coding", tags=["Coding"])
CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"

@router.get("/patterns")
def get_coding_patterns():
    p_file = CONTENT_DIR / "coding_patterns.json"
    if p_file.exists():
        with open(p_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

@router.get("/problems", response_model=List[CodingProblemResponse])
def get_coding_problems(
    tier: Optional[str] = None,
    category: Optional[str] = None,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    query = db.query(CodingProblem)
    if tier and tier != "All":
        query = query.filter(CodingProblem.tier == tier)
    if category and category != "All":
        query = query.filter(CodingProblem.category == category)

    problems = query.all()
    solved_set = {
        ca.problem_id for ca in db.query(CodingAttempt.problem_id).filter(
            CodingAttempt.learner_id == learner.id,
            CodingAttempt.status == "solved"
        ).all()
    }

    results = []
    for p in problems:
        p_dict = {
            "id": p.id,
            "code_id": p.code_id,
            "title": p.title,
            "tier": p.tier,
            "difficulty": p.difficulty,
            "category": p.category,
            "statement": p.statement,
            "input_format": p.input_format,
            "output_format": p.output_format,
            "constraints": p.constraints,
            "edge_cases": p.edge_cases,
            "approach": p.approach,
            "starter_code_java": p.starter_code_java,
            "starter_code_python": p.starter_code_python,
            "is_solved": p.id in solved_set
        }
        results.append(CodingProblemResponse(**p_dict))

    return results

@router.get("/problems/{problem_id}", response_model=CodingProblemResponse)
def get_coding_problem_by_id(
    problem_id: str,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    p = db.query(CodingProblem).filter(CodingProblem.id == problem_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Coding problem not found")

    is_solved = db.query(CodingAttempt).filter(
        CodingAttempt.learner_id == learner.id,
        CodingAttempt.problem_id == problem_id,
        CodingAttempt.status == "solved"
    ).first() is not None

    return CodingProblemResponse(
        id=p.id,
        code_id=p.code_id,
        title=p.title,
        tier=p.tier,
        difficulty=p.difficulty,
        category=p.category,
        statement=p.statement,
        input_format=p.input_format,
        output_format=p.output_format,
        constraints=p.constraints,
        edge_cases=p.edge_cases,
        approach=p.approach,
        starter_code_java=p.starter_code_java,
        starter_code_python=p.starter_code_python,
        is_solved=is_solved
    )

@router.post("/submit", response_model=CodingAttemptResponse)
def submit_code_attempt(
    data: CodingSubmitRequest,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    prob = db.query(CodingProblem).filter(CodingProblem.id == data.problem_id).first()
    if not prob:
        raise HTTPException(status_code=404, detail="Coding problem not found")

    # Check if already solved
    prev_solved = db.query(CodingAttempt).filter(
        CodingAttempt.learner_id == learner.id,
        CodingAttempt.problem_id == data.problem_id,
        CodingAttempt.status == "solved"
    ).first()

    attempt = CodingAttempt(
        id=str(uuid.uuid4()),
        learner_id=learner.id,
        problem_id=data.problem_id,
        language=data.language,
        code=data.code,
        status=data.status,
        submitted_at=datetime.utcnow()
    )
    db.add(attempt)

    if not prev_solved and data.status == "solved":
        learner.total_coding_solved += 1
        act = Activity(
            id=str(uuid.uuid4()),
            learner_id=learner.id,
            activity_type="coding_solved",
            title=f"Solved Coding Problem: {prob.title}",
            details=f"Language: {data.language.capitalize()} | Difficulty: {prob.difficulty or prob.tier}"
        )
        db.add(act)

    db.commit()
    db.refresh(attempt)
    return attempt

@router.get("/mocks")
def get_coding_mocks():
    sm_file = CONTENT_DIR / "coding_speed_mocks.json"
    hm_file = CONTENT_DIR / "coding_historical_mocks.json"

    speed_mocks = []
    if sm_file.exists():
        with open(sm_file, "r", encoding="utf-8") as f:
            speed_mocks = json.load(f)

    hist_mocks = []
    if hm_file.exists():
        with open(hm_file, "r", encoding="utf-8") as f:
            hist_mocks = json.load(f)

    return {
        "speed_mocks_30m": speed_mocks,
        "historical_mocks_120m": hist_mocks
    }
