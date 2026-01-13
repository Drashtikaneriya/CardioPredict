import sys
import os
import pickle
import sklearn
import numpy as np

# Add backend to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'backend')))

from model_utils import ModelPredictor

def test_local_model():
    print(f"Python version: {sys.version}")
    print(f"Scikit-learn version: {sklearn.__version__}")
    
    model_path = os.path.join('backend', 'cardio_model_lr.pkl')
    print(f"Checking model at: {model_path}")
    print(f"Exists: {os.path.exists(model_path)}")
    
    try:
        predictor = ModelPredictor()
        if predictor.model:
            print("[SUCCESS] Model loaded successfully locally!")
            
            # Test a dummy prediction
            test_data = {
                "age": 50, "gender": 1, "height": 170, "weight": 70,
                "ap_hi": 120, "ap_lo": 80, "cholesterol": 1,
                "glucose": 1, "smoke": 0, "alco": 0, "active": 1
            }
            result = predictor.predict(test_data)
            print(f"[SUCCESS] Prediction test passed: {result['prediction_label']}")
        else:
            print("[FAIL] Model failed to load locally: predictor.model is None")
    except Exception as e:
        print(f"[ERROR] Error during local test: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_local_model()
