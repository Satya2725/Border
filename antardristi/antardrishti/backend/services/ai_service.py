"""
ANTARDRISHTI — AI Service Orchestrator
Coordinates all AI engines: anomaly detection, signal fusion, movement prediction.
"""

from ..ai_engine.anomaly_detection import AnomalyDetector, SignalVector
from ..ai_engine.signal_fusion import SignalFusionEngine, WeakSignal
from ..ai_engine.movement_prediction import MovementPredictor
from ..ai_engine.digital_twin import DigitalTwinEngine
from .dummy_data import DummyDataGenerator
from datetime import datetime
import logging

logger = logging.getLogger("antardrishti.ai_service")


class AIService:
    """High-level AI service combining all analysis engines."""

    def __init__(self):
        self.anomaly_detector = AnomalyDetector(contamination=0.1)
        self.fusion_engine    = SignalFusionEngine(spatial_radius_km=15, temporal_window_hrs=24)
        self.movement_pred    = MovementPredictor()
        self.digital_twin     = DigitalTwinEngine()
        self.dummy_data       = DummyDataGenerator()
        logger.info("✅ AIService initialized")

    def analyze_observation(self, signal_id: str, category: str, lat: float, lng: float) -> dict:
        """Run full AI analysis pipeline on a new observation."""
        signal = SignalVector(
            signal_id   = signal_id,
            latitude    = lat,
            longitude   = lng,
            category    = category,
            hour_of_day = datetime.utcnow().hour,
            day_of_week = datetime.utcnow().weekday(),
        )
        result = self.anomaly_detector.predict(signal)
        return {
            "signal_id":     result.signal_id,
            "is_anomaly":    result.is_anomaly,
            "score":         result.anomaly_score,
            "label":         result.label,
            "explanation":   result.explanation,
            "recommendation":result.recommendation,
            "risk_level":    result.risk_level,
        }

    def get_digital_twin_snapshot(self) -> dict:
        snapshot = self.digital_twin.get_snapshot()
        return {
            "normal_activity_score":  snapshot.normal_activity_score,
            "current_activity_score": snapshot.current_activity_score,
            "deviation_index":        snapshot.deviation_index,
            "anomaly_percentage":     snapshot.anomaly_percentage,
            "risk_zones":             snapshot.risk_zones,
            "timestamp":              snapshot.timestamp.isoformat(),
        }
