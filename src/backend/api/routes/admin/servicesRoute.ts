// servicesRoute.ts

import express from "express";
import { page } from "../../controllers/admin/servicesController.js";
import { page as viewPage } from "../../controllers/admin/viewServicesController.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/services/:token", auth, page);
router.get("/services/view/:token", auth, viewPage);

export default router;