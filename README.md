# Tattio — AI-Powered Tattoo Design Studio

Create custom tattoo mockups in seconds. **Tattio** is a full-stack web app that turns a few style selections into high-quality tattoo design drafts suitable for review and iteration with a real artist.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started (Local)](#getting-started-local)
- [Environment Variables](#environment-variables)
- [API (Backend)](#api-backend)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [Acknowledgments](#acknowledgments)

---

## Demo

- **Backend health check**: `/health` returns `200 OK` when the API is up.
- **Generation endpoint**: `/generate` accepts JSON and returns one or more generated tattoo images plus metadata.
- ([**Hosted site**](https://www.tattio.io/))


---

## Features

- **Guided generation**: Users select one or multiple style profiles (e.g., neo-traditional, fine-line, Japanese), enters custom prompt, chooses size/orientation and other advanced options.  
- **Body-aware aspect ratios**: A small helper maps body placement (e.g., forearm vs. shoulder) to an appropriate aspect ratio for more realistic mockups.
- **Fast iterations**: The default model targets short inference times for rapid design exploration.
- **Download-ready outputs**: Images are saved to a `generated_tattoos/` folder for quick retrieval and sharing.

---

## Architecture

**Front-end**
- React single-page app (SPA) housed in `tattio-app/` with a multi-step “wizard” for inputs.
- Animation and micro-interactions implemented with Framer Motion.
- Deployed behind Vercel (see `vercel.json`).

**Back-end**
- Python **Flask** API with two primary routes:
  - `GET /health` – liveness probe.
  - `POST /generate` – orchestrates prompt creation and image generation.
- Calls **Replicate** to run diffusion models (default: **black-forest-labs/flux-schnell**), with seed/steps/quality exposed as tunables.
- Production server: **Gunicorn** (see `gunicorn.conf.py`), containerized via the root `Dockerfile`.
- Deployed on **Render** (see `render.yaml`).

---

## Getting Started (Local)

### Prerequisites
- **Node.js** (LTS recommended)
- **Python 3.10+**
- A **Replicate API token** 

### 1) Clone and configure
```bash
git clone https://github.com/JTHCode/Tattio-App.git
cd Tattio-App
cp .env.example .env   # then open .env and fill in values (see below)
```

### 2) Install dependencies
**Backend (Python)**
```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
```

**Frontend (React)**
```bash
cd tattio-app
npm install
```

### 3) Run the app in development

**Windows (one-shot)**
```bash
# From the repo root:
start-dev.bat
```

**Or run them separately**

_Backend_
```bash
# In one terminal at repo root (ensure venv is active)
# Example: FLASK_APP points at the API entrypoint
set FLASK_APP=src/scripts/main.py   # Windows
# export FLASK_APP=src/scripts/main.py  # macOS/Linux
python -m flask run --debug --port 5000
```

_Frontend_
```bash
# In another terminal
cd tattio-app
npm start
# UI runs on http://localhost:3000 and talks to API on http://localhost:5000
```

---

## Environment Variables

Create a `.env` from `.env.example` and set:

- `REPLICATE_API_TOKEN` — your Replicate token.
- `MODEL` — (optional) override the default model; defaults to FLUX-Schnell.
- `FLASK_RUN_PORT` — (optional) local API port (defaults to 5000).
- **CORS** settings — allowed origin(s) for the UI.

> See `.env.example` for the authoritative list and comments.

---

## API (Backend)

### `GET /health`
Returns `{ "status": "ok" }` when the API is ready.

### `POST /generate`
**Body:** JSON payload describing the subject + style parameters and optional generation settings (e.g., `num_inference_steps`, `output_format`, `seed`).  
**Response:** JSON containing one or more image URLs/paths and generation metadata.

> The request schema is intentionally simple and is evolving; see the backend code for the exact accepted fields.

---

## Deployment

### Backend (Render)
- The API is containerized (see `Dockerfile`) and served via Gunicorn (`gunicorn.conf.py`).
- The Render blueprint (`render.yaml`) declares the service and environment.

### Frontend (Vercel)
- The React app is deployed via Vercel (see `vercel.json`).
- CORS must allow the Vercel/UI domain in the API configuration.

---

## Roadmap

- **Reference-image conditioning**: Let users upload a sketch/photo to steer the generation.
- **Polish UI/ fix UI bugs**: Put a finishing touch on the UI and fix some bugs that have been noticed
- **Preset style packs**: Curated, consistent JSON style guides to keep outputs on-brand. (Alpha currently available)
- **Usage & share links**: One-click share and lightweight “session gallery.”

---

## FAQ

**Is Tattio meant to replace a tattoo artist?**  
No. It’s a **concepting tool**—a quick way to explore directions before collaborating with a professional.

**Why Replicate instead of self-hosting models?**  
It keeps the repo lean and deploys simple while still letting us swap models and scale on demand.

**Why is it so slow sometimes?**  
This is a passion project that has a small budget so I am currently using the free tier of Vercel and Render

---

## Acknowledgments

- **Replicate** for hosted inference.
- **black-forest-labs/FLUX** models for fast, high-quality generations.

