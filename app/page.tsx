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
  }, [loading, hasMore,handleScroll]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredMovies);
  return (
    <div className="p-4 ">
      <div className="gap-4 flex justify-center items-center flex-wrap">
        <div className="flex w-screen justify-center items-center">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-[40%] p-2 border rounded mb-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="mt-6 h-auto p-2 gap-3 w-80 cursor-pointer bg-white shadow-lg rounded-lg">
            
            <div className=" ">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={100}
                height={100}
                className="rounded-t-lg w-full object-cover"
              />
            </div>
            <div className="p-4">
              
              <h2 className="text-xl font-semibold text-gray-800 space-x-0 mb-2">{movie.title.slice(0,20)}...</h2>
              <p className="text-sm text-gray-500">{movie.release_date}</p>
              
              
              <p className="text-sm text-yellow-500">
                {
                  movie.vote_average >= 5
                    ? "⭐⭐⭐⭐⭐"
                    : movie.vote_average === 4
                    ? "⭐⭐⭐⭐"
                    : movie.vote_average === 3
                    ? "⭐⭐⭐"
                    : movie.vote_average === 2
                    ? "⭐⭐"
                    : movie.vote_average === 1
                    ? "⭐"
                    : "No Rating"
                }{" "}
                {movie.vote_average}
              </p>
            </div>
            <div className="p-4 flex justify-between items-center">
              <Link href={`/movies/${movie.id}`} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                
                  Details
                
              </Link>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
};

export default HomePage;
