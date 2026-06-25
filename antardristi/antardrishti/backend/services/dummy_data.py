"""
ANTARDRISHTI — Dummy Data Generator
Generates realistic dummy data for the application.
"""

import random
import uuid
from datetime import datetime, timedelta
from typing import List, Dict


class DummyDataGenerator:
    def __init__(self):
        self.categories = [
            "environmental", "light_activity", "sound_activity",
            "animal_behaviour", "smell_activity"
        ]

        self.subcategories = {
            "environmental": ["tire_tracks", "footprints", "broken_fence", "disturbed_soil", "temp_shelter"],
            "light_activity": ["strange_lights", "flashing_lights", "torch_signals", "campfires"],
            "sound_activity": ["drone_sound", "vehicle_sound", "unknown_sound", "explosion_like"],
            "animal_behaviour": ["dog_barking", "livestock_panic", "bird_disturbance", "wildlife_activity"],
            "smell_activity": ["diesel", "smoke", "chemical_odor"]
        }

        # Approximate Jammu and Kashmir border region coordinates
        self.lat_range = (32.0, 34.5)
        self.lng_range = (73.5, 75.5)

    def generate_observation(self) -> Dict:
        category = random.choice(self.categories)
        subcategory = random.choice(self.subcategories[category])

        date = (datetime.now() - timedelta(days=random.randint(0, 30))).strftime("%Y-%m-%d")
        time = f"{random.randint(0, 23):02d}:{random.randint(0, 59):02d}"

        return {
            "observation_id": f"OBS-{uuid.uuid4().hex[:6].upper()}",
            "category": category,
            "subcategory": subcategory,
            "description": f"Reported {subcategory.replace('_', ' ')} in the area.",
            "latitude": round(random.uniform(*self.lat_range), 5),
            "longitude": round(random.uniform(*self.lng_range), 5),
            "date": date,
            "time": time,
            "confidence": round(random.uniform(40, 95), 1),
            "status": random.choice(["pending", "reviewed", "verified"])
        }

    def generate_observations(self, count: int = 10) -> List[Dict]:
        return [self.generate_observation() for _ in range(count)]

    def get_kpis(self) -> Dict:
        return {
            "total_observations": random.randint(400, 600),
            "active_signals": random.randint(35, 55),
            "emerging_patterns": random.randint(5, 15),
            "high_risk_zones": random.randint(2, 5),
            "ai_confidence": round(random.uniform(70, 95), 1),
            "reports_under_review": random.randint(10, 30)
        }

    def get_recent_signals(self, count: int = 6) -> List[Dict]:
        signals = []
        for i in range(count):
            cat = random.choice(self.categories)
            subcat = random.choice(self.subcategories[cat])
            time_ago = random.randint(1, 59)
            signals.append({
                "id": f"SIG-{i+1:02d}",
                "type": subcat.replace("_", " ").title(),
                "time": f"{time_ago}m ago",
                "priority": random.choice(["low", "medium", "high"]),
                "location": "J&K Border"
            })
        return signals

    def get_analytics_data(self) -> Dict:
        # Daily observation trends (last 7 days)
        daily_trends = [random.randint(25, 60) for _ in range(7)]
        # Signal distribution
        categories = ["Environmental", "Light Activity", "Sound Activity", "Animal Behaviour", "Smell Activity"]
        distribution = [random.randint(15, 35) for _ in categories]
        # Regional activity
        regions = ["Jammu", "Srinagar", "Kupwara", "Poonch", "Rajouri"]
        regional_data = [random.randint(30, 70) for _ in regions]
        return {
            "daily_trends": daily_trends,
            "categories": categories,
            "distribution": distribution,
            "regions": regions,
            "regional_activity": regional_data
        }
