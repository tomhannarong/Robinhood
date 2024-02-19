"use client";

import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { OffsetTask, Status, StopLoadMore, Task } from "../types";
import handleTodoList from "../services/todoList";

interface Props {}
const MainScreen: React.FC<Props> = ({}) => {
  const [newTasks, setNewTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<Status>("TODO");
  const statusTab: Status[] = ["TODO", "DOING", "DONE"];
  const [stopLoadMore, setStopLoadMore] = useState<StopLoadMore>({
    todo: false,
    doing: false,
    done: false,
  });
  const [offsets, setOffsets] = useState<OffsetTask>({
    todo: 0,
    doing: 0,
    done: 0,
  });
  const limit = 10; // Limit of tasks per page

  const getTodoList = async (status: Status, offset: number = 0) => {
    const todoList = await handleTodoList({
      isAsc: true,
      limit,
      offset,
      sortBy: "createdAt",
      status,
    });
    if (todoList) {
      return todoList.tasks;
    }
    return [];
  };

  useEffect(() => {
    handleSetNewTasksAll();
  }, []);

  const handleSetNewTasksAll = async () => {
    const todoTasks = await getTodoList("TODO", 0);
    const doingTasks = await getTodoList("DOING", 0);
    const doneTasks = await getTodoList("DONE", 0);
    setNewTasks([...todoTasks, ...doingTasks, ...doneTasks]);
  };

  const handleDelete = (id: string) => {
    setNewTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const visibleTasks = newTasks.filter((task) => task.status === activeTab);

  const loadMoreTasks = async (status: Status) => {
    const nextOffset = offsets[status.toLowerCase()] + 1;
    if (stopLoadMore[status.toLowerCase()]) {
      setStopLoadMore((prev) => ({
        ...prev,
        [status.toLowerCase()]: true,
      }));
    }
    const tasks = await getTodoList(activeTab, nextOffset);
    if (!tasks.length) {
      setStopLoadMore((prev) => ({
        ...prev,
        [status.toLowerCase()]: true,
      }));
    } else {
      setNewTasks((prevTasks) => [...prevTasks, ...tasks]);
    }
  };

  function setOffsetsTask(status: Status): void {
    const newOffset = offsets[status.toLowerCase()] + 1;
    setOffsets((prevOffsets) => ({
      ...prevOffsets,
      [status.toLowerCase()]: newOffset,
    }));
  }
  function handleTabChange(tab: Status): void {
    setActiveTab(tab);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="">
        <div className="flex flex-wrap items-center justify-center">
          <div
            id="header"
            className="grid grid-cols-1 justify-center lg:w-2/4 w-full lg:px-10 px-6 mb-10 bg-indigo-100 rounded-b-[60px]"
          >
            <div id="tabs" className="flex justify-end py-10 pt-6">
              <div
                id="avatar"
                className="w-20 h-20 rounded-full bg-gray-300"
              ></div>
            </div>

            <div id="description" className="lg:px-5">
              <h1 className="text-4xl font-bold text-gray-500">Hi! User</h1>
              <p className="text-xl font-bold text-gray-500 py-2 pt-3">
                This is just a simple UI.
              </p>
              <p className="text-xl font-bold text-gray-500 pb-5">
                Open to create your style :D
              </p>
            </div>
            <div className="relative h-[80px]">
              <div className="absolute -bottom-10 mb-4 z-50 w-full">
                <div
                  id="tabs"
                  className="grid grid-cols-3 gap-4 justify-center p-3 px-6 bg-gray-100 rounded-full"
                >
                  {statusTab.map((tab) => (
                    <button
                      key={tab}
                      className={`py-2 rounded-2xl text-lg hover:font-bold ${
                        tab === activeTab
                          ? "bg-gradient-to-r from-indigo-400 to-cyan-400 text-white shadow-xl  "
                          : "bg-gray-100 text-gray-400"
                      }`}
                      onClick={() => handleTabChange(tab)}
                    >
                      {tab === "TODO" && "To-do"}
                      {tab === "DOING" && "Doing"}
                      {tab === "DONE" && "Done"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        <div key={activeTab} className="lg:w-2/4 w-full  px-2 mb-4">
          {activeTab === "TODO" && (
            <TaskList
              tasks={visibleTasks}
              onDelete={handleDelete}
              onLoadMore={() => loadMoreTasks("TODO")}
              status="TODO"
              stopLoadMore={stopLoadMore}
              setOffsets={setOffsetsTask}
            />
          )}
          {activeTab === "DOING" && (
            <TaskList
              tasks={visibleTasks}
              onDelete={handleDelete}
              onLoadMore={() => loadMoreTasks("DOING")}
              status="DOING"
              stopLoadMore={stopLoadMore}
              setOffsets={setOffsetsTask}
            />
          )}
          {activeTab === "DONE" && (
            <TaskList
              tasks={visibleTasks}
              onDelete={handleDelete}
              onLoadMore={() => loadMoreTasks("DONE")}
              status="DONE"
              stopLoadMore={stopLoadMore}
              setOffsets={setOffsetsTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
