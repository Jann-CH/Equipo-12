
import "./Ready.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import avatarNova from "/branding/avatar-nova-hi.png";

import PrimaryButton from "../../components/common/PrimaryButton/PrimaryButton";
import { useUser } from "../../contexts/UserContext";
import { saveOnboarding } from "../../api/authApi";

function Ready() {
  const navigate = useNavigate();
  const { userProfile, refreshProfile } = useUser();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleStart() {
    try {
      setSaving(true);
      setError("");

      await saveOnboarding({
        goal: userProfile.goal,
        challenge: userProfile.challenge,
        time: userProfile.time,
        interests: userProfile.interests,
      });

      // Nos aseguramos de que el estado local quede 100% sincronizado con
      // lo que efectivamente se guardó en Firestore (evita que "Mi objetivo"
      // se vea vacío si el guardado tardó o si había datos parciales).
      await refreshProfile();

      navigate("/mi-recorrido");
    } catch (err) {
      console.error("⚠️ No se pudo guardar el onboarding:", err);
      // Aunque falle el guardado, no bloqueamos al usuario: puede seguir usando la app.
      navigate("/mi-recorrido");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="ready-container">
      <div className="ready-card">

        <img
          src={avatarNova}
          alt="Nova"
          className="ready-avatar"
        />

        <h1 className="ready-title">
          ¡Perfecto! 🎉
        </h1>

        <p className="ready-text">
          Gracias por contarme un poco sobre vos.
        </p>

        <p className="ready-text">
          Ahora ya conozco tus objetivos,
          los desafíos que querés superar,
          el tiempo que podés dedicar
          y los temas que más te interesan.
        </p>

        <div className="ready-summary">

          <div className="summary-item">
            ✅ Objetivo definido
          </div>

          <div className="summary-item">
            ✅ Tiempo registrado
          </div>

          <div className="summary-item">
            ✅ Intereses guardados
          </div>

        </div>

        <p className="ready-text">
          Con toda esta información,
          voy a preparar un recorrido
          pensado especialmente para vos.
        </p>

        <h2 className="ready-question">
          Estoy lista.
          <br />
          ¿Comenzamos?
        </h2>

        {error && <p className="ready-text" style={{ color: "#e53935" }}>{error}</p>}

        <PrimaryButton
          text={saving ? "Guardando..." : "Comenzar mi recorrido"}
          onClick={handleStart}
          disabled={saving}
        />

      </div>
    </div>
  );
}

export default Ready;