import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { create, list } from "../controllers/contentController.js";

const router = Router();

router.post("/", requireAuth, create);
router.get("/", requireAuth, list);

export default router;
