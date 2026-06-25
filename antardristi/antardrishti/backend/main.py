"""
ANTARDRISHTI — FastAPI Backend
AI-Powered Weak Signal Intelligence Network
Version: 2.0.0

SAFETY RULE: System NEVER declares enemy/terrorist/infiltration.
All AI outputs use: anomaly_detected, unusual_activity, emerging_pattern,
human_verification_recommended
"""

from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
from datetime import datetime
from typing import Optional, List
import logging

# Local imports
from api import observations, signals, anomalies, analytics, alerts
from database.connection import engine, Base
from services.ai_service import AIService

# ── Logging ──────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s"
)
logger = logging.getLogger("antardrishti")

# ── App Setup ─────────────────────────────────────────────────────────────────
app = FastAPI(
    title="ANTARDRISHTI API",
    description=(
        "AI-Powered Weak Signal Intelligence Network API.\n\n"
        "⚠️ SAFETY: This system never declares threats autonomously. "
        "All outputs require human verification."
    ),
    version="2.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Lock down in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(observations.router)
app.include_router(signals.router)
app.include_router(anomalies.router)
app.include_router(analytics.router)
app.include_router(alerts.router)

# ── Health & Root ──────────────────────────────────────────────────────────────
@app.get("/", tags=["System"])
async def root():
    return {
        "system":  "ANTARDRISHTI",
        "tagline": "Turning Millions of Small Observations into Actionable National Intelligence",
        "version": "2.0.0",
        "status":  "operational",
        "safety":  "AI assists — humans decide. No autonomous threat declarations.",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/health", tags=["System"])
async def health_check():
    return {
        "status":    "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "components": {
            "api":        "operational",
            "database":   "operational",
            "ai_engine":  "operational",
            "signal_fusion": "operational"
        }
    }

@app.get("/api/dashboard/summary", tags=["Dashboard"])
async def dashboard_summary():
    """Aggregated KPI summary for the intelligence dashboard."""
    ai_service = AIService()
    kpis = ai_service.dummy_data.get_kpis()
    return {
        "total_observations":   kpis["total_observations"],
        "active_weak_signals":  kpis["active_signals"],
        "emerging_patterns":    kpis["emerging_patterns"],
        "high_risk_zones":      kpis["high_risk_zones"],
        "ai_confidence_index":  kpis["ai_confidence"],
        "reports_under_review": kpis["reports_under_review"],
        "last_updated":         datetime.utcnow().isoformat()
    }

# ── Startup / Shutdown ─────────────────────────────────────────────────────────
@app.on_event("startup")
async def startup():
    logger.info("🛰 ANTARDRISHTI API starting up...")
    # In production: await engine.connect() and run migrations

@app.on_event("shutdown")
async def shutdown():
    logger.info("🛑 ANTARDRISHTI API shutting down...")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
