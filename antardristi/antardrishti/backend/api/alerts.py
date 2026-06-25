"""
ANTARDRISHTI — Alerts API Router
Endpoints for alert management.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/api", tags=["alerts"])


class AlertActionRequest(BaseModel):
    action: str
    officer: Optional[str] = None


alerts_db = [
    {
        "id": "ALT-001",
        "level": "high",
        "type": "Anomaly Detected",
        "location": "J&K Border, Sector A",
        "time": "12m ago",
        "status": "open"
    },
    {
        "id": "ALT-002",
        "level": "medium",
        "type": "Unusual Activity",
        "location": "Srinagar Outskirts",
        "time": "45m ago",
        "status": "reviewing"
    },
    {
        "id": "ALT-003",
        "level": "low",
        "type": "New Observation",
        "location": "Poonch District",
        "time": "2h ago",
        "status": "open"
    }
]


@router.get("/alerts")
async def get_alerts():
    """Get active alerts."""
    return {"alerts": alerts_db}


@router.post("/alerts/{alert_id}/action")
async def perform_alert_action(alert_id: str, request: AlertActionRequest):
    """Perform an action on an alert (assign, verify, patrol, close)."""
    for alert in alerts_db:
        if alert["id"] == alert_id:
            if request.action == "close":
                alert["status"] = "closed"
            elif request.action == "assign" and request.officer:
                alert["status"] = f"assigned to {request.officer}"
            elif request.action == "verify":
                alert["status"] = "under verification"
            elif request.action == "patrol":
                alert["status"] = "patrol dispatched"
            return {"success": True, "alert": alert}
    return {"success": False, "error": "Alert not found"}
