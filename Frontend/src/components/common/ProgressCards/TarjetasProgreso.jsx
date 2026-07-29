import React from 'react';
import './TarjetasProgreso.css';

export const TarjetasProgreso = ({ datos }) => {
  // Valores por defecto en caso de que falte alguna propiedad en el prop 'datos'
  const { racha = 0, desafios = '0/0', tareas = 0, tiempo = '0m' } = datos || {};
  const tieneRacha = racha > 0;

  return (
    <div className="metricas-fila">
      
      {/* 1. Tarjeta de Racha Actual */}
      <div className="tarjeta-metrica">
        <div className={`icono-contenedor ${tieneRacha ? 'racha-activa' : 'racha-inactiva'}`}>
          {/* SVG de Llamita / Fuego */}
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
        </div>
        <div className="info-contenedor">
          <p className="tarjeta-etiqueta">Racha Actual</p>
          <p className="tarjeta-valor">{racha} {racha === 1 ? 'día' : 'días'}</p>
        </div>
      </div>

      {/* 2. Tarjeta de Desafíos Completados */}
      <div className="tarjeta-metrica">
        <div className="icono-contenedor desafios-color">
          {/* SVG de Trofeo */}
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
          <p className="tarjeta-valor">{desafios}</p>
        </div>
      </div>

      {/* 3. Tarjeta de Tareas Completadas */}
      <div className="tarjeta-metrica">
        <div className="icono-contenedor tareas-color">
          {/* SVG de Checklist */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: '#3b82f6', fill: 'none' }}>
            <path d="m9 11 3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <div className="info-contenedor">
          <p className="tarjeta-etiqueta">Tareas Completadas</p>
          <p className="tarjeta-valor">{tareas}</p>
        </div>
      </div>

      {/* 4. Tarjeta de Tiempo Dedicado */}
      <div className="tarjeta-metrica">
        <div className="icono-contenedor tiempo-color">
          {/* SVG de Reloj */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: '#a855f7', fill: 'none' }}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div className="info-contenedor">
          <p className="tarjeta-etiqueta">Tiempo Dedicado</p>
          <p className="tarjeta-valor">{tiempo}</p>
        </div>
      </div>

    </div>
  );
};

