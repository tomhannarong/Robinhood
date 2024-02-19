import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { Task, StopLoadMore, Status } from "../types";
import useScrollPosition from "../hooks/useScrollPosition";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  setOffsets: (status: Status) => void;
  onLoadMore: () => void;
  status: Status;
  stopLoadMore: StopLoadMore;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onLoadMore,
  status,
  stopLoadMore,
  setOffsets,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const { scrollPosition, scrollToPosition, containerRef } =
    useScrollPosition();

  const onScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;

      if (isNearBottom && !isFetching && !stopLoadMore[status.toLowerCase()]) {
        console.log("Reached bottom");

        setIsFetching(true);
        setTimeout(() => {
          onLoadMore();
          setOffsets(status);
          setIsFetching(false);
        }, 3000); // Delay for 3000ms (3 seconds) before loading more data
      }
    }
  };

  useEffect(() => {
    const listInnerElement = containerRef.current;
    if (!listInnerElement) return;

    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", onScroll);

      // Clean-up
      return () => {
        listInnerElement.removeEventListener("scroll", onScroll);
      };
    }
  }, [isFetching]);

  useEffect(() => {
    scrollToPosition(scrollPosition);
  }, [scrollPosition, tasks]);

  const renderTaskItems = () => {
    const groupedTasks: { [key: string]: Task[] } = {};
    tasks.forEach((task) => {
      const taskDate = new Date(task.createdAt);
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
      };
      let dateString = taskDate
        .toLocaleDateString("en-GB", options)
        .toUpperCase();

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      if (taskDate.toDateString() === today.toDateString()) {
        dateString = "Today";
      } else if (taskDate.toDateString() === tomorrow.toDateString()) {
        dateString = "Tomorrow";
      }
      if (!groupedTasks[dateString]) {
        groupedTasks[dateString] = [];
      }
      groupedTasks[dateString].push(task);
    });

    return Object.keys(groupedTasks).map((dateString) => (
      <div key={dateString} className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 p-3 px-6">
          {dateString}
        </h2>
        {groupedTasks[dateString].map((task, idx) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={() => onDelete(task.id)}
          />
        ))}
      </div>
    ));
  };

  return (
    <div>
      <div
        data-testid={"list-" + status}
        ref={containerRef}
        className="lg:h-[700px] md:h-lvh max-h-lvh overflow-y-auto border-0 border-gray-300 rounded-md py-4 "
      >
        {renderTaskItems()}
        <div className="text-center mt-4 text-gray-600">
          Total Rows: {tasks.length}
        </div>
      </div>
      {isFetching && !stopLoadMore[status.toLowerCase()] && (
        <div className="flex items-center justify-center mt-4">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10 mr-2"></div>
          <span className="text-gray-600 text-sm">Loading more...</span>
        </div>
      )}
    </div>
  );
};

export default TaskList;
