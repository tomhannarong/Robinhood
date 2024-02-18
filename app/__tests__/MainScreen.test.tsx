import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainScreen from "@/app/components/MainScreen";

describe("MainScreen component", () => {
  // Mock generateMockTasks function
  jest.mock("../services/mockData.ts", () => ({
    generateMockTasks: jest.fn((status, count) => {
      return Array.from({ length: count }, (_, index) => ({
        id: `${status}-${index + 1}`,
        title: `Task ${index + 1}`,
        status,
      }));
    }),
  }));

  it("renders tabs correctly", () => {
    const { getByText } = render(<MainScreen />);

    expect(getByText("Todo")).toBeInTheDocument();
    expect(getByText("Doing")).toBeInTheDocument();
    expect(getByText("Done")).toBeInTheDocument();
  });

  it("switches active tab correctly", () => {
    const { getByText, getByTestId } = render(<MainScreen />);
    const doingTab = getByText("Doing");

    fireEvent.click(doingTab);

    expect(doingTab).toHaveClass("bg-blue-500");
    expect(getByTestId("list-doing")).toBeInTheDocument();
    expect(getByTestId("list-doing")).toBeDefined();
  });

  it("changes active tab when tab button Todo is clicked", async () => {
    const { getByText, getByTestId } = render(<MainScreen />);
    const todoTab = getByText("Todo");

    fireEvent.click(todoTab);

    expect(todoTab).toHaveClass("bg-blue-500");
    expect(getByTestId("list-todo")).toBeInTheDocument();
    expect(getByTestId("list-todo")).toBeDefined();
  });

  it("changes active tab when tab button Done is clicked", async () => {
    const { getByText, getByTestId } = render(<MainScreen />);
    const doneTab = getByText("Done");

    fireEvent.click(doneTab);

    expect(doneTab).toHaveClass("bg-blue-500");
    expect(getByTestId("list-done")).toBeInTheDocument();
    expect(getByTestId("list-done")).toBeDefined();
  });

  it("displays tasks for the active tab", async () => {
    const { getByText, queryByText } = render(<MainScreen />);

    fireEvent.click(getByText("Doing"));
    expect(queryByText("Task 1")).toBeNull();
  });
});
