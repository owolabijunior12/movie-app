import { MovieDetails, MoviesResponse } from '@/types';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const fetchMovies = async (page = 1): Promise<MoviesResponse> => {
  const response = await axios.get(`${API_URL}/movie/popular`, {
    params: { api_key: API_KEY, page },
  });
  return response.data;
};

export const fetchMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await axios.get(`${API_URL}/movie/${id}`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};