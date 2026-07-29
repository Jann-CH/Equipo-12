import { apiRequest } from "./client";

export async function getTasks() {
  return apiRequest("/tasks");
}

export async function createTask({ title, notes, dueDate }) {
  return apiRequest("/tasks", {
    method: "POST",
    body: JSON.stringify({ title, notes, dueDate }),
  });
}

export async function completeTask(id) {
  return apiRequest(`/tasks/${id}/complete`, {
    method: "PATCH",
  });
}
