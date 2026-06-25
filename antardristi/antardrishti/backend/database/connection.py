"""
ANTARDRISHTI — PostgreSQL Database Connection
Uses SQLAlchemy async engine with PostGIS support.
"""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import text
import os
import logging

logger = logging.getLogger("antardrishti.db")

# ── Connection String ─────────────────────────────────────────────────────────
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://antardrishti:password@localhost:5432/antardrishti_db"
)

# ── Engine ────────────────────────────────────────────────────────────────────
engine = create_async_engine(
    DATABASE_URL,
    echo=False,           # Set True for debug SQL logging
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
    pool_recycle=3600,
)

# ── Session Factory ───────────────────────────────────────────────────────────
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# ── Base Model ────────────────────────────────────────────────────────────────
Base = declarative_base()

# ── Dependency Injection ──────────────────────────────────────────────────────
async def get_db() -> AsyncSession:
    """FastAPI dependency: yields a database session."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

# ── Init DB ───────────────────────────────────────────────────────────────────
async def init_db():
    """Create all tables and enable PostGIS extension."""
    async with engine.begin() as conn:
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS postgis;"))
        await conn.run_sync(Base.metadata.create_all)
    logger.info("✅ Database initialized with PostGIS enabled")
