# Tensr

Full-stack scaffolding for the Tensr style sandbox. React powers the client, while FastAPI delivers the API surface.

## Project structure

- `frontend/` – React app that implements the initial "Style Sandbox" hero section based on the Figma handoff.
- `backend/` – FastAPI service with a health check and stub endpoint for future style report generation.

## Getting started

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Both services run independently. Configure a proxy (e.g. CRA's `proxy` or CORS settings in FastAPI) once the frontend needs to call live endpoints.
