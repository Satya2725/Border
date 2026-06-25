"""
ANTARDRISHTI — Observation Database Model
SQLAlchemy model for citizen observations.
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from ..database.connection import Base


class Observation(Base):
    __tablename__ = "observations"

    id = Column(Integer, primary_key=True, index=True)
    observation_id = Column(String, unique=True, index=True, nullable=False)
    category = Column(String, nullable=False)
    subcategory = Column(String, nullable=False)
    description = Column(Text)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    confidence = Column(Float, default=50.0)
    status = Column(String, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
