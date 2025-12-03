// categoryRoute.ts
import express from "express";
import { getAll, getById, register } from "../../controllers/admin/categoryController.js";
import auth from "../../../core/middleware/auth.js";
const router = express.Router();
router.get("/category", getAll);
router.get("/category/:id", getById);
router.post("/category/:token", auth, register);
export default router;
//# sourceMappingURL=categoryRoute.js.map