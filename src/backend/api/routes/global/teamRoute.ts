// teamRoute.ts

import express from "express";
import { page } from "../../controllers/global/teamController.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/team/:token", auth, page);

export default router;