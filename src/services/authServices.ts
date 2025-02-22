import { LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from "./apiConfig";

export const loginUser = async (name: string, email: string) => {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
      credentials: "include",
    });

    if (!response.ok) throw new Error(`Login failed: ${response.statusText}`);

    return { message: "Login successful", status: "OK" };
  } catch (error) {
    console.debug(error);
    throw new Error("Unable to login. Please try again");
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(LOGOUT_ENDPOINT, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) throw new Error(`Logout failed: ${response.statusText}`);

    return { message: "Logout successful" };
  } catch (error) {
    console.debug("Logout failed: ", error);
    throw new Error("Unable to logout. Please try again.");
  }
};
