// confirmRoute.ts

import express from "express";
import { page, saveBooking } from "../../controllers/global/confirmController.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/confirm/:token", auth, page);
router.post("/confirm/:token", auth, saveBooking);

export default router;