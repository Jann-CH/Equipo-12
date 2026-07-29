
import "./Register.css";
import avatarNova from "/branding/avatar-nova-hi.png";

import { useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister";

function Register() {

  const navigate = useNavigate();

  const {
    formData,
    error,
    loading,
    handleChange,
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
            className="register-input"
            placeholder="Ingresá nombre y apellido"
          />

          <label htmlFor="apodo" className="register-label">Apodo</label>

          <input
            type="text"
            id="apodo"
            name="apodo"
            className="form-input"
            placeholder="Ingresa tu apodo"
            className="register-input"
            value={formData.apodo}
            onChange={handleChange}
          />

          <label htmlFor="fechaNacimiento" className="register-label">Fecha de nacimiento</label>

          <input
          type="date"
          id="fechaNacimiento"
          name="fechaNacimiento"
          className="form-input"
          value={formData.fechaNacimiento}
          className="register-input"
          onChange={handleChange}
        />

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
            className="register-input"
            placeholder="Ingresá correo electrónico"
          />

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
            placeholder="Ingresá contraseña"
            className="register-input"
          />

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
            placeholder="Confirmá contraseña"
            className="register-input"
          />

          {error && (
            <div className="register-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="register-button"
            disabled={loading}
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




