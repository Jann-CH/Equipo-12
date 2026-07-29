import React from 'react';
import './nuevaRacha.css'; 
import avatarNova from "/branding/Avatar-Nova-Estrella.png";

export default function RachaNuevaView({ onContinuar, onCerrar }) {
  // Al ser el día 1 de regreso, la racha comienza en 1
  const diaUno = 1;
  const diasSemana = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  
  // Marcamos solo el día actual como completado/activo. 
  // Para el ejemplo visual, asumimos que hoy es lunes o el primer día del bloque.
  const estadoDiasNuevaRacha = ['completed', '', '', '', '', '', ''];

  return (
    <div className="streak-overlay-container">
      <section className="info-card new-streak-card pop-in-animation">
        
        {/* Encabezado de bienvenida de vuelta */}
        <div className="new-streak-header">
          <span className="welcome-back-badge">✨ ¡QUÉ BUENO VERTE DE VUELTA!</span>
          <h2>¡Ha comenzado una nueva racha!</h2>
          <p className="new-streak-motivation">
            Establecer el hábito es el paso más importante. ¡Hoy diste el primero! 🚀
          </p>
        </div>

        {/* Contenedor central animado */}
        <div className="new-streak-stats-wrapper">
          <div className="avatar-pulse-container">
            <img 
              src={avatarNova} 
              alt="Avatar Nova Estrella" 
              className="star-avatar animated pulse-effect" 
            />
          </div>

          <div className="new-streak-number-wrapper">
            <div className="new-streak-count active">
              {diaUno}
            </div>
            <div className="new-streak-label">Día Consecutivo</div>
          </div>
        </div>

        {/* Mini calendario semanal de progreso */}
        <div className="week-container preview-week">
          {diasSemana.map((dia, index) => {
            const claseEstado = estadoDiasNuevaRacha[index];
            return (
              <div key={index} className="day-column">
                <span className="day-label">{dia}</span>
                <div className={`day-indicator ${claseEstado}`}>
                  {claseEstado === 'completed' ? '✓' : ''}
                </div>
              </div>
            );
          })}
        </div>

        {/* Botones de acción inferiores */}
        <div className="new-streak-actions vertical-actions">
          <button className="btn-continue-streak" onClick={onContinuar}>
            ¡Vamos a configurar mi meta!
          </button>
          
          {/* 2. Incluimos el botón para cerrar el componente y ver el Dashboard limpio */}
          {onCerrar && (
            <button 
              className="btn-cancel-streak" 
              style={{ marginTop: '8px', border: '2px solid #e5e5e5' }} 
              onClick={onCerrar}
            >
              Ir al Dashboard directo
            </button>
          )}
        </div>

      </section>
    </div>
  );
}