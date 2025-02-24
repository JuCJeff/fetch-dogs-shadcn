import { DogCard } from "@/components/DogCard";

import type { Dog } from "@/types";

interface MatchingDogProps {
  dog: Dog;
}

const MatchingDog = ({ dog }: MatchingDogProps) => {
  return (
    <>
      {dog ? (
        <div className="matching-dog">
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorite={false}
            onFavoriteClick={() => {}}
          />
        </div>
      ) : null}
    </>
  );
};

export default MatchingDog;
