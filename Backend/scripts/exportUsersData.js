// Exporta todos los datos de usuarios (perfil, tareas, contenido) a JSON y
// CSV como ARCHIVOS locales (para cuando querés mandar algo puntual, sin
// depender de que alguien tenga internet/acceso al endpoint en vivo).
//
// Si en cambio querés que Data Analytics acceda ONLINE y siempre actualizado,
// usá el endpoint /api/admin/export/* (ver Backend/README.md).
//
// Uso: desde la carpeta Backend, con el .env ya configurado:
//   npm run export-data

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getExportData, toCsv } from "../src/services/exportService.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", "exports");

function writeOutput(name, rows) {
  fs.writeFileSync(path.join(OUTPUT_DIR, `${name}.json`), JSON.stringify(rows, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, `${name}.csv`), toCsv(rows));
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

  console.log("📦 Exportando datos desde Firestore...");

  const { users, tasks, content } = await getExportData();

  writeOutput("users", users);
  writeOutput("tasks", tasks);
  writeOutput("content", content);

  console.log(`\n✅ Listo. Archivos generados en ${OUTPUT_DIR}/`);
  console.log(`   - users.json   / users.csv   (${users.length} usuarios)`);
  console.log(`   - tasks.json   / tasks.csv   (${tasks.length} tareas)`);
  console.log(`   - content.json / content.csv (${content.length} contenidos)`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error exportando datos:", error);
    process.exit(1);
  });
