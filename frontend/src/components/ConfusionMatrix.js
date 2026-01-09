import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ConfusionMatrix = ({ confusionMatrix }) => {
    const { true_negative, false_positive, false_negative, true_positive } = confusionMatrix;

    const data = {
        labels: ['Predicted: No Disease', 'Predicted: Disease'],
        datasets: [
            {
                label: 'Actual: No Disease',
                data: [true_negative, false_positive],
                backgroundColor: 'rgba(72, 187, 120, 0.7)',
                borderColor: 'rgba(72, 187, 120, 1)',
                borderWidth: 2,
            },
            {
                label: 'Actual: Disease',
                data: [false_negative, true_positive],
                backgroundColor: 'rgba(245, 101, 101, 0.7)',
                borderColor: 'rgba(245, 101, 101, 1)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            title: {
                display: true,
                text: 'Confusion Matrix',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.parsed.y} patients`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Patients',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
        },
    };

    return (
        <div style={{ height: '400px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ConfusionMatrix;
