"""
ANTARDRISHTI — Anomalies API Router
Endpoints for anomaly and pattern detection.
"""

from fastapi import APIRouter
from ..services.ai_service import AIService
from ..ai_engine.signal_fusion import WeakSignal
from datetime import datetime
import random

router = APIRouter(prefix="/api", tags=["anomalies"])
ai_service = AIService()


@router.get("/anomalies/patterns")
async def get_patterns():
    """Get fused intelligence patterns."""
    # Generate dummy signals for fusion
    dummy_signals = []
    categories = ["drone_sound", "dog_barking", "strange_lights", "vehicle_sound", "tire_tracks"]
    for i in range(8):
        dummy_signals.append(WeakSignal(
            signal_id=f"S-{i+1}",
            category=random.choice(categories),
            latitude=random.uniform(32.0, 34.0),
            longitude=random.uniform(73.5, 75.0),
            timestamp=datetime.utcnow()
        ))

    patterns = ai_service.fusion_engine.fuse(dummy_signals)
    return {
        "patterns": [
            {
                "pattern_id": p.pattern_id,
                "signal_ids": p.signal_ids,
                "signal_types": p.signal_types,
                "center_lat": p.center_lat,
                "center_lng": p.center_lng,
                "fusion_score": p.fusion_score,
                "confidence": p.confidence,
                "risk_level": p.risk_level,
                "ai_label": p.ai_label,
                "ai_explanation": p.ai_explanation,
                "recommendation": p.recommendation
            } for p in patterns
        ]
    }


@router.get("/anomalies/digital-twin")
async def get_digital_twin():
    """Get digital twin snapshot."""
    return ai_service.get_digital_twin_snapshot()


@router.get("/anomalies/digital-twin/radar")
async def get_digital_twin_radar():
    """Get digital twin radar chart data."""
    return ai_service.digital_twin.get_activity_radar()
