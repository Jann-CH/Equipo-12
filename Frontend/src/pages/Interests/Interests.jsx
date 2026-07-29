
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Interests.css";

import avatarNova from "/branding/avatar-nova-hi.png";

import SelectionCard from "../../components/SelectionCard/SelectionCard";
import PrimaryButton from "../../components/common/PrimaryButton/PrimaryButton";

import { useUser } from "../../contexts/UserContext";

function Interests() {

  const navigate = useNavigate();

  const { updateProfile } = useUser();

  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    { id: 1, icon: "🔬", text: "Ciencia" },
    { id: 2, icon: "💻", text: "Tecnología" },
    { id: 3, icon: "📜", text: "Historia" },
    { id: 4, icon: "🎨", text: "Arte" },
    { id: 5, icon: "📚", text: "Literatura" },
    { id: 6, icon: "🌿", text: "Naturaleza" },
  ];

  function toggleInterest(id) {

    if (selectedInterests.includes(id)) {

      setSelectedInterests(
        selectedInterests.filter((item) => item !== id)
      );

    } else {

      setSelectedInterests([
        ...selectedInterests,
        id
      ]);

    }

  }

  function handleContinue() {

    const selected = interests
      .filter((item) => selectedInterests.includes(item.id))
      .map((item) => item.text);

    updateProfile("interests", selected);

    navigate("/listo");

  }

  return (

    <div className="interests-container">

      <div className="interests-card">

        <img
          src={avatarNova}
          alt="Nova"
          className="interests-avatar"
        />

        <h1 className="interests-title">
          ¿Sobre qué te gustaría aprender?
        </h1>

        <p className="interests-text">
          Contame qué temas despiertan tu curiosidad.
        </p>

        <p className="interests-text">
          Podés elegir más de una opción.
        </p>

        <div className="interests-options">

          {interests.map((interest) => (

            <SelectionCard
              key={interest.id}
              icon={interest.icon}
              text={interest.text}
              selected={selectedInterests.includes(interest.id)}
              onClick={() => toggleInterest(interest.id)}
            />

          ))}

        </div>

        <PrimaryButton
          text="Continuar"
          disabled={selectedInterests.length === 0}
          onClick={handleContinue}
        />

      </div>

    </div>

  );

}

export default Interests;