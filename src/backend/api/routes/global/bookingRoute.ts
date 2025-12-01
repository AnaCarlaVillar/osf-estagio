import express from "express";
import { page } from "../../controllers/global/bookingController.js";
import auth from "../../../core/middleware/token/auth.js";

const router = express.Router();

router.get("/booking", auth, page);

export default router;