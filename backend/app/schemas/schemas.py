from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Optional, Any
from datetime import datetime

# Learner Schemas
class LearnerBase(BaseModel):
    id: str

class LearnerResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    created_at: datetime
    last_active_at: datetime
    total_questions_attempted: int
    total_correct: int
    total_coding_solved: int
    total_mock_tests: int
    total_interview_practiced: int
    streak_days: int

# Question Schemas
class QuestionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    q_number: Optional[int] = None
    subject: str
    topic: str
    difficulty: str
    source: str
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: Optional[str] = None
    explanation: Optional[str] = None

# Quiz Schemas
class QuizStartRequest(BaseModel):
    quiz_type: str = "topic_practice"
    subject: Optional[str] = None
    topic: Optional[str] = None
    mock_id: Optional[int] = None
    question_count: int = 10
    difficulty: Optional[str] = "Mixed"

class AnswerSubmitItem(BaseModel):
    question_id: str
    selected_option: Optional[str] = None
    time_spent_seconds: int = 0

class QuizSubmitRequest(BaseModel):
    quiz_id: Optional[str] = None
    quiz_type: str = "topic_practice"
    subject: Optional[str] = None
    topic: Optional[str] = None
    time_taken_seconds: int = 0
    answers: List[AnswerSubmitItem]

class QuestionResultItem(BaseModel):
    question_id: str
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    selected_option: Optional[str]
    correct_answer: str
    is_correct: bool
    explanation: str
    topic: str

class QuizResultResponse(BaseModel):
    quiz_id: str
    quiz_type: str
    title: str
    subject: Optional[str] = None
    topic: Optional[str] = None
    total_questions: int
    score: int
    accuracy: float
    time_taken_seconds: int
    completed_at: datetime
    questions: List[QuestionResultItem]
    topic_breakdown: Dict[str, Dict[str, Any]]

# Coding Schemas
class CodingProblemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    code_id: Optional[str] = None
    title: str
    tier: Optional[str] = None
    difficulty: Optional[str] = None
    category: Optional[str] = None
    statement: str
    input_format: Optional[str] = None
    output_format: Optional[str] = None
    constraints: Optional[str] = None
    edge_cases: Optional[str] = None
    approach: Optional[str] = None
    starter_code_java: Optional[str] = None
    starter_code_python: Optional[str] = None
    is_solved: Optional[bool] = False

class CodingSubmitRequest(BaseModel):
    problem_id: str
    language: str = "python"
    code: str
    status: str = "solved"

class CodingAttemptResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    problem_id: str
    language: str
    status: str
    submitted_at: datetime

# Interview Schemas
class InterviewQuestionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    round: int
    category: str
    question: str
    intent: Optional[str] = None
    framework: Optional[str] = None
    sample_answer: Optional[str] = None
    bad_answer: Optional[str] = None
    follow_up: Optional[str] = None
    definition: Optional[str] = None
    deep_detail: Optional[str] = None
    trap: Optional[str] = None
    body_markdown: Optional[str] = None
    status: Optional[str] = "not_started"

class InterviewProgressUpdateRequest(BaseModel):
    question_id: str
    status: str
    notes: Optional[str] = None

# Bookmark Schemas
class BookmarkCreateRequest(BaseModel):
    item_type: str
    item_id: str
    title: str
    meta_info: Optional[Dict[str, Any]] = None

class BookmarkResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    item_type: str
    item_id: str
    title: str
    meta_info: Optional[Dict[str, Any]] = None
    created_at: datetime

# Daily Task Schemas
class TaskToggleRequest(BaseModel):
    task_id: str
    is_completed: bool

# Dashboard & Analytics Schemas
class DashboardStatsResponse(BaseModel):
    learner_id: str
    overall_progress_pct: float
    round_progress: Dict[str, float]
    mcqs_attempted: int
    mcq_accuracy: float
    coding_solved: int
    mock_tests_completed: int
    interview_practiced: int
    streak_days: int
    continue_learning: Optional[Dict[str, Any]] = None
    weak_topic_focus: Optional[Dict[str, Any]] = None
    recent_activities: List[Dict[str, Any]] = []

class AnalyticsResponse(BaseModel):
    overall_progress: float
    mcq_accuracy: float
    coding_completion_pct: float
    interview_completion_pct: float
    streak_days: int
    subject_accuracy: Dict[str, float]
    accuracy_history: List[Dict[str, Any]]
    weak_topics: List[Dict[str, Any]]
    strong_topics: List[Dict[str, Any]]

# Export & Import
class ExportProgressResponse(BaseModel):
    learner: Dict[str, Any]
    quizzes: List[Dict[str, Any]]
    quiz_attempts: List[Dict[str, Any]]
    coding_attempts: List[Dict[str, Any]]
    interview_progress: List[Dict[str, Any]]
    bookmarks: List[Dict[str, Any]]
    topic_progress: List[Dict[str, Any]]
    daily_tasks: List[Dict[str, Any]]
    exported_at: str

class ImportProgressRequest(BaseModel):
    data: Dict[str, Any]
