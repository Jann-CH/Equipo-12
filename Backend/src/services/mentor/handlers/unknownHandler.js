import { askGroq } from "../groqService.js";

export async function unknownHandler(context, message) {

  const name = context.profile?.apodo || context.profile?.name || "estudiante";

  try {

    const reply = await askGroq(message, context);

    if (reply) return reply;

  } catch (error) {

    // Si falta la GROQ_API_KEY o falla la consulta, no rompemos el chat:
    // caemos al mensaje genérico de siempre.
    console.error("⚠️ Error consultando Groq:", error.message);

  }

  return `No estoy seguro de haber entendido tu consulta, ${name}.

Podés preguntarme cosas como:

• ¿Qué tareas tengo?

• ¿Cómo va mi progreso?

• ¿Qué puedo estudiar hoy?

• Necesito motivación`;

}
