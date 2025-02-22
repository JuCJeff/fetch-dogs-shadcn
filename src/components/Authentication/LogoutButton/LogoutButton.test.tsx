// LogoutButton.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { LogoutButton } from "@/components/Authentication/LogoutButton";
import { useAuth } from "@/hooks/useAuth";

// Mock the useAuth hook to avoid actual logic
jest.mock("@/hooks/useAuth");

describe("LogoutButton", () => {
  it("calls the logout function when clicked", async () => {
    // Create a mock function for logout
    const mockLogout = jest.fn();

    // Mock the implementation of useAuth to return the mock logout function
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
    });

    // Render the LogoutButton component
    render(<LogoutButton />);

    // Find the button and simulate a click
    const button = screen.getByText("Logout");
    fireEvent.click(button);

    // Assert that the logout function was called
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
