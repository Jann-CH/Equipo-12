import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { useTasks } from "../../contexts/TasksContext";

export function NewTaskModal() {

  const { isModalOpen, closeModal, addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [wantsDueDate, setWantsDueDate] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [justCreated, setJustCreated] = useState(false);

  if (!isModalOpen) return null;

  function resetAndClose() {
    setTitle("");
    setNotes("");
    setWantsDueDate(false);
    setDueDate("");
    setJustCreated(false);
    closeModal();
  }

  async function handleCreate() {
    if (!title.trim()) return;

    try {
      setSaving(true);
      // Al resolver esto, la tarea ya está en el estado de TasksContext —
      // por eso, apenas se cierre este modal (con "Listo"), ya se va a ver
      // reflejada en "Tareas pendientes" sin que haga falta recargar nada.
      await addTask({
        title: title.trim(),
        notes: notes.trim() || null,
        dueDate: wantsDueDate && dueDate ? dueDate : null,
      });
      setJustCreated(true);
    } catch (error) {
      console.error("⚠️ No se pudo crear la tarea:", error);
    } finally {
      setSaving(false);
    }
  }

  if (justCreated) {
    return (
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
        <div className="w-full md:max-w-md bg-[#FBF9F6] rounded-t-3xl md:rounded-3xl p-8 shadow-xl flex flex-col items-center text-center gap-3">
          <CheckCircle2 size={48} className="text-emerald-500" />
          <h2 className="text-base font-semibold text-gray-900">¡Tarea creada!</h2>
          <p className="text-sm text-gray-500">
            Ya la vas a ver en "Tareas pendientes".
          </p>
          <button
            onClick={resetAndClose}
            className="mt-2 bg-indigo-600 text-white text-sm font-medium px-8 py-2.5 rounded-xl hover:bg-indigo-700"
          >
            Listo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
      onClick={resetAndClose}
    >
      <div
        className="w-full md:max-w-md bg-[#FBF9F6] rounded-t-3xl md:rounded-3xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={resetAndClose}
            className="w-9 h-9 rounded-full border-2 border-gray-900 flex items-center justify-center"
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>

          <h2 className="text-base font-semibold text-gray-900">Nueva tarea</h2>

          <button
            onClick={handleCreate}
            disabled={saving || !title.trim()}
            className="bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded-xl disabled:opacity-50"
          >
            {saving ? "Creando..." : "Crear"}
          </button>
        </div>

        {/* Título */}
        <label className="text-sm text-gray-400 block mb-1">Título</label>
        <input
          autoFocus
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white rounded-2xl px-4 py-3 mb-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        {/* Notas */}
        <label className="text-sm text-gray-400 block mb-1">Notas</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full bg-white rounded-2xl px-4 py-3 mb-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        {/* Añadir fecha límite */}
        <div className="flex items-center justify-between bg-emerald-100/70 rounded-2xl px-4 py-3 mb-2">
          <span className="text-sm text-gray-800">Añadir fecha límite</span>
          <button
            onClick={() => setWantsDueDate((prev) => !prev)}
            className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${
              wantsDueDate ? "bg-emerald-500 justify-end" : "bg-gray-300 justify-start"
            }`}
            aria-label="Añadir fecha límite"
          >
            <span className="w-5 h-5 rounded-full bg-white shadow" />
          </button>
        </div>

        {wantsDueDate && (
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-emerald-100/70 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:outline-none"
          />
        )}
      </div>
    </div>
  );
}
