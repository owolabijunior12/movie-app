'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";  // Use useParams in App Router
import { fetchMovieDetails } from "../../../lib/api";
import { MovieDetails } from "../../../types";
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
  const { id } = useParams();  // Get the dynamic id from the route params
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;  // Exit if the id is not available

    const loadMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(id as string);  // Fetch movie details using id
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);  // Effect runs whenever `id` changes

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (!movie) {
    return <p className="text-center mt-4">Movie not found.</p>;
  }

  return (
    <div className="p-4 flex justify-center items-center">
      <Card className="w-full p-3 max-w-3xl">
        <CardHeader color="blue-gray" className="relative h-96">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-4">
            {movie.title}
          </Typography>
          <Typography className="text-sm text-gray-500 mb-2">
            <strong>Release Date:</strong> {movie.release_date}
          </Typography>
          <Typography className="text-sm text-gray-500 mb-2">
            <strong>Runtime:</strong> {movie.runtime} minutes
          </Typography>
          <Typography className="text-sm text-gray-500 mb-2">
            <strong>Popularity:</strong> {movie.popularity}
          </Typography>
          <Typography className="text-sm text-yellow-500 mb-4">
            <strong>Rating:</strong> ⭐ {movie.vote_average} / 10
          </Typography>
          <Typography className="text-sm text-gray-700 mb-4">
            <strong>Overview:</strong> {movie.overview}
          </Typography>
          <Typography className="text-sm text-gray-500">
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
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
