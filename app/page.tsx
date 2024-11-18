'use client';

import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import { fetchPopularMovies } from '../fetchers';
import { Movie } from '../types';

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchPopularMovies();
        setMovies(data.results);
        setFilteredMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadMovies();
  }, []);

  const handleSearch = (query: string) => {
    setFilteredMovies(movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase())));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
