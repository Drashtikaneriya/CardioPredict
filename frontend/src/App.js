import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PredictPage from './pages/PredictPage';
import ResultPage from './pages/ResultPage';
import InsightsPage from './pages/InsightsPage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/predict" element={<PredictPage />} />
                        <Route path="/result" element={<ResultPage />} />
                        <Route path="/insights" element={<InsightsPage />} />
                    </Routes>
                </main>
                <footer className="app-footer">
                    <p>© 2026 CardioPredict | Cardiovascular Disease Prediction System</p>
                    <p className="footer-disclaimer">
                        For educational and informational purposes only. Not a substitute for professional medical advice.
                    </p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
