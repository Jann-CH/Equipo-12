import { apiRequest } from "./client";

// Crea el perfil del usuario en Firestore (vía Backend) después del signUp de Firebase Auth
export async function createUserProfile({ name, apodo, fechaNacimiento }) {
  return apiRequest("/users", {
    method: "POST",
    body: JSON.stringify({ name, apodo, fechaNacimiento }),
  });
}

export async function getUserProfile() {
  return apiRequest("/users/me");
}

export async function updateUserSubjects(subjects) {
  return apiRequest("/users/me/subjects", {
    method: "PATCH",
    body: JSON.stringify({ subjects }),
  });
}

export async function saveOnboarding({ goal, challenge, time, interests }) {
  return apiRequest("/users/me/onboarding", {
    method: "PATCH",
    body: JSON.stringify({ goal, challenge, time, interests }),
  });
}

export async function completeChallenge() {
  return apiRequest("/users/me/challenges/complete", {
    method: "POST",
  });
}

export async function setStreakGoal(days) {
  return apiRequest("/users/me/streak-goal", {
    method: "PATCH",
    body: JSON.stringify({ days }),
  });
}

export async function dismissStreakWelcome() {
  return apiRequest("/users/me/streak-welcome/dismiss", {
    method: "POST",
  });
}

export async function setReminder(enabled, time) {
  return apiRequest("/users/me/reminder", {
    method: "PATCH",
    body: JSON.stringify({ enabled, time }),
  });
}

// Se llama una vez por carga de la app. El Backend decide si corresponde
// sumar un día a la racha (o resetearla) según la fecha de hoy.
export async function checkInStreak() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD, hora local
  return apiRequest("/users/me/streak/check-in", {
    method: "POST",
    body: JSON.stringify({ date: today }),
  });
}

export async function pingUsageTime(seconds) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD, hora local
  return apiRequest("/users/me/time-tracking/ping", {
    method: "POST",
    body: JSON.stringify({ seconds, date: today }),
  });
}
