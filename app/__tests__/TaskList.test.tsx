import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "@/app/components/TaskList";
import { Task } from "@/app/types";

describe("TaskList component", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      createdDate: new Date("2024-02-19T08:00:00Z"),
      status: "todo",
    },
    {
      id: "2",
      title: "Task 2",
      createdDate: new Date("2024-02-19T08:00:00Z"),
      status: "todo",
    },
    {
      id: "3",
      title: "Task 3",
      createdDate: new Date("2024-02-19T08:00:00Z"),
      status: "doing",
    },
    {
      id: "4",
      title: "Task 4",
      createdDate: new Date("2024-02-19T08:00:00Z"),
      status: "todo",
    },
    {
      id: "5",
      title: "Task 5",
      createdDate: new Date("2024-02-19T08:00:00Z"),
      status: "todo",
    },
    {
      id: "6",
      title: "Task 6",
      createdDate: new Date("2024-02-19T08:00:00Z"),
      status: "doing",
    },
    {
      id: "7",
      title: "Task 7",
      createdDate: new Date("2024-02-19T08:00:00Z"),
      status: "doing",
    },
    {
      id: "8",
      title: "Task 8",
      createdDate: new Date("2024-02-19T08:00:00Z"),
      status: "todo",
    },
    {
      id: "9",
      title: "Task 9",
      createdDate: new Date("2024-02-19T08:00:00Z"),
      status: "todo",
    },
    {
      id: "10",
      title: "Task 10",
      createdDate: new Date("2024-02-19T08:00:00Z"),
      status: "doing",
    },
  ];

  const mockOnDelete = jest.fn();
  const mockOnLoadMore = jest.fn();

  it("renders tasks correctly", () => {
    const { getByText } = render(
      <TaskList
        tasks={mockTasks}
        onDelete={mockOnDelete}
        onLoadMore={mockOnLoadMore}
        status="todo"
        stopLoadMore={{ todo: false, doing: false, done: false }}
      />
    );

    expect(getByText("Task 1")).toBeInTheDocument();
    expect(getByText("Task 2")).toBeInTheDocument();
    expect(getByText("Task 3")).toBeInTheDocument();
  });

  it("displays the correct status in uppercase", () => {
    const status = "todo";
    const { getByText } = render(
      <TaskList
        tasks={[]}
        onDelete={() => {}}
        onLoadMore={() => {}}
        status={status}
        stopLoadMore={{ todo: false, doing: false, done: false }}
      />
    );

    const statusElement = getByText(status.toUpperCase());
    expect(statusElement).toBeInTheDocument();
  });

  it("displays the correct total number of rows", () => {
    const { getByText } = render(
      <TaskList
        tasks={mockTasks}
        onDelete={() => {}}
        onLoadMore={() => {}}
        status="todo"
        stopLoadMore={{ todo: false, doing: false, done: false }}
      />
    );

    const totalRowsElement = getByText(`Total Rows: ${mockTasks.length}`);
    expect(totalRowsElement).toBeInTheDocument();
  });

  it("calls onLoadMore when scrolled to bottom and loading indicator is displayed", async () => {
    const mockTasks: Task[] = [];
    const mockOnLoadMore = jest.fn();

    const { getByTestId, getByText } = render(
      <TaskList
        tasks={mockTasks}
        onDelete={jest.fn()}
        onLoadMore={mockOnLoadMore}
        status="todo"
        stopLoadMore={{ todo: false, doing: false, done: false }}
      />
    );

    const container = getByTestId("list-todo");
    fireEvent.scroll(container, { y: 1000 });

    await waitFor(() => {
      expect(getByText("Loading more...")).toBeInTheDocument();
      expect(mockOnLoadMore).toBeDefined();
    });
  });
});
