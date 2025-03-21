// Custom error class for handling API errors
export class ApiError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = "ApiError";
  }
}

// Function to handle API fetch requests
export const fetchApi = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 401) {
        // Redirect to the login page on 401 Unauthorized error
        window.location.href = "/fetch-dogs-shadcn/";
        throw new ApiError(`Unauthorized: ${response.statusText}`, 401);
      }
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status
      );
    }
    return response.json();
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof Error) {
      throw new Error(`Network or other error: ${error.message}`);
    }
    throw new Error("An unknown error occurred");
  }
};
