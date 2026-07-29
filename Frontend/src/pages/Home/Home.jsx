
import "./Home.css";
import { useNavigate } from "react-router-dom";

import presentacion from "/branding/presentacion.png";
import horizontal from "/branding/logo-horizontal.png";
import avatarNova from "/branding/Avatar-Nova-Estrella.svg";

import PrimaryButton from "../../components/common/PrimaryButton/PrimaryButton";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <img
          src={horizontal}
          alt="Innova Mentor"
          className="home-logo"
        />
      </header>

      <main className="home-content">
        <div className="home-card">
          <img
            src={avatarNova}
            alt="Nova"
            className="home-avatar"
          />

          <h1 className="home-title">
            ¡Hola! Soy Nova
          </h1>

          <p className="home-subtitle">
            👋 Tu mentora virtual
          </p>

          <p className="home-text">
            Estoy aquí para ayudarte a construir hábitos de aprendizaje y alcanzar tus objetivos.
          </p>

          <p className="home-text">
            Vamos a recorrer este camino juntos.
          </p>

          <PrimaryButton
            text="Registrarse"
            onClick={() => navigate("/registro")}
          />

          <div className="home-space"></div>

          <PrimaryButton
            text="Iniciar sesión"
            variant="secondary"
            onClick={() => navigate("/login")}
          />
        </div>

        <p className="home-info">
          Innova Mentor es una Aplicación Web Progresiva (PWA)
          diseñada para acompañar a personas adultas que desean
          recuperar el hábito del estudio mediante pequeños desafíos,
          motivación constante y el apoyo de Nova, su mentor virtual.
        </p>
      </main>
    </div>
  );
}

export default Home;