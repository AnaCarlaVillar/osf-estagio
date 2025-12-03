// bookingRoute.ts

import express from "express";
import { page } from "../../controllers/global/bookingController.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/booking/:token", auth, page);

export default router;