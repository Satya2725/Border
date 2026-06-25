"""
ANTARDRISHTI — Signals API Router
Endpoints for signal-related operations.
"""

from fastapi import APIRouter
from ..services.ai_service import AIService

router = APIRouter(prefix="/api", tags=["signals"])
ai_service = AIService()


@router.get("/signals")
async def get_signals():
    """Get list of recent weak signals."""
    return {
        "signals": ai_service.dummy_data.get_recent_signals()
    }


@router.get("/signals/corridors")
async def get_corridors():
    """Get predicted movement corridors."""
    corridors = ai_service.movement_pred.predict_corridors()
    return {
        "corridors": [
            {
                "corridor_id": c.corridor_id,
                "name": c.name,
                "start_lat": c.start_lat,
                "start_lng": c.start_lng,
                "end_lat": c.end_lat,
                "end_lng": c.end_lng,
                "waypoints": c.waypoints,
                "probability": c.probability,
                "direction": c.direction,
                "estimated_time_hrs": c.estimated_time_hrs,
                "risk_level": c.risk_level
            } for c in corridors
        ]
    }
