from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import (
    Learner, Quiz, QuizAttempt, CodingAttempt, InterviewProgress,
    Bookmark, TopicProgress, LearnerDailyTask
)
from app.schemas.schemas import ExportProgressResponse, ImportProgressRequest
from app.routers.deps import get_current_learner

router = APIRouter(prefix="", tags=["Export & Import"])

@router.get("/export", response_model=ExportProgressResponse)
def export_learner_progress(
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    quizzes = db.query(Quiz).filter(Quiz.learner_id == learner.id).all()
    q_ids = [q.id for q in quizzes]
    q_attempts = db.query(QuizAttempt).filter(QuizAttempt.quiz_id.in_(q_ids)).all()
    coding = db.query(CodingAttempt).filter(CodingAttempt.learner_id == learner.id).all()
    interview = db.query(InterviewProgress).filter(InterviewProgress.learner_id == learner.id).all()
    bookmarks = db.query(Bookmark).filter(Bookmark.learner_id == learner.id).all()
    tps = db.query(TopicProgress).filter(TopicProgress.learner_id == learner.id).all()
    tasks = db.query(LearnerDailyTask).filter(LearnerDailyTask.learner_id == learner.id).all()

    return ExportProgressResponse(
        learner={
            "id": learner.id,
            "created_at": learner.created_at.isoformat(),
            "total_questions_attempted": learner.total_questions_attempted,
            "total_correct": learner.total_correct,
            "total_coding_solved": learner.total_coding_solved,
            "total_mock_tests": learner.total_mock_tests,
            "total_interview_practiced": learner.total_interview_practiced,
            "streak_days": learner.streak_days
        },
        quizzes=[
            {
                "id": q.id,
                "quiz_type": q.quiz_type,
                "title": q.title,
                "subject": q.subject,
                "topic": q.topic,
                "score": q.score,
                "total_questions": q.total_questions,
                "accuracy": q.accuracy,
                "time_taken_seconds": q.time_taken_seconds,
                "completed_at": q.completed_at.isoformat()
            }
            for q in quizzes
        ],
        quiz_attempts=[
            {
                "quiz_id": qa.quiz_id,
                "question_id": qa.question_id,
                "selected_option": qa.selected_option,
                "correct_option": qa.correct_option,
                "is_correct": qa.is_correct,
                "time_spent_seconds": qa.time_spent_seconds
            }
            for qa in q_attempts
        ],
        coding_attempts=[
            {
                "problem_id": ca.problem_id,
                "language": ca.language,
                "status": ca.status,
                "code": ca.code,
                "submitted_at": ca.submitted_at.isoformat()
            }
            for ca in coding
        ],
        interview_progress=[
            {
                "interview_question_id": ip.interview_question_id,
                "status": ip.status,
                "user_notes": ip.user_notes
            }
            for ip in interview
        ],
        bookmarks=[
            {
                "item_type": bm.item_type,
                "item_id": bm.item_id,
                "title": bm.title,
                "meta_info": bm.meta_info
            }
            for bm in bookmarks
        ],
        topic_progress=[
            {
                "subject": tp.subject,
                "topic": tp.topic,
                "total_attempts": tp.total_attempts,
                "total_correct": tp.total_correct,
                "accuracy": tp.accuracy,
                "status": tp.status
            }
            for tp in tps
        ],
        daily_tasks=[
            {
                "task_id": dt.task_id,
                "day": dt.day,
                "is_completed": dt.is_completed
            }
            for dt in tasks
        ],
        exported_at=datetime.utcnow().isoformat()
    )

@router.post("/import")
def import_learner_progress(
    req: ImportProgressRequest,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    data = req.data
    if not data or "learner" not in data:
        raise HTTPException(status_code=400, detail="Invalid import data schema")

    try:
        # Update learner statistics
        l_data = data["learner"]
        learner.total_questions_attempted = l_data.get("total_questions_attempted", learner.total_questions_attempted)
        learner.total_correct = l_data.get("total_correct", learner.total_correct)
        learner.total_coding_solved = l_data.get("total_coding_solved", learner.total_coding_solved)
        learner.total_mock_tests = l_data.get("total_mock_tests", learner.total_mock_tests)
        learner.total_interview_practiced = l_data.get("total_interview_practiced", learner.total_interview_practiced)
        learner.streak_days = l_data.get("streak_days", learner.streak_days)

        # Import Bookmarks
        for bm in data.get("bookmarks", []):
            if not db.query(Bookmark).filter(Bookmark.learner_id == learner.id, Bookmark.item_id == bm["item_id"]).first():
                db.add(Bookmark(
                    id=str(datetime.utcnow().timestamp()) + bm["item_id"][:10],
                    learner_id=learner.id,
                    item_type=bm["item_type"],
                    item_id=bm["item_id"],
                    title=bm["title"],
                    meta_info=bm.get("meta_info")
                ))

        # Import Daily Tasks
        for dt in data.get("daily_tasks", []):
            task = db.query(LearnerDailyTask).filter(LearnerDailyTask.learner_id == learner.id, LearnerDailyTask.task_id == dt["task_id"]).first()
            if not task:
                db.add(LearnerDailyTask(
                    id=str(datetime.utcnow().timestamp()) + dt["task_id"][:10],
                    learner_id=learner.id,
                    task_id=dt["task_id"],
                    day=dt.get("day", "Sprint"),
                    is_completed=dt.get("is_completed", True)
                ))
            else:
                task.is_completed = dt.get("is_completed", True)

        # Import Interview Progress
        for ip in data.get("interview_progress", []):
            prog = db.query(InterviewProgress).filter(InterviewProgress.learner_id == learner.id, InterviewProgress.interview_question_id == ip["interview_question_id"]).first()
            if not prog:
                db.add(InterviewProgress(
                    id=str(datetime.utcnow().timestamp()) + ip["interview_question_id"][:10],
                    learner_id=learner.id,
                    interview_question_id=ip["interview_question_id"],
                    status=ip.get("status", "practicing"),
                    user_notes=ip.get("user_notes")
                ))
            else:
                prog.status = ip.get("status", prog.status)

        db.commit()
        return {"status": "success", "message": "Progress imported successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to import progress: {str(e)}")
