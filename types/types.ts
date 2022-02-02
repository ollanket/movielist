export interface listEntry {
  title: string;
  id: string;
  score: number;
  poster: string;
  year: string;
  rating: string;
  added: string;
  note: string;
}

export interface userAuthData {
  username?: string;
  user: boolean;
}

export enum sortOptions {
  "movies_by_user_sort_by_title_asc",
  "movies_by_user_sort_by_title_desc",
  "movies_by_user_sort_by_score_asc",
  "movies_by_user_sort_by_score_desc",
  "movies_by_user_sort_by_year_asc",
  "movies_by_user_sort_by_year_desc"
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
