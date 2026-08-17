# CustomCraft — Personalized E-Commerce Platform

**CustomCraft** is a college DevOps assignment project demonstrating a modern full-stack web application with automated Jenkins CI/CD pipeline integration and Docker containerized deployment.

CustomCraft enables users to browse items (t-shirts, mugs, phone cases, etc.), personalize products with custom text, graphics, and color selections, manage cart items, place orders, and track order fulfillment. Admin users can manage product catalogs, inventory, and order statuses.

---

## 🚀 Technology Stack

### Frontend
- **Framework:** React.js (v18)
- **Build Tool:** Vite
- **Language:** JavaScript (ES6+)
- **Styling:** Custom Vanilla CSS Design System (Responsive, Dark Glassmorphism aesthetic, Outfit & Plus Jakarta Sans typography)

### Backend
- **Framework:** FastAPI (Python 3.11)
- **API Architecture:** REST APIs
- **ORM:** SQLAlchemy (v2.0)
- **Server:** Uvicorn

### Database
- **DBMS:** PostgreSQL 15

### DevOps & Automation
- **Version Control:** Git & GitHub
- **Containerization:** Docker & Docker Compose
- **CI/CD Pipeline:** Jenkins (Declarative Pipeline)

### Testing
- **Backend:** Pytest & HTTPX TestClient

---

## 📁 Directory Structure

```text
CustomCraft/
│
├── frontend/                 # React + Vite Frontend Application
│   ├── public/               # Static public assets
│   ├── src/
│   │   ├── components/       # UI components (Navbar, Footer, etc.)
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx           # Main application view & router placeholders
│   │   ├── index.css         # Design system & responsive layout CSS
│   │   └── main.jsx          # React DOM entrypoint
│   ├── index.html            # HTML document template
│   ├── package.json          # Node dependencies and npm scripts
│   ├── vite.config.js        # Vite build tool and API proxy config
│   └── Dockerfile            # Multi-stage Dockerfile (Node build + NGINX)
│
├── backend/                  # FastAPI Python Backend Application
│   ├── app/
│   │   ├── models/           # SQLAlchemy database models (Phase 2)
│   │   ├── schemas/          # Pydantic schemas (Phase 2)
│   │   ├── routes/           # API route handlers (Phase 2)
│   │   ├── services/         # Business logic layer (Phase 2)
│   │   ├── database.py       # SQLAlchemy engine & session setup
│   │   └── main.py           # FastAPI initialization & endpoints
│   ├── tests/                # Pytest unit and integration tests
│   │   └── test_health.py    # Health check endpoint test
│   ├── .env.example          # Environment variables template
│   ├── requirements.txt      # Python package dependencies
│   └── Dockerfile            # Python 3.11 slim runtime Dockerfile
│
├── .env.example              # Docker Compose environment template
├── .gitignore                # Git untracked pattern exclusions
├── docker-compose.yml        # Multi-container orchestration config
├── Jenkinsfile               # Jenkins CI/CD declarative pipeline script
└── README.md                 # Project documentation
```

---

## 💻 How to Run Locally

### Prerequisites
- Python 3.11+
- Node.js 18+ & npm
- PostgreSQL (or Docker)

---

### 1. Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   - **Windows:**
     ```cmd
     python -m venv venv
     venv\Scripts\activate
     ```
   - **Linux/macOS:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy environment template:
   ```bash
   cp .env.example .env
   ```
5. Start the Uvicorn development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   - Root API Endpoint: `http://localhost:8000/`
   - Health Check Endpoint: `http://localhost:8000/health`
   - Interactive Swagger Docs: `http://localhost:8000/docs`

---

### 2. Running the Backend Tests

Run Pytest from the `backend/` directory:

```bash
cd backend
pytest
```

---

### 3. Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:3000`.

---

## 🐳 How to Run with Docker Compose

To build and start all containers (`db`, `backend`, `frontend`) with a single command:

```bash
docker compose up --build
```

- **Frontend Application:** `http://localhost:3000`
- **Backend API:** `http://localhost:8000`
- **PostgreSQL Database:** `localhost:5432`

To stop and remove containers:
```bash
docker compose down
```

---

## ⚙️ Jenkins CI/CD Pipeline

The included `Jenkinsfile` configures an automated declarative pipeline with 3 foundational stages:

1. **Checkout:** Clones and checks out the source code repository branch.
2. **Backend Test:** Provisions a virtual environment, installs backend dependencies, and executes `pytest`.
3. **Frontend Build:** Installs Node dependencies (`npm install`) and compiles the static production bundle (`npm run build`).

### Future CI/CD Expansion:
- **Docker Build & Push:** Build container images and push to Docker Hub / Container Registry.
- **Integration Testing:** Run automated full-stack integration tests against containerized services.
- **Automated Deployment:** Deploy updated application containers to staging/production server environment.
