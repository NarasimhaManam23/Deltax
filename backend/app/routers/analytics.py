from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Learner
from app.schemas.schemas import AnalyticsResponse
from app.services.analytics_service import get_analytics_data
from app.routers.deps import get_current_learner

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("", response_model=AnalyticsResponse)
def get_analytics(
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    return get_analytics_data(db, learner)
