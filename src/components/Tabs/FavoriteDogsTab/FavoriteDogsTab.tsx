import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import { DogCard } from "@/components/DogCard";
import MatchingDog from "./MatchingDog";
import { getDogDetailsBasedOnId, getMatchingDog } from "../../../services";
import { useFavorites } from "@/hooks";

import type { Dog } from "@/types";

interface FavoriteDogsTabProps {
  onFavoriteClick: (dogId: string) => void;
}

const FavoriteDogsTab = ({ onFavoriteClick }: FavoriteDogsTabProps) => {
  const { favorites } = useFavorites();
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [matchingDog, setMatchingDog] = useState<Dog | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      if (favorites.size === 0) {
        setFavoriteDogs([]);
        return;
      }

      try {
        const dogs = await getDogDetailsBasedOnId(Array.from(favorites));
        setFavoriteDogs(dogs);
      } catch (err) {
        console.error("Failed to load favorite dogs:", err);
      }
    };

    loadFavorites();
  }, [favorites]);

  const handleDogMatch = async () => {
    const dogIds = favoriteDogs.map((dog) => dog.id);

    try {
      const matchingDogResponse = await getMatchingDog(dogIds);
      setMatchingDog(matchingDogResponse);
    } catch (err) {
      console.log("Failed to get matching dog:", err);
    }
  };

  return (
    <div>
      {favoriteDogs.length === 0 ? (
        <p>No favorites yet! ❤️</p>
      ) : (
        <div className="flex flex-col items-center">
          {matchingDog && (
            <div className="justify-center w-90">
              <h3>
                <strong>Matched Dog</strong>
              </h3>
              <MatchingDog dog={matchingDog} />
            </div>
          )}

          <Button className="my-2" onClick={handleDogMatch}>
            Get Matching Dog
          </Button>
          <div className="w-full grid grid-cols-1 mt-2 md:grid-cols-5 md:w-screen">
            {favoriteDogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                isFavorite={true}
                onFavoriteClick={onFavoriteClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteDogsTab;
