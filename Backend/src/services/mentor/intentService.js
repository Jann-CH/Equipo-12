export const INTENTS = {
  TASKS: "tasks",
  START: "start",
  MOTIVATION: "motivation",
  STUDY: "study",
  UNKNOWN: "unknown",
};

// Frases EXACTAS de los botones de respuesta rápida del chat (ver
// QUICK_REPLIES en Frontend/src/components/mentor/MentorChat.jsx).
// Solo si el mensaje coincide con alguna de estas usamos la respuesta
// prearmada — cualquier otra cosa que el usuario escriba libremente
// (aunque contenga palabras parecidas, tipo "hola" o "ayuda" en medio de
// una oración) la responde Groq, no el mensaje predefinido.
const EXACT_MATCHES = {
  [INTENTS.TASKS]: ["¿qué tareas tengo hoy?", "que tareas tengo hoy"],
  [INTENTS.START]: ["¿por dónde empiezo?", "por donde empiezo"],
  [INTENTS.STUDY]: ["necesito ayuda para estudiar"],
  [INTENTS.MOTIVATION]: ["motivame un poco 💪", "motivame un poco"],
};

function normalize(text) {
  return text.trim().toLowerCase();
}

export function detectIntent(message) {

  const text = normalize(message);

  for (const [intent, phrases] of Object.entries(EXACT_MATCHES)) {
    if (phrases.includes(text)) return intent;
  }

  return INTENTS.UNKNOWN;

}
