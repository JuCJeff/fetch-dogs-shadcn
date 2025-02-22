import { createContext } from "react";

type FavoriteContextType = {
  favorites: Set<string>;
  toggleFavorite: (dogId: string) => void;
};

export const FavoritesContext = createContext<FavoriteContextType | undefined>(
  undefined
);
