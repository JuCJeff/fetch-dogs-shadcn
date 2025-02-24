import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getDogBreeds } from "@/services";

interface BreedFilterProps {
  selectedBreed: string[];
  onBreedSelect: (SelectedBreed: string[]) => void;
}

const BreedFilter = ({ selectedBreed, onBreedSelect }: BreedFilterProps) => {
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    const fetchBreedList = async () => {
      const breeds = await getDogBreeds();

      setBreeds(breeds as string[]);
    };

    fetchBreedList();
  }, []);

  const handleBreedChange = (value: string) => {
    const breed = value === "" ? "" : value;
    onBreedSelect(breed ? [breed] : []);
  };

  return (
    <Select
      value={selectedBreed.length > 0 ? selectedBreed[0] : ""}
      onValueChange={(value) => handleBreedChange(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Breed filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Breeds</SelectLabel>
          {breeds.map((breed) => (
            <SelectItem className="flex-wrap" value={breed}>{breed}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BreedFilter;
