"use client";

import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import generateMockTasks from "../services/mockData";
import { Status, StopLoadMore, Task } from "../types";

interface Props {}
const MainScreen: React.FC<Props> = ({}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<Status>("todo");
  const maxFetchData = 40;
  const itemPerTable = 10;
  const itemPerLoadMore = 10;
  const statusTab: Status[] = ["todo", "doing", "done"];
  const [stopLoadMore, setStopLoadMore] = useState<StopLoadMore>({
    todo: false,
    doing: false,
    done: false,
  });

  useEffect(() => {
    const todoTasks = generateMockTasks("todo", itemPerTable);
    const doingTasks = generateMockTasks("doing", itemPerTable);
    const doneTasks = generateMockTasks("done", itemPerTable);

    setTasks([...todoTasks, ...doingTasks, ...doneTasks]);
  }, []);

  const handleDelete = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const visibleTasks = tasks.filter((task) => task.status === activeTab);

  const loadMoreTasks = (status: Status) => {
    let moreTasks: Task[] = [];
    switch (status) {
      case "todo": {
        const todoLength = visibleTasks.length;
        if (todoLength >= maxFetchData || stopLoadMore[status]) {
          setStopLoadMore((prev) => ({ ...prev, todo: true }));
          break;
        }
        moreTasks = generateMockTasks("todo", itemPerLoadMore);
        setTasks((prevTasks) => [...prevTasks, ...moreTasks]);
        break;
      }
      case "doing": {
        const doingLength = visibleTasks.length;
        if (doingLength >= maxFetchData || stopLoadMore[status]) {
          setStopLoadMore((prev) => ({ ...prev, doing: true }));
          break;
        }
        moreTasks = generateMockTasks("doing", itemPerLoadMore);
        setTasks((prevTasks) => [...prevTasks, ...moreTasks]);
        break;
      }
      case "done": {
        const doneLength = visibleTasks.length;
        if (doneLength >= maxFetchData || stopLoadMore[status]) {
          setStopLoadMore((prev) => ({ ...prev, done: true }));
          break;
        }
        moreTasks = generateMockTasks("done", itemPerLoadMore);
        setTasks((prevTasks) => [...prevTasks, ...moreTasks]);
        break;
      }
      default:
        break;
    }
  };

  const handleTabChange = (tab: Status) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4 justify-center mb-4 ">
        {statusTab.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 rounded-lg ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center">
        <div key={activeTab} className="lg:w-3/4 w-full  px-2 mb-4">
          {activeTab === "todo" && (
            <TaskList
              tasks={visibleTasks}
              onDelete={handleDelete}
              onLoadMore={() => loadMoreTasks("todo")}
              status="todo"
              stopLoadMore={stopLoadMore}
            />
          )}
          {activeTab === "doing" && (
            <TaskList
              tasks={visibleTasks}
              onDelete={handleDelete}
              onLoadMore={() => loadMoreTasks("doing")}
              status="doing"
              stopLoadMore={stopLoadMore}
            />
          )}
          {activeTab === "done" && (
            <TaskList
              tasks={visibleTasks}
              onDelete={handleDelete}
              onLoadMore={() => loadMoreTasks("done")}
              status="done"
              stopLoadMore={stopLoadMore}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
