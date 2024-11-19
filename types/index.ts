export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  }
  
  export interface MoviesResponse {
    results: Movie[];
    total_pages: number;
  }
  
  export interface MovieDetails {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    genres: { id: number; name: string }[];
    release_date: string;
    vote_average: number;
  }
  