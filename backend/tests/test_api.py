import os
import uuid
import pytest
from fastapi.testclient import TestClient

os.environ["DATABASE_URL"] = "sqlite:///./test_deltax.db"

from app.main import app
from app.database import engine, Base, SessionLocal
from app.services.seed_service import seed_database

@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    seed_database(db)
    db.close()
    yield

def test_health_endpoint():
    with TestClient(app) as client:
        response = client.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "online"
        assert data["database"] == "healthy"
        assert data["counts"]["questions"] > 0

def test_anonymous_learner_creation():
    with TestClient(app) as client:
        test_uuid = str(uuid.uuid4())
        headers = {"X-Learner-ID": test_uuid}
        response = client.get("/api/learner/me", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == test_uuid
        assert data["total_questions_attempted"] == 0

def test_topics_and_questions():
    with TestClient(app) as client:
        response = client.get("/api/questions/topics")
        assert response.status_code == 200
        topics = response.json()
        assert len(topics) > 0

        # Get questions
        q_resp = client.get("/api/questions?limit=5")
        assert q_resp.status_code == 200
        qs = q_resp.json()
        assert len(qs) == 5

def test_quiz_flow():
    with TestClient(app) as client:
        test_uuid = str(uuid.uuid4())
        headers = {"X-Learner-ID": test_uuid}

        # Start quiz
        start_resp = client.post("/api/quiz/start", json={
            "quiz_type": "topic_practice",
            "question_count": 5
        }, headers=headers)
        assert start_resp.status_code == 200
        quiz_data = start_resp.json()
        assert len(quiz_data["questions"]) == 5

        # Submit quiz
        q1 = quiz_data["questions"][0]
        submit_resp = client.post("/api/quiz/submit", json={
            "quiz_id": quiz_data["quiz_id"],
            "quiz_type": "topic_practice",
            "time_taken_seconds": 45,
            "answers": [
                {"question_id": q1["id"], "selected_option": "A", "time_spent_seconds": 10}
            ]
        }, headers=headers)
        assert submit_resp.status_code == 200
        result = submit_resp.json()
        assert "score" in result
        assert "accuracy" in result
        assert len(result["questions"]) == 1

def test_coding_flow():
    with TestClient(app) as client:
        test_uuid = str(uuid.uuid4())
        headers = {"X-Learner-ID": test_uuid}

        resp = client.get("/api/coding/problems", headers=headers)
        assert resp.status_code == 200
        problems = resp.json()
        assert len(problems) > 0
        p1 = problems[0]

        # Submit coding solution
        sub_resp = client.post("/api/coding/submit", json={
            "problem_id": p1["id"],
            "language": "python",
            "code": "print('hello')",
            "status": "solved"
        }, headers=headers)
        assert sub_resp.status_code == 200

def test_interview_flow():
    with TestClient(app) as client:
        test_uuid = str(uuid.uuid4())
        headers = {"X-Learner-ID": test_uuid}

        resp = client.get("/api/interview/questions?round=2", headers=headers)
        assert resp.status_code == 200
        questions = resp.json()
        assert len(questions) > 0
        q1 = questions[0]

        # Update progress
        prog_resp = client.post("/api/interview/progress", json={
            "question_id": q1["id"],
            "status": "confident",
            "notes": "Practiced smoothly without hesitation"
        }, headers=headers)
        assert prog_resp.status_code == 200

def test_bookmarks_and_plan():
    with TestClient(app) as client:
        test_uuid = str(uuid.uuid4())
        headers = {"X-Learner-ID": test_uuid}

        # Add bookmark
        bm_resp = client.post("/api/bookmarks", json={
            "item_type": "question",
            "item_id": "mcq_prog_1",
            "title": "C Pointer Dereference Trap"
        }, headers=headers)
        assert bm_resp.status_code == 200

        # Get bookmarks
        get_bm = client.get("/api/bookmarks", headers=headers)
        assert get_bm.status_code == 200
        assert len(get_bm.json()) >= 1

        # Plan tasks
        tasks_resp = client.get("/api/plan/tasks", headers=headers)
        assert tasks_resp.status_code == 200
        tasks = tasks_resp.json()
        assert len(tasks) > 0

        # Toggle task
        t1 = tasks[0]
        toggle_resp = client.post(f"/api/plan/tasks/{t1['id']}/toggle", json={
            "task_id": t1["id"],
            "is_completed": True
        }, headers=headers)
        assert toggle_resp.status_code == 200

def test_export_import():
    with TestClient(app) as client:
        test_uuid = str(uuid.uuid4())
        headers = {"X-Learner-ID": test_uuid}

        export_resp = client.get("/api/export", headers=headers)
        assert export_resp.status_code == 200
        exported_data = export_resp.json()
        assert "learner" in exported_data
        assert "exported_at" in exported_data

        # Import
        new_uuid = str(uuid.uuid4())
        new_headers = {"X-Learner-ID": new_uuid}
        import_resp = client.post("/api/import", json={"data": exported_data}, headers=new_headers)
        assert import_resp.status_code == 200

def test_sql_sandbox_execution():
    with TestClient(app) as client:
        test_uuid = str(uuid.uuid4())
        headers = {"X-Learner-ID": test_uuid}

        # 1. Fetch schema
        schema_resp = client.get("/api/coding/sql/schema", headers=headers)
        assert schema_resp.status_code == 200
        schema = schema_resp.json()
        assert "tables" in schema
        assert len(schema["tables"]) >= 4

        # 2. Run valid query
        run_resp = client.post("/api/coding/sql/run", json={
            "query": "SELECT id, name, salary FROM employees WHERE salary > 80000 ORDER BY salary DESC;"
        }, headers=headers)
        assert run_resp.status_code == 200
        run_data = run_resp.json()
        assert run_data["success"] is True
        assert len(run_data["rows"]) >= 3
        assert "salary" in [c.lower() for c in run_data["columns"]]

        # 3. Test verification against reference problem
        eval_resp = client.post("/api/coding/sql/run", json={
            "problem_id": "sql_emp_salaries",
            "query": "SELECT id, name, salary FROM employees WHERE department_id = 1 AND salary > 70000 ORDER BY salary DESC;"
        }, headers=headers)
        assert eval_resp.status_code == 200
        eval_data = eval_resp.json()
        assert eval_data["success"] is True
        assert eval_data["passed_validation"] is True

        # 4. Reject destructive SQL
        block_resp = client.post("/api/coding/sql/run", json={
            "query": "DROP TABLE employees;"
        }, headers=headers)
        assert block_resp.status_code == 200
        assert block_resp.json()["success"] is False
        assert "disallowed" in block_resp.json()["error"].lower()

def test_mistakes_notebook_flow():
    with TestClient(app) as client:
        test_uuid = str(uuid.uuid4())
        headers = {"X-Learner-ID": test_uuid}

        # Start quiz
        start_resp = client.post("/api/quiz/start", json={
            "quiz_type": "topic_practice",
            "question_count": 2
        }, headers=headers)
        assert start_resp.status_code == 200
        q_item = start_resp.json()["questions"][0]

        # Submit intentionally incorrect answer
        wrong_choice = "D" if q_item.get("option_d") else "B"
        submit_resp = client.post("/api/quiz/submit", json={
            "quiz_id": start_resp.json()["quiz_id"],
            "quiz_type": "topic_practice",
            "time_taken_seconds": 20,
            "answers": [
                {"question_id": q_item["id"], "selected_option": wrong_choice, "time_spent_seconds": 15}
            ]
        }, headers=headers)
        assert submit_resp.status_code == 200

        # Verify mistake is logged in learner notebook
        mistakes_resp = client.get("/api/learner/mistakes", headers=headers)
        assert mistakes_resp.status_code == 200
        mistakes = mistakes_resp.json()
        if len(mistakes) > 0:
            assert mistakes[0]["question_id"] == q_item["id"]
            assert mistakes[0]["mistake_count"] >= 1

def test_research_dossier_flow():
    with TestClient(app) as client:
        # Full dossier
        r_resp = client.get("/api/research")
        assert r_resp.status_code == 200
        r_data = r_resp.json()
        assert "role_overview" in r_data
        assert "confirmed_recruitment_process" in r_data
        assert "FED-2026" in r_data["role_overview"]["reference_code"]

        # Sources
        s_resp = client.get("/api/research/sources")
        assert s_resp.status_code == 200
        sources = s_resp.json()
        assert len(sources) >= 4

        # Experiences
        exp_resp = client.get("/api/research/experiences")
        assert exp_resp.status_code == 200
        experiences = exp_resp.json()
        assert len(experiences) >= 2

        # Frequency
        f_resp = client.get("/api/research/topic-frequency")
        assert f_resp.status_code == 200
        freq = f_resp.json()
        assert len(freq) >= 5
