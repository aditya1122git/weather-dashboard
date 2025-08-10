import React from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
    }
  };

  const popularCities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];

  return (
    <div className="search-container slide-in-up">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </form>
      
      <div className="popular-cities">
        <span className="popular-label">Popular cities:</span>
        <div className="city-buttons">
          {popularCities.map(city => (
            <button
              key={city}
              onClick={() => onSearch(city)}
              className="city-button hover-scale"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
