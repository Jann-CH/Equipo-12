
import "./Register.css";
import avatarNova from "/branding/Avatar-Nova-Estrella.png";

import { useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister";

const errorInputStyle = { borderColor: "#e53935", outlineColor: "#e53935" };
const errorTextStyle = { color: "#e53935", fontSize: "0.8rem", margin: "-8px 0 8px" };

function Register() {

  const navigate = useNavigate();

  const {
    formData,
    fieldErrors,
    touched,
    hasLiveErrors,
    error,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useRegister();

  return (
    <div className="register-container">

      <div className="register-card">

        <img
          src={avatarNova}
          alt="Nova"
          className="register-avatar"
        />

        <h1 className="register-title">
          Crear cuenta
        </h1>

        <p className="register-subtitle">
          Comencemos juntos tu camino de aprendizaje.
        </p>

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          <label
            htmlFor="name"
            className="register-label"
          >
            Nombre completo
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="register-input"
            placeholder="Ej.: Sofía González"
            style={touched.name && fieldErrors.name ? errorInputStyle : undefined}
          />
          {touched.name && fieldErrors.name && (
            <p style={errorTextStyle}>{fieldErrors.name}</p>
          )}

          <label htmlFor="apodo" className="register-label">Apodo</label>

          <input
            type="text"
            id="apodo"
            name="apodo"
            className="register-input"
            placeholder="Ej.: Sofi"
            value={formData.apodo}
            onChange={handleChange}
          />

          <label htmlFor="fechaNacimiento" className="register-label">Fecha de nacimiento</label>

          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            className="register-input"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            onBlur={handleBlur}
            style={touched.fechaNacimiento && fieldErrors.fechaNacimiento ? errorInputStyle : undefined}
          />
          {touched.fechaNacimiento && fieldErrors.fechaNacimiento && (
            <p style={errorTextStyle}>{fieldErrors.fechaNacimiento}</p>
          )}

          <label
            htmlFor="email"
            className="register-label"
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
            onBlur={handleBlur}
            className="register-input"
            placeholder="Ej.: sofia.gonzalez@gmail.com"
            style={touched.email && fieldErrors.email ? errorInputStyle : undefined}
          />
          {touched.email && fieldErrors.email && (
            <p style={errorTextStyle}>{fieldErrors.email}</p>
          )}

          <label
            htmlFor="password"
            className="register-label"
          >
            Contraseña
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Mínimo 8 caracteres"
            className="register-input"
            style={touched.password && fieldErrors.password ? errorInputStyle : undefined}
          />
          {touched.password && fieldErrors.password && (
            <p style={errorTextStyle}>{fieldErrors.password}</p>
          )}

          <label
            htmlFor="confirmPassword"
            className="register-label"
          >
            Confirmar contraseña
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirmá contraseña"
            className="register-input"
            style={touched.confirmPassword && fieldErrors.confirmPassword ? errorInputStyle : undefined}
          />
          {touched.confirmPassword && fieldErrors.confirmPassword && (
            <p style={errorTextStyle}>{fieldErrors.confirmPassword}</p>
          )}

          {error && (
            <div className="register-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="register-button"
            disabled={loading || hasLiveErrors}
          >
            {loading
              ? "Creando cuenta..."
              : "Crear cuenta"}
          </button>

        </form>

        <p className="register-login-text">
          ¿Ya tienes una cuenta?
        </p>

        <button
          className="login-link"
          onClick={() => navigate("/login")}
        >
          Iniciar sesión
        </button>

      </div>

    </div>
  );
}

export default Register;
