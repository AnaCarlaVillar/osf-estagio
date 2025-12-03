// registerRoute.ts

import express from "express";
import { page, register } from "../../controllers/global/registerController.js";
const router = express.Router();

router.get("/register", page);
router.post("/register", register)

export default router;