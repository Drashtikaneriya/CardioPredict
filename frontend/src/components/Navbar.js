import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHeartbeat, FaHome, FaChartBar, FaStethoscope } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <FaHeartbeat className="logo-icon" />
                    <span>CardioPredict</span>
                </Link>

                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className={`nav-link ${isActive('/')}`}>
                            <FaHome className="nav-icon" />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/predict" className={`nav-link ${isActive('/predict')}`}>
                            <FaStethoscope className="nav-icon" />
                            <span>Predict</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/insights" className={`nav-link ${isActive('/insights')}`}>
                            <FaChartBar className="nav-icon" />
                            <span>Insights</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
