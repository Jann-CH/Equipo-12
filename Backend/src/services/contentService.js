import admin, { db } from "../config/firebaseAdmin.js";

function contentCollection(uid) {
  return db.collection("users").doc(uid).collection("content");
}

// type: "audio" (archivo de audio subido, sólo se guarda el nombre)
//       "tts"   (texto para convertir a voz con el sintetizador del navegador)
export async function createContent(uid, { name, type, text }) {
  const ref = await contentCollection(uid).add({
    name,
    type,
    text: text || null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  const snapshot = await ref.get();
  return { id: ref.id, ...snapshot.data() };
}

export async function getContent(uid) {
  const snapshot = await contentCollection(uid).orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
