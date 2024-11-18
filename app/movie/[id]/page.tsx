import { fetchMovieDetails } from '../../../fetchers';
import { MovieDetails } from '../../../types';

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movie: MovieDetails = await fetchMovieDetails(params.id);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <div>
        <h2>Genres:</h2>
        <ul>
          {movie.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        </div>
    </div>
  );
}
