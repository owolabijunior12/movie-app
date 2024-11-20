export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    popularity:any;
    vote_count:any;
  }
  
  export interface MoviesResponse {
    results: Movie[];
    total_pages: number;
  }
  
  export interface MovieDetails {
    id: any; // Movie ID, should ideally be a number
    title: string; // Movie title
    tagline: string; // Short tagline for the movie
    overview: string; // Brief description or synopsis of the movie
    release_date: string; // Release date in YYYY-MM-DD format
    runtime: number | null; // Runtime in minutes, could be null if not available
    budget: number; // Budget in USD
    revenue: number; // Revenue in USD
    popularity: number; // Popularity score
    vote_average: number; // Average user rating
    vote_count: number; // Total number of user votes
    backdrop_path: string | null; // Path to the backdrop image
    poster_path: string | null; // Path to the poster image
    genres: { id: number; name: string }[]; // Array of genres
    homepage: string | null; // Official homepage URL, if available
    production_companies: { id: number; name: string }[]; // Array of production companies
  }
  
  