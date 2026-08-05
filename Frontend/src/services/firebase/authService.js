
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

import app from "./firebase";

const auth = getAuth(app);

export async function signUp(email, password) {
  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function signIn(email, password) {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function signOutUser() {
  return await signOut(auth);
}

export async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}

// Confirma que el código del link de "restablecer contraseña" es válido y
// devuelve el email al que pertenece (para mostrarlo, como hace Firebase).
export async function verifyResetCode(oobCode) {
  return await verifyPasswordResetCode(auth, oobCode);
}

// Aplica la nueva contraseña usando ese mismo código.
export async function confirmReset(oobCode, newPassword) {
  return await confirmPasswordReset(auth, oobCode, newPassword);
}

export { auth };