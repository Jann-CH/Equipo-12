
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Challenges.css";

import avatarNova from "/branding/avatar-nova-hi.png";

import SelectionCard from "../../components/SelectionCard/SelectionCard";
import PrimaryButton from "../../components/common/PrimaryButton/PrimaryButton";

import { useUser } from "../../contexts/UserContext";

function Challenges() {

  const navigate = useNavigate();

  const { updateProfile } = useUser();

  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const challenges = [
    { id: 1, icon: "🔥", text: "Mantener la motivación" },
    { id: 2, icon: "⏰", text: "Organizar mi tiempo" },
    { id: 3, icon: "💪", text: "Ser constante" },
    { id: 4, icon: "📝", text: "Recordar mis tareas" },
    { id: 5, icon: "🚫", text: "Evitar la procrastinación" },
  ];

  function handleContinue() {

    const challenge = challenges.find(
      (item) => item.id === selectedChallenge
    );

    updateProfile("challenge", challenge.text);

    navigate("/tiempo");

  }

  return (
    <div className="challenges-container">

      <div className="challenges-card">

        <img
          src={avatarNova}
          alt="Nova"
          className="challenges-avatar"
        />

        <h1 className="challenges-title">
          ¿Qué suele resultarte más difícil?
        </h1>

        <p className="challenges-text">
          Es normal encontrar desafíos cuando queremos incorporar nuevos hábitos.
        </p>

        <p className="challenges-text">
          Contame cuál es el que más te representa para que pueda acompañarte.
        </p>

        <div className="challenges-options">

          {challenges.map((challenge) => (

            <SelectionCard
              key={challenge.id}
              icon={challenge.icon}
              text={challenge.text}
              selected={selectedChallenge === challenge.id}
              onClick={() => setSelectedChallenge(challenge.id)}
            />

          ))}

        </div>

        <PrimaryButton
          text="Continuar"
          disabled={!selectedChallenge}
          onClick={handleContinue}
        />

      </div>

    </div>
  );
}

export default Challenges;