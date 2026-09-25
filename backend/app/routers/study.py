import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/study", tags=["Study Library"])
CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"

@router.get("/modules")
def get_study_modules():
    s_file = CONTENT_DIR / "study_notes.json"
    if s_file.exists():
        with open(s_file, "r", encoding="utf-8") as f:
            modules = json.load(f)
            return [{"slug": m["slug"], "title": m["title"]} for m in modules]
    return []

@router.get("/modules/{slug}")
def get_study_module_by_slug(slug: str):
    s_file = CONTENT_DIR / "study_notes.json"
    if s_file.exists():
        with open(s_file, "r", encoding="utf-8") as f:
            modules = json.load(f)
            for m in modules:
                if m["slug"] == slug:
                    return m
    raise HTTPException(status_code=404, detail="Study module not found")
