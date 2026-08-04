
import "./Login.css";
import avatarNova from "/branding/Avatar-Nova-Estrella.png";

import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

function Login() {

  const navigate = useNavigate();

  const {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  } = useLogin();

  return (
    <div className="login-container">

      <div className="login-card">

        <img
          src={avatarNova}
          alt="Nova"
          className="login-avatar"
        />

        <h1 className="login-title">
          Iniciar sesión
        </h1>

        <p className="login-subtitle">
          Me alegra verte de nuevo.
        </p>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <label
            htmlFor="email"
            className="login-label"
          >
            Correo electrónico
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            placeholder="Ej.: sofia.gonzalez@gmail.com"
          />

          <label
            htmlFor="password"
            className="login-label"
          >
            Contraseña
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            placeholder="Ingresá tu contraseña"
          />

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "Ingresando..."
              : "Iniciar sesión"}
          </button>

        </form>

        <button
          className="forgot-password-link"
          onClick={() => navigate("/recuperar-password")}
        >
          ¿Olvidaste tu contraseña?
        </button>

        <p className="login-register-text">
          ¿No tienes una cuenta?
        </p>

        <button
          className="login-link"
          onClick={() => navigate("/registro")}
        >
          Crear cuenta
        </button>

      </div>

    </div>
  );
}

export default Login;