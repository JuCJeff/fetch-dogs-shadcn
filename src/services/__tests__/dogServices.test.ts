import {
  fetchDogs,
  getDogBreeds,
  getDogDetailsBasedOnId,
  getMatchingDog,
} from "../dogServices";
import { fetchApi } from "../../utils/apiUtils";
import {
  DOGS_BREEDS_ENDPOINT,
  DOGS_ENDPOINT,
  DOGS_MATCH_ENDPOINT,
} from "../apiConfig";

jest.mock("../../utils/apiUtils");

describe("dogServices", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getDogBreeds fetches data correctly", async () => {
    const mockData = [{ name: "Labrador" }, { name: "Beagle" }];
    (fetchApi as jest.Mock).mockResolvedValue(mockData);

    const result = await getDogBreeds();
    expect(fetchApi).toHaveBeenCalledWith(DOGS_BREEDS_ENDPOINT, {
      method: "GET",
      credentials: "include",
    });
    expect(result).toEqual(mockData);
  });

  test("fetchDogs fetches dogs correctly", async () => {
    const mockDogIds = ["dog1", "dog2"];
    const mockDogs = [
      { id: "dog1", name: "Max" },
      { id: "dog2", name: "Bella" },
    ];
    (fetchApi as jest.Mock).mockResolvedValueOnce({
      resultIds: mockDogIds,
      total: 2,
    });
    (fetchApi as jest.Mock).mockResolvedValueOnce(mockDogs);

    const result = await fetchDogs({
      size: 10,
      from: 0,
      breeds: ["Labrador"],
      zipCodes: ["12345"],
    });

    expect(fetchApi).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ dogs: mockDogs, total: 2 });
  });

  test("getDogDetailsBasedOnId fetches correct dog details", async () => {
    const mockDogs = [
      { id: "dog1", name: "Max" },
      { id: "dog2", name: "Bella" },
    ];
    (fetchApi as jest.Mock).mockResolvedValue(mockDogs);

    const result = await getDogDetailsBasedOnId(["dog1", "dog2"]);
    expect(fetchApi).toHaveBeenCalledWith(DOGS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(["dog1", "dog2"]),
      credentials: "include",
    });
    expect(result).toEqual(mockDogs);
  });

  test("getMatchingDog should fetch a matching dog", async () => {
    const mockMatchId = "789";
    const mockDog = { id: "789", name: "Lucky" };

    (fetchApi as jest.Mock)
      .mockResolvedValueOnce({ match: mockMatchId })
      .mockResolvedValueOnce([mockDog]);

    const result = await getMatchingDog(["123", "456"]);
    expect(fetchApi).toHaveBeenCalledWith(DOGS_MATCH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(["123", "456"]),
      credentials: "include",
    });
    expect(fetchApi).toHaveBeenCalledWith(DOGS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([mockMatchId]),
      credentials: "include",
    });
    expect(result).toEqual(mockDog);
  });
});
