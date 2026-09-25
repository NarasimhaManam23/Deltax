#!/usr/bin/env python3
"""
scripts/import_content.py
Seeds PostgreSQL (or local SQLite) database directly with normalized preparation content.
Can be executed as a standalone CLI script or automatically during backend startup lifespan.
"""

import sys
import os
import json
from pathlib import Path

# Add backend directory to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR / "backend"))

from app.database import engine, Base, SessionLocal
from app.models.models import Question, CodingProblem, InterviewQuestion
from app.services.seed_service import seed_database

def main():
    print("=" * 60)
    print("DeltaX Prep — Database Content Importer")
    print("=" * 60)
    
    # 1. Create tables if they do not exist
    print("[1/3] Ensuring database schema tables exist...")
    Base.metadata.create_all(bind=engine)
    
    # 2. Seed database records
    print("[2/3] Seeding database records from content layer...")
    db = SessionLocal()
    try:
        seed_database(db)
        q_count = db.query(Question).count()
        c_count = db.query(CodingProblem).count()
        i_count = db.query(InterviewQuestion).count()
        print(f"      - Total Questions in DB: {q_count}")
        print(f"      - Total Coding Problems in DB: {c_count}")
        print(f"      - Total Interview Questions in DB: {i_count}")
        print("[3/3] Database import completed successfully!")
    except Exception as e:
        print(f"ERROR during seeding: {e}", file=sys.stderr)
        db.rollback()
        sys.exit(1)
    finally:
        db.close()

if __name__ == "__main__":
    main()
