import { apiRequest } from "./client";

export async function getContent() {
  return apiRequest("/content");
}

export async function createContent({ name, type, text }) {
  return apiRequest("/content", {
    method: "POST",
    body: JSON.stringify({ name, type, text }),
  });
}
