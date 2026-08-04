import { INTENTS } from "../intentService.js";

import { greetingHandler } from "./greetingHandler.js";
import { tasksHandler } from "./tasksHandler.js";
import { startHandler } from "./startHandler.js";
import { motivationHandler } from "./motivationHandler.js";
import { studyHandler } from "./studyHandler.js";
import { unknownHandler } from "./unknownHandler.js";

export const handlers = {
  [INTENTS.GREETING]: greetingHandler,
  [INTENTS.TASKS]: tasksHandler,
  [INTENTS.START]: startHandler,
  [INTENTS.MOTIVATION]: motivationHandler,
  [INTENTS.STUDY]: studyHandler,
  [INTENTS.UNKNOWN]: unknownHandler,
};