import { useState, useEffect, ReactNode, useMemo } from "react";

import { FavoritesContext } from "./FavoritesContext";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
  });

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") ?? "[]"
    );
    setFavorites(new Set(savedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = (dogId: string) => {
    setFavorites((favorites) => {
      const favoritesCopy = new Set(favorites);
      if (favoritesCopy.has(dogId)) {
        favoritesCopy.delete(dogId);
      } else {
        favoritesCopy.add(dogId);
      }
      return favoritesCopy;
    });
  };

  const value = useMemo(
    () => ({ favorites, toggleFavorite }),
    [favorites] // Memoize value only when 'favorites' changes
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
