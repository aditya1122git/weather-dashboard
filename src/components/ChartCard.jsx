import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartCard = ({ temperatureData, humidityData }) => {
  const [chartType, setChartType] = React.useState('temperature');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit'
    });
  };

  const temperatureChartData = {
    labels: temperatureData.map(item => formatDate(item.dt_txt)),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatureData.map(item => Math.round(item.main.temp)),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const humidityChartData = {
    labels: humidityData.map(item => formatDate(item.dt_txt)),
    datasets: [
      {
        label: 'Humidity (%)',
        data: humidityData.map(item => item.main.humidity),
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#f8fafc',
          font: {
            family: 'Inter',
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          family: 'Inter',
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          family: 'Inter',
          size: 13,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'Inter',
            size: 12,
          },
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'Inter',
            size: 12,
          },
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: 'white',
        hoverBorderWidth: 3,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div className="card chart-card slide-in-up">
      <div className="card-header">
        <h2 className="card-title">Weather Analytics</h2>
        <div className="chart-toggles">
          <button
            className={`chart-toggle ${chartType === 'temperature' ? 'active' : ''}`}
            onClick={() => setChartType('temperature')}
          >
            <i className="fas fa-thermometer-half"></i>
            Temperature
          </button>
          <button
            className={`chart-toggle ${chartType === 'humidity' ? 'active' : ''}`}
            onClick={() => setChartType('humidity')}
          >
            <i className="fas fa-tint"></i>
            Humidity
          </button>
        </div>
      </div>
      
      <div className="chart-container">
        {chartType === 'temperature' ? (
          <Line data={temperatureChartData} options={chartOptions} />
        ) : (
          <Bar data={humidityChartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default ChartCard;
