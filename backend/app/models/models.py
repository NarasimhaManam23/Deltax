import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, Text, DateTime, ForeignKey, JSON
)
from sqlalchemy.orm import relationship
from app.database import Base

class Learner(Base):
    __tablename__ = "learners"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime, default=datetime.utcnow)
    last_active_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    total_questions_attempted = Column(Integer, default=0)
    total_correct = Column(Integer, default=0)
    total_coding_solved = Column(Integer, default=0)
    total_sql_solved = Column(Integer, default=0)
    total_mock_tests = Column(Integer, default=0)
    total_interview_practiced = Column(Integer, default=0)
    streak_days = Column(Integer, default=1)
    
    # Relationships
    quizzes = relationship("Quiz", back_populates="learner", cascade="all, delete-orphan")
    coding_attempts = relationship("CodingAttempt", back_populates="learner", cascade="all, delete-orphan")
    interview_progresses = relationship("InterviewProgress", back_populates="learner", cascade="all, delete-orphan")
    bookmarks = relationship("Bookmark", back_populates="learner", cascade="all, delete-orphan")
    topic_progresses = relationship("TopicProgress", back_populates="learner", cascade="all, delete-orphan")
    daily_tasks = relationship("LearnerDailyTask", back_populates="learner", cascade="all, delete-orphan")
    activities = relationship("Activity", back_populates="learner", cascade="all, delete-orphan")

class Question(Base):
    __tablename__ = "questions"

    id = Column(String(64), primary_key=True)
    q_number = Column(Integer)
    subject = Column(String(64), index=True)
    topic = Column(String(128), index=True)
    difficulty = Column(String(32), default="Medium")
    source = Column(String(128), default="GENERAL CS TOPIC")
    question_text = Column(Text, nullable=False)
    option_a = Column(Text, nullable=False)
    option_b = Column(Text, nullable=False)
    option_c = Column(Text, nullable=False)
    option_d = Column(Text, nullable=False)
    correct_answer = Column(String(4), nullable=False) # A, B, C, D
    explanation = Column(Text)
    evidence_category = Column(String(64), default="Original practice question")
    confidence_label = Column(String(32), default="Original Practice")
    source_url = Column(String(512), nullable=True)
    source_title = Column(String(256), nullable=True)
    question_type = Column(String(32), default="mcq") # mcq, output_prediction, debugging, sql_mcq

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False, index=True)
    quiz_type = Column(String(32), default="topic_practice") # topic_practice, mock_test, weak_areas, incorrect
    title = Column(String(128))
    subject = Column(String(64))
    topic = Column(String(128))
    total_questions = Column(Integer, default=0)
    score = Column(Integer, default=0)
    accuracy = Column(Float, default=0.0)
    time_taken_seconds = Column(Integer, default=0)
    completed_at = Column(DateTime, default=datetime.utcnow)

    learner = relationship("Learner", back_populates="quizzes")
    attempts = relationship("QuizAttempt", back_populates="quiz", cascade="all, delete-orphan")

class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    quiz_id = Column(String(36), ForeignKey("quizzes.id"), nullable=False, index=True)
    question_id = Column(String(64), nullable=False)
    selected_option = Column(String(4)) # A, B, C, D or None
    correct_option = Column(String(4), nullable=False)
    is_correct = Column(Boolean, default=False)
    time_spent_seconds = Column(Integer, default=0)

    quiz = relationship("Quiz", back_populates="attempts")

class CodingProblem(Base):
    __tablename__ = "coding_problems"

    id = Column(String(128), primary_key=True)
    code_id = Column(String(32))
    title = Column(String(128), nullable=False)
    tier = Column(String(32)) # Easy, Easy-Medium, Medium, Medium-Hard, Application
    difficulty = Column(String(32))
    category = Column(String(64)) # JavaScript, SQL, Arrays & Strings, etc.
    statement = Column(Text, nullable=False)
    input_format = Column(Text)
    output_format = Column(Text)
    constraints = Column(Text)
    edge_cases = Column(Text)
    approach = Column(Text)
    starter_code_java = Column(Text)
    starter_code_python = Column(Text)
    starter_code_javascript = Column(Text)
    starter_code_sql = Column(Text)
    test_cases = Column(JSON) # List of {input, expected, description, is_hidden}
    sample_data = Column(JSON) # Schema or table rows for SQL
    hints = Column(JSON) # Progressive hints
    evidence_category = Column(String(64), default="Original practice question")
    confidence_label = Column(String(32), default="Original Practice")

