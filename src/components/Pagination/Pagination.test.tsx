import { render, fireEvent } from "@testing-library/react";
import PaginationComponent, { PaginationProps } from "./Pagination";

// Mock the onPageChange function
const mockOnPageChange = jest.fn();

const renderPagination = (props: PaginationProps) => {
  return render(<PaginationComponent {...props} />);
};

describe("PaginationComponent", () => {
  beforeEach(() => {
    // Clear mock function before each test
    mockOnPageChange.mockClear();
  });

  it("renders the correct number of pages when currentPage is 1", () => {
    const { getByText } = renderPagination({
      currentPage: 1,
      totalPages: 5,
      onPageChange: mockOnPageChange,
    });

    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
  });

  it("calls onPageChange when a page link is clicked", () => {
    const { getByText } = renderPagination({
      currentPage: 1,
      totalPages: 5,
      onPageChange: mockOnPageChange,
    });

    // Click on page 2
    fireEvent.click(getByText("2"));

    // Check that the onPageChange mock function was called with the correct page number
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("does not show 'Previous' button when on the first page", () => {
    const { queryByText } = renderPagination({
      currentPage: 1,
      totalPages: 5,
      onPageChange: mockOnPageChange,
    });

    // Ensure that the "Previous" button is not rendered
    expect(queryByText("Previous")).toBeNull();
  });

  it("does not show 'Next' button when on the last page", () => {
    const { queryByText } = renderPagination({
      currentPage: 5,
      totalPages: 5,
      onPageChange: mockOnPageChange,
    });

    // Ensure that the "Next" button is not rendered
    expect(queryByText("Next")).toBeNull();
  });

  it("handles edge case with very few pages", () => {
    const { getByText } = renderPagination({
      currentPage: 1,
      totalPages: 2,
      onPageChange: mockOnPageChange,
    });

    // Check that only the available pages (1 and 2) are shown
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
  });
});
