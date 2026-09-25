import uuid
import re
from datetime import datetime, date, timedelta
from typing import Optional
from sqlalchemy.orm import Session
from app.models.models import Learner

UUID_REGEX = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", re.I)

def get_or_create_learner(db: Session, learner_id: Optional[str]) -> Learner:
    clean_id = None
    if learner_id and UUID_REGEX.match(learner_id.strip()):
        clean_id = learner_id.strip().lower()

    learner = None
    if clean_id:
        learner = db.query(Learner).filter(Learner.id == clean_id).first()

    now = datetime.utcnow()
    today = now.date()

    if not learner:
        new_uuid = clean_id or str(uuid.uuid4())
        learner = Learner(
            id=new_uuid,
            created_at=now,
            last_active_at=now,
            streak_days=1
        )
        db.add(learner)
        db.commit()
        db.refresh(learner)
        return learner

    # Update streak
    last_date = learner.last_active_at.date() if learner.last_active_at else today
    if today == last_date:
        pass
    elif today == last_date + timedelta(days=1):
        learner.streak_days += 1
    elif today > last_date + timedelta(days=1):
        learner.streak_days = 1

    learner.last_active_at = now
    db.commit()
    db.refresh(learner)
    return learner
