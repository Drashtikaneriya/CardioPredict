// Test Railway Backend Debug Endpoint
// Run with: node test-railway-debug.js

const axios = require('axios');

const BACKEND_URL = 'https://cardiopredict-production.up.railway.app/api';

async function testRailwayDebug() {
    console.log('🔍 Testing Railway Backend Debug Info...\n');
    console.log(`Backend URL: ${BACKEND_URL}\n`);

    try {
        // Test Debug Endpoint
        console.log('📊 Fetching debug information...');
        const debugResponse = await axios.get(`${BACKEND_URL}/debug`);
        console.log('✅ Debug info retrieved!\n');
        console.log('='.repeat(60));
        console.log('DEBUG INFORMATION:');
        console.log('='.repeat(60));
        console.log(JSON.stringify(debugResponse.data, null, 2));
        console.log('='.repeat(60));
        console.log('');

        // Analyze the results
        const data = debugResponse.data;

        console.log('📋 Analysis:');
        console.log('');

        if (data.model_loaded && data.scaler_loaded) {
            console.log('✅ SUCCESS! Model and scaler are loaded correctly.');
            console.log('✅ Backend is ready to make predictions.');
            console.log('');
            console.log('🎉 You can now use the frontend to make predictions!');
        } else {
            console.log('❌ PROBLEM DETECTED:');
            if (!data.predictor_initialized) {
                console.log('   - Predictor not initialized');
            }
            if (!data.model_loaded) {
                console.log('   - Model not loaded');
            }
            if (!data.scaler_loaded) {
                console.log('   - Scaler not loaded');
            }
            console.log('');
            console.log('🔧 Troubleshooting:');
            console.log('');
            console.log('1. Check if model file exists:');
            console.log(`   Model file exists: ${data.model_file_exists}`);
            console.log('');
            console.log('2. Files in backend directory:');
            if (data.files_in_backend && data.files_in_backend.length > 0) {
                console.log(`   ${data.files_in_backend.join(', ')}`);
                if (!data.files_in_backend.includes('cardio_model_lr.pkl')) {
                    console.log('   ⚠️  WARNING: cardio_model_lr.pkl NOT found in backend directory!');
                }
            } else {
                console.log('   No files listed');
            }
            console.log('');
            console.log('3. Check Railway logs for error messages');
            console.log('4. Verify model file is committed to git');
            console.log('5. See RAILWAY_FIX.md for detailed instructions');
        }

    } catch (error) {
        console.error('❌ Error testing backend:');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error('Data:', error.response.data);
        } else if (error.request) {
            console.error('No response received from backend');
            console.error('Backend might be down or unreachable');
        } else {
            console.error('Error:', error.message);
        }
        process.exit(1);
    }
}

testRailwayDebug();
