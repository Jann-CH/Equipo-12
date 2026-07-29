import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './nuevaRacha.css';
import avatarNova from "/branding/Avatar-Nova-Estrella.png";

import { useUser } from '../../contexts/UserContext';
import { setStreakGoal, dismissStreakWelcome } from '../../api/authApi';

export default function SeleccionMetaRacha() {
  const navigate = useNavigate();
  const { updateProfile } = useUser();
  const [saving, setSaving] = useState(false);

  // Configuración de la escala de metas
  const opcionesMetas = [
    { dias: 7, premios: 5, dificultad: "Relajado", badgeColor: "#5af", motivacion: "¡Ideal para asegurar el hábito!" },
    { dias: 14, premios: 12, dificultad: "Regular", badgeColor: "#ff9600", motivacion: "El doble de días, ¡más del doble de premios! 🎯" },
    { dias: 30, premios: 30, dificultad: "Intenso", badgeColor: "#e02424", motivacion: "Para los verdaderos campeones del hábito. 🏆" }
  ];

  // Inicializamos con la meta de 7 días por defecto
  const [metaActual, setMetaActual] = useState(opcionesMetas[0]);

  const handleConfirmar = async () => {
    // Optimista: lo marcamos como visto/configurado ya mismo en el estado
    // local, así no depende de que el Backend responda a tiempo.
    updateProfile("streakGoal", metaActual.dias);
    updateProfile("hasSeenStreakWelcome", true);

    try {
      setSaving(true);
      await setStreakGoal(metaActual.dias);
    } catch (error) {
      console.error("⚠️ No se pudo guardar la meta de racha en el Backend:", error);
    } finally {
      setSaving(false);
      navigate("/mi-recorrido");
    }
  };

  const handleConfigurarDespues = async () => {
    updateProfile("hasSeenStreakWelcome", true);
    try {
      await dismissStreakWelcome();
    } catch (error) {
      console.error("⚠️ No se pudo actualizar el perfil en el Backend:", error);
    } finally {
      navigate("/mi-recorrido");
    }
  };

  return (
    <div className="streak-overlay-container">
      <section className="info-card new-streak-card pop-in-animation">
        
        {/* Encabezado del selector */}
        <div className="new-streak-header">
          <span className="welcome-back-badge">🎯 FIJA TU PRÓXIMO OBJETIVO</span>
          <h2>Elige tu meta de racha</h2>
          <p className="new-streak-motivation">
            ¡Elige el compromiso que vas a asumir hoy y asegura tus premios al completarlo!
          </p>
        </div>

        {/* Ilustración central dinámica */}
        <div className="new-streak-stats-wrapper selector-avatar-margin">
          <div className="avatar-pulse-container">
            <img 
              src={avatarNova} 
              alt="Avatar Nova Estrella" 
              className="star-avatar animated pulse-effect" 
              // Al hacer clic en el avatar, también da una ruta de escape amigable al Dashboard
              onClick={() => navigate('/dashboard')} 
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className="new-streak-number-wrapper">
            <div className="new-streak-count active">
              {metaActual.dias}
            </div>
            <div className="new-streak-label">Días como Meta</div>
          </div>
        </div>

        {/* Opciones de tarjetas interactivas */}
        <div className="goals-selector-list">
          {opcionesMetas.map((meta) => {
            const esActiva = metaActual.dias === meta.dias;
            return (
              <button
                key={meta.dias}
                type="button"
                className={`goal-option-card ${esActiva ? 'is-active' : ''}`}
                onClick={() => setMetaActual(meta)}
              >
                <div className="goal-option-info">
                  <div className="goal-option-title">
                    Meta de {meta.dias} días
                    <span 
                      className="goal-difficulty-badge"
                      style={{ backgroundColor: meta.badgeColor }}
                    >
                      {meta.dificultad}
                    </span>
                  </div>
                  <div className="goal-option-sub">
                    {meta.motivacion}
                  </div>
                </div>
                
                <div className="goal-option-prize">
                  <span className="prize-icon">🎁</span>
                  <span className="prize-amount">{meta.premios}</span>
                  <span className="prize-label">premios</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Botones de acción inferiores */}
        <div className="new-streak-actions vertical-actions">
          <button className="btn-continue-streak" onClick={handleConfirmar} disabled={saving}>
            {saving ? "Guardando..." : `¡Acepto el reto de ${metaActual.dias} días!`}
          </button>

          <button className="btn-cancel-streak" onClick={handleConfigurarDespues}>
            Configurar después
          </button>
        </div>

      </section>
    </div>
  );
}