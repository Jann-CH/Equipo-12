import { useState } from "react";
import { X, Calendar, Timer as TimerIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../contexts/TasksContext";

const DURATION_PRESETS = [5, 10, 15, 25, 30];

export function TaskDetailModal() {

  const { selectedTask, closeTaskDetail, finishTask } = useTasks();
  const navigate = useNavigate();
  const [wantsTimer, setWantsTimer] = useState(false);
  const [duration, setDuration] = useState(15);

  if (!selectedTask) return null;

  async function handleComplete() {
    try {
      await finishTask(selectedTask.id);
      closeTaskDetail();
    } catch (error) {
      console.error("⚠️ No se pudo completar la tarea:", error);
    }
  }

  function handleStartTimer() {
    const task = selectedTask;
    closeTaskDetail();
    navigate("/temporizador", {
      state: {
        type: "tarea",
        title: task.title,
        durationMinutes: duration,
        taskId: task.id,
      },
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
      onClick={closeTaskDetail}
    >
      <div
        className="w-full md:max-w-md bg-[#FBF9F6] rounded-t-3xl md:rounded-3xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={closeTaskDetail}
            className="w-9 h-9 rounded-full border-2 border-gray-900 flex items-center justify-center"
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>

          <h2 className="text-base font-semibold text-gray-900">Detalle de la tarea</h2>

          <div className="w-9" /> {/* espaciador para centrar el título */}
        </div>

        <label className="text-sm text-gray-400 block mb-1">Título</label>
        <p className="w-full bg-white rounded-2xl px-4 py-3 mb-4 text-sm shadow-sm">
          {selectedTask.title}
        </p>

        {selectedTask.notes && (
          <>
            <label className="text-sm text-gray-400 block mb-1">Notas</label>
            <p className="w-full bg-white rounded-2xl px-4 py-3 mb-4 text-sm shadow-sm">
              {selectedTask.notes}
            </p>
          </>
        )}

        {selectedTask.dueDate && (
          <div className="flex items-center gap-2 bg-emerald-100/70 rounded-2xl px-4 py-3 mb-4 text-sm text-gray-700">
            <Calendar size={16} />
            {selectedTask.dueDate}
          </div>
        )}

        {!selectedTask.completed && (
          <div className="mb-4">
            <button
              onClick={() => setWantsTimer((prev) => !prev)}
              className="flex items-center gap-2 text-sm text-indigo-600 mb-2"
            >
              <TimerIcon size={16} />
              Usar temporizador (opcional)
            </button>

            {wantsTimer && (
              <div className="bg-gray-50 rounded-2xl p-3">
                <p className="text-xs text-gray-500 mb-2">Elegí la duración</p>
                <div className="flex gap-2 flex-wrap mb-3">
                  {DURATION_PRESETS.map((min) => (
                    <button
                      key={min}
                      onClick={() => setDuration(min)}
                      className={`text-xs px-3 py-1.5 rounded-full ${
                        duration === min
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-600 border border-gray-200"
                      }`}
                    >
                      {min} min
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleStartTimer}
                  className="w-full bg-white border border-indigo-200 text-indigo-600 text-sm font-medium py-2.5 rounded-xl hover:bg-indigo-50"
                >
                  Iniciar temporizador
                </button>
              </div>
            )}
          </div>
        )}

        {!selectedTask.completed ? (
          <button
            onClick={handleComplete}
            className="w-full bg-indigo-600 text-white text-sm font-medium py-3 rounded-2xl hover:bg-indigo-700"
          >
            Marcar como completada
          </button>
        ) : (
          <p className="text-center text-sm text-emerald-600 font-medium">✔️ Ya completada</p>
        )}
      </div>
    </div>
  );
}
