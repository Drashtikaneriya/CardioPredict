/**
 * API Service Layer
 * Handles all HTTP requests to the Flask backend
 */

import axios from 'axios';

// Base URL for API (uses proxy from package.json in development)
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

/**
 * Health Check
 * @returns {Promise} Server health status
 */
export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

/**
 * Make Prediction
 * @param {Object} patientData - Patient information
 * @returns {Promise} Prediction result
 */
export const makePrediction = async (patientData) => {
  console.log('[API] Sending prediction request:', patientData);
  try {
    const response = await apiClient.post('/predict', patientData);
    console.log('[API] Prediction response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Prediction failed:', error);
    if (error.response) {
      // Server responded with error, try to get specific message
      console.error('[API] Server error details:', error.response.data);
      throw new Error(error.response.data.message || error.response.data.error || 'Prediction failed from server');
    } else if (error.request) {
      // Request made but no response
      console.error('[API] No response received:', error.request);
      throw new Error('No response from backend. Is the server running at http://localhost:5000?');
    } else {
      // Something else happened
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

/**
 * Get Model Metrics
 * @returns {Promise} Model performance metrics
 */
export const getMetrics = async () => {
  try {
    const response = await apiClient.get('/metrics');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch metrics:', error);
    throw error;
  }
};

/**
 * Get API Info
 * @returns {Promise} API information
 */
export const getApiInfo = async () => {
  try {
    const response = await apiClient.get('/info');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch API info:', error);
    throw error;
  }
};

export default {
  checkHealth,
  makePrediction,
  getMetrics,
  getApiInfo,
};
