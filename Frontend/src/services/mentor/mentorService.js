import { getMentorGreeting as fetchGreeting, sendMessageToMentor as sendMessage } from "../../api/mentorApi";

// userId ya no hace falta pasarlo: el Backend lo obtiene del token verificado.
// Se deja el parámetro para no romper la firma que usan los hooks.
export async function getMentorGreeting(userId) {
  return fetchGreeting();
}

export async function sendMessageToMentor(message, userId) {
  return sendMessage(message);
}
