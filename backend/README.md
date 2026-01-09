# Cardiovascular Disease Prediction - Backend API

## Overview
Flask REST API for serving cardiovascular disease predictions using a trained Logistic Regression model.

## Features
- ✅ Health check endpoint
- ✅ Prediction endpoint with input validation
- ✅ Model metrics endpoint
- ✅ CORS enabled for React frontend
- ✅ Comprehensive error handling
- ✅ Production-ready with Gunicorn

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Ensure Model File Exists
Make sure `cardio_model_lr.pkl` is in the backend directory.

### 3. Run Development Server
```bash
python app.py
```

The API will be available at `http://localhost:5000`

### 4. Run Production Server
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## API Endpoints

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true,
  "version": "1.0.0"
}
```

### POST /api/predict
Make a disease prediction.

**Request Body:**
```json
{
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
}
```

**Response:**
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

### GET /api/metrics
Get model performance metrics.

**Response:**
```json
{
  "success": true,
  "data": {
    "accuracy": 0.7233,
    "precision": 0.75,
    "recall": 0.68,
    "f1_score": 0.71,
    "confusion_matrix": {
      "true_negative": 4987,
      "false_positive": 1498,
      "false_negative": 2115,
      "true_positive": 4495
    }
  }
}
```

## Deployment

### Render/Railway
1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn -w 4 -b 0.0.0.0:$PORT app:app`
5. Deploy

### Environment Variables
- `PORT`: Server port (default: 5000)

## Project Structure
```
backend/
├── app.py                 # Main Flask application
├── model_utils.py         # Model loading and prediction logic
├── cardio_model_lr.pkl    # Trained model file
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## Testing

### Test Health Endpoint
```bash
curl http://localhost:5000/api/health
```

### Test Prediction Endpoint
```bash
curl -X POST http://localhost:5000/api/predict \
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

## Error Handling
The API returns appropriate HTTP status codes:
- `200`: Success
- `400`: Bad request (validation error)
- `404`: Endpoint not found
- `405`: Method not allowed
- `500`: Internal server error
- `503`: Service unavailable (model not loaded)
