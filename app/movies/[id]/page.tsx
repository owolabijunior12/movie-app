'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchMovieDetails } from "@/lib/api";
import Image from "next/image";
import { MovieDetails } from "@/types";

const MovieDetailsPage = () => {
  const { id } = useParams(); // Get the dynamic route parameter
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const loadMovieDetails = async () => {
      setLoading(true);
      try {
        const data: MovieDetails = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (!movie) {
    return <p className="text-center mt-4">Movie not found.</p>;
  }

  return (
    <div className="p-4 flex justify-center items-center">
      <div className="w-full p-5 max-w-5xl bg-white shadow-md rounded-lg">
        {/* Movie Poster and Backdrop */}
        <div className="relative h-[70vh] mb-4 rounded-t-lg overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w500${ movie.poster_path}`}
            alt={movie.title}
            layout="fill"                       
            className="rounded-t-lg w-full object-fill"
          />
        </div>
        <div className="p-4">
          {/* Title and Tagline */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{movie.title}</h1>
          {/* <p className="text-sm text-gray-500 italic mb-4">{movie.tagline}</p> */}

          {/* Key Details */}
          <p className="text-sm text-gray-500 mb-2">
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            {/* <strong>Runtime:</strong> {movie.runtime} minutes */}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            {/* <strong>Budget:</strong> ${movie.budget.toLocaleString()} */}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            {/* <strong>Revenue:</strong> ${movie.revenue.toLocaleString()} */}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            {/* <strong>Popularity:</strong> {movie.popularity} */}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <strong>Vote Average:</strong> ⭐ {movie.vote_average} 
          </p>

          {/* Genres */}
          <p className="text-sm text-gray-500 mb-2">
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>

          {/* Overview */}
          <p className="text-sm text-gray-700 mb-4">
            <strong>Overview:</strong> {movie.overview}
          </p>

          {/* Homepage */}
          {/* {movie.homepage && (
            <p className="text-sm text-blue-500 mb-4">
              <strong>Homepage:</strong>{" "}
              <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                {movie.homepage}
              </a>
            </p>
          )} */}

          {/* Production Companies */}
          <p className="text-sm text-gray-500">
            {/* <strong>Production Companies:</strong>{" "} */}
            {/* {movie.production_companies.map((company) => company.name).join(", ")} */}
          </p>
        </div>
        <div className="p-4 flex justify-between">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600">
            Add to Favourite
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
