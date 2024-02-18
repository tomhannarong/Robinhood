import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { Task, StopLoadMore } from "../types";
import useScrollPosition from "../hooks/useScrollPosition";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onLoadMore: () => void;
  status: "todo" | "doing" | "done";
  stopLoadMore: StopLoadMore;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onLoadMore,
  status,
  stopLoadMore,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const { scrollPosition, scrollToPosition, containerRef } =
    useScrollPosition();

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollHeight = container.scrollHeight - container.clientHeight;
    const scrolledToBottom =
      Math.ceil(container.scrollTop + container.clientHeight) >= scrollHeight;

    if (scrolledToBottom && !isFetching) {
      setIsFetching(true);
      setTimeout(() => {
        setIsFetching(false);
        onLoadMore();
      }, 3000); // Delay for 3000ms (3 seconds) before loading more data
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  useEffect(() => {
    scrollToPosition(scrollPosition);
  }, [scrollPosition, tasks]);

  const renderTaskItems = () => {
    const sortedTasks = tasks
      .slice()
      .sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime());

    const groupedTasks: { [key: string]: Task[] } = {};
    sortedTasks.forEach((task) => {
      const dateString = task.createdDate.toDateString();
      if (!groupedTasks[dateString]) {
        groupedTasks[dateString] = [];
      }
      groupedTasks[dateString].push(task);
    });

    return Object.keys(groupedTasks).map((dateString) => (
      <div key={dateString}>
        <h2 className="text-lg font-semibold text-gray-700 bg-gray-200 p-3">
          {dateString}
        </h2>
        {groupedTasks[dateString].map((task, idx) => (
          <TaskItem
            key={task.id}
            no={idx + 1}
            task={task}
            onDelete={() => onDelete(task.id)}
          />
        ))}
      </div>
    ));
  };

  return (
    <div
      data-testid={"list-" + status}
      ref={containerRef}
      className="lg:h-[700px] md:h-lvh max-h-lvh overflow-y-auto border border-gray-300 rounded-md py-4"
    >
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {status.toUpperCase()}
      </h1>
      {renderTaskItems()}
      <div className="text-center mt-4 text-gray-600">
        Total Rows: {tasks.length}
      </div>
      {isFetching && !stopLoadMore[status] && (
        <div className="flex items-center justify-center mt-4">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10 mr-2"></div>
          <span className="text-gray-600 text-sm">Loading more...</span>
        </div>
      )}
    </div>
  );
};

export default TaskList;
