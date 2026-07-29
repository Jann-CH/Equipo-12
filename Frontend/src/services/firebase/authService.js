
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
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

export { auth };