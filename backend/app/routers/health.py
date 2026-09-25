from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db
from app.models.models import Question, CodingProblem, InterviewQuestion

router = APIRouter(tags=["Health"])

@router.get("/health")
def health_check(db: Session = Depends(get_db)):
    db_status = "healthy"
    try:
        db.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    return {
        "status": "online",
        "app": "DeltaX Prep — Associate Product Engineer 2027",
        "database": db_status,
        "counts": {
            "questions": db.query(Question).count(),
            "coding_problems": db.query(CodingProblem).count(),
            "interview_questions": db.query(InterviewQuestion).count(),
        }
    }
