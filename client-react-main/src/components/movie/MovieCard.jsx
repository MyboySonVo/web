import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie, size = 'big' }) => {
  const { image, genre, title, releaseDate } = movie;

  return (
    <div className={`movie-card ${size === 'big' ? 'movie-card-big' : 'movie-card-small'}`}>
      <div className="movie-poster">
        <img src={movie.image} alt={movie.title || "Movie Poster"} loading="lazy" />
        <div className="movie-overlay">
          <Link 
            to="/banner" 
            state={{ movieData: movie }}
            className="btn-booking"
          >
            Đặt vé
          </Link>
        </div>
      </div>
      
      <div className="movie-info">
        <p className="movie-genre-date">{genre} {releaseDate}</p>
        <h3 className="movie-title">{title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;