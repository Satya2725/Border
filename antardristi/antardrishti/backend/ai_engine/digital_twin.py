"""
ANTARDRISHTI — Digital Twin Engine
Creates a virtual mirror of border activity by comparing current signals to historical baselines.
"""

import random
from datetime import datetime, timedelta
from dataclasses import dataclass
from typing import List, Dict
import logging

logger = logging.getLogger("antardrishti.ai.digital_twin")


@dataclass
class DigitalTwinSnapshot:
    normal_activity_score: float    # 0-100, higher = more normal
    current_activity_score: float   # 0-100, higher = more activity
    deviation_index: float          # 0-100, higher = more deviation from baseline
    anomaly_percentage: float       # % of signals that are anomalous
    risk_zones: List[Dict]          # List of high-risk zones
    timestamp: datetime


class DigitalTwinEngine:
    """
    Simulates a digital twin of the border area.
    """

    def __init__(self):
        # Baseline metrics (historical averages)
        self.baseline = {
            "vehicle_activity": 65,
            "light_activity": 59,
            "animal_behaviour": 72,
            "citizen_reports": 81,
            "historical_obs": 88,
            "sound_events": 55
        }
        logger.info("✅ DigitalTwinEngine initialized")

    def get_snapshot(self) -> DigitalTwinSnapshot:
        """Generate a snapshot of the digital twin state."""
        # Simulate current metrics with some variance
        current = {
            "vehicle_activity": max(0, min(100, self.baseline["vehicle_activity"] + random.uniform(-15, 25))),
            "light_activity": max(0, min(100, self.baseline["light_activity"] + random.uniform(-10, 30))),
            "animal_behaviour": max(0, min(100, self.baseline["animal_behaviour"] + random.uniform(-20, 10))),
            "citizen_reports": max(0, min(100, self.baseline["citizen_reports"] + random.uniform(-10, 15))),
            "historical_obs": max(0, min(100, self.baseline["historical_obs"] + random.uniform(-5, 5))),
            "sound_events": max(0, min(100, self.baseline["sound_events"] + random.uniform(-15, 30)))
        }

        normal_score = sum(self.baseline.values()) / len(self.baseline)
        current_score = sum(current.values()) / len(current)
        deviation = abs(normal_score - current_score) * 2
        anomaly_pct = random.uniform(3, 12)

        risk_zones = [
            {"lat": 32.7266, "lng": 74.8570, "risk": "high", "radius": 5},
            {"lat": 32.45, "lng": 75.10, "risk": "medium", "radius": 3}
        ] if random.random() > 0.5 else []

        return DigitalTwinSnapshot(
            normal_activity_score=round(normal_score, 1),
            current_activity_score=round(current_score, 1),
            deviation_index=round(deviation, 1),
            anomaly_percentage=round(anomaly_pct, 1),
            risk_zones=risk_zones,
            timestamp=datetime.utcnow()
        )

    def get_activity_radar(self) -> Dict:
        """Get radar chart data for digital twin visualization."""
        current = {
            "vehicle_activity": max(0, min(100, self.baseline["vehicle_activity"] + random.uniform(-15, 25))),
            "light_activity": max(0, min(100, self.baseline["light_activity"] + random.uniform(-10, 30))),
            "animal_behaviour": max(0, min(100, self.baseline["animal_behaviour"] + random.uniform(-20, 10))),
            "citizen_reports": max(0, min(100, self.baseline["citizen_reports"] + random.uniform(-10, 15))),
            "historical_obs": max(0, min(100, self.baseline["historical_obs"] + random.uniform(-5, 5))),
            "sound_events": max(0, min(100, self.baseline["sound_events"] + random.uniform(-15, 30)))
        }
        return {"baseline": self.baseline, "current": current}
