"""
ANTARDRISHTI — Weak Signal Fusion Engine
Combines multiple weak observations into coherent intelligence patterns.

Algorithm:
1. Collect signals within a spatial-temporal window
2. Build a weighted correlation graph
3. Apply graph-based pattern scoring
4. Output cautious pattern labels (NEVER autonomous threat declarations)
"""

import math
from datetime import datetime, timedelta
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional
import logging

logger = logging.getLogger("antardrishti.ai.fusion")


# ── Signal Weight Table ────────────────────────────────────────────────────────
# Higher weight = more significant when fused
SIGNAL_WEIGHTS = {
    "drone_sound":    0.90,
    "explosion_like": 0.85,
    "strange_lights": 0.80,
    "broken_fence":   0.80,
    "flashing_lights":0.75,
    "vehicle_sound":  0.70,
    "tire_tracks":    0.65,
    "torch_signals":  0.65,
    "footprints":     0.60,
    "disturbed_soil": 0.55,
    "dog_barking":    0.50,
    "livestock_panic":0.50,
    "campfire":       0.40,
    "temp_shelter":   0.40,
    "bird_disturbance":0.35,
    "wildlife_activity":0.30,
    "diesel_smell":   0.60,
    "chemical_odor":  0.70,
    "smoke_smell":    0.45,
    "unknown_sound":  0.45,
}

# Combinations that amplify each other
SYNERGY_MATRIX = {
    ("drone_sound",     "strange_lights"):  1.3,
    ("drone_sound",     "dog_barking"):     1.2,
    ("strange_lights",  "tire_tracks"):     1.25,
    ("vehicle_sound",   "tire_tracks"):     1.2,
    ("dog_barking",     "livestock_panic"): 1.15,
    ("broken_fence",    "footprints"):      1.3,
    ("flashing_lights", "torch_signals"):   1.4,
    ("diesel_smell",    "vehicle_sound"):   1.2,
    ("chemical_odor",   "drone_sound"):     1.35,
}


@dataclass
class WeakSignal:
    signal_id:   str
    category:    str
    latitude:    float
    longitude:   float
    timestamp:   datetime
    confidence:  float = 50.0


@dataclass
class FusedPattern:
    """
    Output of the fusion engine.
    SAFETY: labels are always advisory — never declaratory.
    """
    pattern_id:       str
    signal_ids:       List[str]
    signal_types:     List[str]
    center_lat:       float
    center_lng:       float
    fusion_score:     float        # 0–100
    confidence:       float        # 0–100
    risk_level:       str          # low / medium / high
    ai_label:         str          # anomaly_identified / unusual_activity / emerging_pattern
    ai_explanation:   str
    recommendation:   str = "Human Verification Recommended"
    created_at:       datetime = field(default_factory=datetime.utcnow)


