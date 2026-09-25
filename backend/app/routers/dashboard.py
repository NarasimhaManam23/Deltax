from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Learner
from app.schemas.schemas import DashboardStatsResponse
from app.services.analytics_service import get_dashboard_stats
from app.routers.deps import get_current_learner

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("", response_model=DashboardStatsResponse)
def get_dashboard(
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    return get_dashboard_stats(db, learner)
