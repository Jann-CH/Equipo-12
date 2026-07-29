
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Time.css";

import avatarNova from "/branding/avatar-nova-hi.png";

import SelectionCard from "../../components/SelectionCard/SelectionCard";
import PrimaryButton from "../../components/common/PrimaryButton/PrimaryButton";

import { useUser } from "../../contexts/UserContext";

function Time() {

  const navigate = useNavigate();

  const { updateProfile } = useUser();

  const [selectedTime, setSelectedTime] = useState(null);

  const times = [
    { id: 1, icon: "⏱️", text: "Menos de 10 minutos" },
    { id: 2, icon: "⌛", text: "Entre 10 y 20 minutos" },
    { id: 3, icon: "🕒", text: "Entre 20 y 40 minutos" },
    { id: 4, icon: "📅", text: "Más de 40 minutos" },
  ];

  function handleContinue() {

    const time = times.find(
      (item) => item.id === selectedTime
    );

    updateProfile("time", time.text);

    navigate("/intereses");

  }

  return (
    <div className="time-container">

      <div className="time-card">

        <img
          src={avatarNova}
          alt="Nova"
          className="time-avatar"
        />

        <h1 className="time-title">
          ¿Cuánto tiempo podrías dedicar por día?
        </h1>

        <p className="time-text">
          No hace falta disponer de muchas horas.
        </p>

        <p className="time-text">
          Contame cuánto tiempo pensás que podrías dedicar y juntos construiremos un plan que se adapte a tu ritmo.
        </p>

        <div className="time-options">

          {times.map((time) => (

            <SelectionCard
              key={time.id}
              icon={time.icon}
              text={time.text}
              selected={selectedTime === time.id}
              onClick={() => setSelectedTime(time.id)}
            />

          ))}

        </div>

        <PrimaryButton
          text="Continuar"
          disabled={!selectedTime}
          onClick={handleContinue}
        />

      </div>

    </div>
  );
}

export default Time;