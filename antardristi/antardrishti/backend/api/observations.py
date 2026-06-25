"""
ANTARDRISHTI — Observations API Router
Handles citizen weak-signal submission and retrieval.
"""

from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime
import uuid
import random
from ..services.ai_service import AIService

router = APIRouter(prefix="/api", tags=["observations"])
ai_service = AIService()


# ── Pydantic Schemas ──────────────────────────────────────────────────────────
class ObservationCreate(BaseModel):
    category:       str     = Field(..., description="Signal category")
    description:    str     = Field(..., min_length=10, max_length=2000)
    latitude:       Optional[float] = Field(None, ge=-90,  le=90)
    longitude:      Optional[float] = Field(None, ge=-180, le=180)
    location_name:  Optional[str]   = None
    observed_at:    datetime        = Field(default_factory=datetime.utcnow)

    class Config:
        schema_extra = {
            "example": {
                "category": "drone_sound",
                "description": "Heard persistent humming sound overhead around midnight, no visible aircraft lights.",
                "latitude": 32.7266,
                "longitude": 74.8570,
                "observed_at": "2025-06-25T00:30:00"
            }
        }


class ObservationResponse(BaseModel):
    signal_id:       str
    category:        str
    ai_confidence:   float
    ai_label:        str
    ai_note:         str
    recommendation:  str
    status:          str
    submitted_at:    datetime


# ── AI Simulation (replace with real AI engine) ───────────────────────────────
def _simulate_ai_analysis(category: str, description: str) -> dict:
    """
    Simulate AI analysis of an observation.
    SAFETY: Always returns cautious language — no threat declarations.
    """
    high_priority = ["drone_sound", "explosion_like", "strange_lights", "broken_fence"]
    med_priority  = ["vehicle_sound", "tire_tracks", "flashing_lights", "dog_barking"]

    if category in high_priority:
        confidence = round(random.uniform(60, 90), 1)
        label      = "anomaly_identified"
        note       = (
            "Signal pattern deviates from historical baseline. "
            "Multiple corroborating factors detected."
        )
    elif category in med_priority:
        confidence = round(random.uniform(35, 65), 1)
        label      = "unusual_activity_detected"
        note       = "Activity differs from expected baseline. Requires additional corroboration."
    else:
        confidence = round(random.uniform(15, 45), 1)
        label      = "emerging_pattern_detected"
        note       = "Weak signal recorded. Monitoring for corroborating observations."

    return {
        "confidence": confidence,
        "label":      label,
        "note":       note,
        "recommendation": "Human Verification Recommended"
    }


# ── Endpoints ─────────────────────────────────────────────────────────────────
@router.post("/", response_model=ObservationResponse, status_code=201)
async def submit_observation(
    obs: ObservationCreate,
    background_tasks: BackgroundTasks
):
    """
    Submit a citizen observation (weak signal) to the intelligence network.
    AI analysis runs automatically — human review required for all high-confidence hits.
    """
    signal_id = "SIG-" + uuid.uuid4().hex[:8].upper()
    ai        = _simulate_ai_analysis(obs.category, obs.description)

    # Background: run full signal fusion pipeline
    background_tasks.add_task(_run_signal_fusion, signal_id, obs.category)

    return ObservationResponse(
        signal_id      = signal_id,
        category       = obs.category,
        ai_confidence  = ai["confidence"],
        ai_label       = ai["label"],
        ai_note        = ai["note"],
        recommendation = ai["recommendation"],
        status         = "pending_review",
        submitted_at   = datetime.utcnow()
    )


@router.get("/observations", response_model=List[dict])
async def list_observations(
    limit: int = 50,
    offset: int = 0,
    category: Optional[str] = None,
    risk: Optional[str] = None
):
    """List observations with optional filters."""
    obs = ai_service.dummy_data.generate_observations(limit)
    return obs


@router.get("/observations/{signal_id}")
async def get_observation(signal_id: str):
    """Get a single observation by Signal ID."""
    return {
        "signal_id":    signal_id,
        "status":       "pending_review",
        "message":      "Observation retrieved. Anomaly identified — human verification recommended.",
    }


async def _run_signal_fusion(signal_id: str, category: str):
    """Background task: run signal fusion pipeline for new observation."""
    import asyncio
    await asyncio.sleep(2)  # Simulate processing
    # In production: call ai_engine.signal_fusion.run(signal_id)
