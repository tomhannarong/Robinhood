export interface Task {
  id: string;
  title: string;
  status: "todo" | "doing" | "done";
  createdDate: Date;
}

export type Status = "todo" | "doing" | "done";

export interface StopLoadMore {
  todo: boolean;
  doing: boolean;
  done: boolean;
}

export interface User {
  username: string;
  password: string;
}
