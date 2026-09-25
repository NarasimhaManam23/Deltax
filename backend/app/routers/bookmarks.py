import uuid
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.models import Learner, Bookmark
from app.schemas.schemas import BookmarkCreateRequest, BookmarkResponse
from app.routers.deps import get_current_learner

router = APIRouter(prefix="/bookmarks", tags=["Bookmarks"])

@router.get("", response_model=List[BookmarkResponse])
def get_bookmarks(
    item_type: Optional[str] = None,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    query = db.query(Bookmark).filter(Bookmark.learner_id == learner.id)
    if item_type and item_type != "All":
        query = query.filter(Bookmark.item_type == item_type)
    return query.order_by(Bookmark.created_at.desc()).all()

@router.post("", response_model=BookmarkResponse)
def add_bookmark(
    data: BookmarkCreateRequest,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    existing = db.query(Bookmark).filter(
        Bookmark.learner_id == learner.id,
        Bookmark.item_type == data.item_type,
        Bookmark.item_id == data.item_id
    ).first()

    if existing:
        return existing

    bm = Bookmark(
        id=str(uuid.uuid4()),
        learner_id=learner.id,
        item_type=data.item_type,
        item_id=data.item_id,
        title=data.title,
        meta_info=data.meta_info,
        created_at=datetime.utcnow()
    )
    db.add(bm)
    db.commit()
    db.refresh(bm)
    return bm

@router.delete("/{bookmark_id}")
def delete_bookmark(
    bookmark_id: str,
    learner: Learner = Depends(get_current_learner),
    db: Session = Depends(get_db)
):
    bm = db.query(Bookmark).filter(
        Bookmark.id == bookmark_id,
        Bookmark.learner_id == learner.id
    ).first()

    if not bm:
        # Also allow deleting by item_id
        bm = db.query(Bookmark).filter(
            Bookmark.item_id == bookmark_id,
            Bookmark.learner_id == learner.id
        ).first()

    if not bm:
        raise HTTPException(status_code=404, detail="Bookmark not found")

    db.delete(bm)
    db.commit()
    return {"status": "success", "message": "Bookmark removed"}
