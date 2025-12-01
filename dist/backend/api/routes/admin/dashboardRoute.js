import express from "express";
import { page } from "../../controllers/admin/dashboardController.js";
import auth from "../../../core/middleware/auth.js";
const router = express.Router();
router.get("/dashboard", auth, page);
export default router;
//# sourceMappingURL=dashboardRoute.js.map