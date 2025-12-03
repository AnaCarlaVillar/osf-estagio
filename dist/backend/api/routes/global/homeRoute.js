// homeRoute.ts
import express from "express";
import { page } from "../../controllers/global/homeController.js";
import auth from "../../../core/middleware/auth.js";
import session from "../../../core/middleware/session.js";
const router = express.Router();
router.get("/home/:token", auth, session, page);
export default router;
//# sourceMappingURL=homeRoute.js.map