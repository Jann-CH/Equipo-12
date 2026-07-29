
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Goals.css";

import avatarNova from "/branding/avatar-nova-hi.png";

import SelectionCard from "../../components/SelectionCard/SelectionCard";
import PrimaryButton from "../../components/common/PrimaryButton/PrimaryButton";

import { useUser } from "../../contexts/UserContext";

function Goals() {
  const navigate = useNavigate();

  const { updateProfile } = useUser();

  const [selectedGoal, setSelectedGoal] = useState(null);

  const goals = [
    { id: 1, icon: "📚", text: "Crear un hábito de lectura" },
    { id: 2, icon: "🎯", text: "Crear una rutina de estudio" },
    { id: 3, icon: "📋", text: "Organizar mejor mis tareas" },
    { id: 4, icon: "🚀", text: "Mantener el foco en mis metas" },
    { id: 5, icon: "💪", text: "Ser más constante" },
  ];

  function handleContinue() {
    const goal = goals.find((g) => g.id === selectedGoal);

    updateProfile("goal", goal.text);

    navigate("/desafios");
  }

  return (
    <div className="goals-container">
      <div className="goals-card">

        <img
          src={avatarNova}
          alt="Nova"
          className="goals-avatar"
        />

        <h1 className="goals-title">
          ¿Qué te gustaría lograr?
        </h1>

        <p className="goals-description">
          Contame cuál de estas opciones representa mejor tu objetivo.
        </p>

        <div className="goals-options">

          {goals.map((goal) => (

            <SelectionCard
              key={goal.id}
              icon={goal.icon}
              text={goal.text}
              selected={selectedGoal === goal.id}
              onClick={() => setSelectedGoal(goal.id)}
            />

          ))}

        </div>

        <PrimaryButton
          text="Continuar"
          disabled={!selectedGoal}
          onClick={handleContinue}
        />

      </div>
    </div>
  );
}

export default Goals;