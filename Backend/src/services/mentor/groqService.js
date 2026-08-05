import OpenAI from "openai";

let client = null;

function getClient() {

  if (!process.env.GROQ_API_KEY) return null;

  if (!client) {
    // Groq expone una API compatible con la de OpenAI — mismo SDK, solo
    // cambia la URL base y el modelo.
    client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });
  }

  return client;

}

export async function askGroq(message, context) {

  const groq = getClient();

  if (!groq) {
    throw new Error("GROQ_API_KEY no configurada en Backend/.env");
  }

  const name = context?.profile?.apodo || context?.profile?.name || "estudiante";

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          `Sos Nova, el mentor virtual de la app NOVA - Innova Mentor, que ayuda a ` +
          `estudiantes a organizarse y mantener hábitos de estudio. Le hablás a ${name}. ` +
          `Respondé siempre en español rioplatense, de forma breve (2 a 4 líneas), cálida ` +
          `y directa. Si te preguntan algo puntual (una cuenta, una definición, una duda de ` +
          `estudio), respondé la respuesta correcta y concisa antes que nada.`,
      },
      { role: "user", content: message },
    ],
    max_tokens: 300,
    temperature: 0.6,
  });

  return completion.choices?.[0]?.message?.content?.trim() || null;

}
