import admin, { db } from "../config/firebaseAdmin.js";
import { incrementCounter } from "./userService.js";

function tasksCollection(uid) {
  return db.collection("users").doc(uid).collection("tasks");
}

export async function createTask(uid, { title, notes = null, dueDate = null }) {
  const ref = await tasksCollection(uid).add({
    title,
    notes,
    dueDate,
    completed: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    completedAt: null,
  });

  const snapshot = await ref.get();
  return { id: ref.id, ...snapshot.data() };
}

export async function getTasks(uid) {
  const snapshot = await tasksCollection(uid).orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function completeTask(uid, taskId) {
  const ref = tasksCollection(uid).doc(taskId);

  await ref.update({
    completed: true,
    completedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Cada tarea completada suma al contador del perfil (se ve en Dashboard/Perfil)
  await incrementCounter(uid, "tasksCompleted");

  const snapshot = await ref.get();
  return { id: snapshot.id, ...snapshot.data() };
}
