# 🚀 Deployment Guide - CardioPredict

## ✅ What's Been Configured

### Backend (Railway)
- **URL**: `https://cardiopredict-production.up.railway.app`
- **API Endpoint**: `https://cardiopredict-production.up.railway.app/api`
- **Status**: ✅ Deployed

### Frontend Configuration
- **Environment Variable**: `REACT_APP_API_URL`
- **Current Value**: `https://cardiopredict-production.up.railway.app/api`
- **Files Updated**:
  - ✅ `.env` (local development)
  - ✅ `.env.example` (template)
  - ✅ `src/services/api.js` (API configuration)

---

## 📋 Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy from Frontend Directory
```bash
cd frontend
vercel
```

#### Step 4: Configure Environment Variable in Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://cardiopredict-production.up.railway.app/api`
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**

#### Step 5: Redeploy
```bash
vercel --prod
```

---

### Option 2: Deploy to Netlify

#### Step 1: Build the Project
```bash
npm run build
```

#### Step 2: Deploy via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=build
```

#### Step 3: Set Environment Variable
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://cardiopredict-production.up.railway.app/api`
5. Trigger a new deploy

---

### Option 3: Manual Build & Deploy

#### Build Locally
```bash
npm run build
```

This creates a `build/` folder with optimized production files.

#### Deploy to Any Static Host
Upload the `build/` folder to:
- **GitHub Pages**
- **AWS S3**
- **Firebase Hosting**
- **Cloudflare Pages**

**Important**: Set the environment variable `REACT_APP_API_URL` in your hosting platform's settings.

---

## 🧪 Testing the Deployment

### 1. Test Backend Health
```bash
curl https://cardiopredict-production.up.railway.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "message": "CardioPredict API is running"
}
```

### 2. Test Frontend Locally with Production Backend
```bash
npm start
```

The app should connect to the Railway backend automatically.

### 3. Test Production Build Locally
```bash
npm run build
npx serve -s build
```

Visit `http://localhost:3000` and test the prediction feature.

---

## 🔧 Environment Variables Reference

### Development (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Production (.env or Platform Settings)
```env
REACT_APP_API_URL=https://cardiopredict-production.up.railway.app/api
```

---

## 🐛 Troubleshooting

### Issue: "Network Error" or "Failed to fetch"

**Solution 1**: Check CORS settings on backend
- Ensure Railway backend allows your frontend domain

**Solution 2**: Verify environment variable
```bash
# In frontend directory
echo $REACT_APP_API_URL  # Linux/Mac
echo %REACT_APP_API_URL%  # Windows CMD
$env:REACT_APP_API_URL    # Windows PowerShell
```

**Solution 3**: Check Railway backend logs
```bash
# Visit Railway dashboard and check logs
```

### Issue: Environment variable not working

**Cause**: React only reads environment variables at build time.

**Solution**: Rebuild the app after changing `.env`
```bash
# Stop the dev server (Ctrl+C)
npm start  # Restart
```

For production:
```bash
npm run build  # Rebuild
```

### Issue: 404 on page refresh (Vercel/Netlify)

**Solution**: Already configured in `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

For Netlify, create `public/_redirects`:
```
/*    /index.html   200
```

---

## 📊 Deployment Checklist

- [x] Backend deployed on Railway
- [x] Frontend `.env` file created
- [x] Frontend `.env.example` template created
- [x] `api.js` updated with Railway URL
- [ ] Frontend deployed to Vercel/Netlify
- [ ] Environment variable set in hosting platform
- [ ] Test prediction feature end-to-end
- [ ] Verify all API endpoints work

---

## 🎯 Next Steps

1. **Deploy Frontend**: Choose Vercel, Netlify, or another platform
2. **Set Environment Variable**: Add `REACT_APP_API_URL` in platform settings
3. **Test**: Make a prediction to verify frontend ↔ backend connection
4. **Monitor**: Check Railway logs for any backend errors

---

## 📞 Support

If you encounter issues:
1. Check Railway backend logs
2. Check browser console for errors (F12)
3. Verify environment variables are set correctly
4. Ensure backend URL is accessible: `https://cardiopredict-production.up.railway.app/api/health`

---

**Last Updated**: January 2026
**Backend**: Railway
**Frontend**: Ready to deploy
