import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskItem from "@/app/components/TaskItem";
import { Task } from "@/app/types";

const taskMock: Task = {
  id: "99",
  title: "Task 99",
  description: "description 99",
  createdAt: "2024-02-19T08:00:00Z",
  status: "doing",
};

describe("TaskItem component", () => {
  it("renders task details correctly", () => {
    const { getByText } = render(
      <TaskItem task={taskMock} onDelete={() => {}} />
    );

    expect(getByText("Task 99")).toBeInTheDocument();
    expect(getByText("description 99")).toBeInTheDocument();
  });

  it("display button delete when swipe to delete is triggered", async () => {
    // Mock onDelete function
    const mockOnDelete = jest.fn();

    const { getByText } = render(
      <TaskItem task={taskMock} onDelete={mockOnDelete} />
    );

    const deleteButton = getByText("Delete");

    fireEvent.click(deleteButton);
    fireEvent.scroll(deleteButton, { x: -1000 });

    await waitFor(() => {
      expect(deleteButton).toBeInTheDocument();
      expect(deleteButton).toBeDefined();
    });
  });
});
