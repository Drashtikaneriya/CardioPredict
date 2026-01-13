# 🔧 Railway Deployment Fix Guide

## 🚨 Problem Identified

Your Railway backend is returning **503 Service Unavailable** because:
- **Model file is NOT loaded**: `model_loaded: false`
- **Scaler file is NOT loaded**: `scaler_loaded: false`

This means the `cardio_model_lr.pkl` file is either:
1. Not deployed to Railway
2. Not accessible from the correct path
3. Corrupted during deployment

---

## ✅ Solution Steps

### Step 1: Verify Model File is Committed

```bash
# Check if model file is in git
git ls-files backend/cardio_model_lr.pkl
```

**Expected output**: `backend/cardio_model_lr.pkl`

If not shown, add it:
```bash
git add backend/cardio_model_lr.pkl
git commit -m "Add model file for deployment"
git push
```

### Step 2: Push Updated Backend Code

The backend has been updated with better error handling and debugging:

```bash
cd backend

# Check git status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Fix: Enhanced model loading with debugging for Railway"

# Push to trigger Railway redeploy
git push
```

### Step 3: Check Railway Logs

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Select your `CardioPredict` project
3. Click on your backend service
4. Go to **Deployments** tab
5. Click on the latest deployment
6. View **Deploy Logs** and **Runtime Logs**

**Look for these debug messages:**
```
[DEBUG] Current working directory: /app
[DEBUG] Script directory: /app/backend
[DEBUG] Looking for model at: /app/backend/cardio_model_lr.pkl
[DEBUG] Model file exists: True/False
[DEBUG] Files in backend directory: [...]
```

### Step 4: Use Debug Endpoint

After redeployment, test the new debug endpoint:

```bash
curl https://cardiopredict-production.up.railway.app/api/debug
```

This will show:
- Current working directory
- Files in backend directory
- Whether model file exists
- Model loading status

### Step 5: Verify Railway Configuration

In Railway dashboard, check:

1. **Root Directory**: Should be empty or `/` (not `/backend`)
2. **Start Command**: Should be from Procfile: `gunicorn --chdir backend app:app`
3. **Build Command**: Should be empty (pip install runs automatically)

---

## 🔍 Common Issues & Fixes

### Issue 1: Model File Too Large for Git

**Check file size:**
```bash
ls -lh backend/cardio_model_lr.pkl
```

If > 100MB, you need Git LFS:
```bash
# Install Git LFS
git lfs install

# Track .pkl files
git lfs track "*.pkl"

# Add and commit
git add .gitattributes
git add backend/cardio_model_lr.pkl
git commit -m "Add model file with Git LFS"
git push
```

### Issue 2: Wrong Working Directory

Railway might start from root directory. The updated code now tries multiple paths:
1. `backend/cardio_model_lr.pkl` (relative to script)
2. `cardio_model_lr.pkl` (current directory)
3. `./backend/cardio_model_lr.pkl` (from root)

### Issue 3: File Not Included in Deployment

Check if there's a `.railwayignore` file:
```bash
cat .railwayignore
```

If it exists and excludes `.pkl` files, remove that line.

---

## 🧪 Testing After Fix

### 1. Test Debug Endpoint
```bash
curl https://cardiopredict-production.up.railway.app/api/debug
```

Expected response:
```json
{
  "model_loaded": true,
  "scaler_loaded": true,
  "model_file_exists": true,
  "files_in_backend": ["app.py", "model_utils.py", "cardio_model_lr.pkl", ...]
}
```

### 2. Test Health Endpoint
```bash
curl https://cardiopredict-production.up.railway.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true,
  "version": "1.0.0"
}
```

### 3. Test Prediction
```bash
curl -X POST https://cardiopredict-production.up.railway.app/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 50,
    "gender": 1,
    "height": 170,
    "weight": 70,
    "ap_hi": 120,
    "ap_lo": 80,
    "cholesterol": 1,
    "glucose": 1,
    "smoke": 0,
    "alco": 0,
    "active": 1
  }'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "prediction": 0,
    "prediction_label": "No Disease",
    "probability": 0.23,
    "risk_level": "Low",
    "confidence": 0.77
  }
}
```

---

## 📋 Quick Checklist

- [ ] Model file is committed to git
- [ ] Backend code is updated with debugging
- [ ] Changes are pushed to trigger Railway redeploy
- [ ] Railway logs show successful model loading
- [ ] `/api/debug` endpoint shows `model_loaded: true`
- [ ] `/api/health` endpoint shows `model_loaded: true`
- [ ] `/api/predict` endpoint works without 503 error
- [ ] Frontend can make predictions successfully

---

## 🚀 Next Steps After Fix

Once the model is loaded successfully:

1. **Test from Frontend**
   ```bash
   cd frontend
   npm start
   ```
   Fill out the form and submit a prediction.

2. **Remove Debug Endpoint** (Optional, for production)
   Comment out the `/api/debug` endpoint in `app.py` for security.

3. **Deploy Frontend**
   Deploy to Vercel/Netlify with the Railway backend URL.

---

## 📞 If Still Not Working

1. **Check Railway Logs**: Look for `[ERROR]` messages
2. **Verify File Size**: `ls -lh backend/cardio_model_lr.pkl`
3. **Test Locally**: Run `python backend/app.py` locally to ensure it works
4. **Check Railway Build**: Ensure all files are included in deployment

---

**Last Updated**: January 13, 2026
**Status**: Debugging in progress
**Next Action**: Push updated code and check Railway logs
