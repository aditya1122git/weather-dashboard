import React from 'react';

const WeatherCard = ({ weather }) => {
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

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="card weather-card slide-in-up">
      <div className="card-header">
        <h2 className="card-title">Current Weather</h2>
        <i className="fas fa-location-dot card-icon"></i>
      </div>
      
      <div className="weather-main">
        <div className="weather-location">{weather.name}</div>
        <div 
          className="weather-icon bounce" 
          style={{ color: getWeatherColor(weather.weather[0].main) }}
        >
          <i className={getWeatherIcon(weather.weather[0].main)}></i>
        </div>
        <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
        <div className="weather-description">{weather.weather[0].description}</div>
        <div className="feels-like">
          Feels like {Math.round(weather.main.feels_like)}°C
        </div>
      </div>
      
      <div className="weather-details">
        <div className="weather-detail hover-scale">
          <div className="weather-detail-icon">
            <i className="fas fa-eye"></i>
          </div>
          <div className="weather-detail-label">Visibility</div>
          <div className="weather-detail-value">{(weather.visibility / 1000).toFixed(1)} km</div>
        </div>
        
        <div className="weather-detail hover-scale">
          <div className="weather-detail-icon">
            <i className="fas fa-tint"></i>
          </div>
          <div className="weather-detail-label">Humidity</div>
          <div className="weather-detail-value">{weather.main.humidity}%</div>
        </div>
        
        <div className="weather-detail hover-scale">
          <div className="weather-detail-icon">
            <i className="fas fa-wind"></i>
          </div>
          <div className="weather-detail-label">Wind Speed</div>
          <div className="weather-detail-value">{weather.wind.speed} m/s</div>
        </div>
        
        <div className="weather-detail hover-scale">
          <div className="weather-detail-icon">
            <i className="fas fa-thermometer-half"></i>
          </div>
          <div className="weather-detail-label">Pressure</div>
          <div className="weather-detail-value">{weather.main.pressure} hPa</div>
        </div>
        
        <div className="weather-detail hover-scale">
          <div className="weather-detail-icon">
            <i className="fas fa-sunrise"></i>
          </div>
          <div className="weather-detail-label">Sunrise</div>
          <div className="weather-detail-value">{formatTime(weather.sys.sunrise)}</div>
        </div>
        
        <div className="weather-detail hover-scale">
          <div className="weather-detail-icon">
            <i className="fas fa-sunset"></i>
          </div>
          <div className="weather-detail-label">Sunset</div>
          <div className="weather-detail-value">{formatTime(weather.sys.sunset)}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
