# ANTARDRISHTI — Docker Image
# Multi-stage build: FastAPI backend + Streamlit dashboard

FROM python:3.11-slim AS base

# System dependencies for PostGIS, OpenCV, etc.
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    g++ \
    libgdal-dev \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements first for layer caching
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/ .

# Expose ports
EXPOSE 8000 8501

# Default: run FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
