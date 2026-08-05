
import "./ForgotPassword.css";
import avatarNova from "/branding/Avatar-Nova-Estrella.png";

import { useNavigate } from "react-router-dom";
import useForgotPassword from "../../hooks/useForgotPassword";

function ForgotPassword() {

  const navigate = useNavigate();

  const {
    mode,
    email,
    resetEmail,
    password,
    confirmPassword,
    error,
    success,
    verifying,
    loading,
    handleChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  } = useForgotPassword();

  const isReset = mode === "reset";

  return (

    <div className="forgot-container">

      <div className="forgot-card">

        <img
          src={avatarNova}
          alt="Nova"
          className="forgot-avatar"
        />

        <h1 className="forgot-title">
          {isReset ? "Restablecer contraseña" : "Recuperar contraseña"}
        </h1>

        {isReset && verifying && (
          <p className="forgot-subtitle">Verificando el enlace...</p>
        )}

        {isReset && !verifying && !success && !error && (
          <p className="forgot-subtitle">
            Ingresá una nueva contraseña para <strong>{resetEmail}</strong>.
          </p>
        )}

        {!isReset && (
          <p className="forgot-subtitle">
            Ingresá tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>
        )}

        {/* ===== Modo "reset": poner contraseña nueva ===== */}
        {isReset && !verifying && !success && !error && (
          <form onSubmit={handleSubmit}>

            <input
              type="password"
              placeholder="Nueva contraseña (mín. 8 caracteres)"
              className="forgot-input"
              value={password}
              onChange={handlePasswordChange}
            />

            <input
              type="password"
              placeholder="Confirmar nueva contraseña"
              className="forgot-input"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            <button
              type="submit"
              className="forgot-button"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar nueva contraseña"}
            </button>

          </form>
        )}

        {/* ===== Modo "request": pedir el mail de recuperación ===== */}
        {!isReset && (
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
        )}

        {isReset && (error || success) && (
          <>
            {error && <p className="forgot-error">{error}</p>}
            {success && <p className="forgot-success">{success}</p>}
          </>
        )}

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
