export interface TodoListRequest {
  offset: number;
  limit: number;
  sortBy: string;
  isAsc: boolean;
  status?: string;
}
export interface TodoListResponse {
  tasks: Task[];
  pageNumber: number;
  totalPages: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: string;
}

export type Status = "TODO" | "DOING" | "DONE";

export interface StopLoadMore {
  [key: string]: boolean;
}

export interface OffsetTask {
  [key: string]: number;
}

export interface User {
  username: string;
  password: string;
}
