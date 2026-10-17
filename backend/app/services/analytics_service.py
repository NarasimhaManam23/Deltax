from typing import Dict, Any, List
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.models import Learner, Quiz, QuizAttempt, CodingAttempt, InterviewProgress, TopicProgress, Activity
from app.schemas.schemas import DashboardStatsResponse, AnalyticsResponse

def get_dashboard_stats(db: Session, learner: Learner) -> DashboardStatsResponse:
    # Round 1: Screening MCQ progress (aim for 150 questions attempted & at least 1 mock)
    r1_pct = min(100.0, round((learner.total_questions_attempted / 150.0 * 80.0) + (min(learner.total_mock_tests, 2) * 10.0), 1))
    
    # Round 2: Coding & SQL problems solved (aim for 15 problems solved)
    coding_count = db.query(CodingAttempt).filter(
        CodingAttempt.learner_id == learner.id,
        CodingAttempt.status == "solved"
    ).count()
    r2_pct = min(100.0, round((coding_count / 15.0 * 100.0), 1))

    # Round 3: Technical interview questions confident (aim for 20 confident)
    r3_confident = db.query(InterviewProgress).filter(
        InterviewProgress.learner_id == learner.id,
        InterviewProgress.status == "confident"
    ).count()
    r3_pct = min(100.0, round((r3_confident / 20.0 * 100.0), 1))

    # Round 4: Managerial & Architecture preparation (aim for 10 practiced)
    r4_practiced = db.query(InterviewProgress).filter(
        InterviewProgress.learner_id == learner.id,
        InterviewProgress.status.in_(["practicing", "confident"])
    ).count()
    r4_pct = min(100.0, round((r4_practiced / 25.0 * 100.0), 1))

    # Overall Preparation %
    overall_pct = round((r1_pct * 0.40 + r2_pct * 0.35 + r3_pct * 0.15 + r4_pct * 0.10), 1)

    mcq_accuracy = 0.0
    if learner.total_questions_attempted > 0:
        mcq_accuracy = round((learner.total_correct / learner.total_questions_attempted * 100.0), 1)

    # Continue Learning recommendation
    last_quiz = db.query(Quiz).filter(Quiz.learner_id == learner.id).order_by(Quiz.completed_at.desc()).first()
    continue_learning = {
        "title": f"Practice: {last_quiz.subject or 'JavaScript'}" if last_quiz else "Start: JavaScript Fundamentals",
        "link": f"/round-1?subject={last_quiz.subject}" if last_quiz and last_quiz.subject else "/round-1?subject=JavaScript",
        "subtitle": f"Last score: {last_quiz.accuracy}%" if last_quiz else "High-Yield ES6+, Scope & Closures"
    }

    # Weak Topic Engine: find lowest accuracy topic with at least 3 attempts
    weak_topic_obj = db.query(TopicProgress).filter(
        TopicProgress.learner_id == learner.id,
        TopicProgress.total_attempts >= 3
    ).order_by(TopicProgress.accuracy.asc()).first()

    weak_topic_focus = None
    if weak_topic_obj and weak_topic_obj.accuracy < 75.0:
        weak_topic_focus = {
            "subject": weak_topic_obj.subject,
            "topic": weak_topic_obj.topic,
            "accuracy": weak_topic_obj.accuracy,
            "recommendation": f"Your accuracy in {weak_topic_obj.topic} is {weak_topic_obj.accuracy}%. Practice targeted questions to solidify this area."
        }
    else:
        weak_topic_focus = {
            "subject": "JavaScript",
            "topic": "Event Loop & Microtasks",
            "accuracy": 0.0,
            "recommendation": "Review high-frequency microtask queuing mechanics (Promise.then vs setTimeout vs queueMicrotask)."
        }

    # Recent activities
    recent_acts = db.query(Activity).filter(Activity.learner_id == learner.id).order_by(Activity.created_at.desc()).limit(5).all()
    acts_list = [
        {"title": a.title, "details": a.details, "time": a.created_at.isoformat()}
        for a in recent_acts
    ]

    return DashboardStatsResponse(
        learner_id=learner.id,
        overall_progress_pct=overall_pct,
        round_progress={
            "round1": r1_pct,
            "round2": r2_pct,
            "round3": r3_pct,
            "round4": r4_pct
        },
        mcqs_attempted=learner.total_questions_attempted,
        mcq_accuracy=mcq_accuracy,
        coding_solved=coding_count,
        mock_tests_completed=learner.total_mock_tests,
        interview_practiced=r4_practiced,
        streak_days=learner.streak_days,
        continue_learning=continue_learning,
        weak_topic_focus=weak_topic_focus,
        recent_activities=acts_list
    )

