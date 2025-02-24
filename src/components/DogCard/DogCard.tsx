import { Button } from "@/components/ui/button";

import type { Dog } from "@/types";

interface DogCardProps {
  dog: Dog;
  onFavoriteClick?: (id: string) => void;
  isFavorite?: boolean;
}

const DogCard = ({ dog, onFavoriteClick, isFavorite }: DogCardProps) => {
  return (
    <div className="dog-card border-2 rounded-xl border-yellow-600 p-2 mx-2 my-1 text-center">
      <img
        src={dog.img}
        alt={dog.name}
        className="dog-image w-full h-[300px] object-cover rounded-xl transition-transform duration-200 hover:scale-105"
      />
      <div className="flex flex-col gap-4">
        <h2 className="font-bold mt-4">{dog.name}</h2>
        <p>
          <strong>Breed:</strong> {dog.breed}
        </p>
        <p>
          <strong>Age:</strong> {dog.age} years
        </p>
        <p>
          <strong>Location:</strong> ZIP {dog.zip_code}
        </p>

        <Button
          className={`my-2 favorite-btn ${isFavorite ? "favorited" : ""}`}
          onClick={() => (onFavoriteClick ? onFavoriteClick(dog.id) : {})}
        >
          {isFavorite ? "★ Favorited" : "☆ Favorite"}
        </Button>
      </div>
    </div>
  );
};

export default DogCard;
