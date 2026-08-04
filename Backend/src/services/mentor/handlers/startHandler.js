export function startHandler(context) {

  const pending = context.tasks.filter(task => !task.completed);

  if (!pending.length) {

    return `No tenés tareas pendientes.

Podría ser un buen momento para repasar alguno de tus temas favoritos o crear una nueva tarea.`;

  }

  const first = pending[0];

  return `Te recomiendo comenzar por:

📚 ${first.title}

Completarla primero te ayudará a mantener el ritmo de estudio. 💪`;

}