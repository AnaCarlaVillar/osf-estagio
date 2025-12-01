import express from "express";
import { page } from "../../controllers/global/pricingController.js";
import auth from "../../../core/middleware/token/auth.js";

const router = express.Router();

router.get("/pricing", auth, page);

export default router;