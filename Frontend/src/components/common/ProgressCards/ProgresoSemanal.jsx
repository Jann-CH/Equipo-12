import React from 'react';
import './TarjetasProgreso.css';

export const ProgresoSemanal = ({ datos }) => {

  // Días con actividad real esta semana (según weekActivity guardado en el
  // perfil), sobre 7 — reemplaza el 75% fijo que había antes.
  const diasActivos = Object.keys(datos?.weekActivity?.days || {}).length;
  const weeklyProgress = Math.round((diasActivos / 7) * 100);

  const desafiosCompletados = datos?.stats?.completedChallenges ?? datos?.challengesCompleted ?? 0;

  return (
    <div className="metricas-fila">

      {/* 1. Tarjeta de Progreso Semanal */}
      <section className="info-card">
        <div className="card-header">
          <h3>📈 Mi progreso semanal</h3>
        </div>
        <div className="progress-bar">
          <div
            className="progress-value"
            style={{ width: `${weeklyProgress}%` }}
          />
        </div>
        <span className="progress-text">
          {weeklyProgress}% completado ({diasActivos}/7 días esta semana)
        </span>
      </section>

      {/* 2. Tarjeta de Desafíos Completados */}
      <div className="tarjeta-metrica">
        <div className="icono-contenedor desafios-color">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: '#22c55e', fill: 'none' }}>
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
            <path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
          </svg>
        </div>
        <div className="info-contenedor">
          <p className="tarjeta-etiqueta">Desafíos Completados</p>
          <p className="tarjeta-valor">{desafiosCompletados}</p>
        </div>
      </div>

    </div>
  );
};
