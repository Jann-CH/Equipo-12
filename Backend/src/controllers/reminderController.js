import { checkAndSendReminders } from "../services/reminderService.js";

export async function checkReminders(req, res) {
  try {
    const result = await checkAndSendReminders();
    res.json({ ok: true, ...result });
  } catch (error) {
    console.error("⚠️ Error chequeando recordatorios:", error);
    res.status(500).json({ message: "No se pudieron chequear los recordatorios." });
  }
}
