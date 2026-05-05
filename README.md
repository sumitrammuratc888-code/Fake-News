# 🛡️ Aegis AI — Truth Verification Ecosystem

AI-powered fake news detection platform with a futuristic cyberpunk dashboard.

## Tech Stack

| Layer    | Technology                                    |
|----------|-----------------------------------------------|
| Frontend | React 18 + Vite 5 + Tailwind CSS 3           |
| Backend  | FastAPI (Python)                              |
| ML       | Scikit-learn (TF-IDF + PassiveAggressiveClassifier) |
| Auth     | JWT Token Authentication                      |

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js** v18+ and npm
- **Python** 3.10+

### Environment Setup

1. **Backend Environment:**
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

2. **Frontend Environment:**
```bash
cd frontend
cp .env.example .env
# Edit .env with your backend URL
npm install
npm run dev
```

The API will be available at `http://localhost:8000`.  
Test it: `http://localhost:8000/docs` (interactive Swagger UI).

Frontend opens at `http://localhost:3000`.

---

## 📡 API Reference

### `POST /api/predict`

**Request:**
```json
{ "text": "Breaking: Scientists discover new planet" }
```

**Response:**
```json
{ "status": "REAL", "confidence": 95.2 }
```

---

## 🌐 Deployment

### Backend → Render

1. Push `backend/` to a Git repo
2. Create a **Web Service** on [Render](https://render.com)
3. Settings:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Deploy

### Frontend → Vercel

1. Push `frontend/` to a Git repo
2. Import on [Vercel](https://vercel.com)
3. Settings:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Update `API_URL` in `src/components/Hero.jsx` to your Render backend URL
5. Deploy

### `POST /api/auth/signup`

**Request:**
```json
{ "email": "user@example.com", "password": "password123" }
```

**Response:**
```json
{ "email": "user@example.com", "message": "User created successfully" }
```

### `POST /api/auth/login`

**Request:**
```json
{ "email": "user@example.com", "password": "password123" }
```

**Response:**
```json
{ "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...", "token_type": "bearer" }
```

---

## 🌐 Deployment

### Backend → Render

1. **Prepare Environment:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with production values
   ```

2. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial deployment"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

3. **Deploy on Render:**
   - Create a **Web Service** on [Render](https://render.com)
   - Connect your GitHub repository
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Add Environment Variables in Render dashboard:
     - `SECRET_KEY`: Generate a strong random string
     - `CORS_ORIGINS`: Your frontend URL (e.g., `https://your-app.vercel.app`)

### Frontend → Vercel

1. **Prepare Environment:**
   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env with your backend URL
   ```

2. **Deploy on Vercel:**
   - Import your GitHub repository on [Vercel](https://vercel.com)
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - Add Environment Variable in Vercel dashboard:
     - `VITE_API_URL`: Your Render backend URL

---

## 📁 Project Structure

```
├── backend/
│   ├── main.py              # FastAPI app + routes
│   ├── auth.py              # Authentication logic
│   ├── ml_logic.py          # ML prediction logic
│   ├── .env.example         # Environment template
│   ├── .gitignore           # Git ignore file
│   └── requirements.txt     # Python deps
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Root component
│   │   ├── main.jsx         # Entry point
│   │   ├── index.css        # Global styles
│   │   └── components/
│   │       ├── Navbar.jsx
│   │       ├── Hero.jsx
│   │       ├── Login.jsx
│   │       ├── Signup.jsx
│   │       ├── ResultDisplay.jsx
│   │       ├── RealTimeFeed.jsx
│   │       ├── PropagationMap.jsx
│   │       ├── AIDecisionReasoning.jsx
│   │       ├── StatsSection.jsx
│   │       ├── About.jsx
│   │       ├── Contact.jsx
│   │       └── Footer.jsx
│   ├── .env.example         # Environment template
│   ├── .gitignore           # Git ignore file
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── .gitignore               # Root git ignore
└── README.md
```

---

## 🔮 Future Enhancements

- Load trained `model.pkl` + `vectorizer.pkl` for real predictions
- Real database integration (PostgreSQL/MongoDB)
- WebSocket for real-time feed updates
- Image/video deepfake analysis
- OAuth authentication (Google, GitHub)
- Rate limiting and API security
