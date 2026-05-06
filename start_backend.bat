@echo off
echo ========================================
echo   AEGIS AI - Backend Setup
echo ========================================
echo.
cd /d "c:\Users\Sumit\OneDrive\Desktop\Fake News\backend"
echo Installing Python packages...
pip install fastapi uvicorn scikit-learn pydantic
echo.
echo Starting FastAPI server on port 8000...
uvicorn main:app --reload --port 8000
pause
