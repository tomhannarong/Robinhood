import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskItem from "@/app/components/TaskItem";
import { Task } from "@/app/types";

const taskMock: Task = {
  id: "1",
  title: "Test Task",
  createdDate: new Date("2024-02-18"),
  status: "todo",
};

describe("TaskItem component", () => {
  it("renders task details correctly", () => {
    const { getByText } = render(
      <TaskItem no={1} task={taskMock} onDelete={() => {}} />
    );

    expect(getByText("Test Task")).toBeInTheDocument();
    expect(getByText("No.")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("Sun Feb 18 2024")).toBeInTheDocument();
  });

  it("display button delete when swipe to delete is triggered", async () => {
    // Mock onDelete function
    const mockOnDelete = jest.fn();

    const { getByText } = render(
      <TaskItem no={1} task={taskMock} onDelete={mockOnDelete} />
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
