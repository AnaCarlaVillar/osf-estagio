// servicesRoute.ts

import express from "express";
import { page } from "../../controllers/admin/servicesController.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/services/:token", auth, page);

export default router;