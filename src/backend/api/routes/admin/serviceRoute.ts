import express from "express";
import { getAll, getById, register } from "../../controllers/admin/serviceController.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/service", getAll);
router.get("/service/:id", getById);
router.post("/service/:token", auth, register);

export default router;