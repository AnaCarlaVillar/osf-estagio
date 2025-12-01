import express from "express";
import { page } from "../../controllers/admin/reportController.js";
import auth from "../../../core/middleware/auth.js";
const router = express.Router();
router.get("/home", auth, page);
export default router;
//# sourceMappingURL=reportRoute.js.map