def get_analytics_data(db: Session, learner: Learner) -> AnalyticsResponse:
    # Subject breakdown
    tps = db.query(TopicProgress).filter(TopicProgress.learner_id == learner.id).all()
    subject_map: Dict[str, Dict[str, int]] = {}
    for tp in tps:
        if tp.subject not in subject_map:
            subject_map[tp.subject] = {"correct": 0, "total": 0}
        subject_map[tp.subject]["correct"] += tp.total_correct
        subject_map[tp.subject]["total"] += tp.total_attempts

    subject_accuracy = {}
    for subj, vals in subject_map.items():
        if vals["total"] > 0:
            subject_accuracy[subj] = round((vals["correct"] / vals["total"] * 100.0), 1)

    # Core FED-2026 curriculum subjects baseline
    core_subjects = [
        "JavaScript", "DOM Concepts", "Web Standards", 
        "SQL & Databases", "Analytical Problem Solving", 
        "React & Frontend Architecture", "Core Web Vitals"
    ]
    for s in core_subjects:
        if s not in subject_accuracy:
            subject_accuracy[s] = 0.0

    # Accuracy history (last 10 quizzes)
    quizzes = db.query(Quiz).filter(Quiz.learner_id == learner.id).order_by(Quiz.completed_at.asc()).limit(10).all()
    accuracy_history = [
        {"quiz": f"Qz {i+1}", "accuracy": q.accuracy, "date": q.completed_at.strftime("%b %d")}
        for i, q in enumerate(quizzes)
    ]

    # Strong & Weak topics
    weak = db.query(TopicProgress).filter(TopicProgress.learner_id == learner.id, TopicProgress.accuracy < 70.0).order_by(TopicProgress.accuracy.asc()).limit(5).all()
    strong = db.query(TopicProgress).filter(TopicProgress.learner_id == learner.id, TopicProgress.accuracy >= 70.0).order_by(TopicProgress.accuracy.desc()).limit(5).all()

    mcq_acc = 0.0
    if learner.total_questions_attempted > 0:
        mcq_acc = round((learner.total_correct / learner.total_questions_attempted * 100.0), 1)

    coding_solved = db.query(CodingAttempt).filter(CodingAttempt.learner_id == learner.id, CodingAttempt.status == "solved").count()
    coding_pct = min(100.0, round((coding_solved / 30.0 * 100.0), 1))

    interview_practiced = db.query(InterviewProgress).filter(InterviewProgress.learner_id == learner.id).count()
    interview_pct = min(100.0, round((interview_practiced / 30.0 * 100.0), 1))

    return AnalyticsResponse(
        overall_progress=round((mcq_acc * 0.4 + coding_pct * 0.4 + interview_pct * 0.2), 1),
        mcq_accuracy=mcq_acc,
        coding_completion_pct=coding_pct,
        interview_completion_pct=interview_pct,
        streak_days=learner.streak_days,
        subject_accuracy=subject_accuracy,
        accuracy_history=accuracy_history,
        weak_topics=[{"topic": w.topic, "subject": w.subject, "accuracy": w.accuracy} for w in weak],
        strong_topics=[{"topic": s.topic, "subject": s.subject, "accuracy": s.accuracy} for s in strong]
    )
