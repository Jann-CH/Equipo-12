import { initializeApp } from "firebase/app";

// Este archivo solo inicializa Firebase Auth del lado del cliente.
// Firestore ahora vive en el Backend (Admin SDK) — ver src/api/*.js para las llamadas.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default app;
