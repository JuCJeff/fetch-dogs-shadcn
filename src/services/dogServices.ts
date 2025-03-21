import {
  DOGS_ENDPOINT,
  DOGS_SEARCH_ENDPOINT,
  DOGS_BREEDS_ENDPOINT,
  DOGS_MATCH_ENDPOINT,
} from "./apiConfig";
import { fetchApi } from "../utils/apiUtils";

import { Dog } from "@/types";

export const getDogBreeds = async () => {
  const data = await fetchApi(DOGS_BREEDS_ENDPOINT, {
    method: "GET",
    credentials: "include",
  });
  return data;
};

interface FetchDogsParams {
  size?: number;
  from?: number;
  zipCodes?: string[];
  breeds?: string[];
  sort?: string;
}

const dogsMap = new Map();

export const fetchDogs = async ({
  size = 25,
  from = 0,
  breeds = [],
  zipCodes = [],
  sort = "breed:asc",
}: FetchDogsParams): Promise<{ dogs: Dog[]; total: number }> => {
  const params = new URLSearchParams({
    size: size.toString(),
    from: from.toString(),
    sort,
  });

  if (breeds.length !== 0) {
    params.append("breeds", breeds.join(","));
  }

  if (zipCodes.length !== 0) {
    // Limiting zipCodes to 100 to avoid parameter error, could improve in the future based on backend setups
    if (zipCodes.length > 100) {
      zipCodes.slice(0, 99).forEach((zip) => params.append("zipCodes", zip));
    } else {
      zipCodes.forEach((zip) => params.append("zipCodes", zip));
    }
  }

  const url = `${DOGS_SEARCH_ENDPOINT}?${params.toString()}`;

  if (dogsMap.has(url)) {
    const dogObject = dogsMap.get(url);
    const dogs = dogObject.dogs;
    const total = dogObject.total;

    return { dogs, total };
  }

  try {
    const { resultIds, total } = await fetchApi<{
      resultIds: string[];
      total: number;
    }>(url, {
      method: "GET",
      credentials: "include",
    });
    const dogs =
      resultIds.length > 0 ? await getDogDetailsBasedOnId(resultIds) : [];

    dogsMap.set(url, { dogs: dogs, total: total });
    return { dogs, total };
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return { dogs: [], total: 0 };
  }
};

export const getDogDetailsBasedOnId = async (ids: string[]) => {
  const response = await fetchApi<Dog[]>(DOGS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids),
    credentials: "include",
  });

  return response;
};

export const getMatchingDog = async (dogIds: string[]) => {
  const { match: matchingDogId } = await fetchApi<{ match: string }>(
    DOGS_MATCH_ENDPOINT,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dogIds),
      credentials: "include",
    }
  );

  const dogsResponse = await fetchApi<Dog[]>(DOGS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([matchingDogId]),
    credentials: "include",
  });

  return dogsResponse[0];
};
