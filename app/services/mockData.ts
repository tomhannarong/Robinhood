// mockData.ts

import { v4 as uuidv4 } from "uuid";
import { en, Faker } from "@faker-js/faker";
import { Status, Task } from "../types";

const generateMockTasks = (status: Status, count: number): Task[] => {
  const tasks: Task[] = [];
  for (let i = 1; i <= count; i++) {
    const id = uuidv4();
    const startDate = new Date("2024-01-01"); // Start date
    const endDate = new Date("2024-01-05"); // End date
    const randomDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );
    tasks.push({
      id: id,
      title: `${generateRandomWords()}`,
      status: status,
      createdDate: randomDate,
    });
  }

  return tasks;
};

const generateRandomWords = () => {
  const faker = new Faker({
    locale: [en],
  });

  return faker.word.words();
};

export default generateMockTasks;
