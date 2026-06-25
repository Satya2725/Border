-- ANTARDRISHTI PostgreSQL Initialization
-- Creates database and enables PostGIS extension

-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Create observations table
CREATE TABLE IF NOT EXISTS observations (
    id SERIAL PRIMARY KEY,
    observation_id VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100) NOT NULL,
    description TEXT,
    latitude NUMERIC(10, 6) NOT NULL,
    longitude NUMERIC(10, 6) NOT NULL,
    location GEOMETRY(Point, 4326),
    date VARCHAR(20) NOT NULL,
    time VARCHAR(20) NOT NULL,
    confidence NUMERIC(5, 2) DEFAULT 50.0,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create patterns table
CREATE TABLE IF NOT EXISTS patterns (
    id SERIAL PRIMARY KEY,
    pattern_id VARCHAR(50) UNIQUE NOT NULL,
    signal_ids JSONB NOT NULL,
    signal_types JSONB NOT NULL,
    center_lat NUMERIC(10, 6) NOT NULL,
    center_lng NUMERIC(10, 6) NOT NULL,
    fusion_score NUMERIC(5, 2) NOT NULL,
    confidence NUMERIC(5, 2) NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    ai_label VARCHAR(100) NOT NULL,
    ai_explanation TEXT NOT NULL,
    recommendation TEXT DEFAULT 'Human Verification Recommended',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_observations_location ON observations USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_observations_category ON observations(category);
CREATE INDEX IF NOT EXISTS idx_observations_status ON observations(status);
CREATE INDEX IF NOT EXISTS idx_patterns_status ON patterns(status);
CREATE INDEX IF NOT EXISTS idx_patterns_risk ON patterns(risk_level);

-- Insert sample data
INSERT INTO observations (observation_id, category, subcategory, description, latitude, longitude, date, time, confidence, status)
VALUES 
('OBS-SAMPLE-001', 'sound_activity', 'drone_sound', 'Heard unusual drone sound near border', 32.7266, 74.8570, '2025-06-25', '00:30', 75.5, 'pending'),
('OBS-SAMPLE-002', 'animal_behaviour', 'dog_barking', 'Continuous dog barking throughout the night', 32.5, 75.0, '2025-06-24', '22:15', 60.0, 'reviewed');
