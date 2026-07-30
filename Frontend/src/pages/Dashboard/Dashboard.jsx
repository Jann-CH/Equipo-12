import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/common/PrimaryButton/PrimaryButton';

import "./Dashboard.css";

import avatarNova from "/branding/Avatar-Nova-Estrella.png";

import useDashboard from "../../hooks/useDashboard";
import { useUser } from "../../contexts/UserContext";

import { CHALLENGES } from "../../services/challenges/challengesList";
import { ChallengeCarousel } from "../../components/challenges/ChallengeCarousel";
import { dismissStreakWelcome } from "../../api/authApi";
import { useTasks } from "../../contexts/TasksContext";
import { TaskItem } from "../../components/tasks/TaskItem";
import { PdfToAudioUploader } from "../../components/audio/PdfToAudioUploader";

import Racha from "../Racha/Racha.jsx";
import RachaNuevaView from "../Racha/RachaNuevaView.jsx";
import { ProgresoSemanal } from '../../components/common/ProgressCards/ProgresoSemanal';

function Dashboard() {

  const navigate = useNavigate();

  const {
    currentUser,
    userProfile,
    loading,
    handleLogout,
  } = useDashboard();

  const { updateProfile } = useUser();

  const {
    pendingTasks,
    loading: loadingTasks,
    finishTask,
    openModal,
  } = useTasks();

  const [mostrarNuevaRacha, setMostrarNuevaRacha] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);

  useEffect(() => {
    // El aviso de "nueva racha" solo debe verse la primera vez que el
    // usuario llega a Mi Recorrido (justo después del onboarding).
    if (!loading && userProfile && !userProfile.hasSeenStreakWelcome) {
      setMostrarNuevaRacha(true);
    }
  }, [loading, userProfile]);

  async function handleCerrarRacha() {
    setMostrarNuevaRacha(false);
    // Lo marcamos como "visto" en el estado local YA MISMO, así no vuelve a
    // aparecer en esta sesión ni bien cierres el aviso, sin depender de que
    // el Backend responda a tiempo (Render free tier puede tardar en
    // "despertar" y hacer que este request falle o tarde mucho).
    updateProfile("hasSeenStreakWelcome", true);
    try {
      await dismissStreakWelcome();
    } catch (error) {
      console.error("⚠️ No se pudo guardar en el Backend que ya viste el aviso de racha:", error);
    }
  }

  function handleStartChallenge() {
    const challenge = CHALLENGES.find((c) => c.id === selectedChallengeId);
    if (!challenge) return;

    navigate("/temporizador", {
      state: {
        type: "desafio",
        title: challenge.title,
        durationMinutes: challenge.durationMinutes,
      },
    });
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="welcome-card">
            <h2>Cargando perfil...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">

      {mostrarNuevaRacha && (
        <RachaNuevaView
          onContinuar={() => {
            setMostrarNuevaRacha(false);
            navigate('/configurar-meta');
          }}
          onCerrar={handleCerrarRacha}
        />
      )}

      <div className="dashboard-content">
        <section className="welcome-card">
          <img
            src={avatarNova}
            alt="Nova"
            className="dashboard-avatar"
          />

          <h1>
            ¡Hola{(userProfile.apodo || userProfile.name) ? `, ${userProfile.apodo || userProfile.name}` : ""}! 👋
          </h1>

          <p className="welcome-message">
            Qué alegría verte nuevamente.
          </p>

          <p className="welcome-message secondary">
            Hoy preparé un desafío especialmente para vos.
          </p>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </section>

        <section className="challenge-card">
          <span className="card-label">
            ✨ ELEGÍ TU DESAFÍO DE HOY
          </span>

          <div style={{ margin: "12px 0" }}>
            <ChallengeCarousel
              challenges={CHALLENGES}
              selectedId={selectedChallengeId}
              onSelect={setSelectedChallengeId}
            />
          </div>

          <button onClick={handleStartChallenge} disabled={!selectedChallengeId}>
            Comenzar desafío →
          </button>
        </section>

        <section className="info-card">
          <div className="card-header">
            <h3>🎯 Mi objetivo</h3>
          </div>
          <p>
            {userProfile.goal || "Todavía no definiste un objetivo."}
          </p>
        </section>

        <section className="info-card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>📋 Tareas pendientes</h3>
          </div>

          {loadingTasks && <p style={{ fontSize: 13, color: '#9CA3AF' }}>Cargando...</p>}

          {!loadingTasks && pendingTasks.length === 0 && (
            <p style={{ fontSize: 13, color: '#9CA3AF' }}>No tenés tareas pendientes.</p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: pendingTasks.length ? 8 : 0 }}>
            {pendingTasks.map((task) => (
              <TaskItem key={task.id} task={task} onComplete={finishTask} />
            ))}
          </div>

          <button
            onClick={openModal}
            style={{
              marginTop: 12,
              width: '100%',
              border: '1.5px dashed #6366F1',
              borderRadius: 12,
              padding: '8px 0',
              color: '#4F46E5',
              fontSize: 13,
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            + Añadir tarea
          </button>
        </section>

        <PdfToAudioUploader />

        <ProgresoSemanal datos={userProfile} />

        <Racha diasRacha={userProfile.streak} weekActivity={userProfile.weekActivity} />

        <div className="dashboard-actions" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <PrimaryButton
            text="Ver Progreso General"
            onClick={() => navigate('/progreso')}
            variant="primary"
          />

          <PrimaryButton
            text="Elegir Meta de Racha"
            onClick={() => navigate('/configurar-meta')}
            variant="secondary"
          />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
