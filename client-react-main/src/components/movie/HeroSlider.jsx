import React from 'react';
import './HeroSlider.css';

const HeroSlider = ({ movies }) => {
  const mainMovie = movies[0];
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-banner">
          <img 
            src={mainMovie.image} 
            alt={mainMovie.title} 
            className="banner-image" 
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;