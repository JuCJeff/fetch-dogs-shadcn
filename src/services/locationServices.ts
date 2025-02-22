import { LOCATIONS_SEARCH_ENDPOINT } from "./apiConfig";

import { fetchApi } from "../utils/apiUtils";

import type { Location } from "../types";

type GetLocationsProps = {
  city?: string;
  states?: string[];
  radius?: number;
  size?: number;
  from?: number;
};

// Fetch the city coordinates (latitude & longitude)
export const getCityCoordinates = async (city: string, state: string) => {
  const states = [state];

  const body = { city, states };

  try {
    const { results } = await fetchApi<{ results: Location[] }>(
      LOCATIONS_SEARCH_ENDPOINT,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );

    if (results.length === 0) {
      throw new Error("City not found");
    }

    return {
      latitude: results[0].latitude,
      longitude: results[0].longitude,
    };
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
    throw new Error("Unable to fetch city coordinates. Please try again");
  }
};

export const getBoundingBox = (
  latitude: number,
  longitude: number,
  radius: number
) => {
  const earthRadiusMiles = 3959; // Earth radius in miles

  // Calculate offsets in degrees
  const latOffset = (radius / earthRadiusMiles) * (180 / Math.PI);
  const lonOffset =
    (radius / (earthRadiusMiles * Math.cos((Math.PI * latitude) / 180))) *
    (180 / Math.PI);

  return {
    bottom_left: { lat: latitude - latOffset, lon: longitude - lonOffset },
    top_right: { lat: latitude + latOffset, lon: longitude + lonOffset },
  };
};

// Get zip codes within a specified radius
export const getZipCodesInRadius = async (
  latitude: number,
  longitude: number,
  radius: number
) => {
  const zipCodes: string[] = [];
  let from = 0;
  const size = 25; // API max per request

  try {
    const geoBoundingBox = getBoundingBox(latitude, longitude, radius);

    while (true) {
      const { results } = await fetchApi<{ results: Location[] }>(
        LOCATIONS_SEARCH_ENDPOINT,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ geoBoundingBox, from, size }),
          credentials: "include",
        }
      );

      if (!results.length) break;

      zipCodes.push(...results.map((location) => location.zip_code));
      from += size;
    }

    return zipCodes;
  } catch (error) {
    console.error("Error fetching ZIP codes:", error);
    throw new Error("Unable to fetch ZIP codes. Please try again");
  }
};

export const getZipCodesBasedOnCity = async ({
  city = "",
  states = [],
  radius = 25,
}: GetLocationsProps) => {
  if (!city || states.length === 0 || isNaN(radius) || radius <= 0) {
    console.warn("Invalid input for fetching zip codes.");
    return [];
  }

  try {
    const { latitude, longitude } = await getCityCoordinates(city, states[0]);
    if (!latitude || !longitude) {
      console.warn("City coordinates not found.");
      return [];
    }

    const zipCodes = await getZipCodesInRadius(latitude, longitude, radius);
    if (zipCodes.length === 0) {
      console.warn("No zip codes found for the given city and radius.");
    }

    return zipCodes;
  } catch (error) {
    console.error("Fetch Location failed:", error);
    return [];
  }
};
