import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { greeting, message } from "../controllers/mentorController.js";

const router = Router();

router.get("/greeting", requireAuth, greeting);
router.post("/message", requireAuth, message);

export default router;
