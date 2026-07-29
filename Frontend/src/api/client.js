import { auth } from "../services/firebase/authService";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Cuántas veces reintentar si el pedido falla por un error de RED (no por un
// error del servidor tipo 400/500, esos no se reintentan). Esto existe
// principalmente por el "cold start" de Render (plan gratis): el primer
// pedido después de un rato de inactividad puede tardar 30-50s en despertar
// el servidor, y algunos navegadores (sobre todo en celulares) directamente
// abortan la conexión con "Failed to fetch" antes de que responda.
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 4000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getAuthHeaders() {
  const headers = { "Content-Type": "application/json" };
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function apiRequest(path, options = {}) {
  const headers = await getAuthHeaders();

  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {

    try {

      const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: { ...headers, ...(options.headers || {}) },
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        // Error real del servidor (400, 401, 500, etc.) — no tiene sentido
        // reintentar, el problema no es de conectividad.
        const apiError = new Error(errorBody.message || `Error ${response.status}`);
        apiError.status = response.status;
        throw apiError;
      }

      if (response.status === 204) return null;
      return response.json();

    } catch (error) {

      lastError = error;

      // Solo reintentamos errores de RED genuinos ("Failed to fetch"), no
      // errores de negocio que ya vienen con un mensaje del backend.
      const isNetworkError = error instanceof TypeError;

      if (!isNetworkError || attempt === MAX_RETRIES) {
        throw error;
      }

      console.warn(
        `⚠️ Falló el pedido a ${path} (intento ${attempt + 1}/${MAX_RETRIES + 1}), reintentando en ${RETRY_DELAY_MS / 1000}s... (puede ser que el servidor esté "despertando")`
      );

      await sleep(RETRY_DELAY_MS);

    }

  }

  throw lastError;
}
