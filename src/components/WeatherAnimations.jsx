import React from 'react';

const WeatherAnimations = ({ condition }) => {
  const createRainDrops = () => {
    const drops = [];
    for (let i = 0; i < 50; i++) {
      drops.push(
        <div
          key={i}
          className="rain-drop"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1}s`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`
          }}
        />
      );
    }
    return drops;
  };

  const createSnowFlakes = () => {
    const flakes = [];
    for (let i = 0; i < 30; i++) {
      flakes.push(
        <div
          key={i}
          className="snow-flake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            fontSize: `${0.8 + Math.random() * 0.4}rem`
          }}
        >
          ❄
        </div>
      );
    }
    return flakes;
  };

  const createClouds = () => {
    const clouds = [];
    for (let i = 0; i < 5; i++) {
      clouds.push(
        <div
          key={i}
          className="cloud"
          style={{
            top: `${10 + Math.random() * 40}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        >
          ☁
        </div>
      );
    }
    return clouds;
  };

  return (
    <>
      {condition === 'rain' && (
        <div className="rain-animation">
          {createRainDrops()}
        </div>
      )}
      
      {condition === 'snow' && (
        <div className="snow-animation">
          {createSnowFlakes()}
        </div>
      )}
      
      {condition === 'clouds' && (
        <div className="clouds-animation">
          {createClouds()}
        </div>
      )}
    </>
  );
};

export default WeatherAnimations;
