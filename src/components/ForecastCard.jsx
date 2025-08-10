import React from 'react';

const ForecastCard = ({ forecast }) => {
  const getWeatherIcon = (condition) => {
    const iconMap = {
      'clear': 'fas fa-sun',
      'clouds': 'fas fa-cloud',
      'rain': 'fas fa-cloud-rain',
      'drizzle': 'fas fa-cloud-drizzle',
      'thunderstorm': 'fas fa-bolt',
      'snow': 'fas fa-snowflake',
      'mist': 'fas fa-smog',
      'fog': 'fas fa-smog'
    };
    
    return iconMap[condition.toLowerCase()] || 'fas fa-cloud';
  };

  const getWeatherColor = (condition) => {
    const colorMap = {
      'clear': 'var(--sunny)',
      'clouds': 'var(--cloudy)',
      'rain': 'var(--rainy)',
      'drizzle': 'var(--rainy)',
      'thunderstorm': 'var(--accent-purple)',
      'snow': 'var(--snowy)',
      'mist': 'var(--cloudy)',
      'fog': 'var(--cloudy)'
    };
    
    return colorMap[condition.toLowerCase()] || 'var(--primary-blue)';
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  return (
    <div className="card forecast-card slide-in-up">
      <div className="card-header">
        <h2 className="card-title">5-Day Forecast</h2>
        <i className="fas fa-calendar-week card-icon"></i>
      </div>
      
      <div className="forecast-container">
        {forecast.map((item, index) => (
          <div key={index} className="forecast-item hover-scale">
            <div className="forecast-day">
              {formatDay(item.dt_txt)}
            </div>
            <div 
              className="forecast-icon"
              style={{ color: getWeatherColor(item.weather[0].main) }}
            >
              <i className={getWeatherIcon(item.weather[0].main)}></i>
            </div>
            <div className="forecast-temp">
              {Math.round(item.main.temp)}°C
            </div>
            <div className="forecast-humidity">
              <i className="fas fa-tint"></i> {item.main.humidity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
