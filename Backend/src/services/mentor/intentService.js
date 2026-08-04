export const INTENTS = {
  GREETING: "greeting",
  TASKS: "tasks",
  START: "start",
  MOTIVATION: "motivation",
  STUDY: "study",
  UNKNOWN: "unknown",
};

export function detectIntent(message) {
  const text = message.toLowerCase();

  if (
    text.includes("hola") ||
    text.includes("buenas") ||
    text.includes("buen día") ||
    text.includes("buen dia")
  ) {
    return INTENTS.GREETING;
  }

  if (
    text.includes("tarea") ||
    text.includes("pendiente") ||
    text.includes("qué tengo") ||
    text.includes("que tengo")
  ) {
    return INTENTS.TASKS;
  }

  if (
    text.includes("por dónde empiezo") ||
    text.includes("por donde empiezo") ||
    text.includes("qué hago primero") ||
    text.includes("que hago primero")
  ) {
    return INTENTS.START;
  }

  if (
    text.includes("motiv") ||
    text.includes("desanim") ||
    text.includes("no puedo")
  ) {
    return INTENTS.MOTIVATION;
  }

  if (
    text.includes("ayuda") ||
    text.includes("estudiar") ||
    text.includes("concentr")
  ) {
    return INTENTS.STUDY;
  }

  return INTENTS.UNKNOWN;
}