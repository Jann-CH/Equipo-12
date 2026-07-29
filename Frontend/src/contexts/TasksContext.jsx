import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import { getTasks, createTask, completeTask } from "../api/tasksApi";

const TasksContext = createContext();

export function TasksProvider({ children }) {

  const { currentUser } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {

    if (!currentUser) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    getTasks()
      .then(setTasks)
      .catch((error) => console.error("⚠️ Error cargando tareas:", error))
      .finally(() => setLoading(false));

  }, [currentUser]);

  async function addTask({ title, notes, dueDate }) {
    const task = await createTask({ title, notes, dueDate });
    setTasks((prev) => [task, ...prev]);
  }

  async function finishTask(id) {
    // Actualización OPTIMISTA: la tarea desaparece de "pendientes" al instante,
    // sin esperar la respuesta del Backend. Esto es importante porque en el
    // plan gratuito de Render el servidor se "duerme" y el primer request
    // después de un rato puede tardar 30-50s — sin esto, parecía que el
    // check "no hacía nada".
    const previousTasks = tasks;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: true, completedAt: new Date().toISOString() }
          : task
      )
    );

    try {
      const updated = await completeTask(id);
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
      setSelectedTask((prev) => (prev?.id === id ? updated : prev));
    } catch (error) {
      console.error("⚠️ No se pudo completar la tarea, revirtiendo el cambio:", error);
      setTasks(previousTasks);
      throw error;
    }
  }

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <TasksContext.Provider
      value={{
        pendingTasks,
        completedTasks,
        loading,
        addTask,
        finishTask,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
        selectedTask,
        openTaskDetail: (task) => setSelectedTask(task),
        closeTaskDetail: () => setSelectedTask(null),
      }}
    >
      {children}
    </TasksContext.Provider>
  );

}

export function useTasks() {
  return useContext(TasksContext);
}
