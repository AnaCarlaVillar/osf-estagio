import express from "express";
import { page } from "../../controllers/global/homeController.js";
import auth from "../../../core/middleware/auth.js";

const router = express.Router();

router.get("/home/:token", auth, page);

export default router;