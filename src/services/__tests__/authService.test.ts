import { loginUser, logoutUser } from "../authServices";

global.fetch = jest.fn();

describe("AuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("loginUser should return success message when API call is successful", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Login successful" }),
      statusText: "OK",
    });

    const response = await loginUser("John Doe", "john@example.com");
    expect(response).toEqual({ message: "Login successful", status: "OK" });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/login"),
      expect.any(Object)
    );
  });

  test("loginUser should throw an error when API call fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
    });

    await expect(loginUser("John Doe", "john@example.com")).rejects.toThrow(
      "Unable to login. Please try again"
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("logoutUser should return success message when API call is successful", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Logout successful" }),
    });

    const response = await logoutUser();
    expect(response).toEqual({ message: "Logout successful" });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/logout"),
      expect.any(Object)
    );
  });

  test("logoutUser should throw an error when API call fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Server error",
    });

    await expect(logoutUser()).rejects.toThrow(
      "Unable to logout. Please try again."
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
