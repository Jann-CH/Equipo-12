import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./Timer.css";

import { completeChallenge } from "../../api/authApi";
import { useTasks } from "../../contexts/TasksContext";

// Pantalla exclusiva de enfoque: se usa tanto para "Comenzar desafío" como
// para el temporizador opcional de una tarea. No tiene navbar ni botones
// que distraigan — solo nombre, tiempo restante y (mínimo) pausar/cancelar.
export default function Timer() {

  const location = useLocation();
  const navigate = useNavigate();
  const { finishTask } = useTasks();

  const state = location.state;
  const { type, title, durationMinutes, taskId } = state || {};

  const [secondsLeft, setSecondsLeft] = useState((durationMinutes || 0) * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!state) {
      navigate("/mi-recorrido", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!state || isPaused || isDone) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isPaused, isDone, state]);

  async function handleThanks() {
    try {
      setSaving(true);

      if (type === "desafio") {
        await completeChallenge();
      } else if (type === "tarea" && taskId) {
        await finishTask(taskId);
      }
    } catch (error) {
      console.error("⚠️ No se pudo registrar la finalización:", error);
    } finally {
      navigate("/mi-recorrido");
    }
  }

  if (!state) return null;

  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="timer-screen">
      <p className="timer-label">{type === "tarea" ? "Tarea" : "Desafío"}</p>
      <h1 className="timer-title">{title}</h1>

      <div className="timer-clock">{minutes}:{seconds}</div>

      <button className="timer-pause" onClick={() => setIsPaused((p) => !p)}>
        {isPaused ? "▶ Reanudar" : "⏸ Pausar"}
      </button>

      <button className="timer-cancel" onClick={() => navigate("/mi-recorrido")}>
        Cancelar
      </button>

      {isDone && (
        <div className="timer-modal-overlay">
          <div className="timer-modal">
            <h2>{type === "tarea" ? "¡Tarea completada! 🎉" : "¡Desafío completado! 🎉"}</h2>
            <button onClick={handleThanks} disabled={saving}>
              {saving ? "Guardando..." : "Gracias"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
