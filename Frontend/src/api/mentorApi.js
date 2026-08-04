import { apiRequest } from "./client";

export async function getMentorGreeting() {
  const data = await apiRequest("/mentor/greeting");
  return data.message;
}

export async function sendMessageToMentor(message) {
  const data = await apiRequest("/mentor/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });

  return data.reply;
}