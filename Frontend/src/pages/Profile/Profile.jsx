import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";

import useDashboard from "../../hooks/useDashboard";
import { useUser } from "../../contexts/UserContext";
import { auth } from "../../services/firebase/authService";
import { setReminder } from "../../api/authApi";

export function Profile() {

  const navigate = useNavigate();
  const { userProfile, loading, handleLogout } = useDashboard();
  const { updateProfile } = useUser();

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTimeState] = useState("09:00");
  const [savingReminder, setSavingReminder] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-gray-400">Cargando perfil...</p>
      </div>
    );
  }

  async function handleChangePassword(event) {
    event.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (newPassword.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setSavingPassword(true);
      await updatePassword(auth.currentUser, newPassword);
      setPasswordMessage("Contraseña actualizada correctamente.");
      setNewPassword("");
      setShowPasswordForm(false);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/requires-recent-login") {
        setPasswordError("Por seguridad, cerrá sesión y volvé a iniciarla antes de cambiar la contraseña.");
      } else {
        setPasswordError("No se pudo cambiar la contraseña. Intentá nuevamente.");
      }
    } finally {
      setSavingPassword(false);
    }
  }

  async function handleToggleReminder() {
    const next = !reminderEnabled;
    setReminderEnabled(next);

    try {
      setSavingReminder(true);
      await setReminder(next, reminderTime);
      updateProfile("reminderEnabled", next);
    } catch (error) {
      console.error("⚠️ No se pudo actualizar el recordatorio:", error);
    } finally {
      setSavingReminder(false);
    }
  }

  async function handleReminderTimeChange(event) {
    const value = event.target.value;
    setReminderTimeState(value);

    try {
      await setReminder(reminderEnabled, value);
      updateProfile("reminderTime", value);
    } catch (error) {
      console.error("⚠️ No se pudo actualizar el recordatorio:", error);
    }
  }

  return (
    <div className="flex flex-col gap-4 py-6 px-4 max-w-xl mx-auto pb-10">

      <h1 className="text-lg font-medium text-gray-900">Perfil</h1>

      {/* Datos personales */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-4">

        <div>
          <p className="text-xs text-gray-400 mb-1">Nombre completo</p>
          <p className="text-sm text-gray-900 bg-gray-50 rounded-xl px-3 py-2.5">
            {userProfile.name || "—"}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">Correo electrónico</p>
          <p className="text-sm text-gray-900 bg-gray-50 rounded-xl px-3 py-2.5">
            {userProfile.email || "—"}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">Contraseña</p>

          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="flex items-center justify-between w-full text-sm text-gray-500 bg-gray-50 rounded-xl px-3 py-2.5 hover:bg-gray-100"
            >
              <span>••••••••••••</span>
              <span className="text-xs text-indigo-600 font-medium">Cambiar contraseña</span>
            </button>
          ) : (
            <form onSubmit={handleChangePassword} className="flex flex-col gap-2">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña (mín. 6 caracteres)"
                className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-xl disabled:opacity-50"
                >
                  {savingPassword ? "Guardando..." : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="text-xs text-gray-500 px-4 py-2"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          {passwordMessage && <p className="text-xs text-emerald-600 mt-1">{passwordMessage}</p>}
          {passwordError && <p className="text-xs text-red-500 mt-1">{passwordError}</p>}
        </div>
      </div>

      {/* Mi objetivo */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <p className="text-sm font-medium text-gray-900 mb-2">🎯 Mi objetivo</p>
        <p className="text-sm text-gray-600 mb-3">
          {userProfile.goal || "Todavía no definiste un objetivo."}
        </p>
        <button
          onClick={() => navigate("/objetivos")}
          className="text-xs border border-dashed border-indigo-300 text-indigo-600 rounded-xl px-3 py-2 w-full hover:bg-indigo-50"
        >
          ✏️ Editar objetivo
        </button>
      </div>

      {/* Recordatorios */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <p className="text-sm font-medium text-gray-900 mb-3">🔔 Recordatorios</p>

        <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-3 py-2.5 mb-2">
          <span className="text-sm text-gray-700">Recordarme usar la app</span>
          <button
            onClick={handleToggleReminder}
            disabled={savingReminder}
            className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${
              reminderEnabled ? "bg-emerald-500 justify-end" : "bg-gray-300 justify-start"
            }`}
            aria-label="Activar recordatorio"
          >
            <span className="w-5 h-5 rounded-full bg-white shadow" />
          </button>
        </div>

        {reminderEnabled && (
          <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-3 py-2.5">
            <span className="text-sm text-gray-700 flex items-center gap-2">🕐 Hora</span>
            <input
              type="time"
              value={reminderTime}
              onChange={handleReminderTimeChange}
              className="text-sm bg-transparent focus:outline-none"
            />
          </div>
        )}

        <p className="text-xs text-gray-400 mt-2">
          Vas a recibir un correo a esa hora recordándote usar la app.
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="text-sm text-red-600 border border-red-200 rounded-xl px-4 py-3 mt-2 hover:bg-red-50"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
