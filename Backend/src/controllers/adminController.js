import { getExportData, toCsv } from "../services/exportService.js";

// Devuelve una de las 3 colecciones (users, tasks, content) en JSON o CSV,
// SIEMPRE con los datos actuales de Firestore (no un backup viejo).
export async function exportCollection(req, res) {
  try {
    const { name } = req.params; // users | tasks | content
    const format = (req.query.format || "json").toLowerCase();

    const data = await getExportData();

    if (!data[name]) {
      return res.status(404).json({ message: `Colección desconocida: ${name}` });
    }

    const rows = data[name];

    if (format === "csv") {
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${name}.csv"`);
      return res.send(toCsv(rows));
    }

    res.json(rows);
  } catch (error) {
    console.error("⚠️ Error exportando datos:", error);
    res.status(500).json({ message: "No se pudieron exportar los datos." });
  }
}

// Devuelve las 3 colecciones juntas en un solo JSON (no soporta CSV, porque
// mezclar 3 tablas distintas en un CSV no tiene mucho sentido).
export async function exportAll(req, res) {
  try {
    const data = await getExportData();
    res.json(data);
  } catch (error) {
    console.error("⚠️ Error exportando datos:", error);
    res.status(500).json({ message: "No se pudieron exportar los datos." });
  }
}
