'use client';

import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { Movie } from '../../types';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (movie: Movie) => {
    const updatedFavorites = favorites.find((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">My Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onFavoriteToggle={toggleFavorite} isFavorite />
        ))}
      </div>
    </div>
  );
}
