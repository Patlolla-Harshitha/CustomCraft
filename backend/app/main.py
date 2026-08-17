from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db, SessionLocal
from app.routes.products import router as products_router
from app.services.seed import seed_products


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables and seed sample products on startup
    try:
        init_db()
        db = SessionLocal()
        try:
            seed_products(db)
        finally:
            db.close()
    except Exception as e:
        print(f"Startup initialization note: {e}")
    yield


app = FastAPI(
    title="CustomCraft API",
    description="Backend REST API for CustomCraft Personalized E-Commerce Platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware setup to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers (support both /products and /api/products for proxying flexibility)
app.include_router(products_router)
app.include_router(products_router, prefix="/api")


@app.get("/")
@app.get("/api")
def read_root():
    return {"message": "Welcome to CustomCraft API"}


@app.get("/health")
@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
