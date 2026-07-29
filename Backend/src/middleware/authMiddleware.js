import { auth } from "../config/firebaseAdmin.js";

export async function requireAuth(req, res, next) {

  if (!auth) {
    return res.status(500).json({
      message: "El servidor no tiene Firebase configurado. Completá Backend/.env y reiniciá el servidor.",
    });
  }

  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Falta el token de autenticación." });
  }

  try {
    // Verifica el ID token que el Frontend obtiene con user.getIdToken()
    req.user = await auth.verifyIdToken(token);
    next();
  } catch (error) {
    console.error("Token inválido:", error.message);
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
}
