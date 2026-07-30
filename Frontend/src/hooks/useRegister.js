import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { createUserProfile } from "../api/authApi";
import { auth } from "../services/firebase/authService";
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

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  function handleChange(event) {

    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  }

  async function handleSubmit(event) {

    event.preventDefault();

    setError("");

    // Primero chequeamos TODOS los campos obligatorios juntos. Si falta más
    // de uno, mostramos un mensaje genérico en vez de ir corrigiendo campo
    // por campo en sucesivos intentos (que resulta frustrante: completa el
    // nombre, reintenta, le falta el mail, reintenta, le falta la
    // contraseña...).
    const missingFields = [];

    if (!formData.name.trim()) missingFields.push("name");
    if (!formData.fechaNacimiento) missingFields.push("fechaNacimiento");
    if (!formData.email.trim()) missingFields.push("email");
    if (!formData.password) missingFields.push("password");
    if (!formData.confirmPassword) missingFields.push("confirmPassword");

    if (missingFields.length > 1) {

      setError("Completá tus datos.");

      return;

    }

    if (missingFields.length === 1) {

      const messages = {
        name: "Ingresá tu nombre.",
        fechaNacimiento: "Ingresá tu fecha de nacimiento.",
        email: "Ingresá un correo electrónico.",
        password: "Ingresá una contraseña.",
        confirmPassword: "Confirmá tu contraseña.",
      };

      setError(messages[missingFields[0]]);

      return;

    }

    if (formData.password.length < 6) {

      setError("La contraseña debe tener al menos 6 caracteres.");

      return;

    }

    if (formData.password !== formData.confirmPassword) {

      setError("Las contraseñas no coinciden.");

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

          setError(
            "Ya existe una cuenta registrada con ese correo."
          );

          break;

        case "auth/invalid-email":

          setError(
            "El correo electrónico no es válido."
          );

          break;

        case "auth/weak-password":

          setError(
            "La contraseña es demasiado débil."
          );

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
    error,
    loading,
    handleChange,
    handleSubmit,

  };

}
