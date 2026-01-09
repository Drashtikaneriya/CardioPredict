import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaCheckCircle, FaExclamationTriangle, FaRedo, FaChartBar } from 'react-icons/fa';
import '../styles/ResultPage.css';

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const prediction = location.state?.prediction;

    if (!prediction) {
        return (
            <div className="result-page">
                <div className="result-container">
                    <div className="no-data">
                        <FaExclamationTriangle className="warning-icon" />
                        <h2>No Prediction Data</h2>
                        <p>Please complete the prediction form first.</p>
                        <button onClick={() => navigate('/predict')} className="action-button">
                            Go to Prediction Form
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const isHighRisk = prediction.prediction === 1;
    const riskPercentage = (prediction.probability * 100).toFixed(1);

    return (
        <div className="result-page">
            <div className="result-container">
                <div className={`result-card ${isHighRisk ? 'high-risk' : 'low-risk'}`}>
                    {/* Icon */}
                    <div className="result-icon">
                        {isHighRisk ? (
                            <FaExclamationTriangle />
                        ) : (
                            <FaCheckCircle />
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="result-title">
                        {prediction.prediction_label}
                    </h1>

                    {/* Risk Level */}
                    <div className="risk-badge">
                        {prediction.risk_level} Risk
                    </div>

                    {/* Probability */}
                    <div className="probability-section">
                        <h3>Risk Probability</h3>
                        <div className="probability-bar-container">
                            <div
                                className="probability-bar"
                                style={{ width: `${riskPercentage}%` }}
                            >
                                <span className="probability-text">{riskPercentage}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="result-message">
                        {isHighRisk ? (
                            <>
                                <h3>⚠️ Elevated Risk Detected</h3>
                                <p>
                                    The assessment indicates a potential risk for cardiovascular disease.
                                    We recommend consulting with a healthcare professional for a comprehensive
                                    evaluation and personalized treatment plan.
                                </p>
                                <div className="recommendations">
                                    <h4>Recommended Actions:</h4>
                                    <ul>
                                        <li>Schedule an appointment with a cardiologist</li>
                                        <li>Monitor blood pressure regularly</li>
                                        <li>Adopt a heart-healthy diet</li>
                                        <li>Increase physical activity</li>
                                        <li>Manage stress levels</li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3>✓ Low Risk Detected</h3>
                                <p>
                                    Great news! The assessment indicates a low risk for cardiovascular disease.
                                    Continue maintaining your healthy lifestyle to keep your heart in good condition.
                                </p>
                                <div className="recommendations">
                                    <h4>Keep Up the Good Work:</h4>
                                    <ul>
                                        <li>Maintain regular physical activity</li>
                                        <li>Continue balanced, nutritious diet</li>
                                        <li>Regular health check-ups</li>
                                        <li>Stay hydrated and manage stress</li>
                                        <li>Avoid smoking and excessive alcohol</li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Confidence */}
                    <div className="confidence-section">
                        <p>
                            <strong>Model Confidence:</strong> {(prediction.confidence * 100).toFixed(1)}%
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="result-actions">
                        <button
                            onClick={() => navigate('/predict')}
                            className="action-button secondary"
                        >
                            <FaRedo />
                            New Prediction
                        </button>
                        <button
                            onClick={() => navigate('/insights')}
                            className="action-button primary"
                        >
                            <FaChartBar />
                            View Model Insights
                        </button>
                    </div>

                    {/* Disclaimer */}
                    <div className="disclaimer">
                        <p>
                            <strong>Medical Disclaimer:</strong> This tool provides risk assessment for
                            informational purposes only. It is not a substitute for professional medical
                            advice, diagnosis, or treatment. Always consult with qualified healthcare
                            providers regarding any medical concerns.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
