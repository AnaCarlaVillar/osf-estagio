// serviceRoute.ts

import express from "express";
import { getAll, getById, register, update, remove } from "../../controllers/admin/serviceController.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/service", getAll);
router.get("/service/:id", getById);
router.post("/service/:token", auth, register);
router.post("/service/update/:id/:token", auth, update);
router.post("/service/delete/:id/:token", auth, remove);

export default router;