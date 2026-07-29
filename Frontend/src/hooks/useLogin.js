
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function useLogin() {

  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    console.log("➡️ handleSubmit ejecutado");
    
    setError("");
    

    if (!formData.email.trim()) {

      setError("Ingresá tu correo electrónico.");

      return;

    }

    if (!formData.password.trim()) {

      setError("Ingresá tu contraseña.");

      return;

    }

    try {

      setLoading(true);

      await signIn(
        formData.email,
        formData.password
      );

      navigate("/mi-recorrido");

    } catch (error) {

      switch (error.code) {

        case "auth/invalid-credential":

        case "auth/user-not-found":

        case "auth/wrong-password":

          setError(
            "Correo electrónico o contraseña incorrectos."
          );

          break;

        case "auth/invalid-email":

          setError(
            "El correo electrónico no es válido."
          );

          break;

        default:

          setError(
            "No fue posible iniciar sesión."
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