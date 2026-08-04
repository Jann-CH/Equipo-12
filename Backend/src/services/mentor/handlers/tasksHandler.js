export function tasksHandler(context) {

  const pending = context.tasks.filter(task => !task.completed);

  if (!pending.length) {

    return `🎉 ¡Excelente!

No tenés tareas pendientes.

Podemos crear una nueva meta o repasar algún tema.`;

  }

  const list = pending
    .map(task => `• ${task.title}`)
    .join("\n");

  return `📋 Estas son tus tareas pendientes:

${list}

Te recomiendo comenzar por la primera. 💪`;

}