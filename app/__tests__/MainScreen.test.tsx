import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainScreen from "@/app/components/MainScreen";

describe("MainScreen component", () => {
  // Mock generateMockTasks function
  jest.mock("../services/todoList.ts", () => ({
    handleTodoList: jest.fn((status, count) => {
      return Array.from({ length: count }, (_, index) => ({
        id: `${status}-${index + 1}`,
        title: `Task ${index + 1}`,
        description: `description ${index + 1}`,
        status,
      }));
    }),
  }));

  it("renders tabs correctly", () => {
    const { getByText } = render(<MainScreen />);

    expect(getByText("To-do")).toBeInTheDocument();
    expect(getByText("Doing")).toBeInTheDocument();
    expect(getByText("Done")).toBeInTheDocument();
  });

  it("switches active tab correctly", () => {
    const { getByText, getByTestId } = render(<MainScreen />);
    const doingTab = getByText("Doing");

    fireEvent.click(doingTab);

    expect(doingTab).toHaveClass(
      "bg-gradient-to-r from-indigo-400 to-cyan-400"
    );
    expect(getByTestId("list-DOING")).toBeInTheDocument();
    expect(getByTestId("list-DOING")).toBeDefined();
  });

  it("changes active tab when tab button Todo is clicked", async () => {
    const { getByText, getByTestId } = render(<MainScreen />);
    const todoTab = getByText("To-do");

    fireEvent.click(todoTab);

    expect(todoTab).toHaveClass("bg-gradient-to-r from-indigo-400 to-cyan-400");
    expect(getByTestId("list-TODO")).toBeInTheDocument();
    expect(getByTestId("list-TODO")).toBeDefined();
  });

  it("changes active tab when tab button Done is clicked", async () => {
    const { getByText, getByTestId } = render(<MainScreen />);
    const doneTab = getByText("Done");

    fireEvent.click(doneTab);

    expect(doneTab).toHaveClass("bg-gradient-to-r from-indigo-400 to-cyan-400");
    expect(getByTestId("list-DONE")).toBeInTheDocument();
    expect(getByTestId("list-DONE")).toBeDefined();
  });

  it("displays tasks for the active tab", async () => {
    const { getByText, queryByText } = render(<MainScreen />);

    fireEvent.click(getByText("Doing"));
    expect(queryByText("Task 1")).toBeNull();
  });
});
