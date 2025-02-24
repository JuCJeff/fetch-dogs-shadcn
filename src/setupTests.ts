// src/setupTests.ts
import "@testing-library/jest-dom";

jest.mock("lucide-react", () => ({
  ChevronLeftIcon: "ChevronLeftIcon",
  ChevronRightIcon: "ChevronRightIcon",
  MoreHorizontalIcon: "MoreHorizontalIcon",
}));
