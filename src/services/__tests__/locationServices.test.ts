import { fetchApi } from "../../utils/apiUtils";
import {
  getCityCoordinates,
  getZipCodesInRadius,
  getZipCodesBasedOnCity,
} from "../locationServices";
import { LOCATIONS_SEARCH_ENDPOINT } from "../apiConfig";

jest.mock("../../utils/apiUtils");

describe("locationServices", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getCityCoordinates should fetch correct latitude and longitude", async () => {
    const mockResponse = {
      results: [{ latitude: 40.7128, longitude: -74.006 }],
    };

    (fetchApi as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getCityCoordinates("New York", "NY");
    expect(fetchApi).toHaveBeenCalledWith(LOCATIONS_SEARCH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: "New York", states: ["NY"] }),
      credentials: "include",
    });

    expect(result).toEqual({ latitude: 40.7128, longitude: -74.006 });
  });

  test("getCityCoordinates should throw an error if city not found", async () => {
    (fetchApi as jest.Mock).mockResolvedValue({ results: [] });

    await expect(getCityCoordinates("Unknown", "XX")).rejects.toThrow(
      "Unable to fetch city coordinates. Please try again"
    );
  });

  test("getZipCodesInRadius should fetch zip codes within a radius", async () => {
    const latitude = 40.7128;
    const longitude = -74.006;
    const radius = 25;
    const mockResponse = {
      results: [{ zip_code: "10001" }, { zip_code: "10002" }],
    };

    (fetchApi as jest.Mock)
      .mockResolvedValueOnce(mockResponse)
      .mockResolvedValueOnce({ results: [] });

    const result = await getZipCodesInRadius(latitude, longitude, radius);

    expect(fetchApi).toHaveBeenCalledWith(
      LOCATIONS_SEARCH_ENDPOINT,
      expect.objectContaining({ method: "POST" })
    );
    expect(result).toEqual(["10001", "10002"]);
  });

  test("getZipCodesBasedOnCity should return zip codes for valid city and state", async () => {
    jest.spyOn(global.console, "warn").mockImplementation(() => {});

    const mockCoordinates = { latitude: 40.7128, longitude: -74.006 };
    const mockZipCodes = ["10001", "10002"];

    (fetchApi as jest.Mock)
      .mockResolvedValueOnce({ results: [mockCoordinates] })
      .mockResolvedValueOnce({
        results: [{ zip_code: "10001" }, { zip_code: "10002" }],
      })
      .mockResolvedValueOnce({ results: [] });

    const result = await getZipCodesBasedOnCity({
      city: "New York",
      states: ["NY"],
      radius: 25,
    });

    expect(fetchApi).toHaveBeenCalledTimes(3);
    expect(result).toEqual(mockZipCodes);
  });

  test("getZipCodesBasedOnCity should return empty array for invalid input", async () => {
    jest.spyOn(global.console, "warn").mockImplementation(() => {});

    const result = await getZipCodesBasedOnCity({
      city: "",
      states: [],
      radius: 25,
    });

    expect(result).toEqual([]);
    expect(console.warn).toHaveBeenCalledWith(
      "Invalid input for fetching zip codes."
    );
  });
});
