import { db } from "../config/firebaseAdmin.js";

const usersCollection = db.collection("users");

// Cuántos minutos de margen alrededor de la hora configurada se considera
// "es ahora". Existe porque el cron externo (cron-job.org / UptimeRobot) no
// pega exactamente al minuto — si pega cada 10 min, con esta ventana no se
// escapa ningún recordatorio.
const WINDOW_MINUTES = 7;

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function isWithinWindow(reminderTime, currentTime) {
  const diff = Math.abs(toMinutes(reminderTime) - toMinutes(currentTime));
  // Contemplamos también el caso "medianoche" (23:58 vs 00:02), por si a
  // alguien le toca justo ahí.
  return diff <= WINDOW_MINUTES || 1440 - diff <= WINDOW_MINUTES;
}

function buildReminderEmail(user) {
  const name = user.apodo || user.name || "";
  const saludo = name ? `¡Hola ${name}!` : "¡Hola!";

  const appUrl = process.env.APP_URL || "https://equipo-12-beta.vercel.app/";

  const text =
    `${saludo} no te olvides ingresar a NOVA - Innova Mentor para poder realizar ` +
    `tus tareas pendientes o desafiarte con los desafíos que te brindamos. ` +
    `Desafiate a continuar tu objetivo (${appUrl}). Saludos!`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #23395B; line-height: 1.5;">
      <p>${saludo} no te olvides ingresar a <strong>NOVA - Innova Mentor</strong> para
      poder realizar tus tareas pendientes o desafiarte con los desafíos que te brindamos.</p>
      <p>
        <a href="${appUrl}" style="background:#186875;color:#fff;padding:10px 20px;
           border-radius:8px;text-decoration:none;display:inline-block;">
          Desafiate a continuar tu objetivo
        </a>
      </p>
      <p>Saludos!</p>
    </div>
  `;

  return {
    to: user.email,
    message: {
      subject: "¡No te olvides de usar NOVA! 📚",
      text,
      html,
    },
  };
}

// Recorre todos los usuarios con recordatorio activo, y a los que les toca
// AHORA (según la hora que configuraron) y todavía no recibieron el mail
// hoy, les escribe un documento en la colección "mail" — la extensión
// "Trigger Email" de Firebase se encarga de mandarlo de verdad.
export async function checkAndSendReminders() {

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const todayStr = now.toISOString().slice(0, 10);

  const snapshot = await usersCollection.where("reminderEnabled", "==", true).get();

  let sent = 0;

  for (const doc of snapshot.docs) {

    const user = doc.data();

    if (!user.reminderTime || !user.email) continue;
    if (user.lastReminderSentDate === todayStr) continue; // ya se le mandó hoy

    if (!isWithinWindow(user.reminderTime, currentTime)) continue;

    await db.collection("mail").add(buildReminderEmail(user));

    await doc.ref.update({ lastReminderSentDate: todayStr });

    sent++;

  }

  return { checked: snapshot.size, sent };

}
