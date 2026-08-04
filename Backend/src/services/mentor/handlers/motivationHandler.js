export function motivationHandler(context) {

  const profile = context.profile;

  return `💪 ${profile.name}, recordá que cada pequeño paso cuenta.

🔥 Racha actual: ${profile.streak} días
✅ Tareas completadas: ${profile.tasksCompleted}

No hace falta estudiar perfecto.
Solo seguí avanzando un poco cada día. 🌱`;

}