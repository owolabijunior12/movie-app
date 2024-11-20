'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Movie } from "@/types";  // Adjust the import path if needed
import Link from "next/link";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favourites");
  // console.log(storedFavorites);
  
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Movies</h1>
      
      {favorites.length === 0 ? (
        <p className="text-gray-500">You have no favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
             <div key={movie.id} className="mt-6 h-auto p-2 gap-3 w-80 cursor-pointer bg-gray-200 shadow-lg rounded-lg">
            
             <div className="">
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
               <button
                className="mt-2 text-red-500 hover:text-red-700 font-medium"
                onClick={() => removeFavorite(movie.id)}
              >
                Remove
              </button>
             </div>
           </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
