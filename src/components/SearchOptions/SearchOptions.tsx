import { Button } from "@/components/ui/button";

import { BreedFilter } from "./BreedFilter";
import { LocationFilter } from "./LocationFilter";
import { SortOptions } from "./SortOptions";

import type { SortOption } from "@/types";

interface SearchOptionsProps {
  selectedBreeds: string[];
  onBreedSelect: (breeds: string[]) => void;
  selectedSortOption: SortOption;
  onSortOptionChange: (option: SortOption) => void;
  city: string | undefined;
  setCity: (city: string) => void;
  state: string | undefined;
  setState: (state: string) => void;
  radius: string | undefined;
  setRadius: (radius: string | undefined) => void;
  onApplyFilter: (reset?: boolean) => void;
  resetPage: () => void;
}

const SearchOptions = ({
  selectedBreeds,
  onBreedSelect,
  selectedSortOption,
  onSortOptionChange,
  city,
  setCity,
  state,
  setState,
  radius,
  setRadius,
  onApplyFilter,
  resetPage,
}: SearchOptionsProps) => {
  return (
    <div className="my-2 justify-center items-center gap-4 flex-row md:flex">
      <div>
        <LocationFilter
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          radius={radius}
          setRadius={setRadius}
          onFilter={onApplyFilter}
        />
      </div>

      <div className="flex flex-col gap-1 justify-center items-center md:flex-row md:gap-0">
        <BreedFilter
          selectedBreed={selectedBreeds}
          onBreedSelect={onBreedSelect}
          resetPage={resetPage}
        />
        <SortOptions
          selectedSortOption={selectedSortOption}
          onSortOptionChange={onSortOptionChange}
          resetPage={resetPage}
        />
      </div>

      <Button
        onClick={() => {
          onBreedSelect([]);
          onSortOptionChange("breed:asc");
          setCity("");
          setState("");
          setRadius(undefined);
          onApplyFilter(true);
          resetPage();
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default SearchOptions;
