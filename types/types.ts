export interface listEntry {
  title: string;
  id: string;
  score: number;
  poster: string;
  year: string;
  rating: string;
  added: string;
  note: string;
  imdbId: string;
}

export interface userAuthData {
  username?: string;
  user: boolean;
}

export interface selectedEntry {
  id: string;
  title: string;
  note: string;
  score: number;
  imdbId: string;
}

export enum sortOptions {
  "movies_by_user_sort_by_title_asc2",
  "movies_by_user_sort_by_title_desc2",
  "movies_by_user_sort_by_score_asc2",
  "movies_by_user_sort_by_score_desc2",
  "movies_by_user_sort_by_year_asc2",
  "movies_by_user_sort_by_year_desc2"
}

export interface ref {
  id: string;
  collection: {
    ref: { id: string };
    collection: { id: string };
  };
}

export enum scoreDesc {
  "Masterpiece" = 10,
  "Great" = 9,
  "Very Good" = 8,
  "Good" = 7,
  "Fine" = 6,
  "Average" = 5,
  "Bad" = 4,
  "Very Bad" = 3,
  "Horrible" = 2,
  "Appaling" = 1,
  "N/A" = 0
}

export interface OMDbSearchResponse {
  Search: [{ Title: string; Year: string; imdbID: string; Poster: string }];
  totalresults: string;
  Response: "True";
}

export interface OMDbExactResponse {
  Response: "True";
  Error: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [{ Source: string; Value: string }];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}
