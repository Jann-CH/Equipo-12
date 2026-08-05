import admin, { db } from "../config/firebaseAdmin.js";

const usersCollection = db.collection("users");

function calculateAge(fechaNacimiento) {
  if (!fechaNacimiento) return null;

  const birth = new Date(fechaNacimiento);
  if (Number.isNaN(birth.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

export async function createUserProfile(uid, email, { name, apodo = null, fechaNacimiento = null }) {
  await usersCollection.doc(uid).set({
    uid,
    name,
    apodo,
    fechaNacimiento,
    email,
    goal: null,
    challenge: null,
    time: null,
    interests: [],
    subjects: [],
    streak: 0,
    bestStreak: 0,
    streakGoal: null,
    hasSeenStreakWelcome: false,
    lastActiveDate: null,
    weekActivity: null,
    totalTimeSpentSeconds: 0,
    weeklyTimeSpent: null,
    weeklyProgress: 0,
    tasksCompleted: 0,
    challengesCompleted: 0,
    achievements: 0,
    reminderEnabled: false,
    reminderTime: null,
    lastReminderSentDate: null,
    loginCount: 0,
    lastLoginAt: null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

export async function getUserProfile(uid) {
  const snapshot = await usersCollection.doc(uid).get();

  if (!snapshot.exists) return null;

  const data = snapshot.data();

  return {
    ...data,
    age: calculateAge(data.fechaNacimiento),
    stats: {
      currentStreak: data.streak || 0,
      bestStreak: data.bestStreak || data.streak || 0,
      completedChallenges: data.challengesCompleted || 0,
      unlockedAchievements: data.achievements || 0,
      tasksCompleted: data.tasksCompleted || 0,
    },
  };
}

export async function updateUserSubjects(uid, subjects) {
  await usersCollection.doc(uid).update({
    subjects,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return getUserProfile(uid);
}

export async function updateUserOnboarding(uid, { goal, challenge, time, interests }) {
  await usersCollection.doc(uid).update({
    goal,
    challenge,
    time,
    interests,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return getUserProfile(uid);
}

// Suma 1 a un contador del perfil (tasksCompleted, challengesCompleted, etc.)
export async function incrementCounter(uid, field) {
  await usersCollection.doc(uid).update({
    [field]: admin.firestore.FieldValue.increment(1),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return getUserProfile(uid);
}

// Se llama al confirmar una meta en "Elegir Meta de Racha" — también marca
// el aviso de bienvenida como visto, para que no vuelva a aparecer.
export async function setStreakGoal(uid, days) {
  await usersCollection.doc(uid).update({
    streakGoal: days,
    hasSeenStreakWelcome: true,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return getUserProfile(uid);
}

// Se llama si el usuario cierra el aviso de "nueva racha" sin elegir una meta todavía.
export async function dismissStreakWelcome(uid) {
  await usersCollection.doc(uid).update({
    hasSeenStreakWelcome: true,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return getUserProfile(uid);
}

export async function updateReminder(uid, { enabled, time }) {
  await usersCollection.doc(uid).update({
    reminderEnabled: !!enabled,
    reminderTime: time || null,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return getUserProfile(uid);
}

// Se llama cada vez que el usuario abre la app (ver GET /me) — permite que el
// equipo de Data Analytics sepa cuántas veces y cuándo fue la última vez que
// cada usuario usó la app, sin necesitar un sistema de tracking más complejo.
export async function trackAppOpen(uid) {
  await usersCollection.doc(uid).update({
    lastLoginAt: admin.firestore.FieldValue.serverTimestamp(),
    loginCount: admin.firestore.FieldValue.increment(1),
  });
}

function getMondayOf(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  const day = date.getDay(); // 0 = domingo, 1 = lunes, ...
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date.toISOString().slice(0, 10);
}

function addDays(dateStr, amount) {
  const date = new Date(`${dateStr}T00:00:00`);
  date.setDate(date.getDate() + amount);
  return date.toISOString().slice(0, 10);
}

// Racha real basada en fechas (no simulada): si ya se registró actividad hoy,
// no hace nada. Si la última actividad fue AYER, suma un día a la racha. Si
// hubo un salto (o es la primera vez), la racha arranca en 1.
// También guarda qué días de ESTA semana (lunes a domingo) estuvo activo,
// para poder pintar el calendario semanal con datos reales.
export async function checkInStreak(uid, todayStr) {
  const ref = usersCollection.doc(uid);
  const snapshot = await ref.get();
  const data = snapshot.data() || {};

  if (data.lastActiveDate === todayStr) {
    return getUserProfile(uid);
  }

  const yesterdayStr = addDays(todayStr, -1);
  const newStreak = data.lastActiveDate === yesterdayStr ? (data.streak || 0) + 1 : 1;
  const bestStreak = Math.max(newStreak, data.bestStreak || 0);

  const weekStart = getMondayOf(todayStr);
  const previousWeekActivity = data.weekActivity;
  const days =
    previousWeekActivity && previousWeekActivity.weekStart === weekStart
      ? { ...previousWeekActivity.days, [todayStr]: true }
      : { [todayStr]: true };

  await ref.update({
    streak: newStreak,
    bestStreak,
    lastActiveDate: todayStr,
    weekActivity: { weekStart, days },
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return getUserProfile(uid);
}

// Suma tiempo real de uso (en segundos). Se llama periódicamente desde el
// Frontend mientras la pestaña está visible (ver AppLayout). Además de sumar
// al total acumulado, guarda cuánto tiempo se usó CADA DÍA de esta semana,
// para poder mostrar el gráfico de "Tu avance" con datos reales (arranca en
// 0 para un usuario nuevo y va subiendo según el uso real).
export async function addUsageTime(uid, seconds, todayStr) {
  const ref = usersCollection.doc(uid);
  const snapshot = await ref.get();
  const data = snapshot.data() || {};

  const weekStart = getMondayOf(todayStr);
  const previous = data.weeklyTimeSpent;
  const previousDays = previous && previous.weekStart === weekStart ? previous.days : {};

  const days = {
    ...previousDays,
    [todayStr]: (previousDays[todayStr] || 0) + seconds,
  };

  await ref.update({
    totalTimeSpentSeconds: admin.firestore.FieldValue.increment(seconds),
    weeklyTimeSpent: { weekStart, days },
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}
