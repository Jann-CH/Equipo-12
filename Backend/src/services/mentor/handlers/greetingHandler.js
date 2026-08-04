export function greetingHandler(context) {

    const { profile } = context;

    const name = profile?.apodo || profile?.name || "estudiante";

    return `¡Hola ${name}! 👋

Me alegra verte nuevamente.

Estoy aquí para ayudarte con tus estudios.

¿En qué puedo ayudarte hoy?`;
}