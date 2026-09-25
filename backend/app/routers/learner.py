from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Learner
from app.schemas.schemas import LearnerResponse
from app.routers.deps import get_current_learner

router = APIRouter(prefix="/learner", tags=["Learner"])

@router.get("/me", response_model=LearnerResponse)
def get_learner_profile(learner: Learner = Depends(get_current_learner)):
    return learner
