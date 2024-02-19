import { END_POINT } from "../constants";
import { TodoListRequest, TodoListResponse } from "../types";

export default async function handleTodoList(req: TodoListRequest) {
  const { limit, offset, sortBy, isAsc, status = "" } = req;
  let paramStatus = "";
  if (status) {
    paramStatus = `&status=${status}`;
  }

  try {
    // Construct the URL with query parameters
    const apiUrl = `${END_POINT}?limit=${limit}&offset=${offset}&sortBy=${sortBy}&isAsc=${isAsc}${paramStatus}`;

    // Make the API call
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    // Parse the response body as JSON
    const data: TodoListResponse = await response.json();
    // Send the data as response
    return data;
  } catch (error) {
    console.error("HandleTodoList", error);
    return null;
  }
}
