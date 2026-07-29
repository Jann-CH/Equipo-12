import { useTasks } from "../../contexts/TasksContext";

export function TaskItem({ task, onComplete }) {

  const { openTaskDetail } = useTasks();

  return (
    <div
      onClick={() => openTaskDetail(task)}
      className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-3 py-2.5 cursor-pointer hover:border-indigo-200"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          Promise.resolve(onComplete(task.id)).catch((error) =>
            console.error("⚠️ No se pudo completar la tarea:", error)
          );
        }}
        className="w-5 h-5 rounded-full border-2 border-indigo-400 shrink-0 hover:bg-indigo-50 transition-colors"
        aria-label="Completar tarea"
        title="Marcar como completada"
      />
      <span className="text-sm text-gray-800">{task.title}</span>
    </div>
  );
}
