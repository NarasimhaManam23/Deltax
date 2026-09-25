# DeltaX Prep — Associate Product Engineer 2027

> A production-ready, interactive recruitment preparation platform engineered for the **DeltaX Associate Product Engineer Campus Drive 2027** at **RVR & JC College of Engineering on 29 September 2026**.

[![Backend Tests](https://img.shields.io/badge/pytest-8%20passed-emerald)](https://fastapi.tiangolo.com/)
[![Frontend Build](https://img.shields.io/badge/vite-build%20clean-blue)](https://vitejs.dev/)
[![Content Validation](https://img.shields.io/badge/content%20validation-0%20errors-emerald)](content_validation_report.json)
[![Deploy on Render](https://img.shields.io/badge/deploy-Render%20PostgreSQL%20%2B%20FastAPI-purple)](render.yaml)

---

## 1. System Architecture

```
                    DELTAX PREP PLATFORM
                             │
                     ┌───────┴───────┐
                     │ React + Vite  │
                     │ Tailwind CSS  │
                     │ Monaco Editor │
                     │ Recharts      │
                     └───────┬───────┘
                             │
                  REST API (X-Learner-ID)
                             │
                     ┌───────▼───────┐
                     │    FastAPI    │
                     │  SQLAlchemy   │
                     │ Alembic Migr. │
                     └───────┬───────┘
                             │
                     ┌───────▼───────┐
                     │Render Postgres│
                     │(Local: SQLite)│
                     └───────────────┘

         Anonymous UUID (Crypto randomUUID)
                        │
                        ▼
                   localStorage
                        │
                        ▼
           learner_id ──► Full State & Progress
```

---

## 2. Drive & Process Grounding

This platform distinguishes between the **Authoritative Current Drive Schedule** and **Historical Candidate Reports**:

### Current Official Process (RVR & JC College of Engineering — 29 Sept 2026)
* **Company**: DeltaX
* **Role**: Associate Product Engineer (APE)
* **Batch**: 2027
* **CTC**: ₹7.0 LPA (Base ~₹5.16L + Bonus ~₹1.4L + Benefits)
* **Locations**: Bangalore, Hyderabad, Pune
* **Schedule Breakdown**:
  * **Round 1 (10:00 AM – 10:45 AM)**: Online Technical MCQ (50 Questions, 45 Minutes).
  * **Round 2 (Starts 12:30 PM)**: AI Telephonic Interview (15–20 Minutes voice screening).
  * **Round 3 (Starts 4:00 PM)**: Online Coding Assessment (Official college email notice: 30 Minutes).
  * **Round 4 (Starts 5:00 PM)**: One-to-One Technical Interview (45 Minutes Notepad live coding & architectural defense).

### Historical Candidate Experience Reports (2022–2025)
* In prior offline and pooled university drives, candidates reported a **120-minute coding test with 5 problems** and a **strict 55% per-question test-case cutoff**.
* The platform provides dedicated simulations for both formats: **Speed Mocks (30m)** and **Historical Mocks (120m)**.

---

## 3. Key Architectural Features

### 1. Anonymous Learner Profile (Zero Login / Zero Signup)
* First visit generates a cryptographically random UUID (`crypto.randomUUID()`) saved in browser `localStorage`.
* All API requests send the `X-Learner-ID` header.
* The FastAPI backend automatically provisions an anonymous `Learner` record on first contact.
* **Export Progress**: Download a complete JSON snapshot of all test scores, coding submissions, daily tasks, and bookmarks.
* **Import Progress**: Restore your state from any JSON backup without losing preparation velocity.

### 2. High-Accuracy Educational Content Layer
* Built directly on the validated preparation repository in `DELTAX_PREPARATION/`.
* **750 Technical MCQs**: 500 subject MCQs across 8 subjects + 250 questions across 5 full mock exams.
* **100 Coding Problems**: Comprehensive catalog spanning Easy, Easy-Medium, Medium, Medium-Hard, and Application tiers.
* **17 Master Coding Patterns**: Clues, brute-force vs optimized approaches, Big-O bounds, and production implementations in both Java and Python.
* **290 Deep Interview Questions**: Model answers, structured frameworks, and interviewer follow-up questions.
* **4 Master Project Cards**: Complete architectural breakdowns, pitches, metrics, trade-offs, and 20 interview defense questions for *ADAM-1 Enhanced*, *Simha AI*, *Smart Loan Approval*, and *Akki AI Assistant*.
* **20 High-Density Cheat Sheets**: Distilled reference guides with print and markdown export support.
* **Interactive 4-Day Plan**: Checklist for 25 to 29 September with backend synchronization.

### 3. Isolated Monaco Code Editor & Test Runner
* Integrated Monaco Code Editor (`@monaco-editor/react`) supporting Java and Python syntax highlighting.
* Client-side safe test-case evaluation simulating runtime and memory constraints without running un-sandboxed `exec()` on the web server.
* Solution defense checklist (the 8 standard interviewer defense probes).

### 4. Diagnostic Analytics & "Focus Next" Engine
* Built with **Recharts**:
  * Bar chart for subject accuracy across all 8 technical subjects.
  * Line chart for score progression across mock tests.
  * Question bank coverage breakdown (Correct, Incorrect, Unattempted).
* **Weak Topic Diagnostic Engine**: Automatically analyzes stored quiz attempts to recommend your lowest-scoring topic (e.g. "Your recent DBMS accuracy is 58%. Review SQL joins and normalization.").

---

## 4. Database Schema

The database model is built with SQLAlchemy and tracked with Alembic migrations:

| Table | Purpose | Primary Keys & Indexes |
| :--- | :--- | :--- |
| `learners` | Anonymous learner profile & lifetime stats | `learner_id` (UUID PK), `streak_days`, `last_active_at` |
| `questions` | Question bank (MCQs & Mocks) | `id` (PK), index on `subject`, `topic` |
| `quizzes` | Individual quiz or mock test sessions | `quiz_id` (PK), `learner_id` (FK) |
| `quiz_attempts` | Submitted answers and server-verified scores | `id` (PK), `quiz_id` (FK), `score`, `accuracy` |
| `topic_progress` | Per-topic tracking (attempts, correct count) | `id` (PK), `learner_id` (FK), index on `subject` |
| `coding_problems` | Master algorithmic practice problems | `id` (PK), `tier`, `category` |
| `coding_attempts` | Submitted code, language, status | `id` (PK), `learner_id` (FK), `problem_id` (FK) |
| `interview_questions`| Round 2 & Round 4 interview repository | `id` (PK), `category`, `round` |
| `interview_progress` | Status: `NOT_STARTED`, `PRACTICING`, `CONFIDENT` | `id` (PK), `learner_id` (FK), `interview_question_id` (FK) |
| `learner_daily_tasks`| Interactive checklist state for 4-day plan | `id` (PK), `learner_id` (FK), `task_id`, `is_completed` |
| `bookmarks` | Bookmarked MCQs, coding problems, notes | `id` (PK), `learner_id` (FK), `item_type`, `item_id` |
| `activities` | Time-series telemetry of learner actions | `id` (PK), `learner_id` (FK), `activity_type` |

---

## 5. Local Development Setup

### Prerequisites
* Python 3.11+
* Node.js 18+ and npm

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment (optional)
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Seed the database from educational content
python ../scripts/import_content.py

# Start the FastAPI development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
FastAPI interactive docs will be available at: `http://localhost:8000/docs`

### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
The React application will be live at: `http://localhost:5173`

---

## 6. Testing & Validation

### Run Backend Unit & Integration Tests
```bash
cd backend
python -m pytest tests/ -v
```
All 8 test suites pass:
1. `test_health_endpoint`: Checks `/api/health` connectivity.
2. `test_anonymous_learner_creation`: Validates UUID provisioning via `X-Learner-ID`.
3. `test_topics_and_questions`: Verifies question filters and subject catalogs.
4. `test_quiz_flow`: Tests server-side quiz scoring and accuracy computation.
5. `test_coding_flow`: Tests problem retrieval and attempt logging.
6. `test_interview_flow`: Validates status updates (`CONFIDENT`, `PRACTICING`).
7. `test_bookmarks_and_plan`: Tests bookmarking and 4-day plan checklist toggling.
8. `test_export_import`: Validates full JSON export and restore capabilities.

### Run Content Validation Script
```bash
python scripts/validate_content.py
```
Validates 500 MCQs, 100 coding problems, 290 interview questions, and 250 mock test questions for schema integrity, valid options, and non-empty answers.

---

## 7. Render Deployment Guide

The repository includes a ready-to-deploy `render.yaml` manifest:

```yaml
services:
  - type: web
    name: deltax-prep-backend
    runtime: python
    buildCommand: "pip install -r requirements.txt"
    startCommand: "uvicorn app.main:app --host 0.0.0.0 --port $PORT"
    rootDir: backend
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: deltax-prep-db
          property: connectionString
      - key: CORS_ORIGINS
        value: "https://deltax-prep-frontend.onrender.com,http://localhost:5173"

  - type: web
    name: deltax-prep-frontend
    runtime: static
    buildCommand: "npm install && npm run build"
    staticPublishPath: "./dist"
    rootDir: frontend
    envVars:
      - key: VITE_API_URL
        value: "https://deltax-prep-backend.onrender.com"
    routes:
      - type: rewrite
        source: "/*"
        destination: "/index.html"

databases:
  - name: deltax-prep-db
    databaseName: deltax_prep
    user: deltax_user
    plan: free
```

### Steps to Deploy on Render:
1. Push this repository to GitHub or GitLab.
2. Log in to [Render Dashboard](https://dashboard.render.com).
3. Click **New +** -> **Blueprint**.
4. Connect your repository. Render will automatically detect `render.yaml` and provision:
   - **Render PostgreSQL** (`deltax-prep-db`)
   - **FastAPI Web Service** (`deltax-prep-backend`)
   - **React Static Site** (`deltax-prep-frontend`) with SPA rewrite rule `/* -> /index.html`.
5. On deployment, the backend lifespan automatically provisions tables and seeds all 750 MCQs, 100 coding problems, and 290 interview questions!

---

## 8. Directory Structure

```
DeltaX/
├── DELTAX_PREPARATION/            # Source preparation repository from ZIP
├── backend/
│   ├── alembic/                  # Database migration versions
│   ├── app/
│   │   ├── content/              # Normalized JSON data layer
│   │   ├── models/models.py      # SQLAlchemy relational models
│   │   ├── schemas/schemas.py    # Pydantic v2 validation schemas
│   │   ├── routers/              # 13 REST API route controllers
│   │   ├── services/             # Scoring, analytics, and seed services
│   │   ├── config.py             # Database and CORS settings
│   │   ├── database.py           # Engine & SessionLocal
│   │   └── main.py               # FastAPI application & lifespan
│   ├── tests/test_api.py         # 8 automated pytest integration tests
│   ├── requirements.txt          # Python dependencies
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable UI widgets (Timer, Search, Markdown, Monaco)
│   │   ├── context/              # LearnerContext & BookmarkContext
│   │   ├── data/                 # Bundled offline-first JSON fallback data
│   │   ├── layouts/MainLayout.jsx# Sidebar, topbar countdown, streak flame
│   │   ├── pages/                # 14 primary pages
│   │   ├── api.js                # Fetch client with anonymous UUID header
│   │   ├── App.jsx               # React Router v6 setup
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js            # API proxy setup
│   ├── tailwind.config.js
│   └── .env.example
├── content/                      # Content distribution artifacts
├── scripts/
│   ├── import_content.py         # Standalone database content importer
│   ├── parse_and_export.py       # Markdown parsing & JSON normalization
│   └── validate_content.py       # Schema & content integrity checker
├── content_validation_report.json
├── render.yaml                   # Infrastructure-as-code deployment manifest
└── README.md
```

---

## 9. License & Attribution

* Built exclusively for preparation for the **DeltaX Associate Product Engineer drive**.
* Research sections distinguish between candidate-reported experiences and current college communications.
