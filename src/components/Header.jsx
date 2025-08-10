import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Header = ({ onSearch, onThemeToggle, onSectionChange, activeSection, isDarkTheme }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Popular cities database for autocomplete
  const popularCities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow','Patna',
    'Ahmedabad', 'Surat', 'Jaipur', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
    'Nagpur', 'Vadodara', 'Ghaziabad', 'Ludhiana',
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Leicester',
    'Tokyo', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama', 'Hiroshima',
    'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille',
    'Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund', 'Essen',
    'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Newcastle', 'Wollongong', 'Geelong', 'Hobart',
    'Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener',
    'Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hangzhou', 'Wuhan', 'Dongguan', 'Chongqing', 'Nanjing',
    'São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Goiânia',
    'Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Nizhny Novgorod', 'Kazan', 'Chelyabinsk', 'Omsk', 'Samara', 'Rostov-on-Don',
    'Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain',
    'Singapore', 'Kuala Lumpur', 'Bangkok', 'Jakarta', 'Manila', 'Ho Chi Minh City', 'Hanoi', 'Yangon', 'Phnom Penh', 'Vientiane'
  ];
  


  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: 'Good Morning', icon: 'fas fa-sun', color: 'var(--sunny)' };
    if (hour < 17) return { text: 'Good Afternoon', icon: 'fas fa-sun', color: 'var(--sunny)' };
    if (hour < 21) return { text: 'Good Evening', icon: 'fas fa-cloud-sun', color: 'var(--accent-yellow)' };
    return { text: 'Good Night', icon: 'fas fa-moon', color: 'var(--accent-purple)' };
  };

  const greeting = getGreeting();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && onSearch) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log('Search input:', value); // Debug
    setSearchTerm(value);
    
    if (value.length > 0) {
      const filteredSuggestions = popularCities
        .filter(city => city.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8); // Show max 8 suggestions
      console.log('Filtered suggestions:', filteredSuggestions); // Debug
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      console.log('Show suggestions set to true'); // Debug
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    setSearchTerm(city);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(city);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow click events
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleInputFocus = () => {
    if (searchTerm.length > 0 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleQuickCitySelect = (city) => {
    if (onSearch) {
      onSearch(city);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-background"></div>
      <div className="header-content">
        <div className="header-left">
          <div className="logo-section">
            <div className="logo-icon">
              <i className="fas fa-cloud-sun-rain"></i>
              <div className="logo-glow"></div>
            </div>
            <div className="brand-info" onClick={() => onSectionChange('home')} style={{ cursor: 'pointer' }}>
              <h1 className="brand-title gradient-text">
                WeatherPro
              </h1>
              <p className="brand-tagline">
                Smart Weather Dashboard
              </p>
            </div>
          </div>
        </div>
        
        <div className="header-center">
          <div className="greeting-section">
            <div className="greeting-icon" style={{ color: greeting.color }}>
              <i className={greeting.icon}></i>
            </div>
            <div className="greeting-text">
              <span className="greeting-message">{greeting.text}</span>
              <span className="location-hint">
                <i className="fas fa-globe"></i>
                Global Weather Data
              </span>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <div className="time-section">
            <div className="digital-clock">
              <div className="time-display">
                <span className="time-text">{formatTime(currentTime)}</span>
                <div className="time-dots">
                  <span className="dot active"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
              <div className="date-display">
                <span className="date-text">{formatDate(currentTime)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Combined Section */}
        <div className="mobile-combined-section">
          <div className="mobile-greeting-time">
            <div className="mobile-greeting">
              <div className="greeting-icon" style={{ color: greeting.color }}>
                <i className={greeting.icon}></i>
              </div>
              <span className="greeting-message">{greeting.text}</span>
            </div>
            <div className="mobile-time">
              <span className="time-text">{formatTime(currentTime)}</span>
              <span className="date-text">{formatDate(currentTime)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simplified Navigation */}
      <nav className="nav-menu">
        <div className="nav-container">
          <div className="nav-left">
            <div className="nav-items">
              <button 
                className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => onSectionChange('home')}
              >
                <i className="fas fa-home"></i>
                <span>Home</span>
              </button>
              <button 
                className={`nav-item ${activeSection === 'analytics' ? 'active' : ''}`}
                onClick={() => onSectionChange('analytics')}
              >
                <i className="fas fa-chart-line"></i>
                <span>Analytics</span>
              </button>
              <button 
                className={`nav-item ${activeSection === 'map' ? 'active' : ''}`}
                onClick={() => onSectionChange('map')}
              >
                <i className="fas fa-map"></i>
                <span>Map</span>
              </button>
              <button 
                className={`nav-item ${activeSection === 'alerts' ? 'active' : ''}`}
                onClick={() => onSectionChange('alerts')}
              >
                <i className="fas fa-bell"></i>
                <span>Alerts</span>
              </button>
              <button className="theme-switcher" title="Toggle Theme" onClick={onThemeToggle}>
                <i className={isDarkTheme ? "fas fa-sun" : "fas fa-moon"}></i>
                <span>{isDarkTheme ? "Light" : "Dark"}</span>
              </button>
            </div>
          </div>
          
          <div className="nav-center" style={{position: 'relative'}}>
            <form onSubmit={handleSearchSubmit} className="quick-search">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search cities..."
                className="quick-search-input"
                value={searchTerm}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                autoComplete="off"
              />
              <button type="submit" className="search-submit-btn">
                <i className="fas fa-search" style={{ color: 'white' }}></i>
              </button>
            </form>
            {/* Always render suggestions dropdown for accessibility, but only show when needed */}
            <div className={`search-suggestions${showSuggestions && suggestions.length > 0 ? ' show' : ''}`}>
              {showSuggestions && suggestions.length > 0 && suggestions.map((city, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onMouseDown={() => handleSuggestionClick(city)}
                >
                  <i className="fas fa-map-marker-alt"></i>
                  <span className="city-name">{city}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="nav-right">
            {/* Theme button moved to nav-left with other navigation items */}
          </div>
        </div>
      </nav>
      
      {/* Quick City Access */}
      <div className="quick-cities">
        <div className="quick-cities-container">
          <span className="quick-cities-label">Quick access:</span>
          <div className="city-buttons">
            {['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'].map(city => (
              <button
                key={city}
                onClick={() => handleQuickCitySelect(city)}
                className="city-button hover-scale"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="header-decoration">
        <div className="floating-elements">
          <div className="floating-icon cloud-1">☁️</div>
          <div className="floating-icon sun-1">☀️</div>
          <div className="floating-icon rain-1">🌧️</div>
          <div className="floating-icon cloud-2">⛅</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
