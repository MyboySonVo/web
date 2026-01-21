import React from 'react';
import { ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import './MovieGrid.css';

const MovieGrid = ({ 
  title, 
  movies, 
  columns = 4, 
  showViewAll = true,
  cardSize = 'normal',
  showRating = true
}) => {
  return (
    <section className="movie-grid-section">
      <div className="movie-grid-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            <span className="bullet">●</span>
            {title}
          </h2>
          {showViewAll && (
            <a href="/movies" className="view-all-link">
              Xem tất cả <ChevronRight size={0} />
            </a>
          )}
        </div>

        {/* Movie Grid */}
        <div className={`movie-grid movie-grid-${columns}`}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              size={cardSize}
              showRating={showRating}
              onBookClick={(movie) => {
                console.log('Booking movie:', movie);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieGrid;