
import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

def train_optimized_model():
    print("Loading data...")
    # Load the pre-processed dataset
    df = pd.read_csv('c:/Users/Lenovo/OneDrive/Desktop/MLDl/cardio_cleaned.csv')
    
    # Define features and target
    feature_cols = ['age', 'gender', 'high_bp', 'low_bp', 'smoke', 'alco', 'active', 'BMI', 'pulse_pressure', 'chol_1', 'chol_2', 'chol_3', 'gluc_1', 'gluc_2', 'gluc_3']
    X = df[feature_cols]
    y = df['cardio']
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Standardize features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    print("Training Random Forest model with hyperparameter tuning...")
    # Define parameter grid for RandomizedSearchCV
    param_dist = {
        'n_estimators': [100, 200, 300],
        'max_depth': [10, 20, 30, None],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4],
        'bootstrap': [True, False]
    }
    
    rf = RandomForestClassifier(random_state=42)
    
    # Randomized search for speed
    search = RandomizedSearchCV(
        estimator=rf,
        param_distributions=param_dist,
        n_iter=10, 
        cv=5,
        scoring='accuracy',
        n_jobs=-1,
        verbose=1,
        random_state=42
    )
    
    search.fit(X_train_scaled, y_train)
    
    best_rf = search.best_estimator_
    print(f"Best Parameters: {search.best_params_}")
    
    # Evaluation
    y_pred = best_rf.predict(X_test_scaled)
    acc = accuracy_score(y_test, y_pred)
    print(f"\nImproved Accuracy: {acc * 100:.2f}%")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save model and scaler
    # We will overwrite the previous model to immediately reflect changes in the UI
    model_path = 'c:/Users/Lenovo/OneDrive/Desktop/MLDl/backend/cardio_model_lr.pkl'
    with open(model_path, 'wb') as f:
        pickle.dump((best_rf, scaler), f)
    
    print(f"\nOptimized model saved to {model_path}")
    
    # Print metrics for model_utils.py update
    cm = confusion_matrix(y_test, y_pred)
    print("\nConfusion Matrix Components:")
    print(f"True Negative: {cm[0][0]}")
    print(f"False Positive: {cm[0][1]}")
    print(f"False Negative: {cm[1][0]}")
    print(f"True Positive: {cm[1][1]}")

if __name__ == "__main__":
    train_optimized_model()
