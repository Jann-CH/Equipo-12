
import "./ForgotPassword.css";
import avatarNova from "/branding/avatar-nova-hi.png";

import { useNavigate } from "react-router-dom";
import useForgotPassword from "../../hooks/useForgotPassword";

function ForgotPassword() {

  const navigate = useNavigate();

  const {
    email,
    error,
    success,
    loading,
    handleChange,
    handleSubmit,
  } = useForgotPassword();

  return (

    <div className="forgot-container">

      <div className="forgot-card">

        <img
          src={avatarNova}
          alt="Nova"
          className="forgot-avatar"
        />

        <h1 className="forgot-title">
          Recuperar contraseña
        </h1>

        <p className="forgot-subtitle">
          Ingresá tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="forgot-input"
            value={email}
            onChange={handleChange}
          />

          {error && <p className="forgot-error">{error}</p>}
          {success && <p className="forgot-success">{success}</p>}

          <button
            type="submit"
            className="forgot-button"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>

        </form>

        <button
          className="forgot-link"
          onClick={() => navigate("/login")}
        >
          Volver al inicio de sesión
        </button>

      </div>

    </div>

  );
}

export default ForgotPassword;
