import uuid
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.models import Learner, Question, Quiz, QuizAttempt, TopicProgress, Activity
from app.schemas.schemas import QuizSubmitRequest, QuizResultResponse, QuestionResultItem

def process_quiz_submission(db: Session, learner: Learner, data: QuizSubmitRequest) -> QuizResultResponse:
    q_ids = [item.question_id for item in data.answers]
    questions_map = {q.id: q for q in db.query(Question).filter(Question.id.in_(q_ids)).all()}

    quiz_id = data.quiz_id or str(uuid.uuid4())
    total_q = len(data.answers)
    score = 0
    question_results = []
    topic_stats = {}

    quiz = Quiz(
        id=quiz_id,
        learner_id=learner.id,
        quiz_type=data.quiz_type,
        title=f"{data.subject or 'General'} Quiz" if data.quiz_type != "mock_test" else "Round 1 Mock Test",
        subject=data.subject,
        topic=data.topic,
        total_questions=total_q,
        time_taken_seconds=data.time_taken_seconds,
        completed_at=datetime.utcnow()
    )
    db.add(quiz)
    db.flush()

    for item in data.answers:
        q = questions_map.get(item.question_id)
        if not q:
            continue

        selected = item.selected_option.strip().upper() if item.selected_option else None
        correct = q.correct_answer.strip().upper()
        is_corr = (selected == correct)

        if is_corr:
            score += 1

        # Track topic breakdown
        topic_name = q.topic or q.subject
        if topic_name not in topic_stats:
            topic_stats[topic_name] = {"total": 0, "correct": 0, "accuracy": 0.0}
        topic_stats[topic_name]["total"] += 1
        if is_corr:
            topic_stats[topic_name]["correct"] += 1

        # Record attempt
        attempt = QuizAttempt(
            id=str(uuid.uuid4()),
            quiz_id=quiz.id,
            question_id=q.id,
            selected_option=selected,
            correct_option=correct,
            is_correct=is_corr,
            time_spent_seconds=item.time_spent_seconds
        )
        db.add(attempt)

        question_results.append(QuestionResultItem(
            question_id=q.id,
            question_text=q.question_text,
            option_a=q.option_a,
            option_b=q.option_b,
            option_c=q.option_c,
            option_d=q.option_d,
            selected_option=selected,
            correct_answer=correct,
            is_correct=is_corr,
            explanation=q.explanation or "",
            topic=topic_name
        ))

    accuracy = (score / total_q * 100.0) if total_q > 0 else 0.0
    quiz.score = score
    quiz.accuracy = round(accuracy, 1)

    # Compute percentages in topic breakdown
    for top, stat in topic_stats.items():
        stat["accuracy"] = round((stat["correct"] / stat["total"] * 100.0), 1)

    # Update Learner Stats
    learner.total_questions_attempted += total_q
    learner.total_correct += score
    if data.quiz_type == "mock_test":
        learner.total_mock_tests += 1

    # Update TopicProgress table for learner
    for top_name, stat in topic_stats.items():
        subj = data.subject or "General"
        tp = db.query(TopicProgress).filter(
            TopicProgress.learner_id == learner.id,
            TopicProgress.topic == top_name
        ).first()

        if not tp:
            tp = TopicProgress(
                id=str(uuid.uuid4()),
                learner_id=learner.id,
                subject=subj,
                topic=top_name,
                total_attempts=stat["total"],
                total_correct=stat["correct"],
                accuracy=stat["accuracy"],
                status="in_progress"
            )
            db.add(tp)
        else:
            tp.total_attempts += stat["total"]
            tp.total_correct += stat["correct"]
            tp.accuracy = round((tp.total_correct / tp.total_attempts * 100.0), 1)
            if tp.accuracy >= 80 and tp.total_attempts >= 10:
                tp.status = "mastered"

    # Add Activity record
    act_title = f"Completed {quiz.title}: {score}/{total_q} ({round(accuracy, 1)}%)"
    activity = Activity(
        id=str(uuid.uuid4()),
        learner_id=learner.id,
        activity_type="quiz_completed",
        title=act_title,
        details=f"Accuracy: {round(accuracy, 1)}% in {data.time_taken_seconds}s"
    )
    db.add(activity)

    db.commit()

    return QuizResultResponse(
        quiz_id=quiz.id,
        quiz_type=quiz.quiz_type,
        title=quiz.title,
        subject=quiz.subject,
        topic=quiz.topic,
        total_questions=total_q,
        score=score,
        accuracy=round(accuracy, 1),
        time_taken_seconds=data.time_taken_seconds,
        completed_at=quiz.completed_at,
        questions=question_results,
        topic_breakdown=topic_stats
    )
