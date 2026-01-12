"""
Model Utilities for Cardiovascular Disease Prediction
Handles model loading, feature engineering, and prediction logic
"""

import pickle
import numpy as np
import pandas as pd
from typing import Dict, Tuple, Any


import os

class ModelPredictor:
    """Handles all model-related operations"""
    
    def __init__(self, model_filename: str = "cardio_model_lr.pkl"):
        self.model = None
        self.scaler = None
        # Get absolute path to the model file
        base_path = os.path.dirname(os.path.abspath(__file__))
        self.model_path = os.path.join(base_path, model_filename)
        self.load_model()
        
    def load_model(self) -> bool:
        """Load the trained model and scaler from pickle file"""
        try:
            with open(self.model_path, 'rb') as f:
                data = pickle.load(f)
            
            # Handle different pickle structures
            if isinstance(data, tuple):
                self.model, self.scaler = data
            elif isinstance(data, dict):
                self.model = data.get('model')
                self.scaler = data.get('scaler')
            else:
                self.model = data
                self.scaler = None
            
            print(f"[OK] Model loaded successfully from {self.model_path}")
            return True
            
        except Exception as e:
            print(f"[ERROR] Error loading model: {e}")
            return False
    
    def validate_input(self, data: Dict) -> Tuple[bool, str]:
        """Validate input data"""
        required_fields = [
            'age', 'gender', 'height', 'weight', 
            'ap_hi', 'ap_lo', 'cholesterol', 'glucose',
            'smoke', 'alco', 'active'
        ]
        
        # Check all required fields present
        for field in required_fields:
            if field not in data:
                return False, f"Missing required field: {field}"
        
        # Validate ranges
        try:
            age = int(data['age'])
            if age < 18 or age > 120:
                return False, "Age must be between 18 and 120"
            
            height = float(data['height'])
            if height < 100 or height > 250:
                return False, "Height must be between 100 and 250 cm"
            
            weight = float(data['weight'])
            if weight < 30 or weight > 200:
                return False, "Weight must be between 30 and 200 kg"
            
            ap_hi = int(data['ap_hi'])
            ap_lo = int(data['ap_lo'])
            if ap_hi < 70 or ap_hi > 250:
                return False, "Systolic BP must be between 70 and 250"
            if ap_lo < 40 or ap_lo > 150:
                return False, "Diastolic BP must be between 40 and 150"
            if ap_hi <= ap_lo:
                return False, "Systolic BP must be greater than Diastolic BP"
            
            gender = int(data['gender'])
            if gender not in [1, 2]:
                return False, "Gender must be 1 (Male) or 2 (Female)"
            
            cholesterol = int(data['cholesterol'])
            if cholesterol not in [1, 2, 3]:
                return False, "Cholesterol must be 1, 2, or 3"
            
            glucose = int(data['glucose'])
            if glucose not in [1, 2, 3]:
                return False, "Glucose must be 1, 2, or 3"
            
            for field in ['smoke', 'alco', 'active']:
                val = int(data[field])
                if val not in [0, 1]:
                    return False, f"{field} must be 0 or 1"
            
            return True, "Valid"
            
        except (ValueError, TypeError) as e:
            return False, f"Invalid data type: {str(e)}"
    
    def engineer_features(self, data: Dict) -> np.ndarray:
        """
        Transform raw input into model-ready features
        
        Expected feature order (15 features):
        [age, gender, high_bp, low_bp, smoke, alco, active, 
         BMI, pulse_pressure, chol_1, chol_2, chol_3, gluc_1, gluc_2, gluc_3]
        """
        # Extract raw values
        age = int(data['age'])
        gender_input = int(data['gender'])  # 1=Male, 2=Female (user input)
        height = float(data['height'])
        weight = float(data['weight'])
        ap_hi = int(data['ap_hi'])
        ap_lo = int(data['ap_lo'])
        cholesterol = int(data['cholesterol'])  # 1, 2, or 3
        glucose = int(data['glucose'])  # 1, 2, or 3
        smoke = int(data['smoke'])
        alco = int(data['alco'])
        active = int(data['active'])
        
        # Feature Engineering
        
        # 1. Gender mapping: User input (1=Male, 2=Female) -> Model (1=Male, 0=Female)
        gender_model = 1 if gender_input == 1 else 0
        
        # 2. Calculate BMI
        bmi = weight / ((height / 100.0) ** 2)
        bmi = np.clip(bmi, 13, 55)  # Clip to realistic range
        
        # 3. Calculate Pulse Pressure
        pulse_pressure = ap_hi - ap_lo
        
        # 4. One-hot encode Cholesterol (3 columns)
        chol_1 = 1 if cholesterol == 1 else 0
        chol_2 = 1 if cholesterol == 2 else 0
        chol_3 = 1 if cholesterol == 3 else 0
        
        # 5. One-hot encode Glucose (3 columns)
        gluc_1 = 1 if glucose == 1 else 0
        gluc_2 = 1 if glucose == 2 else 0
        gluc_3 = 1 if glucose == 3 else 0
        
        # Construct feature vector (15 features in exact order)
        features = np.array([[
            age,              # 0
            gender_model,     # 1
            ap_hi,            # 2 (high_bp)
            ap_lo,            # 3 (low_bp)
            smoke,            # 4
            alco,             # 5
            active,           # 6
            bmi,              # 7
            pulse_pressure,   # 8
            chol_1,           # 9
            chol_2,           # 10
            chol_3,           # 11
            gluc_1,           # 12
            gluc_2,           # 13
            gluc_3            # 14
        ]])
        
        return features
    
    def predict(self, data: Dict) -> Dict[str, Any]:
        """
        Make prediction on input data
        
        Returns:
            Dictionary with prediction, probability, and risk level
        """
        # Validate input
        is_valid, message = self.validate_input(data)
        if not is_valid:
            raise ValueError(message)
        
        # Engineer features
        features = self.engineer_features(data)
        
        # Scale features
        if self.scaler is not None:
            features_scaled = self.scaler.transform(features)
        else:
            features_scaled = features
        
        # Make prediction
        prediction = self.model.predict(features_scaled)[0]
        probability = self.model.predict_proba(features_scaled)[0]
        
        # Format response
        result = {
            'prediction': int(prediction),
            'prediction_label': 'Disease' if prediction == 1 else 'No Disease',
            'probability': float(probability[1]),  # Probability of disease
            'risk_level': 'High' if prediction == 1 else 'Low',
            'confidence': float(max(probability))
        }
        
        return result
    
    def get_model_metrics(self) -> Dict[str, Any]:
        """
        Return model performance metrics
        These are hardcoded from Task-3 training results
        """
        return {
            'accuracy': 0.7233,
            'precision': 0.75,
            'recall': 0.68,
            'f1_score': 0.71,
            'confusion_matrix': {
                'true_negative': 4987,
                'false_positive': 1498,
                'false_negative': 2115,
                'true_positive': 4495
            },
            'model_type': 'Logistic Regression',
            'features_count': 15,
            'training_samples': 52379,
            'test_samples': 13095
        }
