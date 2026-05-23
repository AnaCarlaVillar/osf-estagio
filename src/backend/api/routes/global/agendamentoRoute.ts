// agendamentoRoute.ts

import express from "express";
import { getBookedTimes, getAllBookedTimes } from "../../controllers/global/agendamentoController.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/api/booked-times", auth, getBookedTimes);
router.get("/api/all-booked-times", auth, getAllBookedTimes);

export default router;