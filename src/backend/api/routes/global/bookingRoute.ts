// bookingRoute.ts

import express from "express";
import { page } from "../../controllers/global/bookingController.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/booking/:token", auth, page);
// router.get("/api/booked-times", auth, getBookedTimes);

export default router;