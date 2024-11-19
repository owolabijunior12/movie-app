'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Use `useParams` for dynamic routing
import { fetchMovieDetails } from "../../../lib/api";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const MovieDetailsPage = () => {
  const { id } = useParams(); // Get the dynamic route parameter
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(id); // Assume this function fetches movie details
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
      <Card className="w-full p-5 max-w-5xl">
        {/* Movie Poster and Backdrop */}
        <CardHeader color="blue-gray" className="relative h-96">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </CardHeader>
        <CardBody>
          {/* Title and Tagline */}
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {movie.title}
          </Typography>
          <Typography className="text-sm text-gray-500 italic mb-4">
            {movie.tagline}
          </Typography>

          {/* Key Details */}
          <Typography className="text-sm text-gray-500 mb-2">
            <strong>Release Date:</strong> {movie.release_date}
          </Typography>
          <Typography className="text-sm text-gray-500 mb-2">
            <strong>Runtime:</strong> {movie.runtime} minutes
          </Typography>
          <Typography className="text-sm text-gray-500 mb-2">
            <strong>Budget:</strong> ${movie.budget.toLocaleString()}
          </Typography>
          <Typography className="text-sm text-gray-500 mb-2">
            <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
          </Typography>
          <Typography className="text-sm text-gray-500 mb-2">
            <strong>Popularity:</strong> {movie.popularity}
          </Typography>
          <Typography className="text-sm text-gray-500 mb-2">
            <strong>Vote Average:</strong> ⭐ {movie.vote_average} ({movie.vote_count} votes)
          </Typography>

          {/* Genres */}
          <Typography className="text-sm text-gray-500 mb-2">
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre: any) => genre.name).join(", ")}
          </Typography>

          {/* Overview */}
          <Typography className="text-sm text-gray-700 mb-4">
            <strong>Overview:</strong> {movie.overview}
          </Typography>

          {/* Homepage */}
          {movie.homepage && (
            <Typography className="text-sm text-blue-500 mb-4">
              <strong>Homepage:</strong>{" "}
              <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                {movie.homepage}
              </a>
            </Typography>
          )}

          {/* Production Companies */}
          <Typography className="text-sm text-gray-500">
            <strong>Production Companies:</strong>{" "}
            {movie.production_companies.map((company: any) => company.name).join(", ")}
          </Typography>
        </CardBody>
        <CardFooter className="pt-4 flex justify-between">
          <Button size="sm" color="blue" onClick={() => window.history.back()}>
            Go Back
          </Button>
          <Button size="sm" color="yellow">
            Add to Favourite
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MovieDetailsPage;
