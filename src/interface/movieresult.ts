export interface Movie {
  dates?: Dates;
  page?: number;
  results?: Result[];
  total_pages?: number;
  total_results?: number;
}

export interface Dates {
  maximum?: Date;
  minimum?: Date;
}

export interface Result {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: OriginalLanguage;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export enum OriginalLanguage {
  En = 'en',
  Fr = 'fr',
  Zh = 'zh',
}

export interface Login {
  status?: string;
  token?: string;
  data?: Data;
}

export interface Data {
  user?: User;
}

export interface User {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  __v?: number;
}
