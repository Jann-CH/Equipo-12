import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function useForgotPassword() {

  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setEmail(event.target.value);
  }

  async function handleSubmit(event) {

    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Ingresá tu correo electrónico.");
      return;
    }

    try {

      setLoading(true);

      await resetPassword(email);

      setSuccess(
        "Si el correo existe, te enviamos un enlace para restablecer tu contraseña."
      );

    } catch (error) {

      switch (error.code) {

        case "auth/invalid-email":
          setError("El correo electrónico no es válido.");
          break;

        default:
          // Por seguridad no confirmamos si el mail existe o no
          setSuccess(
            "Si el correo existe, te enviamos un enlace para restablecer tu contraseña."
          );

      }

    } finally {
      setLoading(false);
    }

  }

  return {
    email,
    error,
    success,
    loading,
    handleChange,
    handleSubmit,
  };

}
