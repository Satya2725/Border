"""
ANTARDRISHTI — Analytics API Router
Endpoints for dashboard analytics.
"""

from fastapi import APIRouter
from ..services.ai_service import AIService

router = APIRouter(prefix="/api", tags=["analytics"])
ai_service = AIService()


@router.get("/analytics/kpis")
async def get_kpis():
    """Get dashboard KPI metrics."""
    return ai_service.dummy_data.get_kpis()


@router.get("/analytics/data")
async def get_analytics_data():
    """Get chart data for analytics dashboard."""
    return ai_service.dummy_data.get_analytics_data()
