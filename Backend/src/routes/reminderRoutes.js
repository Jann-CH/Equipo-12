import { Router } from "express";
import { requireAdminKey } from "../middleware/adminAuth.js";
import { checkReminders } from "../controllers/reminderController.js";

const router = Router();

// La llama un cron externo (cron-job.org / UptimeRobot) cada 5-10 minutos.
router.get("/check", requireAdminKey, checkReminders);

export default router;
