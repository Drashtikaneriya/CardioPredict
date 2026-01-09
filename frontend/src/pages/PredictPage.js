import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makePrediction, checkHealth } from '../services/api';
import { FaUser, FaRuler, FaWeight, FaHeartbeat, FaFlask, FaSmoking, FaWineGlass, FaRunning, FaServer, FaWifi } from 'react-icons/fa';
import '../styles/PredictPage.css';

const PredictPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [backendStatus, setBackendStatus] = useState({ online: false, checking: true });

    // Check backend health on mount
    React.useEffect(() => {
        const verifyBackend = async () => {
            try {
                const health = await checkHealth();
                if (health && health.status === 'healthy') {
                    setBackendStatus({ online: true, checking: false });
                    console.log('[PredictPage] Backend is online');
                } else {
                    setBackendStatus({ online: false, checking: false });
                    console.warn('[PredictPage] Backend health check returned unexpected status:', health);
                }
            } catch (err) {
                console.error('[PredictPage] Backend offline:', err);
                setBackendStatus({ online: false, checking: false });
                setError('Cannot connect to Backend API. Please ensure the Python server is running.');
            }
        };
        verifyBackend();
    }, []);

    const [formData, setFormData] = useState({
        age: 50,
        gender: 1,
        height: 170,
        weight: 70,
        ap_hi: 120,
        ap_lo: 80,
        cholesterol: 1,
        glucose: 1,
        smoke: 0,
        alco: 0,
        active: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Ensure numeric values are actually numbers, defaulting to empty string if not a valid number during typing
        // But for state, we prefer valid numbers.
        // For radio buttons (smoke, alco, active), value is "0" or "1" (string) from event
        // We need to parse them.

        let parsedValue = value;
        if (e.target.type === 'number' || e.target.type === 'select-one' || e.target.type === 'radio') {
            parsedValue = value === '' ? '' : Number(value);
        }

        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await makePrediction(formData);
            // Navigate to result page with prediction data
            navigate('/result', { state: { prediction: result.data } });
        } catch (err) {
            setError(err.message || 'Prediction failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="predict-page">
            <div className="predict-container">
                <div className="predict-header">
                    <h1>Patient Health Assessment</h1>
                    <p>Enter patient information for cardiovascular risk prediction</p>

                    {/* Backend Status Indicator */}
                    <div className={`status-indicator ${backendStatus.online ? 'online' : 'offline'}`} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        marginTop: '1rem',
                        backgroundColor: backendStatus.online ? '#e6fffa' : '#fff5f5',
                        color: backendStatus.online ? '#2c7a7b' : '#c53030',
                        border: `1px solid ${backendStatus.online ? '#b2f5ea' : '#feb2b2'}`
                    }}>
                        {backendStatus.checking ? (
                            <span>Checking connection...</span>
                        ) : backendStatus.online ? (
                            <>
                                <FaWifi /> Backend Connected
                            </>
                        ) : (
                            <>
                                <FaServer /> Backend Disconnected
                            </>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        <span>⚠️ {error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="predict-form">
                    {/* Personal Information */}
                    <div className="form-section">
                        <h2 className="section-title">
                            <FaUser className="section-icon" />
                            Personal Information
                        </h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="age">Age (years)</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    min="18"
                                    max="120"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value={1}>Male</option>
                                    <option value={2}>Female</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="height">
                                    <FaRuler className="input-icon" />
                                    Height (cm)
                                </label>
                                <input
                                    type="number"
                                    id="height"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    min="100"
                                    max="250"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="weight">
                                    <FaWeight className="input-icon" />
                                    Weight (kg)
                                </label>
                                <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    min="30"
                                    max="200"
                                    step="0.1"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vital Signs */}
                    <div className="form-section">
                        <h2 className="section-title">
                            <FaHeartbeat className="section-icon" />
                            Vital Signs
                        </h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="ap_hi">Systolic BP (mmHg)</label>
                                <input
                                    type="number"
                                    id="ap_hi"
                                    name="ap_hi"
                                    value={formData.ap_hi}
                                    onChange={handleChange}
                                    min="70"
                                    max="250"
                                    required
                                />
                                <small>Upper number</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="ap_lo">Diastolic BP (mmHg)</label>
                                <input
                                    type="number"
                                    id="ap_lo"
                                    name="ap_lo"
                                    value={formData.ap_lo}
                                    onChange={handleChange}
                                    min="40"
                                    max="150"
                                    required
                                />
                                <small>Lower number</small>
                            </div>
                        </div>
                    </div>

                    {/* Lab Results */}
                    <div className="form-section">
                        <h2 className="section-title">
                            <FaFlask className="section-icon" />
                            Laboratory Results
                        </h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="cholesterol">Cholesterol Level</label>
                                <select
                                    id="cholesterol"
                                    name="cholesterol"
                                    value={formData.cholesterol}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value={1}>Normal</option>
                                    <option value={2}>Above Normal</option>
                                    <option value={3}>Well Above Normal</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="glucose">Glucose Level</label>
                                <select
                                    id="glucose"
                                    name="glucose"
                                    value={formData.glucose}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value={1}>Normal</option>
                                    <option value={2}>Above Normal</option>
                                    <option value={3}>Well Above Normal</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Lifestyle Factors */}
                    <div className="form-section">
                        <h2 className="section-title">
                            <FaRunning className="section-icon" />
                            Lifestyle Factors
                        </h2>
                        <div className="form-grid lifestyle-grid">
                            <div className="form-group checkbox-group">
                                <label>
                                    <FaSmoking className="lifestyle-icon" />
                                    Smoking
                                </label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="smoke"
                                            value={0}
                                            checked={formData.smoke === 0}
                                            onChange={handleChange}
                                        />
                                        <span>No</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="smoke"
                                            value={1}
                                            checked={formData.smoke === 1}
                                            onChange={handleChange}
                                        />
                                        <span>Yes</span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-group checkbox-group">
                                <label>
                                    <FaWineGlass className="lifestyle-icon" />
                                    Alcohol Intake
                                </label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="alco"
                                            value={0}
                                            checked={formData.alco === 0}
                                            onChange={handleChange}
                                        />
                                        <span>No</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="alco"
                                            value={1}
                                            checked={formData.alco === 1}
                                            onChange={handleChange}
                                        />
                                        <span>Yes</span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-group checkbox-group">
                                <label>
                                    <FaRunning className="lifestyle-icon" />
                                    Physical Activity
                                </label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="active"
                                            value={0}
                                            checked={formData.active === 0}
                                            onChange={handleChange}
                                        />
                                        <span>No</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="active"
                                            value={1}
                                            checked={formData.active === 1}
                                            onChange={handleChange}
                                        />
                                        <span>Yes</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-actions">
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <FaHeartbeat />
                                    Predict Risk
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PredictPage;
