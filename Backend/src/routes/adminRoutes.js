import { Router } from "express";
import { requireAdminKey } from "../middleware/adminAuth.js";
import { exportCollection, exportAll } from "../controllers/adminController.js";

const router = Router();

router.get("/export/all", requireAdminKey, exportAll);
router.get("/export/:name", requireAdminKey, exportCollection);

export default router;
