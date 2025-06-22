# 🚀 Quick Deployment Guide

## Deploy to Render.com

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Medical clinic backend ready for deployment"
git branch -M main
git remote add origin https://github.com/yourusername/medical-clinic-backend.git
git push -u origin main
```

### 2. Render.com Settings

When creating the web service on Render.com, use these settings:

**Basic Settings:**

- Name: `medical-clinic-backend`
- Environment: `Node`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

**Environment Variables:**

```
NODE_ENV=production
PORT=10000
DB_HOST=aws-0-eu-north-1.pooler.supabase.com
DB_PORT=5432
DB_USERNAME=postgres.twkhesmygojysvidmsfb
DB_PASSWORD=gLvNAcy9nnpAgk3U
DB_NAME=postgres
DB_SSL=true
FRONTEND_URL=*
```

### 3. After Deployment

Your API will be available at:
`https://medical-clinic-backend.onrender.com`

Test endpoints:

- Health: `https://medical-clinic-backend.onrender.com/health`
- Doctors: `https://medical-clinic-backend.onrender.com/api/doctors`
- Appointments: `https://medical-clinic-backend.onrender.com/api/appointments`

### 4. Update Frontend

Change your React app's API URL to the deployed backend URL.
