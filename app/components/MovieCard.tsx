/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';
import { Movie } from '../../types';

interface Props {
  movie: Movie;
  onFavoriteToggle?: (movie: Movie) => void;
  isFavorite?: boolean;
}

export default function MovieCard({ movie, onFavoriteToggle, isFavorite }: Props) {
  return (
    <div className='w-full gap-0 '>
      <div className="bg-gray-800  rounded-lg overflow-hidden shadow-md">
    
         <Image width={100} height={100} 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}        
      />
        
      
      <div className="p-4">
        <h3 className="text-xl text-inherit font-bold">{movie.title}</h3>
        <p className="text-gray-400">Release Date: {movie.release_date}</p>
        <p className="text-yellow-400">Rating: {movie.vote_average}</p>
        {onFavoriteToggle && (
          <button
            onClick={() => onFavoriteToggle(movie)}
            className={`mt-2 px-4 py-2 rounded ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} text-white`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        )}
      </div>
    </div>  
    </div>
    
  );
}
