import { useState, useEffect } from "react";
import { fetchDogs, getZipCodesBasedOnCity } from "../../../services";
import { useFavorites } from "../../../hooks/useFavorites";

import { SearchOptions } from "../../SearchOptions";
import { DogCard } from "../../DogCard";
import { Pagination } from "../../Pagination";

import type { Dog, SortOption } from "@/types";

const PAGE_SIZE = 25; // Number of dogs per page

const AllDogsTab = () => {
  // Dog states
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortOption>("breed:asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalDogs, setTotalDogs] = useState<number>(0);

  // Location filter states
  const [city, setCity] = useState<string | undefined>("");
  const [state, setState] = useState<string | undefined>(undefined);
  const [radius, setRadius] = useState<string | undefined>(undefined);

  // Applied location filters (only update on Apply Click, cleaered when clicking the reset button)
  const [appliedCity, setAppliedCity] = useState<string | undefined>(undefined);
  const [appliedState, setAppliedState] = useState<string | undefined>(
    undefined
  );
  const [appliedRadius, setAppliedRadius] = useState<string | undefined>(
    undefined
  );
  const [zipCodes, setZipCodes] = useState<string[]>([]);

  // Loading states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!appliedCity && !appliedState && !appliedRadius) return;

    const loadZipCodes = async () => {
      try {
        const zipCodes = await getZipCodesBasedOnCity({
          city: appliedCity ?? "",
          states: appliedState ? [appliedState] : [],
          radius: Number(appliedRadius),
        });

        setZipCodes(zipCodes);
      } catch (err) {
        setError(`Failed to load zip codes: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    loadZipCodes();
  }, [appliedCity, appliedState, appliedRadius]);

  useEffect(() => {
    const loadDogs = async () => {
      setDogs([]);
      setLoading(true);

      try {
        const { dogs, total } = await fetchDogs({
          from: (currentPage - 1) * PAGE_SIZE,
          breeds: selectedBreeds || undefined,
          sort: selectedSortOption,
          zipCodes: zipCodes.length !== 0 ? zipCodes : undefined,
        });

        setDogs(dogs);
        setTotalDogs(total);
      } catch (err) {
        setError(`Failed to load dogs: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    loadDogs();
  }, [currentPage, selectedBreeds, selectedSortOption, zipCodes]);

  const applyLocationFilter = (reset?: boolean) => {
    if (reset === true) {
      setAppliedCity(undefined);
      setAppliedState(undefined);
      setAppliedRadius(undefined);
      setZipCodes([]);
    } else {
      setAppliedCity(city);
      setAppliedState(state);
      setAppliedRadius(radius);
    }
    setCurrentPage(1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <SearchOptions
        selectedBreeds={selectedBreeds}
        onBreedSelect={setSelectedBreeds}
        selectedSortOption={selectedSortOption}
        onSortOptionChange={setSelectedSortOption}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        radius={radius}
        setRadius={setRadius}
        onApplyFilter={applyLocationFilter}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalDogs / PAGE_SIZE)}
        onPageChange={setCurrentPage}
      />

      <div className="w-full grid grid-cols-1 mt-2 justify-center items-center md:grid-cols-5">
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorite={favorites.has(dog.id)}
            onFavoriteClick={toggleFavorite}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalDogs / PAGE_SIZE)}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default AllDogsTab;
