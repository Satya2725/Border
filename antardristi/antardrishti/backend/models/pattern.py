"""
ANTARDRISHTI — Pattern Database Model
SQLAlchemy model for fused intelligence patterns.
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, Text, JSON
from sqlalchemy.sql import func
from ..database.connection import Base


class Pattern(Base):
    __tablename__ = "patterns"

    id = Column(Integer, primary_key=True, index=True)
    pattern_id = Column(String, unique=True, index=True, nullable=False)
    signal_ids = Column(JSON, nullable=False)
    signal_types = Column(JSON, nullable=False)
    center_lat = Column(Float, nullable=False)
    center_lng = Column(Float, nullable=False)
    fusion_score = Column(Float, nullable=False)
    confidence = Column(Float, nullable=False)
    risk_level = Column(String, nullable=False)
    ai_label = Column(String, nullable=False)
    ai_explanation = Column(Text, nullable=False)
    recommendation = Column(String, default="Human Verification Recommended")
    status = Column(String, default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
