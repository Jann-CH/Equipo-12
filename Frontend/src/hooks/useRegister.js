import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { createUserProfile } from "../api/authApi";
import { auth } from "../services/firebase/authService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const REQUIRED_FIELDS = ["name", "fechaNacimiento", "email", "password", "confirmPassword"];

export default function useRegister() {

  const navigate = useNavigate();

  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    apodo: "",
    fechaNacimiento: "", // Ej: "1998-05-15"
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Errores por campo, para mostrar feedback en vivo (antes de tocar "Crear cuenta")
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    fechaNacimiento: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Para no mostrar errores en un campo que el usuario todavía no tocó
  const [touched, setTouched] = useState({
    name: false,
    fechaNacimiento: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  function validateName(value) {
    if (!value.trim()) return "Ingresá tu nombre.";
    return "";
  }

  function validateFechaNacimiento(value) {
    if (!value) return "Ingresá tu fecha de nacimiento.";
    return "";
  }

  function validateEmail(value) {
    if (!value.trim()) return "Ingresá un correo electrónico.";
    if (!EMAIL_REGEX.test(value.trim())) return "Ingresá un correo electrónico válido (ej: sofia.gonzalez@gmail.com).";
    return "";
  }

  function validatePassword(value) {
    if (!value) return "Ingresá una contraseña.";
    if (value.length < MIN_PASSWORD_LENGTH) return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    return "";
  }

  function validateConfirmPassword(value, password) {
    if (!value) return "Confirmá tu contraseña.";
    if (value !== password) return "Las contraseñas no coinciden.";
    return "";
  }

  // Único punto de validación por campo — lo usan handleChange, handleBlur
  // Y handleSubmit, así nunca se desincronizan entre sí.
  function getFieldError(name, value, allValues) {
    switch (name) {
      case "name": return validateName(value);
      case "fechaNacimiento": return validateFechaNacimiento(value);
      case "email": return validateEmail(value);
      case "password": return validatePassword(value);
      case "confirmPassword": return validateConfirmPassword(value, allValues.password);
      default: return "";
    }
  }

  function validateField(name, value, allValues) {

    const message = getFieldError(name, value, allValues);

    setFieldErrors((prev) => ({ ...prev, [name]: message }));

    // Si cambió la contraseña, revalidamos también la confirmación (puede
    // haber quedado desactualizada respecto a la nueva contraseña).
    if (name === "password" && touched.confirmPassword) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(allValues.confirmPassword, value),
      }));
    }

  }

  function handleChange(event) {

    const { name, value } = event.target;

    const nextFormData = { ...formData, [name]: value };

    setFormData(nextFormData);

    // El usuario está corrigiendo algo — sacamos el cartel general de error
    // (si después de esta edición todavía falta algo, va a volver a
    // aparecer recién cuando reintente enviar el formulario).
    setError("");

    // Validación en vivo: solo mientras el usuario escribe SI ya tocó el
    // campo antes (para no tirarle un error apenas empieza a tipear).
    if (touched[name] || (name === "password" && touched.confirmPassword)) {
      validateField(name, value, nextFormData);
    }

  }

  function handleBlur(event) {

    const { name } = event.target;

    if (!REQUIRED_FIELDS.includes(name)) return;

    setTouched((prev) => ({ ...prev, [name]: true }));

    validateField(name, formData[name], formData);

  }

  // Para deshabilitar el botón "Crear cuenta" mientras haya errores visibles.
  const hasLiveErrors = Object.values(fieldErrors).some((msg) => msg !== "");

  async function handleSubmit(event) {

    event.preventDefault();

    setError("");

    // Revisamos TODOS los campos requeridos juntos, para saber cuántos
    // faltan en total y elegir el comportamiento correcto.
    const errors = {
      name: validateName(formData.name),
      fechaNacimiento: validateFechaNacimiento(formData.fechaNacimiento),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
    };

    const failingFields = REQUIRED_FIELDS.filter((field) => errors[field]);

    if (failingFields.length > 1) {

      // Varios campos faltantes: SOLO el cartel genérico, sin remarcar cada
      // input en rojo (eso quedaría demasiado agresivo con varios a la vez).
      setError("Completá los datos faltantes.");

      return;

    }

    if (failingFields.length === 1) {

      // Un solo campo puntual: ahí sí lo remarcamos en rojo + mensaje
      // específico, tanto en el input como en el cartel de arriba.
      const field = failingFields[0];

      setFieldErrors((prev) => ({ ...prev, [field]: errors[field] }));
      setTouched((prev) => ({ ...prev, [field]: true }));
      setError(errors[field]);

      return;

    }

    try {

      setLoading(true);

      // Si ya estamos autenticados (ej: un intento anterior creó la cuenta
      // en Firebase Auth pero falló al crear el perfil en Firestore, por un
      // cold-start de Render), NO volvemos a registrar — solo reintentamos
      // crear el perfil, para no chocar con "email ya registrado".
      if (!auth.currentUser) {
        await signUp(formData.email, formData.password);
      }

      // Esperamos la confirmación real del perfil ANTES de navegar. Si esto
      // falla, el usuario ve el error y puede reintentar (client.js ya
      // reintenta solo un par de veces por las dudas sea solo el cold-start).
      await createUserProfile({
        name: formData.name,
        apodo: formData.apodo,
        fechaNacimiento: formData.fechaNacimiento,
      });

      navigate("/mentor");

    } catch (error) {

      console.error(error);

      switch (error.code) {

        case "auth/email-already-in-use":

          setError("Ya existe una cuenta registrada con ese correo.");
          setFieldErrors((prev) => ({ ...prev, email: "Ya existe una cuenta con este correo." }));

          break;

        case "auth/invalid-email":

          setError("El correo electrónico no es válido.");
          setFieldErrors((prev) => ({ ...prev, email: "Correo inválido." }));

          break;

        case "auth/weak-password":

          setError("La contraseña es demasiado débil.");
          setFieldErrors((prev) => ({ ...prev, password: "Contraseña demasiado débil." }));

          break;

        default:

          setError(
            auth.currentUser
              ? "Tu cuenta se creó, pero no pudimos guardar tu perfil (puede ser un problema de conexión). Tocá \"Crear cuenta\" de nuevo para reintentarlo."
              : "Ocurrió un error inesperado. Intentá nuevamente."
          );

      }

    } finally {

      setLoading(false);

    }

  }

  return {

    formData,
    fieldErrors,
    touched,
    hasLiveErrors,
    error,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,

  };

}
