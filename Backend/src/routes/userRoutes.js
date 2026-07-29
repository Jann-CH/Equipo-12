import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  createUser,
  getMe,
  updateSubjects,
  updateOnboarding,
  completeChallenge,
  setStreakGoal,
  dismissStreakWelcome,
  updateReminder,
  checkInStreak,
  addUsageTime,
} from "../controllers/userController.js";

const router = Router();

router.post("/", requireAuth, createUser);
router.get("/me", requireAuth, getMe);
router.patch("/me/subjects", requireAuth, updateSubjects);
router.patch("/me/onboarding", requireAuth, updateOnboarding);
router.post("/me/challenges/complete", requireAuth, completeChallenge);
router.patch("/me/streak-goal", requireAuth, setStreakGoal);
router.post("/me/streak-welcome/dismiss", requireAuth, dismissStreakWelcome);
router.patch("/me/reminder", requireAuth, updateReminder);
router.post("/me/streak/check-in", requireAuth, checkInStreak);
router.post("/me/time-tracking/ping", requireAuth, addUsageTime);

export default router;
