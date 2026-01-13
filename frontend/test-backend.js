// Test script to verify backend connection
// Run with: node test-backend.js

const axios = require('axios');

const BACKEND_URL = 'https://cardiopredict-production.up.railway.app/api';

async function testBackend() {
    console.log('🔍 Testing backend connection...\n');
    console.log(`Backend URL: ${BACKEND_URL}\n`);

    try {
        // Test 1: Health Check
        console.log('1️⃣ Testing /health endpoint...');
        const healthResponse = await axios.get(`${BACKEND_URL}/health`);
        console.log('✅ Health check passed!');
        console.log('Response:', JSON.stringify(healthResponse.data, null, 2));
        console.log('');

        // Test 2: API Info
        console.log('2️⃣ Testing /info endpoint...');
        const infoResponse = await axios.get(`${BACKEND_URL}/info`);
        console.log('✅ API info retrieved!');
        console.log('Response:', JSON.stringify(infoResponse.data, null, 2));
        console.log('');

        // Test 3: Metrics
        console.log('3️⃣ Testing /metrics endpoint...');
        const metricsResponse = await axios.get(`${BACKEND_URL}/metrics`);
        console.log('✅ Metrics retrieved!');
        console.log('Response:', JSON.stringify(metricsResponse.data, null, 2));
        console.log('');

        console.log('🎉 All tests passed! Backend is working correctly.');
        console.log('✅ Frontend is ready to connect to Railway backend.');

    } catch (error) {
        console.error('❌ Error testing backend:');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error('Data:', error.response.data);
        } else if (error.request) {
            console.error('No response received from backend');
            console.error('Possible issues:');
            console.error('  - Backend is not running');
            console.error('  - CORS is blocking the request');
            console.error('  - Network connectivity issue');
        } else {
            console.error('Error:', error.message);
        }
        process.exit(1);
    }
}

testBackend();
