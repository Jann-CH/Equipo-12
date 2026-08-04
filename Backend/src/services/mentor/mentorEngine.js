import { detectIntent, INTENTS } from "./intentService.js";
import { getContext } from "./contextService.js";
import { handlers } from "./handlers/index.js";

export async function processMessage(uid, message) {

  const context = await getContext(uid);

  const intent = detectIntent(message);

  const handler = handlers[intent] || handlers[INTENTS.UNKNOWN];

  return handler(context, message);

}