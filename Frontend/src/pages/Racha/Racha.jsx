import React from 'react';
import './racha.css';
import avatarNova from "/branding/Avatar-Nova-Estrella.png";
import { getTodayStr, getMondayOf } from "../../utils/weekDates";

const NOMBRES_DIAS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

// Arma los 7 días (lunes a domingo) de la semana actual, marcando cuáles
// tuvieron actividad real (según weekActivity.days del perfil) y cuál es hoy.
function buildWeekDays(weekActivity) {
  const todayStr = getTodayStr();
  const monday = getMondayOf(todayStr);
  const days = weekActivity?.days || {};

  return NOMBRES_DIAS.map((label, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const dateStr = date.toISOString().slice(0, 10);

    const isToday = dateStr === todayStr;
    const isCompleted = !!days[dateStr];
    const isFuture = dateStr > todayStr;

    let estado = '';
    if (isCompleted) estado = 'completed';
    else if (isToday) estado = 'current';
    else if (isFuture) estado = 'future';

    return { label, estado };
  });
}

export default function Racha({ diasRacha = 0, weekActivity }) {

  const rachaActiva = diasRacha > 0;
  const diasSemana = buildWeekDays(weekActivity);

  return (
    <section className="info-card streak-section-card">

      <div className="message-container">
        <div className="card-header">
          <h3>🔥 Mi racha</h3>
        </div>
        <p className="streak-motivation-text">
          {rachaActiva
            ? `¡Has completado ${diasRacha} ${diasRacha === 1 ? 'día' : 'días'} seguidos! ¡Seguí así! 💪`
            : 'Conéctate y avanza en tu lección para activar tu racha. 🌱'}
        </p>
      </div>

      <div className="streak-stats-wrapper">
        <div className="avatar-container">
          <img
            src={avatarNova}
            alt="Avatar Nova Estrella"
            className={`star-avatar ${rachaActiva ? 'animated' : 'grayed'}`}
          />
        </div>

        <div className="streak-number-wrapper">
          <div className={`streak-count ${rachaActiva ? 'active' : 'inactive'}`}>
            {diasRacha}
          </div>
          <div className="streak-label">
            {diasRacha === 1 ? "Día consecutivo" : "Días consecutivos"}
          </div>
        </div>
      </div>

      <div className="week-container">
        {diasSemana.map(({ label, estado }, index) => (
          <div key={index} className="day-column">
            <span className="day-label">{label}</span>
            <div className={`day-indicator ${estado}`}>
              {estado === 'completed' ? '✓' : ''}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
