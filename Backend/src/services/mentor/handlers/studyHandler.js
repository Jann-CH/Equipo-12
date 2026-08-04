export function studyHandler(context) {

  const interests =
    context.profile.interests.length
      ? context.profile.interests.join(", ")
      : "tus materias";

  return `📚 Veo que te interesan:

${interests}

Mi consejo es estudiar en bloques de 25 minutos y descansar 5 minutos.

Si querés, también puedo ayudarte a organizar tus tareas.`;

}