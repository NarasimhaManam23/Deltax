import json
from pathlib import Path
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from app.database import get_db
from app.models.models import ResearchSource, CandidateExperience

router = APIRouter(prefix="/research", tags=["Research"])
CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"

@router.get("")
def get_research_dossier(db: Session = Depends(get_db)):
    r_file = CONTENT_DIR / "research.json"
    if r_file.exists():
        with open(r_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

@router.get("/sources")
def get_research_sources(
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    r_file = CONTENT_DIR / "research.json"
    if r_file.exists():
        with open(r_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            sources = data.get("sources", [])
            if category and category != "All":
                sources = [s for s in sources if s.get("evidence_category") == category]
            return sources
    return []

@router.get("/experiences")
def get_candidate_experiences(db: Session = Depends(get_db)):
    r_file = CONTENT_DIR / "research.json"
    if r_file.exists():
        with open(r_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data.get("candidate_experiences", [])
    return []

@router.get("/topic-frequency")
def get_topic_frequency():
    r_file = CONTENT_DIR / "research.json"
    if r_file.exists():
        with open(r_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data.get("topic_frequency", [])
    return []
