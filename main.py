"""
Aegis AI — FastAPI Backend
==========================
Provides the /api/predict endpoint for fake news detection.
"""

import os
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, field_validator
from ml_logic import predict
from auth import create_access_token, authenticate_user, create_user, verify_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ── App Initialization ───────────────────────────────────────────────
app = FastAPI(
    title="Aegis AI — Fake News Detection API",
    description="AI-powered truth verification ecosystem.",
    version="1.0.0",
)

# ── CORS Middleware (configured for production safety) ───────────────
# Get allowed origins from environment or use development defaults
allowed_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# ── Security Scheme ───────────────────────────────────────────────────
security = HTTPBearer()

# ── Request / Response Models ─────────────────────────────────────────
class PredictRequest(BaseModel):
    text: str

    @field_validator("text")
    @classmethod
    def text_must_not_be_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("Text field cannot be empty.")
        return v.strip()


class PredictResponse(BaseModel):
    status: str
    confidence: float

class UserCreate(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def email_must_be_valid(cls, v):
        if "@" not in v or "." not in v:
            raise ValueError("Invalid email format.")
        return v.strip().lower()

    @field_validator("password")
    @classmethod
    def password_must_be_strong(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters long.")
        return v

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    email: str
    message: str


# ── Routes ────────────────────────────────────────────────────────────
@app.get("/")
async def root():
    """Health-check endpoint."""
    return {"message": "Aegis AI API is running.", "version": "1.0.0"}


@app.post("/api/predict", response_model=PredictResponse)
async def predict_news(request: PredictRequest):
    """
    Analyze news content and predict whether it is REAL or FAKE.

    - **text**: The news article / social-media post to analyze.
    """
    try:
        result = predict(request.text)
        return PredictResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


# ── Authentication Routes ───────────────────────────────────────────────
@app.post("/api/auth/signup", response_model=UserResponse)
async def signup(user: UserCreate):
    """
    Register a new user account.
    
    - **email**: User email address
    - **password**: User password (min 6 characters)
    """
    try:
        result = create_user(user.email, user.password)
        return UserResponse(**result)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Signup failed: {str(e)}")


@app.post("/api/auth/login", response_model=Token)
async def login(user: UserLogin):
    """
    Authenticate user and return JWT token.
    
    - **email**: User email address
    - **password**: User password
    """
    try:
        authenticated_user = authenticate_user(user.email, user.password)
        if not authenticated_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")


@app.get("/api/auth/me")
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Get current user information from JWT token.
    """
    try:
        payload = verify_token(credentials.credentials)
        email = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return {"email": email, "message": "User authenticated"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Authentication failed: {str(e)}")


# ── Global Exception Handler ─────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return {
        "detail": f"An unexpected error occurred: {str(exc)}",
        "status_code": 500,
    }
