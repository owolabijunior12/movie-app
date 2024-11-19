import Image from 'next/image';
import { fetchMovieDetails } from '@/fetchers';
import { MovieDetails } from '@/types';
import { Navbar } from '@/app/components/Navbar';

export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const movie: MovieDetails = await fetchMovieDetails(params.id);

  return (
    <>
      <Navbar />
      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <Image
          width={200}
          height={300}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded"
        />
        <p>{movie.overview}</p>
        <div>
          <h2 className="text-xl font-semibold">Genres:</h2>
          <ul className="list-disc list-inside">
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
