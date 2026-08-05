import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { verifyResetCode, confirmReset } from "../services/firebase/authService";

export default function useForgotPassword() {

  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();

  const oobCode = searchParams.get("oobCode");

  // Si venimos del link del mail (trae ?oobCode=...), esta misma pantalla
  // pasa a modo "reset" (poner contraseña nueva). Si no, es el modo
  // original "request" (pedir el mail de recuperación).
  const mode = oobCode ? "reset" : "request";

  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState(""); // el email verificado del link
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [verifying, setVerifying] = useState(mode === "reset");
  const [loading, setLoading] = useState(false);

  // En modo "reset", apenas entra confirmamos que el link sea válido (no
  // vencido / ya usado) y recuperamos a qué cuenta pertenece.
  useEffect(() => {

    if (mode !== "reset") return;

    verifyResetCode(oobCode)
      .then((verifiedEmail) => setResetEmail(verifiedEmail))
      .catch(() => {
        setError("Este link venció o ya fue usado. Pedí uno nuevo desde esta misma pantalla.");
      })
      .finally(() => setVerifying(false));

  }, [mode, oobCode]);

  function handleChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  async function handleSubmit(event) {

    event.preventDefault();

    setError("");
    setSuccess("");

    if (mode === "reset") {

      if (password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }

      try {

        setLoading(true);

        await confirmReset(oobCode, password);

        setSuccess("¡Listo! Tu contraseña se actualizó correctamente. Ya podés iniciar sesión.");

      } catch (err) {

        switch (err.code) {

          case "auth/expired-action-code":
          case "auth/invalid-action-code":
            setError("Este link venció o ya fue usado. Pedí uno nuevo desde \"Recuperar contraseña\".");
            break;

          case "auth/weak-password":
            setError("La contraseña es demasiado débil.");
            break;

          default:
            setError("No se pudo actualizar la contraseña. Intentá nuevamente.");

        }

      } finally {
        setLoading(false);
      }

      return;

    }

    // mode === "request": comportamiento original (pedir el mail de recuperación)
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
  };

}
