import admin from "firebase-admin";
import "dotenv/config";

let initialized = false;

try {

  const {
    FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
  } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error(
      "Faltan variables de entorno de Firebase. Completá Backend/.env con los datos de tu Service Account (ver Backend/README.md)."
    );
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  }

  initialized = true;

} catch (error) {

  console.error("⚠️  Firebase Admin no se pudo inicializar:", error.message);
  console.error("   El servidor va a arrancar igual, pero las rutas que usan Firebase van a devolver error hasta que completes Backend/.env\n");

}

export const auth = initialized ? admin.auth() : null;
export const db = initialized ? admin.firestore() : null;
export default admin;
