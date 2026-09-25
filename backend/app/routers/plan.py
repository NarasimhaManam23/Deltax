import json
import uuid
from pathlib import Path
from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Learner, LearnerDailyTask, Activity
from app.schemas.schemas import TaskToggleRequest
from app.routers.deps import get_current_learner

router = APIRouter(prefix="/plan", tags=["4-Day Plan"])
CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"

@router.get("/tasks")
def get_plan_tasks(
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    plan_file = CONTENT_DIR / "plan_tasks.json"
    tasks = []
    if plan_file.exists():
        with open(plan_file, "r", encoding="utf-8") as f:
            tasks = json.load(f)

    # Fetch learner's completed tasks
    completed_task_ids = {
        dt.task_id for dt in db.query(LearnerDailyTask.task_id).filter(
            LearnerDailyTask.learner_id == learner.id,
            LearnerDailyTask.is_completed == True
        ).all()
    }

    # Merge completion state
    merged = []
    for t in tasks:
        item = dict(t)
        item["is_completed"] = t["id"] in completed_task_ids
        merged.append(item)

    return merged

@router.post("/tasks/{task_id}/toggle")
def toggle_plan_task(
    task_id: str,
    data: TaskToggleRequest,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    task = db.query(LearnerDailyTask).filter(
        LearnerDailyTask.learner_id == learner.id,
        LearnerDailyTask.task_id == task_id
    ).first()

    if not task:
        task = LearnerDailyTask(
            id=str(uuid.uuid4()),
            learner_id=learner.id,
            task_id=task_id,
            day="Sprint Day",
            is_completed=data.is_completed,
            completed_at=datetime.utcnow() if data.is_completed else None
        )
        db.add(task)
    else:
        task.is_completed = data.is_completed
        task.completed_at = datetime.utcnow() if data.is_completed else None

    if data.is_completed:
        act = Activity(
            id=str(uuid.uuid4()),
            learner_id=learner.id,
            activity_type="task_checked",
            title=f"Completed 4-Day Plan Task: {task_id}",
            details="Milestone marked as complete"
        )
        db.add(act)

    db.commit()
    return {"status": "success", "task_id": task_id, "is_completed": data.is_completed}
