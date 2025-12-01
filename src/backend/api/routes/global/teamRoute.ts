import express from "express";
import { page } from "../../controllers/global/teamController.js";
import auth from "../../../core/middleware/token/auth.js";

const router = express.Router();

router.get("/team", auth, page);

export default router;