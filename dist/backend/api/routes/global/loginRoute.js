// loginRoute.ts
import express from "express";
import { page, login } from "../../controllers/global/loginController.js";
const router = express.Router();
router.get("/login", page);
router.post("/login", login);
export default router;
//# sourceMappingURL=loginRoute.js.map