class SignalFusionEngine:
    """
    Fuses spatially and temporally correlated weak signals
    into higher-level intelligence patterns.
    """

    def __init__(
        self,
        spatial_radius_km:  float = 15.0,
        temporal_window_hrs:float = 24.0,
        min_signals:        int   = 2
    ):
        self.spatial_radius_km   = spatial_radius_km
        self.temporal_window_hrs = temporal_window_hrs
        self.min_signals         = min_signals

    @staticmethod
    def haversine_km(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
        """Calculate great-circle distance in km."""
        R = 6371.0
        phi1, phi2 = math.radians(lat1), math.radians(lat2)
        dphi = math.radians(lat2 - lat1)
        dlam = math.radians(lng2 - lng1)
        a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlam/2)**2
        return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    def _find_cluster(self, signals: List[WeakSignal]) -> List[List[WeakSignal]]:
        """Group signals into spatial-temporal clusters."""
        visited = set()
        clusters = []

        for i, sig in enumerate(signals):
            if i in visited:
                continue
            cluster = [sig]
            visited.add(i)

            for j, other in enumerate(signals):
                if j in visited or j == i:
                    continue
                dist = self.haversine_km(sig.latitude, sig.longitude, other.latitude, other.longitude)
                time_diff = abs((sig.timestamp - other.timestamp).total_seconds()) / 3600

                if dist <= self.spatial_radius_km and time_diff <= self.temporal_window_hrs:
                    cluster.append(other)
                    visited.add(j)

            if len(cluster) >= self.min_signals:
                clusters.append(cluster)

        return clusters

    def _compute_fusion_score(self, cluster: List[WeakSignal]) -> Tuple[float, float]:
        """
        Compute weighted fusion score for a signal cluster.
        Returns (fusion_score, confidence) both 0–100.
        """
        categories = [s.category for s in cluster]
        base_score = sum(SIGNAL_WEIGHTS.get(c, 0.3) for c in categories)

        # Apply synergy multipliers
        synergy = 1.0
        cat_set = set(categories)
        for (c1, c2), mult in SYNERGY_MATRIX.items():
            if c1 in cat_set and c2 in cat_set:
                synergy = max(synergy, mult)

        raw = base_score * synergy / len(cluster)

        # Boost for larger clusters
        size_boost = min(1.5, 1.0 + len(cluster) * 0.1)
        fusion_score = min(100.0, raw * size_boost * 80)
        confidence   = min(100.0, fusion_score * 0.95 + sum(s.confidence for s in cluster) / len(cluster) * 0.05)

        return round(fusion_score, 1), round(confidence, 1)

    def _centroid(self, cluster: List[WeakSignal]) -> Tuple[float, float]:
        return (
            sum(s.latitude  for s in cluster) / len(cluster),
            sum(s.longitude for s in cluster) / len(cluster),
        )

    def _assign_label(self, fusion_score: float) -> Tuple[str, str]:
        """Map fusion score to safe AI label."""
        if fusion_score >= 70:
            return ("high",   "anomaly_identified")
        elif fusion_score >= 45:
            return ("medium", "unusual_activity_detected")
        else:
            return ("low",    "emerging_pattern_detected")

    def _build_explanation(self, cluster: List[WeakSignal], score: float) -> str:
        cats = list({s.category for s in cluster})
        time_span = max((s.timestamp for s in cluster)) - min((s.timestamp for s in cluster))
        hrs = time_span.total_seconds() / 3600

        return (
            f"Pattern formed from {len(cluster)} weak signals "
            f"({', '.join(cats[:3])}{', ...' if len(cats)>3 else ''}) "
            f"within a {self.spatial_radius_km}km radius over {hrs:.1f}h. "
            f"Fusion score: {score:.1f}/100. "
            f"Activity deviates from historical baseline. "
            f"Human verification required before any field action."
        )

    def fuse(self, signals: List[WeakSignal]) -> List[FusedPattern]:
        """Main fusion pipeline — returns list of detected patterns."""
        if len(signals) < self.min_signals:
            return []

        clusters = self._find_cluster(signals)
        patterns = []

        for i, cluster in enumerate(clusters):
            fusion_score, confidence = self._compute_fusion_score(cluster)
            lat, lng = self._centroid(cluster)
            risk, label = self._assign_label(fusion_score)
            explanation = self._build_explanation(cluster, fusion_score)

            import uuid
            patterns.append(FusedPattern(
                pattern_id   = f"ANM-{uuid.uuid4().hex[:4].upper()}",
                signal_ids   = [s.signal_id for s in cluster],
                signal_types = list({s.category for s in cluster}),
                center_lat   = round(lat, 5),
                center_lng   = round(lng, 5),
                fusion_score = fusion_score,
                confidence   = confidence,
                risk_level   = risk,
                ai_label     = label,
                ai_explanation = explanation,
            ))

        patterns.sort(key=lambda p: p.fusion_score, reverse=True)
        logger.info(f"Fusion complete: {len(signals)} signals → {len(patterns)} patterns")
        return patterns
