import * as userService from "../services/userService.js";

export async function createUser(req, res) {
  try {
    const { uid, email } = req.user;
    const { name, apodo, fechaNacimiento } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "El nombre es obligatorio." });
    }

    await userService.createUserProfile(uid, email, { name, apodo, fechaNacimiento });
    const profile = await userService.getUserProfile(uid);
    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo crear el perfil." });
  }
}

export async function getMe(req, res) {
  try {
    const profile = await userService.getUserProfile(req.user.uid);
    if (!profile) {
      return res.status(404).json({ message: "Perfil no encontrado." });
    }
    res.json(profile);

    // Fire-and-forget: no bloqueamos la respuesta por esto.
    userService.trackAppOpen(req.user.uid).catch((error) => {
      console.error("⚠️ No se pudo registrar el uso de la app:", error);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo obtener el perfil." });
  }
}

export async function updateSubjects(req, res) {
  try {
    const { subjects } = req.body;
    if (!Array.isArray(subjects)) {
      return res.status(400).json({ message: "subjects debe ser un array." });
    }
    const profile = await userService.updateUserSubjects(req.user.uid, subjects);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudieron actualizar las materias." });
  }
}

export async function updateOnboarding(req, res) {
  try {
    const { goal, challenge, time, interests } = req.body;

    if (!goal || !challenge || !time || !Array.isArray(interests)) {
      return res.status(400).json({
        message: "Faltan datos del onboarding (goal, challenge, time, interests).",
      });
    }

    const profile = await userService.updateUserOnboarding(req.user.uid, {
      goal,
      challenge,
      time,
      interests,
    });

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo guardar el onboarding." });
  }
}

export async function completeChallenge(req, res) {
  try {
    const profile = await userService.incrementCounter(req.user.uid, "challengesCompleted");
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo registrar el desafío completado." });
  }
}

export async function setStreakGoal(req, res) {
  try {
    const { days } = req.body;

    if (!Number.isInteger(days) || days <= 0) {
      return res.status(400).json({ message: "days debe ser un número entero positivo." });
    }

    const profile = await userService.setStreakGoal(req.user.uid, days);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo guardar la meta de racha." });
  }
}

export async function dismissStreakWelcome(req, res) {
  try {
    const profile = await userService.dismissStreakWelcome(req.user.uid);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo actualizar el perfil." });
  }
}

export async function updateReminder(req, res) {
  try {
    const { enabled, time } = req.body;
    const profile = await userService.updateReminder(req.user.uid, { enabled, time });
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo actualizar el recordatorio." });
  }
}

export async function checkInStreak(req, res) {
  try {
    const { date } = req.body;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: "date debe tener formato YYYY-MM-DD." });
    }

    const profile = await userService.checkInStreak(req.user.uid, date);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo actualizar la racha." });
  }
}

export async function addUsageTime(req, res) {
  try {
    const { seconds, date } = req.body;

    // Validamos un rango razonable para que un client roto (o malicioso) no
    // pueda inflar el contador con valores absurdos.
    if (!Number.isFinite(seconds) || seconds <= 0 || seconds > 120) {
      return res.status(400).json({ message: "seconds inválido." });
    }

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: "date debe tener formato YYYY-MM-DD." });
    }

    await userService.addUsageTime(req.user.uid, seconds, date);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo registrar el tiempo de uso." });
  }
}
