// Dog Interface
export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

// Sort Options
export type SortOption =
  | "breed:asc"
  | "breed:desc"
  | "name:asc"
  | "name:desc"
  | "age:asc"
  | "age:desc";

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}
export interface Coordinates {
  lat: number;
  lon: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
}
