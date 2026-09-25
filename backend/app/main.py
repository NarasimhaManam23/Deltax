import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.services.seed_service import seed_database
from app.routers import (
    health,
    learner,
    dashboard,
    questions,
    quiz,
    coding,
    interview,
    study,
    cheatsheets,
    plan,
    bookmarks,
    analytics,
    search,
    export_import,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables and seed content if needed
    logger.info("Initializing database tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        logger.info("Checking and seeding preparation content...")
        seed_database(db)
    finally:
        db.close()
    
    yield
    # Teardown logic if needed

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="DeltaX Associate Product Engineer Campus Drive 2027 Preparation Engine Backend",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers under /api
api_router = FastAPI()

app.include_router(health.router, prefix="/api")
app.include_router(learner.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(questions.router, prefix="/api")
app.include_router(quiz.router, prefix="/api")
app.include_router(coding.router, prefix="/api")
app.include_router(interview.router, prefix="/api")
app.include_router(study.router, prefix="/api")
app.include_router(cheatsheets.router, prefix="/api")
app.include_router(plan.router, prefix="/api")
app.include_router(bookmarks.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")
app.include_router(search.router, prefix="/api")
app.include_router(export_import.router, prefix="/api")

@app.get("/")
def root():
    return {
        "message": "Welcome to DeltaX Prep API — Associate Product Engineer 2027",
        "docs": "/docs",
        "health": "/api/health"
    }
