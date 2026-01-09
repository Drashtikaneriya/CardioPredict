import React, { useState, useEffect } from 'react';
import { getMetrics } from '../services/api';
import MetricCard from '../components/MetricCard';
import ConfusionMatrix from '../components/ConfusionMatrix';
import { FaCheckCircle, FaBullseye, FaChartLine, FaBalanceScale, FaHeartbeat, FaExclamationCircle } from 'react-icons/fa';
import '../styles/InsightsPage.css';

const InsightsPage = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const response = await getMetrics();
            setMetrics(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load metrics. Please ensure the backend is running.');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="insights-page">
                <div className="loading-container">
                    <div className="spinner-large"></div>
                    <p>Loading model insights...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="insights-page">
                <div className="error-container">
                    <FaExclamationCircle className="error-icon" />
                    <h2>Error Loading Metrics</h2>
                    <p>{error}</p>
                    <button onClick={fetchMetrics} className="retry-button">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="insights-page">
            <div className="insights-container">
                {/* Header */}
                <div className="insights-header">
                    <h1>Model Performance Insights</h1>
                    <p>Detailed analysis of the cardiovascular disease prediction model</p>
                </div>

                {/* Performance Metrics */}
                <section className="metrics-section">
                    <h2 className="section-title">Performance Metrics</h2>
                    <div className="metrics-grid">
                        <MetricCard
                            title="Accuracy"
                            value={metrics.accuracy}
                            icon={FaCheckCircle}
                            color="#48bb78"
                            description="Overall prediction correctness"
                        />
                        <MetricCard
                            title="Precision"
                            value={metrics.precision}
                            icon={FaBullseye}
                            color="#667eea"
                            description="Positive prediction accuracy"
                        />
                        <MetricCard
                            title="Recall"
                            value={metrics.recall}
                            icon={FaChartLine}
                            color="#ed8936"
                            description="True positive detection rate"
                        />
                        <MetricCard
                            title="F1-Score"
                            value={metrics.f1_score}
                            icon={FaBalanceScale}
                            color="#9f7aea"
                            description="Harmonic mean of precision & recall"
                        />
                    </div>
                </section>

                {/* Confusion Matrix */}
                <section className="visualization-section">
                    <h2 className="section-title">Confusion Matrix</h2>
                    <div className="chart-container">
                        <ConfusionMatrix confusionMatrix={metrics.confusion_matrix} />
                    </div>
                    <div className="matrix-explanation">
                        <div className="explanation-card">
                            <h4>Understanding the Confusion Matrix</h4>
                            <ul>
                                <li><strong>True Negative ({metrics.confusion_matrix.true_negative}):</strong> Correctly predicted no disease</li>
                                <li><strong>False Positive ({metrics.confusion_matrix.false_positive}):</strong> Incorrectly predicted disease</li>
                                <li><strong>False Negative ({metrics.confusion_matrix.false_negative}):</strong> Missed disease cases</li>
                                <li><strong>True Positive ({metrics.confusion_matrix.true_positive}):</strong> Correctly predicted disease</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Model Information */}
                <section className="model-info-section">
                    <h2 className="section-title">Model Information</h2>
                    <div className="info-grid">
                        <div className="info-card">
                            <FaHeartbeat className="info-icon" />
                            <h3>Algorithm</h3>
                            <p>{metrics.model_type}</p>
                        </div>
                        <div className="info-card">
                            <FaChartLine className="info-icon" />
                            <h3>Features</h3>
                            <p>{metrics.features_count} health indicators</p>
                        </div>
                        <div className="info-card">
                            <FaBullseye className="info-icon" />
                            <h3>Training Data</h3>
                            <p>{metrics.training_samples.toLocaleString()} samples</p>
                        </div>
                        <div className="info-card">
                            <FaCheckCircle className="info-icon" />
                            <h3>Test Data</h3>
                            <p>{metrics.test_samples.toLocaleString()} samples</p>
                        </div>
                    </div>
                </section>

                {/* Educational Content */}
                <section className="education-section">
                    <h2 className="section-title">Understanding Heart Disease Risk Factors</h2>
                    <div className="education-grid">
                        <div className="education-card">
                            <h3>🩺 Medical Factors</h3>
                            <ul>
                                <li><strong>Blood Pressure:</strong> High BP damages arteries over time</li>
                                <li><strong>Cholesterol:</strong> Elevated levels lead to plaque buildup</li>
                                <li><strong>Glucose:</strong> High blood sugar damages blood vessels</li>
                            </ul>
                        </div>
                        <div className="education-card">
                            <h3>🏃 Lifestyle Factors</h3>
                            <ul>
                                <li><strong>Physical Activity:</strong> Regular exercise strengthens the heart</li>
                                <li><strong>Smoking:</strong> Significantly increases cardiovascular risk</li>
                                <li><strong>Alcohol:</strong> Excessive intake raises blood pressure</li>
                            </ul>
                        </div>
                        <div className="education-card">
                            <h3>👤 Personal Factors</h3>
                            <ul>
                                <li><strong>Age:</strong> Risk increases with age</li>
                                <li><strong>Gender:</strong> Men and women have different risk profiles</li>
                                <li><strong>BMI:</strong> Obesity strains the cardiovascular system</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* How the Model Works */}
                <section className="how-it-works-section">
                    <h2 className="section-title">How the Model Makes Predictions</h2>
                    <div className="workflow">
                        <div className="workflow-step">
                            <div className="step-number">1</div>
                            <h4>Data Collection</h4>
                            <p>Patient information is collected including vitals, lab results, and lifestyle habits</p>
                        </div>
                        <div className="workflow-arrow">→</div>
                        <div className="workflow-step">
                            <div className="step-number">2</div>
                            <h4>Feature Engineering</h4>
                            <p>Raw data is transformed into meaningful features like BMI and pulse pressure</p>
                        </div>
                        <div className="workflow-arrow">→</div>
                        <div className="workflow-step">
                            <div className="step-number">3</div>
                            <h4>Normalization</h4>
                            <p>Features are scaled to ensure fair comparison across different measurements</p>
                        </div>
                        <div className="workflow-arrow">→</div>
                        <div className="workflow-step">
                            <div className="step-number">4</div>
                            <h4>Prediction</h4>
                            <p>Logistic Regression model calculates disease probability based on learned patterns</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default InsightsPage;
