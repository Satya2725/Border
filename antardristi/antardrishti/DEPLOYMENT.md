# ANTARDRISHTI — Deployment Guide

## Quick Start (Local Development)

### 1. Frontend
Simply open `frontend/index.html` in a browser, or serve with:
```bash
cd frontend
python -m http.server 3000
# Visit: http://localhost:3000
```

### 2. Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# API Docs: http://localhost:8000/api/docs
```

### 3. Streamlit Dashboard
```bash
cd backend
streamlit run streamlit_app.py
# Dashboard: http://localhost:8501
```

### 4. PostgreSQL (with PostGIS)
```bash
# Using Docker:
docker run -d \
  --name antardrishti_db \
  -e POSTGRES_DB=antardrishti_db \
  -e POSTGRES_USER=antardrishti \
  -e POSTGRES_PASSWORD=SecurePass2025 \
  -p 5432:5432 \
  postgis/postgis:16-3.4
```

---

## Docker Compose (Full Stack)
```bash
cd docker
docker-compose up --build
```

Services:
| Service     | URL                        |
|-------------|----------------------------|
| Frontend    | http://localhost            |
| FastAPI     | http://localhost/api/       |
| API Docs    | http://localhost/api/docs   |
| Streamlit   | http://localhost/dashboard/ |
| PostgreSQL  | localhost:5432              |

---

## Render Deployment

1. Push to GitHub
2. Create Render Web Service → connect repo
3. Build command: `pip install -r backend/requirements.txt`
4. Start command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
5. Add PostgreSQL database service on Render
6. Set environment variables:
   - `DATABASE_URL`: from Render PostgreSQL
   - `ENVIRONMENT`: production

---

## Environment Variables
```env
DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/antardrishti_db
ENVIRONMENT=production
SECRET_KEY=your-secret-key-here
DB_PASSWORD=SecurePass2025
API_URL=http://api:8000
```

---

## Safety Reminder
⚠️ This system NEVER declares threats autonomously.
All AI outputs are advisory: anomaly_identified | unusual_activity_detected | emerging_pattern_detected
Human verification is required before any field action.
