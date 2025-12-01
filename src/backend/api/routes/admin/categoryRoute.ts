import express from "express";
import { getAll, getById, register } from "../../controllers/admin/serviceController.js";

const router = express.Router();

router.get("/category", getAll);
router.get("/category/:id", getById);
router.post("/category", register);

export default router;
