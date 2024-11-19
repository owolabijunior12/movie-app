'use client'
import { useState, useEffect } from "react";
import { fetchMovies } from "../lib/api";
import { Movie } from "../types";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchMovies(page);
      setMovies((prev) => [...prev, ...data.results]);
      setHasMore(data.results.length > 0);
      setLoading(false);
    };
    loadMovies();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full p-2 border rounded mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredMovies.map((movie) => (
          <Link key={movie.title} href={`/movies/${movie.id}`}>
            <div className="cursor-pointer">
              <Image
                width={100} height={100} 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded"
              />
              <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
              <p className="text-sm text-gray-500">{movie.release_date}</p>
              <p className="text-sm text-yellow-500">⭐ {movie.vote_average}</p>
            </div>
          </Link>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
};

export default HomePage;
