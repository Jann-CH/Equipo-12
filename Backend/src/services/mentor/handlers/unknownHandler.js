export function unknownHandler(context){

    const name = context.profile?.apodo || context.profile?.name || "estudiante";

    return `No estoy seguro de haber entendido tu consulta, ${name}.

Podés preguntarme cosas como:

• ¿Qué tareas tengo?

• ¿Cómo va mi progreso?

• ¿Qué puedo estudiar hoy?

• Necesito motivación`;
}