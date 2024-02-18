import React from "react";

import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { Task } from "../types";

interface TaskItemProps {
  no: number;
  task: Task;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ no, task, onDelete }) => {
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => {
          onDelete();
        }}
      >
        <div className="flex justify-center items-center text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">
          Delete
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList
      key={task.id}
      className="cursor-pointer flex justify-between items-center border-b border-gray-300 py-4 px-6 hover:bg-gray-50 transition duration-200 ease-in-out"
    >
      <SwipeableListItem
        trailingActions={trailingActions()}
        className="flex flex-col"
      >
        <div className="">
          <div className="flex items-center mb-2">
            <span className="text-gray-500 mr-2">No.</span>
            <span className="text-lg font-semibold">{no}</span>
          </div>
          <div>
            <p className="text-lg font-semibold mb-1">{task.title}</p>
            <p className="text-sm text-gray-500">
              {task.createdDate.toDateString()}
            </p>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default TaskItem;
