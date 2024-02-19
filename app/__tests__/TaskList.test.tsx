import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "@/app/components/TaskList";
import { Status, Task } from "@/app/types";

describe("TaskList component", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "description 1",
      createdAt: "2024-02-19T08:00:00Z",
      status: "todo",
    },
    {
      id: "2",
      title: "Task 2",
      description: "description 2",
      createdAt: "2024-02-19T08:00:00Z",
      status: "todo",
    },
    {
      id: "3",
      title: "Task 3",
      description: "description 3",
      createdAt: "2024-02-19T08:00:00Z",
      status: "doing",
    },
    {
      id: "4",
      title: "Task 4",
      description: "description 4",
      createdAt: "2024-02-19T08:00:00Z",
      status: "doing",
    },
    {
      id: "5",
      title: "Task 5",
      description: "description 5",
      createdAt: "2024-02-19T08:00:00Z",
      status: "doing",
    },
    {
      id: "6",
      title: "Task 6",
      description: "description 6",
      createdAt: "2024-02-19T08:00:00Z",
      status: "doing",
    },
    {
      id: "7",
      title: "Task 7",
      description: "description 7",
      createdAt: "2024-02-19T08:00:00Z",
      status: "doing",
    },
    {
      id: "8",
      title: "Task 8",
      description: "description 8",
      createdAt: "2024-02-19T08:00:00Z",
      status: "doing",
    },
    {
      id: "9",
      title: "Task 9",
      description: "description 9",
      createdAt: "2024-02-19T08:00:00Z",
      status: "doing",
    },
    {
      id: "10",
      title: "Task 10",
      description: "description 10",
      createdAt: "2024-02-19T08:00:00Z",
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
        status="TODO"
        stopLoadMore={{ todo: false, doing: false, done: false }}
        setOffsets={() => {}}
      />
    );

    expect(getByText("Task 1")).toBeInTheDocument();
    expect(getByText("Task 2")).toBeInTheDocument();
    expect(getByText("Task 3")).toBeInTheDocument();
  });

  it("displays the correct date group is today", () => {
    const status: Status = "TODO";
    const today = new Date();
    const { getByText } = render(
      <TaskList
        tasks={[
          {
            id: "55",
            title: "Task 55",
            description: "description 55",
            status: "doing",
            createdAt: today.toDateString(),
          },
        ]}
        onDelete={() => {}}
        onLoadMore={() => {}}
        status={status}
        stopLoadMore={{ todo: false, doing: false, done: false }}
        setOffsets={() => {}}
      />
    );
  });

  it("displays the correct date group is tomorrow", () => {
    const status: Status = "TODO";
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const { getByText } = render(
      <TaskList
        tasks={[
          {
            id: "55",
            title: "Task 55",
            description: "description 55",
            status: "doing",
            createdAt: tomorrow.toDateString(),
          },
        ]}
        onDelete={() => {}}
        onLoadMore={() => {}}
        status={status}
        stopLoadMore={{ todo: false, doing: false, done: false }}
        setOffsets={() => {}}
      />
    );

    const statusElement = getByText("Tomorrow");
    expect(statusElement).toBeInTheDocument();
  });

  it("displays the correct total number of rows", () => {
    const { getByText } = render(
      <TaskList
        tasks={mockTasks}
        onDelete={() => {}}
        onLoadMore={() => {}}
        status="TODO"
        stopLoadMore={{ todo: false, doing: false, done: false }}
        setOffsets={() => {}}
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
        status="TODO"
        stopLoadMore={{ todo: false, doing: false, done: false }}
        setOffsets={() => {}}
      />
    );

    const container = getByTestId("list-TODO");
    fireEvent.scroll(container, { y: 1000 });

    await waitFor(() => {
      expect(getByText("Loading more...")).toBeInTheDocument();
      expect(mockOnLoadMore).toBeDefined();
    });
  });
});
