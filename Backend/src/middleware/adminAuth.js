// Protege los endpoints de exportación de datos con una clave secreta simple
// (no es un usuario/login, es una clave fija que le das al equipo de Data
// Analytics). Esto es INTENCIONALMENTE simple para un proyecto chico — si en
// algún momento esto crece o son varias personas con distintos permisos,
// conviene reemplazarlo por un login real de "admin".
export function requireAdminKey(req, res, next) {

  const providedKey = req.headers["x-admin-key"] || req.query.key;
  const expectedKey = process.env.ADMIN_EXPORT_KEY;

  if (!expectedKey) {
    return res.status(500).json({
      message: "El servidor no tiene configurada ADMIN_EXPORT_KEY en Backend/.env.",
    });
  }

  if (providedKey !== expectedKey) {
    return res.status(401).json({ message: "Clave de administrador inválida o faltante." });
  }

  next();
}
