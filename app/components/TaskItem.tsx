import React from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
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
      className="cursor-pointer flex justify-between items-cente py-1 px-6 hover:bg-gray-50 transition duration-200 ease-in-out"
    >
      <SwipeableListItem trailingActions={trailingActions()} className="">
        <div className="flex w-full">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <img
                id="img"
                src="https://dummyimage.com/600x400/000/fff"
                alt="Picture"
                className="h-20 w-20 object-cover rounded-full mr-2"
              />
              <div className="ml-2">
                <p id="title" className="text-lg font-semibold mb-1">
                  {task.title}
                </p>
                <p id="description" className="text-sm text-gray-500">
                  {task.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="icon" className="ml-2">
          <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default TaskItem;
