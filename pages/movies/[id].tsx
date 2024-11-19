import { GetServerSideProps } from "next";
import { fetchMovieDetails } from "../../lib/api";
import { MovieDetails } from "../../types";
import Image from "next/image";

interface Props {
  movie: MovieDetails;
}

const MovieDetailsPage = ({ movie }: Props) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
       <Image width={100} height={100} 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="my-4 rounded"
      />
      <p>{movie.overview}</p>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Genres</h2>
        <ul className="list-disc list-inside">
          {movie.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const movie = await fetchMovieDetails(Number(id));
  return { props: { movie } };
};

export default MovieDetailsPage;
