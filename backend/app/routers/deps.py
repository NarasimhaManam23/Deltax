from fastapi import Header, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models.models import Learner
from app.services.learner_service import get_or_create_learner

def get_current_learner(
    x_learner_id: Optional[str] = Header(None, alias="X-Learner-ID"),
    db: Session = Depends(get_db)
) -> Learner:
    learner = get_or_create_learner(db, x_learner_id)
    return learner
