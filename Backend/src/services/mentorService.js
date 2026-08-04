import { processMessage } from "./mentor/index.js";
import { getUserProfile } from "./userService.js";

export async function getGreeting(uid) {

  const profile = await getUserProfile(uid);

  const name =
    profile?.apodo ||
    profile?.name ||
    "estudiante";

  return `¡Hola ${name}! 👋

Me alegra verte nuevamente.

¿En qué puedo ayudarte hoy?`;
}

export async function chat(uid, message) {

  const reply = await processMessage(uid, message);

  return {
    reply,
  };

}