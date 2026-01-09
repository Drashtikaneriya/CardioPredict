import React from 'react';
import '../styles/MetricCard.css';

const MetricCard = ({ title, value, icon: Icon, color, description }) => {
    const percentage = (value * 100).toFixed(1);

    return (
        <div className="metric-card" style={{ borderTopColor: color }}>
            <div className="metric-icon" style={{ color }}>
                <Icon />
            </div>
            <div className="metric-content">
                <h3 className="metric-title">{title}</h3>
                <div className="metric-value">{percentage}%</div>
                {description && <p className="metric-description">{description}</p>}
            </div>
            <div className="metric-bar">
                <div
                    className="metric-bar-fill"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
};

export default MetricCard;
