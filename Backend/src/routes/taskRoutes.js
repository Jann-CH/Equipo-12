import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { create, list, complete } from "../controllers/taskController.js";

const router = Router();

router.post("/", requireAuth, create);
router.get("/", requireAuth, list);
router.patch("/:id/complete", requireAuth, complete);

export default router;
