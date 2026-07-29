const MOCK_RESPONSES = [
  "¡Gracias por contarme! Cada día que estudiás cuenta 💪",
  "Entiendo cómo te sentís. ¿Querés que repasemos algo juntos?",
  "¡Vas muy bien! No te rindas 🌟",
];

export async function getGreeting() {
  return "¡Hola! ¿Listo para estudiar hoy? 💪";
}

export async function reply(message) {
  // TODO: reemplazar por una llamada real a un LLM (OpenAI, Gemini, etc.)
  // usando `message` como prompt del usuario.
  return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
}
