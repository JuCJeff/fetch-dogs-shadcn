import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm"; // Adjust import if needed
import { useAuth } from "@/hooks"; // Ensure this path is correct

// Mock the `useAuth` hook
jest.mock("@/hooks", () => ({
  useAuth: jest.fn(),
}));

describe("LoginForm", () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    // Reset the mock before each test
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  test("renders the form with name and email inputs", () => {
    render(<LoginForm />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("submits the form with valid data", async () => {
    render(<LoginForm />);

    // Simulate user input
    fireEvent.input(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "john.doe@example.com" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for the login function to be called with the correct arguments
    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith("John Doe", "john.doe@example.com")
    );
  });

  test("shows validation error for empty fields", async () => {
    render(<LoginForm />);

    // Submit the form without filling any fields
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for the validation error to appear for the name field
    await waitFor(() => expect(screen.getByText(/name/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/email/i)).toBeInTheDocument());
  });
});
