"""
Flask Backend API for Cardiovascular Disease Prediction
Production-ready REST API with CORS support
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from model_utils import ModelPredictor
import traceback

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for React frontend (Vercel)
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Initialize model predictor
try:
    predictor = ModelPredictor()
    print("[OK] Model predictor initialized successfully")
except Exception as e:
    print(f"[ERROR] Failed to initialize model predictor: {e}")
    predictor = None


# ==========================================
# API ENDPOINTS
# ==========================================

@app.route('/', methods=['GET'])
def index():
    """Root endpoint for status"""
    return jsonify({
        'status': 'online',
        'message': 'Cardiovascular Prediction API is running',
        'health_check': '/api/health'
    }), 200


@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    Returns server status and model availability
    """
    return jsonify({
        'status': 'healthy',
        'model_loaded': predictor is not None and predictor.model is not None,
        'scaler_loaded': predictor is not None and predictor.scaler is not None,
        'version': '1.0.0'
    }), 200


@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Prediction endpoint
    
    Expected JSON input:
    {
        "age": 50,
        "gender": 1,  // 1=Male, 2=Female
        "height": 170,
        "weight": 70,
        "ap_hi": 120,
        "ap_lo": 80,
        "cholesterol": 1,  // 1=Normal, 2=Above Normal, 3=Well Above Normal
        "glucose": 1,      // 1=Normal, 2=Above Normal, 3=Well Above Normal
        "smoke": 0,        // 0=No, 1=Yes
        "alco": 0,         // 0=No, 1=Yes
        "active": 1        // 0=No, 1=Yes
    }
    
    Returns:
    {
        "prediction": 0,
        "prediction_label": "No Disease",
        "probability": 0.23,
        "risk_level": "Low",
        "confidence": 0.77
    }
    """
    try:
        # Check if model is loaded
        if predictor is None or predictor.model is None:
            return jsonify({
                'error': 'Model not loaded',
                'message': 'Server is not ready to make predictions'
            }), 503
        
        # Get JSON data from request
        data = request.get_json()
        
        if not data:
            return jsonify({
                'error': 'No data provided',
                'message': 'Request body must contain JSON data'
            }), 400
        
        # Make prediction
        result = predictor.predict(data)
        
        return jsonify({
            'success': True,
            'data': result
        }), 200
        
    except ValueError as e:
        # Validation errors
        return jsonify({
            'error': 'Validation error',
            'message': str(e)
        }), 400
        
    except Exception as e:
        # Unexpected errors
        print(f"Error in /api/predict: {e}")
        print(traceback.format_exc())
        return jsonify({
            'error': 'Internal server error',
            'message': 'An unexpected error occurred during prediction'
        }), 500


@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """
    Model metrics endpoint
    Returns model performance statistics
    """
    try:
        if predictor is None:
            return jsonify({
                'error': 'Model not loaded'
            }), 503
        
        metrics = predictor.get_model_metrics()
        
        return jsonify({
            'success': True,
            'data': metrics
        }), 200
        
    except Exception as e:
        print(f"Error in /api/metrics: {e}")
        return jsonify({
            'error': 'Internal server error',
            'message': str(e)
        }), 500


@app.route('/api/info', methods=['GET'])
def get_info():
    """
    API information endpoint
    Returns available endpoints and their descriptions
    """
    return jsonify({
        'api_name': 'Cardiovascular Disease Prediction API',
        'version': '1.0.0',
        'endpoints': {
            '/api/health': {
                'method': 'GET',
                'description': 'Health check endpoint'
            },
            '/api/predict': {
                'method': 'POST',
                'description': 'Make disease prediction',
                'requires': 'JSON body with patient data'
            },
            '/api/metrics': {
                'method': 'GET',
                'description': 'Get model performance metrics'
            },
            '/api/info': {
                'method': 'GET',
                'description': 'API information and documentation'
            }
        }
    }), 200


@app.route('/api/debug', methods=['GET'])
def debug_info():
    """
    Debug endpoint to help diagnose deployment issues
    Shows file system information and model loading status
    """
    import os
    
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    cwd = os.getcwd()
    
    debug_data = {
        'current_working_directory': cwd,
        'backend_directory': backend_dir,
        'files_in_cwd': os.listdir(cwd) if os.path.exists(cwd) else [],
        'files_in_backend': os.listdir(backend_dir) if os.path.exists(backend_dir) else [],
        'model_file_exists': os.path.exists(os.path.join(backend_dir, 'cardio_model_lr.pkl')),
        'predictor_initialized': predictor is not None,
        'model_loaded': predictor is not None and predictor.model is not None,
        'scaler_loaded': predictor is not None and predictor.scaler is not None,
    }
    
    if predictor:
        debug_data['model_path'] = predictor.model_path
        debug_data['model_type'] = str(type(predictor.model)) if predictor.model else None
    
    return jsonify(debug_data), 200


# ==========================================
# ERROR HANDLERS
# ==========================================

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'error': 'Not found',
        'message': 'The requested endpoint does not exist'
    }), 404


@app.errorhandler(405)
def method_not_allowed(error):
    """Handle 405 errors"""
    return jsonify({
        'error': 'Method not allowed',
        'message': 'The HTTP method is not allowed for this endpoint'
    }), 405


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        'error': 'Internal server error',
        'message': 'An unexpected error occurred'
    }), 500


# ==========================================
# MAIN
# ==========================================

if __name__ == '__main__':
    print("=" * 50)
    print("Cardiovascular Disease Prediction API")
    print("=" * 50)
    print("Starting Flask server...")
    print("API will be available at: http://localhost:5000")
    print("=" * 50)
    
    # Run Flask app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
