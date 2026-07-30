import { db } from "../config/firebaseAdmin.js";

export function toCsvValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") value = JSON.stringify(value);
  const str = String(value).replace(/"/g, '""');
  return /[",\n]/.test(str) ? `"${str}"` : str;
}

export function toCsv(rows) {
  if (rows.length === 0) return "";

  const headers = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row).forEach((key) => set.add(key));
      return set;
    }, new Set())
  );

  const lines = [headers.join(",")];

  for (const row of rows) {
    lines.push(headers.map((header) => toCsvValue(row[header])).join(","));
  }

  return lines.join("\n");
}

function tsToIso(value) {
  if (value && typeof value.toDate === "function") return value.toDate().toISOString();
  return value ?? null;
}

function cleanDoc(id, data) {
  const clean = { id };
  for (const [key, value] of Object.entries(data)) {
    clean[key] = value && typeof value.toDate === "function" ? tsToIso(value) : value;
  }
  return clean;
}

// Lee TODO de Firestore en vivo (siempre el estado más actual, no un backup
// viejo) y lo devuelve ya limpio (fechas legibles) para users/tasks/content.
export async function getExportData() {
  const usersSnapshot = await db.collection("users").get();

  const users = [];
  const tasks = [];
  const content = [];

  for (const userDoc of usersSnapshot.docs) {
    users.push(cleanDoc(userDoc.id, userDoc.data()));

    const tasksSnapshot = await userDoc.ref.collection("tasks").get();
    tasksSnapshot.docs.forEach((taskDoc) => {
      tasks.push({ userId: userDoc.id, ...cleanDoc(taskDoc.id, taskDoc.data()) });
    });

    const contentSnapshot = await userDoc.ref.collection("content").get();
    contentSnapshot.docs.forEach((contentDoc) => {
      content.push({ userId: userDoc.id, ...cleanDoc(contentDoc.id, contentDoc.data()) });
    });
  }

  return { users, tasks, content };
}
