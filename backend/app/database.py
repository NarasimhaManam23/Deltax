from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from app.config import settings

# Engine configuration
connect_args = {}
if settings.sqlalchemy_database_uri.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.sqlalchemy_database_uri,
    connect_args=connect_args,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
