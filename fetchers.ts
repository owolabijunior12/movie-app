const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies(page: number = 1) {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`);
  console.log(response);
  
  if (!response.ok) throw new Error('Failed to fetch popular movies');
  return response.json();
}

export async function fetchMovieDetails(movieId: string) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
  console.log(response);
  
  if (!response.ok) throw new Error('Failed to fetch movie details');
  return response.json();
}
export async function searchQueries(query: string) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
 query
        )}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
  
      if (!res.ok) {
        console.error(`Error: ${res.status} ${res.statusText}`);
        throw new Error('Failed to fetch movie details');
      }
  
      return await res.json(); // Return parsed JSON response
    } catch (error) {
      console.error('An error occurred while fetching movie details:', error);
      throw error;
    }
  }
  
export async function fetchMovieTrailer(movieId: number) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
  if (!response.ok) throw new Error('Failed to fetch movie trailer');
  const data = await response.json();
  console.log(data)
  // Find the official trailer or fallback to the first video
  const trailer = data.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
  return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
}
