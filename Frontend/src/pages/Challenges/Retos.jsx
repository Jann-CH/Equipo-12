import "../../pages/Ready/Ready.css";
import { useNavigate } from "react-router-dom";

import avatarNova from "/branding/avatar-nova-hi.png";
import PrimaryButton from "../../components/common/PrimaryButton/PrimaryButton";

// Importamos el nuevo componente reutilizable que creamos
import { ProgresoSemanal } from "../../components/common/ProgressCards/ProgresoSemanal";

function Reto() {
  const navigate = useNavigate();

  return (
    <div className="ready-container">
      <div className="ready-card">

        <img
          src={avatarNova}
          alt="Nova"
          className="ready-avatar"
        />

        <h1 className="ready-title">
          ¡Hola! 🎉
        </h1>

        <p className="ready-text">
          ¿Cómo vamos hoy?
        </p>

        <p className="ready-text">
          Pequeños pasos hoy, grandes cambios mañana.
        </p>

        <div className="ready-summary">
          {/* <div className="summary-item">
            ✅ Progreso Semanal registrado
          </div> */}

          {/* <div className="summary-item">
            ✅ Tiempo registrado
          </div>

          <div className="summary-item">
            ✅ Intereses guardados
          </div> */}
        </div>

        {/* 📈 NUEVO COMPONENTE INTEGRADO */}
        {/* Como tiene los datos simulados adentro (75% y "5/7"), no hace falta pasarle props por ahora */}
        <ProgresoSemanal />

        <p className="ready-text" style={{ marginTop: '20px' }}>
          Desafío de Hoy
        </p>

        <h2 className="ready-question">
          Estudiá 25 minutos sin distracciones.
          <br />
          ¿Comenzamos? 
        </h2>

        {/* <PrimaryButton
          text="Comenzar mi recorrido"
          onClick={() => navigate("/mi-recorrido")}
        /> */}

      </div>
    </div>
  );
}

export default Reto;
