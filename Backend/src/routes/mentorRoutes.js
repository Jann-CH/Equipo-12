import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import * as mentorController from "../controllers/mentorController.js";

const router = Router();

router.get("/greeting", requireAuth, mentorController.greeting);
router.post("/chat", requireAuth, mentorController.chat);

export default router;