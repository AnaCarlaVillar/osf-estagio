// productsRoute.ts

import express from "express";
import { page } from "../../controllers/global/productsController.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/products/:token", auth, page);

export default router;