class CodingAttempt(Base):
    __tablename__ = "coding_attempts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False, index=True)
    problem_id = Column(String(128), nullable=False, index=True)
    language = Column(String(16), default="javascript") # javascript, sql, python, java
    code = Column(Text)
    status = Column(String(32), default="solved") # attempted, solved
    submitted_at = Column(DateTime, default=datetime.utcnow)

    learner = relationship("Learner", back_populates="coding_attempts")

class ResearchSource(Base):
    __tablename__ = "research_sources"

    id = Column(String(64), primary_key=True)
    title = Column(String(256), nullable=False)
    url = Column(String(512), nullable=False)
    source_type = Column(String(64))
    date_accessed = Column(String(32))
    reliability = Column(String(32))
    findings = Column(Text)
    evidence_category = Column(String(64))
    confidence_label = Column(String(32))

class CandidateExperience(Base):
    __tablename__ = "candidate_experiences"

    id = Column(String(64), primary_key=True)
    source_platform = Column(String(64))
    source_url = Column(String(512), nullable=True)
    date_reported = Column(String(32))
    role = Column(String(128))
    summary = Column(Text)
    topics_mentioned = Column(JSON)
    difficulty_rating = Column(String(32))
    verdict_notes = Column(Text)
    evidence_category = Column(String(64))

class InterviewQuestion(Base):
    __tablename__ = "interview_questions"

    id = Column(String(128), primary_key=True)
    round = Column(Integer, default=2) # 2 or 4
    category = Column(String(64), index=True)
    question = Column(Text, nullable=False)
    intent = Column(Text)
    framework = Column(Text)
    sample_answer = Column(Text)
    bad_answer = Column(Text)
    follow_up = Column(Text)
    definition = Column(Text)
    deep_detail = Column(Text)
    trap = Column(Text)
    body_markdown = Column(Text)

class InterviewProgress(Base):
    __tablename__ = "interview_progress"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False, index=True)
    interview_question_id = Column(String(128), nullable=False, index=True)
    status = Column(String(32), default="not_started") # not_started, practicing, confident
    user_notes = Column(Text)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    learner = relationship("Learner", back_populates="interview_progresses")

class Bookmark(Base):
    __tablename__ = "bookmarks"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False, index=True)
    item_type = Column(String(32), nullable=False) # question, coding, interview, study, cheatsheet
    item_id = Column(String(128), nullable=False)
    title = Column(String(256), nullable=False)
    meta_info = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

    learner = relationship("Learner", back_populates="bookmarks")

class TopicProgress(Base):
    __tablename__ = "topic_progress"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False, index=True)
    subject = Column(String(64), nullable=False, index=True)
    topic = Column(String(128), nullable=False)
    total_attempts = Column(Integer, default=0)
    total_correct = Column(Integer, default=0)
    accuracy = Column(Float, default=0.0)
    status = Column(String(32), default="not_started") # not_started, in_progress, mastered

    learner = relationship("Learner", back_populates="topic_progresses")

class LearnerDailyTask(Base):
    __tablename__ = "learner_daily_tasks"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False, index=True)
    task_id = Column(String(64), nullable=False)
    day = Column(String(64), nullable=False)
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime)

    learner = relationship("Learner", back_populates="daily_tasks")

class Activity(Base):
    __tablename__ = "activities"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False, index=True)
    activity_type = Column(String(32), nullable=False) # quiz_completed, coding_solved, interview_practiced, task_checked
    title = Column(String(256), nullable=False)
    details = Column(String(256))
    created_at = Column(DateTime, default=datetime.utcnow)

    learner = relationship("Learner", back_populates="activities")
