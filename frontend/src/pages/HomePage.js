import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaDatabase, FaReact, FaPython, FaChartLine } from 'react-icons/fa';
import { SiFlask, SiScikitlearn } from 'react-icons/si';
import '../styles/HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-icon">
                        <FaHeartbeat />
                    </div>
                    <h1 className="hero-title">
                        Cardiovascular Disease Prediction System
                    </h1>
                    <p className="hero-subtitle">
                        AI-Powered Risk Assessment for Early Detection and Prevention
                    </p>
                    <button
                        className="cta-button"
                        onClick={() => navigate('/predict')}
                    >
                        Start Prediction
                        <span className="button-arrow">→</span>
                    </button>
                </div>
            </section>

            {/* Dataset Overview */}
            <section className="info-section">
                <h2 className="section-title">Dataset Overview</h2>
                <div className="info-cards">
                    <div className="info-card">
                        <FaDatabase className="card-icon" />
                        <h3>70,000</h3>
                        <p>Patient Records</p>
                    </div>
                    <div className="info-card">
                        <FaChartLine className="card-icon" />
                        <h3>72.3%</h3>
                        <p>Model Accuracy</p>
                    </div>
                    <div className="info-card">
                        <FaHeartbeat className="card-icon" />
                        <h3>15</h3>
                        <p>Health Features</p>
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="tech-section">
                <h2 className="section-title">Technology Stack</h2>
                <div className="tech-grid">
                    <div className="tech-card">
                        <FaReact className="tech-icon react-icon" />
                        <h4>React</h4>
                        <p>Modern UI Framework</p>
                    </div>
                    <div className="tech-card">
                        <SiFlask className="tech-icon flask-icon" />
                        <h4>Flask</h4>
                        <p>REST API Backend</p>
                    </div>
                    <div className="tech-card">
                        <FaPython className="tech-icon python-icon" />
                        <h4>Python</h4>
                        <p>ML Development</p>
                    </div>
                    <div className="tech-card">
                        <SiScikitlearn className="tech-icon sklearn-icon" />
                        <h4>Scikit-Learn</h4>
                        <p>Machine Learning</p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features-section">
                <h2 className="section-title">Key Features</h2>
                <div className="features-grid">
                    <div className="feature-item">
                        <div className="feature-number">01</div>
                        <h3>Accurate Predictions</h3>
                        <p>Logistic Regression model trained on 70,000+ patient records</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-number">02</div>
                        <h3>Real-time Analysis</h3>
                        <p>Instant risk assessment based on patient vitals and lifestyle</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-number">03</div>
                        <h3>Visual Insights</h3>
                        <p>Interactive charts and metrics for model performance</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-number">04</div>
                        <h3>User-Friendly</h3>
                        <p>Clean, intuitive interface designed for healthcare professionals</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
