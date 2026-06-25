"""
ANTARDRISHTI — AI Anomaly Detection Engine
Uses Isolation Forest + DBSCAN clustering for spatial anomaly detection.
Integrates with YOLO for image-based observation verification.

SAFETY: All outputs are advisory. System NEVER autonomously declares threats.
Labels used: anomaly_identified | unusual_activity_detected | emerging_pattern_detected
"""

import numpy as np
from datetime import datetime
from dataclasses import dataclass, field
from typing import List, Optional, Dict
import logging

logger = logging.getLogger("antardrishti.ai.anomaly")

# Optional: import scikit-learn if available
try:
    from sklearn.ensemble import IsolationForest
    from sklearn.preprocessing import StandardScaler
    from sklearn.cluster import DBSCAN
    SKLEARN_AVAILABLE = True
except ImportError:
    SKLEARN_AVAILABLE = False
    logger.warning("scikit-learn not available — using rule-based fallback")


# ── Safe AI Labels (NEVER declare threats) ───────────────────────────────────
AI_LABELS = {
    "high":   "anomaly_identified",
    "medium": "unusual_activity_detected",
    "low":    "emerging_pattern_detected",
}

HUMAN_READABLE = {
    "anomaly_identified":          "Anomaly Identified",
    "unusual_activity_detected":   "Unusual Activity Detected",
    "emerging_pattern_detected":   "Emerging Pattern Detected",
}

RECOMMENDATION = "Human Verification Recommended"


@dataclass
class SignalVector:
    """Feature vector for a single observation signal."""
    signal_id:   str
    latitude:    float
    longitude:   float
    category:    str
    hour_of_day: int
    day_of_week: int
    confidence:  float = 0.0


@dataclass
class AnomalyResult:
    """Result of anomaly detection — always cautious, never declaratory."""
    signal_id:      str
    is_anomaly:     bool
    anomaly_score:  float           # 0.0–1.0
    label:          str             # From AI_LABELS only
    explanation:    str
    recommendation: str = RECOMMENDATION
    risk_level:     str = "low"
    processed_at:   datetime = field(default_factory=datetime.utcnow)


class AnomalyDetector:
    """
    Isolation Forest-based anomaly detector for weak signals.
    Falls back to rule-based scoring when sklearn unavailable.
    """

    # Categories that historically correlate with high-priority anomalies
    HIGH_PRIORITY_CATEGORIES = {
        "drone_sound", "explosion_like", "broken_fence",
        "strange_lights", "flashing_lights"
    }
    MED_PRIORITY_CATEGORIES = {
        "vehicle_sound", "tire_tracks", "torch_signals",
        "dog_barking", "livestock_panic", "disturbed_soil"
    }

    def __init__(self, contamination: float = 0.1):
        self.contamination = contamination
        self.model  = None
        self.scaler = None
        self._fitted = False

        if SKLEARN_AVAILABLE:
            self.model  = IsolationForest(contamination=contamination, random_state=42, n_estimators=100)
            self.scaler = StandardScaler()

    def _encode_category(self, category: str) -> float:
        """Map category to numeric risk weight."""
        if category in self.HIGH_PRIORITY_CATEGORIES:
            return 1.0
        if category in self.MED_PRIORITY_CATEGORIES:
            return 0.5
        return 0.2

    def _build_feature_vector(self, signal: SignalVector) -> List[float]:
        return [
            signal.latitude,
            signal.longitude,
            self._encode_category(signal.category),
            signal.hour_of_day / 24.0,
            signal.day_of_week / 7.0,
        ]

    def fit(self, signals: List[SignalVector]):
        """Train on historical baseline signals."""
        if not SKLEARN_AVAILABLE or len(signals) < 10:
            logger.info("Using rule-based fallback (insufficient data or no sklearn)")
            return

        X = np.array([self._build_feature_vector(s) for s in signals])
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled)
        self._fitted = True
        logger.info(f"AnomalyDetector fitted on {len(signals)} signals")

    def predict(self, signal: SignalVector) -> AnomalyResult:
        """
        Predict anomaly score for a single signal.
        Returns cautious label — NEVER autonomous threat declaration.
        """
        if SKLEARN_AVAILABLE and self._fitted:
            return self._sklearn_predict(signal)
        return self._rule_based_predict(signal)

    def _sklearn_predict(self, signal: SignalVector) -> AnomalyResult:
        fv = np.array([self._build_feature_vector(signal)]).reshape(1, -1)
        fv_scaled = self.scaler.transform(fv)
        score = self.model.decision_function(fv_scaled)[0]
        pred  = self.model.predict(fv_scaled)[0]   # -1 = anomaly

        # Normalize score to 0-1 (higher = more anomalous)
        anomaly_score = max(0.0, min(1.0, (-score + 0.5)))
        is_anomaly    = pred == -1

        return self._build_result(signal, is_anomaly, anomaly_score)

    def _rule_based_predict(self, signal: SignalVector) -> AnomalyResult:
        """Rule-based fallback for environments without scikit-learn."""
        import random
        base = self._encode_category(signal.category)

        # Night-time signals score higher
        night_bonus = 0.2 if signal.hour_of_day < 5 or signal.hour_of_day > 22 else 0.0

        score = min(1.0, base + night_bonus + random.uniform(-0.1, 0.1))
        is_anomaly = score > 0.5

        return self._build_result(signal, is_anomaly, score)

    def _build_result(self, signal: SignalVector, is_anomaly: bool, score: float) -> AnomalyResult:
        if score > 0.7:
            risk, label = "high",   AI_LABELS["high"]
            explanation = (
                f"Signal '{signal.category}' at {signal.latitude:.4f}, {signal.longitude:.4f} "
                f"shows significant deviation from historical baseline patterns. "
                f"Anomaly score: {score:.2f}. Corroboration with nearby signals advised."
            )
        elif score > 0.4:
            risk, label = "medium", AI_LABELS["medium"]
            explanation = (
                f"Activity pattern for '{signal.category}' deviates from expected norms. "
                f"Confidence: {score:.2f}. Additional signals needed for pattern confirmation."
            )
        else:
            risk, label = "low",    AI_LABELS["low"]
            explanation = (
                f"Weak signal recorded for '{signal.category}'. "
                f"Below anomaly threshold ({score:.2f}). Monitoring for corroboration."
            )

        return AnomalyResult(
            signal_id     = signal.signal_id,
            is_anomaly    = is_anomaly,
            anomaly_score = round(score * 100, 1),
            label         = label,
            explanation   = explanation,
            risk_level    = risk,
        )

    def spatial_cluster(self, signals: List[SignalVector], eps_km: float = 5.0) -> Dict:
        """
        DBSCAN spatial clustering to identify geographic signal clusters.
        Returns cluster labels — clusters warrant human attention.
        """
        if not SKLEARN_AVAILABLE or len(signals) < 3:
            return {"clusters": [], "noise": []}

        coords = np.array([[s.latitude, s.longitude] for s in signals])
        eps_rad = eps_km / 6371.0  # Convert km to radians
        db = DBSCAN(eps=eps_rad, min_samples=2, algorithm='ball_tree', metric='haversine')
        labels = db.fit_predict(np.radians(coords))

        clusters = {}
        for i, label in enumerate(labels):
            if label == -1: continue
            clusters.setdefault(label, []).append(signals[i].signal_id)

        return {
            "cluster_count": len(clusters),
            "clusters": [{"cluster_id": k, "signal_ids": v} for k, v in clusters.items()],
            "noise_count": int(np.sum(labels == -1))
        }
