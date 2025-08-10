import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import ChartCard from './components/ChartCard';
import WeatherAnimations from './components/WeatherAnimations';
import LoadingSpinner from './components/LoadingSpinner';

const API_KEY = 'd1bcdc4ba2b535a97d376b6e76ef48e1'; // Your OpenWeatherMap API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Delhi');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [activeMapLayer, setActiveMapLayer] = useState('temp');

  // Mock data for demonstration (replace with real API calls)
  const mockCurrentWeather = {
    name: 'Delhi',
    main: {
      temp: 28,
      feels_like: 32,
      humidity: 65,
      pressure: 1013
    },
    weather: [{
      main: 'Rain',
      description: 'light rain',
      icon: '10d'
    }],
    wind: {
      speed: 5.2,
      deg: 240
    },
    visibility: 10000,
    sys: {
      sunrise: 1643000000,
      sunset: 1643040000
    }
  };

  const mockForecast = {
    list: [
      {
        dt: 1643000000,
        main: { temp: 25, humidity: 70 },
        weather: [{ main: 'Clouds', icon: '03d' }],
        dt_txt: '2024-01-20 12:00:00'
      },
      {
        dt: 1643086400,
        main: { temp: 23, humidity: 75 },
        weather: [{ main: 'Rain', icon: '10d' }],
        dt_txt: '2024-01-21 12:00:00'
      },
      {
        dt: 1643172800,
        main: { temp: 26, humidity: 68 },
        weather: [{ main: 'Clear', icon: '01d' }],
        dt_txt: '2024-01-22 12:00:00'
      },
      {
        dt: 1643259200,
        main: { temp: 29, humidity: 60 },
        weather: [{ main: 'Clear', icon: '01d' }],
        dt_txt: '2024-01-23 12:00:00'
      },
      {
        dt: 1643345600,
        main: { temp: 27, humidity: 65 },
        weather: [{ main: 'Clouds', icon: '02d' }],
        dt_txt: '2024-01-24 12:00:00'
      }
    ]
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      // Real API calls
      const currentResponse = await fetch(
        `${API_BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await fetch(
        `${API_BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('Weather data not found');
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      setCurrentWeather(currentData);
      setForecast(forecastData);
      setLoading(false);
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
      
      // Fallback to mock data if API fails
      console.log('API failed, using mock data:', err);
      setTimeout(() => {
        setCurrentWeather(mockCurrentWeather);
        setForecast(mockForecast);
        setLoading(false);
        setError(null);
      }, 1000);
    }
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'light' : 'dark');
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleMapLayerChange = (layer) => {
    setActiveMapLayer(layer);
    // Update iframe src based on selected layer
    const iframe = document.querySelector('.map-frame iframe');
    if (iframe && currentWeather) {
      const layerMap = {
        'temp': 'temperature',
        'precipitation': 'precipitation',
        'wind': 'wind',
        'clouds': 'clouds'
      };
      const newSrc = `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=${layerMap[layer]}&lat=${currentWeather.coord?.lat || 28.6139}&lon=${currentWeather.coord?.lon || 77.2090}&zoom=10`;
      iframe.src = newSrc;
    }
  };

  const generateWeatherAlerts = () => {
    if (!currentWeather) return [];
    
    const alerts = [];
    const temp = currentWeather.main.temp;
    const humidity = currentWeather.main.humidity;
    const windSpeed = currentWeather.wind?.speed || 0;
    const condition = currentWeather.weather[0].main.toLowerCase();
    const pressure = currentWeather.main.pressure;
    
    // Temperature alerts
    if (temp > 35) {
      alerts.push({
        type: 'warning',
        title: 'Extreme Heat Warning',
        message: `Very high temperature of ${Math.round(temp)}°C. Stay hydrated and avoid outdoor activities.`,
        time: 'Just now',
        icon: 'fas fa-thermometer-full'
      });
    } else if (temp < 5) {
      alerts.push({
        type: 'warning',
        title: 'Cold Weather Alert',
        message: `Low temperature of ${Math.round(temp)}°C. Dress warmly and be cautious of icy conditions.`,
        time: 'Just now',
        icon: 'fas fa-snowflake'
      });
    }
    
    // Weather condition alerts
    if (condition.includes('rain') || condition.includes('drizzle')) {
      alerts.push({
        type: 'info',
        title: 'Rain Alert',
        message: `${currentWeather.weather[0].description}. Carry an umbrella and drive carefully.`,
        time: 'Just now',
        icon: 'fas fa-cloud-rain'
      });
    }
    
    if (condition.includes('thunderstorm')) {
      alerts.push({
        type: 'warning',
        title: 'Thunderstorm Warning',
        message: 'Thunderstorm conditions detected. Stay indoors and avoid open areas.',
        time: 'Just now',
        icon: 'fas fa-bolt'
      });
    }
    
    if (condition.includes('snow')) {
      alerts.push({
        type: 'warning',
        title: 'Snow Alert',
        message: 'Snow conditions detected. Exercise caution while traveling.',
        time: 'Just now',
        icon: 'fas fa-snowflake'
      });
    }
    
    // Wind alerts
    if (windSpeed > 10) {
      alerts.push({
        type: 'info',
        title: 'High Wind Alert',
        message: `Strong winds at ${windSpeed.toFixed(1)} m/s. Secure loose objects and be cautious outdoors.`,
        time: 'Just now',
        icon: 'fas fa-wind'
      });
    }
    
    // Humidity alerts
    if (humidity > 80) {
      alerts.push({
        type: 'info',
        title: 'High Humidity',
        message: `Very humid conditions at ${humidity}%. May feel uncomfortable outdoors.`,
        time: 'Just now',
        icon: 'fas fa-tint'
      });
    }
    
    // Pressure alerts
    if (pressure < 1000) {
      alerts.push({
        type: 'info',
        title: 'Low Pressure System',
        message: `Low atmospheric pressure (${pressure} hPa). Weather changes possible.`,
        time: 'Just now',
        icon: 'fas fa-compress-arrows-alt'
      });
    }
    
    // Visibility alerts
    if (currentWeather.visibility && currentWeather.visibility < 5000) {
      alerts.push({
        type: 'warning',
        title: 'Poor Visibility',
        message: `Limited visibility of ${Math.round(currentWeather.visibility / 1000)} km. Drive with caution.`,
        time: 'Just now',
        icon: 'fas fa-eye-slash'
      });
    }
    
    // Good weather conditions
    if (condition.includes('clear') && temp >= 20 && temp <= 30 && windSpeed < 5) {
      alerts.push({
        type: 'success',
        title: 'Perfect Weather',
        message: `Excellent conditions with ${Math.round(temp)}°C and clear skies. Great day for outdoor activities!`,
        time: 'Just now',
        icon: 'fas fa-sun'
      });
    }
    
    // Default message if no specific alerts
    if (alerts.length === 0) {
      alerts.push({
        type: 'success',
        title: 'Normal Weather Conditions',
        message: `Current conditions are normal with ${Math.round(temp)}°C and ${currentWeather.weather[0].description}.`,
        time: 'Just now',
        icon: 'fas fa-check-circle'
      });
    }
    
    return alerts;
  };

  const getCurrentWeatherCondition = () => {
    if (!currentWeather) return 'clear';
    const condition = currentWeather.weather[0].main.toLowerCase();
    if (condition.includes('rain') || condition.includes('drizzle')) return 'rain';
    if (condition.includes('snow')) return 'snow';
    if (condition.includes('cloud')) return 'clouds';
    return 'clear';
  };

  return (
    <div className="app" data-theme={isDarkTheme ? 'dark' : 'light'}>
      <WeatherAnimations condition={getCurrentWeatherCondition()} />
      
      <Header 
        onSearch={handleSearch} 
        onThemeToggle={handleThemeToggle}
        onSectionChange={handleSectionChange}
        activeSection={activeSection}
        isDarkTheme={isDarkTheme}
      />
      
      <main className="main-content">
        {activeSection === 'home' && (
          <>
            {loading && <LoadingSpinner />}
            
            {error && (
              <div className="error-message fade-in">
                <i className="fas fa-exclamation-triangle"></i>
                <p>{error}</p>
              </div>
            )}
            
            {!loading && !error && currentWeather && (
              <div className="dashboard-grid fade-in">
                <WeatherCard weather={currentWeather} />
                
                {forecast && (
                  <>
                    <ForecastCard forecast={forecast.list.slice(0, 5)} />
                    <ChartCard 
                      temperatureData={forecast.list.slice(0, 7)} 
                      humidityData={forecast.list.slice(0, 7)} 
                    />
                  </>
                )}
              </div>
            )}
          </>
        )}

        {activeSection === 'analytics' && (
          <div className="section-content fade-in">
            <div className="section-header">
              <h2><i className="fas fa-chart-line"></i> Weather Analytics</h2>
              <p>Real-time weather data analysis for {currentWeather?.name || city}</p>
            </div>
            {currentWeather && forecast ? (
              <div className="analytics-grid">
                <div className="analytics-card glass-card">
                  <h3>Temperature Analysis</h3>
                  <div className="trend-chart">
                    <div className="analytics-data">
                      <div className="data-point">
                        <span className="label">Current:</span>
                        <span className="value">{Math.round(currentWeather.main.temp)}°C</span>
                      </div>
                      <div className="data-point">
                        <span className="label">Feels like:</span>
                        <span className="value">{Math.round(currentWeather.main.feels_like)}°C</span>
                      </div>
                      <div className="data-point">
                        <span className="label">7-day average:</span>
                        <span className="value">{Math.round(forecast.list.slice(0, 7).reduce((acc, item) => acc + item.main.temp, 0) / 7)}°C</span>
                      </div>
                      <div className="data-point">
                        <span className="label">Min/Max today:</span>
                        <span className="value">{Math.round(currentWeather.main.temp_min)}°/{Math.round(currentWeather.main.temp_max)}°C</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="analytics-card glass-card">
                  <h3>Humidity & Pressure</h3>
                  <div className="trend-chart">
                    <div className="analytics-data">
                      <div className="data-point">
                        <span className="label">Humidity:</span>
                        <span className="value">{currentWeather.main.humidity}%</span>
                      </div>
                      <div className="data-point">
                        <span className="label">Pressure:</span>
                        <span className="value">{currentWeather.main.pressure} hPa</span>
                      </div>
                      <div className="data-point">
                        <span className="label">Avg humidity (7-day):</span>
                        <span className="value">{Math.round(forecast.list.slice(0, 7).reduce((acc, item) => acc + item.main.humidity, 0) / 7)}%</span>
                      </div>
                      <div className="data-point">
                        <span className="label">Visibility:</span>
                        <span className="value">{currentWeather.visibility ? Math.round(currentWeather.visibility / 1000) : 'N/A'} km</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="analytics-card glass-card">
                  <h3>Wind Analysis</h3>
                  <div className="trend-chart">
                    <div className="analytics-data">
                      <div className="data-point">
                        <span className="label">Wind Speed:</span>
                        <span className="value">{currentWeather.wind?.speed || 0} m/s</span>
                      </div>
                      <div className="data-point">
                        <span className="label">Direction:</span>
                        <span className="value">{currentWeather.wind?.deg || 0}°</span>
                      </div>
                      <div className="data-point">
                        <span className="label">Condition:</span>
                        <span className="value">{currentWeather.weather[0].description}</span>
                      </div>
                      <div className="data-point">
                        <span className="label">Cloud Cover:</span>
                        <span className="value">{currentWeather.clouds?.all || 0}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="loading-message">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Loading weather analytics...</p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'map' && (
          <div className="section-content fade-in">
            <div className="section-header">
              <h2><i className="fas fa-map"></i> Weather Map</h2>
              <p>Interactive weather visualization for {currentWeather?.name || city}</p>
            </div>
            <div className="map-container glass-card">
              {currentWeather ? (
                <div className="weather-map-content">
                  <div className="map-controls">
                    <div className="map-layers">
                      <button 
                        className={`layer-btn ${activeMapLayer === 'temp' ? 'active' : ''}`} 
                        onClick={() => handleMapLayerChange('temp')}
                      >
                        <i className="fas fa-thermometer-half"></i>
                        Temperature
                      </button>
                      <button 
                        className={`layer-btn ${activeMapLayer === 'precipitation' ? 'active' : ''}`} 
                        onClick={() => handleMapLayerChange('precipitation')}
                      >
                        <i className="fas fa-cloud-rain"></i>
                        Precipitation
                      </button>
                      <button 
                        className={`layer-btn ${activeMapLayer === 'wind' ? 'active' : ''}`} 
                        onClick={() => handleMapLayerChange('wind')}
                      >
                        <i className="fas fa-wind"></i>
                        Wind Speed
                      </button>
                      <button 
                        className={`layer-btn ${activeMapLayer === 'clouds' ? 'active' : ''}`} 
                        onClick={() => handleMapLayerChange('clouds')}
                      >
                        <i className="fas fa-cloud"></i>
                        Clouds
                      </button>
                    </div>
                  </div>
                  
                  <div className="map-display">
                    <div className="map-frame">
                      <iframe
                        src={`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${currentWeather.coord?.lat || 28.6139}&lon=${currentWeather.coord?.lon || 77.2090}&zoom=10`}
                        width="100%"
                        height="500"
                        frameBorder="0"
                        title="Weather Map"
                        style={{borderRadius: 'var(--radius-lg)'}}
                      ></iframe>
                    </div>
                  </div>
                  
                  <div className="map-info">
                    <div className="current-location">
                      <h4><i className="fas fa-map-marker-alt"></i> Current Location</h4>
                      <div className="location-details">
                        <div className="detail-item">
                          <span className="label">City:</span>
                          <span className="value">{currentWeather.name}, {currentWeather.sys?.country}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Coordinates:</span>
                          <span className="value">{currentWeather.coord?.lat?.toFixed(4)}°, {currentWeather.coord?.lon?.toFixed(4)}°</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Current Weather:</span>
                          <span className="value">{currentWeather.weather[0].description} ({Math.round(currentWeather.main.temp)}°C)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="map-legend">
                      <h4><i className="fas fa-info-circle"></i> Map Legend</h4>
                      <div className="legend-items">
                        <div className="legend-item">
                          <div className="legend-color" style={{background: 'linear-gradient(90deg, #313695, #4575b4, #74add1, #abd9e9, #e0f3f8, #ffffcc, #fee090, #fdae61, #f46d43, #d73027, #a50026)'}}></div>
                          <span>Temperature Scale (°C)</span>
                        </div>
                        <div className="legend-item">
                          <div className="legend-color" style={{background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(0,100,255,0.3), rgba(0,100,255,0.8))'}}></div>
                          <span>Precipitation Intensity</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="satellite-options">
                    <button className="btn-primary" onClick={() => window.open(`https://zoom.earth/#view=${currentWeather.coord?.lat || 28.6139},${currentWeather.coord?.lon || 77.2090},8z/date=2024-01-01,pm/layers=radar`, '_blank')}>
                      <i className="fas fa-satellite"></i>
                      View Satellite Data
                    </button>
                    <button className="btn-secondary" onClick={() => window.open(`https://openweathermap.org/city/${currentWeather.id}`, '_blank')}>
                      <i className="fas fa-external-link-alt"></i>
                      Full Weather Map
                    </button>
                  </div>
                </div>
              ) : (
                <div className="loading-message">
                  <i className="fas fa-spinner fa-spin"></i>
                  <p>Loading weather map data...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === 'alerts' && (
          <div className="section-content fade-in">
            <div className="section-header">
              <h2><i className="fas fa-bell"></i> Weather Alerts</h2>
              <p>Real-time weather conditions and safety recommendations for {currentWeather?.name || city}</p>
            </div>
            <div className="alerts-container">
              {currentWeather ? (
                generateWeatherAlerts().map((alert, index) => (
                  <div key={index} className={`alert-card ${alert.type} glass-card`}>
                    <div className="alert-icon">
                      <i className={alert.icon}></i>
                    </div>
                    <div className="alert-content">
                      <h4>{alert.title}</h4>
                      <p>{alert.message}</p>
                      <span className="alert-time">{alert.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="loading-message">
                  <i className="fas fa-spinner fa-spin"></i>
                  <p>Loading weather alerts...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      
      <Footer onSectionChange={setActiveSection} />
    </div>
  );
}

export default App;
