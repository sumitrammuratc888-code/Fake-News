@echo off
echo ========================================
echo   AEGIS AI - Frontend Setup
echo ========================================
echo.
cd /d "c:\Users\Sumit\OneDrive\Desktop\Fake News\frontend"
echo Installing packages...
call npm install
echo.
echo Starting Vite dev server...
call npm run dev
pause
