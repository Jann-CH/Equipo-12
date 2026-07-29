import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { recommendations } from "../controllers/youtubeController.js";

const router = Router();

router.get("/recommendations", requireAuth, recommendations);

export default router;
