import React, { useEffect, useState } from 'react';
import { TarjetasProgreso } from '../../components/common/ProgressCards/TarjetasProgreso.jsx';
import './progreso.css';
import avatarNova from "/branding/Avatar-Nova-Estrella.png";

import useDashboard from "../../hooks/useDashboard";
import { useTasks } from "../../contexts/TasksContext";
import { NOVA_MESSAGES } from "../../services/mentor/novaMessages";
import { getTodayStr, getMondayOf } from "../../utils/weekDates";

const NOMBRES_DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const ESCALA_MAX_HORAS = 3; // el eje Y del gráfico va de 0 a 3h

// Arma los 7 días (lunes a domingo) de la semana actual con las horas reales
// que el usuario usó la app cada día (weeklyTimeSpent.days, en segundos).
// Un usuario nuevo arranca en 0 en todos los días; van subiendo con el uso.
function buildWeekHours(weeklyTimeSpent) {
  const todayStr = getTodayStr();
  const monday = getMondayOf(todayStr);
  const days = weeklyTimeSpent?.days || {};

  return NOMBRES_DIAS.map((label, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const dateStr = date.toISOString().slice(0, 10);

    const seconds = days[dateStr] || 0;
    const horas = Math.round((seconds / 3600) * 10) / 10; // 1 decimal
    const porcentaje = `${Math.min((horas / ESCALA_MAX_HORAS) * 100, 100)}%`;

    return { dia: label, horas, porcentaje };
  });
}

export default function ProgresoGeneral() {

  const { userProfile, loading } = useDashboard();
  const { completedTasks } = useTasks();


  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % NOVA_MESSAGES.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <main className="progreso-pagina-contenedor">
        <p>Cargando progreso...</p>
      </main>
    );
  }

  const stats = userProfile.stats || {};

  const diasSemana = buildWeekHours(userProfile.weeklyTimeSpent);

  const datosUsuario = {
    racha: stats.currentStreak ?? userProfile.streak ?? 0,
    desafios: String(stats.completedChallenges ?? 0),
    tareas: stats.tasksCompleted ?? 0,
    tiempo: "—", // todavía no medimos tiempo real por sesión
  };

  const logros = [
    {
      icono: "🏆",
      titulo: "Primer desafío",
      descripcion: "Completá tu primer desafío diario",
      conseguido: (stats.completedChallenges ?? 0) >= 1,
    },
    {
      icono: "🔥",
      titulo: "3 días seguidos",
      descripcion: "Mantené tu racha por 3 días",
      conseguido: (stats.bestStreak ?? userProfile.streak ?? 0) >= 3,
    },
    {
      icono: "✅",
      titulo: "10 tareas",
      descripcion: "Completá 10 tareas",
      conseguido: (stats.tasksCompleted ?? 0) >= 10,
    },
  ];

  return (
    <main className="progreso-pagina-contenedor">
      <header className="progreso-encabezado-pagina">

        <div className="progreso-titulos-bloque">
          <h1 className="progreso-titulo-principal">Tu Progreso</h1>
          <p className="progreso-descripcion-principal">Cada paso te acerca a tus objetivos.</p>
        </div>

        <div className="progreso-avatar-encabezado">
          <div className="avatar-posicionamiento">
            <div className="avatar-circulo-temporal">
              <img src={avatarNova} alt="Avatar Nova" className="avatar-nova-img" />
            </div>
          </div>
        </div>

      </header>

      <section className="seccion-progreso">
        <h2 className="seccion-titulo-bloque">Resumen General</h2>
        <TarjetasProgreso datos={datosUsuario} />
      </section>

      <section className="seccion-progreso grafico-seccion">
        <h2 className="seccion-titulo">Tu avance</h2>
        <p className="seccion-subtitulo">Horas dedicadas a estudiar esta semana</p>

        <div className="grafico-contenedor-global">

          <div className="grafico-escala-y">
            <span>3h</span>
            <span>2h</span>
            <span>1h</span>
            <span>0h</span>
          </div>

          <div className="grafico-barras-contenedor">
            {diasSemana.map((item, index) => (
              <div key={index} className="grafico-columna">
                <div className="grafico-barra-wrapper">
                  <div className="grafico-barra-valor">{item.horas}h</div>
                  <div
                    className={`grafico-barra-relleno ${item.horas > 0 ? 'activo' : ''}`}
                    style={{ height: item.porcentaje }}
                  ></div>
                </div>
                <span className="grafico-dia-etiqueta">{item.dia}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="seccion-progreso">
        <h2 className="seccion-titulo">Logros</h2>
        <div className="logros-cuadricula">
          {logros.map((logro) => (
            <div
              key={logro.titulo}
              className="tarjeta-logro"
              style={{ opacity: logro.conseguido ? 1 : 0.4 }}
            >
              <div className="logro-icono">{logro.conseguido ? logro.icono : "🔒"}</div>
              <div className="logro-info">
                <h3>{logro.titulo}</h3>
                <p>{logro.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="seccion-progreso">
        <h2 className="seccion-titulo">Tareas completadas</h2>
        {completedTasks.length === 0 ? (
          <p style={{ fontSize: 13, color: "#6B7280" }}>Todavía no completaste ninguna tarea.</p>
        ) : (
          <div className="logros-cuadricula">
            {completedTasks.map((task) => (
              <div key={task.id} className="tarjeta-logro">
                <div className="logro-icono">✅</div>
                <div className="logro-info">
                  <h3>{task.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="seccion-progreso avatar-motivacion-contenedor">
        <div className="avatar-burbuja-mensaje">
          <p>"{NOVA_MESSAGES[messageIndex]}"</p>
        </div>
        <div className="avatar-contenedor">
          <div className="avatar-circulo-temporal">
            <img src={avatarNova} alt="Avatar Nova" className="avatar-nova-img" />
          </div>
        </div>
      </section>
    </main>
  );
}
