
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function PublicRoute({ children }) {

  const { isAuthenticated } = useAuth();

  // Ojo: esto se evalúa UNA sola vez, al montar el componente (lazy initial state).
  // Si te autenticás DESPUÉS (ej: te acabás de registrar), no queremos que esto
  // dispare una redirección que compita con el navigate() explícito de useRegister/useLogin.
  const [wasAuthenticatedOnMount] = useState(isAuthenticated);

  if (wasAuthenticatedOnMount) {

    return <Navigate to="/mi-recorrido" replace />;

  }

  return children;

}

export default PublicRoute;