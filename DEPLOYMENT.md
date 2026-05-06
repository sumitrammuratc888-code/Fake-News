# 🚀 Deployment Guide for Aegis AI

This guide will help you deploy the Aegis AI application to production using Render (backend) and Vercel (frontend).

## 📋 Prerequisites

- GitHub account with repository
- Render account (for backend deployment)
- Vercel account (for frontend deployment)
- Node.js 18+ and Python 3.10+ (for local testing)

## 🔧 Environment Configuration

### Backend Environment Variables

Create `.env` file in `backend/` directory:

```env
# Generate a strong secret key for production
SECRET_KEY=your-super-secret-jwt-key-minimum-32-characters-long

# Database URL (optional, for future database integration)
DATABASE_URL=sqlite:///./aegis_ai.db

# CORS origins (comma-separated)
CORS_ORIGINS=https://your-frontend-domain.vercel.app

# Environment
ENVIRONMENT=production
```

**Important:** Generate a strong `SECRET_KEY` using:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Frontend Environment Variables

Create `.env` file in `frontend/` directory:

```env
# Backend API URL (replace with your Render URL)
VITE_API_URL=https://your-backend-name.onrender.com

# Environment
VITE_ENVIRONMENT=production
```

## 🌐 Deployment Steps

### 1. Backend Deployment (Render)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Render Web Service:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure service:
     - **Name:** `aegis-ai-backend` (or your preferred name)
     - **Runtime:** Python 3
     - **Build Command:** `pip install -r requirements.txt`
     - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
     - **Instance Type:** Free (to start)

3. **Add Environment Variables:**
   In Render dashboard → your service → Environment:
   - `SECRET_KEY`: (your generated secret key)
   - `CORS_ORIGINS`: `https://your-frontend-domain.vercel.app`
   - `ENVIRONMENT`: `production`

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://your-service-name.onrender.com`

### 2. Frontend Deployment (Vercel)

1. **Update Frontend Environment:**
   ```bash
   cd frontend
   # Edit .env with your Render backend URL
   VITE_API_URL=https://your-backend-name.onrender.com
   ```

2. **Deploy to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

3. **Add Environment Variables:**
   In Vercel dashboard → your project → Settings → Environment Variables:
   - `VITE_API_URL`: `https://your-backend-name.onrender.com`
   - `VITE_ENVIRONMENT`: `production`

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your frontend URL: `https://your-project-name.vercel.app`

### 3. Final Configuration

1. **Update CORS Origins:**
   Go back to Render dashboard → your service → Environment:
   - Update `CORS_ORIGINS` to your actual Vercel URL

2. **Redeploy Backend:**
   - Trigger a new deployment on Render to apply CORS changes

## ✅ Verification

1. **Test Backend API:**
   ```bash
   curl https://your-backend.onrender.com/
   # Should return: {"message": "Aegis AI API is running.", "version": "1.0.0"}
   ```

2. **Test Frontend:**
   - Visit your Vercel URL
   - Try signup/login functionality
   - Test fake news detection

3. **Test API Endpoints:**
   - `GET /` - Health check
   - `POST /api/predict` - News analysis
   - `POST /api/auth/signup` - User registration
   - `POST /api/auth/login` - User authentication

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure `CORS_ORIGINS` in backend matches your frontend URL exactly
   - Include both HTTP and HTTPS if needed during development

2. **Environment Variables Not Loading:**
   - Verify `.env` files exist in correct directories
   - Check variable names match exactly (case-sensitive)
   - Ensure Vercel/Render environment variables are set

3. **Build Failures:**
   - Check `requirements.txt` and `package.json` for correct versions
   - Verify all dependencies are properly installed
   - Check build logs for specific error messages

4. **Authentication Issues:**
   - Verify `SECRET_KEY` is set and consistent
   - Check JWT token expiration settings
   - Ensure frontend is sending correct headers

### Debugging Tips

1. **Check Logs:**
   - Render: Dashboard → your service → Logs
   - Vercel: Dashboard → your project → Functions → Logs

2. **Local Testing:**
   ```bash
   # Backend
   cd backend
   uvicorn main:app --reload
   
   # Frontend
   cd frontend
   npm run dev
   ```

3. **API Testing:**
   Use Render's `/docs` endpoint for interactive API testing

## 📈 Scaling Considerations

- **Database:** Consider PostgreSQL for production
- **Caching:** Add Redis for session management
- **Monitoring:** Implement logging and monitoring
- **Rate Limiting:** Add API rate limiting
- **CDN:** Use CDN for static assets

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use strong, unique `SECRET_KEY` in production
- Enable HTTPS (automatic on Vercel/Render)
- Consider adding rate limiting and input validation
- Regularly update dependencies for security patches

## 🎉 Success!

Your Aegis AI application is now live! Users can:
- Register and login securely
- Analyze news content for authenticity
- Experience the cyberpunk-themed interface
- Access real-time AI-powered truth verification

For support, check the logs on Render and Vercel dashboards, or refer to the main README.md file.
