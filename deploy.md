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

When creating the web service on Render.com, use these **EXACT** settings:

**Basic Settings:**

- Name: `medical-clinic-backend`
- Environment: `Node`
- Region: `Oregon (US West)` or closest to you
- Branch: `main`
- Root Directory: (leave empty)
- Build Command: `npm ci && npm run build`
- Start Command: `npm start`

**Advanced Settings:**

- Auto-Deploy: `Yes`
- Node Version: `20` (add this in environment variables)

**Environment Variables:**

```
NODE_ENV=production
NODE_VERSION=20
PORT=10000
DB_HOST=aws-0-eu-north-1.pooler.supabase.com
DB_PORT=5432
DB_USERNAME=postgres.twkhesmygojysvidmsfb
DB_PASSWORD=gLvNAcy9nnpAgk3U
DB_NAME=postgres
DB_SSL=true
FRONTEND_URL=*
```

### 3. ✅ Path Issues FIXED!

The `Cannot find module '/opt/render/project/src/dist/app.js'` error has been **automatically fixed** with:

**✅ Smart Start Script (`start.js`)**

- Automatically detects correct file paths
- Shows debug information during startup
- Handles different directory structures on Render

**✅ Node.js Configuration**

- Engine specification in `package.json`
- `.nvmrc` file for version consistency
- Optimized build command: `npm ci && npm run build`

**What you'll see in Render logs:**

```
Current working directory: /opt/render/project
Looking for app.js in these locations:
1. /opt/render/project/dist/app.js - EXISTS
Starting app from: /opt/render/project/dist/app.js
Database connection established
🚀 Server is running on http://localhost:10000
```

### 4. After Deployment

Your API will be available at:
`https://medical-clinic-backend.onrender.com`

Test endpoints:

- Health: `https://medical-clinic-backend.onrender.com/health`
- Doctors: `https://medical-clinic-backend.onrender.com/api/doctors`
- Appointments: `https://medical-clinic-backend.onrender.com/api/appointments`

### 5. Update Frontend

Change your React app's API URL to the deployed backend URL.

### 6. Troubleshooting Deployment Issues

**If build fails with "Cannot find module":**

1. Check that `npm run build` works locally
2. Verify `dist/app.js` exists after local build
3. Check Node.js version compatibility
4. Add explicit node version in environment variables

**If database connection fails:**

1. Verify all environment variables are set correctly
2. Check Supabase database URL and credentials
3. Ensure `DB_SSL=true` is set

**If app crashes on startup:**

1. Check logs in Render dashboard
2. Verify all dependencies are in `dependencies` not `devDependencies`
3. Ensure TypeORM entities are compiled correctly
