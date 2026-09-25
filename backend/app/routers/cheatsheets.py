import json
from pathlib import Path
from fastapi import APIRouter

router = APIRouter(prefix="/cheat-sheets", tags=["Cheat Sheets"])
CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"

@router.get("")
def get_cheat_sheets():
    cs_file = CONTENT_DIR / "cheatsheets.json"
    if cs_file.exists():
        with open(cs_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return []
